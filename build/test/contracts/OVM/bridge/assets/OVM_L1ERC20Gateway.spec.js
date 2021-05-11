"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../../helpers");
const INITIAL_TOTAL_L1_SUPPLY = 3000;
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
describe('OVM_L1ERC20Gateway', () => {
    let alice;
    let bob;
    let Mock__OVM_L2DepositedERC20;
    let Factory__L1ERC20;
    let L1ERC20;
    before(async () => {
        ;
        [alice, bob] = await hardhat_1.ethers.getSigners();
        Mock__OVM_L2DepositedERC20 = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20'));
        Factory__L1ERC20 = await smock_1.smoddit('UniswapV2ERC20');
        L1ERC20 = await Factory__L1ERC20.deploy('L1ERC20', 'ERC');
        const aliceAddress = await alice.getAddress();
        await L1ERC20.smodify.put({
            totalSupply: INITIAL_TOTAL_L1_SUPPLY,
            balanceOf: {
                [aliceAddress]: INITIAL_TOTAL_L1_SUPPLY,
            },
        });
    });
    let OVM_L1ERC20Gateway;
    let Mock__OVM_L1CrossDomainMessenger;
    let finalizeDepositGasLimit;
    beforeEach(async () => {
        let l1MessengerImpersonator;
        [l1MessengerImpersonator, alice, bob] = await hardhat_1.ethers.getSigners();
        Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'), { address: await l1MessengerImpersonator.getAddress() });
        OVM_L1ERC20Gateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ERC20Gateway')).deploy(L1ERC20.address, Mock__OVM_L2DepositedERC20.address, Mock__OVM_L1CrossDomainMessenger.address);
        finalizeDepositGasLimit = await OVM_L1ERC20Gateway.getFinalizeDepositL2Gas();
    });
    describe('finalizeWithdrawal', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            OVM_L1ERC20Gateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ERC20Gateway')).deploy(L1ERC20.address, Mock__OVM_L2DepositedERC20.address, helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L1ERC20Gateway.finalizeWithdrawal(ethers_1.constants.AddressZero, 1)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2ERC20Gateway)', async () => {
            Mock__OVM_L1CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(() => helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L1ERC20Gateway.finalizeWithdrawal(ethers_1.constants.AddressZero, 1, {
                from: Mock__OVM_L1CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should credit funds to the withdrawer and not use too much gas', async () => {
            await setup_1.expect(await L1ERC20.balanceOf(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(0);
            const withdrawalAmount = 100;
            Mock__OVM_L1CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(() => Mock__OVM_L2DepositedERC20.address);
            await L1ERC20.transfer(OVM_L1ERC20Gateway.address, withdrawalAmount);
            const res = await OVM_L1ERC20Gateway.finalizeWithdrawal(helpers_1.NON_ZERO_ADDRESS, withdrawalAmount, { from: Mock__OVM_L1CrossDomainMessenger.address });
            await setup_1.expect(await L1ERC20.balanceOf(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(withdrawalAmount);
            const gasUsed = (await OVM_L1ERC20Gateway.provider.getTransactionReceipt(res.hash)).gasUsed;
            const OVM_L2DepositedERC20 = await (await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20')).deploy(ethers_1.constants.AddressZero, '', '');
            const defaultFinalizeWithdrawalGas = await OVM_L2DepositedERC20.getFinalizeWithdrawalL1Gas();
            await setup_1.expect(gasUsed.gt((defaultFinalizeWithdrawalGas * 11) / 10));
        });
        it.skip('finalizeWithdrawalAndCall(): should should credit funds to the withdrawer, and forward from and data', async () => {
            setup_1.expect.fail();
        });
    });
    describe('deposits', () => {
        const INITIAL_DEPOSITER_BALANCE = 100000;
        let depositer;
        const depositAmount = 1000;
        beforeEach(async () => {
            L1ERC20 = await Factory__L1ERC20.deploy('L1ERC20', 'ERC');
            Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'));
            OVM_L1ERC20Gateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ERC20Gateway')).deploy(L1ERC20.address, Mock__OVM_L2DepositedERC20.address, Mock__OVM_L1CrossDomainMessenger.address);
            await L1ERC20.approve(OVM_L1ERC20Gateway.address, depositAmount);
            depositer = await L1ERC20.signer.getAddress();
            await L1ERC20.smodify.put({
                balanceOf: {
                    [depositer]: INITIAL_DEPOSITER_BALANCE,
                },
            });
        });
        it('deposit() escrows the deposit amount and sends the correct deposit message', async () => {
            await OVM_L1ERC20Gateway.deposit(depositAmount);
            const depositCallToMessenger = Mock__OVM_L1CrossDomainMessenger.smocked.sendMessage.calls[0];
            const depositerBalance = await L1ERC20.balanceOf(depositer);
            setup_1.expect(depositerBalance).to.equal(INITIAL_DEPOSITER_BALANCE - depositAmount);
            const gatewayBalance = await L1ERC20.balanceOf(OVM_L1ERC20Gateway.address);
            setup_1.expect(gatewayBalance).to.equal(depositAmount);
            setup_1.expect(depositCallToMessenger._target).to.equal(Mock__OVM_L2DepositedERC20.address);
            setup_1.expect(depositCallToMessenger._message).to.equal(await Mock__OVM_L2DepositedERC20.interface.encodeFunctionData('finalizeDeposit', [depositer, depositAmount]));
            setup_1.expect(depositCallToMessenger._gasLimit).to.equal(finalizeDepositGasLimit);
        });
        it('depositTo() escrows the deposit amount and sends the correct deposit message', async () => {
            const bobsAddress = await bob.getAddress();
            await OVM_L1ERC20Gateway.depositTo(bobsAddress, depositAmount);
            const depositCallToMessenger = Mock__OVM_L1CrossDomainMessenger.smocked.sendMessage.calls[0];
            const depositerBalance = await L1ERC20.balanceOf(depositer);
            setup_1.expect(depositerBalance).to.equal(INITIAL_DEPOSITER_BALANCE - depositAmount);
            const gatewayBalance = await L1ERC20.balanceOf(OVM_L1ERC20Gateway.address);
            setup_1.expect(gatewayBalance).to.equal(depositAmount);
            setup_1.expect(depositCallToMessenger._target).to.equal(Mock__OVM_L2DepositedERC20.address);
            setup_1.expect(depositCallToMessenger._message).to.equal(await Mock__OVM_L2DepositedERC20.interface.encodeFunctionData('finalizeDeposit', [bobsAddress, depositAmount]));
            setup_1.expect(depositCallToMessenger._gasLimit).to.equal(finalizeDepositGasLimit);
        });
    });
});
//# sourceMappingURL=OVM_L1ERC20Gateway.spec.js.map