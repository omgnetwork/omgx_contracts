/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { LibResolvedDelegateProxy } from "./LibResolvedDelegateProxy";

export class LibResolvedDelegateProxyFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _libAddressManager: string,
    _implementationName: string,
    overrides?: Overrides
  ): Promise<LibResolvedDelegateProxy> {
    return super.deploy(
      _libAddressManager,
      _implementationName,
      overrides || {}
    ) as Promise<LibResolvedDelegateProxy>;
  }
  getDeployTransaction(
    _libAddressManager: string,
    _implementationName: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _libAddressManager,
      _implementationName,
      overrides || {}
    );
  }
  attach(address: string): LibResolvedDelegateProxy {
    return super.attach(address) as LibResolvedDelegateProxy;
  }
  connect(signer: Signer): LibResolvedDelegateProxyFactory {
    return super.connect(signer) as LibResolvedDelegateProxyFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibResolvedDelegateProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LibResolvedDelegateProxy;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address"
      },
      {
        internalType: "string",
        name: "_implementationName",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516103df3803806103df8339818101604052604081101561003357600080fd5b81516020830180516040519294929383019291908464010000000082111561005a57600080fd5b90830190602082018581111561006f57600080fd5b825164010000000081118282018810171561008957600080fd5b82525081516020918201929091019080838360005b838110156100b657818101518382015260200161009e565b50505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b5060409081523060009081526001602090815282822080546001600160a01b0319166001600160a01b038a16179055818152919020855161012c95509093509085019150610134565b5050506101d5565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261016a57600085556101b0565b82601f1061018357805160ff19168380011785556101b0565b828001600101855582156101b0579182015b828111156101b0578251825591602001919060010190610195565b506101bc9291506101c0565b5090565b5b808211156101bc57600081556001016101c1565b6101fb806101e46000396000f3fe60806040818152306000908152600160208181528383205483825293832063bf40fac160e01b909552608490815284546002610100938216159390930260001901169190910460a481905291936001600160a01b039093169263bf40fac192909190819060c490849080156100b55780601f1061008a576101008083540402835291602001916100b5565b820191906000526020600020905b81548152906001019060200180831161009857829003601f168201915b50509250505060206040518083038186803b1580156100d357600080fd5b505afa1580156100e7573d6000803e3d6000fd5b505050506040513d60208110156100fd57600080fd5b505190506001600160a01b0381166101465760405162461bcd60e51b81526004018080602001828103825260238152602001806101cc6023913960400191505060405180910390fd5b600080826001600160a01b03166000366040518083838082843760405192019450600093509091505080830381855af49150503d80600081146101a5576040519150601f19603f3d011682016040523d82523d6000602084013e6101aa565b606091505b509092509050600182151514156101c357805160208201f35b805160208201fdfe5461726765742061646472657373206d75737420626520696e697469616c697a65642ea164736f6c6343000706000a";
