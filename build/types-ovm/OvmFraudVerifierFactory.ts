/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmFraudVerifier } from "./OvmFraudVerifier";

export class OvmFraudVerifierFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _libAddressManager: string,
    overrides?: Overrides
  ): Promise<OvmFraudVerifier> {
    return super.deploy(_libAddressManager, overrides || {}) as Promise<
      OvmFraudVerifier
    >;
  }
  getDeployTransaction(
    _libAddressManager: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_libAddressManager, overrides || {});
  }
  attach(address: string): OvmFraudVerifier {
    return super.attach(address) as OvmFraudVerifier;
  }
  connect(signer: Signer): OvmFraudVerifierFactory {
    return super.connect(signer) as OvmFraudVerifierFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmFraudVerifier {
    return new Contract(address, _abi, signerOrProvider) as OvmFraudVerifier;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_preStateRootIndex",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_transactionHash",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "_who",
        type: "address"
      }
    ],
    name: "FraudProofFinalized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_preStateRootIndex",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_transactionHash",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "_who",
        type: "address"
      }
    ],
    name: "FraudProofInitialized",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256"
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_preStateRootBatchHeader",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_preStateRootProof",
        type: "tuple"
      },
      {
        internalType: "bytes32",
        name: "_txHash",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_postStateRoot",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256"
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_postStateRootBatchHeader",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_postStateRootProof",
        type: "tuple"
      }
    ],
    name: "finalizeFraudVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_txHash",
        type: "bytes32"
      }
    ],
    name: "getStateTransitioner",
    outputs: [
      {
        internalType: "contract iOVM_StateTransitioner",
        name: "_transitioner",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256"
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_preStateRootBatchHeader",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_preStateRootProof",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256"
          },
          {
            internalType: "enum Lib_OVMCodec.QueueOrigin",
            name: "l1QueueOrigin",
            type: "uint8"
          },
          {
            internalType: "address",
            name: "l1TxOrigin",
            type: "address"
          },
          {
            internalType: "address",
            name: "entrypoint",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.Transaction",
        name: "_transaction",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "isSequenced",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "queueIndex",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "txData",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.TransactionChainElement",
        name: "_txChainElement",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256"
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_transactionBatchHeader",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]"
          }
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_transactionProof",
        type: "tuple"
      }
    ],
    name: "initializeFraudVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "libAddressManager",
    outputs: [
      {
        internalType: "contract Lib_AddressManager",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      }
    ],
    name: "resolve",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156200001c57600080620000196200007f565b50505b5060405162002088380380620020888339810160408190526200003f916200019d565b8080600060018162000050620000ec565b816001600160a01b0302191690836001600160a01b0316021790620000746200014e565b5050505050620001e3565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015620000b95780860151828201604001526020016200009c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015620001495760008282015260200162000130565b505050565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b60008152602062000130565b600060208284031215620001ba578081620001b76200007f565b50505b81516001600160a01b0381168114620001dc578182620001d96200007f565b50505b9392505050565b611e9580620001f36000396000f3fe608060405234801561001957600080610016610ea9565b50505b50600436106100605760003560e01c8063299ca4781461006e578063461a44781461008c57806398d8867d1461009f578063a286ba1c146100b4578063b48ec820146100c7575b60008061006b610ea9565b50505b6100766100da565b6040516100839190611a11565b60405180910390f35b61007661009a3660046117ea565b6100f8565b6100b26100ad3660046116d6565b610222565b005b6100b26100c23660046115e4565b6105fa565b6100766100d53660046115ba565b610ab5565b6000806100e5610f14565b906101000a90046001600160a01b031681565b60008080610104610f14565b906101000a90046001600160a01b03166001600160a01b031663bf40fac1836040518263ffffffff1660e01b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561016f578082015183820152602001610157565b50505050905090810190601f16801561019c5780820380516001836020036101000a031916815260200191505b509250505060206040518083038186806101b4610f74565b1580156101c9576000806101c6610ea9565b50505b505a6101d3610fc0565b50505050501580156101f2573d6000803e3d60006101ef610ea9565b50505b505050506040513d60208110156102115760008061020e610ea9565b50505b81019080805193505050505b919050565b8661022c85610b16565b60005a9050600061023c88610b16565b90506102488b82610b2e565b15610253575061050c565b600061028c60405160408082019052601881527727ab26afa9ba30ba32a1b7b6b6b4ba36b2b73a21b430b4b760411b60208201526100f8565b905060006102cc60405160408082019052601d81527f4f564d5f43616e6f6e6963616c5472616e73616374696f6e436861696e00000060208201526100f8565b9050816001600160a01b0316634d69ee578e8e8e6040518463ffffffff1660e01b81526004016102fe93929190611a6a565b6020604051808303818680610311610f74565b15801561032657600080610323610ea9565b50505b505a610330610fc0565b505050505015801561034f573d6000803e3d600061034c610ea9565b50505b50505050604051601f3d908101601f191682016040526103729190810190611572565b6103a05760405162461bcd60e51b815260040161038e90611cf2565b6040518091039061039d610ea9565b50505b806001600160a01b0316634de569ce8b8b8b8b6040518563ffffffff1660e01b81526004016103d29493929190611d4c565b60206040518083038186806103e5610f74565b1580156103fa576000806103f7610ea9565b50505b505a610404610fc0565b5050505050158015610423573d6000803e3d6000610420610ea9565b50505b50505050604051601f3d908101601f191682016040526104469190810190611572565b6104745760405162461bcd60e51b815260040161046290611ba4565b60405180910390610471610ea9565b50505b86518860600151018b518d6060015101600101146104b65760405162461bcd60e51b81526004016104a490611c30565b604051809103906104b3610ea9565b50505b6104c28d848d51610b4d565b7f41a48bde2468fac6f670f39b66d7b91f311053e1f28eab9d75056546e6eaac958d8c51855a6104f06110ab565b6040516105009493929190611a9f565b60405180910390a15050505b60005a8203905061054160405160408082019052600f81526e27ab26afa137b73226b0b730b3b2b960891b60208201526100f8565b6001600160a01b0316631e16e92f85855a61055a6110ab565b856040516001600160e01b031960e087901b168152600481019490945260248401929092526001600160a01b031660448301526064820152608401600060405180830381600087806105aa610f74565b1580156105bf576000806105bc610ea9565b50505b505a6105c96110f1565b5050505050501580156105e9573d6000803e3d60006105e6610ea9565b50505b505050505050505050505050505050565b868460005a9050600061060d8b89610ab5565b9050600061064860405160408082019052601881527727ab26afa9ba30ba32a1b7b6b6b4ba36b2b73a21b430b4b760411b60208201526100f8565b9050816001600160a01b031663b2fa1c9e6040518163ffffffff1660e01b8152600401602060405180830381868061067e610f74565b15801561069357600080610690610ea9565b50505b505a61069d610fc0565b50505050501580156106bc573d6000803e3d60006106b9610ea9565b50505b50505050604051601f3d908101601f191682016040526106df9190810190611572565b15156001146107125760405162461bcd60e51b815260040161070090611ac3565b6040518091039061070f610ea9565b50505b89518b60600151016001018651886060015101146107545760405162461bcd60e51b815260040161074290611b2a565b60405180910390610751610ea9565b50505b806001600160a01b0316634d69ee578d8d8d6040518463ffffffff1660e01b815260040161078493929190611a6a565b6020604051808303818680610797610f74565b1580156107ac576000806107a9610ea9565b50505b505a6107b6610fc0565b50505050501580156107d5573d6000803e3d60006107d2610ea9565b50505b50505050604051601f3d908101601f191682016040526107f89190810190611572565b6108265760405162461bcd60e51b815260040161081490611cf2565b60405180910390610823610ea9565b50505b806001600160a01b0316634d69ee578989896040518463ffffffff1660e01b815260040161085693929190611a6a565b6020604051808303818680610869610f74565b15801561087e5760008061087b610ea9565b50505b505a610888610fc0565b50505050501580156108a7573d6000803e3d60006108a4610ea9565b50505b50505050604051601f3d908101601f191682016040526108ca9190810190611572565b6108f85760405162461bcd60e51b81526004016108e690611be8565b604051809103906108f5610ea9565b50505b816001600160a01b031663c1c618b86040518163ffffffff1660e01b8152600401602060405180830381868061092c610f74565b1580156109415760008061093e610ea9565b50505b505a61094b610fc0565b505050505015801561096a573d6000803e3d6000610967610ea9565b50505b50505050604051601f3d908101601f1916820160405261098d9190810190611597565b8814156109be5760405162461bcd60e51b81526004016109ac90611ca2565b604051809103906109bb610ea9565b50505b6109c8878d610cbb565b6000600160008e8c6040516020016109e1929190611994565b604051602081830303815290604052805190602001208152602001908152602001600020600181610a10610f14565b816001600160a01b0302191690836001600160a01b0316021790610a326111b7565b5050507f1e5fff3c23daf51ea67aaa3bbc738bcedaa98be5a5503f0e63a336a004b075b18c8b600001518b5a610a666110ab565b604051610a769493929190611a9f565b60405180910390a1505060005a8203905061054160405160408082019052600f81526e27ab26afa137b73226b0b730b3b2b960891b60208201526100f8565b6000600160008484604051602001610ace929190611994565b604051602081830303815290604052805190602001208152602001908152602001600020600090610afd610f14565b906101000a90046001600160a01b031690505b92915050565b6000610b2182610e5b565b8051906020012092915050565b600080610b3b8484610ab5565b6001600160a01b031614159392505050565b610b8960405160408082019052601c81527f4f564d5f53746174655472616e736974696f6e6572466163746f72790000000060208201526100f8565b6001600160a01b03166322d14702600080610ba2610f14565b906101000a90046001600160a01b03168386866040518563ffffffff1660e01b8152600401610bd49493929190611a25565b60206040518083038160008780610be9610f74565b158015610bfe57600080610bfb610ea9565b50505b505a610c086110f1565b505050505050158015610c28573d6000803e3d6000610c25610ea9565b50505b50505050604051601f3d908101601f19168201604052610c4b91908101906117c5565b600160008585604051602001610c62929190611994565b604051602081830303815290604052805190602001208152602001908152602001600020600181610c91610f14565b816001600160a01b0302191690836001600160a01b0316021790610cb36111b7565b505050505050565b6000610cf460405160408082019052601881527727ab26afa9ba30ba32a1b7b6b6b4ba36b2b73a21b430b4b760411b60208201526100f8565b90506000610d2660405160408082019052600f81526e27ab26afa137b73226b0b730b3b2b960891b60208201526100f8565b9050816001600160a01b031663b8e189ac856040518263ffffffff1660e01b8152600401610d549190611d39565b60006040518083038160008780610d69610f74565b158015610d7e57600080610d7b610ea9565b50505b505a610d886110f1565b505050505050158015610da8573d6000803e3d6000610da5610ea9565b50505b505050506000808560800151806020019051810190610dc79190611853565b91509150826001600160a01b031663abfbbe138683856040518463ffffffff1660e01b8152600401610dfb93929190611a4b565b60006040518083038160008780610e10610f74565b158015610e2557600080610e22610ea9565b50505b505a610e2f6110f1565b505050505050158015610e4f573d6000803e3d6000610e4c610ea9565b50505b50505050505050505050565b6060815182602001518360400151846060015185608001518660a001518760c00151604051602001610e9397969594939291906119a2565b6040516020818303038152906040529050919050565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015610ee1578086015182820160400152602001610ec6565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015610f6f57600082820152602001610f58565b505050565b638435035b598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020610f58565b638540661f598160e01b8152610ff1565b8080831115610b10575090919050565b8080831015610b10575090919050565b836004820152846024820152606060448201528660648201526084810160005b88811015611029578088015182820152602001611011565b506060828960a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8b8b82606087013350600060045af1505961107e8d3d610fe1565b8c0161108a8187610fd1565b5b8281101561109f576000815260200161108b565b50929c50505050505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020610f58565b6385979f76598160e01b8152836004820152846024820152606060448201528760648201526084810160005b8981101561113557808901518282015260200161111d565b506060828a60a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8c8c82606087013350600060045af1505961118a8e3d610fe1565b8d016111968187610fd1565b5b828110156111ab5760008152602001611197565b50929d50505050505050565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b600081526020610f58565b600067ffffffffffffffff83111561121957fe5b61122c601f8401601f1916602001611e0b565b905082815283838301111561124957600080611246610ea9565b50505b828260208301376000602084830101529392505050565b803561021d81611e63565b600082601f830112611284578081611281610ea9565b50505b61129383833560208501611205565b9392505050565b80356002811061021d576000806112af610ea9565b5050919050565b600060a082840312156112d05780816112cd610ea9565b50505b60405160a0810167ffffffffffffffff82821081831117156112ee57fe5b8160405282935084358352602085013560208401526040850135604084015260608501356060840152608085013591508082111561133457600080611331610ea9565b50505b506113418582860161126b565b6080830152505092915050565b600060408284031215611368578081611365610ea9565b50505b6040516040810167ffffffffffffffff828210818311171561138657fe5b81604052829350843583526020915081850135818111156113af576000806113ac610ea9565b50505b8501601f810187136113c9576000806113c6610ea9565b50505b8035828111156113d557fe5b83810292506113e5848401611e0b565b8181528481019083860185850187018b101561140957600080611406610ea9565b50505b600095505b8386101561142c57803583526001959095019491860191860161140e565b5080868801525050505050505092915050565b600060a08284031215611459578081611456610ea9565b50505b60405160a0810167ffffffffffffffff828210818311171561147757fe5b816040528293508435915061148b82611e81565b818352602085013560208401526040850135604084015260608501356060840152608085013591508082111561133457600080611331610ea9565b600060e082840312156114e05780816114dd610ea9565b50505b6114ea60e0611e0b565b905081358152602082013560208201526115066040830161129a565b604082015261151760608301611260565b606082015261152860808301611260565b608082015260a082013560a082015260c082013567ffffffffffffffff81111561155a57600080611557610ea9565b50505b6115668482850161126b565b60c08301525092915050565b60006020828403121561158c578081611589610ea9565b50505b815161129381611e81565b6000602082840312156115b15780816115ae610ea9565b50505b81519392505050565b600080604083850312156115d55780816115d2610ea9565b50505b50508035926020909101359150565b600080600080600080600060e0888a031215611607578283611604610ea9565b50505b87359650602088013567ffffffffffffffff8082111561162e57848561162b610ea9565b50505b61163a8b838c016112b6565b975060408a0135915080821115611658578485611655610ea9565b50505b6116648b838c0161134e565b965060608a0135955060808a0135945060a08a013591508082111561169057838461168d610ea9565b50505b61169c8b838c016112b6565b935060c08a01359150808211156116ba5782836116b7610ea9565b50505b506116c78a828b0161134e565b91505092959891949750929550565b600080600080600080600060e0888a0312156116f95780816116f6610ea9565b50505b87359650602088013567ffffffffffffffff8082111561172057828361171d610ea9565b50505b61172c8b838c016112b6565b975060408a013591508082111561174a578283611747610ea9565b50505b6117568b838c0161134e565b965060608a0135915080821115611774578283611771610ea9565b50505b6117808b838c016114c6565b955060808a013591508082111561179e57828361179b610ea9565b50505b6117aa8b838c0161143f565b945060a08a013591508082111561169057828361168d610ea9565b6000602082840312156117df5780816117dc610ea9565b50505b815161129381611e63565b600060208284031215611804578081611801610ea9565b50505b813567ffffffffffffffff811115611823578182611820610ea9565b50505b8201601f8101841361183c578182611839610ea9565b50505b61184b84823560208401611205565b949350505050565b6000806040838503121561186e57818261186b610ea9565b50505b82519150602083015161188081611e63565b809150509250929050565b6001600160a01b03169052565b600081518084526118b0816020860160208601611e33565b601f01601f19169290920160200192915050565b600081518352602082015160208401526040820151604084015260608201516060840152608082015160a0608085015261184b60a0850182611898565b600060408301825184526020808401516040828701528281519384905250810191839060608701905b8083101561194a578451825293830193600192909201919083019061192a565b509695505050505050565b6000815115158352602082015160208401526040820151604084015260608201516060840152608082015160a0608085015261184b60a0850182611898565b918252602082015260400190565b6000888252876020830152600287106119b757fe5b8660f81b60408301526bffffffffffffffffffffffff19808760601b166041840152808660601b1660558401525083606983015282516119fe816089850160208701611e33565b9190910160890198975050505050505050565b6001600160a01b0391909116815260200190565b6001600160a01b0394909416845260208401929092526040830152606082015260800190565b9283526001600160a01b03919091166020830152604082015260600190565b600084825260606020830152611a8360608301856118c4565b8281036040840152611a958185611901565b9695505050505050565b938452602084019290925260408301526001600160a01b0316606082015260800190565b60208082526041908201527f5374617465207472616e736974696f6e2070726f63657373206d75737420626560408201527f20636f6d706c65746564207072696f7220746f2066696e616c697a6174696f6e6060820152601760f91b608082015260a00190565b60208082526054908201527f506f73742d737461746520726f6f7420676c6f62616c20696e646578206d757360408201527f7420657175616c20746f207468652070726520737461746520726f6f7420676c60608201527337b130b61034b73232bc1038363ab99037b7329760611b608082015260a00190565b60208082526024908201527f496e76616c6964207472616e73616374696f6e20696e636c7573696f6e20707260408201526337b7b31760e11b606082015260800190565b60208082526028908201527f496e76616c696420706f73742d737461746520726f6f7420696e636c7573696f6040820152673710383937b7b31760c11b606082015260800190565b6020808252604c908201527f5072652d737461746520726f6f7420676c6f62616c20696e646578206d75737460408201527f20657175616c20746f20746865207472616e73616374696f6e20726f6f74206760608201526b3637b130b61034b73232bc1760a11b608082015260a00190565b60208082526030908201527f5374617465207472616e736974696f6e20686173206e6f74206265656e20707260408201526f37bb32b710333930bab23ab632b73a1760811b606082015260800190565b60208082526027908201527f496e76616c6964207072652d737461746520726f6f7420696e636c7573696f6e60408201526610383937b7b31760c91b606082015260800190565b60006020825261129360208301846118c4565b60006080825285516080830152602086015160a0830152604086015160028110611d7257fe5b60c08301526001600160a01b0360608701511660e08301526080860151611d9d61010084018261188b565b5060a086015161012083015260c086015160e0610140840152611dc4610160840182611898565b90508281036020840152611dd88187611955565b90508281036040840152611dec81866118c4565b90508281036060840152611e008185611901565b979650505050505050565b6000604051905081810181811067ffffffffffffffff82111715611e2b57fe5b604052919050565b60005b83811015611e4e578082015183820152602001611e36565b83811115611e5d576000848401525b50505050565b6001600160a01b0381168114611e7e57600080610f6f610ea9565b50565b8015158114611e7e57600080610f6f610ea956";
