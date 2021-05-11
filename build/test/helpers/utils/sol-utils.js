"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSolidityError = exports.decodeSolidityError = void 0;
const ethers_1 = require("ethers");
const errorABI = new ethers_1.ethers.utils.Interface([
    {
        type: 'function',
        inputs: [
            {
                type: 'string',
            },
        ],
        name: 'Error',
        stateMutability: 'pure',
    },
]);
const decodeSolidityError = (err) => {
    return errorABI.decodeFunctionData('Error', err)[0];
};
exports.decodeSolidityError = decodeSolidityError;
const encodeSolidityError = (message) => {
    return errorABI.encodeFunctionData('Error', [message]);
};
exports.encodeSolidityError = encodeSolidityError;
//# sourceMappingURL=sol-utils.js.map