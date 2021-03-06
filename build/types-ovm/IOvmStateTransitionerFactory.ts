/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import { IOvmStateTransitioner } from "./IOvmStateTransitioner";

export class IOvmStateTransitionerFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOvmStateTransitioner {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IOvmStateTransitioner;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address"
      }
    ],
    name: "AccountCommitted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "ContractStorageCommitted",
    type: "event"
  },
  {
    inputs: [
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
      }
    ],
    name: "applyTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ovmContractAddress",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "_stateTrieWitness",
        type: "bytes"
      }
    ],
    name: "commitContractState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ovmContractAddress",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "_storageTrieWitness",
        type: "bytes"
      }
    ],
    name: "commitStorageSlot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "completeTransition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getPostStateRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "_postStateRoot",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPreStateRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "_preStateRoot",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isComplete",
    outputs: [
      {
        internalType: "bool",
        name: "_complete",
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
        name: "_ovmContractAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "_ethContractAddress",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "_stateTrieWitness",
        type: "bytes"
      }
    ],
    name: "proveContractState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ovmContractAddress",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "_storageTrieWitness",
        type: "bytes"
      }
    ],
    name: "proveStorageSlot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
