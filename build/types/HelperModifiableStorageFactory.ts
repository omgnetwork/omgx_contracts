/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { HelperModifiableStorage } from "./HelperModifiableStorage";

export class HelperModifiableStorageFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _target: string,
    overrides?: Overrides
  ): Promise<HelperModifiableStorage> {
    return super.deploy(_target, overrides || {}) as Promise<
      HelperModifiableStorage
    >;
  }
  getDeployTransaction(
    _target: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_target, overrides || {});
  }
  attach(address: string): HelperModifiableStorage {
    return super.attach(address) as HelperModifiableStorage;
  }
  connect(signer: Signer): HelperModifiableStorageFactory {
    return super.connect(signer) as HelperModifiableStorageFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelperModifiableStorage {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as HelperModifiableStorage;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    stateMutability: "nonpayable",
    type: "fallback"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "__getStorageSlot",
    outputs: [
      {
        internalType: "bytes32",
        name: "_value",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_value",
        type: "bytes32"
      }
    ],
    name: "__setStorageSlot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516101a03803806101a08339818101604052602081101561003357600080fd5b505130600090815260208190526040902080546001600160a01b039092166001600160a01b031990921691909117905561012e806100726000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806365358e20146100c55780639bc98dab146100f4575b3060009081526020819052604080822054905182916001600160a01b031690829036908083838082843760405192019450600093509091505080830381855af49150503d80600081146100a5576040519150601f19603f3d011682016040523d82523d6000602084013e6100aa565b606091505b509150915081156100bd57805160208201f35b805160208201fd5b6100e2600480360360208110156100db57600080fd5b5035610119565b60408051918252519081900360200190f35b6101176004803603604081101561010a57600080fd5b508035906020013561011d565b005b5490565b905556fea164736f6c6343000706000a";
