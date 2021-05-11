/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { TestLibBytes32Utils } from "./TestLibBytes32Utils";

export class TestLibBytes32UtilsFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TestLibBytes32Utils> {
    return super.deploy(overrides || {}) as Promise<TestLibBytes32Utils>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestLibBytes32Utils {
    return super.attach(address) as TestLibBytes32Utils;
  }
  connect(signer: Signer): TestLibBytes32UtilsFactory {
    return super.connect(signer) as TestLibBytes32UtilsFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestLibBytes32Utils {
    return new Contract(address, _abi, signerOrProvider) as TestLibBytes32Utils;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_in",
        type: "address"
      }
    ],
    name: "fromAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "_out",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_in",
        type: "bool"
      }
    ],
    name: "fromBool",
    outputs: [
      {
        internalType: "bytes32",
        name: "_out",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_in",
        type: "bytes32"
      }
    ],
    name: "toAddress",
    outputs: [
      {
        internalType: "address",
        name: "_out",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_in",
        type: "bytes32"
      }
    ],
    name: "toBool",
    outputs: [
      {
        internalType: "bool",
        name: "_out",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063341f6623146100515780638f03f7fd1461008a578063934e03a4146100bb578063b72e717d146100ec575b600080fd5b61006e6004803603602081101561006757600080fd5b5035610112565b604080516001600160a01b039092168252519081900360200190f35b6100a9600480360360208110156100a057600080fd5b50351515610123565b60408051918252519081900360200190f35b6100d8600480360360208110156100d157600080fd5b503561012e565b604080519115158252519081900360200190f35b6100a96004803603602081101561010257600080fd5b50356001600160a01b0316610139565b600061011d82610144565b92915050565b600061011d82610147565b600061011d82610161565b600061011d82610166565b90565b600081610155576000610158565b60015b60ff1692915050565b151590565b6001600160a01b03169056fea164736f6c6343000706000a";