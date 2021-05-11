"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTestStep_Run = exports.isTestStep_CREATE2 = exports.isTestStep_CREATEEOA = exports.isTestStep_CREATE = exports.isTestStep_CALL = exports.isTestStep_REVERT = exports.isTestStep_EXTCODECOPY = exports.isTestStep_EXTCODEHASH = exports.isTestStep_EXTCODESIZE = exports.isTestStep_INCREMENTNONCE = exports.isTestStep_SLOAD = exports.isTestStep_SSTORE = exports.isTestStep_Context = exports.isTestStep_evm = exports.isRevertFlagError = void 0;
const isRevertFlagError = (expectedReturnValue) => {
    return (typeof expectedReturnValue === 'object' &&
        expectedReturnValue !== null &&
        expectedReturnValue.flag !== undefined);
};
exports.isRevertFlagError = isRevertFlagError;
const isTestStep_evm = (step) => {
    return ['evmRETURN', 'evmREVERT', 'evmINVALID'].includes(step.functionName);
};
exports.isTestStep_evm = isTestStep_evm;
const isTestStep_Context = (step) => {
    return [
        'ovmCALLER',
        'ovmNUMBER',
        'ovmADDRESS',
        'ovmNUMBER',
        'ovmL1TXORIGIN',
        'ovmTIMESTAMP',
        'ovmGASLIMIT',
        'ovmCHAINID',
        'ovmL1QUEUEORIGIN',
        'ovmGETNONCE',
    ].includes(step.functionName);
};
exports.isTestStep_Context = isTestStep_Context;
const isTestStep_SSTORE = (step) => {
    return step.functionName === 'ovmSSTORE';
};
exports.isTestStep_SSTORE = isTestStep_SSTORE;
const isTestStep_SLOAD = (step) => {
    return step.functionName === 'ovmSLOAD';
};
exports.isTestStep_SLOAD = isTestStep_SLOAD;
const isTestStep_INCREMENTNONCE = (step) => {
    return step.functionName === 'ovmINCREMENTNONCE';
};
exports.isTestStep_INCREMENTNONCE = isTestStep_INCREMENTNONCE;
const isTestStep_EXTCODESIZE = (step) => {
    return step.functionName === 'ovmEXTCODESIZE';
};
exports.isTestStep_EXTCODESIZE = isTestStep_EXTCODESIZE;
const isTestStep_EXTCODEHASH = (step) => {
    return step.functionName === 'ovmEXTCODEHASH';
};
exports.isTestStep_EXTCODEHASH = isTestStep_EXTCODEHASH;
const isTestStep_EXTCODECOPY = (step) => {
    return step.functionName === 'ovmEXTCODECOPY';
};
exports.isTestStep_EXTCODECOPY = isTestStep_EXTCODECOPY;
const isTestStep_REVERT = (step) => {
    return step.functionName === 'ovmREVERT';
};
exports.isTestStep_REVERT = isTestStep_REVERT;
const isTestStep_CALL = (step) => {
    return ['ovmCALL', 'ovmSTATICCALL', 'ovmDELEGATECALL'].includes(step.functionName);
};
exports.isTestStep_CALL = isTestStep_CALL;
const isTestStep_CREATE = (step) => {
    return step.functionName === 'ovmCREATE';
};
exports.isTestStep_CREATE = isTestStep_CREATE;
const isTestStep_CREATEEOA = (step) => {
    return step.functionName === 'ovmCREATEEOA';
};
exports.isTestStep_CREATEEOA = isTestStep_CREATEEOA;
const isTestStep_CREATE2 = (step) => {
    return step.functionName === 'ovmCREATE2';
};
exports.isTestStep_CREATE2 = isTestStep_CREATE2;
const isTestStep_Run = (step) => {
    return step.functionName === 'run';
};
exports.isTestStep_Run = isTestStep_Run;
//# sourceMappingURL=test.types.js.map