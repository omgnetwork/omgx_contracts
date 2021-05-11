"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("../../../helpers");
describe('OVM_StateManager', () => {
    let signer1;
    let signer2;
    let signer3;
    before(async () => {
        ;
        [signer1, signer2, signer3] = await hardhat_1.ethers.getSigners();
    });
    let Factory__OVM_StateManager;
    before(async () => {
        Factory__OVM_StateManager = await hardhat_1.ethers.getContractFactory('OVM_StateManager');
    });
    let OVM_StateManager;
    beforeEach(async () => {
        OVM_StateManager = (await Factory__OVM_StateManager.deploy(await signer1.getAddress())).connect(signer1);
    });
    describe('setExecutionManager', () => {
        describe('when called by the current owner', () => {
            beforeEach(async () => {
                OVM_StateManager = OVM_StateManager.connect(signer1);
            });
            it('should change the current OVM_ExecutionManager', async () => {
                await setup_1.expect(OVM_StateManager.connect(signer1).setExecutionManager(await signer2.getAddress())).to.not.be.reverted;
                setup_1.expect(await OVM_StateManager.ovmExecutionManager()).to.equal(await signer2.getAddress());
            });
        });
        describe('when called by the current OVM_ExecutionManager', () => {
            beforeEach(async () => {
                await OVM_StateManager.connect(signer1).setExecutionManager(await signer2.getAddress());
            });
            it('should change the current OVM_ExecutionManager', async () => {
                await setup_1.expect(OVM_StateManager.connect(signer2).setExecutionManager(await signer3.getAddress())).to.not.be.reverted;
                setup_1.expect(await OVM_StateManager.ovmExecutionManager()).to.equal(await signer3.getAddress());
            });
        });
        describe('when called by any other account', () => {
            beforeEach(async () => {
                OVM_StateManager = OVM_StateManager.connect(signer1);
            });
            it('should revert', async () => {
                await setup_1.expect(OVM_StateManager.connect(signer3).setExecutionManager(await signer3.getAddress())).to.be.revertedWith('Function can only be called by authenticated addresses');
            });
        });
    });
    describe('putAccount', () => {
        it('should be able to store an OVM account', async () => {
            await setup_1.expect(OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data)).to.not.be.reverted;
        });
        it('should be able to overwrite an OVM account', async () => {
            await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            await setup_1.expect(OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[1].data)).to.not.be.reverted;
        });
    });
    describe('getAccount', () => {
        it('should be able to retrieve an OVM account', async () => {
            await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            setup_1.expect(lodash_1.default.toPlainObject(await OVM_StateManager.callStatic.getAccount(helpers_1.DUMMY_ACCOUNTS[0].address))).to.deep.include(helpers_1.DUMMY_ACCOUNTS[0].data);
        });
        it('should be able to retrieve an overwritten OVM account', async () => {
            await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[1].data);
            setup_1.expect(lodash_1.default.toPlainObject(await OVM_StateManager.callStatic.getAccount(helpers_1.DUMMY_ACCOUNTS[0].address))).to.deep.include(helpers_1.DUMMY_ACCOUNTS[1].data);
        });
    });
    describe('hasAccount', () => {
        describe('when the account exists', () => {
            beforeEach(async () => {
                await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.hasAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
        describe('when the account does not exist', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.hasAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
    });
    describe('hasEmptyAccount', () => {
        describe('when the account has the EMPTY_ACCOUNT_CODE_HASH', () => {
            beforeEach(async () => {
                await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, Object.assign(Object.assign({}, helpers_1.DUMMY_ACCOUNTS[0].data), { nonce: 0, codeHash: helpers_1.EMPTY_ACCOUNT_CODE_HASH }));
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.hasEmptyAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
        describe('when the account has a different non-zero codehash', () => {
            beforeEach(async () => {
                await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.hasEmptyAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
        describe('when the account does not exist', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.hasEmptyAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
    });
    describe('setAccountNonce', () => {
        it('should change the account nonce', async () => {
            await setup_1.expect(OVM_StateManager.setAccountNonce(helpers_1.DUMMY_ACCOUNTS[0].address, 1234)).to.not.be.reverted;
        });
    });
    describe('getAccountNonce', () => {
        describe('when the account exists', () => {
            beforeEach(async () => {
                await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            });
            it('should return the current nonce', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.getAccountNonce(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(helpers_1.DUMMY_ACCOUNTS[0].data.nonce);
            });
            describe('when the nonce has been modified', () => {
                beforeEach(async () => {
                    await OVM_StateManager.setAccountNonce(helpers_1.DUMMY_ACCOUNTS[0].address, 1234);
                });
                it('should return the updated nonce', async () => {
                    setup_1.expect(await OVM_StateManager.callStatic.getAccountNonce(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(1234);
                });
            });
        });
        describe('when the account does not exist', () => {
            it('should return zero', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.getAccountNonce(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(0);
            });
        });
    });
    describe('getAccountEthAddress', () => {
        describe('when the account exists', () => {
            beforeEach(async () => {
                await OVM_StateManager.putAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data);
            });
            it('should return the account eth address', async () => {
                setup_1.expect(await OVM_StateManager.getAccountEthAddress(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(helpers_1.DUMMY_ACCOUNTS[0].data.ethAddress);
            });
        });
        describe('when the account does not exist', () => {
            it('should return the zero address', async () => {
                setup_1.expect(await OVM_StateManager.getAccountEthAddress(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(ethers_1.constants.AddressZero);
            });
        });
    });
    describe('initPendingAccount', () => {
        it('should set the initial account values', async () => {
            await setup_1.expect(OVM_StateManager.initPendingAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.not.be.reverted;
            setup_1.expect(lodash_1.default.toPlainObject(await OVM_StateManager.callStatic.getAccount(helpers_1.DUMMY_ACCOUNTS[0].address))).to.deep.include({
                nonce: ethers_1.BigNumber.from(1),
                codeHash: helpers_1.KECCAK_256_NULL,
                isFresh: true,
            });
        });
    });
    describe('commitPendingAccount', () => {
        it('should set the remaining account values', async () => {
            await setup_1.expect(OVM_StateManager.commitPendingAccount(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_ACCOUNTS[0].data.ethAddress, helpers_1.DUMMY_ACCOUNTS[0].data.codeHash)).to.not.be.reverted;
            setup_1.expect(lodash_1.default.toPlainObject(await OVM_StateManager.callStatic.getAccount(helpers_1.DUMMY_ACCOUNTS[0].address))).to.deep.include({
                ethAddress: helpers_1.DUMMY_ACCOUNTS[0].data.ethAddress,
                codeHash: helpers_1.DUMMY_ACCOUNTS[0].data.codeHash,
            });
        });
    });
    describe('testAndSetAccountChanged', () => {
        describe('when the account has not yet been changed', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
        describe('when the account has been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
    });
    describe('testAndSetAccountLoaded', () => {
        describe('when the account has not yet been loaded', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetAccountLoaded(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
        describe('when the account has been loaded', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountLoaded(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetAccountLoaded(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
        describe('when the account has been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetAccountLoaded(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
    });
    describe('commitAccount', () => {
        describe('when the account has not been touched', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
        describe('when the account has been loaded but not changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountLoaded(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
        describe('when the account has been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(true);
            });
        });
        describe('when the account has already been committed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
                await OVM_StateManager.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address)).to.equal(false);
            });
        });
    });
    describe('incrementTotalUncommittedAccounts', () => {
        it('should update the total uncommitted accounts', async () => {
            await setup_1.expect(OVM_StateManager.incrementTotalUncommittedAccounts()).to.not
                .be.reverted;
        });
    });
    describe('getTotalUncommittedAccounts', () => {
        describe('when the total count has not been changed', () => {
            it('should return zero', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedAccounts()).to.equal(0);
            });
        });
        describe('when the count has been incremented', () => {
            describe('one time', () => {
                beforeEach(async () => {
                    await OVM_StateManager.incrementTotalUncommittedAccounts();
                });
                it('should return one', async () => {
                    setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedAccounts()).to.equal(1);
                });
                describe('when an account has been committed', () => {
                    beforeEach(async () => {
                        await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
                        await OVM_StateManager.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address);
                    });
                    it('should return zero', async () => {
                        setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedAccounts()).to.equal(0);
                    });
                });
            });
            describe('ten times', () => {
                beforeEach(async () => {
                    for (let i = 0; i < 10; i++) {
                        await OVM_StateManager.incrementTotalUncommittedAccounts();
                    }
                });
                it('should return one', async () => {
                    setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedAccounts()).to.equal(10);
                });
                describe('when an account has been committed', () => {
                    describe('one time', () => {
                        beforeEach(async () => {
                            await OVM_StateManager.testAndSetAccountChanged(helpers_1.DUMMY_ACCOUNTS[0].address);
                            await OVM_StateManager.commitAccount(helpers_1.DUMMY_ACCOUNTS[0].address);
                        });
                        it('should return nine', async () => {
                            setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedAccounts()).to.equal(9);
                        });
                    });
                });
            });
        });
    });
    describe('putContractStorage', () => {
        it('should be able to insert a storage slot for a given contract', async () => {
            await setup_1.expect(OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[1])).to.not.be.reverted;
        });
        it('should be able to overwrite a storage slot for a given contract', async () => {
            await OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[1]);
            await setup_1.expect(OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[2])).to.not.be.reverted;
        });
    });
    describe('getContractStorage', () => {
        it('should be able to retrieve a storage slot for a given contract', async () => {
            await OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[1]);
            setup_1.expect(await OVM_StateManager.callStatic.getContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(helpers_1.DUMMY_BYTES32[1]);
        });
        it('should be able to retrieve an overwritten storage slot for a given contract', async () => {
            await OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[1]);
            await OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[2]);
            setup_1.expect(await OVM_StateManager.callStatic.getContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(helpers_1.DUMMY_BYTES32[2]);
        });
    });
    describe('hasContractStorage', () => {
        describe('when the storage slot has not been verified', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.hasContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has been verified', () => {
            beforeEach(async () => {
                await OVM_StateManager.putContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0], helpers_1.DUMMY_BYTES32[1]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.hasContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
        describe('when the account is newly created', () => {
            beforeEach(async () => {
                await OVM_StateManager.initPendingAccount(helpers_1.DUMMY_ACCOUNTS[0].address);
            });
            it('should return true for any slot', async () => {
                for (const DUMMY_KEY of helpers_1.DUMMY_BYTES32) {
                    setup_1.expect(await OVM_StateManager.hasContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, DUMMY_KEY)).to.equal(true);
                }
            });
        });
    });
    describe('testAndSetContractStorageChanged', () => {
        describe('when the storage slot has not been touched', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has been loaded but not changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
        describe('when the storage slot has been committed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                await OVM_StateManager.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
    });
    describe('testAndSetContractStorageLoaded', () => {
        describe('when the storage slot has not been touched', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has already been loaded', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
        describe('when the storage slot has already been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
        describe('when the storage slot has been committed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                await OVM_StateManager.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
    });
    describe('commitContractStorage', () => {
        describe('when the storage slot has not been touched', () => {
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has been loaded', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageLoaded(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
        describe('when the storage slot has been changed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return true', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(true);
            });
        });
        describe('when the storage slot has been committed', () => {
            beforeEach(async () => {
                await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                await OVM_StateManager.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
            });
            it('should return false', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0])).to.equal(false);
            });
        });
    });
    describe('incrementTotalUncommittedContractStorage', () => {
        it('should update the total uncommitted storage slots', async () => {
            await setup_1.expect(OVM_StateManager.incrementTotalUncommittedContractStorage())
                .to.not.be.reverted;
        });
    });
    describe('getTotalUncommittedContractStorage', () => {
        describe('when the total count has not been changed', () => {
            it('should return zero', async () => {
                setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedContractStorage()).to.equal(0);
            });
        });
        describe('when the count has been incremented', () => {
            describe('one time', () => {
                beforeEach(async () => {
                    await OVM_StateManager.incrementTotalUncommittedContractStorage();
                });
                it('should return one', async () => {
                    setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedContractStorage()).to.equal(1);
                });
                describe('when a storage slot has been committed', () => {
                    beforeEach(async () => {
                        await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                        await OVM_StateManager.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                    });
                    it('should return zero', async () => {
                        setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedContractStorage()).to.equal(0);
                    });
                });
            });
            describe('ten times', () => {
                beforeEach(async () => {
                    for (let i = 0; i < 10; i++) {
                        await OVM_StateManager.incrementTotalUncommittedContractStorage();
                    }
                });
                it('should return ten', async () => {
                    setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedContractStorage()).to.equal(10);
                });
                describe('when a storage slot has been committed', () => {
                    describe('one time', () => {
                        beforeEach(async () => {
                            await OVM_StateManager.testAndSetContractStorageChanged(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                            await OVM_StateManager.commitContractStorage(helpers_1.DUMMY_ACCOUNTS[0].address, helpers_1.DUMMY_BYTES32[0]);
                        });
                        it('should return nine', async () => {
                            setup_1.expect(await OVM_StateManager.callStatic.getTotalUncommittedContractStorage()).to.equal(9);
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=OVM_StateManager.spec.js.map