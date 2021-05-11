"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_ChainStorageContainer:SCC:batches',
        contract: 'OVM_ChainStorageContainer',
        args: [Lib_AddressManager.address, 'OVM_StateCommitmentChain'],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_ChainStorageContainer_scc_batches'];
exports.default = deployFn;
//# sourceMappingURL=003-OVM_ChainStorageContainer_scc_batches.deploy.js.map