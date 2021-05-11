"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
const callPredeploy = async (Helper_PredeployCaller, predeploy, functionName, functionParams, gasLimit) => {
    if (gasLimit) {
        return Helper_PredeployCaller.callPredeploy(predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []), { gasLimit });
    }
    return Helper_PredeployCaller.callPredeploy(predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []));
};
describe('OVM_ECDSAContractAccount', () => {
    let wallet;
    let badWallet;
    before(async () => {
        const provider = hardhat_1.waffle.provider;
        [wallet, badWallet] = provider.getWallets();
    });
    let Mock__OVM_ExecutionManager;
    let Helper_PredeployCaller;
    before(async () => {
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
        Helper_PredeployCaller = await (await hardhat_1.ethers.getContractFactory('Helper_PredeployCaller')).deploy();
        Helper_PredeployCaller.setTarget(Mock__OVM_ExecutionManager.address);
    });
    let Factory__OVM_ECDSAContractAccount;
    before(async () => {
        Factory__OVM_ECDSAContractAccount = src_1.getContractFactory('OVM_ECDSAContractAccount', wallet, true);
    });
    let OVM_ECDSAContractAccount;
    beforeEach(async () => {
        OVM_ECDSAContractAccount = await Factory__OVM_ECDSAContractAccount.deploy();
        Mock__OVM_ExecutionManager.smocked.ovmADDRESS.will.return.with(await wallet.getAddress());
        Mock__OVM_ExecutionManager.smocked.ovmEXTCODESIZE.will.return.with(1);
        Mock__OVM_ExecutionManager.smocked.ovmCHAINID.will.return.with(420);
        Mock__OVM_ExecutionManager.smocked.ovmGETNONCE.will.return.with(100);
        Mock__OVM_ExecutionManager.smocked.ovmCALL.will.return.with((gasLimit, target, data) => {
            if (target === src_1.predeploys.OVM_ETH) {
                return [
                    true,
                    '0x0000000000000000000000000000000000000000000000000000000000000001',
                ];
            }
            else {
                return [true, '0x'];
            }
        });
        Mock__OVM_ExecutionManager.smocked.ovmSTATICCALL.will.return.with((gasLimit, target, data) => {
            if (target === '0x0000000000000000000000000000000000000001') {
                const databuf = core_utils_1.fromHexString(data);
                const addr = hardhat_1.ethers.utils.recoverAddress(databuf.slice(0, 32), {
                    v: ethers_1.BigNumber.from(databuf.slice(32, 64)).toNumber(),
                    r: core_utils_1.toHexString(databuf.slice(64, 96)),
                    s: core_utils_1.toHexString(databuf.slice(96, 128)),
                });
                const ret = hardhat_1.ethers.utils.defaultAbiCoder.encode(['address'], [addr]);
                return [true, ret];
            }
            else {
                return [true, '0x'];
            }
        });
        Mock__OVM_ExecutionManager.smocked.ovmCREATE.will.return.with([
            helpers_1.NON_ZERO_ADDRESS,
            '0x',
        ]);
        Mock__OVM_ExecutionManager.smocked.ovmCALLER.will.return.with(helpers_1.NON_ZERO_ADDRESS);
    });
    describe('fallback()', () => {
        it(`should successfully execute an EIP155Transaction`, async () => {
            const message = helpers_1.serializeNativeTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signNativeTransaction(wallet, helpers_1.DEFAULT_EIP155_TX);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCALL = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[1];
            setup_1.expect(ovmCALL._address).to.equal(helpers_1.DEFAULT_EIP155_TX.to);
            setup_1.expect(ovmCALL._calldata).to.equal(helpers_1.DEFAULT_EIP155_TX.data);
        });
        it(`should successfully execute an ETHSignedTransaction`, async () => {
            const message = helpers_1.serializeEthSignTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signEthSignMessage(wallet, helpers_1.DEFAULT_EIP155_TX);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                1,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCALL = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[1];
            setup_1.expect(ovmCALL._address).to.equal(helpers_1.DEFAULT_EIP155_TX.to);
            setup_1.expect(ovmCALL._calldata).to.equal(helpers_1.DEFAULT_EIP155_TX.data);
        });
        it(`should ovmCREATE if EIP155Transaction.to is zero address`, async () => {
            const createTx = Object.assign(Object.assign({}, helpers_1.DEFAULT_EIP155_TX), { to: '' });
            const message = helpers_1.serializeNativeTransaction(createTx);
            const sig = await helpers_1.signNativeTransaction(wallet, createTx);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCREATE = Mock__OVM_ExecutionManager.smocked.ovmCREATE.calls[0];
            setup_1.expect(ovmCREATE._bytecode).to.equal(createTx.data);
        });
        it(`should revert on invalid signature`, async () => {
            const message = helpers_1.serializeNativeTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signNativeTransaction(badWallet, helpers_1.DEFAULT_EIP155_TX);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('Signature provided for EOA transaction execution is invalid.');
        });
        it(`should revert on incorrect nonce`, async () => {
            const alteredNonceTx = Object.assign(Object.assign({}, helpers_1.DEFAULT_EIP155_TX), { nonce: 99 });
            const message = helpers_1.serializeNativeTransaction(alteredNonceTx);
            const sig = await helpers_1.signNativeTransaction(wallet, alteredNonceTx);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('Transaction nonce does not match the expected nonce.');
        });
        it(`should revert on incorrect chainId`, async () => {
            const alteredChainIdTx = Object.assign(Object.assign({}, helpers_1.DEFAULT_EIP155_TX), { chainId: 421 });
            const message = helpers_1.serializeNativeTransaction(alteredChainIdTx);
            const sig = await helpers_1.signNativeTransaction(wallet, alteredChainIdTx);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('Transaction chainId does not match expected OVM chainId.');
        });
        it.skip(`should revert on insufficient gas`, async () => {
            const alteredInsufficientGasTx = Object.assign(Object.assign({}, helpers_1.DEFAULT_EIP155_TX), { gasLimit: 200000000 });
            const message = helpers_1.serializeNativeTransaction(alteredInsufficientGasTx);
            const sig = await helpers_1.signNativeTransaction(wallet, alteredInsufficientGasTx);
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ], 40000000);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('Gas is not sufficient to execute the transaction.');
        });
        it(`should revert if fee is not transferred to the relayer`, async () => {
            const message = helpers_1.serializeNativeTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signNativeTransaction(wallet, helpers_1.DEFAULT_EIP155_TX);
            Mock__OVM_ExecutionManager.smocked.ovmCALL.will.return.with((gasLimit, target, data) => {
                if (target === '0x4200000000000000000000000000000000000006') {
                    return [
                        true,
                        '0x0000000000000000000000000000000000000000000000000000000000000000',
                    ];
                }
                else {
                    return [true, '0x'];
                }
            });
            await callPredeploy(Helper_PredeployCaller, OVM_ECDSAContractAccount, 'execute', [
                message,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ], 40000000);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('Fee was not transferred to relayer.');
        });
    });
});
//# sourceMappingURL=OVM_ECDSAContractAccount.spec.js.map