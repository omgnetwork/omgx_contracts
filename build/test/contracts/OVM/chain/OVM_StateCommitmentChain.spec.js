"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../helpers");
describe('OVM_StateCommitmentChain', () => {
    let sequencer;
    let user;
    before(async () => {
        ;
        [sequencer, user] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__OVM_CanonicalTransactionChain;
    let Mock__OVM_BondManager;
    before(async () => {
        Mock__OVM_CanonicalTransactionChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_CanonicalTransactionChain'));
        await helpers_1.setProxyTarget(AddressManager, 'OVM_CanonicalTransactionChain', Mock__OVM_CanonicalTransactionChain);
        Mock__OVM_BondManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_BondManager'));
        await helpers_1.setProxyTarget(AddressManager, 'OVM_BondManager', Mock__OVM_BondManager);
        Mock__OVM_BondManager.smocked.isCollateralized.will.return.with(true);
        await AddressManager.setAddress('OVM_Proposer', await sequencer.getAddress());
    });
    let Factory__OVM_StateCommitmentChain;
    let Factory__OVM_ChainStorageContainer;
    before(async () => {
        Factory__OVM_StateCommitmentChain = await hardhat_1.ethers.getContractFactory('OVM_StateCommitmentChain');
        Factory__OVM_ChainStorageContainer = await hardhat_1.ethers.getContractFactory('OVM_ChainStorageContainer');
    });
    let OVM_StateCommitmentChain;
    beforeEach(async () => {
        OVM_StateCommitmentChain = await Factory__OVM_StateCommitmentChain.deploy(AddressManager.address, 60 * 60 * 24 * 7, 60 * 30);
        const batches = await Factory__OVM_ChainStorageContainer.deploy(AddressManager.address, 'OVM_StateCommitmentChain');
        await AddressManager.setAddress('OVM_ChainStorageContainer:SCC:batches', batches.address);
        await AddressManager.setAddress('OVM_StateCommitmentChain', OVM_StateCommitmentChain.address);
    });
    describe('appendStateBatch', () => {
        describe('when the provided batch is empty', () => {
            const batch = [];
            it('should revert', async () => {
                await setup_1.expect(OVM_StateCommitmentChain.appendStateBatch(batch, 0)).to.be.revertedWith('Cannot submit an empty state batch.');
            });
        });
        describe('when the provided batch is not empty', () => {
            const batch = [helpers_1.NON_NULL_BYTES32];
            describe('when start index does not match total elements', () => {
                it('should revert', async () => {
                    await setup_1.expect(OVM_StateCommitmentChain.appendStateBatch(batch, 1)).to.be.revertedWith('Actual batch start index does not match expected start index.');
                });
            });
            describe('when submitting more elements than present in the OVM_CanonicalTransactionChain', () => {
                before(() => {
                    Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length - 1);
                });
                it('should revert', async () => {
                    await setup_1.expect(OVM_StateCommitmentChain.appendStateBatch(batch, 0)).to.be.revertedWith('Number of state roots cannot exceed the number of canonical transactions.');
                });
            });
            describe('when not submitting more elements than present in the OVM_CanonicalTransactionChain', () => {
                before(() => {
                    Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length);
                });
                it('should append the state batch', async () => {
                    await setup_1.expect(OVM_StateCommitmentChain.appendStateBatch(batch, 0)).to
                        .not.be.reverted;
                });
            });
            describe('when a sequencer submits ', () => {
                beforeEach(async () => {
                    Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length * 2);
                    await OVM_StateCommitmentChain.connect(sequencer).appendStateBatch(batch, 0);
                });
                describe('when inside sequencer publish window', () => {
                    it('should revert', async () => {
                        await setup_1.expect(OVM_StateCommitmentChain.connect(user).appendStateBatch(batch, 1)).to.be.revertedWith('Cannot publish state roots within the sequencer publication window.');
                    });
                });
                describe('when outside sequencer publish window', () => {
                    beforeEach(async () => {
                        const SEQUENCER_PUBLISH_WINDOW = await OVM_StateCommitmentChain.SEQUENCER_PUBLISH_WINDOW();
                        await helpers_1.increaseEthTime(hardhat_1.ethers.provider, SEQUENCER_PUBLISH_WINDOW.toNumber() + 1);
                    });
                    it('should succeed', async () => {
                        await setup_1.expect(OVM_StateCommitmentChain.connect(user).appendStateBatch(batch, 1)).to.not.be.reverted;
                    });
                });
            });
        });
    });
    describe('deleteStateBatch', () => {
        const batch = [helpers_1.NON_NULL_BYTES32];
        const batchHeader = {
            batchIndex: 0,
            batchRoot: helpers_1.NON_NULL_BYTES32,
            batchSize: 1,
            prevTotalElements: 0,
            extraData: hardhat_1.ethers.constants.HashZero,
        };
        beforeEach(async () => {
            Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length);
            await OVM_StateCommitmentChain.appendStateBatch(batch, 0);
            batchHeader.extraData = hardhat_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'address'], [await helpers_1.getEthTime(hardhat_1.ethers.provider), await sequencer.getAddress()]);
        });
        describe('when the sender is not the OVM_FraudVerifier', () => {
            before(async () => {
                await AddressManager.setAddress('OVM_FraudVerifier', ethers_1.constants.AddressZero);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateCommitmentChain.deleteStateBatch(batchHeader)).to.be.revertedWith('State batches can only be deleted by the OVM_FraudVerifier.');
            });
        });
        describe('when the sender is the OVM_FraudVerifier', () => {
            before(async () => {
                await AddressManager.setAddress('OVM_FraudVerifier', await sequencer.getAddress());
            });
            describe('when the provided batch index is greater than the total submitted', () => {
                it('should revert', async () => {
                    await setup_1.expect(OVM_StateCommitmentChain.deleteStateBatch(Object.assign(Object.assign({}, batchHeader), { batchIndex: 1 }))).to.be.revertedWith('Index out of bounds.');
                });
            });
            describe('when the provided batch index is not greater than the total submitted', () => {
                describe('when the provided batch header is invalid', () => {
                    it('should revert', async () => {
                        await setup_1.expect(OVM_StateCommitmentChain.deleteStateBatch(Object.assign(Object.assign({}, batchHeader), { extraData: '0x' + '22'.repeat(32) }))).to.be.revertedWith('Invalid batch header.');
                    });
                });
                describe('when the provided batch header is valid', () => {
                    it('should remove the batch and all following batches', async () => {
                        await setup_1.expect(OVM_StateCommitmentChain.deleteStateBatch(batchHeader))
                            .to.not.be.reverted;
                    });
                });
            });
        });
    });
    describe('getTotalElements', () => {
        describe('when no batch elements have been inserted', () => {
            it('should return zero', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalElements()).to.equal(0);
            });
        });
        describe('when one batch element has been inserted', () => {
            beforeEach(async () => {
                const batch = [helpers_1.NON_NULL_BYTES32];
                Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length);
                await OVM_StateCommitmentChain.appendStateBatch(batch, 0);
            });
            it('should return the number of inserted batch elements', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalElements()).to.equal(1);
            });
        });
        describe('when 64 batch elements have been inserted in one batch', () => {
            beforeEach(async () => {
                const batch = Array(64).fill(helpers_1.NON_NULL_BYTES32);
                Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length);
                await OVM_StateCommitmentChain.appendStateBatch(batch, 0);
            });
            it('should return the number of inserted batch elements', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalElements()).to.equal(64);
            });
        });
        describe('when 32 batch elements have been inserted in each of two batches', () => {
            beforeEach(async () => {
                const batch = Array(32).fill(helpers_1.NON_NULL_BYTES32);
                Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length * 2);
                await OVM_StateCommitmentChain.appendStateBatch(batch, 0);
                await OVM_StateCommitmentChain.appendStateBatch(batch, 32);
            });
            it('should return the number of inserted batch elements', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalElements()).to.equal(64);
            });
        });
    });
    describe('getTotalBatches()', () => {
        describe('when no batches have been inserted', () => {
            it('should return zero', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalBatches()).to.equal(0);
            });
        });
        describe('when one batch has been inserted', () => {
            beforeEach(async () => {
                const batch = [helpers_1.NON_NULL_BYTES32];
                Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length);
                await OVM_StateCommitmentChain.appendStateBatch(batch, 0);
            });
            it('should return the number of inserted batch elements', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalBatches()).to.equal(1);
            });
        });
        describe('when 8 batches have been inserted', () => {
            beforeEach(async () => {
                const batch = [helpers_1.NON_NULL_BYTES32];
                Mock__OVM_CanonicalTransactionChain.smocked.getTotalElements.will.return.with(batch.length * 8);
                for (let i = 0; i < 8; i++) {
                    await OVM_StateCommitmentChain.appendStateBatch(batch, i);
                }
            });
            it('should return the number of inserted batch elements', async () => {
                setup_1.expect(await OVM_StateCommitmentChain.getTotalBatches()).to.equal(8);
            });
        });
    });
    describe('verifyElement()', () => {
        it('should revert when given an invalid batch header', async () => {
        });
        it('should revert when given an invalid inclusion proof', async () => {
        });
        it('should return true when given a valid proof', async () => {
        });
    });
});
//# sourceMappingURL=OVM_StateCommitmentChain.spec.js.map