/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmChainStorageContainer } from "./OvmChainStorageContainer";

export class OvmChainStorageContainerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _libAddressManager: string,
    _owner: string,
    overrides?: Overrides
  ): Promise<OvmChainStorageContainer> {
    return super.deploy(_libAddressManager, _owner, overrides || {}) as Promise<
      OvmChainStorageContainer
    >;
  }
  getDeployTransaction(
    _libAddressManager: string,
    _owner: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _libAddressManager,
      _owner,
      overrides || {}
    );
  }
  attach(address: string): OvmChainStorageContainer {
    return super.attach(address) as OvmChainStorageContainer;
  }
  connect(signer: Signer): OvmChainStorageContainerFactory {
    return super.connect(signer) as OvmChainStorageContainerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmChainStorageContainer {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OvmChainStorageContainer;
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
        name: "_owner",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256"
      },
      {
        internalType: "bytes27",
        name: "_globalMetadata",
        type: "bytes27"
      }
    ],
    name: "deleteElementsAfterInclusive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256"
      }
    ],
    name: "deleteElementsAfterInclusive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256"
      }
    ],
    name: "get",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getGlobalMetadata",
    outputs: [
      {
        internalType: "bytes27",
        name: "",
        type: "bytes27"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "length",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "libAddressManager",
    outputs: [
      {
        internalType: "contract Lib_AddressManager",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_object",
        type: "bytes32"
      },
      {
        internalType: "bytes27",
        name: "_globalMetadata",
        type: "bytes27"
      }
    ],
    name: "push",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_object",
        type: "bytes32"
      }
    ],
    name: "push",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      }
    ],
    name: "resolve",
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
        internalType: "bytes27",
        name: "_globalMetadata",
        type: "bytes27"
      }
    ],
    name: "setGlobalMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256"
      }
    ],
    name: "setNextOverwritableIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200116438038062001164833981810160405260408110156200003757600080fd5b8151602083018051604051929492938301929190846401000000008211156200005f57600080fd5b9083019060208201858111156200007557600080fd5b82516401000000008111828201881017156200009057600080fd5b82525081516020918201929091019080838360005b83811015620000bf578181015183820152602001620000a5565b50505050905090810190601f168015620000ed5780820380516001836020036101000a031916815260200191505b506040525050600080546001600160a01b0319166001600160a01b038516179055508051620001249060019060208401906200012d565b505050620001d9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620001655760008555620001b0565b82601f106200018057805160ff1916838001178555620001b0565b82800160010185558215620001b0579182015b82811115620001b057825182559160200191906001019062000193565b50620001be929150620001c2565b5090565b5b80821115620001be5760008155600101620001c3565b610f7b80620001e96000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80634651d91e116100715780634651d91e1461021a5780638da5cb5b146102375780639507d39a146102b4578063b298e36b146102d1578063ccf8f969146102ee578063fa9e936c14610311576100b4565b8063167fd681146100b95780631f7b6d32146100e65780632015276c1461010057806329061de21461012b578063299ca47814610150578063461a447814610174575b600080fd5b6100e4600480360360408110156100cf57600080fd5b508035906020013564ffffffffff191661032e565b005b6100ee610423565b60408051918252519081900360200190f35b6100e46004803603604081101561011657600080fd5b508035906020013564ffffffffff191661043b565b6100e46004803603602081101561014157600080fd5b503564ffffffffff19166104f7565b6101586105b5565b604080516001600160a01b039092168252519081900360200190f35b6101586004803603602081101561018a57600080fd5b8101906020810181356401000000008111156101a557600080fd5b8201836020820111156101b757600080fd5b803590602001918460018302840111640100000000831117156101d957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506105c4945050505050565b6100e46004803603602081101561023057600080fd5b50356106a0565b61023f61075b565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610279578181015183820152602001610261565b50505050905090810190601f1680156102a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100ee600480360360208110156102ca57600080fd5b50356107e8565b6100e4600480360360208110156102e757600080fd5b5035610802565b6102f66108bd565b6040805164ffffffffff199092168252519081900360200190f35b6100e46004803603602081101561032757600080fd5b50356108ce565b60018054604080516020601f6002600019610100878916150201909516949094049384018190048102820181019092528281526103c493909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b820191906000526020600020905b81548152906001019060200180831161039d57829003601f168201915b50505050506105c4565b6001600160a01b0316336001600160a01b0316146104135760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b61041f60028383610983565b5050565b600061042f6002610a75565b64ffffffffff16905090565b60018054604080516020601f60026000196101008789161502019095169490940493840181900481028201810190925282815261049c93909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b6001600160a01b0316336001600160a01b0316146104eb5760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b61041f60028383610a89565b60018054604080516020601f60026000196101008789161502019095169490940493840181900481028201810190925282815261055893909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b6001600160a01b0316336001600160a01b0316146105a75760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b6105b2600282610b90565b50565b6000546001600160a01b031681565b6000805460405163bf40fac160e01b81526020600482018181528551602484015285516001600160a01b039094169363bf40fac19387938392604490920191908501908083838b5b8381101561062457818101518382015260200161060c565b50505050905090810190601f1680156106515780820380516001836020036101000a031916815260200191505b509250505060206040518083038186803b15801561066e57600080fd5b505afa158015610682573d6000803e3d6000fd5b505050506040513d602081101561069857600080fd5b505192915050565b60018054604080516020601f60026000196101008789161502019095169490940493840181900481028201810190925282815261070193909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b6001600160a01b0316336001600160a01b0316146107505760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b6105b2600282610bba565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107e05780601f106107b5576101008083540402835291602001916107e0565b820191906000526020600020905b8154815290600101906020018083116107c357829003601f168201915b505050505081565b60006107fc600264ffffffffff8416610be0565b92915050565b60018054604080516020601f60026000196101008789161502019095169490940493840181900481028201810190925282815261086393909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b6001600160a01b0316336001600160a01b0316146108b25760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b6105b2600282610de9565b60006108c96002610e0f565b905090565b60018054604080516020601f60026000196101008789161502019095169490940493840181900481028201810190925282815261092f93909290918301828280156103ba5780601f1061038f576101008083540402835291602001916103ba565b6001600160a01b0316336001600160a01b03161461097e5760405162461bcd60e51b8152600401808060200182810382526044815260200180610f2b6044913960600191505060405180910390fd5b600855565b600061098e84610e26565b9050806000015164ffffffffff168364ffffffffff161080156109c35750806060015164ffffffffff168364ffffffffff1610155b610a0b576040805162461bcd60e51b815260206004820152601460248201527324b73232bc1037baba1037b3103137bab732399760611b604482015290519081900360640190fd5b806080015164ffffffffff168364ffffffffff161015610a4d576040810180516000190167ffffffffffffffff169052606081015164ffffffffff1660808201525b64ffffffffff8316815264ffffffffff1982166020820152610a6f8482610e86565b50505050565b600080610a8183610e26565b519392505050565b6000610a9484610e26565b90506000610ab9826040015167ffffffffffffffff1686610edc90919063ffffffff16565b8054909150610ac757601081555b8054608083015183510364ffffffffff1610610b3e578460060154826080015164ffffffffff161015610b365760408201805160010167ffffffffffffffff169081905260808301805164ffffffffff90811660608601528451169052610b2f908690610edc565b9050610b3e565b805460020281555b608082015182510364ffffffffff9081166000818152600184810160209081526040909220889055855101909216845264ffffffffff19851691840191909152610b888684610e86565b505050505050565b6000610b9b83610e26565b64ffffffffff19831660208201529050610bb58382610e86565b505050565b6000610bc583610e26565b9050610bb5828260200151856109839092919063ffffffff16565b600080610bec84610e26565b805190915064ffffffffff168310610c42576040805162461bcd60e51b815260206004820152601460248201527324b73232bc1037baba1037b3103137bab732399760611b604482015290519081900360640190fd5b6000610c65826040015167ffffffffffffffff1686610edc90919063ffffffff16565b90506000610c8d836040015160010167ffffffffffffffff1687610edc90919063ffffffff16565b9050826080015164ffffffffff168510610d1a576080830151825464ffffffffff9091168603908110610cfe576040805162461bcd60e51b815260206004820152601460248201527324b73232bc1037baba1037b3103137bab732399760611b604482015290519081900360640190fd5b6000908152600190920160205250604090205491506107fc9050565b6080830151606084015164ffffffffff9182168781039290911610610d7d576040805162461bcd60e51b815260206004820152601460248201527324b73232bc1037baba1037b3103137bab732399760611b604482015290519081900360640190fd5b8154811115610dca576040805162461bcd60e51b815260206004820152601460248201527324b73232bc1037baba1037b3103137bab732399760611b604482015290519081900360640190fd5b81540360009081526001909101602052604090205492506107fc915050565b6000610df483610e26565b9050610bb582826020015185610a899092919063ffffffff16565b600080610e1b83610e26565b602001519392505050565b610e2e610efc565b5080546001909101546040805160a08101825264ffffffffff808516825264ffffffffff19909416602082015267ffffffffffffffff8316818301529082901c8316606082015260689190911c909116608082015290565b80516020820151604080840151606085015160808601518754858717969483901b8417606883901b1795939291908714610ebe578689555b85896001015414610ed157600189018690555b505050505050505050565b60006002820615610ef05782600401610ef5565b826002015b9392505050565b6040805160a0810182526000808252602082018190529181018290526060810182905260808101919091529056fe4f564d5f436861696e53746f72616765436f6e7461696e65723a2046756e6374696f6e2063616e206f6e6c792062652063616c6c656420627920746865206f776e65722ea164736f6c6343000706000a";