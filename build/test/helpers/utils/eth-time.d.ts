export declare const getEthTime: (provider: any) => Promise<number>;
export declare const setEthTime: (provider: any, time: number) => Promise<void>;
export declare const increaseEthTime: (provider: any, amount: number) => Promise<void>;
export declare const mineBlock: (provider: any, timestamp?: number) => Promise<void>;
export declare const getBlockTime: (provider: any, block?: number) => Promise<number>;
export declare const getNextBlockNumber: (provider: any) => Promise<number>;
