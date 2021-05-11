"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const utils_1 = require("ethers/lib/utils");
const helpers_1 = require("../../../helpers");
const DECOMPRESSION_ADDRESS = '0x4200000000000000000000000000000000000008';
const MAX_GAS_LIMIT = 8000000;
const appendSequencerBatch = async (OVM_CanonicalTransactionChain, batch) => {
    const methodId = utils_1.keccak256(Buffer.from('appendSequencerBatch()')).slice(2, 10);
    const calldata = core_utils_1.encodeAppendSequencerBatch(batch);
    return OVM_CanonicalTransactionChain.signer.sendTransaction({
        to: OVM_CanonicalTransactionChain.address,
        data: '0x' + methodId + calldata,
    });
};
describe('[GAS BENCHMARK] OVM_CanonicalTransactionChain', () => {
    let sequencer;
    before(async () => {
        ;
        [sequencer] = await hardhat_1.ethers.getSigners();
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
    describe('appendSequencerBatch [ @skip-on-coverage ]', () => {
        beforeEach(() => {
            OVM_CanonicalTransactionChain = OVM_CanonicalTransactionChain.connect(sequencer);
        });
        it('200 transactions in a single context', async () => {
            console.log(`Benchmark: 200 transactions in a single context.`);
            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
            const blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
            const transactionTemplate = '0x' + '11'.repeat(400);
            const transactions = [];
            const numTxs = 200;
            for (let i = 0; i < numTxs; i++) {
                transactions.push(transactionTemplate);
            }
            const fixedCalldataCost = (transactionTemplate.slice(2).length / 2) * 16 * numTxs;
            const res = await appendSequencerBatch(OVM_CanonicalTransactionChain, {
                shouldStartAtElement: 0,
                totalElementsToAppend: numTxs,
                contexts: [
                    {
                        numSequencedTransactions: numTxs,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    },
                ],
                transactions,
            });
            const receipt = await res.wait();
            console.log('Benchmark complete.');
            console.log('Gas used:', receipt.gasUsed.toNumber());
            console.log('Fixed calldata cost:', fixedCalldataCost);
            console.log('Non-calldata overhead gas cost per transaction:', (receipt.gasUsed.toNumber() - fixedCalldataCost) / numTxs);
        }).timeout(100000000);
        it('200 transactions in 200 contexts', async () => {
            console.log(`Benchmark: 200 transactions in 200 contexts.`);
            const timestamp = (await helpers_1.getEthTime(hardhat_1.ethers.provider)) - 100;
            const blockNumber = await helpers_1.getNextBlockNumber(hardhat_1.ethers.provider);
            const transactionTemplate = '0x' + '11'.repeat(400);
            const transactions = [];
            const numTxs = 200;
            for (let i = 0; i < numTxs; i++) {
                transactions.push(transactionTemplate);
            }
            const fixedCalldataCost = (transactionTemplate.slice(2).length / 2) * 16 * numTxs;
            const res = await appendSequencerBatch(OVM_CanonicalTransactionChain, {
                shouldStartAtElement: 0,
                totalElementsToAppend: numTxs,
                contexts: [...Array(numTxs)].map(() => {
                    return {
                        numSequencedTransactions: 1,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    };
                }),
                transactions,
            });
            const receipt = await res.wait();
            console.log('Benchmark complete.');
            console.log('Gas used:', receipt.gasUsed.toNumber());
            console.log('Fixed calldata cost:', fixedCalldataCost);
            console.log('Non-calldata overhead gas cost per transaction:', (receipt.gasUsed.toNumber() - fixedCalldataCost) / numTxs);
        }).timeout(100000000);
    });
});
//# sourceMappingURL=OVM_CanonicalTransactionChain.gas.spec.js.map