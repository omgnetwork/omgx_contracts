"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../../helpers");
describe('OVM_L1MultiMessageRelayer', () => {
    let signer;
    before(async () => {
        ;
        [signer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    let Factory__OVM_L1MultiMessageRelayer;
    let Mock__OVM_L1CrossDomainMessenger;
    let messages;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
        Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'));
        await AddressManager.setAddress('Proxy__OVM_L1CrossDomainMessenger', Mock__OVM_L1CrossDomainMessenger.address);
        await AddressManager.setAddress('OVM_L2BatchMessageRelayer', signer.getAddress());
        const dummyProof = {
            stateRoot: helpers_1.NON_NULL_BYTES32,
            stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
            stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
            stateTrieWitness: core_utils_1.toHexString('some bytes'),
            storageTrieWitness: core_utils_1.toHexString('some more bytes'),
        };
        const m1 = {
            target: '0x1100000000000000000000000000000000000000',
            message: helpers_1.NON_NULL_BYTES32,
            sender: '0x2200000000000000000000000000000000000000',
            messageNonce: 1,
            proof: dummyProof,
        };
        const m2 = {
            target: '0x1100000000000000000000000000000000000000',
            message: helpers_1.NON_NULL_BYTES32,
            sender: '0x2200000000000000000000000000000000000000',
            messageNonce: 2,
            proof: dummyProof,
        };
        const m3 = {
            target: '0x1100000000000000000000000000000000000000',
            message: helpers_1.NON_NULL_BYTES32,
            sender: '0x2200000000000000000000000000000000000000',
            messageNonce: 2,
            proof: dummyProof,
        };
        messages = [m1, m2, m3];
    });
    let OVM_L1MultiMessageRelayer;
    beforeEach(async () => {
        Factory__OVM_L1MultiMessageRelayer = await hardhat_1.ethers.getContractFactory('OVM_L1MultiMessageRelayer');
        OVM_L1MultiMessageRelayer = await Factory__OVM_L1MultiMessageRelayer.deploy(AddressManager.address);
        await AddressManager.setAddress('OVM_L2MessageRelayer', OVM_L1MultiMessageRelayer.address);
        Mock__OVM_L1CrossDomainMessenger.smocked.relayMessage.will.return();
    });
    describe('batchRelayMessages', () => {
        it('Successfully relay multiple messages', async () => {
            await OVM_L1MultiMessageRelayer.batchRelayMessages(messages);
            await setup_1.expect(Mock__OVM_L1CrossDomainMessenger.smocked.relayMessage.calls.length).to.deep.equal(messages.length);
        });
        it('should revert if called by the wrong account', async () => {
            await AddressManager.setAddress('OVM_L2BatchMessageRelayer', helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L1MultiMessageRelayer.batchRelayMessages(messages)).to.be.revertedWith('OVM_L1MultiMessageRelayer: Function can only be called by the OVM_L2BatchMessageRelayer');
        });
    });
});
//# sourceMappingURL=OVM_L1MultiMessageRelayer.spec.js.map