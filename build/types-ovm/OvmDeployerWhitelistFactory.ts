/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmDeployerWhitelist } from "./OvmDeployerWhitelist";

export class OvmDeployerWhitelistFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OvmDeployerWhitelist> {
    return super.deploy(overrides || {}) as Promise<OvmDeployerWhitelist>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OvmDeployerWhitelist {
    return super.attach(address) as OvmDeployerWhitelist;
  }
  connect(signer: Signer): OvmDeployerWhitelistFactory {
    return super.connect(signer) as OvmDeployerWhitelistFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmDeployerWhitelist {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OvmDeployerWhitelist;
  }
}

const _abi = [
  {
    inputs: [],
    name: "allowArbitraryDeployment",
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
    name: "enableArbitraryContractDeployment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_allowArbitraryDeployment",
        type: "bool"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "initialized",
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
    inputs: [
      {
        internalType: "address",
        name: "_deployer",
        type: "address"
      }
    ],
    name: "isDeployerAllowed",
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
    inputs: [],
    name: "owner",
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
    inputs: [
      {
        internalType: "bool",
        name: "_allowArbitraryDeployment",
        type: "bool"
      }
    ],
    name: "setAllowArbitraryDeployment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deployer",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_isWhitelisted",
        type: "bool"
      }
    ],
    name: "setWhitelistedDeployer",
    outputs: [],
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
    name: "whitelist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156100195760008061001661001f565b50505b5061008a565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561005757808601518282016040015260200161003c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6107e9806100996000396000f3fe60806040523480156100195760008061001661064f565b50505b50600436106100a75760003560e01c80638da5cb5b1161006f5780638da5cb5b146101785780639b19251a1461019c578063b1540a01146101cb578063bdc7b54f146101fa578063d533887a14610202576100a7565b806308fd6322146100b557806313af4035146100ee578063158ef93e1461011d578063400ada75146101395780637ec630dd14610170575b6000806100b261064f565b50505b6100ec600480360360408110156100d4576000806100d161064f565b50505b506001600160a01b038135169060200135151561022a565b005b6100ec6004803603602081101561010d5760008061010a61064f565b50505b50356001600160a01b03166102e7565b61012561039b565b604051901515815260200160405180910390f35b6100ec600480360360408110156101585760008061015561064f565b50505b506001600160a01b03813516906020013515156103b3565b610125610461565b61018061046d565b6040516001600160a01b03909116815260200160405180910390f35b610125600480360360208110156101bb576000806101b861064f565b50505b50356001600160a01b031661048c565b610125600480360360208110156101ea576000806101e761064f565b50505b50356001600160a01b03166104a6565b6100ec61051d565b6100ec600480360360208110156102215760008061021e61064f565b50505b503515156105af565b600260006102366106ba565b906101000a90046001600160a01b03166001600160a01b03165a61025861071a565b6001600160a01b0316146102a65760405162461bcd60e51b815260040180806020018281038252603a8152602001806107af603a9139604001915050604051809103906102a361064f565b50505b6001600160a01b038216600090815260016020528190604090206001816102cb6106ba565b8160ff021916908315150217906102e0610760565b5050505050565b600260006102f36106ba565b906101000a90046001600160a01b03166001600160a01b03165a61031561071a565b6001600160a01b0316146103635760405162461bcd60e51b815260040180806020018281038252603a8152602001806107af603a91396040019150506040518091039061036061064f565b50505b80600062010000816103736106ba565b816001600160a01b0302191690836001600160a01b0316021790610395610760565b50505050565b6000806103a66106ba565b906101000a900460ff1681565b6000806103be6106ba565b906101000a900460ff1615156001151514156103d95761045d565b6001600081816103e76106ba565b8160ff021916908315150217906103fc610760565b50505080600060016101000a816104116106ba565b8160ff02191690831515021790610426610760565b50505081600060026101000a8161043b6106ba565b816001600160a01b0302191690836001600160a01b03160217906102e0610760565b5050565b600160006103a66106ba565b600260006104796106ba565b906101000a90046001600160a01b031681565b6001602052806000526040600020600091506103a66106ba565b600080806104b26106ba565b60ff6101009290920a90041615806104e35750600160006104d16106ba565b906101000a900460ff16151560011515145b8061051757506001600160a01b038216600090815260016020526040902060009061050c6106ba565b906101000a900460ff165b92915050565b600260006105296106ba565b906101000a90046001600160a01b03166001600160a01b03165a61054b61071a565b6001600160a01b0316146105995760405162461bcd60e51b815260040180806020018281038252603a8152602001806107af603a91396040019150506040518091039061059661064f565b50505b6105a360016105af565b6105ad60006102e7565b565b600260006105bb6106ba565b906101000a90046001600160a01b03166001600160a01b03165a6105dd61071a565b6001600160a01b03161461062b5760405162461bcd60e51b815260040180806020018281038252603a8152602001806107af603a91396040019150506040518091039061062861064f565b50505b8060006101008161063a6106ba565b8160ff02191690831515021790610395610760565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561068757808601518282016040015260200161066c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015610715576000828201526020016106fe565b505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b805160008252935060206106fe565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b6000815260206106fe56fe46756e6374696f6e2063616e206f6e6c792062652063616c6c656420627920746865206f776e6572206f66207468697320636f6e74726163742e";
