/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmL2ToL1MessagePasser } from "./OvmL2ToL1MessagePasser";

export class OvmL2ToL1MessagePasserFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OvmL2ToL1MessagePasser> {
    return super.deploy(overrides || {}) as Promise<OvmL2ToL1MessagePasser>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OvmL2ToL1MessagePasser {
    return super.attach(address) as OvmL2ToL1MessagePasser;
  }
  connect(signer: Signer): OvmL2ToL1MessagePasserFactory {
    return super.connect(signer) as OvmL2ToL1MessagePasserFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmL2ToL1MessagePasser {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OvmL2ToL1MessagePasser;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "L2ToL1Message",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes"
      }
    ],
    name: "passMessageToL1",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "sentMessages",
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
  "0x608060405234801561001057600080fd5b506101e5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806382e3702d1461003b578063cafa81dc1461006c575b600080fd5b6100586004803603602081101561005157600080fd5b5035610114565b604080519115158252519081900360200190f35b6101126004803603602081101561008257600080fd5b81019060208101813564010000000081111561009d57600080fd5b8201836020820111156100af57600080fd5b803590602001918460018302840111640100000000831117156100d157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610129945050505050565b005b60006020819052908152604090205460ff1681565b600160008083336040516020018083805190602001908083835b602083106101625780518252601f199092019160209182019101610143565b6001836020036101000a038019825116818451168082178552505050505050905001826001600160a01b031660601b81526014019250505060405160208183030381529060405280519060200120815260200190815260200160002060006101000a81548160ff0219169083151502179055505056fea164736f6c6343000706000a";
