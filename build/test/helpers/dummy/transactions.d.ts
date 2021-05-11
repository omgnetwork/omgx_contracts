export interface Transaction {
    timestamp: number;
    blockNumber: number;
    l1QueueOrigin: number;
    l1TxOrigin: string;
    entrypoint: string;
    gasLimit: number;
    data: string;
}
export declare const DUMMY_OVM_TRANSACTIONS: Array<Transaction>;
export declare const hashTransaction: ({ timestamp, blockNumber, l1QueueOrigin, l1TxOrigin, entrypoint, gasLimit, data, }: Transaction) => string;
