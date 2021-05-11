"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_deploy_ethers_1 = require("../src/hardhat-deploy-ethers");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await hardhat_deploy_ethers_1.getDeployedContract(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const owner = hre.deployConfig.ovmAddressManagerOwner;
    const remoteOwner = await Lib_AddressManager.owner();
    if (remoteOwner === owner) {
        console.log(`✓ Not changing owner of Lib_AddressManager because it's already correctly set`);
        return;
    }
    console.log(`Transferring ownership of Lib_AddressManager to ${owner}...`);
    const tx = await Lib_AddressManager.transferOwnership(owner);
    await tx.wait();
    const newRemoteOwner = await Lib_AddressManager.owner();
    if (newRemoteOwner !== owner) {
        throw new Error(`\n**FATAL ERROR. THIS SHOULD NEVER HAPPEN. CHECK YOUR DEPLOYMENT.**:\n` +
            `Could not transfer ownership of Lib_AddressManager.\n` +
            `Attempted to set owner of Lib_AddressManager to: ${owner}\n` +
            `Actual owner after transaction: ${newRemoteOwner}\n` +
            `This could indicate a compromised deployment.`);
    }
    console.log(`✓ Set owner of Lib_AddressManager to: ${owner}`);
};
deployFn.dependencies = ['Lib_AddressManager'];
deployFn.tags = ['finalize'];
exports.default = deployFn;
//# sourceMappingURL=017-finalize.js.map