import { Wallet } from 'ethers';
export interface EIP155Transaction {
    nonce: number;
    gasLimit: number;
    gasPrice: number;
    to: string;
    data: string;
    chainId: number;
}
export interface SignatureParameters {
    messageHash: string;
    v: string;
    r: string;
    s: string;
}
export declare const DEFAULT_EIP155_TX: EIP155Transaction;
export declare const getRawSignedComponents: (signed: string) => any[];
export declare const getSignedComponents: (signed: string) => any[];
export declare const encodeCompactTransaction: (transaction: any) => string;
export declare const serializeEthSignTransaction: (transaction: EIP155Transaction) => string;
export declare const serializeNativeTransaction: (transaction: EIP155Transaction) => string;
export declare const signEthSignMessage: (wallet: Wallet, transaction: EIP155Transaction) => Promise<SignatureParameters>;
export declare const signNativeTransaction: (wallet: Wallet, transaction: EIP155Transaction) => Promise<SignatureParameters>;
export declare const signTransaction: (wallet: Wallet, transaction: EIP155Transaction, transactionType: number) => Promise<SignatureParameters>;
export declare const encodeSequencerCalldata: (wallet: Wallet, transaction: EIP155Transaction, transactionType: number) => Promise<string>;
