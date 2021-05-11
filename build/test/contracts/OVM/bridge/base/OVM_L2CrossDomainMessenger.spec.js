"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../../helpers");
const utils_1 = require("ethers/lib/utils");
describe('OVM_L2CrossDomainMessenger', () => {
    let signer;
    before(async () => {
        ;
        [signer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__TargetContract;
    let Mock__OVM_L1CrossDomainMessenger;
    let Mock__OVM_L1MessageSender;
    let Mock__OVM_L2ToL1MessagePasser;
    before(async () => {
        Mock__TargetContract = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('Helper_SimpleProxy'));
        Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'));
        Mock__OVM_L1MessageSender = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1MessageSender'));
        Mock__OVM_L2ToL1MessagePasser = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L2ToL1MessagePasser'));
        await AddressManager.setAddress('OVM_L1CrossDomainMessenger', Mock__OVM_L1CrossDomainMessenger.address);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_L1MessageSender', Mock__OVM_L1MessageSender);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_L2ToL1MessagePasser', Mock__OVM_L2ToL1MessagePasser);
    });
    let Factory__OVM_L2CrossDomainMessenger;
    before(async () => {
        Factory__OVM_L2CrossDomainMessenger = await hardhat_1.ethers.getContractFactory('OVM_L2CrossDomainMessenger');
    });
    let OVM_L2CrossDomainMessenger;
    beforeEach(async () => {
        OVM_L2CrossDomainMessenger = await Factory__OVM_L2CrossDomainMessenger.deploy(AddressManager.address);
    });
    describe('sendMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const gasLimit = 100000;
        it('should be able to send a single message', async () => {
            await setup_1.expect(OVM_L2CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
            setup_1.expect(Mock__OVM_L2ToL1MessagePasser.smocked.passMessageToL1.calls[0]).to.deep.equal([
                helpers_1.getXDomainCalldata(target, await signer.getAddress(), message, 0),
            ]);
        });
        it('should be able to send the same message twice', async () => {
            await OVM_L2CrossDomainMessenger.sendMessage(target, message, gasLimit);
            await setup_1.expect(OVM_L2CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
        });
    });
    describe('relayMessage', () => {
        let target;
        let message;
        let sender;
        before(async () => {
            target = Mock__TargetContract.address;
            message = Mock__TargetContract.interface.encodeFunctionData('setTarget', [
                helpers_1.NON_ZERO_ADDRESS,
            ]);
            sender = await signer.getAddress();
        });
        beforeEach(async () => {
            Mock__OVM_L1MessageSender.smocked.getL1MessageSender.will.return.with(Mock__OVM_L1CrossDomainMessenger.address);
        });
        it('should revert if the L1 message sender is not the OVM_L1CrossDomainMessenger', async () => {
            Mock__OVM_L1MessageSender.smocked.getL1MessageSender.will.return.with(ethers_1.constants.AddressZero);
            await setup_1.expect(OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should send a call to the target contract', async () => {
            await OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0);
            setup_1.expect(Mock__TargetContract.smocked.setTarget.calls[0]).to.deep.equal([
                helpers_1.NON_ZERO_ADDRESS,
            ]);
        });
        it('the xDomainMessageSender is reset to the original value', async () => {
            await setup_1.expect(OVM_L2CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
            await OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0);
            await setup_1.expect(OVM_L2CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
        });
        it('should revert if trying to send the same message twice', async () => {
            Mock__OVM_L1MessageSender.smocked.getL1MessageSender.will.return.with(Mock__OVM_L1CrossDomainMessenger.address);
            await OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0);
            await setup_1.expect(OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0)).to.be.revertedWith('Provided message has already been received.');
        });
        it('should not make a call if the target is the L2 MessagePasser', async () => {
            Mock__OVM_L1MessageSender.smocked.getL1MessageSender.will.return.with(Mock__OVM_L1CrossDomainMessenger.address);
            target = await AddressManager.getAddress('OVM_L2ToL1MessagePasser');
            message = Mock__OVM_L2ToL1MessagePasser.interface.encodeFunctionData('passMessageToL1(bytes)', [helpers_1.NON_NULL_BYTES32]);
            const resProm = OVM_L2CrossDomainMessenger.relayMessage(target, sender, message, 0);
            await setup_1.expect(resProm).to.not.be.reverted;
            const logs = (await Mock__OVM_L2ToL1MessagePasser.provider.getTransactionReceipt((await resProm).hash)).logs;
            setup_1.expect(logs).to.deep.equal([]);
            setup_1.expect(await OVM_L2CrossDomainMessenger.successfulMessages(utils_1.solidityKeccak256(['bytes'], [helpers_1.getXDomainCalldata(target, sender, message, 0)]))).to.be.true;
        });
        it('should revert if trying to reenter `relayMessage`', async () => {
            Mock__OVM_L1MessageSender.smocked.getL1MessageSender.will.return.with(Mock__OVM_L1CrossDomainMessenger.address);
            const reentrantMessage = OVM_L2CrossDomainMessenger.interface.encodeFunctionData('relayMessage', [target, sender, message, 1]);
            const xDomainCallData = helpers_1.getXDomainCalldata(OVM_L2CrossDomainMessenger.address, sender, reentrantMessage, 0);
            await OVM_L2CrossDomainMessenger.relayMessage(OVM_L2CrossDomainMessenger.address, sender, reentrantMessage, 0);
            setup_1.expect(await OVM_L2CrossDomainMessenger.successfulMessages(utils_1.solidityKeccak256(['bytes'], [xDomainCallData]))).to.be.false;
            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
            const relayId = utils_1.solidityKeccak256(['bytes'], [
                hardhat_1.ethers.utils.solidityPack(['bytes', 'address', 'uint256'], [xDomainCallData, sender, blockNumber]),
            ]);
            setup_1.expect(await OVM_L2CrossDomainMessenger.relayedMessages(relayId)).to.be
                .true;
            setup_1.expect(Mock__TargetContract.smocked.setTarget.calls[0]).to.be.undefined;
        });
    });
});
//# sourceMappingURL=OVM_L2CrossDomainMessenger.spec.js.map