"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../helpers");
const DUMMY_HASH = helpers_1.hashTransaction(helpers_1.DUMMY_OVM_TRANSACTIONS[0]);
describe('OVM_StateTransitionerFactory', () => {
    let signer1;
    before(async () => {
        ;
        [signer1] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Factory__OVM_StateTransitionerFactory;
    before(async () => {
        Factory__OVM_StateTransitionerFactory = await hardhat_1.ethers.getContractFactory('OVM_StateTransitionerFactory');
    });
    let OVM_StateTransitionerFactory;
    let Mock__OVM_StateManagerFactory;
    beforeEach(async () => {
        OVM_StateTransitionerFactory = await Factory__OVM_StateTransitionerFactory.deploy(AddressManager.address);
        Mock__OVM_StateManagerFactory = await smock_1.smockit('OVM_StateManagerFactory');
        Mock__OVM_StateManagerFactory.smocked.create.will.return.with(hardhat_1.ethers.constants.AddressZero);
        await AddressManager.setAddress('OVM_StateManagerFactory', Mock__OVM_StateManagerFactory.address);
    });
    describe('create', () => {
        describe('when the sender is not the OVM_FraudVerifier', () => {
            beforeEach(async () => {
                await AddressManager.setAddress('OVM_FraudVerifier', ethers_1.constants.AddressZero);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitionerFactory.create(AddressManager.address, hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, DUMMY_HASH)).to.be.revertedWith('Create can only be done by the OVM_FraudVerifier.');
            });
        });
        describe('when the sender is the OVM_FraudVerifier', () => {
            beforeEach(async () => {
                await AddressManager.setAddress('OVM_FraudVerifier', await signer1.getAddress());
            });
            it('should not revert', async () => {
                await setup_1.expect(OVM_StateTransitionerFactory.connect(signer1).create(AddressManager.address, hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, DUMMY_HASH)).to.not.be.reverted;
            });
        });
    });
});
//# sourceMappingURL=OVM_StateTransitionerFactory.spec.js.map