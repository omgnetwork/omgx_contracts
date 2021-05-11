export declare const DEFAULT_ACCOUNTS: {
    balance: string;
    secretKey: string;
}[];
export declare const DEFAULT_ACCOUNTS_HARDHAT: {
    balance: string;
    privateKey: string;
}[];
export declare const OVM_TX_GAS_LIMIT = 10000000;
export declare const RUN_OVM_TEST_GAS = 20000000;
export declare const FORCE_INCLUSION_PERIOD_SECONDS = 600;
export declare const FORCE_INCLUSION_PERIOD_BLOCKS: number;
export declare const NON_NULL_BYTES32 = "0x1111111111111111111111111111111111111111111111111111111111111111";
export declare const NON_ZERO_ADDRESS = "0x1111111111111111111111111111111111111111";
export declare const VERIFIED_EMPTY_CONTRACT_HASH = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
export declare const STORAGE_XOR_VALUE = "0xFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEF";
export declare const NUISANCE_GAS_COSTS: {
    NUISANCE_GAS_SLOAD: number;
    NUISANCE_GAS_SSTORE: number;
    MIN_NUISANCE_GAS_PER_CONTRACT: number;
    NUISANCE_GAS_PER_CONTRACT_BYTE: number;
    MIN_GAS_FOR_INVALID_STATE_ACCESS: number;
};
export declare const Helper_TestRunner_BYTELEN: any;
export declare const STORAGE_XOR = "0xfeedfacecafebeeffeedfacecafebeeffeedfacecafebeeffeedfacecafebeef";
export declare const getStorageXOR: (key: string) => string;
export declare const EMPTY_ACCOUNT_CODE_HASH = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
export declare const KECCAK_256_NULL = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
