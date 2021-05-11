/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { HelperTestRunner } from "./HelperTestRunner";

export class HelperTestRunnerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<HelperTestRunner> {
    return super.deploy(overrides || {}) as Promise<HelperTestRunner>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): HelperTestRunner {
    return super.attach(address) as HelperTestRunner;
  }
  connect(signer: Signer): HelperTestRunnerFactory {
    return super.connect(signer) as HelperTestRunnerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelperTestRunner {
    return new Contract(address, _abi, signerOrProvider) as HelperTestRunner;
  }
}

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "functionName",
            type: "string"
          },
          {
            internalType: "bytes",
            name: "functionData",
            type: "bytes"
          },
          {
            internalType: "bool",
            name: "expectedReturnStatus",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "expectedReturnData",
            type: "bytes"
          },
          {
            internalType: "bool",
            name: "onlyValidateFlag",
            type: "bool"
          }
        ],
        internalType: "struct Helper_TestRunner.TestStep[]",
        name: "_steps",
        type: "tuple[]"
      }
    ],
    name: "runMultipleTestSteps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "functionName",
            type: "string"
          },
          {
            internalType: "bytes",
            name: "functionData",
            type: "bytes"
          },
          {
            internalType: "bool",
            name: "expectedReturnStatus",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "expectedReturnData",
            type: "bytes"
          },
          {
            internalType: "bool",
            name: "onlyValidateFlag",
            type: "bool"
          }
        ],
        internalType: "struct Helper_TestRunner.TestStep",
        name: "_step",
        type: "tuple"
      }
    ],
    name: "runSingleTestStep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156100195760008061001661001f565b50505b5061008a565b632a2a7adb598160e01b8152600481016020815285602082015260005b8681101561005757808601518282016040015260200161003c565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6113b9806100996000396000f3fe608060405234801561001957600080610016610c20565b50505b506004361061003f5760003560e01c806343f9f27d1461004d578063dd9e289014610062575b60008061004a610c20565b50505b61006061005b3660046110a8565b610075565b005b610060610070366004610ff4565b610829565b6000815160405160200161008991906111a9565b6040516020818303038152906040528051906020012090507fd520c32600de53b7dabdeb8833d4032fad0423f6c5aa0b9894a37847f14aeab78114156100da57600082602001519050805160208201f35b7fd4acac49d3184c9a5b5f58547241b7636cd672b4b3b7f2e5c529da12642a460581141561011d57600082602001519050805160208201610119610c20565b5050505b7fdbc7aada9d0fca4e11b6085e53b2397a57db73c97c73323d769a387d1519013981141561014757fe5b6000805a610153610c8b565b6001600160a01b0316846020015160405161016e91906111a9565b6000604051808303816000865a610183610ce5565b5050505050509150503d80600081146101b8576040513d603f01601f191681016040523d815291503d6000602084013e6101bd565b606091505b509150915083604001511515821515146103cb576001821515141561027d576101fb604051608081016040526046808252611373602083013961085d565b61022e6040516040808201905260128152714f6666656e64696e6720537465703a20257360701b60208201528551610909565b61025960405160408082019052600c81526b2932ba3ab937102230ba309d60a11b602082015261085d565b61026281610a1c565b610278604051602081016040526000815261085d565b6103c3565b60008060008061028c85610ac5565b93509350935093506102b36040516080810160405260468082526112eb602083013961085d565b6102e66040516040808201905260128152714f6666656e64696e6720537465703a20257360701b60208201528951610909565b61030e604051604080820190526008815267466c61673a20257360c01b602082015285610b17565b6103436040516040808201905260158152744e756973616e636520476173204c6566743a20257360581b602082015284610b17565b6103756040516040808201905260128152714f564d2047617320526566756e643a20257360701b602082015283610b17565b61039f60405160408082019052600b81526a22bc3a3930902230ba309d60a91b602082015261085d565b6103a881610a1c565b6103be604051602081016040526000815261085d565b505050505b6103cb610bc8565b83606001518051906020012081805190602001201461080d57600182151514156104c85761040e60405160608101604052603d8082526112ae602083013961085d565b6104416040516040808201905260128152714f6666656e64696e6720537465703a20257360701b60208201528551610909565b61046960405160408082019052600981526822bc3832b1ba32b21d60b91b602082015261085d565b6104768460600151610a1c565b61049c60405160408082019052600781526620b1ba3ab0b61d60c91b602082015261085d565b6104a581610a1c565b6104bb604051602081016040526000815261085d565b6104c3610bc8565b61080d565b6000806000806104db8860600151610ac5565b93509350935093506000806000806104f289610ac5565b93509350935093508b60800151156105ca578388146105c55761052a604051608081016040526042808252611331602083013961085d565b61055d6040516040808201905260128152714f6666656e64696e6720537465703a20257360701b60208201528d51610909565b61058e604051604080820190526011815270457870656374656420466c61673a20257360781b602082015289610b17565b6105bd60405160408082019052600f81526e41637475616c20466c61673a20257360881b602082015285610b17565b6105c5610bc8565b610804565b6105e9604051608081016040526047808252611267602083013961085d565b61061c6040516040808201905260128152714f6666656e64696e6720537465703a20257360701b60208201528d51610909565b61064d604051604080820190526011815270457870656374656420466c61673a20257360781b602082015289610b17565b61067c60405160408082019052600f81526e41637475616c20466c61673a20257360881b602082015285610b17565b6106b960405160408082019052601e81527f4578706563746564204e756973616e636520476173204c6566743a2025730000602082015288610b17565b6106f660405160408082019052601c81527f41637475616c204e756973616e636520476173204c6566743a20257300000000602082015284610b17565b61073360405160408082019052601b81527f4578706563746564204f564d2047617320526566756e643a2025730000000000602082015287610b17565b61077060405160408082019052601981527f41637475616c204f564d2047617320526566756e643a20257300000000000000602082015283610b17565b6107a360405160408082019052601481527322bc3832b1ba32b21022bc3a3930902230ba309d60611b602082015261085d565b6107ac85610a1c565b6107dd60405160408082019052601281527120b1ba3ab0b61022bc3a3930902230ba309d60711b602082015261085d565b6107e681610a1c565b6107fc604051602081016040526000815261085d565b610804610bc8565b50505050505050505b8161082357805160208201610820610c20565b50505b50505050565b60005b81518110156108595761085182828151811061084457fe5b6020026020010151610075565b60010161082c565b5050565b610906816040516024018080602001828103825283818151815260200191508051906020019080838360005b838110156108a1578082015183820152602001610889565b50505050905090810190601f1680156108ce5780820380516001836020036101000a031916815260200191505b5092505050604051601f1981830301815260409190915263104c13eb60e21b6020820180516001600160e01b03169091179052610bef565b50565b6108598282604051602401808060200180602001838103835285818151815260200191508051906020019080838360005b8381101561095257808201518382015260200161093a565b50505050905090810190601f16801561097f5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156109b557808201518382015260200161099d565b50505050905090810190601f1680156109e25780820380516001836020036101000a031916815260200191505b50945050505050604051601f19818303018152604091909152634b5c427760e01b6020820180516001600160e01b03169091179052610bef565b610906816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015610a60578082015183820152602001610a48565b50505050905090810190601f168015610a8d5780820380516001836020036101000a031916815260200191505b5092505050604051601f198183030181526040919091526305f3bfab60e11b6020820180516001600160e01b03169091179052610bef565b600080600060608451610af4576000806000604051806020016040528060008152509350935093509350610b10565b602085018551810190610b0791906110f5565b93509350935093505b9193509193565b61085982826040516024018080602001838152602001828103825284818151815260200191508051906020019080838360005b83811015610b62578082015183820152602001610b4a565b50505050905090810190601f168015610b8f5780820380516001836020036101000a031916815260200191505b509350505050604051601f198183030181526040919091526309710a9d60e41b6020820180516001600160e01b03169091179052610bef565b60405162461bcd60e51b8152600401610be0906111c5565b60405180910390610859610c20565b6000815190506a636f6e736f6c652e6c6f67602083016000808483855a610c14610dd2565b50505050505050505050565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015610c58578086015182820160400152602001610c3d565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015610ce057600082820152602001610cc9565b505050565b6385979f76598160e01b8152610d18565b8080831115610d025750815b92915050565b8080831015610d02575090919050565b836004820152846024820152606060448201528760648201526084810160005b89811015610d50578089015182820152602001610d38565b506060828a60a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8c8c82606087013350600060045af15059610da58e3d610d08565b8d01610db18187610cf6565b5b82811015610dc65760008152602001610db2565b50929d50505050505050565b638540661f598160e01b8152836004820152846024820152606060448201528660648201526084810160005b88811015610e16578088015182820152602001610dfe565b506060828960a40184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b815160408301513d6000853e8b8b82606087013350600060045af15059610e6b8d3d610d08565b8c01610e778187610cf6565b5b82811015610e8c5760008152602001610e78565b50929c50505050505050565b80358015158114610eb157600080610eae610c20565b50505b919050565b600082601f830112610ecf578081610ecc610c20565b50505b8135610ee2610edd82611218565b6111f0565b818152846020838601011115610eff578283610efc610c20565b50505b816020850160208301379081016020019190915292915050565b600060a08284031215610f33578081610f30610c20565b50505b610f3d60a06111f0565b9050813567ffffffffffffffff80821115610f6057600080610f5d610c20565b50505b610f6c85838601610eb6565b83526020840135915080821115610f8b57600080610f88610c20565b50505b610f9785838601610eb6565b6020840152610fa860408501610e98565b60408401526060840135915080821115610fca57600080610fc7610c20565b50505b50610fd784828501610eb6565b606083015250610fe960808301610e98565b608082015292915050565b6000602080838503121561100f57818261100c610c20565b50505b823567ffffffffffffffff8082111561102f57838461102c610c20565b50505b818501915085601f83011261104b578384611048610c20565b50505b81358181111561105757fe5b61106484858302016111f0565b8181528481019250838501865b8381101561109a576110888a888435890101610f19565b85529386019390860190600101611071565b509098975050505050505050565b6000602082840312156110c25780816110bf610c20565b50505b813567ffffffffffffffff8111156110e15781826110de610c20565b50505b6110ed84828501610f19565b949350505050565b60008060008060808587031215611113578283611110610c20565b50505b845193506020850151925060408501519150606085015167ffffffffffffffff811115611147578182611144610c20565b50505b8501601f8101871361116057818261115d610c20565b50505b805161116e610edd82611218565b81815288602083850101111561118b578384611188610c20565b50505b61119c82602083016020860161123a565b9598949750929550505050565b600082516111bb81846020870161123a565b9190910192915050565b6020808252601190820152702a32b9ba1039ba32b8103330b4b632b21760791b604082015260600190565b6000604051905081810181811067ffffffffffffffff8211171561121057fe5b604052919050565b600067ffffffffffffffff82111561122c57fe5b50601f01601f191660200190565b60005b8381101561125557808201518382015260200161123d565b83811115610823575050600091015256fe4552524f523a2041637475616c2072657665727420666c6167206461746120646f6573206e6f74206d617463682065787065637465642072657665727420666c616720646174614552524f523a2041637475616c2072657475726e206461746120646f6573206e6f74206d617463682065787065637465642072657475726e20646174614552524f523a2045787065637465642066756e6374696f6e20746f2072657475726e207375636365737366756c6c792c206275742066756e6374696f6e2072657665727465644552524f523a2041637475616c2072657665727420666c616720646f6573206e6f74206d617463682065787065637465642072657665727420666c616720646174614552524f523a2045787065637465642066756e6374696f6e20746f207265766572742c206275742066756e6374696f6e2072657475726e6564207375636365737366756c6c79";
