"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KECCAK_256_NULL = exports.EMPTY_ACCOUNT_CODE_HASH = exports.getStorageXOR = exports.STORAGE_XOR = exports.Helper_TestRunner_BYTELEN = exports.NUISANCE_GAS_COSTS = exports.STORAGE_XOR_VALUE = exports.VERIFIED_EMPTY_CONTRACT_HASH = exports.NON_ZERO_ADDRESS = exports.NON_NULL_BYTES32 = exports.FORCE_INCLUSION_PERIOD_BLOCKS = exports.FORCE_INCLUSION_PERIOD_SECONDS = exports.RUN_OVM_TEST_GAS = exports.OVM_TX_GAS_LIMIT = exports.DEFAULT_ACCOUNTS_HARDHAT = exports.DEFAULT_ACCOUNTS = void 0;
const ethers_1 = require("ethers");
const ethereum_waffle_1 = require("ethereum-waffle");
const core_utils_1 = require("@eth-optimism/core-utils");
const buffer_xor_1 = __importDefault(require("buffer-xor"));
const src_1 = require("../../src");
exports.DEFAULT_ACCOUNTS = ethereum_waffle_1.defaultAccounts;
exports.DEFAULT_ACCOUNTS_HARDHAT = ethereum_waffle_1.defaultAccounts.map((account) => {
    return {
        balance: ethers_1.ethers.BigNumber.from(account.balance).toHexString(),
        privateKey: account.secretKey,
    };
});
exports.OVM_TX_GAS_LIMIT = 10000000;
exports.RUN_OVM_TEST_GAS = 20000000;
exports.FORCE_INCLUSION_PERIOD_SECONDS = 600;
exports.FORCE_INCLUSION_PERIOD_BLOCKS = 600 / 12;
exports.NON_NULL_BYTES32 = '0x1111111111111111111111111111111111111111111111111111111111111111';
exports.NON_ZERO_ADDRESS = '0x1111111111111111111111111111111111111111';
exports.VERIFIED_EMPTY_CONTRACT_HASH = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.STORAGE_XOR_VALUE = '0xFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEFFEEDFACECAFEBEEF';
exports.NUISANCE_GAS_COSTS = {
    NUISANCE_GAS_SLOAD: 20000,
    NUISANCE_GAS_SSTORE: 20000,
    MIN_NUISANCE_GAS_PER_CONTRACT: 30000,
    NUISANCE_GAS_PER_CONTRACT_BYTE: 100,
    MIN_GAS_FOR_INVALID_STATE_ACCESS: 30000,
};
let len;
try {
    len = core_utils_1.fromHexString(src_1.getContractDefinition('Helper_TestRunner').deployedBytecode).byteLength;
}
catch (_a) { }
exports.Helper_TestRunner_BYTELEN = len;
exports.STORAGE_XOR = '0xfeedfacecafebeeffeedfacecafebeeffeedfacecafebeeffeedfacecafebeef';
const getStorageXOR = (key) => {
    return core_utils_1.toHexString(buffer_xor_1.default(core_utils_1.fromHexString(key), core_utils_1.fromHexString(exports.STORAGE_XOR)));
};
exports.getStorageXOR = getStorageXOR;
exports.EMPTY_ACCOUNT_CODE_HASH = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.KECCAK_256_NULL = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
//# sourceMappingURL=constants.js.map