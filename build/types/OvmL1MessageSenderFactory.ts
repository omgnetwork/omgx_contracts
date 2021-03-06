/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmL1MessageSender } from "./OvmL1MessageSender";

export class OvmL1MessageSenderFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OvmL1MessageSender> {
    return super.deploy(overrides || {}) as Promise<OvmL1MessageSender>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OvmL1MessageSender {
    return super.attach(address) as OvmL1MessageSender;
  }
  connect(signer: Signer): OvmL1MessageSenderFactory {
    return super.connect(signer) as OvmL1MessageSenderFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmL1MessageSender {
    return new Contract(address, _abi, signerOrProvider) as OvmL1MessageSender;
  }
}

const _abi = [
  {
    inputs: [],
    name: "getL1MessageSender",
    outputs: [
      {
        internalType: "address",
        name: "_l1MessageSender",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060c58061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063d203410614602d575b600080fd5b6033604f565b604080516001600160a01b039092168252519081900360200190f35b6000336001600160a01b0316639dc9dc936040518163ffffffff1660e01b815260040160206040518083038186803b158015608957600080fd5b505afa158015609c573d6000803e3d6000fd5b505050506040513d602081101560b157600080fd5b505190509056fea164736f6c6343000706000a";
