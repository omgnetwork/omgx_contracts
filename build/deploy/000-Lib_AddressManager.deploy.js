"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const predeploys_1 = require("../src/predeploys");
const deployFn = async (hre) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    await deploy('Lib_AddressManager', {
        from: deployer,
        args: [],
        log: true,
    });
    await hardhat_deploy_ethers_1.registerAddress({
        hre,
        name: 'OVM_L2CrossDomainMessenger',
        address: predeploys_1.predeploys.OVM_L2CrossDomainMessenger,
    });
    await hardhat_deploy_ethers_1.registerAddress({
        hre,
        name: 'OVM_DecompressionPrecompileAddress',
        address: predeploys_1.predeploys.OVM_SequencerEntrypoint,
    });
    await hardhat_deploy_ethers_1.registerAddress({
        hre,
        name: 'OVM_Sequencer',
        address: hre.deployConfig.ovmSequencerAddress,
    });
    await hardhat_deploy_ethers_1.registerAddress({
        hre,
        name: 'OVM_Proposer',
        address: hre.deployConfig.ovmProposerAddress,
    });
    await hardhat_deploy_ethers_1.registerAddress({
        hre,
        name: 'OVM_L2BatchMessageRelayer',
        address: hre.deployConfig.ovmRelayerAddress,
    });
};
deployFn.tags = ['Lib_AddressManager', 'required'];
exports.default = deployFn;
//# sourceMappingURL=000-Lib_AddressManager.deploy.js.map