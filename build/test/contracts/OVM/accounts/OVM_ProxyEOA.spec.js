"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
const callPredeploy = async (Helper_PredeployCaller, predeploy, functionName, functionParams, ethCall = false) => {
    if (ethCall) {
        return Helper_PredeployCaller.callStatic.callPredeployAbi(predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []));
    }
    return Helper_PredeployCaller.callPredeploy(predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []));
};
const addrToBytes32 = (addr) => '0x' + '00'.repeat(12) + core_utils_1.remove0x(addr);
const eoaDefaultAddr = '0x4200000000000000000000000000000000000003';
describe('OVM_ProxyEOA', () => {
    let wallet;
    before(async () => {
        const provider = hardhat_1.waffle.provider;
        [wallet] = provider.getWallets();
    });
    let Mock__OVM_ExecutionManager;
    let Mock__OVM_ECDSAContractAccount;
    let Helper_PredeployCaller;
    before(async () => {
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
        Helper_PredeployCaller = await (await hardhat_1.ethers.getContractFactory('Helper_PredeployCaller')).deploy();
        Helper_PredeployCaller.setTarget(Mock__OVM_ExecutionManager.address);
        Mock__OVM_ECDSAContractAccount = await smock_1.smockit(src_1.getContractInterface('OVM_ECDSAContractAccount', true));
    });
    let OVM_ProxyEOAFactory;
    before(async () => {
        OVM_ProxyEOAFactory = src_1.getContractFactory('OVM_ProxyEOA', wallet, true);
    });
    let OVM_ProxyEOA;
    beforeEach(async () => {
        OVM_ProxyEOA = await OVM_ProxyEOAFactory.deploy();
        Mock__OVM_ExecutionManager.smocked.ovmADDRESS.will.return.with(OVM_ProxyEOA.address);
        Mock__OVM_ExecutionManager.smocked.ovmCALLER.will.return.with(OVM_ProxyEOA.address);
    });
    describe('getImplementation()', () => {
        it(`should be created with implementation at predeploy address`, async () => {
            const eoaDefaultAddrBytes32 = addrToBytes32(eoaDefaultAddr);
            Mock__OVM_ExecutionManager.smocked.ovmSLOAD.will.return.with(eoaDefaultAddrBytes32);
            const implAddrBytes32 = await callPredeploy(Helper_PredeployCaller, OVM_ProxyEOA, 'getImplementation', [], true);
            setup_1.expect(implAddrBytes32).to.equal(eoaDefaultAddrBytes32);
        });
    });
    describe('upgrade()', () => {
        const implSlotKey = '0xdeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddead';
        it(`should upgrade the proxy implementation`, async () => {
            const newImpl = `0x${'81'.repeat(20)}`;
            const newImplBytes32 = addrToBytes32(newImpl);
            await callPredeploy(Helper_PredeployCaller, OVM_ProxyEOA, 'upgrade', [
                newImpl,
            ]);
            const ovmSSTORE = Mock__OVM_ExecutionManager.smocked.ovmSSTORE.calls[0];
            setup_1.expect(ovmSSTORE._key).to.equal(implSlotKey);
            setup_1.expect(ovmSSTORE._value).to.equal(newImplBytes32);
        });
        it(`should not allow upgrade of the proxy implementation by another account`, async () => {
            Mock__OVM_ExecutionManager.smocked.ovmCALLER.will.return.with(await wallet.getAddress());
            const newImpl = `0x${'81'.repeat(20)}`;
            await callPredeploy(Helper_PredeployCaller, OVM_ProxyEOA, 'upgrade', [
                newImpl,
            ]);
            const ovmREVERT = Mock__OVM_ExecutionManager.smocked.ovmREVERT.calls[0];
            setup_1.expect(helpers_1.decodeSolidityError(ovmREVERT._data)).to.equal('EOAs can only upgrade their own EOA implementation');
        });
    });
    describe('fallback()', () => {
        it(`should call delegateCall with right calldata`, async () => {
            Mock__OVM_ExecutionManager.smocked.ovmSLOAD.will.return.with(addrToBytes32(Mock__OVM_ECDSAContractAccount.address));
            Mock__OVM_ExecutionManager.smocked.ovmDELEGATECALL.will.return.with([
                true,
                '0x1234',
            ]);
            const calldata = '0xdeadbeef';
            await Helper_PredeployCaller.callPredeploy(OVM_ProxyEOA.address, calldata);
            const ovmDELEGATECALL = Mock__OVM_ExecutionManager.smocked.ovmDELEGATECALL.calls[0];
            setup_1.expect(ovmDELEGATECALL._address).to.equal(Mock__OVM_ECDSAContractAccount.address);
            setup_1.expect(ovmDELEGATECALL._calldata).to.equal(calldata);
        });
        it.skip(`should return data from fallback`, async () => {
        });
        it.skip(`should revert in fallback`, async () => {
        });
    });
});
//# sourceMappingURL=OVM_ProxyEOA.spec.js.map