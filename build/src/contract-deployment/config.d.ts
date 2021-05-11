import { Signer, ContractFactory, Contract } from 'ethers';
import { Overrides } from '@ethersproject/contracts';
export interface RollupDeployConfig {
    deploymentSigner: Signer;
    ovmGasMeteringConfig: {
        minTransactionGasLimit: number;
        maxTransactionGasLimit: number;
        maxGasPerQueuePerEpoch: number;
        secondsPerEpoch: number;
    };
    ovmGlobalContext: {
        ovmCHAINID: number;
        L2CrossDomainMessengerAddress: string;
    };
    transactionChainConfig: {
        sequencer: string | Signer;
        forceInclusionPeriodSeconds: number;
        forceInclusionPeriodBlocks: number;
    };
    stateChainConfig: {
        fraudProofWindowSeconds: number;
        sequencerPublishWindowSeconds: number;
    };
    l1CrossDomainMessengerConfig: {
        relayerAddress?: string | Signer;
    };
    whitelistConfig: {
        owner: string | Signer;
        allowArbitraryContractDeployment: boolean;
    };
    addressManager?: string;
    dependencies?: string[];
    deployOverrides: Overrides;
    waitForReceipts: boolean;
}
export interface ContractDeployParameters {
    factory: ContractFactory;
    params?: any[];
    afterDeploy?: (contracts?: {
        [name: string]: Contract;
    }) => Promise<void>;
}
export interface ContractDeployConfig {
    [name: string]: ContractDeployParameters;
}
export declare const makeContractDeployConfig: (config: RollupDeployConfig, AddressManager: Contract) => Promise<ContractDeployConfig>;
