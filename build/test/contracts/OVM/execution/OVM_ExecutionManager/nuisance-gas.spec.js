"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../../../../helpers");
const CREATED_CONTRACT_1 = '0x2bda4a99d5be88609d23b1e4ab5d1d34fb1c2feb';
const FRESH_CALL_NUISANCE_GAS_COST = helpers_1.Helper_TestRunner_BYTELEN *
    helpers_1.NUISANCE_GAS_COSTS.NUISANCE_GAS_PER_CONTRACT_BYTE +
    helpers_1.NUISANCE_GAS_COSTS.MIN_NUISANCE_GAS_PER_CONTRACT;
const test_nuisanceGas = {
    name: 'Basic tests for nuisance gas',
    preState: {
        ExecutionManager: {
            ovmStateManager: '$OVM_STATE_MANAGER',
            ovmSafetyChecker: '$OVM_SAFETY_CHECKER',
            messageRecord: {
                nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT,
            },
        },
        StateManager: {
            owner: '$OVM_EXECUTION_MANAGER',
            accounts: {
                $DUMMY_OVM_ADDRESS_1: {
                    codeHash: helpers_1.NON_NULL_BYTES32,
                    ethAddress: '$OVM_CALL_HELPER',
                },
                $DUMMY_OVM_ADDRESS_2: {
                    codeHash: helpers_1.NON_NULL_BYTES32,
                    ethAddress: '$OVM_CALL_HELPER',
                },
                $DUMMY_OVM_ADDRESS_3: {
                    codeHash: helpers_1.VERIFIED_EMPTY_CONTRACT_HASH,
                    ethAddress: '0x' + '00'.repeat(20),
                },
                [CREATED_CONTRACT_1]: {
                    codeHash: helpers_1.VERIFIED_EMPTY_CONTRACT_HASH,
                    ethAddress: '0x' + '00'.repeat(20),
                },
            },
        },
    },
    subTests: [
        {
            name: 'ovmCALL consumes nuisance gas of CODESIZE * NUISANCE_GAS_PER_CONTRACT_BYTE',
            postState: {
                ExecutionManager: {
                    messageRecord: {
                        nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT - FRESH_CALL_NUISANCE_GAS_COST,
                    },
                },
            },
            parameters: [
                {
                    name: 'single ovmCALL',
                    steps: [
                        {
                            functionName: 'ovmADDRESS',
                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_1',
                        },
                    ],
                },
                {
                    name: 'nested ovmCALL, same address',
                    steps: [
                        {
                            functionName: 'ovmCALL',
                            functionParams: {
                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                target: '$DUMMY_OVM_ADDRESS_1',
                                subSteps: [],
                            },
                            expectedReturnStatus: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'ovmCALL consumes nuisance gas of CODESIZE * NUISANCE_GAS_PER_CONTRACT_BYTE twice for two unique ovmCALLS',
            postState: {
                ExecutionManager: {
                    messageRecord: {
                        nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT - 2 * FRESH_CALL_NUISANCE_GAS_COST,
                    },
                },
            },
            parameters: [
                {
                    name: 'directly nested ovmCALL',
                    steps: [
                        {
                            functionName: 'ovmCALL',
                            functionParams: {
                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                target: '$DUMMY_OVM_ADDRESS_2',
                                subSteps: [],
                            },
                            expectedReturnStatus: true,
                        },
                    ],
                },
                {
                    name: 'with a call to previously called contract too',
                    steps: [
                        {
                            functionName: 'ovmCALL',
                            functionParams: {
                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                target: '$DUMMY_OVM_ADDRESS_2',
                                subSteps: [
                                    {
                                        functionName: 'ovmCALL',
                                        functionParams: {
                                            gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                            target: '$DUMMY_OVM_ADDRESS_1',
                                            subSteps: [],
                                        },
                                        expectedReturnStatus: true,
                                    },
                                ],
                            },
                            expectedReturnStatus: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'ovmCALL consumes all allotted nuisance gas if code contract throws unknown exception',
            postState: {
                ExecutionManager: {
                    messageRecord: {
                        nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT -
                            FRESH_CALL_NUISANCE_GAS_COST -
                            helpers_1.OVM_TX_GAS_LIMIT / 2,
                    },
                },
            },
            parameters: [
                {
                    name: 'give 1/2 gas to evmINVALID',
                    steps: [
                        {
                            functionName: 'ovmCALL',
                            functionParams: {
                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                target: '$DUMMY_OVM_ADDRESS_1',
                                subSteps: [
                                    {
                                        functionName: 'evmINVALID',
                                    },
                                ],
                            },
                            expectedReturnStatus: true,
                            expectedReturnValue: {
                                ovmSuccess: false,
                                returnData: '0x',
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'ovmCREATE consumes all allotted nuisance gas if creation code throws data-less exception',
            parameters: [
                {
                    name: 'give 1/2 gas to ovmCALL => ovmCREATE, evmINVALID',
                    steps: [
                        {
                            functionName: 'ovmCALL',
                            functionParams: {
                                target: '$DUMMY_OVM_ADDRESS_1',
                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                subSteps: [
                                    {
                                        functionName: 'ovmCREATE',
                                        functionParams: {
                                            subSteps: [
                                                {
                                                    functionName: 'evmINVALID',
                                                },
                                            ],
                                        },
                                        expectedReturnStatus: true,
                                        expectedReturnValue: ethers_1.constants.AddressZero,
                                    },
                                ],
                            },
                            expectedReturnStatus: true,
                        },
                    ],
                },
            ],
        },
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_nuisanceGas);
//# sourceMappingURL=nuisance-gas.spec.js.map