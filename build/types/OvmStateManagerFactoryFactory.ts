/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { OvmStateManagerFactory } from "./OvmStateManagerFactory";

export class OvmStateManagerFactoryFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OvmStateManagerFactory> {
    return super.deploy(overrides || {}) as Promise<OvmStateManagerFactory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OvmStateManagerFactory {
    return super.attach(address) as OvmStateManagerFactory;
  }
  connect(signer: Signer): OvmStateManagerFactoryFactory {
    return super.connect(signer) as OvmStateManagerFactoryFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OvmStateManagerFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OvmStateManagerFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "create",
    outputs: [
      {
        internalType: "contract iOVM_StateManager",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506113e5806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80639ed9331814610030575b600080fd5b6100566004803603602081101561004657600080fd5b50356001600160a01b0316610072565b604080516001600160a01b039092168252519081900360200190f35b600081604051610081906100b5565b6001600160a01b03909116815260405190819003602001906000f0801580156100ae573d6000803e3d6000fd5b5092915050565b611316806100c38339019056fe608060405234801561001057600080fd5b5060405161131638038061131683398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610082565b600060208284031215610065578081fd5b81516001600160a01b038116811461007b578182fd5b9392505050565b611285806100916000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c80638f3b96471161010f578063d126199f116100a2578063e90abb8611610071578063e90abb86146103f9578063fb37b31c1461040c578063fbcbc0f11461041f578063fcf149a21461043f576101f0565b8063d126199f146103b8578063d15d4150146103cb578063d54414c8146103de578063d7bd4a2a146103f1576101f0565b8063c3fd9b25116100de578063c3fd9b2514610377578063c7650bf21461037f578063c8e40fbf14610392578063d0a215f2146103a5576101f0565b80638f3b96471461033657806399056ba914610349578063af37b86414610351578063af3dc01114610364576101f0565b806333f94305116101875780636f3c75af116101565780636f3c75af146102f55780637c8ee703146103085780637e86faa81461031b5780638da5cb5b1461032e576101f0565b806333f94305146102b25780635c17d629146102ba5780636b18e4e8146102cd5780636c87ad20146102e0576101f0565b8063167020d2116101c3578063167020d2146102595780631aaf392f1461026c5780631b208a5a1461028c57806326dc5b121461029f576101f0565b806307a12945146101f55780630ad226791461021e57806311b1f790146102315780631381ba4d14610244575b600080fd5b61020861020336600461101d565b610452565b60405161021591906111c4565b60405180910390f35b61020861022c366004611072565b6104ba565b61020861023f36600461101d565b610517565b61025761025236600461101d565b610573565b005b61020861026736600461101d565b6105d4565b61027f61027a366004611072565b610679565b60405161021591906111cf565b61020861029a36600461101d565b610727565b61027f6102ad36600461101d565b61075e565b61025761077d565b6102576102c836600461109b565b6107c7565b6102576102db36600461101d565b61089a565b6102e8610944565b60405161021591906111b0565b610208610303366004611072565b610953565b6102e861031636600461101d565b61098c565b610208610329366004611072565b6109ad565b6102e86109c3565b6102576103443660046110cd565b6109d2565b61027f610a88565b61020861035f366004611072565b610a8e565b610208610372366004611072565b610ae2565b610257610b2f565b61020861038d366004611072565b610b79565b6102086103a036600461101d565b610c20565b6102576103b3366004611037565b610c40565b61027f6103c636600461101d565b610cb9565b6102086103d936600461101d565b610cd4565b6102086103ec36600461101d565b610d01565b61027f610d16565b610257610407366004611072565b610d1c565b61020861041a36600461101d565b610d77565b61043261042d36600461101d565b610dc3565b604051610215919061122e565b61025761044d36600461101d565b610e37565b6001600160a01b0381166000908152600260205260408120600301547fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4701480156104b257506001600160a01b038216600090815260026020526040902054155b90505b919050565b6001600160a01b038216600090815260046020908152604080832084845290915281205460ff168061050e57506001600160a01b038316600090815260026020526040902060040154600160a01b900460ff165b90505b92915050565b600080546001600160a01b031633148061053b57506001546001600160a01b031633145b6105605760405162461bcd60e51b8152600401610557906111d8565b60405180910390fd5b6104b261056c83610ef8565b6002610f28565b6000546001600160a01b031633148061059657506001546001600160a01b031633145b6105b25760405162461bcd60e51b8152600401610557906111d8565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b600080546001600160a01b03163314806105f857506001546001600160a01b031633145b6106145760405162461bcd60e51b8152600401610557906111d8565b600061061f83610ef8565b9050600260008281526005602052604090205460ff16600381111561064057fe5b1461064f5760009150506104b5565b6000908152600560205260409020805460ff19166003179055505060068054600019019055600190565b6001600160a01b038216600090815260046020908152604080832084845290915281205460ff161580156106cf57506001600160a01b038316600090815260026020526040902060040154600160a01b900460ff165b156106dc57506000610511565b506001600160a01b0391909116600090815260036020908152604080832093835292905220547ffeedfacecafebeeffeedfacecafebeeffeedfacecafebeeffeedfacecafebeef1890565b60008061073383610ef8565b905060025b60008281526005602052604090205460ff16600381111561075557fe5b10159392505050565b6001600160a01b03166000908152600260208190526040909120015490565b6000546001600160a01b03163314806107a057506001546001600160a01b031633145b6107bc5760405162461bcd60e51b8152600401610557906111d8565b600680546001019055565b6000546001600160a01b03163314806107ea57506001546001600160a01b031633145b6108065760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b038316600081815260036020908152604080832086845282528083207ffeedfacecafebeeffeedfacecafebeeffeedfacecafebeeffeedfacecafebeef86189055928252600481528282208583529052205460ff16610895576001600160a01b03831660009081526004602090815260408083208584529091529020805460ff191660011790555b505050565b6000546001600160a01b03163314806108bd57506001546001600160a01b031633145b6108d95760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b031660009081526002602081905260409091207f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421918101919091557fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470600390910155565b6001546001600160a01b031681565b6000806109608484610f8e565b905060025b60008281526005602052604090205460ff16600381111561098257fe5b1015949350505050565b6001600160a01b039081166000908152600260205260409020600401541690565b6000806109ba8484610f8e565b90506003610965565b6000546001600160a01b031681565b6000546001600160a01b03163314806109f557506001546001600160a01b031633145b610a115760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b039182166000908152600260208181526040928390208451815590840151600182015591830151908201556060820151600382015560808201516004909101805460a0909301516001600160a01b0319909316919093161760ff60a01b1916600160a01b91151591909102179055565b60075490565b600080546001600160a01b0316331480610ab257506001546001600160a01b031633145b610ace5760405162461bcd60e51b8152600401610557906111d8565b61050e610adb8484610f8e565b6001610f28565b600080546001600160a01b0316331480610b0657506001546001600160a01b031633145b610b225760405162461bcd60e51b8152600401610557906111d8565b61050e61056c8484610f8e565b6000546001600160a01b0316331480610b5257506001546001600160a01b031633145b610b6e5760405162461bcd60e51b8152600401610557906111d8565b600780546001019055565b600080546001600160a01b0316331480610b9d57506001546001600160a01b031633145b610bb95760405162461bcd60e51b8152600401610557906111d8565b6000610bc58484610f8e565b9050600260008281526005602052604090205460ff166003811115610be657fe5b14610bf5576000915050610511565b6000908152600560205260409020805460ff1916600317905550506007805460001901905550600190565b6001600160a01b0316600090815260026020526040902060030154151590565b6000546001600160a01b0316331480610c6357506001546001600160a01b031633145b610c7f5760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b0392831660009081526002602052604090206004810180546001600160a01b031916939094169290921790925560030155565b6001600160a01b031660009081526002602052604090205490565b600080546001600160a01b03838116911614806104b25750506001546001600160a01b0390811691161490565b600080610d0d83610ef8565b90506003610738565b60065490565b6000546001600160a01b0316331480610d3f57506001546001600160a01b031633145b610d5b5760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b03909116600090815260026020526040902055565b600080546001600160a01b0316331480610d9b57506001546001600160a01b031633145b610db75760405162461bcd60e51b8152600401610557906111d8565b6104b2610adb83610ef8565b610dcb610fc1565b506001600160a01b03908116600090815260026020818152604092839020835160c08101855281548152600182015492810192909252918201549281019290925260038101546060830152600401549182166080820152600160a01b90910460ff16151560a082015290565b6000546001600160a01b0316331480610e5a57506001546001600160a01b031633145b610e765760405162461bcd60e51b8152600401610557906111d8565b6001600160a01b03166000908152600260208190526040909120600181557f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421918101919091557fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4706003820155600401805460ff60a01b1916600160a01b179055565b600081604051602001610f0b9190611171565b604051602081830303815290604052805190602001209050919050565b600080826003811115610f3757fe5b60008581526005602052604090205460ff166003811115610f5457fe5b101590508061050e576000848152600560205260409020805484919060ff19166001836003811115610f8257fe5b02179055509392505050565b60008282604051602001610fa392919061118e565b60405160208183030381529060405280519060200120905092915050565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915290565b80356001600160a01b03811681146104b557600080fd5b803580151581146104b557600080fd5b60006020828403121561102e578081fd5b61050e82610ff6565b60008060006060848603121561104b578182fd5b61105484610ff6565b925061106260208501610ff6565b9150604084013590509250925092565b60008060408385031215611084578182fd5b61108d83610ff6565b946020939093013593505050565b6000806000606084860312156110af578283fd5b6110b884610ff6565b95602085013595506040909401359392505050565b60008082840360e08112156110e0578283fd5b6110e984610ff6565b925060c0601f19820112156110fc578182fd5b5060405160c0810181811067ffffffffffffffff8211171561111a57fe5b80604052506020840135815260408401356020820152606084013560408201526080840135606082015261115060a08501610ff6565b608082015261116160c0850161100d565b60a0820152809150509250929050565b60609190911b6bffffffffffffffffffffffff1916815260140190565b60609290921b6bffffffffffffffffffffffff19168252601482015260340190565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b60208082526036908201527f46756e6374696f6e2063616e206f6e6c792062652063616c6c65642062792061604082015275757468656e746963617465642061646472657373657360501b606082015260800190565b815181526020808301519082015260408083015190820152606080830151908201526080808301516001600160a01b03169082015260a09182015115159181019190915260c0019056fea164736f6c6343000706000aa164736f6c6343000706000a";
