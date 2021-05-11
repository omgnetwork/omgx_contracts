"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const utils_1 = require("ethers/lib/utils");
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("../../../helpers");
const ELEMENT_TEST_SIZES = [1, 2, 4, 8, 16];
const DECOMPRESSION_ADDRESS = '0x4200000000000000000000000000000000000008';
const MAX_GAS_LIMIT = 8000000;
const getQueueLeafHash = (index) => {
    return utils_1.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(['bool', 'uint256', 'uint256', 'uint256', 'bytes'], [false, index, 0, 0, '0x']));
};
const getSequencerLeafHash = (timestamp, blockNumber, data) => {
    return utils_1.keccak256('0x01' +
        core_utils_1.remove0x(ethers_1.BigNumber.from(timestamp).toHexString()).padStart(64, '0') +
        core_utils_1.remove0x(ethers_1.BigNumber.from(blockNumber).toHexString()).padStart(64, '0') +
        core_utils_1.remove0x(data));
};
const getTransactionHash = (sender, target, gasLimit, data) => {
    return utils_1.keccak256(encodeQueueTransaction(sender, target, gasLimit, data));
};
const encodeQueueTransaction = (sender, target, gasLimit, data) => {
    return hardhat_1.ethers.utils.defaultAbiCoder.encode(['address', 'address', 'uint256', 'bytes'], [sender, target, gasLimit, data]);
};
const appendSequencerBatch = async (OVM_CanonicalTransactionChain, batch) => {
    const methodId = utils_1.keccak256(Buffer.from('appendSequencerBatch()')).slice(2, 10);
    const calldata = core_utils_1.encodeAppendSequencerBatch(batch);
    return OVM_CanonicalTransactionChain.signer.sendTransaction({
        to: OVM_CanonicalTransactionChain.address,
        data: '0x' + methodId + calldata,
    });
};
describe('OVM_CanonicalTransactionChain', () => {
    let signer;
    let sequencer;
    before(async () => {
        ;
        [signer, sequencer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    let Mock__OVM_ExecutionManager;
    let Mock__OVM_StateCommitmentChain;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
        await AddressManager.setAddress('OVM_Sequencer', await sequencer.getAddress());
        await AddressManager.setAddress('OVM_DecompressionPrecompileAddress', DECOMPRESSION_ADDRESS);
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
        Mock__OVM_StateCommitmentChain = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateCommitmentChain'));
        await helpers_1.setProxyTarget(AddressManager, 'OVM_ExecutionManager', Mock__OVM_ExecutionManager);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_StateCommitmentChain', Mock__OVM_StateCommitmentChain);
        Mock__OVM_ExecutionManager.smocked.getMaxTransactionGasLimit.will.return.with(MAX_GAS_LIMIT);
    });
    let Factory__OVM_CanonicalTransactionChain;
    let Factory__OVM_ChainStorageContainer;
    before(async () => {
        Factory__OVM_CanonicalTransactionChain = await hardhat_1.ethers.getContractFactory('OVM_CanonicalTransactionChain');
        Factory__OVM_ChainStorageContainer = await hardhat_1.ethers.getContractFactory('OVM_ChainStorageContainer');
    });
    let OVM_CanonicalTransactionChain;
    beforeEach(async () => {
        OVM_CanonicalTransactionChain = await Factory__OVM_CanonicalTransactionChain.deploy(AddressManager.address, helpers_1.FORCE_INCLUSION_PERIOD_SECONDS, helpers_1.FORCE_INCLUSION_PERIOD_BLOCKS, MAX_GAS_LIMIT);
        const batches = await Factory__OVM_ChainStorageContainer.deploy(AddressManager.address, 'OVM_CanonicalTransactionChain');
        const queue = await Factory__OVM_ChainStorageContainer.deploy(AddressManager.address, 'OVM_CanonicalTransactionChain');
        await AddressManager.setAddress('OVM_ChainStorageContainer:CTC:batches', batches.address);
        await AddressManager.setAddress('OVM_ChainStorageContainer:CTC:queue', queue.address);
        await AddressManager.setAddress('OVM_CanonicalTransactionChain', OVM_CanonicalTransactionChain.address);
    });
    describe('enqueue', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const gasLimit = 500000;
        it('should revert when trying to input more data than the max data size', async () => {
            const MAX_ROLLUP_TX_SIZE = await OVM_CanonicalTransactionChain.MAX_ROLLUP_TX_SIZE();
            const data = '0x' + '12'.repeat(MAX_ROLLUP_TX_SIZE + 1);
            await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data, {
                gasLimit: 40000000,
            })).to.be.revertedWith('Transaction data size exceeds maximum for rollup transaction.');
        });
        it('should revert when trying to enqueue a transaction with a higher gasLimit than the max', async () => {
            const data = '0x1234567890';
            await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, MAX_GAS_LIMIT + 1, data)).to.be.revertedWith('Transaction gas limit exceeds maximum for rollup transaction.');
        });
        it('should revert if gas limit parameter is not at least MIN_ROLLUP_TX_GAS', async () => {
            const MIN_ROLLUP_TX_GAS = await OVM_CanonicalTransactionChain.MIN_ROLLUP_TX_GAS();
            const customGasLimit = MIN_ROLLUP_TX_GAS / 2;
            const data = '0x' + '12'.repeat(1234);
            await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, customGasLimit, data)).to.be.revertedWith('Transaction gas limit too low to enqueue.');
        });
        it('should revert if transaction gas limit does not cover rollup burn', async () => {
            const L2_GAS_DISCOUNT_DIVISOR = await OVM_CanonicalTransactionChain.L2_GAS_DISCOUNT_DIVISOR();
            const data = '0x' + '12'.repeat(1234);
            await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data, {
                gasLimit: gasLimit / L2_GAS_DISCOUNT_DIVISOR + 30000,
            })).to.be.revertedWith('Insufficient gas for L2 rate limiting burn.');
        });
        describe('with valid input parameters', () => {
            it('should emit a TransactionEnqueued event', async () => {
                const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
                const data = '0x' + '12'.repeat(1234);
                await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
                await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data)).to.emit(OVM_CanonicalTransactionChain, 'TransactionEnqueued');
            });
            describe('when enqueing multiple times', () => {
                const data = '0x' + '12'.repeat(1234);
                for (const size of ELEMENT_TEST_SIZES) {
                    it(`should be able to enqueue ${size} elements`, async () => {
                        for (let i = 0; i < size; i++) {
                            await setup_1.expect(OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data)).to.not.be.reverted;
                        }
                    });
                }
            });
        });
    });
    describe('getQueueElement', () => {
        it('should revert when accessing a non-existent element', async () => {
            await setup_1.expect(OVM_CanonicalTransactionChain.getQueueElement(0)).to.be.revertedWith('Index out of bounds.');
        });
        describe('when the requested element exists', () => {
            const target = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            describe('when getting the first element', () => {
                for (const size of ELEMENT_TEST_SIZES) {
                    it(`gets the element when ${size} + 1 elements exist`, async () => {
                        const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
                        const blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
                        await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
                        const transactionHash = getTransactionHash(await signer.getAddress(), target, gasLimit, data);
                        await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                        for (let i = 0; i < size; i++) {
                            await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, '0x' + '12'.repeat(i + 1));
                        }
                        setup_1.expect(lodash_1.default.toPlainObject(await OVM_CanonicalTransactionChain.getQueueElement(0))).to.deep.include({
                            transactionHash,
                            timestamp,
                            blockNumber,
                        });
                    });
                }
            });
            describe('when getting the middle element', () => {
                for (const size of ELEMENT_TEST_SIZES) {
                    it(`gets the element when ${size} elements exist`, async () => {
                        let timestamp;
                        let blockNumber;
                        let transactionHash;
                        const middleIndex = Math.floor(size / 2);
                        for (let i = 0; i < size; i++) {
                            if (i === middleIndex) {
                                timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
                                blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
                                await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
                                transactionHash = getTransactionHash(await signer.getAddress(), target, gasLimit, data);
                                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                            }
                            else {
                                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, '0x' + '12'.repeat(i + 1));
                            }
                        }
                        setup_1.expect(lodash_1.default.toPlainObject(await OVM_CanonicalTransactionChain.getQueueElement(middleIndex))).to.deep.include({
                            transactionHash,
                            timestamp,
                            blockNumber,
                        });
                    });
                }
            });
            describe('when getting the last element', () => {
                for (const size of ELEMENT_TEST_SIZES) {
                    it(`gets the element when ${size} elements exist`, async () => {
                        let timestamp;
                        let blockNumber;
                        let transactionHash;
                        for (let i = 0; i < size; i++) {
                            if (i === size - 1) {
                                timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
                                blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
                                await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
                                transactionHash = getTransactionHash(await signer.getAddress(), target, gasLimit, data);
                                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                            }
                            else {
                                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, '0x' + '12'.repeat(i + 1));
                            }
                        }
                        setup_1.expect(lodash_1.default.toPlainObject(await OVM_CanonicalTransactionChain.getQueueElement(size - 1))).to.deep.include({
                            transactionHash,
                            timestamp,
                            blockNumber,
                        });
                    });
                }
            });
        });
    });
    describe('appendQueueBatch disabled', () => {
        it('should revert', async () => {
            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(0)).to.be.revertedWith('appendQueueBatch is currently disabled.');
        });
    });
    describe.skip('appendQueueBatch', () => {
        it('should revert if trying to append zero transactions', async () => {
            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(0)).to.be.revertedWith('Must append more than zero transactions.');
        });
        it('should revert if the queue is empty', async () => {
            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(1)).to.be.revertedWith('Must append more than zero transactions.');
        });
        describe('when the queue is not empty', () => {
            const target = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            for (const size of ELEMENT_TEST_SIZES) {
                describe(`when the queue has ${size} elements`, () => {
                    beforeEach(async () => {
                        for (let i = 0; i < size; i++) {
                            await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                        }
                    });
                    describe('when the sequencer inclusion period has not passed', () => {
                        it('should revert if not called by the sequencer', async () => {
                            await setup_1.expect(OVM_CanonicalTransactionChain.connect(signer).appendQueueBatch(1)).to.be.revertedWith('Queue transactions cannot be submitted during the sequencer inclusion period.');
                        });
                        it('should succeed if called by the sequencer', async () => {
                            await setup_1.expect(OVM_CanonicalTransactionChain.connect(sequencer).appendQueueBatch(1))
                                .to.emit(OVM_CanonicalTransactionChain, 'QueueBatchAppended')
                                .withArgs(0, 1, 1);
                        });
                    });
                    describe('when the sequencer inclusion period has passed', () => {
                        beforeEach(async () => {
                            await helpers_1.increaseEthTime(hardhat_1.ethers.provider, helpers_1.FORCE_INCLUSION_PERIOD_SECONDS * 2);
                        });
                        it('should be able to append a single element', async () => {
                            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(1))
                                .to.emit(OVM_CanonicalTransactionChain, 'QueueBatchAppended')
                                .withArgs(0, 1, 1);
                        });
                        it(`should be able to append ${size} elements`, async () => {
                            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(size))
                                .to.emit(OVM_CanonicalTransactionChain, 'QueueBatchAppended')
                                .withArgs(0, size, size);
                        });
                        it(`should be able to append ${size} elements even if attempting to append ${size} + 1 elements`, async () => {
                            await setup_1.expect(OVM_CanonicalTransactionChain.appendQueueBatch(size + 1))
                                .to.emit(OVM_CanonicalTransactionChain, 'QueueBatchAppended')
                                .withArgs(0, size, size);
                        });
                    });
                });
            }
        });
    });
    describe('verifyTransaction', () => {
        it('should successfully verify against a valid queue transaction appended by the sequencer', async () => {
            const entrypoint = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
            await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
            await OVM_CanonicalTransactionChain.enqueue(entrypoint, gasLimit, data);
            const blockNumber = await hardhat_1.ethers.provider.getBlockNumber();
            await appendSequencerBatch(OVM_CanonicalTransactionChain.connect(sequencer), {
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
                contexts: [
                    {
                        numSequencedTransactions: 0,
                        numSubsequentQueueTransactions: 1,
                        timestamp,
                        blockNumber,
                    },
                ],
                transactions: [],
            });
            setup_1.expect(await OVM_CanonicalTransactionChain.verifyTransaction({
                timestamp,
                blockNumber,
                l1QueueOrigin: 1,
                l1TxOrigin: await OVM_CanonicalTransactionChain.signer.getAddress(),
                entrypoint,
                gasLimit,
                data,
            }, {
                isSequenced: false,
                queueIndex: 0,
                timestamp: 0,
                blockNumber: 0,
                txData: '0x',
            }, {
                batchIndex: 0,
                batchRoot: getQueueLeafHash(0),
                batchSize: 1,
                prevTotalElements: 0,
                extraData: '0x',
            }, {
                index: 0,
                siblings: [],
            })).to.equal(true);
        });
        it.skip('should successfully verify against a valid queue transaction appended by force', async () => {
            const entrypoint = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
            await helpers_1.setEthTime(hardhat_1.ethers.provider, timestamp);
            await OVM_CanonicalTransactionChain.enqueue(entrypoint, gasLimit, data);
            const blockNumber = await hardhat_1.ethers.provider.getBlockNumber();
            await helpers_1.increaseEthTime(hardhat_1.ethers.provider, helpers_1.FORCE_INCLUSION_PERIOD_SECONDS * 2);
            await OVM_CanonicalTransactionChain.appendQueueBatch(1);
            setup_1.expect(await OVM_CanonicalTransactionChain.verifyTransaction({
                timestamp,
                blockNumber,
                l1QueueOrigin: 1,
                l1TxOrigin: await OVM_CanonicalTransactionChain.signer.getAddress(),
                entrypoint,
                gasLimit,
                data,
            }, {
                isSequenced: false,
                queueIndex: 0,
                timestamp: 0,
                blockNumber: 0,
                txData: '0x',
            }, {
                batchIndex: 0,
                batchRoot: getQueueLeafHash(0),
                batchSize: 1,
                prevTotalElements: 0,
                extraData: '0x',
            }, {
                index: 0,
                siblings: [],
            })).to.equal(true);
        });
        it('should successfully verify against a valid sequencer transaction', async () => {
            const entrypoint = DECOMPRESSION_ADDRESS;
            const gasLimit = MAX_GAS_LIMIT;
            const data = '0x' + '12'.repeat(1234);
            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 10;
            const blockNumber = (await hardhat_1.ethers.provider.getBlockNumber()) - 1;
            await appendSequencerBatch(OVM_CanonicalTransactionChain.connect(sequencer), {
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
                contexts: [
                    {
                        numSequencedTransactions: 1,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    },
                ],
                transactions: [data],
            });
            setup_1.expect(await OVM_CanonicalTransactionChain.verifyTransaction({
                timestamp,
                blockNumber,
                l1QueueOrigin: 0,
                l1TxOrigin: ethers_1.constants.AddressZero,
                entrypoint,
                gasLimit,
                data,
            }, {
                isSequenced: true,
                queueIndex: 0,
                timestamp,
                blockNumber,
                txData: data,
            }, {
                batchIndex: 0,
                batchRoot: getSequencerLeafHash(timestamp, blockNumber, data),
                batchSize: 1,
                prevTotalElements: 0,
                extraData: '0x',
            }, {
                index: 0,
                siblings: [],
            })).to.equal(true);
        });
    });
    describe('appendSequencerBatch', () => {
        beforeEach(() => {
            OVM_CanonicalTransactionChain = OVM_CanonicalTransactionChain.connect(sequencer);
        });
        it('should revert if expected start does not match current total batches', async () => {
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                transactions: ['0x1234'],
                contexts: [
                    {
                        numSequencedTransactions: 0,
                        numSubsequentQueueTransactions: 0,
                        timestamp: 0,
                        blockNumber: 0,
                    },
                ],
                shouldStartAtElement: 1234,
                totalElementsToAppend: 1,
            })).to.be.revertedWith('Actual batch start index does not match expected start index.');
        });
        it('should revert if not all sequencer transactions are processed', async () => {
            const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                transactions: ['0x1234', '0x1234'],
                contexts: [
                    {
                        numSequencedTransactions: 0,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    },
                ],
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
            })).to.be.revertedWith('Not all sequencer transactions were processed.');
        });
        it('should revert if not called by the sequencer', async () => {
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain.connect(signer), {
                transactions: ['0x1234'],
                contexts: [
                    {
                        numSequencedTransactions: 0,
                        numSubsequentQueueTransactions: 0,
                        timestamp: 0,
                        blockNumber: 0,
                    },
                ],
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
            })).to.be.revertedWith('Function can only be called by the Sequencer.');
        });
        it('should revert if no contexts are provided', async () => {
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                transactions: ['0x1234'],
                contexts: [],
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
            })).to.be.revertedWith('Must provide at least one batch context.');
        });
        it('should revert if total elements to append is zero', async () => {
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                transactions: ['0x1234'],
                contexts: [
                    {
                        numSequencedTransactions: 0,
                        numSubsequentQueueTransactions: 0,
                        timestamp: 0,
                        blockNumber: 0,
                    },
                ],
                shouldStartAtElement: 0,
                totalElementsToAppend: 0,
            })).to.be.revertedWith('Must append at least one element.');
        });
        it('should revert when trying to input more data than the max data size', async () => {
            const MAX_ROLLUP_TX_SIZE = await OVM_CanonicalTransactionChain.MAX_ROLLUP_TX_SIZE();
            const data = '0x' + '12'.repeat(MAX_ROLLUP_TX_SIZE + 1);
            const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                transactions: [data],
                contexts: [
                    {
                        numSequencedTransactions: 1,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    },
                ],
                shouldStartAtElement: 0,
                totalElementsToAppend: 1,
            })).to.be.revertedWith('Transaction data size exceeds maximum for rollup transaction.');
        });
        describe('Sad path cases', () => {
            const target = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            describe('when the sequencer attempts to add more queue transactions than exist', () => {
                it('reverts when there are zero transactions in the queue', async () => {
                    const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                    const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                    await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                        transactions: ['0x1234'],
                        contexts: [
                            {
                                numSequencedTransactions: 1,
                                numSubsequentQueueTransactions: 1,
                                timestamp,
                                blockNumber,
                            },
                        ],
                        shouldStartAtElement: 0,
                        totalElementsToAppend: 1,
                    })).to.be.revertedWith('Index out of bounds.');
                });
                it('reverts when there are insufficient (but nonzero) transactions in the queue', async () => {
                    const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                    const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                    const numEnqueues = 7;
                    for (let i = 0; i < numEnqueues; i++) {
                        await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                    }
                    await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                        transactions: ['0x1234'],
                        contexts: [
                            {
                                numSequencedTransactions: 1,
                                numSubsequentQueueTransactions: numEnqueues + 1,
                                timestamp,
                                blockNumber,
                            },
                        ],
                        shouldStartAtElement: 0,
                        totalElementsToAppend: numEnqueues + 1,
                    })).to.be.revertedWith('Not enough queued transactions to append.');
                });
            });
            describe('when the sequencer attempts to add transactions which are not monotonically increasing', () => {
                describe('when the sequencer transactions themselves have out-of-order times', () => {
                    it('should revert when adding two out-of-order-timestamp sequencer elements', async () => {
                        const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234', '0x5678'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp: timestamp + 1,
                                    blockNumber,
                                },
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 2,
                        })).to.be.revertedWith('Context timestamp values must monotonically increase.');
                    });
                    it('should revert when adding two out-of-order-blocknumber sequencer elements', async () => {
                        const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234', '0x5678'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber: blockNumber + 1,
                                },
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 2,
                        })).to.be.revertedWith('Context blockNumber values must monotonically increase.');
                    });
                });
                describe('when the elements are out-of-order with regards to pending queue elements', async () => {
                    describe('adding a single sequencer transaction with a single pending queue element', () => {
                        beforeEach(async () => {
                            await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                        });
                        it('should revert if the first context timestamp is > the head queue element timestamp', async () => {
                            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100;
                            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions: ['0x1234'],
                                contexts: [
                                    {
                                        numSequencedTransactions: 1,
                                        numSubsequentQueueTransactions: 0,
                                        timestamp,
                                        blockNumber,
                                    },
                                ],
                                shouldStartAtElement: 0,
                                totalElementsToAppend: 1,
                            })).to.be.revertedWith('Sequencer transaction timestamp exceeds that of next queue element.');
                        });
                        it('should revert if the context block number is > the head queue element block number', async () => {
                            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
                            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) + 100;
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions: ['0x1234'],
                                contexts: [
                                    {
                                        numSequencedTransactions: 1,
                                        numSubsequentQueueTransactions: 0,
                                        timestamp,
                                        blockNumber,
                                    },
                                ],
                                shouldStartAtElement: 0,
                                totalElementsToAppend: 1,
                            })).to.be.revertedWith('Sequencer transaction blockNumber exceeds that of next queue element.');
                        });
                    });
                    describe('adding multiple sequencer transactions with multiple pending queue elements', () => {
                        const numQueuedTransactions = 10;
                        const queueElements = [];
                        const validContexts = [];
                        beforeEach(async () => {
                            for (let i = 0; i < numQueuedTransactions; i++) {
                                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                                queueElements[i] = await OVM_CanonicalTransactionChain.getQueueElement(i);
                                validContexts[i] = {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 1,
                                    timestamp: queueElements[i].timestamp,
                                    blockNumber: queueElements[i].blockNumber,
                                };
                            }
                        });
                        it('does not revert for valid context', async () => {
                            await appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions: new Array(numQueuedTransactions).fill('0x1234'),
                                contexts: validContexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: 2 * numQueuedTransactions,
                            });
                        });
                        it('reverts if wrong timestamp in middle', async () => {
                            const invalidTimestampContexts = [...validContexts];
                            invalidTimestampContexts[6].timestamp =
                                invalidTimestampContexts[8].timestamp;
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions: new Array(numQueuedTransactions).fill('0x1234'),
                                contexts: invalidTimestampContexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: 2 * numQueuedTransactions,
                            })).to.be.revertedWith('Sequencer transaction timestamp exceeds that of next queue element.');
                        });
                        it('reverts if wrong block number in the middle', async () => {
                            const invalidBlockNumberContexts = [...validContexts];
                            invalidBlockNumberContexts[6].blockNumber =
                                invalidBlockNumberContexts[8].blockNumber;
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions: new Array(numQueuedTransactions).fill('0x1234'),
                                contexts: invalidBlockNumberContexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: 2 * numQueuedTransactions,
                            })).to.be.revertedWith('Sequencer transaction blockNumber exceeds that of next queue element.');
                        });
                    });
                });
            });
            describe('when the sequencer attempts to add transactions with out-of-bounds times', async () => {
                describe('when trying to add elements from the future', () => {
                    it('reverts on initial timestamp in the future', async () => {
                        const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) + 100000000;
                        const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context timestamp is from the future.');
                    });
                    it('reverts on non-initial timestamp in the future', async () => {
                        const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234', '0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp: timestamp + 100000000,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 2,
                        })).to.be.revertedWith('Context timestamp is from the future.');
                    });
                    it('reverts on initial blocknumber in the future', async () => {
                        const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) + 1;
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context block number is from the future.');
                    });
                });
            });
            describe('when trying to add elements which are older than the force inclusion period', async () => {
                it('reverts for a timestamp older than the f.i.p. ago', async () => {
                    const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                    await helpers_1.increaseEthTime(hardhat_1.ethers.provider, helpers_1.FORCE_INCLUSION_PERIOD_SECONDS + 1);
                    const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                    await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                        transactions: ['0x1234'],
                        contexts: [
                            {
                                numSequencedTransactions: 1,
                                numSubsequentQueueTransactions: 0,
                                timestamp,
                                blockNumber,
                            },
                        ],
                        shouldStartAtElement: 0,
                        totalElementsToAppend: 1,
                    })).to.be.revertedWith('Context timestamp too far in the past.');
                });
                it('reverts for a blockNumber older than the f.i.p. ago', async () => {
                    const timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                    for (let i = 0; i < helpers_1.FORCE_INCLUSION_PERIOD_BLOCKS + 1; i++) {
                        await helpers_1.mineBlock(hardhat_1.ethers.provider);
                    }
                    await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                        transactions: ['0x1234'],
                        contexts: [
                            {
                                numSequencedTransactions: 1,
                                numSubsequentQueueTransactions: 0,
                                timestamp,
                                blockNumber: 10,
                            },
                        ],
                        shouldStartAtElement: 0,
                        totalElementsToAppend: 1,
                    })).to.be.revertedWith('Context block number too far in the past.');
                });
            });
            describe('when trying to add elements which are older than already existing CTC elements', () => {
                let timestamp;
                let blockNumber;
                describe('when the most recent CTC element is a sequencer transaction', () => {
                    beforeEach(async () => {
                        timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 1;
                        await appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 1,
                        });
                    });
                    it('reverts if timestamp is older than previous one', async () => {
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp: timestamp - 1,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 1,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context timestamp is lower than last submitted.');
                    });
                    it('reverts if block number is older than previous one', async () => {
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber: blockNumber - 1,
                                },
                            ],
                            shouldStartAtElement: 1,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context block number is lower than last submitted.');
                    });
                });
                describe('when the previous transaction is a queue transaction', () => {
                    beforeEach(async () => {
                        timestamp = await helpers_1.getEthTime(hardhat_1.ethers.provider);
                        blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
                        await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                        await appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 1,
                                    timestamp,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 0,
                            totalElementsToAppend: 2,
                        });
                    });
                    it('reverts if timestamp is older than previous one', async () => {
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp: timestamp - 1,
                                    blockNumber,
                                },
                            ],
                            shouldStartAtElement: 2,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context timestamp is lower than last submitted.');
                    });
                    it('reverts if block number is older than previous one', async () => {
                        await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                            transactions: ['0x1234'],
                            contexts: [
                                {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber: blockNumber - 1,
                                },
                            ],
                            shouldStartAtElement: 2,
                            totalElementsToAppend: 1,
                        })).to.be.revertedWith('Context block number is lower than last submitted.');
                    });
                });
            });
            it('should revert if a queue element has expired and needs to be included', async () => {
                await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                await helpers_1.increaseEthTime(hardhat_1.ethers.provider, helpers_1.FORCE_INCLUSION_PERIOD_SECONDS * 2);
                const blockNumber = (await hardhat_1.ethers.provider.getBlockNumber()) - 1;
                const validTimestamp = (await helpers_1.getBlockTime(hardhat_1.ethers.provider)) + 100;
                await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                    transactions: ['0x1234'],
                    contexts: [
                        {
                            numSequencedTransactions: 1,
                            numSubsequentQueueTransactions: 0,
                            timestamp: validTimestamp,
                            blockNumber,
                        },
                    ],
                    shouldStartAtElement: 0,
                    totalElementsToAppend: 1,
                })).to.be.revertedWith('Previously enqueued batches have expired and must be appended before a new sequencer batch.');
            });
        });
        for (const size of ELEMENT_TEST_SIZES) {
            const target = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            describe(`Happy path: when appending ${size} sequencer transactions`, () => {
                describe('when not inserting queue elements in between', () => {
                    describe('when using a single batch context', () => {
                        let contexts;
                        let transactions;
                        beforeEach(async () => {
                            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
                            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 10;
                            contexts = [
                                {
                                    numSequencedTransactions: size,
                                    numSubsequentQueueTransactions: 0,
                                    timestamp,
                                    blockNumber,
                                },
                            ];
                            transactions = [...Array(size)].map((el, idx) => {
                                return '0x' + '12' + '34'.repeat(idx);
                            });
                        });
                        it('should append the given number of transactions', async () => {
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions,
                                contexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: size,
                            }))
                                .to.emit(OVM_CanonicalTransactionChain, 'SequencerBatchAppended')
                                .withArgs(0, 0, size);
                        });
                    });
                });
                describe('when inserting queue elements in between', () => {
                    beforeEach(async () => {
                        for (let i = 0; i < size; i++) {
                            await OVM_CanonicalTransactionChain.enqueue(target, gasLimit, data);
                        }
                    });
                    describe('between every other sequencer transaction', () => {
                        let contexts;
                        let transactions;
                        beforeEach(async () => {
                            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
                            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 50;
                            contexts = [...Array(size)].map(() => {
                                return {
                                    numSequencedTransactions: 1,
                                    numSubsequentQueueTransactions: 1,
                                    timestamp,
                                    blockNumber: Math.max(blockNumber, 0),
                                };
                            });
                            transactions = [...Array(size)].map((el, idx) => {
                                return '0x' + '12' + '34'.repeat(idx);
                            });
                        });
                        it('should append the batch', async () => {
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions,
                                contexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: size * 2,
                            }))
                                .to.emit(OVM_CanonicalTransactionChain, 'SequencerBatchAppended')
                                .withArgs(0, size, size * 2);
                        });
                    });
                    const spacing = Math.max(Math.floor(size / 4), 1);
                    describe(`between every ${spacing} sequencer transaction`, () => {
                        let contexts;
                        let transactions;
                        beforeEach(async () => {
                            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
                            const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 50;
                            contexts = [...Array(spacing)].map(() => {
                                return {
                                    numSequencedTransactions: size / spacing,
                                    numSubsequentQueueTransactions: 1,
                                    timestamp,
                                    blockNumber: Math.max(blockNumber, 0),
                                };
                            });
                            transactions = [...Array(size)].map((el, idx) => {
                                return '0x' + '12' + '34'.repeat(idx);
                            });
                        });
                        it('should append the batch', async () => {
                            await setup_1.expect(appendSequencerBatch(OVM_CanonicalTransactionChain, {
                                transactions,
                                contexts,
                                shouldStartAtElement: 0,
                                totalElementsToAppend: size + spacing,
                            }))
                                .to.emit(OVM_CanonicalTransactionChain, 'SequencerBatchAppended')
                                .withArgs(0, spacing, size + spacing);
                        });
                    });
                });
            });
        }
    });
    describe('getTotalElements', () => {
        it('should return zero when no elements exist', async () => {
            setup_1.expect(await OVM_CanonicalTransactionChain.getTotalElements()).to.equal(0);
        });
        for (const size of ELEMENT_TEST_SIZES) {
            describe(`when the sequencer inserts a batch of ${size} elements`, () => {
                beforeEach(async () => {
                    const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
                    const blockNumber = (await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider)) - 10;
                    const contexts = [
                        {
                            numSequencedTransactions: size,
                            numSubsequentQueueTransactions: 0,
                            timestamp,
                            blockNumber: Math.max(blockNumber, 0),
                        },
                    ];
                    const transactions = [...Array(size)].map((el, idx) => {
                        return '0x' + '12' + '34'.repeat(idx);
                    });
                    const res = await appendSequencerBatch(OVM_CanonicalTransactionChain.connect(sequencer), {
                        transactions,
                        contexts,
                        shouldStartAtElement: 0,
                        totalElementsToAppend: size,
                    });
                    await res.wait();
                });
                it(`should return ${size}`, async () => {
                    setup_1.expect(await OVM_CanonicalTransactionChain.getTotalElements()).to.equal(size);
                });
            });
        }
    });
});
//# sourceMappingURL=OVM_CanonicalTransactionChain.spec.js.map