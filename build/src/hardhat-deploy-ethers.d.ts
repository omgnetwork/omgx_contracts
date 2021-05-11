import { Contract } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
export declare const registerAddress: ({ hre, name, address, }: {
    hre: any;
    name: any;
    address: any;
}) => Promise<void>;
export declare const deployAndRegister: ({ hre, name, args, contract, }: {
    hre: any;
    name: string;
    args: any[];
    contract?: string;
}) => Promise<void>;
export declare const getDeployedContract: (hre: any, name: string, options?: {
    iface?: string;
    signerOrProvider?: Signer | Provider | string;
}) => Promise<Contract>;
