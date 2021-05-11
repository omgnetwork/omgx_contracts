export declare const encodeRevertData: (flag: number, data?: string, nuisanceGasLeft?: number, ovmGasRefund?: number) => string;
export declare const decodeRevertData: (revertData: string) => any;
export declare const REVERT_FLAGS: {
    OUT_OF_GAS: number;
    INTENTIONAL_REVERT: number;
    EXCEEDS_NUISANCE_GAS: number;
    INVALID_STATE_ACCESS: number;
    UNSAFE_BYTECODE: number;
    CREATE_COLLISION: number;
    STATIC_VIOLATION: number;
    CREATOR_NOT_ALLOWED: number;
};
