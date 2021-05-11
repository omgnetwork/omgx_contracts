/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { HelperGasMeasurer } from "./HelperGasMeasurer";

export class HelperGasMeasurerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<HelperGasMeasurer> {
    return super.deploy(overrides || {}) as Promise<HelperGasMeasurer>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): HelperGasMeasurer {
    return super.attach(address) as HelperGasMeasurer;
  }
  connect(signer: Signer): HelperGasMeasurerFactory {
    return super.connect(signer) as HelperGasMeasurerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelperGasMeasurer {
    return new Contract(address, _abi, signerOrProvider) as HelperGasMeasurer;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "measureCallGas",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101af806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063df0495a114610030575b600080fd5b6100e66004803603604081101561004657600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561007157600080fd5b82018360208201111561008357600080fd5b803590602001918460018302840111640100000000831117156100a557600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506100f8945050505050565b60408051918252519081900360200190f35b8051600090819081906020850190825a9450600080838560008c5af190505a9350806101555760405162461bcd60e51b81526004018080602001828103825260418152602001806101626041913960600191505060405180910390fd5b5050509003939250505056fe43616c6c206661696c65642c206275742063616c6c732077652077616e7420746f206d6561737572652067617320666f722073686f756c64207375636365656421a164736f6c6343000706000a";