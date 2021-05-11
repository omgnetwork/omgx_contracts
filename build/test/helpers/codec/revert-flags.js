"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVERT_FLAGS = exports.decodeRevertData = exports.encodeRevertData = void 0;
const hardhat_1 = require("hardhat");
const encodeRevertData = (flag, data = '0x', nuisanceGasLeft = 0, ovmGasRefund = 0) => {
    const abiEncoded = hardhat_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256', 'uint256', 'bytes'], [flag, nuisanceGasLeft, ovmGasRefund, data]);
    return abiEncoded;
};
exports.encodeRevertData = encodeRevertData;
const decodeRevertData = (revertData) => {
    const decoded = hardhat_1.ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256', 'uint256', 'bytes'], revertData);
    return ('[revertFlag:' +
        Object.keys(exports.REVERT_FLAGS)[decoded[0]] +
        ', nuisanceGasLeft:' +
        decoded[1] +
        ', ovmGasRefund: ' +
        decoded[2] +
        ', data: ' +
        decoded[3] +
        ']');
};
exports.decodeRevertData = decodeRevertData;
exports.REVERT_FLAGS = {
    OUT_OF_GAS: 0,
    INTENTIONAL_REVERT: 1,
    EXCEEDS_NUISANCE_GAS: 2,
    INVALID_STATE_ACCESS: 3,
    UNSAFE_BYTECODE: 4,
    CREATE_COLLISION: 5,
    STATIC_VIOLATION: 6,
    CREATOR_NOT_ALLOWED: 7,
};
//# sourceMappingURL=revert-flags.js.map