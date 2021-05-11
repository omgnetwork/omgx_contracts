"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_StateManagerFactory',
        args: [],
    });
};
deployFn.tags = ['OVM_FraudVerifier'];
exports.default = deployFn;
//# sourceMappingURL=011-OVM_StateManagerFactory.deploy.js.map