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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrieTestGenerator = void 0;
const rlp = __importStar(require("rlp"));
const random_bytes_seed_1 = __importDefault(require("random-bytes-seed"));
const merkle_patricia_tree_1 = require("merkle-patricia-tree");
const core_utils_1 = require("@eth-optimism/core-utils");
const ethers_1 = require("ethers");
const rlpEncodeAccount = (account) => {
    return core_utils_1.toHexString(rlp.encode([
        account.nonce,
        account.balance,
        account.storageRoot || ethers_1.ethers.constants.HashZero,
        account.codeHash || ethers_1.ethers.constants.HashZero,
    ]));
};
const rlpDecodeAccount = (encoded) => {
    const decoded = rlp.decode(core_utils_1.fromHexString(encoded));
    return {
        nonce: decoded[0].length ? parseInt(decoded[0], 16) : 0,
        balance: decoded[1].length ? parseInt(decoded[1], 16) : 0,
        storageRoot: decoded[2].length
            ? core_utils_1.toHexString(decoded[2])
            : ethers_1.ethers.constants.HashZero,
        codeHash: decoded[3].length
            ? core_utils_1.toHexString(decoded[3])
            : ethers_1.ethers.constants.HashZero,
    };
};
const makeTrie = async (nodes, secure) => {
    const TrieClass = secure ? merkle_patricia_tree_1.SecureTrie : merkle_patricia_tree_1.BaseTrie;
    const trie = new TrieClass();
    for (const node of nodes) {
        await trie.put(core_utils_1.fromHexString(node.key), core_utils_1.fromHexString(node.val));
    }
    return {
        trie,
        TrieClass,
    };
};
class TrieTestGenerator {
    constructor(_TrieClass, _trie, _nodes, _subGenerators) {
        this._TrieClass = _TrieClass;
        this._trie = _trie;
        this._nodes = _nodes;
        this._subGenerators = _subGenerators;
    }
    static async fromNodes(opts) {
        const { trie, TrieClass } = await makeTrie(opts.nodes, opts.secure);
        return new TrieTestGenerator(TrieClass, trie, opts.nodes);
    }
    static async fromRandom(opts) {
        const getRandomBytes = random_bytes_seed_1.default(opts.seed);
        const nodes = [...Array(opts.nodeCount)].map(() => {
            return {
                key: core_utils_1.toHexString(getRandomBytes(opts.keySize || 32)),
                val: core_utils_1.toHexString(getRandomBytes(opts.valSize || 32)),
            };
        });
        return TrieTestGenerator.fromNodes({
            nodes,
            secure: opts.secure,
        });
    }
    static async fromAccounts(opts) {
        const subGenerators = [];
        for (const account of opts.accounts) {
            if (account.storage) {
                const subGenerator = await TrieTestGenerator.fromNodes({
                    nodes: account.storage,
                    secure: opts.secure,
                });
                account.storageRoot = core_utils_1.toHexString(subGenerator._trie.root);
                subGenerators.push(subGenerator);
            }
        }
        const nodes = opts.accounts.map((account) => {
            return {
                key: account.address,
                val: rlpEncodeAccount(account),
            };
        });
        const { trie, TrieClass } = await makeTrie(nodes, opts.secure);
        return new TrieTestGenerator(TrieClass, trie, nodes, subGenerators);
    }
    async makeInclusionProofTest(key) {
        if (typeof key === 'number') {
            key = this._nodes[key].key;
        }
        const trie = this._trie.copy();
        const proof = await this.prove(key);
        const val = await trie.get(core_utils_1.fromHexString(key));
        return {
            proof: core_utils_1.toHexString(rlp.encode(proof)),
            key: core_utils_1.toHexString(key),
            val: core_utils_1.toHexString(val),
            root: core_utils_1.toHexString(trie.root),
        };
    }
    async makeAllInclusionProofTests() {
        return Promise.all(this._nodes.map(async (node) => {
            return this.makeInclusionProofTest(node.key);
        }));
    }
    async makeNodeUpdateTest(key, val) {
        if (typeof key === 'number') {
            key = this._nodes[key].key;
        }
        const trie = this._trie.copy();
        const proof = await this.prove(key);
        const oldRoot = trie.root;
        await trie.put(core_utils_1.fromHexString(key), core_utils_1.fromHexString(val));
        const newRoot = trie.root;
        return {
            proof: core_utils_1.toHexString(rlp.encode(proof)),
            key: core_utils_1.toHexString(key),
            val: core_utils_1.toHexString(val),
            root: core_utils_1.toHexString(oldRoot),
            newRoot: core_utils_1.toHexString(newRoot),
        };
    }
    async makeAccountProofTest(address) {
        if (typeof address === 'number') {
            address = this._nodes[address].key;
        }
        const trie = this._trie.copy();
        const proof = await this.prove(address);
        const account = await trie.get(core_utils_1.fromHexString(address));
        return {
            address,
            account: rlpDecodeAccount(core_utils_1.toHexString(account)),
            accountTrieWitness: core_utils_1.toHexString(rlp.encode(proof)),
            accountTrieRoot: core_utils_1.toHexString(trie.root),
        };
    }
    async makeAccountUpdateTest(address, account) {
        if (typeof address === 'number') {
            address = this._nodes[address].key;
        }
        const trie = this._trie.copy();
        const proof = await this.prove(address);
        const oldRoot = trie.root;
        await trie.put(core_utils_1.fromHexString(address), core_utils_1.fromHexString(rlpEncodeAccount(account)));
        const newRoot = trie.root;
        return {
            address,
            account,
            accountTrieWitness: core_utils_1.toHexString(rlp.encode(proof)),
            accountTrieRoot: core_utils_1.toHexString(oldRoot),
            newAccountTrieRoot: core_utils_1.toHexString(newRoot),
        };
    }
    async prove(key) {
        return this._TrieClass.prove(this._trie, core_utils_1.fromHexString(key));
    }
}
exports.TrieTestGenerator = TrieTestGenerator;
//# sourceMappingURL=trie-test-generator.js.map