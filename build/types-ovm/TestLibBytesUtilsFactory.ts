/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { TestLibBytesUtils } from "./TestLibBytesUtils";

export class TestLibBytesUtilsFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TestLibBytesUtils> {
    return super.deploy(overrides || {}) as Promise<TestLibBytesUtils>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestLibBytesUtils {
    return super.attach(address) as TestLibBytesUtils;
  }
  connect(signer: Signer): TestLibBytesUtilsFactory {
    return super.connect(signer) as TestLibBytesUtilsFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLibBytesUtils {
    return new Contract(address, _abi, signerOrProvider) as TestLibBytesUtils;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_preBytes",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "_postBytes",
        type: "bytes"
      }
    ],
    name: "concat",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "_other",
        type: "bytes"
      }
    ],
    name: "equal",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      }
    ],
    name: "fromNibbles",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_length",
        type: "uint256"
      }
    ],
    name: "slice",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_length",
        type: "uint256"
      }
    ],
    name: "sliceWithTaintedMemory",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      }
    ],
    name: "toBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      }
    ],
    name: "toNibbles",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes"
      }
    ],
    name: "toUint256",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156100195760008061001661001f565b50505b5061008a565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561005757808601518282016040015260200161003c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b611286806100996000396000f3fe6080604052348015610019576000806100166105db565b50505b50600436106100915760003560e01c8063c6fa7f7a11610064578063c6fa7f7a1461011b578063cf89ee171461012e578063e004139614610141578063efa739761461015457610091565b8063235266d21461009f57806347f53431146100c85780635f3376f3146100e8578063bd37c8aa14610108575b60008061009c6105db565b50505b6100b26100ad3660046107a7565b610167565b6040516100bf91906108ae565b60405180910390f35b6100db6100d6366004610762565b61017a565b6040516100bf91906108b9565b6100fb6100f63660046107a7565b61018d565b6040516100bf91906108c2565b6100db610116366004610762565b6101b9565b6100fb610129366004610762565b6101c4565b6100fb61013c366004610823565b6101cf565b6100fb61014f366004610823565b610220565b6100fb610162366004610762565b61022d565b60006101738383610238565b9392505050565b600061018582610252565b90505b919050565b606082826040516020016101a2929190610881565b604051602081830303815290604052905092915050565b60006101858261017a565b60606101858261029a565b60606040516101dd90610646565b6040518091039060006101ee610653565b50508015801561020b573d6000803e3d60006102086105db565b50505b505061021884848461039a565b949350505050565b606061021884848461039a565b606061018582610503565b600081805190602001208380519060200120149392505050565b600060208251101561026e576000602083015191506101889050565b602082018251602081101561028b576000806102886105db565b50505b81019080805195945050505050565b60606000825160020267ffffffffffffffff811180156102c2576000806102bf6105db565b50505b50604051818152601f19601f83011681016020016040529080156102ed576020820181803683370190505b50905060005b835181101561039357600484828151811061030a57fe5b60200101516001600160f81b031916901c82600283028151811061032a57fe5b60200101906001600160f81b031916908160001a905350601084828151811061034f57fe5b602001015160f81c8161035e57fe5b0660f81b82826002026001018151811061037457fe5b60200101906001600160f81b031916908160001a9053506001016102f3565b5092915050565b60608182601f0110156103ed5760405162461bcd60e51b815260206004820152600e60248201526d736c6963655f6f766572666c6f7760901b6044820152606401604051809103906103ea6105db565b50505b82828401101561043d5760405162461bcd60e51b815260206004820152600e60248201526d736c6963655f6f766572666c6f7760901b60448201526064016040518091039061043a6105db565b50505b818301845110156104915760405162461bcd60e51b8152602060048201526011602482015270736c6963655f6f75744f66426f756e647360781b60448201526064016040518091039061048e6105db565b50505b6060821580156104b057604051915060008252602082016040526104fa565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156104e95780518352602092830192016104d1565b5050858452601f01601f1916604052505b50949350505050565b60606000600283518161051257fe5b0467ffffffffffffffff811180156105325760008061052f6105db565b50505b50604051818152601f19601f830116810160200160405290801561055d576020820181803683370190505b50905060005b81518110156103935783816002026001018151811061057e57fe5b60200101516001600160f81b031916600485600284028151811061059e57fe5b60200101516001600160f81b031916901b178282815181106105bc57fe5b60200101906001600160f81b031916908160001a905350600101610563565b632a2a7adb598160e01b8152600481016020815285602082015260005b868110156106135780860151828201604001526020016105f8565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6109608061092683390190565b6314aa2ff7598160e01b8152600481016020815286602082015260005b8781101561068b578087015182820160400152602001610670565b506020828860640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8151965059825b818110156106d457600081526020016106c0565b5050505050565b600082601f8301126106f45780816106f16105db565b50505b813567ffffffffffffffff8082111561070957fe5b604051601f8301601f19168101602001828111828210171561072757fe5b6040528281528483016020018610156107475783846107446105db565b50505b82602086016020830137918201602001929092529392505050565b60006020828403121561077c5780816107796105db565b50505b813567ffffffffffffffff81111561079b5781826107986105db565b50505b610218848285016106db565b600080604083850312156107c25780816107bf6105db565b50505b823567ffffffffffffffff808211156107e25782836107df6105db565b50505b6107ee868387016106db565b9350602085013591508082111561080c5782836108096105db565b50505b50610819858286016106db565b9150509250929050565b60008060006060848603121561084057808161083d6105db565b50505b833567ffffffffffffffff81111561085f57818261085c6105db565b50505b61086b868287016106db565b9660208601359650604090950135949350505050565b600083516108938184602088016108f5565b820183516108a58183602088016108f5565b01949350505050565b901515815260200190565b90815260200190565b60006020825282518060208401526108e18160408501602087016108f5565b601f01601f19169190910160400192915050565b60005b838110156109105780820151838201526020016108f8565b8381111561091f576000848401525b5050505056fe60806040523480156100195760008061001661001f565b50505b5061008a565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561005757808601518282016040015260200161003c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6108c7806100996000396000f3fe608060405234801561001957600080610016610768565b50505b50600436106100a75760003560e01c806340c10f191161006f57806340c10f19146101f457806370a082311461022b57806395d89b411461025a578063a9059cbb14610262578063dd62ed3e14610297576100a7565b806306fdde03146100b5578063095ea7b31461013457806318160ddd1461017d57806323b872dd14610197578063313ce567146101d6575b6000806100b2610768565b50505b6100bd6102ce565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100f95780820151838201526020016100e1565b50505050905090810190601f1680156101265780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101696004803603604081101561015357600080610150610768565b50505b506001600160a01b0381351690602001356102ec565b604051901515815260200160405180910390f35b61018561030b565b60405190815260200160405180910390f35b610169600480360360608110156101b6576000806101b3610768565b50505b506001600160a01b03813581169160208101359091169060400135610318565b6101de610428565b60405160ff909116815260200160405180910390f35b6102296004803603604081101561021357600080610210610768565b50505b506001600160a01b03813516906020013561042d565b005b6101856004803603602081101561024a57600080610247610768565b50505b50356001600160a01b03166104dd565b6100bd6104f5565b610169600480360360408110156102815760008061027e610768565b50505b506001600160a01b038135169060200135610512565b610185600480360360408110156102b6576000806102b3610768565b50505b506001600160a01b0381358116916020013516610527565b60405160408082019052600481526315195cdd60e21b602082015281565b60006103015a6102fa6107d3565b848461054d565b5060015b92915050565b600061031561082d565b81565b6001600160a01b038316600090815260026020526000196040822060005a61033e6107d3565b6001600160a01b03166001600160a01b0316815260200190815260200160002061036661082d565b14610413576001600160a01b038416600090815260026020526103c29083906040902060005a6103946107d3565b6001600160a01b03166001600160a01b031681526020019081526020016000206103bc61082d565b906105d9565b6001600160a01b038516600090815260026020526040902060005a6103e56107d3565b6001600160a01b03166001600160a01b03168152602001908152602001600020819061040f610879565b5050505b61041e848484610636565b5060019392505050565b601281565b61044181600061043b61082d565b90610718565b80600061044c610879565b5050506001600160a01b038216600090815260016020526104759082906040902061043b61082d565b6001600160a01b03831660009081526001602052604090208190610497610879565b5050506001600160a01b03821660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a35050565b6001602052806000526040600020905061031561082d565b6040516040808201905260038152621514d560ea1b602082015281565b60006103015a6105206107d3565b8484610636565b60026020528160005260406000206020528060005260406000209150610315905061082d565b6001600160a01b038316600090815260026020528190604090206001600160a01b038416600090815260209190915260409020819061058a610879565b505050816001600160a01b0316836001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405190815260200160405180910390a3505050565b808203828111156103055760405162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b60448201526064016040518091039061062e610768565b505092915050565b6001600160a01b0383166000908152600160205261065c908290604090206103bc61082d565b6001600160a01b0384166000908152600160205260409020819061067e610879565b5050506001600160a01b038216600090815260016020526106a79082906040902061043b61082d565b6001600160a01b038316600090815260016020526040902081906106c9610879565b505050816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a3505050565b808201828110156103055760405162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b60448201526064016040518091039061062e5b632a2a7adb598160e01b8152600481016020815285602082015260005b868110156107a0578086015182820160400152602001610785565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b604081101561082857600082820152602001610811565b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020610811565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b60008152602061081156";
