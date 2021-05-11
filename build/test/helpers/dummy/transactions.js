"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashTransaction = exports.DUMMY_OVM_TRANSACTIONS = void 0;
const ethers_1 = require("ethers");
exports.DUMMY_OVM_TRANSACTIONS = [
    ...Array(10).keys(),
].map((i) => {
    return {
        timestamp: i,
        blockNumber: 0,
        l1QueueOrigin: 0,
        l1TxOrigin: ethers_1.constants.AddressZero,
        entrypoint: ethers_1.constants.AddressZero,
        gasLimit: 0,
        data: ethers_1.ethers.constants.HashZero,
    };
});
const hashTransaction = ({ timestamp, blockNumber, l1QueueOrigin, l1TxOrigin, entrypoint, gasLimit, data, }) => {
    return ethers_1.ethers.utils.solidityKeccak256(['uint256', 'uint256', 'uint8', 'address', 'address', 'uint256', 'bytes'], [
        timestamp,
        blockNumber,
        l1QueueOrigin,
        l1TxOrigin,
        entrypoint,
        gasLimit,
        data,
    ]);
};
exports.hashTransaction = hashTransaction;
//# sourceMappingURL=transactions.js.map