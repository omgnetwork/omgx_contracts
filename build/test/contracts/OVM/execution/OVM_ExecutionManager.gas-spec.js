"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const utils_1 = require("../../../helpers/utils");
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../helpers");
const DUMMY_GASMETERCONFIG = {
    minTransactionGasLimit: 0,
    maxTransactionGasLimit: helpers_1.NON_NULL_BYTES32,
    maxGasPerQueuePerEpoch: helpers_1.NON_NULL_BYTES32,
    secondsPerEpoch: helpers_1.NON_NULL_BYTES32,
};
const DUMMY_GLOBALCONTEXT = {
    ovmCHAINID: 420,
};
const QUEUE_ORIGIN = {
    SEQUENCER_QUEUE: 0,
    L1TOL2_QUEUE: 1,
};
const DUMMY_TRANSACTION = {
    timestamp: 111111111111,
    blockNumber: 20,
    l1QueueOrigin: QUEUE_ORIGIN.SEQUENCER_QUEUE,
    l1TxOrigin: helpers_1.NON_ZERO_ADDRESS,
    entrypoint: helpers_1.NON_ZERO_ADDRESS,
    gasLimit: 10000000,
    data: 0,
};
describe('OVM_ExecutionManager gas consumption', () => {
    let wallet;
    before(async () => {
        ;
        [wallet] = await hardhat_1.ethers.getSigners();
    });
    let Factory__OVM_ExecutionManager;
    let MOCK__STATE_MANAGER;
    let AddressManager;
    let targetContractAddress;
    let gasMeasurement;
    before(async () => {
        Factory__OVM_ExecutionManager = await hardhat_1.ethers.getContractFactory('OVM_ExecutionManager');
        targetContractAddress = await utils_1.deployContractCode('60206001f3', wallet, 10000000);
        DUMMY_TRANSACTION.entrypoint = targetContractAddress;
        AddressManager = await helpers_1.makeAddressManager();
        MOCK__STATE_MANAGER = await smock_1.smockit(await (await hardhat_1.ethers.getContractFactory('OVM_StateManager')).deploy(helpers_1.NON_ZERO_ADDRESS));
        MOCK__STATE_MANAGER.smocked.isAuthenticated.will.return.with(true);
        MOCK__STATE_MANAGER.smocked.getAccountEthAddress.will.return.with(targetContractAddress);
        MOCK__STATE_MANAGER.smocked.hasAccount.will.return.with(true);
        MOCK__STATE_MANAGER.smocked.testAndSetAccountLoaded.will.return.with(true);
        await AddressManager.setAddress('OVM_StateManagerFactory', MOCK__STATE_MANAGER.address);
        gasMeasurement = new helpers_1.GasMeasurement();
        await gasMeasurement.init(wallet);
    });
    let OVM_ExecutionManager;
    beforeEach(async () => {
        OVM_ExecutionManager = (await Factory__OVM_ExecutionManager.deploy(AddressManager.address, DUMMY_GASMETERCONFIG, DUMMY_GLOBALCONTEXT)).connect(wallet);
    });
    describe('Measure cost of a very simple contract  [ @skip-on-coverage ]', async () => {
        it('Gas cost of run', async () => {
            const gasCost = await gasMeasurement.getGasCost(OVM_ExecutionManager, 'run', [DUMMY_TRANSACTION, MOCK__STATE_MANAGER.address]);
            console.log(`calculated gas cost of ${gasCost}`);
            const benchmark = 105000;
            setup_1.expect(gasCost).to.be.lte(benchmark);
            setup_1.expect(gasCost).to.be.gte(benchmark - 1000, 'Gas cost has significantly decreased, consider updating the benchmark to reflect the change');
        });
    });
});
//# sourceMappingURL=OVM_ExecutionManager.gas-spec.js.map