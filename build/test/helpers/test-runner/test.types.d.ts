import { BigNumber } from 'ethers';
export declare type ContextOpcode = 'ovmCALLER' | 'ovmNUMBER' | 'ovmADDRESS' | 'ovmL1TXORIGIN' | 'ovmL1QUEUEORIGIN' | 'ovmTIMESTAMP' | 'ovmGASLIMIT' | 'ovmCHAINID' | 'ovmGETNONCE';
declare type CallOpcode = 'ovmCALL' | 'ovmSTATICCALL' | 'ovmDELEGATECALL';
declare type RevertFlagError = {
    flag: number;
    nuisanceGasLeft?: number;
    ovmGasRefund?: number;
    data?: string;
    onlyValidateFlag?: boolean;
};
interface TestStep_evm {
    functionName: 'evmRETURN' | 'evmREVERT' | 'evmINVALID';
    returnData?: string | RevertFlagError;
}
interface TestStep_Context {
    functionName: ContextOpcode;
    expectedReturnValue: string | number | BigNumber;
}
interface TestStep_REVERT {
    functionName: 'ovmREVERT';
    revertData?: string;
    expectedReturnStatus: boolean;
    expectedReturnValue?: string | RevertFlagError;
}
interface TestStep_EXTCODESIZE {
    functionName: 'ovmEXTCODESIZE';
    functionParams: {
        address: string;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: number | RevertFlagError;
}
interface TestStep_EXTCODEHASH {
    functionName: 'ovmEXTCODEHASH';
    functionParams: {
        address: string;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | RevertFlagError;
}
interface TestStep_EXTCODECOPY {
    functionName: 'ovmEXTCODECOPY';
    functionParams: {
        address: string;
        offset: number;
        length: number;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | RevertFlagError;
}
interface TestStep_SSTORE {
    functionName: 'ovmSSTORE';
    functionParams: {
        key: string;
        value: string;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue?: RevertFlagError;
}
interface TestStep_SLOAD {
    functionName: 'ovmSLOAD';
    functionParams: {
        key: string;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | RevertFlagError;
}
interface TestStep_INCREMENTNONCE {
    functionName: 'ovmINCREMENTNONCE';
    expectedReturnStatus: boolean;
    expectedReturnValue?: RevertFlagError;
}
export interface TestStep_CALL {
    functionName: CallOpcode;
    functionParams: {
        gasLimit: number | BigNumber;
        target: string;
        calldata?: string;
        subSteps?: TestStep[];
    };
    expectedReturnStatus: boolean;
    expectedReturnValue?: string | RevertFlagError | {
        ovmSuccess: boolean;
        returnData: string;
    };
}
interface TestStep_CREATE {
    functionName: 'ovmCREATE';
    functionParams: {
        bytecode?: string;
        subSteps?: TestStep[];
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | {
        address: string;
        revertData: string;
    } | RevertFlagError;
}
interface TestStep_CREATE2 {
    functionName: 'ovmCREATE2';
    functionParams: {
        salt: string;
        bytecode?: string;
        subSteps?: TestStep[];
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | {
        address: string;
        revertData: string;
    } | RevertFlagError;
}
interface TestStep_CREATEEOA {
    functionName: 'ovmCREATEEOA';
    functionParams: {
        _messageHash: string;
        _v: number;
        _r: string;
        _s: string;
    };
    expectedReturnStatus: boolean;
    expectedReturnValue: string | RevertFlagError;
}
export interface TestStep_Run {
    functionName: 'run';
    suppliedGas?: number;
    functionParams: {
        timestamp: number;
        queueOrigin: number;
        entrypoint: string;
        origin: string;
        msgSender: string;
        gasLimit: number;
        data?: string;
        subSteps?: TestStep[];
    };
    expectedRevertValue?: string;
}
export declare type TestStep = TestStep_Context | TestStep_SSTORE | TestStep_SLOAD | TestStep_INCREMENTNONCE | TestStep_CALL | TestStep_CREATE | TestStep_CREATE2 | TestStep_CREATEEOA | TestStep_EXTCODESIZE | TestStep_EXTCODEHASH | TestStep_EXTCODECOPY | TestStep_REVERT | TestStep_evm;
export interface ParsedTestStep {
    functionName: string;
    functionData: string;
    expectedReturnStatus: boolean;
    expectedReturnData: string;
    onlyValidateFlag: boolean;
}
export declare const isRevertFlagError: (expectedReturnValue: any) => expectedReturnValue is RevertFlagError;
export declare const isTestStep_evm: (step: TestStep) => step is TestStep_evm;
export declare const isTestStep_Context: (step: TestStep) => step is TestStep_Context;
export declare const isTestStep_SSTORE: (step: TestStep) => step is TestStep_SSTORE;
export declare const isTestStep_SLOAD: (step: TestStep) => step is TestStep_SLOAD;
export declare const isTestStep_INCREMENTNONCE: (step: TestStep) => step is TestStep_INCREMENTNONCE;
export declare const isTestStep_EXTCODESIZE: (step: TestStep) => step is TestStep_EXTCODESIZE;
export declare const isTestStep_EXTCODEHASH: (step: TestStep) => step is TestStep_EXTCODEHASH;
export declare const isTestStep_EXTCODECOPY: (step: TestStep) => step is TestStep_EXTCODECOPY;
export declare const isTestStep_REVERT: (step: TestStep) => step is TestStep_REVERT;
export declare const isTestStep_CALL: (step: TestStep) => step is TestStep_CALL;
export declare const isTestStep_CREATE: (step: TestStep) => step is TestStep_CREATE;
export declare const isTestStep_CREATEEOA: (step: TestStep) => step is TestStep_CREATEEOA;
export declare const isTestStep_CREATE2: (step: TestStep) => step is TestStep_CREATE2;
export declare const isTestStep_Run: (step: TestStep | TestStep_Run) => step is TestStep_Run;
interface TestState {
    ExecutionManager: any;
    StateManager: any;
}
export interface TestParameter {
    name: string;
    steps: Array<TestStep | TestStep_Run>;
    expectInvalidStateAccess?: boolean;
    focus?: boolean;
    skip?: boolean;
}
export interface TestDefinition {
    name: string;
    focus?: boolean;
    preState?: Partial<TestState>;
    postState?: Partial<TestState>;
    parameters?: TestParameter[];
    subTests?: TestDefinition[];
}
export {};
