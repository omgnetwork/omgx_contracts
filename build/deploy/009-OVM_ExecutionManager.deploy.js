"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_ExecutionManager',
        args: [
            Lib_AddressManager.address,
            {
                minTransactionGasLimit: hre.deployConfig
                    .emMinTransactionGasLimit,
                maxTransactionGasLimit: hre.deployConfig
                    .emMaxTransactionGasLimit,
                maxGasPerQueuePerEpoch: hre.deployConfig
                    .emMaxGasPerQueuePerEpoch,
                secondsPerEpoch: hre.deployConfig.emSecondsPerEpoch,
            },
            {
                ovmCHAINID: hre.deployConfig.emOvmChainId,
            },
        ],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_ExecutionManager'];
exports.default = deployFn;
//# sourceMappingURL=009-OVM_ExecutionManager.deploy.js.map