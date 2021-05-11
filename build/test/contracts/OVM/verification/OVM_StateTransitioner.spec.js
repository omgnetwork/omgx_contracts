"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const rlp = __importStar(require("rlp"));
const helpers_1 = require("../../../helpers");
const smock_1 = require("@eth-optimism/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
describe('OVM_StateTransitioner', () => {
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__OVM_ExecutionManager;
    let Mock__OVM_StateManagerFactory;
    let Mock__OVM_StateManager;
    let Mock__OVM_BondManager;
    before(async () => {
        Mock__OVM_ExecutionManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager'));
        Mock__OVM_StateManagerFactory = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateManagerFactory'));
        Mock__OVM_StateManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_StateManager'));
        Mock__OVM_BondManager = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_BondManager'));
        await helpers_1.setProxyTarget(AddressManager, 'OVM_BondManager', Mock__OVM_BondManager);
        Mock__OVM_BondManager.smocked.recordGasSpent.will.return();
        await helpers_1.setProxyTarget(AddressManager, 'OVM_ExecutionManager', Mock__OVM_ExecutionManager);
        await helpers_1.setProxyTarget(AddressManager, 'OVM_StateManagerFactory', Mock__OVM_StateManagerFactory);
        Mock__OVM_StateManagerFactory.smocked.create.will.return.with(Mock__OVM_StateManager.address);
        Mock__OVM_StateManager.smocked.putAccount.will.return();
    });
    let Factory__OVM_StateTransitioner;
    before(async () => {
        Factory__OVM_StateTransitioner = await smock_1.smoddit('OVM_StateTransitioner');
    });
    let OVM_StateTransitioner;
    beforeEach(async () => {
        OVM_StateTransitioner = await Factory__OVM_StateTransitioner.deploy(AddressManager.address, 0, hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero);
    });
    describe('proveContractState', () => {
        const ovmContractAddress = helpers_1.NON_ZERO_ADDRESS;
        let ethContractAddress = ethers_1.constants.AddressZero;
        let account;
        beforeEach(() => {
            Mock__OVM_StateManager.smocked.hasAccount.will.return.with(false);
            Mock__OVM_StateManager.smocked.hasEmptyAccount.will.return.with(false);
            account = {
                nonce: 0,
                balance: 0,
                storageRoot: hardhat_1.ethers.constants.HashZero,
                codeHash: hardhat_1.ethers.constants.HashZero,
            };
        });
        describe('when provided a valid code hash', () => {
            beforeEach(async () => {
                ethContractAddress = OVM_StateTransitioner.address;
                account.codeHash = hardhat_1.ethers.utils.keccak256(await hardhat_1.ethers.provider.getCode(OVM_StateTransitioner.address));
            });
            describe('when provided an invalid account inclusion proof', () => {
                const proof = '0x';
                it('should revert', async () => {
                    await setup_1.expect(OVM_StateTransitioner.proveContractState(ovmContractAddress, ethContractAddress, proof)).to.be.reverted;
                });
            });
            describe('when provided a valid account inclusion proof', () => {
                let proof;
                beforeEach(async () => {
                    const generator = await helpers_1.TrieTestGenerator.fromAccounts({
                        accounts: [
                            Object.assign(Object.assign({}, account), { address: ovmContractAddress }),
                        ],
                        secure: true,
                    });
                    const test = await generator.makeAccountProofTest(ovmContractAddress);
                    proof = test.accountTrieWitness;
                    OVM_StateTransitioner = await Factory__OVM_StateTransitioner.deploy(AddressManager.address, 0, test.accountTrieRoot, hardhat_1.ethers.constants.HashZero);
                });
                it('should put the account in the state manager', async () => {
                    await OVM_StateTransitioner.proveContractState(ovmContractAddress, ethContractAddress, proof);
                    setup_1.expect(Mock__OVM_StateManager.smocked.putAccount.calls[0]).to.deep.equal([
                        helpers_1.NON_ZERO_ADDRESS,
                        [
                            ethers_1.BigNumber.from(account.nonce),
                            ethers_1.BigNumber.from(account.balance),
                            account.storageRoot,
                            account.codeHash,
                            ethContractAddress,
                            false,
                        ],
                    ]);
                });
            });
        });
    });
    describe('proveStorageSlot', () => {
        beforeEach(() => {
            Mock__OVM_StateManager.smocked.hasContractStorage.will.return.with(false);
        });
        describe('when the corresponding account is not proven', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.hasAccount.will.return.with(false);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitioner.proveStorageSlot(helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_NULL_BYTES32, '0x')).to.be.revertedWith('Contract must be verified before proving a storage slot.');
            });
        });
        describe('when the corresponding account is proven', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.hasAccount.will.return.with(true);
            });
            describe('when provided an invalid slot inclusion proof', () => {
                const key = hardhat_1.ethers.utils.keccak256('0x1234');
                const val = hardhat_1.ethers.utils.keccak256('0x5678');
                const proof = '0x';
                beforeEach(async () => {
                    const generator = await helpers_1.TrieTestGenerator.fromNodes({
                        nodes: [
                            {
                                key,
                                val: '0x' + rlp.encode(val).toString('hex'),
                            },
                        ],
                        secure: true,
                    });
                    const test = await generator.makeInclusionProofTest(0);
                    Mock__OVM_StateManager.smocked.getAccountStorageRoot.will.return.with(test.root);
                });
                it('should revert', async () => {
                    await setup_1.expect(OVM_StateTransitioner.proveStorageSlot(ethers_1.constants.AddressZero, key, proof)).to.be.reverted;
                });
            });
            describe('when provided a valid slot inclusion proof', () => {
                const key = hardhat_1.ethers.utils.keccak256('0x1234');
                const val = hardhat_1.ethers.utils.keccak256('0x5678');
                let proof;
                beforeEach(async () => {
                    const generator = await helpers_1.TrieTestGenerator.fromNodes({
                        nodes: [
                            {
                                key,
                                val: '0x' + rlp.encode(val).toString('hex'),
                            },
                        ],
                        secure: true,
                    });
                    const test = await generator.makeInclusionProofTest(0);
                    proof = test.proof;
                    Mock__OVM_StateManager.smocked.getAccountStorageRoot.will.return.with(test.root);
                });
                it('should insert the storage slot', async () => {
                    await setup_1.expect(OVM_StateTransitioner.proveStorageSlot(ethers_1.constants.AddressZero, key, proof)).to.not.be.reverted;
                    setup_1.expect(Mock__OVM_StateManager.smocked.putContractStorage.calls[0]).to.deep.equal([ethers_1.constants.AddressZero, key, val]);
                });
            });
        });
    });
    describe('applyTransaction', () => {
        it('Blocks execution if insufficient gas provided', async () => {
            const gasLimit = 500000;
            const transaction = {
                timestamp: '0x12',
                blockNumber: '0x34',
                l1QueueOrigin: '0x00',
                l1TxOrigin: ethers_1.constants.AddressZero,
                entrypoint: ethers_1.constants.AddressZero,
                gasLimit: core_utils_1.toHexString(gasLimit),
                data: '0x1234',
            };
            const transactionHash = hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.solidityPack([
                'uint256',
                'uint256',
                'uint8',
                'address',
                'address',
                'uint256',
                'bytes',
            ], [
                transaction.timestamp,
                transaction.blockNumber,
                transaction.l1QueueOrigin,
                transaction.l1TxOrigin,
                transaction.entrypoint,
                transaction.gasLimit,
                transaction.data,
            ]));
            await OVM_StateTransitioner.smodify.put({
                phase: 0,
                transactionHash,
            });
            await setup_1.expect(OVM_StateTransitioner.applyTransaction(transaction, {
                gasLimit: 30000,
            })).to.be.revertedWith(`Not enough gas to execute transaction deterministically`);
        });
    });
    describe('commitContractState', () => {
        beforeEach(async () => {
            await OVM_StateTransitioner.smodify.put({
                phase: 1,
            });
        });
        const ovmContractAddress = helpers_1.NON_ZERO_ADDRESS;
        let account;
        beforeEach(() => {
            account = {
                nonce: 0,
                balance: 0,
                storageRoot: hardhat_1.ethers.constants.HashZero,
                codeHash: hardhat_1.ethers.constants.HashZero,
                ethAddress: ethers_1.constants.AddressZero,
                isFresh: false,
            };
            Mock__OVM_StateManager.smocked.hasAccount.will.return.with(false);
            Mock__OVM_StateManager.smocked.getAccount.will.return.with(account);
        });
        describe('when the account was not changed or has already been committed', () => {
            before(() => {
                Mock__OVM_StateManager.smocked.getTotalUncommittedContractStorage.will.return.with(0);
                Mock__OVM_StateManager.smocked.commitAccount.will.return.with(false);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitioner.commitContractState(ovmContractAddress, '0x')).to.be.revertedWith(`Account state wasn't changed or has already been committed`);
            });
        });
        describe('when the account was changed or has not already been committed', () => {
            before(() => {
                Mock__OVM_StateManager.smocked.commitAccount.will.return.with(true);
            });
            describe('when given an valid update proof', () => {
                let proof;
                let postStateRoot;
                beforeEach(async () => {
                    const generator = await helpers_1.TrieTestGenerator.fromAccounts({
                        accounts: [
                            Object.assign(Object.assign({}, account), { nonce: 10, address: ovmContractAddress }),
                        ],
                        secure: true,
                    });
                    const test = await generator.makeAccountUpdateTest(ovmContractAddress, account);
                    proof = test.accountTrieWitness;
                    postStateRoot = test.newAccountTrieRoot;
                    await OVM_StateTransitioner.smodify.put({
                        postStateRoot: test.accountTrieRoot,
                    });
                });
                it('should update the post state root', async () => {
                    await setup_1.expect(OVM_StateTransitioner.commitContractState(ovmContractAddress, proof)).to.not.be.reverted;
                    setup_1.expect(await OVM_StateTransitioner.getPostStateRoot()).to.equal(postStateRoot);
                });
            });
        });
    });
    describe('commitStorageSlot', () => {
        beforeEach(async () => {
            await OVM_StateTransitioner.smodify.put({
                phase: 1,
            });
        });
        const ovmContractAddress = helpers_1.NON_ZERO_ADDRESS;
        let account;
        const key = hardhat_1.ethers.utils.keccak256('0x1234');
        const val = hardhat_1.ethers.utils.keccak256('0x5678');
        const newVal = hardhat_1.ethers.utils.keccak256('0x4321');
        beforeEach(() => {
            account = {
                nonce: 0,
                balance: 0,
                storageRoot: hardhat_1.ethers.constants.HashZero,
                codeHash: hardhat_1.ethers.constants.HashZero,
            };
            Mock__OVM_StateManager.smocked.getAccount.will.return.with(Object.assign(Object.assign({}, account), { ethAddress: ethers_1.constants.AddressZero, isFresh: false }));
            Mock__OVM_StateManager.smocked.getContractStorage.will.return.with(val);
        });
        describe('when the slot was not changed or was already committed', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.commitContractStorage.will.return.with(false);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitioner.commitStorageSlot(ovmContractAddress, key, '0x')).to.be.revertedWith(`Storage slot value wasn't changed or has already been committed.`);
            });
        });
        describe('when the slot was changed or not already committed', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.commitContractStorage.will.return.with(true);
            });
            describe('with a valid proof', () => {
                let storageTrieProof;
                beforeEach(async () => {
                    const storageGenerator = await helpers_1.TrieTestGenerator.fromNodes({
                        nodes: [
                            {
                                key,
                                val: '0x' + rlp.encode(val).toString('hex'),
                            },
                        ],
                        secure: true,
                    });
                    const storageTest = await storageGenerator.makeNodeUpdateTest(key, '0x' + rlp.encode(newVal).toString('hex'));
                    const generator = await helpers_1.TrieTestGenerator.fromAccounts({
                        accounts: [
                            Object.assign(Object.assign({}, account), { storageRoot: storageTest.root, address: ovmContractAddress }),
                        ],
                        secure: true,
                    });
                    const test = await generator.makeAccountUpdateTest(ovmContractAddress, Object.assign(Object.assign({}, account), { storageRoot: storageTest.newRoot }));
                    Mock__OVM_StateManager.smocked.getAccount.will.return.with(Object.assign(Object.assign({}, account), { storageRoot: storageTest.root, ethAddress: ethers_1.constants.AddressZero, isFresh: false }));
                    storageTrieProof = storageTest.proof;
                    await OVM_StateTransitioner.smodify.put({
                        postStateRoot: test.accountTrieRoot,
                    });
                });
                it('should commit the slot and update the state', async () => {
                    await setup_1.expect(OVM_StateTransitioner.commitStorageSlot(ovmContractAddress, key, storageTrieProof)).to.not.be.reverted;
                });
            });
        });
    });
    describe('completeTransition', () => {
        beforeEach(async () => {
            await OVM_StateTransitioner.smodify.put({
                phase: 1,
            });
        });
        describe('when there are uncommitted accounts', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.getTotalUncommittedAccounts.will.return.with(1);
                Mock__OVM_StateManager.smocked.getTotalUncommittedContractStorage.will.return.with(0);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitioner.completeTransition()).to.be.revertedWith('All accounts must be committed before completing a transition.');
            });
        });
        describe('when there are uncommitted storage slots', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.getTotalUncommittedAccounts.will.return.with(0);
                Mock__OVM_StateManager.smocked.getTotalUncommittedContractStorage.will.return.with(1);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateTransitioner.completeTransition()).to.be.revertedWith('All storage must be committed before completing a transition.');
            });
        });
        describe('when all state changes are committed', () => {
            beforeEach(() => {
                Mock__OVM_StateManager.smocked.getTotalUncommittedAccounts.will.return.with(0);
                Mock__OVM_StateManager.smocked.getTotalUncommittedContractStorage.will.return.with(0);
            });
            it('should complete the transition', async () => {
                await setup_1.expect(OVM_StateTransitioner.completeTransition()).to.not.be
                    .reverted;
                setup_1.expect(await OVM_StateTransitioner.isComplete()).to.equal(true);
            });
        });
    });
});
//# sourceMappingURL=OVM_StateTransitioner.spec.js.map