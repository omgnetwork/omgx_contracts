"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../../../../helpers");
const test_ovmSTATICCALL = {
    name: 'Basic tests for ovmSTATICCALL',
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
                    codeHash: helpers_1.NON_NULL_BYTES32,
                    ethAddress: '$OVM_CALL_HELPER',
                },
            },
            contractStorage: {
                $DUMMY_OVM_ADDRESS_1: {
                    [helpers_1.NON_NULL_BYTES32]: helpers_1.getStorageXOR(ethers_1.ethers.constants.HashZero),
                },
                $DUMMY_OVM_ADDRESS_3: {
                    [helpers_1.NON_NULL_BYTES32]: helpers_1.getStorageXOR(ethers_1.ethers.constants.HashZero),
                },
            },
            verifiedContractStorage: {
                $DUMMY_OVM_ADDRESS_1: {
                    [helpers_1.NON_NULL_BYTES32]: true,
                },
                $DUMMY_OVM_ADDRESS_3: {
                    [helpers_1.NON_NULL_BYTES32]: true,
                },
            },
        },
    },
    parameters: [
        {
            name: 'ovmSTATICCALL => ovmSSTORE',
            steps: [
                {
                    functionName: 'ovmSTATICCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSSTORE',
                                functionParams: {
                                    key: ethers_1.ethers.constants.HashZero,
                                    value: ethers_1.ethers.constants.HashZero,
                                },
                                expectedReturnStatus: false,
                                expectedReturnValue: {
                                    flag: helpers_1.REVERT_FLAGS.STATIC_VIOLATION,
                                    nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                },
                            },
                        ],
                    },
                    expectedReturnStatus: false,
                },
            ],
        },
        {
            name: 'ovmSTATICCALL => ovmSLOAD',
            steps: [
                {
                    functionName: 'ovmSTATICCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSLOAD',
                                functionParams: {
                                    key: helpers_1.NON_NULL_BYTES32,
                                },
                                expectedReturnStatus: true,
                                expectedReturnValue: ethers_1.ethers.constants.HashZero,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmSTATICCALL => ovmCREATE',
            steps: [
                {
                    functionName: 'ovmSTATICCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmCREATE',
                                functionParams: {
                                    bytecode: helpers_1.DUMMY_BYTECODE,
                                },
                                expectedReturnStatus: false,
                                expectedReturnValue: {
                                    flag: helpers_1.REVERT_FLAGS.STATIC_VIOLATION,
                                    nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                },
                            },
                        ],
                    },
                    expectedReturnStatus: false,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSTATICCALL(ADDRESS_2) => ovmCALLER',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSTATICCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmCALLER',
                                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_1',
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSTATICCALL(ADDRESS_2) => ovmADDRESS',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSTATICCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmADDRESS',
                                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_2',
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSTATICCALL(ADDRESS_2) => ovmCALL(ADDRESS_3) => ovmSSTORE',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSTATICCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmCALL',
                                            functionParams: {
                                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                                target: '$DUMMY_OVM_ADDRESS_3',
                                                subSteps: [
                                                    {
                                                        functionName: 'ovmSSTORE',
                                                        functionParams: {
                                                            key: ethers_1.ethers.constants.HashZero,
                                                            value: ethers_1.ethers.constants.HashZero,
                                                        },
                                                        expectedReturnStatus: false,
                                                        expectedReturnValue: {
                                                            flag: helpers_1.REVERT_FLAGS.STATIC_VIOLATION,
                                                            nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                                        },
                                                    },
                                                ],
                                            },
                                            expectedReturnStatus: false,
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSTATICCALL(ADDRESS_2) => ovmCALL(ADDRESS_3) => ovmSLOAD',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSTATICCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmCALL',
                                            functionParams: {
                                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                                target: '$DUMMY_OVM_ADDRESS_3',
                                                subSteps: [
                                                    {
                                                        functionName: 'ovmSLOAD',
                                                        functionParams: {
                                                            key: helpers_1.NON_NULL_BYTES32,
                                                        },
                                                        expectedReturnStatus: true,
                                                        expectedReturnValue: ethers_1.ethers.constants.HashZero,
                                                    },
                                                ],
                                            },
                                            expectedReturnStatus: true,
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmSTATICCALL(ADDRESS_2) => ovmCALL(ADDRESS_3) => ovmCREATE',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmSTATICCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                    target: '$DUMMY_OVM_ADDRESS_2',
                                    subSteps: [
                                        {
                                            functionName: 'ovmCALL',
                                            functionParams: {
                                                gasLimit: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                                target: '$DUMMY_OVM_ADDRESS_3',
                                                subSteps: [
                                                    {
                                                        functionName: 'ovmCREATE',
                                                        functionParams: {
                                                            bytecode: helpers_1.DUMMY_BYTECODE,
                                                        },
                                                        expectedReturnStatus: false,
                                                        expectedReturnValue: {
                                                            flag: helpers_1.REVERT_FLAGS.STATIC_VIOLATION,
                                                            nuisanceGasLeft: helpers_1.OVM_TX_GAS_LIMIT / 2,
                                                        },
                                                    },
                                                ],
                                            },
                                            expectedReturnStatus: false,
                                        },
                                    ],
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
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_ovmSTATICCALL);
//# sourceMappingURL=ovmSTATICCALL.spec.js.map