"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUMMY_BYTECODE_HASH = exports.UNSAFE_BYTECODE = exports.DUMMY_BYTECODE_BYTELEN = exports.DUMMY_BYTECODE = void 0;
const utils_1 = require("ethers/lib/utils");
exports.DUMMY_BYTECODE = '0x123412341234';
exports.DUMMY_BYTECODE_BYTELEN = 6;
exports.UNSAFE_BYTECODE = '0x6069606955';
exports.DUMMY_BYTECODE_HASH = utils_1.keccak256(exports.DUMMY_BYTECODE);
//# sourceMappingURL=bytecode.js.map