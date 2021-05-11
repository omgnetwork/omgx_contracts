"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../../helpers");
const src_1 = require("../../../../../src");
const test_ovmCREATEEOA = {
    name: 'Basic tests for CREATEEOA',
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
                '0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff': {
                    codeHash: helpers_1.VERIFIED_EMPTY_CONTRACT_HASH,
                    ethAddress: '0x' + '00'.repeat(20),
                },
            },
            verifiedContractStorage: {
                $DUMMY_OVM_ADDRESS_1: {
                    [helpers_1.NON_NULL_BYTES32]: true,
                },
            },
        },
    },
    parameters: [
        {
            name: 'ovmCREATEEOA, ovmEXTCODESIZE(CREATED)',
            steps: [
                {
                    functionName: 'ovmCREATEEOA',
                    functionParams: {
                        _messageHash: '0x92d658d25f963af824e9d4bd533c165773d4a694a67d88135d119d5bca97c001',
                        _v: 1,
                        _r: '0x73757c671fae2c3fb6825766c724b7715720bda4b309d3612f2c623364556967',
                        _s: '0x2fc9b7222783390b9f10e22e92a52871beaff2613193d6e2dbf18d0e2d2eb8ff',
                    },
                    expectedReturnStatus: true,
                    expectedReturnValue: undefined,
                },
                {
                    functionName: 'ovmGETNONCE',
                    expectedReturnValue: 0,
                },
                {
                    functionName: 'ovmEXTCODESIZE',
                    functionParams: {
                        address: '0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff',
                    },
                    expectedReturnStatus: true,
                    expectedReturnValue: core_utils_1.fromHexString(src_1.getContractDefinition('OVM_ProxyEOA', true).deployedBytecode).length,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmGETNONCE',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmGETNONCE',
                                expectedReturnValue: 0,
                            },
                        ],
                    },
                    expectedReturnStatus: true,
                },
            ],
        },
        {
            name: 'ovmCALL(ADDRESS_1) => ovmINCREMENTNONCEx3 => ovmGETNONCE',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        target: '$DUMMY_OVM_ADDRESS_1',
                        subSteps: [
                            {
                                functionName: 'ovmINCREMENTNONCE',
                                expectedReturnStatus: true,
                            },
                            {
                                functionName: 'ovmINCREMENTNONCE',
                                expectedReturnStatus: true,
                            },
                            {
                                functionName: 'ovmINCREMENTNONCE',
                                expectedReturnStatus: true,
                            },
                            {
                                functionName: 'ovmGETNONCE',
                                expectedReturnValue: 3,
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
runner.run(test_ovmCREATEEOA);
//# sourceMappingURL=ovmCREATEEOA.spec.js.map