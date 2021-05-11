import { Contract } from 'ethers';
import { RollupDeployConfig } from './config';
export interface DeployResult {
    AddressManager: Contract;
    failedDeployments: string[];
    contracts: {
        [name: string]: Contract;
    };
}
export declare const deploy: (config: RollupDeployConfig) => Promise<DeployResult>;
