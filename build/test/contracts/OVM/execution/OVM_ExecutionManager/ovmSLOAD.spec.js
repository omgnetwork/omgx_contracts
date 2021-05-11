"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../../../../helpers");
const test_ovmSLOAD = {
    name: 'Basic tests for ovmSLOAD',
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
            },
            contractStorage: {
                $DUMMY_OVM_ADDRESS_1: {
                    [helpers_1.NON_NULL_BYTES32]: helpers_1.getStorageXOR(ethers_1.ethers.constants.HashZero),
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
            name: 'ovmCALL => ovmSLOAD',
            steps: [
                {
                    functionName: 'ovmCALL',
                    functionParams: {
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
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
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_ovmSLOAD);
//# sourceMappingURL=ovmSLOAD.spec.js.map