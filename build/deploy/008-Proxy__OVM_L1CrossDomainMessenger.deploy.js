"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const result = await deploy('Proxy__OVM_L1CrossDomainMessenger', {
        contract: 'Lib_ResolvedDelegateProxy',
        from: deployer,
        args: [Lib_AddressManager.address, 'OVM_L1CrossDomainMessenger'],
        log: true,
    });
    if (!result.newlyDeployed) {
        return;
    }
    const Proxy__OVM_L1CrossDomainMessenger = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Proxy__OVM_L1CrossDomainMessenger', {
        signerOrProvider: deployer,
        iface: 'OVM_L1CrossDomainMessenger',
    });
    await Proxy__OVM_L1CrossDomainMessenger.initialize(Lib_AddressManager.address);
    const libAddressManager = await Proxy__OVM_L1CrossDomainMessenger.libAddressManager();
    if (libAddressManager !== Lib_AddressManager.address) {
        throw new Error(`\n**FATAL ERROR. THIS SHOULD NEVER HAPPEN. CHECK YOUR DEPLOYMENT.**:\n` +
            `Proxy__OVM_L1CrossDomainMessenger could not be succesfully initialized.\n` +
            `Attempted to set Lib_AddressManager to: ${Lib_AddressManager.address}\n` +
            `Actual address after initialization: ${libAddressManager}\n` +
            `This could indicate a compromised deployment.`);
    }
    await Lib_AddressManager.setAddress('Proxy__OVM_L1CrossDomainMessenger', result.address);
};
deployFn.dependencies = ['Lib_AddressManager', 'OVM_L1CrossDomainMessenger'];
deployFn.tags = ['Proxy__OVM_L1CrossDomainMessenger'];
exports.default = deployFn;
//# sourceMappingURL=008-Proxy__OVM_L1CrossDomainMessenger.deploy.js.map