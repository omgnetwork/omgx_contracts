"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_L1MultiMessageRelayer',
        args: [Lib_AddressManager.address],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_L1MultiMessageRelayer'];
exports.default = deployFn;
//# sourceMappingURL=014-OVM_L1MultiMessageRelayer.deploy.js.map