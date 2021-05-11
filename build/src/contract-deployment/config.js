"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeContractDeployConfig = void 0;
const contract_defs_1 = require("../contract-defs");
const makeContractDeployConfig = async (config, AddressManager) => {
    const _sendTx = async (txPromise) => {
        const res = await txPromise;
        if (config.waitForReceipts) {
            await res.wait();
        }
        return res;
    };
    return {
        OVM_L2CrossDomainMessenger: {
            factory: contract_defs_1.getContractFactory('OVM_L2CrossDomainMessenger'),
            params: [AddressManager.address],
        },
        OVM_L1CrossDomainMessenger: {
            factory: contract_defs_1.getContractFactory('OVM_L1CrossDomainMessenger'),
            params: [],
            afterDeploy: async (contracts) => {
                if (config.l1CrossDomainMessengerConfig.relayerAddress) {
                    const relayer = config.l1CrossDomainMessengerConfig.relayerAddress;
                    const address = typeof relayer === 'string' ? relayer : await relayer.getAddress();
                    await _sendTx(AddressManager.setAddress('OVM_L2MessageRelayer', address));
                }
            },
        },
        Proxy__OVM_L1CrossDomainMessenger: {
            factory: contract_defs_1.getContractFactory('Lib_ResolvedDelegateProxy'),
            params: [AddressManager.address, 'OVM_L1CrossDomainMessenger'],
            afterDeploy: async (contracts) => {
                const xDomainMessenger = contract_defs_1.getContractFactory('OVM_L1CrossDomainMessenger')
                    .connect(config.deploymentSigner)
                    .attach(contracts.Proxy__OVM_L1CrossDomainMessenger.address);
                await _sendTx(xDomainMessenger.initialize(AddressManager.address, config.deployOverrides));
                await _sendTx(AddressManager.setAddress('OVM_L2CrossDomainMessenger', config.ovmGlobalContext.L2CrossDomainMessengerAddress, config.deployOverrides));
            },
        },
        OVM_L1ETHGateway: {
            factory: contract_defs_1.getContractFactory('OVM_L1ETHGateway'),
            params: [],
        },
        Proxy__OVM_L1ETHGateway: {
            factory: contract_defs_1.getContractFactory('Lib_ResolvedDelegateProxy'),
            params: [AddressManager.address, 'OVM_L1ETHGateway'],
            afterDeploy: async (contracts) => {
                const l1EthGateway = contract_defs_1.getContractFactory('OVM_L1ETHGateway')
                    .connect(config.deploymentSigner)
                    .attach(contracts.Proxy__OVM_L1ETHGateway.address);
                await _sendTx(l1EthGateway.initialize(AddressManager.address, '0x4200000000000000000000000000000000000006', config.deployOverrides));
            },
        },
        OVM_L1MultiMessageRelayer: {
            factory: contract_defs_1.getContractFactory('OVM_L1MultiMessageRelayer'),
            params: [AddressManager.address],
        },
        OVM_CanonicalTransactionChain: {
            factory: contract_defs_1.getContractFactory('OVM_CanonicalTransactionChain'),
            params: [
                AddressManager.address,
                config.transactionChainConfig.forceInclusionPeriodSeconds,
                config.transactionChainConfig.forceInclusionPeriodBlocks,
                config.ovmGasMeteringConfig.maxTransactionGasLimit,
            ],
            afterDeploy: async () => {
                const sequencer = config.transactionChainConfig.sequencer;
                const sequencerAddress = typeof sequencer === 'string'
                    ? sequencer
                    : await sequencer.getAddress();
                await _sendTx(AddressManager.setAddress('OVM_DecompressionPrecompileAddress', '0x4200000000000000000000000000000000000005'));
                await _sendTx(AddressManager.setAddress('OVM_Sequencer', sequencerAddress));
                await _sendTx(AddressManager.setAddress('OVM_Proposer', sequencerAddress));
                await _sendTx(AddressManager.setAddress('Sequencer', sequencerAddress));
            },
        },
        OVM_StateCommitmentChain: {
            factory: contract_defs_1.getContractFactory('OVM_StateCommitmentChain'),
            params: [
                AddressManager.address,
                config.stateChainConfig.fraudProofWindowSeconds,
                config.stateChainConfig.sequencerPublishWindowSeconds,
            ],
        },
        OVM_DeployerWhitelist: {
            factory: contract_defs_1.getContractFactory('OVM_DeployerWhitelist', undefined, true),
            params: [],
        },
        OVM_L1MessageSender: {
            factory: contract_defs_1.getContractFactory('OVM_L1MessageSender'),
            params: [],
        },
        OVM_L2ToL1MessagePasser: {
            factory: contract_defs_1.getContractFactory('OVM_L2ToL1MessagePasser'),
            params: [],
        },
        OVM_SafetyChecker: {
            factory: contract_defs_1.getContractFactory('OVM_SafetyChecker'),
            params: [],
        },
        OVM_ExecutionManager: {
            factory: contract_defs_1.getContractFactory('OVM_ExecutionManager'),
            params: [
                AddressManager.address,
                config.ovmGasMeteringConfig,
                config.ovmGlobalContext,
            ],
        },
        OVM_StateManager: {
            factory: contract_defs_1.getContractFactory('OVM_StateManager'),
            params: [await config.deploymentSigner.getAddress()],
            afterDeploy: async (contracts) => {
                await _sendTx(contracts.OVM_StateManager.setExecutionManager(contracts.OVM_ExecutionManager.address, config.deployOverrides));
            },
        },
        OVM_StateManagerFactory: {
            factory: contract_defs_1.getContractFactory('OVM_StateManagerFactory'),
            params: [],
        },
        OVM_FraudVerifier: {
            factory: contract_defs_1.getContractFactory('OVM_FraudVerifier'),
            params: [AddressManager.address],
        },
        OVM_StateTransitionerFactory: {
            factory: contract_defs_1.getContractFactory('OVM_StateTransitionerFactory'),
            params: [AddressManager.address],
        },
        OVM_ECDSAContractAccount: {
            factory: contract_defs_1.getContractFactory('OVM_ECDSAContractAccount', undefined, true),
        },
        OVM_SequencerEntrypoint: {
            factory: contract_defs_1.getContractFactory('OVM_SequencerEntrypoint', undefined, true),
        },
        OVM_BondManager: {
            factory: contract_defs_1.getContractFactory('mockOVM_BondManager'),
            params: [AddressManager.address],
        },
        OVM_ETH: {
            factory: contract_defs_1.getContractFactory('OVM_ETH'),
            params: [
                '0x4200000000000000000000000000000000000007',
                '0x0000000000000000000000000000000000000000',
            ],
        },
        'OVM_ChainStorageContainer:CTC:batches': {
            factory: contract_defs_1.getContractFactory('OVM_ChainStorageContainer'),
            params: [AddressManager.address, 'OVM_CanonicalTransactionChain'],
        },
        'OVM_ChainStorageContainer:CTC:queue': {
            factory: contract_defs_1.getContractFactory('OVM_ChainStorageContainer'),
            params: [AddressManager.address, 'OVM_CanonicalTransactionChain'],
        },
        'OVM_ChainStorageContainer:SCC:batches': {
            factory: contract_defs_1.getContractFactory('OVM_ChainStorageContainer'),
            params: [AddressManager.address, 'OVM_StateCommitmentChain'],
        },
        ERC1820Registry: {
            factory: contract_defs_1.getContractFactory('ERC1820Registry'),
        },
        OVM_ProxyEOA: {
            factory: contract_defs_1.getContractFactory('OVM_ProxyEOA', undefined, true),
        },
    };
};
exports.makeContractDeployConfig = makeContractDeployConfig;
//# sourceMappingURL=config.js.map