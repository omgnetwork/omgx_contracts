import { ContractFactory, Signer, providers, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
export declare const getContractDefinition: (name: string, ovm?: boolean) => any;
export declare const getContractInterface: (name: string, ovm?: boolean) => Interface;
export declare const getContractFactory: (name: string, signer?: Signer, ovm?: boolean) => ContractFactory;
export declare const loadContract: (name: string, address: string, provider: providers.JsonRpcProvider) => Contract;
export declare const loadContractFromManager: (args: {
    name: string;
    proxy?: string;
    Lib_AddressManager: Contract;
    provider: providers.JsonRpcProvider;
}) => Promise<Contract>;
