"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const helpers_1 = require("../../../../helpers");
const GAS_METADATA_ADDRESS = '0x06a506a506a506a506a506a506a506a506a506a5';
var GasMetadataKey;
(function (GasMetadataKey) {
    GasMetadataKey[GasMetadataKey["CURRENT_EPOCH_START_TIMESTAMP"] = 0] = "CURRENT_EPOCH_START_TIMESTAMP";
    GasMetadataKey[GasMetadataKey["CUMULATIVE_SEQUENCER_QUEUE_GAS"] = 1] = "CUMULATIVE_SEQUENCER_QUEUE_GAS";
    GasMetadataKey[GasMetadataKey["CUMULATIVE_L1TOL2_QUEUE_GAS"] = 2] = "CUMULATIVE_L1TOL2_QUEUE_GAS";
    GasMetadataKey[GasMetadataKey["PREV_EPOCH_SEQUENCER_QUEUE_GAS"] = 3] = "PREV_EPOCH_SEQUENCER_QUEUE_GAS";
    GasMetadataKey[GasMetadataKey["PREV_EPOCH_L1TOL2_QUEUE_GAS"] = 4] = "PREV_EPOCH_L1TOL2_QUEUE_GAS";
})(GasMetadataKey || (GasMetadataKey = {}));
const keyToBytes32 = (key) => {
    return '0x' + `0${key}`.padStart(64, '0');
};
const test_run = {
    name: 'Basic tests for ovmCALL',
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
            },
            contractStorage: {
                [GAS_METADATA_ADDRESS]: {
                    [keyToBytes32(GasMetadataKey.CURRENT_EPOCH_START_TIMESTAMP)]: 1,
                    [keyToBytes32(GasMetadataKey.CUMULATIVE_SEQUENCER_QUEUE_GAS)]: 0,
                    [keyToBytes32(GasMetadataKey.CUMULATIVE_L1TOL2_QUEUE_GAS)]: 0,
                    [keyToBytes32(GasMetadataKey.PREV_EPOCH_SEQUENCER_QUEUE_GAS)]: 0,
                    [keyToBytes32(GasMetadataKey.PREV_EPOCH_L1TOL2_QUEUE_GAS)]: 0,
                },
            },
            verifiedContractStorage: {
                [GAS_METADATA_ADDRESS]: {
                    [keyToBytes32(GasMetadataKey.CURRENT_EPOCH_START_TIMESTAMP)]: true,
                    [keyToBytes32(GasMetadataKey.CUMULATIVE_SEQUENCER_QUEUE_GAS)]: true,
                    [keyToBytes32(GasMetadataKey.CUMULATIVE_L1TOL2_QUEUE_GAS)]: true,
                    [keyToBytes32(GasMetadataKey.PREV_EPOCH_SEQUENCER_QUEUE_GAS)]: true,
                    [keyToBytes32(GasMetadataKey.PREV_EPOCH_L1TOL2_QUEUE_GAS)]: true,
                },
            },
        },
    },
    parameters: [
        {
            name: 'run => ovmCALL(ADDRESS_1) => ovmADDRESS',
            skip: true,
            steps: [
                {
                    functionName: 'run',
                    functionParams: {
                        timestamp: 0,
                        queueOrigin: 0,
                        entrypoint: '$OVM_CALL_HELPER',
                        origin: ethers_1.constants.AddressZero,
                        msgSender: ethers_1.constants.AddressZero,
                        gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                        subSteps: [
                            {
                                functionName: 'ovmCALL',
                                functionParams: {
                                    gasLimit: helpers_1.OVM_TX_GAS_LIMIT,
                                    target: '$DUMMY_OVM_ADDRESS_1',
                                    subSteps: [
                                        {
                                            functionName: 'ovmADDRESS',
                                            expectedReturnValue: '$DUMMY_OVM_ADDRESS_1',
                                        },
                                    ],
                                },
                                expectedReturnStatus: true,
                            },
                        ],
                    },
                },
            ],
        },
    ],
};
const runner = new helpers_1.ExecutionManagerTestRunner();
runner.run(test_run);
//# sourceMappingURL=run.spec.js.map