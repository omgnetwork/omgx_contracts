"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const predeploys_1 = require("../src/predeploys");
const deployFn = async (hre) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const result = await deploy('OVM_L1ETHGateway', {
        from: deployer,
        args: [],
        log: true,
    });
    if (!result.newlyDeployed) {
        return;
    }
    const OVM_L1ETHGateway = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'OVM_L1ETHGateway', {
        signerOrProvider: deployer,
    });
    await OVM_L1ETHGateway.initialize(Lib_AddressManager.address, predeploys_1.predeploys.OVM_ETH);
    const libAddressManager = await OVM_L1ETHGateway.libAddressManager();
    if (libAddressManager !== Lib_AddressManager.address) {
        throw new Error(`\n**FATAL ERROR. THIS SHOULD NEVER HAPPEN. CHECK YOUR DEPLOYMENT.**:\n` +
            `OVM_L1ETHGateway could not be succesfully initialized.\n` +
            `Attempted to set Lib_AddressManager to: ${Lib_AddressManager.address}\n` +
            `Actual address after initialization: ${libAddressManager}\n` +
            `This could indicate a compromised deployment.`);
    }
    await Lib_AddressManager.setAddress('OVM_L1ETHGateway', result.address);
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_L1ETHGateway'];
exports.default = deployFn;
//# sourceMappingURL=015-OVM_L1ETHGateway.deploy.js.map