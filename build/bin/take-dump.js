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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mkdirp = __importStar(require("mkdirp"));
const env = process.env;
const CHAIN_ID = env.CHAIN_ID || '420';
const contract_dumps_1 = require("../src/contract-dumps");
(async () => {
    const outdir = path.resolve(__dirname, '../dist/dumps');
    const outfile = path.join(outdir, 'state-dump.latest.json');
    mkdirp.sync(outdir);
    const config = {
        ovmGlobalContext: {
            ovmCHAINID: parseInt(CHAIN_ID, 10),
        },
    };
    const dump = await contract_dumps_1.makeStateDump(config);
    fs.writeFileSync(outfile, JSON.stringify(dump, null, 4));
})();
//# sourceMappingURL=take-dump.js.map