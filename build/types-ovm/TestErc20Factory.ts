/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { TestErc20 } from "./TestErc20";

export class TestErc20Factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TestErc20> {
    return super.deploy(overrides || {}) as Promise<TestErc20>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestErc20 {
    return super.attach(address) as TestErc20;
  }
  connect(signer: Signer): TestErc20Factory {
    return super.connect(signer) as TestErc20Factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestErc20 {
    return new Contract(address, _abi, signerOrProvider) as TestErc20;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowance",
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
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156100195760008061001661001f565b50505b5061008a565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561005757808601518282016040015260200161003c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6108c7806100996000396000f3fe608060405234801561001957600080610016610768565b50505b50600436106100a75760003560e01c806340c10f191161006f57806340c10f19146101f457806370a082311461022b57806395d89b411461025a578063a9059cbb14610262578063dd62ed3e14610297576100a7565b806306fdde03146100b5578063095ea7b31461013457806318160ddd1461017d57806323b872dd14610197578063313ce567146101d6575b6000806100b2610768565b50505b6100bd6102ce565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100f95780820151838201526020016100e1565b50505050905090810190601f1680156101265780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101696004803603604081101561015357600080610150610768565b50505b506001600160a01b0381351690602001356102ec565b604051901515815260200160405180910390f35b61018561030b565b60405190815260200160405180910390f35b610169600480360360608110156101b6576000806101b3610768565b50505b506001600160a01b03813581169160208101359091169060400135610318565b6101de610428565b60405160ff909116815260200160405180910390f35b6102296004803603604081101561021357600080610210610768565b50505b506001600160a01b03813516906020013561042d565b005b6101856004803603602081101561024a57600080610247610768565b50505b50356001600160a01b03166104dd565b6100bd6104f5565b610169600480360360408110156102815760008061027e610768565b50505b506001600160a01b038135169060200135610512565b610185600480360360408110156102b6576000806102b3610768565b50505b506001600160a01b0381358116916020013516610527565b60405160408082019052600481526315195cdd60e21b602082015281565b60006103015a6102fa6107d3565b848461054d565b5060015b92915050565b600061031561082d565b81565b6001600160a01b038316600090815260026020526000196040822060005a61033e6107d3565b6001600160a01b03166001600160a01b0316815260200190815260200160002061036661082d565b14610413576001600160a01b038416600090815260026020526103c29083906040902060005a6103946107d3565b6001600160a01b03166001600160a01b031681526020019081526020016000206103bc61082d565b906105d9565b6001600160a01b038516600090815260026020526040902060005a6103e56107d3565b6001600160a01b03166001600160a01b03168152602001908152602001600020819061040f610879565b5050505b61041e848484610636565b5060019392505050565b601281565b61044181600061043b61082d565b90610718565b80600061044c610879565b5050506001600160a01b038216600090815260016020526104759082906040902061043b61082d565b6001600160a01b03831660009081526001602052604090208190610497610879565b5050506001600160a01b03821660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a35050565b6001602052806000526040600020905061031561082d565b6040516040808201905260038152621514d560ea1b602082015281565b60006103015a6105206107d3565b8484610636565b60026020528160005260406000206020528060005260406000209150610315905061082d565b6001600160a01b038316600090815260026020528190604090206001600160a01b038416600090815260209190915260409020819061058a610879565b505050816001600160a01b0316836001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405190815260200160405180910390a3505050565b808203828111156103055760405162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b60448201526064016040518091039061062e610768565b505092915050565b6001600160a01b0383166000908152600160205261065c908290604090206103bc61082d565b6001600160a01b0384166000908152600160205260409020819061067e610879565b5050506001600160a01b038216600090815260016020526106a79082906040902061043b61082d565b6001600160a01b038316600090815260016020526040902081906106c9610879565b505050816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a3505050565b808201828110156103055760405162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b60448201526064016040518091039061062e5b632a2a7adb598160e01b8152600481016020815285602082015260005b868110156107a0578086015182820160400152602001610785565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b604081101561082857600082820152602001610811565b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020610811565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b60008152602061081156";
