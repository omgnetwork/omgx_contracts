/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { HelperSimpleProxy } from "./HelperSimpleProxy";

export class HelperSimpleProxyFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<HelperSimpleProxy> {
    return super.deploy(overrides || {}) as Promise<HelperSimpleProxy>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): HelperSimpleProxy {
    return super.attach(address) as HelperSimpleProxy;
  }
  connect(signer: Signer): HelperSimpleProxyFactory {
    return super.connect(signer) as HelperSimpleProxyFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelperSimpleProxy {
    return new Contract(address, _abi, signerOrProvider) as HelperSimpleProxy;
  }
}

const _abi = [
  {
    inputs: [],
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
        internalType: "address",
        name: "_target",
        type: "address"
      }
    ],
    name: "setTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556101e9806100326000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063776d1a0114610077575b60015460408051602036601f8101829004820283018201909352828252610075936001600160a01b0316926000918190840183828082843760009201919091525061009d92505050565b005b6100756004803603602081101561008d57600080fd5b50356001600160a01b031661015c565b600080836001600160a01b0316836040518082805190602001908083835b602083106100da5780518252601f1990920191602091820191016100bb565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461013c576040519150601f19603f3d011682016040523d82523d6000602084013e610141565b606091505b5091509150811561015457805160208201f35b805160208201fd5b6000546001600160a01b031633141561018f57600180546001600160a01b0319166001600160a01b0383161790556101d9565b60015460408051602036601f81018290048202830182019093528282526101d9936001600160a01b0316926000918190840183828082843760009201919091525061009d92505050565b5056fea164736f6c6343000706000a";
