"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUMMY_ACCOUNTS = void 0;
const ethers_1 = require("ethers");
const bytes32_1 = require("./bytes32");
const constants_1 = require("../constants");
exports.DUMMY_ACCOUNTS = [
    {
        address: '0x1212121212121212121212121212121212121212',
        data: {
            nonce: ethers_1.BigNumber.from(123),
            balance: ethers_1.BigNumber.from(456),
            storageRoot: bytes32_1.DUMMY_BYTES32[0],
            codeHash: bytes32_1.DUMMY_BYTES32[1],
            ethAddress: ethers_1.constants.AddressZero,
        },
    },
    {
        address: '0x2121212121212121212121212121212121212121',
        data: {
            nonce: ethers_1.BigNumber.from(321),
            balance: ethers_1.BigNumber.from(654),
            storageRoot: bytes32_1.DUMMY_BYTES32[2],
            codeHash: bytes32_1.DUMMY_BYTES32[3],
            ethAddress: constants_1.NON_ZERO_ADDRESS,
        },
    },
];
//# sourceMappingURL=accounts.js.map