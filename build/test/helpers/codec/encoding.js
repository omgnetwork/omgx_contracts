"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSequencerCalldata = exports.signTransaction = exports.signNativeTransaction = exports.signEthSignMessage = exports.serializeNativeTransaction = exports.serializeEthSignTransaction = exports.encodeCompactTransaction = exports.getSignedComponents = exports.getRawSignedComponents = exports.DEFAULT_EIP155_TX = void 0;
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const core_utils_1 = require("@eth-optimism/core-utils");
exports.DEFAULT_EIP155_TX = {
    to: `0x${'12'.repeat(20)}`,
    nonce: 100,
    gasLimit: 1000000,
    gasPrice: 100000000,
    data: `0x${'99'.repeat(10)}`,
    chainId: 420,
};
const getRawSignedComponents = (signed) => {
    return [signed.slice(130, 132), signed.slice(2, 66), signed.slice(66, 130)];
};
exports.getRawSignedComponents = getRawSignedComponents;
const getSignedComponents = (signed) => {
    return hardhat_1.ethers.utils.RLP.decode(signed).slice(-3);
};
exports.getSignedComponents = getSignedComponents;
const encodeCompactTransaction = (transaction) => {
    const nonce = hardhat_1.ethers.utils.zeroPad(transaction.nonce, 3);
    const gasLimit = hardhat_1.ethers.utils.zeroPad(transaction.gasLimit, 3);
    if (transaction.gasPrice % 1000000 !== 0)
        throw Error('gas price must be a multiple of 1000000');
    const compressedGasPrice = transaction.gasPrice / 1000000;
    const gasPrice = hardhat_1.ethers.utils.zeroPad(compressedGasPrice, 3);
    const to = !transaction.to.length
        ? core_utils_1.fromHexString(ethers_1.constants.AddressZero)
        : core_utils_1.fromHexString(transaction.to);
    const data = core_utils_1.fromHexString(transaction.data);
    return Buffer.concat([
        Buffer.from(gasLimit),
        Buffer.from(gasPrice),
        Buffer.from(nonce),
        Buffer.from(to),
        data,
    ]).toString('hex');
};
exports.encodeCompactTransaction = encodeCompactTransaction;
const serializeEthSignTransaction = (transaction) => {
    return hardhat_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256', 'uint256', 'uint256', 'address', 'bytes'], [
        transaction.nonce,
        transaction.gasLimit,
        transaction.gasPrice,
        transaction.chainId,
        transaction.to,
        transaction.data,
    ]);
};
exports.serializeEthSignTransaction = serializeEthSignTransaction;
const serializeNativeTransaction = (transaction) => {
    return hardhat_1.ethers.utils.serializeTransaction(transaction);
};
exports.serializeNativeTransaction = serializeNativeTransaction;
const signEthSignMessage = async (wallet, transaction) => {
    const serializedTransaction = exports.serializeEthSignTransaction(transaction);
    const transactionHash = hardhat_1.ethers.utils.keccak256(serializedTransaction);
    const transactionHashBytes = hardhat_1.ethers.utils.arrayify(transactionHash);
    const transactionSignature = await wallet.signMessage(transactionHashBytes);
    const messageHash = hardhat_1.ethers.utils.hashMessage(transactionHashBytes);
    const [v, r, s] = exports.getRawSignedComponents(transactionSignature).map((component) => {
        return core_utils_1.remove0x(component);
    });
    return {
        messageHash,
        v: '0' + (parseInt(v, 16) - 27),
        r,
        s,
    };
};
exports.signEthSignMessage = signEthSignMessage;
const signNativeTransaction = async (wallet, transaction) => {
    const serializedTransaction = exports.serializeNativeTransaction(transaction);
    const transactionSignature = await wallet.signTransaction(transaction);
    const messageHash = hardhat_1.ethers.utils.keccak256(serializedTransaction);
    const [v, r, s] = exports.getSignedComponents(transactionSignature).map((component) => {
        return core_utils_1.remove0x(component);
    });
    return {
        messageHash,
        v: '0' + (parseInt(v, 16) - transaction.chainId * 2 - 8 - 27),
        r,
        s,
    };
};
exports.signNativeTransaction = signNativeTransaction;
const signTransaction = async (wallet, transaction, transactionType) => {
    return transactionType === 2
        ? exports.signEthSignMessage(wallet, transaction)
        : exports.signNativeTransaction(wallet, transaction);
};
exports.signTransaction = signTransaction;
const encodeSequencerCalldata = async (wallet, transaction, transactionType) => {
    const sig = await exports.signTransaction(wallet, transaction, transactionType);
    const encodedTransaction = exports.encodeCompactTransaction(transaction);
    const dataPrefix = `0x0${transactionType}${sig.r}${sig.s}${sig.v}`;
    const calldata = transactionType === 1
        ? `${dataPrefix}${core_utils_1.remove0x(sig.messageHash)}`
        : `${dataPrefix}${encodedTransaction}`;
    return calldata;
};
exports.encodeSequencerCalldata = encodeSequencerCalldata;
//# sourceMappingURL=encoding.js.map