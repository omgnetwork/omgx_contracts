"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployedContract = exports.deployAndRegister = exports.registerAddress = void 0;
const ethers_1 = require("ethers");
const registerAddress = async ({ hre, name, address, }) => {
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await exports.getDeployedContract(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const currentAddress = await Lib_AddressManager.getAddress(name);
    if (address === currentAddress) {
        console.log(`✓ Not registering address for ${name} because it's already been correctly registered`);
        return;
    }
    console.log(`Registering address for ${name} to ${address}...`);
    const tx = await Lib_AddressManager.setAddress(name, address);
    await tx.wait();
    const remoteAddress = await Lib_AddressManager.getAddress(name);
    if (remoteAddress !== address) {
        throw new Error(`\n**FATAL ERROR. THIS SHOULD NEVER HAPPEN. CHECK YOUR DEPLOYMENT.**:\n` +
            `Call to Lib_AddressManager.setAddress(${name}) was unsuccessful.\n` +
            `Attempted to set address to: ${address}\n` +
            `Actual address was set to: ${remoteAddress}\n` +
            `This could indicate a compromised deployment.`);
    }
    console.log(`✓ Registered address for ${name}`);
};
exports.registerAddress = registerAddress;
const deployAndRegister = async ({ hre, name, args, contract, }) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const result = await deploy(name, {
        contract,
        from: deployer,
        args,
        log: true,
    });
    await hre.ethers.provider.waitForTransaction(result.transactionHash);
    if (result.newlyDeployed) {
        await exports.registerAddress({
            hre,
            name,
            address: result.address,
        });
    }
};
exports.deployAndRegister = deployAndRegister;
const getDeployedContract = async (hre, name, options = {}) => {
    const deployed = await hre.deployments.get(name);
    await hre.ethers.provider.waitForTransaction(deployed.receipt.transactionHash);
    let iface = new hre.ethers.utils.Interface(deployed.abi);
    if (options.iface) {
        const factory = await hre.ethers.getContractFactory(options.iface);
        iface = factory.interface;
    }
    let signerOrProvider = hre.ethers.provider;
    if (options.signerOrProvider) {
        if (typeof options.signerOrProvider === 'string') {
            signerOrProvider = hre.ethers.provider.getSigner(options.signerOrProvider);
        }
        else {
            signerOrProvider = options.signerOrProvider;
        }
    }
    const def = Object.defineProperty;
    Object.defineProperty = (obj, propName, prop) => {
        prop.writable = true;
        return def(obj, propName, prop);
    };
    const contract = new ethers_1.Contract(deployed.address, iface, signerOrProvider);
    Object.defineProperty = def;
    for (const fnName of Object.keys(contract.functions)) {
        const fn = contract[fnName].bind(contract);
        contract[fnName] = async (...args) => {
            const result = await fn(...args);
            if (typeof result === 'object' && typeof result.wait === 'function') {
                await result.wait();
            }
            return result;
        };
    }
    return contract;
};
exports.getDeployedContract = getDeployedContract;
//# sourceMappingURL=hardhat-deploy-ethers.js.map