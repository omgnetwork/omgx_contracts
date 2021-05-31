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
const ethers_1 = require("ethers");
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const DEFAULT_L1_BLOCK_TIME_SECONDS = 15;
const DEFAULT_CTC_FORCE_INCLUSION_PERIOD_SECONDS = 60 * 60 * 24 * 30;
const DEFAULT_CTC_MAX_TRANSACTION_GAS_LIMIT = 9000000;
const DEFAULT_EM_MIN_TRANSACTION_GAS_LIMIT = 50000;
const DEFAULT_EM_MAX_TRANSACTION_GAS_LIMIT = 9000000;
const DEFAULT_EM_MAX_GAS_PER_QUEUE_PER_EPOCH = 250000000;
const DEFAULT_EM_SECONDS_PER_EPOCH = 0;
const DEFAULT_EM_OVM_CHAIN_ID = 28;
const DEFAULT_SCC_FRAUD_PROOF_WINDOW = 60 * 60 * 24 * 7;
const DEFAULT_SCC_SEQUENCER_PUBLISH_WINDOW = 60 * 30;
config_1.task('deploy')
    .addOptionalParam('l1BlockTimeSeconds', 'Number of seconds on average between every L1 block.', DEFAULT_L1_BLOCK_TIME_SECONDS, types.int)
    .addOptionalParam('ctcForceInclusionPeriodSeconds', 'Number of seconds that the sequencer has to include transactions before the L1 queue.', DEFAULT_CTC_FORCE_INCLUSION_PERIOD_SECONDS, types.int)
    .addOptionalParam('ctcMaxTransactionGasLimit', 'Max gas limit for L1 queue transactions.', DEFAULT_CTC_MAX_TRANSACTION_GAS_LIMIT, types.int)
    .addOptionalParam('emMinTransactionGasLimit', 'Minimum allowed transaction gas limit.', DEFAULT_EM_MIN_TRANSACTION_GAS_LIMIT, types.int)
    .addOptionalParam('emMaxTransactionGasLimit', 'Maximum allowed transaction gas limit.', DEFAULT_EM_MAX_TRANSACTION_GAS_LIMIT, types.int)
    .addOptionalParam('emMaxGasPerQueuePerEpoch', 'Maximum gas allowed in a given queue for each epoch.', DEFAULT_EM_MAX_GAS_PER_QUEUE_PER_EPOCH, types.int)
    .addOptionalParam('emSecondsPerEpoch', 'Number of seconds in each epoch.', DEFAULT_EM_SECONDS_PER_EPOCH, types.int)
    .addOptionalParam('emOvmChainId', 'Chain ID for the L2 network.', DEFAULT_EM_OVM_CHAIN_ID, types.int)
    .addOptionalParam('sccFraudProofWindow', 'Number of seconds until a transaction is considered finalized.', DEFAULT_SCC_FRAUD_PROOF_WINDOW, types.int)
    .addOptionalParam('sccSequencerPublishWindow', 'Number of seconds that the sequencer is exclusively allowed to post state roots.', DEFAULT_SCC_SEQUENCER_PUBLISH_WINDOW, types.int)
    .addOptionalParam('ovmSequencerAddress', 'Address of the sequencer. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('ovmProposerAddress', 'Address of the account that will propose state roots. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('ovmRelayerAddress', 'Address of the message relayer. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('ovmAddressManagerOwner', 'Address that will own the Lib_AddressManager. Must be provided or this deployment will fail.', undefined, types.string)
    .setAction(async (args, hre, runSuper) => {
    const validateAddressArg = (argName) => {
        if (args[argName] === undefined) {
            throw new Error(`argument for ${argName} is required but was not provided`);
        }
        if (!ethers_1.ethers.utils.isAddress(args[argName])) {
            throw new Error(`argument for ${argName} is not a valid address: ${args[argName]}`);
        }
    };
    validateAddressArg('ovmSequencerAddress');
    validateAddressArg('ovmProposerAddress');
    validateAddressArg('ovmRelayerAddress');
    validateAddressArg('ovmAddressManagerOwner');
    args.ctcForceInclusionPeriodBlocks = Math.floor(args.ctcForceInclusionPeriodSeconds / args.l1BlockTimeSeconds);
    hre.deployConfig = args;
    return runSuper(args);
});
//# sourceMappingURL=deploy.js.map