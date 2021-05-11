"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const helpers_1 = require("../../../helpers");
describe('mockOVM_BondManager', () => {
    let sequencer;
    let nonSequencer;
    before(async () => {
        ;
        [sequencer, nonSequencer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let mockOVM_BondManager;
    before(async () => {
        mockOVM_BondManager = await (await hardhat_1.ethers.getContractFactory('mockOVM_BondManager')).deploy(AddressManager.address);
        AddressManager.setAddress('OVM_Proposer', await sequencer.getAddress());
    });
    describe('isCollateralized', () => {
        it('should return true for OVM_Proposer', async () => {
            setup_1.expect(await mockOVM_BondManager.isCollateralized(await sequencer.getAddress())).to.equal(true);
        });
        it('should return false for non-sequencer', async () => {
            setup_1.expect(await mockOVM_BondManager.isCollateralized(await nonSequencer.getAddress())).to.equal(false);
        });
    });
});
//# sourceMappingURL=mockOVM_BondManager.spec.js.map