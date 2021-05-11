"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContractFromManager = exports.loadContract = exports.getContractFactory = exports.getContractInterface = exports.getContractDefinition = void 0;
const path = __importStar(require("path"));
const glob = __importStar(require("glob"));
const ethers_1 = require("ethers");
const getContractDefinition = (name, ovm) => {
    const match = glob.sync(path.resolve(__dirname, `../artifacts${ovm ? '-ovm' : ''}`) +
        `/**/${name.split('-').join(':')}.json`);
    if (match.length > 0) {
        return require(match[0]);
    }
    else {
        throw new Error(`Unable to find artifact for contract: ${name}`);
    }
};
exports.getContractDefinition = getContractDefinition;
const getContractInterface = (name, ovm) => {
    const definition = exports.getContractDefinition(name, ovm);
    return new ethers_1.ethers.utils.Interface(definition.abi);
};
exports.getContractInterface = getContractInterface;
const getContractFactory = (name, signer, ovm) => {
    const definition = exports.getContractDefinition(name, ovm);
    const contractInterface = exports.getContractInterface(name, ovm);
    return new ethers_1.ContractFactory(contractInterface, definition.bytecode, signer);
};
exports.getContractFactory = getContractFactory;
const loadContract = (name, address, provider) => {
    return new ethers_1.Contract(address, exports.getContractInterface(name), provider);
};
exports.loadContract = loadContract;
const loadContractFromManager = async (args) => {
    const { name, proxy, Lib_AddressManager, provider } = args;
    const address = await Lib_AddressManager.getAddress(proxy ? proxy : name);
    if (address === ethers_1.constants.AddressZero) {
        throw new Error(`Lib_AddressManager does not have a record for a contract named: ${name}`);
    }
    return exports.loadContract(name, address, provider);
};
exports.loadContractFromManager = loadContractFromManager;
//# sourceMappingURL=contract-defs.js.map