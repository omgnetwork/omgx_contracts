"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_StateCommitmentChain',
        args: [
            Lib_AddressManager.address,
            hre.deployConfig.sccFraudProofWindow,
            hre.deployConfig.sccSequencerPublishWindow,
        ],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_StateCommitmentChain'];
exports.default = deployFn;
//# sourceMappingURL=005-OVM_StateCommitmentChain.deploy.js.map