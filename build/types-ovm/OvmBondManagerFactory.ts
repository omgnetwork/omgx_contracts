/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmBondManager } from "./OvmBondManager";

export class OvmBondManagerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _token: string,
    _libAddressManager: string,
    overrides?: Overrides
  ): Promise<OvmBondManager> {
    return super.deploy(_token, _libAddressManager, overrides || {}) as Promise<
      OvmBondManager
    >;
  }
  getDeployTransaction(
    _token: string,
    _libAddressManager: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _libAddressManager,
      overrides || {}
    );
  }
  attach(address: string): OvmBondManager {
    return super.attach(address) as OvmBondManager;
  }
  connect(signer: Signer): OvmBondManagerFactory {
    return super.connect(signer) as OvmBondManagerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmBondManager {
    return new Contract(address, _abi, signerOrProvider) as OvmBondManager;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_token",
        type: "address"
      },
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "bonds",
    outputs: [
      {
        internalType: "enum iOVM_BondManager.State",
        name: "state",
        type: "uint8"
      },
      {
        internalType: "uint32",
        name: "withdrawalTimestamp",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "firstDisputeAt",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "earliestDisputedStateRoot",
        type: "bytes32"
      },
      {
        internalType: "uint256",
        name: "earliestTimestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address"
      }
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "disputePeriodSeconds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
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
        internalType: "address",
        name: "publisher",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "finalizeWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "preStateRoot",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "who",
        type: "address"
      }
    ],
    name: "getGasSpent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address"
      }
    ],
    name: "isCollateralized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "multiFraudProofPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
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
        internalType: "bytes32",
        name: "_txHash",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "who",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "gasSpent",
        type: "uint256"
      }
    ],
    name: "recordGasSpent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "requiredCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
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
  },
  {
    inputs: [],
    name: "startWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract ERC20",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "witnessProviders",
    outputs: [
      {
        internalType: "bool",
        name: "canClaim",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "total",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x60a06040523480156200001c5760008062000019620000b1565b50505b506040516200208638038062002086833981810160405260408110156200004d576000806200004a620000b1565b50505b810190808051929190602001805192508291508190506000600181620000726200011e565b816001600160a01b0302191690836001600160a01b03160217906200009662000180565b505050505060601b6001600160601b031916608052620001cf565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015620000eb578086015182820160400152602001620000ce565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b60408110156200017b5760008282015260200162000162565b505050565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b60008152602062000162565b60805160601c611e8a620001fc600039806108eb52806113f852806115ac52806118575250611e8a6000f3fe6080604052348015610019576000806100166118e5565b50505b50600436106101095760003560e01c8063abfbbe13116100a0578063d0e30db01161006f578063d0e30db014610366578063dc6453dc1461036e578063fc0c546a146103a3578063fe10d774146103ab57610109565b8063abfbbe1314610313578063b53105a31461034e578063bc2f8dd814610356578063c5b6aa2f1461035e57610109565b80631e83409a116100dc5780631e83409a146101b7578063299ca478146101e6578063461a44781461020a5780635b7c615f146102d357610109565b806302ad4d2a146101175780630756183b1461015a5780631e0983bd1461015a5780631e16e92f14610174575b6000806101146118e5565b50505b61014660048036036020811015610136576000806101336118e5565b50505b50356001600160a01b031661041d565b604051901515815260200160405180910390f35b610162610460565b60405190815260200160405180910390f35b6101b560048036036080811015610193576000806101906118e5565b50505b508035906020810135906001600160a01b036040820135169060600135610467565b005b6101b5600480360360208110156101d6576000806101d36118e5565b50505b50356001600160a01b031661068f565b6101ee610a99565b6040516001600160a01b03909116815260200160405180910390f35b6101ee60048036036020811015610229576000806102266118e5565b50505b81019060208101813564010000000081111561024d5760008061024a6118e5565b50505b820183602082011115610268576000806102656118e5565b50505b80359060200191846001830284011164010000000083111715610293576000806102906118e5565b50505b91908080601f0160208091040260200160405190810160405281815292919060208401838380828437600092019190915250929550610ab7945050505050565b6102f9600480360360208110156102f2576000806102ef6118e5565b50505b5035610bdf565b604051911515825260208201526040908101905180910390f35b6101b5600480360360608110156103325760008061032f6118e5565b50505b508035906001600160a01b036020820135169060400135610c16565b610162610f8b565b6101b5610f97565b6101b56111c1565b6101b56115aa565b6101626004803603604081101561038d5760008061038a6118e5565b50505b50803590602001356001600160a01b031661181a565b6101ee611855565b6103da600480360360208110156103ca576000806103c76118e5565b50505b50356001600160a01b0316611879565b604051808660028111156103ea57fe5b81526020018563ffffffff1681526020018481526020018381526020018281526020019550505050505060405180910390f35b600060016001600160a01b0383166000908152600160205260409020600090610444611950565b906101000a900460ff16600281111561045957fe5b1492915050565b62093a8081565b600061049960405160408082019052601181527027ab26afa33930bab22b32b934b334b2b960791b6020820152610ab7565b6001600160a01b031663b48ec82086866040516001600160e01b031960e085901b1681526004810192909252602482015260440160206040518083038186806104e06119ab565b1580156104f5576000806104f26118e5565b50505b505a6104ff6119f7565b505050505015801561051e573d6000803e3d600061051b6118e5565b50505b505050506040513d602081101561053d5760008061053a6118e5565b50505b81019080805193505050505a610551611ae2565b6001600160a01b0316816001600160a01b031614604051608081016040526051808252611d7460208301399061060e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156105ca5780820151838201526020016105b2565b50505050905090810190601f1680156105f75780820380516001836020036101000a031916815260200191505b50925050506040518091039061060b6118e5565b50505b50600085815260026020528290604090206001016000828261062e611950565b01925050819061063c611b28565b505050600085815260026020528290604090206001600160a01b03851660009081526002919091016020526040902060008282610677611950565b019250508190610685611b28565b5050505050505050565b6001600160a01b0381166000908152600160205260408120905062093a80816001016106b9611950565b015a6106c3611b76565b101560405160608101604052602e808252611df760208301399061076e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561072a578082015183820152602001610712565b50505050905090810190601f1680156107575780820380516001836020036101000a031916815260200191505b50925050506040518091039061076b6118e5565b50505b5060008160020161077d611950565b6000818152600260205290915060408120905060008161079b611950565b906101000a900460ff1660405160608101604052603e808252611c8360208301399061084e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561080a5780820151838201526020016107f2565b50505050905090810190601f1680156108375780820380516001836020036101000a031916815260200191505b50925050506040518091039061084b6118e5565b50505b5060008160010161085d611950565b6002028260020160005a61086f611ae2565b6001600160a01b03166001600160a01b03168152602001908152602001600020610897611950565b670de0b6b3a764000002816108a857fe5b04905060008260020160005a6108bc611ae2565b6001600160a01b03166001600160a01b0316815260200190815260200160002081906108e6611b28565b5050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb5a610921611ae2565b836040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381600087806109636119ab565b158015610978576000806109756118e5565b50505b505a610982611bbc565b5050505050501580156109a2573d6000803e3d600061099f6118e5565b50505b505050506040513d60208110156109c1576000806109be6118e5565b50505b81019080805192506040915050518060400160405280602081526020017f426f6e644d616e616765723a20436f756c64206e6f7420706f737420626f6e6481525090610a915760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a50578082015183820152602001610a38565b50505050905090810190601f168015610a7d5780820380516001836020036101000a031916815260200191505b5092505050604051809103906106856118e5565b505050505050565b600080610aa4611950565b906101000a90046001600160a01b031681565b60008080610ac3611950565b906101000a90046001600160a01b03166001600160a01b031663bf40fac1836040518263ffffffff1660e01b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b2e578082015183820152602001610b16565b50505050905090810190601f168015610b5b5780820380516001836020036101000a031916815260200191505b50925050506020604051808303818680610b736119ab565b158015610b8857600080610b856118e5565b50505b505a610b926119f7565b5050505050158015610bb1573d6000803e3d6000610bae6118e5565b50505b505050506040513d6020811015610bd057600080610bcd6118e5565b50505b81019080805195945050505050565b60026020528060005260406000209050600081610bfa611950565b906101000a900460ff169080600101610c11611950565b905082565b610c4660405160408082019052601181527027ab26afa33930bab22b32b934b334b2b960791b6020820152610ab7565b6001600160a01b03165a610c58611ae2565b6001600160a01b03161460405160608101604052603b808252611e4f602083013990610d0b5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610cc7578082015183820152602001610caf565b50505050905090810190601f168015610cf45780820380516001836020036101000a031916815260200191505b509250505060405180910390610d086118e5565b50505b506000838152600260205260409020600090610d25611950565b60ff6101009290920a9004161560405160808101604052604b808252611d02602083013990610ddb5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d97578082015183820152602001610d7f565b50505050905090810190601f168015610dc45780820380516001836020036101000a031916815260200191505b509250505060405180910390610dd86118e5565b50505b506000838152600260205260019060409020600181610df8611950565b8160ff02191690831515021790610e0d611b28565b5050506001600160a01b0382166000908152600160205260408120905080600101610e36611950565b610e7c575a610e43611b76565b8060018301610e50611b28565b50505083816002018190610e62611b28565b50505081816003018190610e74611b28565b505050610ed6565b62093a8081600101610e8c611950565b015a610e96611b76565b108015610ead575080600301610eaa611950565b82105b15610ed657838060028301610ec0611b28565b50505081816003018190610ed2611b28565b5050505b600181610ee1611950565b63ffffffff6101009290920a90041615801590610f1f575062093a808201600182610f0a611950565b906101000a900463ffffffff1663ffffffff16115b8015610f4a57506002600082610f33611950565b906101000a900460ff166002811115610f4857fe5b145b15610f555750610f86565b600081600181610f63611950565b8160ff02191690836002811115610f7657fe5b021790610f81611b28565b505050505b505050565b670de0b6b3a764000081565b6000600160005a610fa6611ae2565b6001600160a01b03166001600160a01b031681526020019081526020016000209050600181610fd3611950565b63ffffffff6101009290920a90041615604051606081016040526027808252611d4d60208301399061108c5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611048578082015183820152602001611030565b50505050905090810190601f1680156110755780820380516001836020036101000a031916815260200191505b5092505050604051809103906110896118e5565b50505b50600160008261109a611950565b906101000a900460ff1660028111156110af57fe5b1460405160608101604052602a808252611e256020830139906111595760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156111155780820151838201526020016110fd565b50505050905090810190601f1680156111425780820380516001836020036101000a031916815260200191505b5092505050604051809103906111566118e5565b50505b50600281600181611168611950565b8160ff0219169083600281111561117b57fe5b021790611186611b28565b5050505a611192611b76565b816101008161119f611950565b8163ffffffff021916908363ffffffff160217906111bb611b28565b50505050565b6000600160005a6111d0611ae2565b6001600160a01b03166001600160a01b03168152602001908152602001600020905062093a80600182611201611950565b906101000a900463ffffffff1663ffffffff16015a61121e611b76565b1015604051606081016040526032808252611dc56020830139906112c95760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561128557808201518382015260200161126d565b50505050905090810190601f1680156112b25780820380516001836020036101000a031916815260200191505b5092505050604051809103906112c66118e5565b50505b5060026000826112d7611950565b906101000a900460ff1660028111156112ec57fe5b14604051608081016040526041808252611cc16020830139906113965760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561135257808201518382015260200161133a565b50505050905090810190601f16801561137f5780820380516001836020036101000a031916815260200191505b5092505050604051809103906113936118e5565b50505b506000816001816113a5611950565b8160ff021916908360028111156113b857fe5b0217906113c3611b28565b5060009150829050610100816113d7611950565b8163ffffffff021916908363ffffffff160217906113f3611b28565b5050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb5a61142e611ae2565b670de0b6b3a76400006040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381600087806114786119ab565b15801561148d5760008061148a6118e5565b50505b505a611497611bbc565b5050505050501580156114b7573d6000803e3d60006114b46118e5565b50505b505050506040513d60208110156114d6576000806114d36118e5565b50505b81019080805192506040915050518060400160405280602081526020017f426f6e644d616e616765723a20436f756c64206e6f7420706f737420626f6e64815250906115a65760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561156557808201518382015260200161154d565b50505050905090810190601f1680156115925780820380516001836020036101000a031916815260200191505b5092505050604051809103906111bb6118e5565b5050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166323b872dd5a6115e2611ae2565b5a63996d79a5598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051925060005b604081101561163857600082820152602001611621565b505050670de0b6b3a76400006040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529190921660248201526044810191909152606401602060405180830381600087806116916119ab565b1580156116a6576000806116a36118e5565b50505b505a6116b0611bbc565b5050505050501580156116d0573d6000803e3d60006116cd6118e5565b50505b505050506040513d60208110156116ef576000806116ec6118e5565b50505b81019080805192506040915050518060400160405280602081526020017f426f6e644d616e616765723a20436f756c64206e6f7420706f737420626f6e64815250906117c25760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561177e578082015183820152602001611766565b50505050905090810190601f1680156117ab5780820380516001836020036101000a031916815260200191505b5092505050604051809103906117bf6118e5565b50505b5060018060005a6117d1611ae2565b6001600160a01b03166001600160a01b031681526020019081526020016000206001816117fc611950565b8160ff0219169083600281111561180f57fe5b021790610f86611b28565b60008281526002602052604081206001600160a01b03831660009081526002919091016020526040902061184c611950565b90505b92915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60016020528060005260406000209050600081611894611950565b60ff6101009290920a900416906001816118ac611950565b906101000a900463ffffffff1690806001016118c6611950565b90806002016118d3611950565b90806003016118e0611950565b905085565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561191d578086015182820160400152602001611902565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015610f8657600082820152602001611994565b638435035b598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020611994565b638540661f598160e01b8152611a28565b808083111561184f575090919050565b808083101561184f575090919050565b836004820152846024820152606060448201528660648201526084810160005b88811015611a60578088015182820152602001611a48565b506060828960a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8b8b82606087013350600060045af15059611ab58d3d611a18565b8c01611ac18187611a08565b5b82811015611ad65760008152602001611ac2565b50929c50505050505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020611994565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b600081526020611994565b63bdbf8c36598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020611994565b6385979f76598160e01b8152836004820152846024820152606060448201528760648201526084810160005b89811015611c00578089015182820152602001611be8565b506060828a60a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8c8c82606087013350600060045af15059611c558e3d611a18565b8d01611c618187611a08565b5b82811015611c765760008152602001611c62565b50929d5050505050505056fe426f6e644d616e616765723a2043616e6e6f7420636c61696d207965742e2044697370757465206d7573742062652066696e616c697a6564206669727374426f6e644d616e616765723a2043616e6e6f742066696e616c697a65207769746864726177616c2c20796f752070726f6261626c7920676f7420736c6173686564426f6e644d616e616765723a2046726175642070726f6f6620666f722074686973207072652d737461746520726f6f742068617320616c7265616479206265656e2066696e616c697a6564426f6e644d616e616765723a205769746864726177616c20616c72656164792070656e64696e67426f6e644d616e616765723a204f6e6c7920746865207472616e736974696f6e657220666f722074686973207072652d737461746520726f6f74206d61792063616c6c20746869732066756e6374696f6e426f6e644d616e616765723a20546f6f206561726c7920746f2066696e616c697a6520796f7572207769746864726177616c426f6e644d616e616765723a205761697420666f72206f7468657220706f74656e7469616c206469737075746573426f6e644d616e616765723a2057726f6e6720626f6e6420737461746520666f722070726f706f736572426f6e644d616e616765723a204f6e6c7920746865206672617564207665726966696572206d61792063616c6c20746869732066756e6374696f6e";
