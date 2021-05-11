"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../../helpers");
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
const MOCK_L1GATEWAY_ADDRESS = '0x1234123412341234123412341234123412341234';
describe('OVM_L2DepositedERC20', () => {
    let alice;
    let bob;
    let Factory__OVM_L1ERC20Gateway;
    before(async () => {
        ;
        [alice, bob] = await hardhat_1.ethers.getSigners();
        Factory__OVM_L1ERC20Gateway = await hardhat_1.ethers.getContractFactory('OVM_L1ERC20Gateway');
    });
    let OVM_L2DepositedERC20;
    let Mock__OVM_L2CrossDomainMessenger;
    let finalizeWithdrawalGasLimit;
    beforeEach(async () => {
        let l2MessengerImpersonator;
        [l2MessengerImpersonator] = await hardhat_1.ethers.getSigners();
        Mock__OVM_L2CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L2CrossDomainMessenger'), { address: await l2MessengerImpersonator.getAddress() });
        OVM_L2DepositedERC20 = await (await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20')).deploy(Mock__OVM_L2CrossDomainMessenger.address, 'ovmWETH', 'oWETH');
        await OVM_L2DepositedERC20.init(MOCK_L1GATEWAY_ADDRESS);
        finalizeWithdrawalGasLimit = await OVM_L2DepositedERC20.getFinalizeWithdrawalL1Gas();
    });
    describe('finalizeDeposit', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L2 account', async () => {
            OVM_L2DepositedERC20 = await (await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20')).deploy(helpers_1.NON_ZERO_ADDRESS, 'ovmWETH', 'oWETH');
            await OVM_L2DepositedERC20.init(helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L2DepositedERC20.finalizeDeposit(ethers_1.constants.AddressZero, 0)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L1ERC20Gateway)', async () => {
            Mock__OVM_L2CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L2DepositedERC20.finalizeDeposit(ethers_1.constants.AddressZero, 0, {
                from: Mock__OVM_L2CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should credit funds to the depositor', async () => {
            const depositAmount = 100;
            Mock__OVM_L2CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(() => MOCK_L1GATEWAY_ADDRESS);
            await OVM_L2DepositedERC20.finalizeDeposit(await alice.getAddress(), depositAmount, { from: Mock__OVM_L2CrossDomainMessenger.address });
            const aliceBalance = await OVM_L2DepositedERC20.balanceOf(await alice.getAddress());
            aliceBalance.should.equal(depositAmount);
        });
    });
    describe('withdrawals', () => {
        const INITIAL_TOTAL_SUPPLY = 100000;
        const ALICE_INITIAL_BALANCE = 50000;
        const withdrawAmount = 1000;
        let SmoddedL2Gateway;
        beforeEach(async () => {
            SmoddedL2Gateway = await (await smock_1.smoddit('OVM_L2DepositedERC20', alice)).deploy(Mock__OVM_L2CrossDomainMessenger.address, 'ovmWETH', 'oWETH');
            await SmoddedL2Gateway.init(MOCK_L1GATEWAY_ADDRESS);
            const aliceAddress = await alice.getAddress();
            SmoddedL2Gateway.smodify.put({
                totalSupply: INITIAL_TOTAL_SUPPLY,
                balanceOf: {
                    [aliceAddress]: ALICE_INITIAL_BALANCE,
                },
            });
        });
        it('withdraw() burns and sends the correct withdrawal message', async () => {
            await SmoddedL2Gateway.withdraw(withdrawAmount);
            const withdrawalCallToMessenger = Mock__OVM_L2CrossDomainMessenger.smocked.sendMessage.calls[0];
            const aliceBalance = await SmoddedL2Gateway.balanceOf(await alice.getAddress());
            setup_1.expect(aliceBalance).to.deep.equal(hardhat_1.ethers.BigNumber.from(ALICE_INITIAL_BALANCE - withdrawAmount));
            const newTotalSupply = await SmoddedL2Gateway.totalSupply();
            setup_1.expect(newTotalSupply).to.deep.equal(hardhat_1.ethers.BigNumber.from(INITIAL_TOTAL_SUPPLY - withdrawAmount));
            setup_1.expect(withdrawalCallToMessenger._target).to.equal(MOCK_L1GATEWAY_ADDRESS);
            setup_1.expect(withdrawalCallToMessenger._message).to.equal(await Factory__OVM_L1ERC20Gateway.interface.encodeFunctionData('finalizeWithdrawal', [await alice.getAddress(), withdrawAmount]));
            setup_1.expect(withdrawalCallToMessenger._gasLimit).to.equal(finalizeWithdrawalGasLimit);
        });
        it('withdrawTo() burns and sends the correct withdrawal message', async () => {
            await SmoddedL2Gateway.withdrawTo(await bob.getAddress(), withdrawAmount);
            const withdrawalCallToMessenger = Mock__OVM_L2CrossDomainMessenger.smocked.sendMessage.calls[0];
            const aliceBalance = await SmoddedL2Gateway.balanceOf(await alice.getAddress());
            setup_1.expect(aliceBalance).to.deep.equal(hardhat_1.ethers.BigNumber.from(ALICE_INITIAL_BALANCE - withdrawAmount));
            const newTotalSupply = await SmoddedL2Gateway.totalSupply();
            setup_1.expect(newTotalSupply).to.deep.equal(hardhat_1.ethers.BigNumber.from(INITIAL_TOTAL_SUPPLY - withdrawAmount));
            setup_1.expect(withdrawalCallToMessenger._target).to.equal(MOCK_L1GATEWAY_ADDRESS);
            setup_1.expect(withdrawalCallToMessenger._message).to.equal(await Factory__OVM_L1ERC20Gateway.interface.encodeFunctionData('finalizeWithdrawal', [await bob.getAddress(), withdrawAmount]));
            setup_1.expect(withdrawalCallToMessenger._gasLimit).to.equal(finalizeWithdrawalGasLimit);
        });
    });
    describe.skip('Initialization logic', () => {
        it('should not allow calls to onlyInitialized functions', async () => {
        });
        it('should only allow initialization once and emits initialized event', async () => {
        });
    });
});
//# sourceMappingURL=OVM_L2DepositedERC20.spec.js.map