"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXDomainCalldata = void 0;
const contract_defs_1 = require("../../../src/contract-defs");
const getXDomainCalldata = (target, sender, message, messageNonce) => {
    return contract_defs_1.getContractInterface('OVM_L2CrossDomainMessenger').encodeFunctionData('relayMessage', [target, sender, message, messageNonce]);
};
exports.getXDomainCalldata = getXDomainCalldata;
//# sourceMappingURL=bridge.js.map