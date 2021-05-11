"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const constants_1 = require("../../../helpers/constants");
const callPredeployStatic = async (Helper_PredeployCaller, predeploy, functionName, functionParams) => {
    return Helper_PredeployCaller.callStatic[functionName](predeploy.address, predeploy.interface.encodeFunctionData(functionName, functionParams || []));
};
describe('OVM_L1MessageSender', () => {
    let Mock__OVM_ExecutionManager;
    before(async () => {
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
    });
    let Helper_PredeployCaller;
    before(async () => {
        Helper_PredeployCaller = await (await hardhat_1.ethers.getContractFactory('Helper_PredeployCaller')).deploy();
        Helper_PredeployCaller.setTarget(Mock__OVM_ExecutionManager.address);
    });
    let Factory__OVM_L1MessageSender;
    before(async () => {
        Factory__OVM_L1MessageSender = await hardhat_1.ethers.getContractFactory('OVM_L1MessageSender');
    });
    let OVM_L1MessageSender;
    beforeEach(async () => {
        OVM_L1MessageSender = await Factory__OVM_L1MessageSender.deploy();
    });
    describe('getL1MessageSender', () => {
        before(async () => {
            Mock__OVM_ExecutionManager.smocked.ovmL1TXORIGIN.will.return.with(constants_1.NON_ZERO_ADDRESS);
        });
        it('should return the L1 message sender', async () => {
            setup_1.expect(await callPredeployStatic(Helper_PredeployCaller, OVM_L1MessageSender, 'getL1MessageSender')).to.equal(constants_1.NON_ZERO_ADDRESS);
        });
    });
});
//# sourceMappingURL=OVM_L1MessageSender.spec.js.map