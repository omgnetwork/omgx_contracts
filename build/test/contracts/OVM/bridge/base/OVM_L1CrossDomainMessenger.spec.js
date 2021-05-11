"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../../helpers");
const utils_1 = require("ethers/lib/utils");
const deployProxyXDomainMessenger = async (addressManager, l1XDomainMessenger) => {
    await addressManager.setAddress('OVM_L1CrossDomainMessenger', l1XDomainMessenger.address);
    const proxy = await (await hardhat_1.ethers.getContractFactory('Lib_ResolvedDelegateProxy')).deploy(addressManager.address, 'OVM_L1CrossDomainMessenger');
    return l1XDomainMessenger.attach(proxy.address);
};
describe('OVM_L1CrossDomainMessenger', () => {
    let signer;
    let signer2;
    before(async () => {
        ;
        [signer, signer2] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__TargetContract;
    let Mock__OVM_L2CrossDomainMessenger;
    let Mock__OVM_CanonicalTransactionChain;
    let Mock__OVM_StateCommitmentChain;
    before(async () => {
        Mock__TargetContract = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('Helper_SimpleProxy'));
        Mock__OVM_L2CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L2CrossDomainMessenger'));
        Mock__OVM_CanonicalTransactionChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_CanonicalTransactionChain'));
        Mock__OVM_StateCommitmentChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateCommitmentChain'));
        await AddressManager.setAddress('OVM_L2CrossDomainMessenger', Mock__OVM_L2CrossDomainMessenger.address);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_CanonicalTransactionChain', Mock__OVM_CanonicalTransactionChain);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_StateCommitmentChain', Mock__OVM_StateCommitmentChain);
    });
    let Factory__OVM_L1CrossDomainMessenger;
    before(async () => {
        Factory__OVM_L1CrossDomainMessenger = await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger');
    });
    let OVM_L1CrossDomainMessenger;
    beforeEach(async () => {
        const xDomainMessengerImpl = await Factory__OVM_L1CrossDomainMessenger.deploy();
        OVM_L1CrossDomainMessenger = await deployProxyXDomainMessenger(AddressManager, xDomainMessengerImpl);
        await OVM_L1CrossDomainMessenger.initialize(AddressManager.address);
    });
    describe('pause', () => {
        describe('when called by the current owner', () => {
            it('should pause the contract', async () => {
                await OVM_L1CrossDomainMessenger.pause();
                setup_1.expect(await OVM_L1CrossDomainMessenger.paused()).to.be.true;
            });
        });
        describe('when called by account other than the owner', () => {
            it('should not pause the contract', async () => {
                await setup_1.expect(OVM_L1CrossDomainMessenger.connect(signer2).pause()).to.be.revertedWith('Ownable: caller is not the owner');
            });
        });
    });
    describe('sendMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const gasLimit = 100000;
        it('should be able to send a single message', async () => {
            await setup_1.expect(OVM_L1CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
            setup_1.expect(Mock__OVM_CanonicalTransactionChain.smocked.enqueue.calls[0]).to.deep.equal([
                Mock__OVM_L2CrossDomainMessenger.address,
                ethers_1.BigNumber.from(gasLimit),
                helpers_1.getXDomainCalldata(target, await signer.getAddress(), message, 0),
            ]);
        });
        it('should be able to send the same message twice', async () => {
            await OVM_L1CrossDomainMessenger.sendMessage(target, message, gasLimit);
            await setup_1.expect(OVM_L1CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
        });
    });
    describe('replayMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const gasLimit = 100000;
        it('should revert if the message does not exist', async () => {
            await setup_1.expect(OVM_L1CrossDomainMessenger.replayMessage(target, await signer.getAddress(), message, 0, gasLimit)).to.be.revertedWith('Provided message has not already been sent.');
        });
        it('should succeed if the message exists', async () => {
            await OVM_L1CrossDomainMessenger.sendMessage(target, message, gasLimit);
            await setup_1.expect(OVM_L1CrossDomainMessenger.replayMessage(target, await signer.getAddress(), message, 0, gasLimit)).to.not.be.reverted;
        });
    });
    describe('relayMessage', () => {
        let target;
        let message;
        let sender;
        let proof;
        let calldata;
        before(async () => {
            target = Mock__TargetContract.address;
            message = Mock__TargetContract.interface.encodeFunctionData('setTarget', [
                helpers_1.NON_ZERO_ADDRESS,
            ]);
            sender = await signer.getAddress();
            calldata = helpers_1.getXDomainCalldata(target, sender, message, 0);
            const precompile = '0x4200000000000000000000000000000000000000';
            const storageKey = utils_1.keccak256(utils_1.keccak256(calldata + core_utils_1.remove0x(Mock__OVM_L2CrossDomainMessenger.address)) + '00'.repeat(32));
            const storageGenerator = await helpers_1.TrieTestGenerator.fromNodes({
                nodes: [
                    {
                        key: storageKey,
                        val: '0x' + '01'.padStart(2, '0'),
                    },
                ],
                secure: true,
            });
            const generator = await helpers_1.TrieTestGenerator.fromAccounts({
                accounts: [
                    {
                        address: precompile,
                        nonce: 0,
                        balance: 0,
                        codeHash: utils_1.keccak256('0x1234'),
                        storageRoot: core_utils_1.toHexString(storageGenerator._trie.root),
                    },
                ],
                secure: true,
            });
            proof = {
                stateRoot: core_utils_1.toHexString(generator._trie.root),
                stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
                stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
                stateTrieWitness: (await generator.makeAccountProofTest(precompile))
                    .accountTrieWitness,
                storageTrieWitness: (await storageGenerator.makeInclusionProofTest(storageKey)).proof,
            };
        });
        beforeEach(async () => {
            Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(true);
            Mock__OVM_StateCommitmentChain.smocked.insideFraudProofWindow.will.return.with(false);
        });
        it('should revert if still inside the fraud proof window', async () => {
            Mock__OVM_StateCommitmentChain.smocked.insideFraudProofWindow.will.return.with(true);
            const proof1 = {
                stateRoot: hardhat_1.ethers.constants.HashZero,
                stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
                stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
                stateTrieWitness: '0x',
                storageTrieWitness: '0x',
            };
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof1)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should revert if provided an invalid state root proof', async () => {
            Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(false);
            const proof1 = {
                stateRoot: hardhat_1.ethers.constants.HashZero,
                stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
                stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
                stateTrieWitness: '0x',
                storageTrieWitness: '0x',
            };
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof1)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should revert if provided an invalid storage trie witness', async () => {
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, Object.assign(Object.assign({}, proof), { storageTrieWitness: '0x' }))).to.be.reverted;
        });
        it('should revert if provided an invalid state trie witness', async () => {
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, Object.assign(Object.assign({}, proof), { stateTrieWitness: '0x' }))).to.be.reverted;
        });
        it('should send a successful call to the target contract', async () => {
            const blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
            await OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            setup_1.expect(await OVM_L1CrossDomainMessenger.successfulMessages(utils_1.keccak256(calldata))).to.equal(true);
            setup_1.expect(await OVM_L1CrossDomainMessenger.relayedMessages(utils_1.keccak256(calldata +
                core_utils_1.remove0x(await signer.getAddress()) +
                core_utils_1.remove0x(ethers_1.BigNumber.from(blockNumber).toHexString()).padStart(64, '0')))).to.equal(true);
        });
        it('the xDomainMessageSender is reset to the original value', async () => {
            await setup_1.expect(OVM_L1CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
            await OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            await setup_1.expect(OVM_L1CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
        });
        it('should revert if trying to send the same message twice', async () => {
            await OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has already been received.');
        });
        it('should revert if paused', async () => {
            await OVM_L1CrossDomainMessenger.pause();
            await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Pausable: paused');
        });
        describe('blockMessage and allowMessage', () => {
            it('should revert if called by an account other than the owner', async () => {
                const OVM_L1CrossDomainMessenger2 = OVM_L1CrossDomainMessenger.connect(signer2);
                await setup_1.expect(OVM_L1CrossDomainMessenger2.blockMessage(utils_1.keccak256(calldata))).to.be.revertedWith('Ownable: caller is not the owner');
                await setup_1.expect(OVM_L1CrossDomainMessenger2.allowMessage(utils_1.keccak256(calldata))).to.be.revertedWith('Ownable: caller is not the owner');
            });
            it('should revert if the message is blocked', async () => {
                await OVM_L1CrossDomainMessenger.blockMessage(utils_1.keccak256(calldata));
                await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has been blocked.');
            });
            it('should succeed if the message is blocked, then unblocked', async () => {
                await OVM_L1CrossDomainMessenger.blockMessage(utils_1.keccak256(calldata));
                await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has been blocked.');
                await OVM_L1CrossDomainMessenger.allowMessage(utils_1.keccak256(calldata));
                await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.not.be.reverted;
            });
        });
        describe('onlyRelayer', () => {
            it('when the OVM_L2MessageRelayer address is set, should revert if called by a different account', async () => {
                await AddressManager.setAddress('OVM_L2MessageRelayer', '0x1234123412341234123412341234123412341234');
                await setup_1.expect(OVM_L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Only OVM_L2MessageRelayer can relay L2-to-L1 messages.');
            });
        });
    });
});
//# sourceMappingURL=OVM_L1CrossDomainMessenger.spec.js.map