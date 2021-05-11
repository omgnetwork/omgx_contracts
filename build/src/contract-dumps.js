"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestStateDump = exports.makeStateDump = void 0;
const path = __importStar(require("path"));
const ethers_1 = require("ethers");
const Ganache = __importStar(require("ganache-core"));
const utils_1 = require("ethers/lib/utils");
const core_utils_1 = require("@eth-optimism/core-utils");
const contract_deployment_1 = require("./contract-deployment");
const contract_defs_1 = require("./contract-defs");
const predeploys_1 = require("./predeploys");
const getStorageDump = async (cStateManager, address) => {
    return new Promise((resolve, reject) => {
        cStateManager._getStorageTrie(address, (err, trie) => {
            if (err) {
                reject(err);
            }
            const storage = {};
            const stream = trie.createReadStream();
            stream.on('data', (val) => {
                const storageSlotValue = ethers_1.ethers.utils.RLP.decode('0x' + val.value.toString('hex'));
                storage['0x' + val.key.toString('hex')] = storageSlotValue;
            });
            stream.on('end', () => {
                resolve(storage);
            });
        });
    });
};
const sanitizeStorageDump = (storageDump, accounts) => {
    for (const account of accounts) {
        account.originalAddress = core_utils_1.remove0x(account.originalAddress).toLowerCase();
        account.deadAddress = core_utils_1.remove0x(account.deadAddress).toLowerCase();
    }
    for (const [key, value] of Object.entries(storageDump)) {
        let parsedKey = key;
        let parsedValue = value;
        for (const account of accounts) {
            const re = new RegExp(`${account.originalAddress}`, 'g');
            parsedValue = parsedValue.replace(re, account.deadAddress);
            parsedKey = parsedKey.replace(re, account.deadAddress);
        }
        if (parsedKey !== key) {
            delete storageDump[key];
        }
        storageDump[parsedKey] = parsedValue;
    }
    return storageDump;
};
const makeStateDump = async (cfg) => {
    const ganache = Ganache.provider({
        gasLimit: 100000000,
        allowUnlimitedContractSize: true,
        accounts: [
            {
                secretKey: '0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797',
                balance: 10000000000000000000000000000000000,
            },
        ],
    });
    const provider = new ethers_1.ethers.providers.Web3Provider(ganache);
    const signer = provider.getSigner(0);
    let config = {
        deploymentSigner: signer,
        ovmGasMeteringConfig: {
            minTransactionGasLimit: 0,
            maxTransactionGasLimit: 9000000,
            maxGasPerQueuePerEpoch: 1000000000000,
            secondsPerEpoch: 0,
        },
        ovmGlobalContext: {
            ovmCHAINID: 420,
            L2CrossDomainMessengerAddress: '0x4200000000000000000000000000000000000007',
        },
        transactionChainConfig: {
            sequencer: signer,
            forceInclusionPeriodSeconds: 600,
            forceInclusionPeriodBlocks: 600 / 12,
        },
        stateChainConfig: {
            fraudProofWindowSeconds: 600,
            sequencerPublishWindowSeconds: 60000,
        },
        whitelistConfig: {
            owner: signer,
            allowArbitraryContractDeployment: true,
        },
        l1CrossDomainMessengerConfig: {},
        dependencies: [
            'ERC1820Registry',
            'Lib_AddressManager',
            'OVM_DeployerWhitelist',
            'OVM_L1MessageSender',
            'OVM_L2ToL1MessagePasser',
            'OVM_ProxyEOA',
            'OVM_ECDSAContractAccount',
            'OVM_SequencerEntrypoint',
            'OVM_L2CrossDomainMessenger',
            'OVM_SafetyChecker',
            'OVM_ExecutionManager',
            'OVM_StateManager',
            'OVM_ETH',
        ],
        deployOverrides: {},
        waitForReceipts: false,
    };
    config = Object.assign(Object.assign({}, config), cfg);
    const ovmCompiled = [
        'OVM_L2ToL1MessagePasser',
        'OVM_L2CrossDomainMessenger',
        'OVM_SequencerEntrypoint',
        'Lib_AddressManager',
        'OVM_DeployerWhitelist',
        'OVM_ETH',
        'OVM_ECDSAContractAccount',
        'OVM_ProxyEOA',
    ];
    const deploymentResult = await contract_deployment_1.deploy(config);
    deploymentResult.contracts['Lib_AddressManager'] =
        deploymentResult.AddressManager;
    if (deploymentResult.failedDeployments.length > 0) {
        throw new Error(`Could not generate state dump, deploy failed for: ${deploymentResult.failedDeployments}`);
    }
    const pStateManager = ganache.engine.manager.state.blockchain.vm.pStateManager;
    const cStateManager = pStateManager._wrapped;
    const dump = {
        accounts: {},
    };
    for (let i = 0; i < Object.keys(deploymentResult.contracts).length; i++) {
        const name = Object.keys(deploymentResult.contracts)[i];
        const contract = deploymentResult.contracts[name];
        let code;
        if (ovmCompiled.includes(name)) {
            const ovmDeployedBytecode = contract_defs_1.getContractDefinition(name, true)
                .deployedBytecode;
            code = ovmDeployedBytecode
                .split('336000905af158601d01573d60011458600c01573d6000803e3d621234565260ea61109c52')
                .join('336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b');
        }
        else {
            const codeBuf = await pStateManager.getContractCode(core_utils_1.fromHexString(contract.address));
            code = core_utils_1.toHexString(codeBuf);
        }
        const deadAddress = predeploys_1.predeploys[name] ||
            `0xdeaddeaddeaddeaddeaddeaddeaddeaddead${i.toString(16).padStart(4, '0')}`;
        let def;
        try {
            def = contract_defs_1.getContractDefinition(name.replace('Proxy__', ''));
        }
        catch (err) {
            def = contract_defs_1.getContractDefinition(name.replace('Proxy__', ''), true);
        }
        dump.accounts[name] = {
            address: deadAddress,
            code,
            codeHash: utils_1.keccak256(code),
            storage: await getStorageDump(cStateManager, contract.address),
            abi: def.abi,
        };
    }
    const addressMap = Object.keys(dump.accounts).map((name) => {
        return {
            originalAddress: deploymentResult.contracts[name].address,
            deadAddress: dump.accounts[name].address,
        };
    });
    for (const name of Object.keys(dump.accounts)) {
        dump.accounts[name].storage = sanitizeStorageDump(dump.accounts[name].storage, addressMap);
    }
    dump.accounts['OVM_GasMetadata'] = {
        address: '0x06a506a506a506a506a506a506a506a506a506a5',
        code: '0x00',
        codeHash: utils_1.keccak256('0x00'),
        storage: {},
        abi: [],
    };
    return dump;
};
exports.makeStateDump = makeStateDump;
const getLatestStateDump = () => {
    return require(path.join(__dirname, '../dumps', `state-dump.latest.json`));
};
exports.getLatestStateDump = getLatestStateDump;
//# sourceMappingURL=contract-dumps.js.map