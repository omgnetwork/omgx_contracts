import { Signer } from 'ethers';
export declare const deployContractCode: (code: string, signer: Signer, gasLimit: number) => Promise<string>;
