import { Contract } from 'ethers';
export declare const setProxyTarget: (AddressManager: Contract, name: string, target: Contract) => Promise<void>;
export declare const makeAddressManager: () => Promise<Contract>;
