"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const result = await deploy('mockOVM_BondManager', {
        from: deployer,
        args: [Lib_AddressManager.address],
        log: true,
    });
    if (!result.newlyDeployed) {
        return;
    }
    await Lib_AddressManager.setAddress('OVM_BondManager', result.address);
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['mockOVM_BondManager'];
exports.default = deployFn;
//# sourceMappingURL=006-mockOVM_BondManager.deploy.js.map