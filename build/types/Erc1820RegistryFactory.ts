/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { Erc1820Registry } from "./Erc1820Registry";

export class Erc1820RegistryFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Erc1820Registry> {
    return super.deploy(overrides || {}) as Promise<Erc1820Registry>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Erc1820Registry {
    return super.attach(address) as Erc1820Registry;
  }
  connect(signer: Signer): Erc1820RegistryFactory {
    return super.connect(signer) as Erc1820RegistryFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Erc1820Registry {
    return new Contract(address, _abi, signerOrProvider) as Erc1820Registry;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "interfaceHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "implementer",
        type: "address"
      }
    ],
    name: "InterfaceImplementerSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newManager",
        type: "address"
      }
    ],
    name: "ManagerChanged",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_interfaceHash",
        type: "bytes32"
      }
    ],
    name: "getInterfaceImplementer",
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
        internalType: "address",
        name: "_addr",
        type: "address"
      }
    ],
    name: "getManager",
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
        internalType: "address",
        name: "_contract",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4"
      }
    ],
    name: "implementsERC165Interface",
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
        name: "_contract",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4"
      }
    ],
    name: "implementsERC165InterfaceNoCache",
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
        internalType: "string",
        name: "_interfaceName",
        type: "string"
      }
    ],
    name: "interfaceHash",
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
        internalType: "address",
        name: "_addr",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_interfaceHash",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "_implementer",
        type: "address"
      }
    ],
    name: "setInterfaceImplementer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address"
      },
      {
        internalType: "address",
        name: "_newManager",
        type: "address"
      }
    ],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address"
      },
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4"
      }
    ],
    name: "updateERC165Cache",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506108c1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a41e7d511161005b578063a41e7d51146101b7578063aabbb8ca146101ed578063b705676514610219578063f712f3e81461026357610088565b806329965a1d1461008d5780633d584063146100c55780635df8122f1461010757806365ba36c114610135575b600080fd5b6100c3600480360360608110156100a357600080fd5b506001600160a01b03813581169160208101359160409091013516610299565b005b6100eb600480360360208110156100db57600080fd5b50356001600160a01b0316610501565b604080516001600160a01b039092168252519081900360200190f35b6100c36004803603604081101561011d57600080fd5b506001600160a01b038135811691602001351661054b565b6101a56004803603602081101561014b57600080fd5b81019060208101813564010000000081111561016657600080fd5b82018360208201111561017857600080fd5b8035906020019184600183028401116401000000008311171561019a57600080fd5b509092509050610624565b60408051918252519081900360200190f35b6100c3600480360360408110156101cd57600080fd5b5080356001600160a01b031690602001356001600160e01b03191661065f565b6100eb6004803603604081101561020357600080fd5b506001600160a01b0381351690602001356106dc565b61024f6004803603604081101561022f57600080fd5b5080356001600160a01b031690602001356001600160e01b031916610753565b604080519115158252519081900360200190f35b61024f6004803603604081101561027957600080fd5b5080356001600160a01b031690602001356001600160e01b0319166107f5565b60006001600160a01b038416156102b057836102b2565b335b9050336102be82610501565b6001600160a01b03161461030b576040805162461bcd60e51b815260206004820152600f60248201526e2737ba103a34329036b0b730b3b2b960891b604482015290519081900360640190fd5b61031483610873565b15610366576040805162461bcd60e51b815260206004820152601a60248201527f4d757374206e6f7420626520616e204552433136352068617368000000000000604482015290519081900360640190fd5b6001600160a01b0382161580159061038757506001600160a01b0382163314155b1561049d57604051602001808073455243313832305f4143434550545f4d4147494360601b815250601401905060405160208183030381529060405280519060200120826001600160a01b031663249cb3fa85846040518363ffffffff1660e01b815260040180838152602001826001600160a01b031681526020019250505060206040518083038186803b15801561041f57600080fd5b505afa158015610433573d6000803e3d6000fd5b505050506040513d602081101561044957600080fd5b50511461049d576040805162461bcd60e51b815260206004820181905260248201527f446f6573206e6f7420696d706c656d656e742074686520696e74657266616365604482015290519081900360640190fd5b6001600160a01b0381811660008181526020818152604080832088845290915280822080546001600160a01b0319169487169485179055518692917f93baa6efbd2244243bfee6ce4cfdd1d04fc4c0e9a786abd3a41313bd352db15391a450505050565b6001600160a01b03818116600090815260016020526040812054909116610529575080610546565b506001600160a01b03808216600090815260016020526040902054165b919050565b3361055583610501565b6001600160a01b0316146105a2576040805162461bcd60e51b815260206004820152600f60248201526e2737ba103a34329036b0b730b3b2b960891b604482015290519081900360640190fd5b816001600160a01b0316816001600160a01b0316146105c157806105c4565b60005b6001600160a01b0383811660008181526001602052604080822080546001600160a01b0319169585169590951790945592519184169290917f605c2dbf762e5f7d60a546d42e7205dcb1b011ebc62a61736a57c9089d3a43509190a35050565b600082826040516020018083838082843780830192505050925050506040516020818303038152906040528051906020012090505b92915050565b6106698282610753565b610674576000610676565b815b6001600160a01b039283166000818152602081815260408083206001600160e01b03199690961680845295825280832080546001600160a01b0319169590971694909417909555908152600284528181209281529190925220805460ff19166001179055565b6000806001600160a01b038416156106f457836106f6565b335b905061070183610873565b15610727578261071182826107f5565b61071c57600061071e565b815b92505050610659565b6001600160a01b0390811660009081526020818152604080832086845290915290205416905092915050565b60008080610768856301ffc9a760e01b610880565b9092509050811580610778575080155b1561078857600092505050610659565b61079a856001600160e01b0319610880565b90925090508115806107ab57508015155b156107bb57600092505050610659565b6107c58585610880565b90925090506001821480156107da5750806001145b156107ea57600192505050610659565b506000949350505050565b6001600160a01b03821660009081526002602090815260408083206001600160e01b03198516845290915281205460ff1661083b576108348383610753565b9050610659565b506001600160a01b038083166000818152602081815260408083206001600160e01b0319871684529091529020549091161492915050565b6001600160e01b03161590565b6040516301ffc9a760e01b8082526004820183905260009182919060208160248189617530fa90519096909550935050505056fea164736f6c6343000706000a";
