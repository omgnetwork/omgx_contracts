"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../helpers");
const DUMMY_TX_CHAIN_ELEMENTS = [...Array(10).keys()].map((i) => {
    return {
        isSequenced: false,
        queueIndex: ethers_1.BigNumber.from(0),
        timestamp: ethers_1.BigNumber.from(i),
        blockNumber: ethers_1.BigNumber.from(0),
        txData: hardhat_1.ethers.constants.HashZero,
    };
});
const DUMMY_HASH = helpers_1.hashTransaction(helpers_1.DUMMY_OVM_TRANSACTIONS[0]);
const DUMMY_BATCH_PROOFS_WITH_INDEX = [
    {
        index: 11,
        siblings: [hardhat_1.ethers.constants.HashZero],
    },
];
describe('OVM_FraudVerifier', () => {
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__OVM_StateCommitmentChain;
    let Mock__OVM_CanonicalTransactionChain;
    let Mock__OVM_StateTransitioner;
    let Mock__OVM_StateTransitionerFactory;
    let Mock__OVM_BondManager;
    before(async () => {
        Mock__OVM_StateCommitmentChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateCommitmentChain'));
        Mock__OVM_CanonicalTransactionChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_CanonicalTransactionChain'));
        Mock__OVM_StateTransitioner = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateTransitioner'));
        Mock__OVM_StateTransitionerFactory = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateTransitionerFactory'));
        Mock__OVM_BondManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_BondManager'));
        await helpers_1.setProxyTarget(AddressManager, 'OVM_StateCommitmentChain', Mock__OVM_StateCommitmentChain);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_CanonicalTransactionChain', Mock__OVM_CanonicalTransactionChain);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_StateTransitionerFactory', Mock__OVM_StateTransitionerFactory);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_BondManager', Mock__OVM_BondManager);
        Mock__OVM_StateTransitionerFactory.smocked.create.will.return.with(Mock__OVM_StateTransitioner.address);
    });
    let Factory__OVM_FraudVerifier;
    before(async () => {
        Factory__OVM_FraudVerifier = await hardhat_1.ethers.getContractFactory('OVM_FraudVerifier');
    });
    let OVM_FraudVerifier;
    beforeEach(async () => {
        OVM_FraudVerifier = await Factory__OVM_FraudVerifier.deploy(AddressManager.address);
    });
    describe('initializeFraudVerification', () => {
        describe('when provided an invalid pre-state root inclusion proof', () => {
            before(() => {
                Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(false);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[0], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0])).to.be.revertedWith('Invalid pre-state root inclusion proof.');
            });
        });
        describe('when provided a valid pre-state root inclusion proof', () => {
            before(() => {
                Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(true);
            });
            describe('when provided an invalid transaction inclusion proof', () => {
                before(() => {
                    Mock__OVM_CanonicalTransactionChain.smocked.verifyTransaction.will.return.with(false);
                });
                it('should revert', async () => {
                    await setup_1.expect(OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[0], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0])).to.be.revertedWith('Invalid transaction inclusion proof.');
                });
            });
            describe('when provided a valid transaction inclusion proof', () => {
                before(() => {
                    Mock__OVM_CanonicalTransactionChain.smocked.verifyTransaction.will.return.with(true);
                });
                it('should deploy a new state transitioner', async () => {
                    await setup_1.expect(OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[0], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 }))).to.not.be.reverted;
                    setup_1.expect(await OVM_FraudVerifier.getStateTransitioner(hardhat_1.ethers.constants.HashZero, DUMMY_HASH)).to.equal(Mock__OVM_StateTransitioner.address);
                });
                it('should revert when provided with a incorrect transaction root global index', async () => {
                    await setup_1.expect(OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[0], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], DUMMY_BATCH_PROOFS_WITH_INDEX[0])).to.be.revertedWith('Pre-state root global index must equal to the transaction root global index.');
                });
            });
        });
    });
    describe('finalizeFraudVerification', () => {
        beforeEach(async () => {
            Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(true);
            Mock__OVM_CanonicalTransactionChain.smocked.verifyTransaction.will.return.with(true);
            await OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[0], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 }));
        });
        describe('when the transition process is not complete', () => {
            before(async () => {
                Mock__OVM_StateTransitioner.smocked.isComplete.will.return.with(false);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0])).to.be.revertedWith('State transition process must be completed prior to finalization.');
            });
        });
        describe('when the transition process is complete', () => {
            before(() => {
                Mock__OVM_StateTransitioner.smocked.isComplete.will.return.with(true);
            });
            describe('when provided an invalid post-state root index', () => {
                const batchProof = Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 2 });
                it('should revert', async () => {
                    await setup_1.expect(OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof)).to.be.revertedWith('Post-state root global index must equal to the pre state root global index plus one.');
                });
            });
            describe('when provided a valid post-state root index', () => {
                const batchProof = Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 });
                describe('when provided an invalid pre-state root inclusion proof', () => {
                    beforeEach(() => {
                        Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(false);
                    });
                    it('should revert', async () => {
                        await setup_1.expect(OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof)).to.be.revertedWith('Invalid pre-state root inclusion proof.');
                    });
                });
                describe('when provided a valid pre-state root inclusion proof', () => {
                    before(() => {
                        Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(true);
                    });
                    describe('when provided an invalid post-state root inclusion proof', () => {
                        beforeEach(() => {
                            Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with((stateRoot, ...args) => {
                                return stateRoot !== helpers_1.NON_NULL_BYTES32;
                            });
                        });
                        it('should revert', async () => {
                            await setup_1.expect(OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof)).to.be.revertedWith('Invalid post-state root inclusion proof.');
                        });
                    });
                    describe('when provided a valid post-state root inclusion proof', () => {
                        before(() => {
                            Mock__OVM_StateCommitmentChain.smocked.verifyStateCommitment.will.return.with(true);
                        });
                        describe('when the provided post-state root does not differ from the computed one', () => {
                            before(() => {
                                Mock__OVM_StateTransitioner.smocked.getPostStateRoot.will.return.with(helpers_1.NON_NULL_BYTES32);
                            });
                            it('should revert', async () => {
                                await setup_1.expect(OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof)).to.be.revertedWith('State transition has not been proven fraudulent.');
                            });
                        });
                        describe('when the provided post-state root differs from the computed one', () => {
                            before(() => {
                                Mock__OVM_StateTransitioner.smocked.getPostStateRoot.will.return.with(hardhat_1.ethers.constants.HashZero);
                            });
                            it('should succeed and attempt to delete a state batch', async () => {
                                await OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof);
                                setup_1.expect(Mock__OVM_StateCommitmentChain.smocked.deleteStateBatch
                                    .calls[0]).to.deep.equal([
                                    Object.values(helpers_1.DUMMY_BATCH_HEADERS[0]).map((value) => {
                                        return Number.isInteger(value)
                                            ? ethers_1.BigNumber.from(value)
                                            : value;
                                    }),
                                ]);
                            });
                        });
                    });
                });
            });
            describe('multiple fraud proofs for the same pre-execution state', () => {
                let state2;
                const DUMMY_HASH_2 = helpers_1.hashTransaction(helpers_1.DUMMY_OVM_TRANSACTIONS[1]);
                beforeEach(async () => {
                    state2 = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateTransitioner'));
                    Mock__OVM_StateTransitionerFactory.smocked.create.will.return.with(state2.address);
                    Mock__OVM_StateTransitioner.smocked.getPostStateRoot.will.return.with(hardhat_1.ethers.constants.HashZero);
                    state2.smocked.getPostStateRoot.will.return.with(hardhat_1.ethers.constants.HashZero);
                });
                it('creates multiple state transitioners per tx hash', async () => {
                    await setup_1.expect(OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[1], DUMMY_TX_CHAIN_ELEMENTS[0], helpers_1.DUMMY_BATCH_HEADERS[0], Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 }))).to.not.be.reverted;
                    setup_1.expect(await OVM_FraudVerifier.getStateTransitioner(hardhat_1.ethers.constants.HashZero, DUMMY_HASH)).to.equal(Mock__OVM_StateTransitioner.address);
                    setup_1.expect(await OVM_FraudVerifier.getStateTransitioner(hardhat_1.ethers.constants.HashZero, DUMMY_HASH_2)).to.equal(state2.address);
                });
                const batchProof = Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 });
                it.skip('Case 1: allows proving fraud on the same pre-state root twice', async () => {
                    await OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof);
                    await OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[1], DUMMY_TX_CHAIN_ELEMENTS[1], helpers_1.DUMMY_BATCH_HEADERS[1], Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 }));
                    await OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH_2, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[1], batchProof);
                    setup_1.expect(Mock__OVM_StateCommitmentChain.smocked.deleteStateBatch.calls[0]).to.deep.equal([
                        Object.values(helpers_1.DUMMY_BATCH_HEADERS[1]).map((value) => {
                            return Number.isInteger(value) ? ethers_1.BigNumber.from(value) : value;
                        }),
                    ]);
                });
                it.skip('Case 2: does not get blocked by the first transitioner', async () => {
                    await OVM_FraudVerifier.initializeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], helpers_1.DUMMY_OVM_TRANSACTIONS[1], DUMMY_TX_CHAIN_ELEMENTS[1], helpers_1.DUMMY_BATCH_HEADERS[1], Object.assign(Object.assign({}, helpers_1.DUMMY_BATCH_PROOFS[0]), { index: helpers_1.DUMMY_BATCH_PROOFS[0].index + 1 }));
                    await OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH_2, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[1], batchProof);
                    setup_1.expect(Mock__OVM_StateCommitmentChain.smocked.deleteStateBatch.calls[0]).to.deep.equal([
                        Object.values(helpers_1.DUMMY_BATCH_HEADERS[1]).map((value) => {
                            return Number.isInteger(value) ? ethers_1.BigNumber.from(value) : value;
                        }),
                    ]);
                    await OVM_FraudVerifier.finalizeFraudVerification(hardhat_1.ethers.constants.HashZero, helpers_1.DUMMY_BATCH_HEADERS[0], helpers_1.DUMMY_BATCH_PROOFS[0], DUMMY_HASH, helpers_1.NON_NULL_BYTES32, helpers_1.DUMMY_BATCH_HEADERS[0], batchProof);
                    setup_1.expect(Mock__OVM_StateCommitmentChain.smocked.deleteStateBatch.calls[0]).to.deep.equal([
                        Object.values(helpers_1.DUMMY_BATCH_HEADERS[0]).map((value) => {
                            return Number.isInteger(value) ? ethers_1.BigNumber.from(value) : value;
                        }),
                    ]);
                });
            });
        });
    });
});
//# sourceMappingURL=OVM_FraudVerifier.spec.js.map