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
require("solidity-coverage");
const dotenv = __importStar(require("dotenv"));
const constants_1 = require("./test/helpers/constants");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("@typechain/hardhat");
require("@eth-optimism/hardhat-ovm");
require("./tasks/deploy");
require("hardhat-gas-reporter");
dotenv.config();
const enableGasReport = !!process.env.ENABLE_GAS_REPORT;
const config = {
    networks: {
        hardhat: {
            accounts: constants_1.DEFAULT_ACCOUNTS_HARDHAT,
            blockGasLimit: constants_1.RUN_OVM_TEST_GAS * 2,
            live: false,
            saveDeployments: false,
            tags: ['local'],
            hardfork: 'istanbul',
        },
        optimism: {
            url: 'http://127.0.0.1:8545',
            ovm: true,
            saveDeployments: false,
        },
    },
    mocha: {
        timeout: 50000,
    },
    solidity: {
        version: '0.7.6',
        settings: {
            optimizer: { enabled: true, runs: 200 },
            metadata: {
                bytecodeHash: 'none',
            },
            outputSelection: {
                '*': {
                    '*': ['storageLayout'],
                },
            },
        },
    },
    ovm: {
        solcVersion: '0.7.6',
    },
    typechain: {
        outDir: 'build/types',
        target: 'ethers-v5',
    },
    paths: {
        deploy: './deploy',
        deployments: './deployments',
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: enableGasReport,
        currency: 'USD',
        gasPrice: 100,
        outputFile: process.env.CI ? 'gas-report.txt' : undefined,
    },
};
if (process.env.CONTRACTS_TARGET_NETWORK &&
    process.env.DEPLOYER_PRIVATE_KEY &&
    process.env.L1_NODE_WEB3_URL) {
    config.networks[process.env.CONTRACTS_TARGET_NETWORK] = {
        accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        url: process.env.L1_NODE_WEB3_URL,
        live: true,
        saveDeployments: true,
        tags: [process.env.CONTRACTS_TARGET_NETWORK],
    };
}
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map