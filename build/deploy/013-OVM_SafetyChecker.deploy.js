"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_SafetyChecker',
        args: [],
    });
};
deployFn.tags = ['OVM_SafetyChecker'];
exports.default = deployFn;
//# sourceMappingURL=013-OVM_SafetyChecker.deploy.js.map