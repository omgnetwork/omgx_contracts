"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager');
    await hardhat_deploy_ethers_1.deployAndRegister({
        hre,
        name: 'OVM_ChainStorageContainer:CTC:queue',
        contract: 'OVM_ChainStorageContainer',
        args: [Lib_AddressManager.address, 'OVM_CanonicalTransactionChain'],
    });
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['OVM_ChainStorageContainer_ctc_queue'];
exports.default = deployFn;
//# sourceMappingURL=002-OVM_ChainStorageContainer_ctc_queue.deploy.js.map