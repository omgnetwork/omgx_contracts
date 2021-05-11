"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../../../setup");
const hardhat_1 = require("hardhat");
const smock_1 = require("@eth-optimism/smock");
const ethers_1 = require("ethers");
const helpers_1 = require("../../../helpers");
describe('OVM_BondManager', () => {
    const provider = hardhat_1.waffle.provider;
    const wallets = provider.getWallets();
    let bondManager;
    let token;
    let manager;
    let fraudVerifier;
    const publisher = wallets[0].address;
    const stateTransitioner = wallets[3];
    const witnessProvider = wallets[4];
    const witnessProvider2 = wallets[5];
    const sender = wallets[0].address;
    const txHash = ethers_1.ethers.constants.HashZero;
    const ONE_WEEK = 3600 * 24 * 7;
    const preStateRoot = '0x1111111111111111111111111111111111111111111111111111111111111111';
    const amount = ethers_1.ethers.utils.parseEther('1');
    const half = amount.div(2);
    beforeEach(async () => {
        manager = await (await hardhat_1.ethers.getContractFactory('Lib_AddressManager')).deploy();
        const stateManagerFactory = await smock_1.smockit(await (await hardhat_1.ethers.getContractFactory('OVM_StateManagerFactory')).deploy());
        stateManagerFactory.smocked.create.will.return.with(ethers_1.ethers.constants.AddressZero);
        await manager.setAddress('OVM_StateManagerFactory', stateManagerFactory.address);
        fraudVerifier = await (await hardhat_1.ethers.getContractFactory('Mock_FraudVerifier')).deploy();
        await fraudVerifier.setStateTransitioner(preStateRoot, txHash, stateTransitioner.address);
        await manager.setAddress('OVM_FraudVerifier', fraudVerifier.address);
        token = await (await hardhat_1.ethers.getContractFactory('TestERC20')).deploy();
        await token.mint(sender, ethers_1.ethers.utils.parseEther('100'));
        bondManager = await (await smock_1.smoddit('OVM_BondManager')).deploy(token.address, manager.address);
        await manager.setAddress('OVM_BondManager', bondManager.address);
        await fraudVerifier.setBondManager(bondManager.address);
    });
    describe('collateral management', () => {
        let balanceBefore;
        beforeEach(async () => {
            await token.approve(bondManager.address, ethers_1.ethers.constants.MaxUint256);
            balanceBefore = await token.balanceOf(sender);
            await bondManager.deposit();
        });
        it('can deposit', async () => {
            const balanceAfter = await token.balanceOf(sender);
            setup_1.expect(balanceAfter).to.be.eq(balanceBefore.sub(amount));
            const bond = await bondManager.bonds(sender);
            setup_1.expect(bond.state).to.eq(State.COLLATERALIZED);
            setup_1.expect(bond.withdrawalTimestamp).to.eq(0);
        });
        it('isCollateralized is true after depositing', async () => {
            setup_1.expect(await bondManager.isCollateralized(sender)).to.be.true;
        });
        it('isCollateralized is false after starting a withdrawal', async () => {
            await bondManager.startWithdrawal();
            setup_1.expect(await bondManager.isCollateralized(sender)).to.be.false;
        });
        it('can start a withdrawal', async () => {
            await bondManager.startWithdrawal();
            const bond = await bondManager.bonds(sender);
            setup_1.expect(bond.state).to.eq(State.WITHDRAWING);
            setup_1.expect(bond.withdrawalTimestamp).to.not.eq(0);
        });
        it('can only withdraw after the dispute period', async () => {
            await bondManager.startWithdrawal();
            await setup_1.expect(bondManager.finalizeWithdrawal()).to.be.revertedWith(Errors.TOO_EARLY);
            const { withdrawalTimestamp } = await bondManager.bonds(sender);
            const timestamp = withdrawalTimestamp + ONE_WEEK;
            await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp);
            balanceBefore = await token.balanceOf(sender);
            await bondManager.finalizeWithdrawal();
            const bond = await bondManager.bonds(sender);
            setup_1.expect(bond.state).to.eq(State.NOT_COLLATERALIZED);
            setup_1.expect(bond.withdrawalTimestamp).to.eq(0);
            setup_1.expect(await token.balanceOf(sender)).to.eq(balanceBefore.add(amount));
        });
        it('is not collateralized after withdrawing', async () => {
            await bondManager.startWithdrawal();
            const { withdrawalTimestamp } = await bondManager.bonds(sender);
            const timestamp = withdrawalTimestamp + ONE_WEEK;
            await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp);
            await bondManager.finalizeWithdrawal();
            setup_1.expect(await bondManager.isCollateralized(sender)).to.be.false;
        });
    });
    describe('dispute resolution', () => {
        const user1Gas = [382100, 500000];
        const user2Gas = 100000;
        const totalUser1Gas = user1Gas[0] + user1Gas[1];
        const totalGas = totalUser1Gas + user2Gas;
        beforeEach(async () => {
            await bondManager
                .connect(stateTransitioner)
                .recordGasSpent(preStateRoot, txHash, witnessProvider.address, user1Gas[0]);
            await bondManager
                .connect(stateTransitioner)
                .recordGasSpent(preStateRoot, txHash, witnessProvider.address, user1Gas[1]);
            await bondManager
                .connect(stateTransitioner)
                .recordGasSpent(preStateRoot, txHash, witnessProvider2.address, user2Gas);
        });
        describe('post witnesses', () => {
            it('can post witnesses from the transitioner for a state root', async () => {
                const reward = await bondManager.witnessProviders(preStateRoot);
                setup_1.expect(reward.canClaim).to.be.false;
                setup_1.expect(reward.total).to.be.equal(totalGas);
                setup_1.expect(await bondManager.getGasSpent(preStateRoot, witnessProvider.address)).to.be.equal(totalUser1Gas);
                setup_1.expect(await bondManager.getGasSpent(preStateRoot, witnessProvider2.address)).to.be.equal(user2Gas);
            });
            it('cannot post witnesses from non-transitioners for that state root', async () => {
                await setup_1.expect(bondManager.recordGasSpent(preStateRoot, txHash, witnessProvider.address, 100)).to.be.revertedWith(Errors.ONLY_TRANSITIONER);
            });
        });
        it('cannot claim before canClaim is set', async () => {
            await setup_1.expect(bondManager.claim(publisher)).to.be.revertedWith(Errors.CANNOT_CLAIM);
        });
        describe('claims', () => {
            let timestamp;
            beforeEach(async () => {
                await token.approve(bondManager.address, ethers_1.ethers.constants.MaxUint256);
                await bondManager.deposit();
                const block = await provider.getBlock('latest');
                timestamp = block.timestamp;
                await bondManager.smodify.put({
                    witnessProviders: {
                        [preStateRoot]: {
                            canClaim: true,
                        },
                    },
                    bonds: {
                        [publisher]: {
                            earliestDisputedStateRoot: preStateRoot,
                            firstDisputeAt: timestamp,
                        },
                    },
                });
                const reward = await bondManager.witnessProviders(preStateRoot);
                setup_1.expect(reward.canClaim).to.be.true;
            });
            it('cannot claim before time for other disputes has passed', async () => {
                await setup_1.expect(bondManager.connect(witnessProvider).claim(publisher)).to.be.revertedWith(Errors.WAIT_FOR_DISPUTES);
            });
            it('rewards get paid out proportionally', async () => {
                await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp + ONE_WEEK);
                const balanceBefore1 = await token.balanceOf(witnessProvider.address);
                const balanceBefore2 = await token.balanceOf(witnessProvider2.address);
                await bondManager.connect(witnessProvider).claim(publisher);
                await bondManager.connect(witnessProvider2).claim(publisher);
                const balanceAfter1 = await token.balanceOf(witnessProvider.address);
                const balanceAfter2 = await token.balanceOf(witnessProvider2.address);
                setup_1.expect(balanceAfter1).to.be.eq(balanceBefore1.add(half.mul(totalUser1Gas).div(totalGas)));
                setup_1.expect(balanceAfter2).to.be.eq(balanceBefore2.add(half.mul(user2Gas).div(totalGas)));
            });
            it('cannot double claim', async () => {
                await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp + ONE_WEEK);
                const balance1 = await token.balanceOf(witnessProvider.address);
                await bondManager.connect(witnessProvider).claim(publisher);
                const balance2 = await token.balanceOf(witnessProvider.address);
                setup_1.expect(balance2).to.be.eq(balance1.add(half.mul(totalUser1Gas).div(totalGas)));
                await bondManager.connect(witnessProvider).claim(publisher);
                const balance3 = await token.balanceOf(witnessProvider.address);
                setup_1.expect(balance3).to.be.eq(balance2);
            });
        });
        describe('finalize', () => {
            beforeEach(async () => {
                await token.approve(bondManager.address, ethers_1.ethers.constants.MaxUint256);
                await bondManager.deposit();
            });
            it('only fraud verifier can finalize', async () => {
                await setup_1.expect(bondManager.finalize(preStateRoot, sender, 0)).to.be.revertedWith(Errors.ONLY_FRAUD_VERIFIER);
            });
            it('proving fraud allows claiming', async () => {
                await fraudVerifier.finalize(preStateRoot, sender, 0);
                setup_1.expect((await bondManager.witnessProviders(preStateRoot)).canClaim).to
                    .be.true;
                await setup_1.expect(fraudVerifier.finalize(preStateRoot, sender, 0)).to.be.revertedWith(Errors.ALREADY_FINALIZED);
            });
            it("proving fraud cancels pending withdrawals if the withdrawal was during the batch's proving window", async () => {
                await bondManager.startWithdrawal();
                const { withdrawalTimestamp } = await bondManager.bonds(sender);
                const timestamp = withdrawalTimestamp + ONE_WEEK;
                const disputeTimestamp = withdrawalTimestamp - 100;
                await fraudVerifier.finalize(preStateRoot, sender, disputeTimestamp);
                await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp);
                await setup_1.expect(bondManager.finalizeWithdrawal()).to.be.revertedWith(Errors.SLASHED);
            });
            it('proving fraud late does not cancel pending withdrawals', async () => {
                await bondManager.startWithdrawal();
                const { withdrawalTimestamp } = await bondManager.bonds(sender);
                const disputeTimestamp = withdrawalTimestamp - ONE_WEEK - 1;
                await fraudVerifier.finalize(preStateRoot, sender, disputeTimestamp);
                const finalizeWithdrawalTimestamp = withdrawalTimestamp + ONE_WEEK;
                await helpers_1.mineBlock(hardhat_1.ethers.provider, finalizeWithdrawalTimestamp);
                await bondManager.finalizeWithdrawal();
            });
            it('proving fraud prevents starting a withdrawal due to slashing', async () => {
                await fraudVerifier.finalize(preStateRoot, sender, 0);
                await setup_1.expect(bondManager.startWithdrawal()).to.be.revertedWith(Errors.WRONG_STATE);
            });
            describe('same publisher commits fraud multiple times', async () => {
                let timestamp;
                const root1 = '0x0000000000000000000000000000000000000000000000000000000000000000';
                const ts1 = 100;
                const root2 = '0x0000000000000000000000000000000000000000000000000000000000000001';
                const ts2 = 110;
                beforeEach(async () => {
                    await fraudVerifier.finalize(root2, sender, ts2);
                    const block = await provider.getBlock('latest');
                    timestamp = block.timestamp;
                });
                it('initial dispute data is stored', async () => {
                    const bond = await bondManager.bonds(sender);
                    setup_1.expect(bond.firstDisputeAt).to.be.equal(timestamp);
                    setup_1.expect(bond.earliestTimestamp).to.be.equal(ts2);
                    setup_1.expect(bond.earliestDisputedStateRoot).to.be.equal(root2);
                });
                it('earlier dispute replaces initial data', async () => {
                    await fraudVerifier.finalize(root1, sender, ts1);
                    const bond = await bondManager.bonds(sender);
                    setup_1.expect(bond.firstDisputeAt).to.be.equal(timestamp);
                    setup_1.expect(bond.earliestTimestamp).to.be.equal(ts1);
                    setup_1.expect(bond.earliestDisputedStateRoot).to.be.equal(root1);
                });
                it('earlier dispute does not replace initial data if not in time', async () => {
                    await helpers_1.mineBlock(hardhat_1.ethers.provider, timestamp + ONE_WEEK);
                    await fraudVerifier.finalize(root1, sender, ts1);
                    const bond = await bondManager.bonds(sender);
                    setup_1.expect(bond.firstDisputeAt).to.be.equal(timestamp);
                    setup_1.expect(bond.earliestTimestamp).to.be.equal(ts2);
                    setup_1.expect(bond.earliestDisputedStateRoot).to.be.equal(root2);
                });
                it('later dispute does not replace initial data', async () => {
                    await fraudVerifier.finalize(root1, sender, ts2 + 1);
                    const bond = await bondManager.bonds(sender);
                    setup_1.expect(bond.firstDisputeAt).to.be.equal(timestamp);
                    setup_1.expect(bond.earliestTimestamp).to.be.equal(ts2);
                    setup_1.expect(bond.earliestDisputedStateRoot).to.be.equal(root2);
                });
            });
        });
    });
});
var State;
(function (State) {
    State[State["NOT_COLLATERALIZED"] = 0] = "NOT_COLLATERALIZED";
    State[State["COLLATERALIZED"] = 1] = "COLLATERALIZED";
    State[State["WITHDRAWING"] = 2] = "WITHDRAWING";
})(State || (State = {}));
var Errors;
(function (Errors) {
    Errors["ERC20_ERR"] = "BondManager: Could not post bond";
    Errors["ALREADY_FINALIZED"] = "BondManager: Fraud proof for this pre-state root has already been finalized";
    Errors["SLASHED"] = "BondManager: Cannot finalize withdrawal, you probably got slashed";
    Errors["WRONG_STATE"] = "BondManager: Wrong bond state for proposer";
    Errors["CANNOT_CLAIM"] = "BondManager: Cannot claim yet. Dispute must be finalized first";
    Errors["WITHDRAWAL_PENDING"] = "BondManager: Withdrawal already pending";
    Errors["TOO_EARLY"] = "BondManager: Too early to finalize your withdrawal";
    Errors["ONLY_TRANSITIONER"] = "BondManager: Only the transitioner for this pre-state root may call this function";
    Errors["ONLY_FRAUD_VERIFIER"] = "BondManager: Only the fraud verifier may call this function";
    Errors["ONLY_STATE_COMMITMENT_CHAIN"] = "BondManager: Only the state commitment chain may call this function";
    Errors["WAIT_FOR_DISPUTES"] = "BondManager: Wait for other potential disputes";
})(Errors || (Errors = {}));
//# sourceMappingURL=OVM_BondManager.spec.js.map