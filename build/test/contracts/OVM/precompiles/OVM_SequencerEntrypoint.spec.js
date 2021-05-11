"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const src_1 = require("../../../../src");
const helpers_1 = require("../../../helpers");
describe('OVM_SequencerEntrypoint', () => {
    let wallet;
    before(async () => {
        const provider = hardhat_1.waffle.provider;
        [wallet] = provider.getWallets();
    });
    let Mock__OVM_ExecutionManager;
    let Helper_PredeployCaller;
    before(async () => {
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
        Mock__OVM_ExecutionManager.smocked.ovmCHAINID.will.return.with(420);
        Mock__OVM_ExecutionManager.smocked.ovmCALL.will.return.with((gasLimit, target, data) => {
            if (target === wallet.address) {
                return [
                    true,
                    iOVM_ECDSAContractAccount.encodeFunctionResult('execute', [
                        true,
                        '0x',
                    ]),
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
        Helper_PredeployCaller = await (await hardhat_1.ethers.getContractFactory('Helper_PredeployCaller')).deploy();
        Helper_PredeployCaller.setTarget(Mock__OVM_ExecutionManager.address);
    });
    let OVM_SequencerEntrypointFactory;
    before(async () => {
        OVM_SequencerEntrypointFactory = src_1.getContractFactory('OVM_SequencerEntrypoint', wallet, true);
    });
    const iOVM_ECDSAContractAccount = src_1.getContractInterface('OVM_ECDSAContractAccount', true);
    let OVM_SequencerEntrypoint;
    beforeEach(async () => {
        OVM_SequencerEntrypoint = await OVM_SequencerEntrypointFactory.deploy();
        Mock__OVM_ExecutionManager.smocked.ovmEXTCODESIZE.will.return.with(1);
        Mock__OVM_ExecutionManager.smocked.ovmREVERT.will.revert();
    });
    describe('fallback()', async () => {
        it('should call EIP155 if the transaction type is 0', async () => {
            const calldata = await helpers_1.encodeSequencerCalldata(wallet, helpers_1.DEFAULT_EIP155_TX, 0);
            await Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata);
            const encodedTx = helpers_1.serializeNativeTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signNativeTransaction(wallet, helpers_1.DEFAULT_EIP155_TX);
            const expectedEOACalldata = iOVM_ECDSAContractAccount.encodeFunctionData('execute', [
                encodedTx,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCALL = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[0];
            setup_1.expect(ovmCALL._address).to.equal(await wallet.getAddress());
            setup_1.expect(ovmCALL._calldata).to.equal(expectedEOACalldata);
        });
        it('should send correct calldata if tx is a create and the transaction type is 0', async () => {
            const createTx = Object.assign(Object.assign({}, helpers_1.DEFAULT_EIP155_TX), { to: '' });
            const calldata = await helpers_1.encodeSequencerCalldata(wallet, createTx, 0);
            await Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata);
            const encodedTx = helpers_1.serializeNativeTransaction(createTx);
            const sig = await helpers_1.signNativeTransaction(wallet, createTx);
            const expectedEOACalldata = iOVM_ECDSAContractAccount.encodeFunctionData('execute', [
                encodedTx,
                0,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCALL = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[0];
            setup_1.expect(ovmCALL._address).to.equal(await wallet.getAddress());
            setup_1.expect(ovmCALL._calldata).to.equal(expectedEOACalldata);
        });
        for (let i = 0; i < 3; i += 2) {
            it(`should call ovmCreateEOA when tx type is ${i} and ovmEXTCODESIZE returns 0`, async () => {
                let firstCheck = true;
                Mock__OVM_ExecutionManager.smocked.ovmEXTCODESIZE.will.return.with(() => {
                    if (firstCheck) {
                        firstCheck = false;
                        return 0;
                    }
                    else {
                        return 1;
                    }
                });
                const calldata = await helpers_1.encodeSequencerCalldata(wallet, helpers_1.DEFAULT_EIP155_TX, i);
                await Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata);
                const call = Mock__OVM_ExecutionManager.smocked.ovmCREATEEOA.calls[0];
                const eoaAddress = hardhat_1.ethers.utils.recoverAddress(call._messageHash, {
                    v: call._v + 27,
                    r: call._r,
                    s: call._s,
                });
                setup_1.expect(eoaAddress).to.equal(await wallet.getAddress());
            });
        }
        it('should submit ETHSignedTypedData if TransactionType is 2', async () => {
            const calldata = await helpers_1.encodeSequencerCalldata(wallet, helpers_1.DEFAULT_EIP155_TX, 2);
            await Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata);
            const encodedTx = helpers_1.serializeEthSignTransaction(helpers_1.DEFAULT_EIP155_TX);
            const sig = await helpers_1.signEthSignMessage(wallet, helpers_1.DEFAULT_EIP155_TX);
            const expectedEOACalldata = iOVM_ECDSAContractAccount.encodeFunctionData('execute', [
                encodedTx,
                1,
                `0x${sig.v}`,
                `0x${sig.r}`,
                `0x${sig.s}`,
            ]);
            const ovmCALL = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[0];
            setup_1.expect(ovmCALL._address).to.equal(await wallet.getAddress());
            setup_1.expect(ovmCALL._calldata).to.equal(expectedEOACalldata);
        });
        it('should revert if TransactionType is >2', async () => {
            const calldata = '0x03';
            await setup_1.expect(Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata)).to.be.reverted;
        });
        it('should revert if TransactionType is 1', async () => {
            const calldata = '0x01';
            await setup_1.expect(Helper_PredeployCaller.callPredeploy(OVM_SequencerEntrypoint.address, calldata)).to.be.reverted;
        });
    });
});
//# sourceMappingURL=OVM_SequencerEntrypoint.spec.js.map