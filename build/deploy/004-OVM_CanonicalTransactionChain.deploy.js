"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_CanonicalTransactionChain',
        args: [
            Lib_AddressManager.address,
            hre.deployConfig.ctcForceInclusionPeriodSeconds,
            hre.deployConfig.ctcForceInclusionPeriodBlocks,
            hre.deployConfig.ctcMaxTransactionGasLimit,
        ],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_CanonicalTransactionChain'];
exports.default = deployFn;
//# sourceMappingURL=004-OVM_CanonicalTransactionChain.deploy.js.map