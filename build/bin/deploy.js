#!/usr/bin/env ts-node-script
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const path_1 = __importDefault(require("path"));
const directory_tree_1 = __importDefault(require("directory-tree"));
const fs_1 = __importDefault(require("fs"));
process.env.HARDHAT_NETWORK = 'rinkeby';
process.env.CONTRACTS_TARGET_NETWORK = 'rinkeby';
process.env.CONTRACTS_DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY;
process.env.CONTRACTS_RPC_URL = process.env.L1_NODE_WEB3_URL || 'http://127.0.0.1:8545';
const hardhat_1 = __importDefault(require("hardhat"));
const sequencer = new ethers_1.Wallet(process.env.SEQUENCER_PRIVATE_KEY);
const deployer = new ethers_1.Wallet(process.env.DEPLOYER_PRIVATE_KEY);
const main = async () => {
    const config = parseEnv();
    await hardhat_1.default.run('deploy', {
        l1BlockTimeSeconds: config.l1BlockTimeSeconds,
        ctcForceInclusionPeriodSeconds: config.ctcForceInclusionPeriodSeconds,
        ctcMaxTransactionGasLimit: config.ctcMaxTransactionGasLimit,
        emMinTransactionGasLimit: config.emMinTransactionGasLimit,
        emMaxtransactionGasLimit: config.emMaxtransactionGasLimit,
        emMaxGasPerQueuePerEpoch: config.emMaxGasPerQueuePerEpoch,
        emSecondsPerEpoch: config.emSecondsPerEpoch,
        emOvmChainId: config.emOvmChainId,
        sccFraudProofWindow: config.sccFraudProofWindow,
        sccSequencerPublishWindow: config.sccFraudProofWindow,
        ovmSequencerAddress: sequencer.address,
        ovmProposerAddress: sequencer.address,
        ovmRelayerAddress: sequencer.address,
        ovmAddressManagerOwner: deployer.address,
        noCompile: process.env.NO_COMPILE ? true : false,
    });
    const nicknames = {
        'Lib_AddressManager': 'AddressManager',
        'mockOVM_BondManager': 'OVM_BondManager'
    };
    const contracts = directory_tree_1.default(path_1.default.resolve(__dirname, `../deployments/rinkeby`)).children.filter((child) => {
        return child.extension === '.json';
    }).reduce((contracts, child) => {
        const contractName = child.name.replace('.json', '');
        const artifact = require(path_1.default.resolve(__dirname, `../deployments/rinkeby/${child.name}`));
        contracts[nicknames[contractName] || contractName] = artifact.address;
        return contracts;
    }, {});
    contracts.OVM_Sequencer = await sequencer.getAddress();
    contracts.Deployer = await deployer.getAddress();
    const addresses = JSON.stringify(contracts, null, 2);
    const dumpsPath = path_1.default.resolve(__dirname, "../dist/dumps");
    if (!fs_1.default.existsSync(dumpsPath)) {
        fs_1.default.mkdirSync(dumpsPath);
    }
    const addrsPath = path_1.default.resolve(dumpsPath, 'addresses.json');
    fs_1.default.writeFileSync(addrsPath, addresses);
};
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.log(JSON.stringify({ error: error.message, stack: error.stack }, null, 2));
    process.exit(1);
});
function parseEnv() {
    function ensure(env, type) {
        if (typeof process.env[env] === 'undefined')
            return undefined;
        if (type === 'number')
            return parseInt(process.env[env], 10);
        return process.env[env];
    }
    return {
        l1BlockTimeSeconds: ensure('BLOCK_TIME_SECONDS', 'number'),
        ctcForceInclusionPeriodSeconds: ensure('FORCE_INCLUSION_PERIOD_SECONDS', 'number'),
        ctcMaxTransactionGasLimit: ensure('MAX_TRANSACTION_GAS_LIMIT', 'number'),
        emMinTransactionGasLimit: ensure('MIN_TRANSACTION_GAS_LIMIT', 'number'),
        emMaxtransactionGasLimit: ensure('MAX_TRANSACTION_GAS_LIMIT', 'number'),
        emMaxGasPerQueuePerEpoch: ensure('MAX_GAS_PER_QUEUE_PER_EPOCH', 'number'),
        emSecondsPerEpoch: ensure('ECONDS_PER_EPOCH', 'number'),
        emOvmChainId: ensure('CHAIN_ID', 'number'),
        sccFraudProofWindow: ensure('FRAUD_PROOF_WINDOW_SECONDS', 'number'),
        sccSequencerPublishWindow: ensure('SEQUENCER_PUBLISH_WINDOW_SECONDS', 'number'),
    };
}
//# sourceMappingURL=deploy.js.map