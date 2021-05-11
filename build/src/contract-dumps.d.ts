import { RollupDeployConfig } from './contract-deployment';
interface StorageDump {
    [key: string]: string;
}
export interface StateDump {
    accounts: {
        [name: string]: {
            address: string;
            code: string;
            codeHash: string;
            storage: StorageDump;
            abi: any;
        };
    };
}
export declare const makeStateDump: (cfg: RollupDeployConfig) => Promise<any>;
export declare const getLatestStateDump: () => StateDump;
export {};
