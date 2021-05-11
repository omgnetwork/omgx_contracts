/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmSafetyChecker } from "./OvmSafetyChecker";

export class OvmSafetyCheckerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OvmSafetyChecker> {
    return super.deploy(overrides || {}) as Promise<OvmSafetyChecker>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OvmSafetyChecker {
    return super.attach(address) as OvmSafetyChecker;
  }
  connect(signer: Signer): OvmSafetyCheckerFactory {
    return super.connect(signer) as OvmSafetyCheckerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmSafetyChecker {
    return new Contract(address, _abi, signerOrProvider) as OvmSafetyChecker;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytecode",
        type: "bytes"
      }
    ],
    name: "isBytecodeSafe",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061034a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a44eb59a14610030575b600080fd5b6100d66004803603602081101561004657600080fd5b81019060208101813564010000000081111561006157600080fd5b82018360208201111561007357600080fd5b8035906020019184600183028401116401000000008311171561009557600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506100ea945050505050565b604080519115158252519081900360200190f35b60408051610100810182527e0101010101010101010101000000000101010101010101010101010101000081526b010101010101000000010100600160f81b016020808301919091526f0101010100000001010101010000000092820192909252630203040560e01b60608201527f0101010101010101010101010101010101010101010101010101010101010101608082015264010101010160d81b60a0820152600060c0820181905260e0820181905283519092741fffffffff000000000f8f000063f000013fff0ffe916a40000000000000000000026117ff60f31b039163ffffffff60601b1991870181019087015b8051600081811a880151811a82811a890151821a0182811a890151821a0182811a890151821a0182811a890151821a0182811a89015190911a01918201911a6001811b86811661032057808516610239575001605d1901610326565b80861661027e575b8280600101935050825160001a915081605b141561025e57610279565b6001821b851661027157918101605e1901915b838310610241575b610320565b816033141561030f578251602084015160d81c673350600060045af160c083901c14156102b057600885019450610306565b817f336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a0157601480156102e357508064016000f35b145b156102f357602585019450610306565b60009a5050505050505050505050610338565b50505050610326565b600098505050505050505050610338565b50506001015b8181106101dd57600196505050505050505b91905056fea164736f6c6343000706000a";
