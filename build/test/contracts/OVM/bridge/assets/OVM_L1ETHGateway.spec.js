"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../../setup");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@eth-optimism/smock");
const helpers_1 = require("../../../../helpers");
const L1_ETH_GATEWAY_NAME = 'Proxy__OVM_L1CrossDomainMessenger';
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
const ERR_ALREADY_INITIALIZED = 'Contract has already been initialized.';
describe('OVM_L1ETHGateway', () => {
    let l1MessengerImpersonator;
    let alice;
    let bob;
    let AddressManager;
    before(async () => {
        AddressManager = await helpers_1.makeAddressManager();
    });
    let Mock__OVM_L2DepositedERC20;
    before(async () => {
        ;
        [l1MessengerImpersonator, alice, bob] = await hardhat_1.ethers.getSigners();
        Mock__OVM_L2DepositedERC20 = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20'));
    });
    let OVM_L1ETHGateway;
    let Mock__OVM_L1CrossDomainMessenger;
    let finalizeDepositGasLimit;
    beforeEach(async () => {
        Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'), { address: await l1MessengerImpersonator.getAddress() });
        OVM_L1ETHGateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ETHGateway')).deploy();
        await OVM_L1ETHGateway.initialize(AddressManager.address, Mock__OVM_L2DepositedERC20.address);
        finalizeDepositGasLimit = await OVM_L1ETHGateway.getFinalizeDepositL2Gas();
    });
    describe('initialize', () => {
        it('Should only be callable once', async () => {
            await setup_1.expect(OVM_L1ETHGateway.initialize(hardhat_1.ethers.constants.AddressZero, hardhat_1.ethers.constants.AddressZero)).to.be.revertedWith(ERR_ALREADY_INITIALIZED);
        });
    });
    describe('finalizeWithdrawal', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            await setup_1.expect(OVM_L1ETHGateway.connect(alice).finalizeWithdrawal(ethers_1.constants.AddressZero, 1)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2ETHGateway)', async () => {
            await AddressManager.setAddress(L1_ETH_GATEWAY_NAME, Mock__OVM_L1CrossDomainMessenger.address);
            OVM_L1ETHGateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ETHGateway')).deploy();
            await OVM_L1ETHGateway.initialize(AddressManager.address, Mock__OVM_L2DepositedERC20.address);
            Mock__OVM_L1CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(helpers_1.NON_ZERO_ADDRESS);
            await setup_1.expect(OVM_L1ETHGateway.finalizeWithdrawal(ethers_1.constants.AddressZero, 1)).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should credit funds to the withdrawer and not use too much gas', async () => {
            await setup_1.expect(await hardhat_1.ethers.provider.getBalance(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(0);
            const withdrawalAmount = 100;
            Mock__OVM_L1CrossDomainMessenger.smocked.xDomainMessageSender.will.return.with(() => Mock__OVM_L2DepositedERC20.address);
            await OVM_L1ETHGateway.connect(alice).deposit({
                value: hardhat_1.ethers.utils.parseEther('1.0'),
                gasPrice: 0,
            });
            const res = await OVM_L1ETHGateway.finalizeWithdrawal(helpers_1.NON_ZERO_ADDRESS, withdrawalAmount, { from: Mock__OVM_L1CrossDomainMessenger.address });
            await setup_1.expect(await hardhat_1.ethers.provider.getBalance(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(withdrawalAmount);
            const gasUsed = (await OVM_L1ETHGateway.provider.getTransactionReceipt(res.hash)).gasUsed;
            const OVM_L2DepositedERC20 = await (await hardhat_1.ethers.getContractFactory('OVM_L2DepositedERC20')).deploy(ethers_1.constants.AddressZero, '', '');
            await setup_1.expect(gasUsed.gt(((await OVM_L2DepositedERC20.getFinalizeWithdrawalL1Gas()) * 11) / 10));
        });
        it.skip('finalizeWithdrawalAndCall(): should should credit funds to the withdrawer, and forward from and data', async () => {
            setup_1.expect.fail();
        });
    });
    describe('deposits', () => {
        const depositAmount = 1000;
        beforeEach(async () => {
            Mock__OVM_L1CrossDomainMessenger = await smock_1.smockit(await hardhat_1.ethers.getContractFactory('OVM_L1CrossDomainMessenger'));
            await AddressManager.setAddress(L1_ETH_GATEWAY_NAME, Mock__OVM_L1CrossDomainMessenger.address);
            OVM_L1ETHGateway = await (await hardhat_1.ethers.getContractFactory('OVM_L1ETHGateway')).deploy();
            await OVM_L1ETHGateway.initialize(AddressManager.address, Mock__OVM_L2DepositedERC20.address);
        });
        it('deposit() escrows the deposit amount and sends the correct deposit message', async () => {
            const depositer = await alice.getAddress();
            const initialBalance = await hardhat_1.ethers.provider.getBalance(depositer);
            await OVM_L1ETHGateway.connect(alice).deposit({
                value: depositAmount,
                gasPrice: 0,
            });
            const depositCallToMessenger = Mock__OVM_L1CrossDomainMessenger.smocked.sendMessage.calls[0];
            const depositerBalance = await hardhat_1.ethers.provider.getBalance(depositer);
            setup_1.expect(depositerBalance).to.equal(initialBalance.sub(depositAmount));
            const gatewayBalance = await hardhat_1.ethers.provider.getBalance(OVM_L1ETHGateway.address);
            setup_1.expect(gatewayBalance).to.equal(depositAmount);
            setup_1.expect(depositCallToMessenger._target).to.equal(Mock__OVM_L2DepositedERC20.address);
            setup_1.expect(depositCallToMessenger._message).to.equal(await Mock__OVM_L2DepositedERC20.interface.encodeFunctionData('finalizeDeposit', [depositer, depositAmount]));
            setup_1.expect(depositCallToMessenger._gasLimit).to.equal(finalizeDepositGasLimit);
        });
        it('depositTo() escrows the deposit amount and sends the correct deposit message', async () => {
            const bobsAddress = await bob.getAddress();
            const aliceAddress = await alice.getAddress();
            const initialBalance = await hardhat_1.ethers.provider.getBalance(aliceAddress);
            await OVM_L1ETHGateway.connect(alice).depositTo(bobsAddress, {
                value: depositAmount,
                gasPrice: 0,
            });
            const depositCallToMessenger = Mock__OVM_L1CrossDomainMessenger.smocked.sendMessage.calls[0];
            const depositerBalance = await hardhat_1.ethers.provider.getBalance(aliceAddress);
            setup_1.expect(depositerBalance).to.equal(initialBalance.sub(depositAmount));
            const gatewayBalance = await hardhat_1.ethers.provider.getBalance(OVM_L1ETHGateway.address);
            setup_1.expect(gatewayBalance).to.equal(depositAmount);
            setup_1.expect(depositCallToMessenger._target).to.equal(Mock__OVM_L2DepositedERC20.address);
            setup_1.expect(depositCallToMessenger._message).to.equal(await Mock__OVM_L2DepositedERC20.interface.encodeFunctionData('finalizeDeposit', [bobsAddress, depositAmount]));
            setup_1.expect(depositCallToMessenger._gasLimit).to.equal(finalizeDepositGasLimit);
        });
    });
});
//# sourceMappingURL=OVM_L1ETHGateway.spec.js.map