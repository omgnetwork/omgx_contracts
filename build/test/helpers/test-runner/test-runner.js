"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionManagerTestRunner = void 0;
const setup_1 = require("../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const lodash_1 = require("lodash");
const smock_1 = require("@eth-optimism/smock");
const test_types_1 = require("./test.types");
const codec_1 = require("../codec");
const constants_1 = require("../constants");
const __1 = require("../");
const dummy_1 = require("../dummy");
const src_1 = require("../../../src");
class ExecutionManagerTestRunner {
    constructor() {
        this.contracts = {
            OVM_SafetyChecker: undefined,
            OVM_StateManager: undefined,
            OVM_ExecutionManager: undefined,
            Helper_TestRunner: undefined,
            Factory__Helper_TestRunner_CREATE: undefined,
            OVM_DeployerWhitelist: undefined,
            OVM_ProxyEOA: undefined,
        };
        this.defaultPreState = {
            StateManager: {
                owner: '$OVM_EXECUTION_MANAGER',
                accounts: {
                    ['0x4200000000000000000000000000000000000002']: {
                        codeHash: constants_1.NON_NULL_BYTES32,
                        ethAddress: '$OVM_DEPLOYER_WHITELIST',
                    },
                    ['0x4200000000000000000000000000000000000009']: {
                        codeHash: constants_1.NON_NULL_BYTES32,
                        ethAddress: '$OVM_PROXY_EOA',
                    },
                },
                contractStorage: {
                    ['0x4200000000000000000000000000000000000002']: {
                        '0x0000000000000000000000000000000000000000000000000000000000000000': __1.getStorageXOR(hardhat_1.ethers.constants.HashZero),
                    },
                },
                verifiedContractStorage: {
                    ['0x4200000000000000000000000000000000000002']: {
                        '0x0000000000000000000000000000000000000000000000000000000000000000': true,
                    },
                },
            },
            ExecutionManager: {
                transactionRecord: {
                    ovmGasRefund: 0,
                },
            },
        };
    }
    run(test) {
        ;
        (test.preState = lodash_1.merge(lodash_1.cloneDeep(this.defaultPreState), lodash_1.cloneDeep(test.preState))),
            (test.postState = test.postState || {});
        describe(`OVM_ExecutionManager Test: ${test.name}`, () => {
            var _a, _b;
            (_a = test.subTests) === null || _a === void 0 ? void 0 : _a.map((subTest) => {
                this.run(Object.assign(Object.assign({}, subTest), { preState: lodash_1.merge(lodash_1.cloneDeep(test.preState), lodash_1.cloneDeep(subTest.preState)), postState: lodash_1.merge(lodash_1.cloneDeep(test.postState), lodash_1.cloneDeep(subTest.postState)) }));
            });
            (_b = test.parameters) === null || _b === void 0 ? void 0 : _b.map((parameter) => {
                beforeEach(async () => {
                    await this.initContracts();
                });
                let replacedTest;
                let replacedParameter;
                beforeEach(async () => {
                    replacedTest = this.setPlaceholderStrings(test);
                    replacedParameter = this.setPlaceholderStrings(parameter);
                });
                beforeEach(async () => {
                    await this.contracts.OVM_StateManager.smodify.put({
                        accounts: {
                            [this.contracts.Helper_TestRunner.address]: {
                                nonce: 0,
                                codeHash: constants_1.NON_NULL_BYTES32,
                                ethAddress: this.contracts.Helper_TestRunner.address,
                            },
                        },
                    });
                });
                beforeEach(async () => {
                    await this.contracts.OVM_ExecutionManager.smodify.put(replacedTest.preState.ExecutionManager);
                    await this.contracts.OVM_StateManager.smodify.put(replacedTest.preState.StateManager);
                });
                afterEach(async () => {
                    setup_1.expect(await this.contracts.OVM_ExecutionManager.smodify.check(replacedTest.postState.ExecutionManager)).to.equal(true);
                    setup_1.expect(await this.contracts.OVM_StateManager.smodify.check(replacedTest.postState.StateManager)).to.equal(true);
                });
                let itfn = it;
                if (parameter.focus) {
                    itfn = it.only;
                }
                else if (parameter.skip) {
                    itfn = it.skip;
                }
                itfn(`should execute: ${parameter.name}`, async () => {
                    try {
                        for (const step of replacedParameter.steps) {
                            await this.runTestStep(step);
                        }
                    }
                    catch (err) {
                        if (parameter.expectInvalidStateAccess) {
                            setup_1.expect(err.toString()).to.contain('VM Exception while processing transaction: revert');
                        }
                        else {
                            throw err;
                        }
                    }
                });
            });
        });
    }
    async initContracts() {
        if (this.snapshot) {
            await hardhat_1.ethers.provider.send('evm_revert', [this.snapshot]);
            this.snapshot = await hardhat_1.ethers.provider.send('evm_snapshot', []);
            return;
        }
        const AddressManager = await (await hardhat_1.ethers.getContractFactory('Lib_AddressManager')).deploy();
        const SafetyChecker = await (await hardhat_1.ethers.getContractFactory('OVM_SafetyChecker')).deploy();
        const MockSafetyChecker = await smock_1.smockit(SafetyChecker);
        MockSafetyChecker.smocked.isBytecodeSafe.will.return.with((bytecode) => {
            return bytecode !== dummy_1.UNSAFE_BYTECODE;
        });
        this.contracts.OVM_SafetyChecker = MockSafetyChecker;
        await AddressManager.setAddress('OVM_SafetyChecker', this.contracts.OVM_SafetyChecker.address);
        const DeployerWhitelist = await src_1.getContractFactory('OVM_DeployerWhitelist', AddressManager.signer, true).deploy();
        this.contracts.OVM_DeployerWhitelist = DeployerWhitelist;
        this.contracts.OVM_ProxyEOA = await src_1.getContractFactory('OVM_ProxyEOA', AddressManager.signer, true).deploy();
        this.contracts.OVM_ExecutionManager = await (await smock_1.smoddit('OVM_ExecutionManager')).deploy(AddressManager.address, {
            minTransactionGasLimit: 0,
            maxTransactionGasLimit: 1000000000,
            maxGasPerQueuePerEpoch: 1000000000000,
            secondsPerEpoch: 600,
        }, {
            ovmCHAINID: 420,
        });
        this.contracts.OVM_StateManager = await (await smock_1.smoddit('OVM_StateManager')).deploy(await this.contracts.OVM_ExecutionManager.signer.getAddress());
        await this.contracts.OVM_StateManager.setExecutionManager(this.contracts.OVM_ExecutionManager.address);
        this.contracts.Helper_TestRunner = await (await hardhat_1.ethers.getContractFactory('Helper_TestRunner')).deploy();
        this.contracts.Factory__Helper_TestRunner_CREATE = await hardhat_1.ethers.getContractFactory('Helper_TestRunner_CREATE');
        this.snapshot = await hardhat_1.ethers.provider.send('evm_snapshot', []);
    }
    static getDummyAddress(placeholder) {
        return '0x' + (placeholder.split('$DUMMY_OVM_ADDRESS_')[1] + '0').repeat(20);
    }
    setPlaceholderStrings(obj) {
        const getReplacementString = (kv) => {
            if (kv === '$OVM_EXECUTION_MANAGER') {
                return this.contracts.OVM_ExecutionManager.address;
            }
            else if (kv === '$OVM_STATE_MANAGER') {
                return this.contracts.OVM_StateManager.address;
            }
            else if (kv === '$OVM_SAFETY_CHECKER') {
                return this.contracts.OVM_SafetyChecker.address;
            }
            else if (kv === '$OVM_CALL_HELPER') {
                return this.contracts.Helper_TestRunner.address;
            }
            else if (kv === '$OVM_DEPLOYER_WHITELIST') {
                return this.contracts.OVM_DeployerWhitelist.address;
            }
            else if (kv === '$OVM_PROXY_EOA') {
                return this.contracts.OVM_ProxyEOA.address;
            }
            else if (kv.startsWith('$DUMMY_OVM_ADDRESS_')) {
                return ExecutionManagerTestRunner.getDummyAddress(kv);
            }
            else {
                return kv;
            }
        };
        let ret = lodash_1.cloneDeep(obj);
        if (Array.isArray(ret)) {
            ret = ret.map((element) => {
                return this.setPlaceholderStrings(element);
            });
        }
        else if (typeof ret === 'object' && ret !== null) {
            for (const key of Object.keys(ret)) {
                const replacedKey = getReplacementString(key);
                if (replacedKey !== key) {
                    ret[replacedKey] = ret[key];
                    delete ret[key];
                }
                ret[replacedKey] = this.setPlaceholderStrings(ret[replacedKey]);
            }
        }
        else if (typeof ret === 'string') {
            ret = getReplacementString(ret);
        }
        return ret;
    }
    async runTestStep(step) {
        if (test_types_1.isTestStep_Run(step)) {
            let calldata;
            if (step.functionParams.data) {
                calldata = step.functionParams.data;
            }
            else {
                const runStep = {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: constants_1.OVM_TX_GAS_LIMIT,
                        target: ExecutionManagerTestRunner.getDummyAddress('$DUMMY_OVM_ADDRESS_1'),
                        subSteps: step.functionParams.subSteps,
                    },
                    expectedReturnStatus: true,
                };
                calldata = this.encodeFunctionData(runStep);
            }
            const toRun = this.contracts.OVM_ExecutionManager.run({
                timestamp: step.functionParams.timestamp,
                blockNumber: 0,
                l1QueueOrigin: step.functionParams.queueOrigin,
                l1TxOrigin: step.functionParams.origin,
                entrypoint: step.functionParams.entrypoint,
                gasLimit: step.functionParams.gasLimit,
                data: calldata,
            }, this.contracts.OVM_StateManager.address, { gasLimit: step.suppliedGas || constants_1.RUN_OVM_TEST_GAS });
            if (!!step.expectedRevertValue) {
                await setup_1.expect(toRun).to.be.revertedWith(step.expectedRevertValue);
            }
            else {
                await toRun;
            }
        }
        else {
            await this.contracts.OVM_ExecutionManager.ovmCALL(constants_1.OVM_TX_GAS_LIMIT, ExecutionManagerTestRunner.getDummyAddress('$DUMMY_OVM_ADDRESS_1'), this.contracts.Helper_TestRunner.interface.encodeFunctionData('runSingleTestStep', [this.parseTestStep(step)]), { gasLimit: constants_1.RUN_OVM_TEST_GAS });
        }
    }
    parseTestStep(step) {
        return {
            functionName: step.functionName,
            functionData: this.encodeFunctionData(step),
            expectedReturnStatus: this.getReturnStatus(step),
            expectedReturnData: this.encodeExpectedReturnData(step),
            onlyValidateFlag: this.shouldStepOnlyValidateFlag(step),
        };
    }
    shouldStepOnlyValidateFlag(step) {
        if (!!step.expectedReturnValue) {
            if (!!step.expectedReturnValue.onlyValidateFlag) {
                return true;
            }
        }
        return false;
    }
    getReturnStatus(step) {
        if (test_types_1.isTestStep_evm(step)) {
            return false;
        }
        else if (test_types_1.isTestStep_Context(step)) {
            return true;
        }
        else if (test_types_1.isTestStep_CALL(step)) {
            if (test_types_1.isRevertFlagError(step.expectedReturnValue) &&
                (step.expectedReturnValue.flag === codec_1.REVERT_FLAGS.INVALID_STATE_ACCESS ||
                    step.expectedReturnValue.flag === codec_1.REVERT_FLAGS.STATIC_VIOLATION ||
                    step.expectedReturnValue.flag === codec_1.REVERT_FLAGS.CREATOR_NOT_ALLOWED)) {
                return step.expectedReturnStatus;
            }
            else {
                return true;
            }
        }
        else {
            return step.expectedReturnStatus;
        }
    }
    encodeFunctionData(step) {
        var _a, _b;
        if (test_types_1.isTestStep_evm(step)) {
            if (test_types_1.isRevertFlagError(step.returnData)) {
                return codec_1.encodeRevertData(step.returnData.flag, step.returnData.data, step.returnData.nuisanceGasLeft, step.returnData.ovmGasRefund);
            }
            else {
                return step.returnData || '0x';
            }
        }
        let functionParams = [];
        if (test_types_1.isTestStep_SSTORE(step) ||
            test_types_1.isTestStep_SLOAD(step) ||
            test_types_1.isTestStep_EXTCODESIZE(step) ||
            test_types_1.isTestStep_EXTCODEHASH(step) ||
            test_types_1.isTestStep_EXTCODECOPY(step) ||
            test_types_1.isTestStep_CREATEEOA(step)) {
            functionParams = Object.values(step.functionParams);
        }
        else if (test_types_1.isTestStep_CALL(step)) {
            functionParams = [
                step.functionParams.gasLimit,
                step.functionParams.target,
                step.functionParams.calldata ||
                    this.contracts.Helper_TestRunner.interface.encodeFunctionData('runMultipleTestSteps', [
                        step.functionParams.subSteps.map((subStep) => {
                            return this.parseTestStep(subStep);
                        }),
                    ]),
            ];
        }
        else if (test_types_1.isTestStep_CREATE(step)) {
            functionParams = [
                this.contracts.Factory__Helper_TestRunner_CREATE.getDeployTransaction(step.functionParams.bytecode || '0x', ((_a = step.functionParams.subSteps) === null || _a === void 0 ? void 0 : _a.map((subStep) => {
                    return this.parseTestStep(subStep);
                })) || []).data,
            ];
        }
        else if (test_types_1.isTestStep_CREATE2(step)) {
            functionParams = [
                this.contracts.Factory__Helper_TestRunner_CREATE.getDeployTransaction(step.functionParams.bytecode || '0x', ((_b = step.functionParams.subSteps) === null || _b === void 0 ? void 0 : _b.map((subStep) => {
                    return this.parseTestStep(subStep);
                })) || []).data,
                step.functionParams.salt,
            ];
        }
        else if (test_types_1.isTestStep_REVERT(step)) {
            functionParams = [step.revertData || '0x'];
        }
        return this.contracts.OVM_ExecutionManager.interface.encodeFunctionData(step.functionName, functionParams);
    }
    encodeExpectedReturnData(step) {
        if (test_types_1.isTestStep_evm(step)) {
            return '0x';
        }
        if (test_types_1.isRevertFlagError(step.expectedReturnValue)) {
            return codec_1.encodeRevertData(step.expectedReturnValue.flag, step.expectedReturnValue.data, step.expectedReturnValue.nuisanceGasLeft, step.expectedReturnValue.ovmGasRefund);
        }
        if (test_types_1.isTestStep_REVERT(step)) {
            return step.expectedReturnValue || '0x';
        }
        let returnData = [];
        if (test_types_1.isTestStep_CALL(step)) {
            if (step.expectedReturnValue === '0x00') {
                return step.expectedReturnValue;
            }
            else if (typeof step.expectedReturnValue === 'string' ||
                step.expectedReturnValue === undefined) {
                returnData = [
                    step.expectedReturnStatus,
                    step.expectedReturnValue || '0x',
                ];
            }
            else {
                returnData = [
                    step.expectedReturnValue.ovmSuccess,
                    step.expectedReturnValue.returnData,
                ];
            }
        }
        else if (ethers_1.BigNumber.isBigNumber(step.expectedReturnValue)) {
            returnData = [step.expectedReturnValue.toHexString()];
        }
        else if (step.expectedReturnValue !== undefined) {
            if (step.expectedReturnValue === '0x00') {
                return step.expectedReturnValue;
            }
            else {
                returnData = [step.expectedReturnValue];
            }
        }
        if (test_types_1.isTestStep_CREATE(step) || test_types_1.isTestStep_CREATE2(step)) {
            if (!test_types_1.isRevertFlagError(step.expectedReturnValue)) {
                if (typeof step.expectedReturnValue === 'string') {
                    returnData = [step.expectedReturnValue, '0x'];
                }
                else {
                    returnData = [
                        step.expectedReturnValue.address,
                        step.expectedReturnValue.revertData || '0x',
                    ];
                }
            }
        }
        return this.contracts.OVM_ExecutionManager.interface.encodeFunctionResult(step.functionName, returnData);
    }
}
exports.ExecutionManagerTestRunner = ExecutionManagerTestRunner;
//# sourceMappingURL=test-runner.js.map