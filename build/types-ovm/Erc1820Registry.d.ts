/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface Erc1820RegistryInterface extends ethers.utils.Interface {
  functions: {
    "getInterfaceImplementer(address,bytes32)": FunctionFragment;
    "getManager(address)": FunctionFragment;
    "implementsERC165Interface(address,bytes4)": FunctionFragment;
    "implementsERC165InterfaceNoCache(address,bytes4)": FunctionFragment;
    "interfaceHash(string)": FunctionFragment;
    "setInterfaceImplementer(address,bytes32,address)": FunctionFragment;
    "setManager(address,address)": FunctionFragment;
    "updateERC165Cache(address,bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getInterfaceImplementer",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getManager", values: [string]): string;
  encodeFunctionData(
    functionFragment: "implementsERC165Interface",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "implementsERC165InterfaceNoCache",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "interfaceHash",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setInterfaceImplementer",
    values: [string, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setManager",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateERC165Cache",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getInterfaceImplementer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementsERC165Interface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementsERC165InterfaceNoCache",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "interfaceHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInterfaceImplementer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateERC165Cache",
    data: BytesLike
  ): Result;

  events: {
    "InterfaceImplementerSet(address,bytes32,address)": EventFragment;
    "ManagerChanged(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "InterfaceImplementerSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ManagerChanged"): EventFragment;
}

export class Erc1820Registry extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: Erc1820RegistryInterface;

  functions: {
    getInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getInterfaceImplementer(address,bytes32)"(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getManager(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getManager(address)"(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    implementsERC165Interface(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "implementsERC165Interface(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    implementsERC165InterfaceNoCache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "implementsERC165InterfaceNoCache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    interfaceHash(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "interfaceHash(string)"(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    setInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setInterfaceImplementer(address,bytes32,address)"(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setManager(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setManager(address,address)"(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    updateERC165Cache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "updateERC165Cache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  getInterfaceImplementer(
    _addr: string,
    _interfaceHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "getInterfaceImplementer(address,bytes32)"(
    _addr: string,
    _interfaceHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  getManager(_addr: string, overrides?: CallOverrides): Promise<string>;

  "getManager(address)"(
    _addr: string,
    overrides?: CallOverrides
  ): Promise<string>;

  implementsERC165Interface(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "implementsERC165Interface(address,bytes4)"(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  implementsERC165InterfaceNoCache(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "implementsERC165InterfaceNoCache(address,bytes4)"(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  interfaceHash(
    _interfaceName: string,
    overrides?: CallOverrides
  ): Promise<string>;

  "interfaceHash(string)"(
    _interfaceName: string,
    overrides?: CallOverrides
  ): Promise<string>;

  setInterfaceImplementer(
    _addr: string,
    _interfaceHash: BytesLike,
    _implementer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setInterfaceImplementer(address,bytes32,address)"(
    _addr: string,
    _interfaceHash: BytesLike,
    _implementer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setManager(
    _addr: string,
    _newManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setManager(address,address)"(
    _addr: string,
    _newManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  updateERC165Cache(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "updateERC165Cache(address,bytes4)"(
    _contract: string,
    _interfaceId: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    getInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "getInterfaceImplementer(address,bytes32)"(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getManager(_addr: string, overrides?: CallOverrides): Promise<string>;

    "getManager(address)"(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<string>;

    implementsERC165Interface(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "implementsERC165Interface(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    implementsERC165InterfaceNoCache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "implementsERC165InterfaceNoCache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    interfaceHash(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "interfaceHash(string)"(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<string>;

    setInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setInterfaceImplementer(address,bytes32,address)"(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setManager(
      _addr: string,
      _newManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setManager(address,address)"(
      _addr: string,
      _newManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateERC165Cache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "updateERC165Cache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    InterfaceImplementerSet(
      addr: string | null,
      interfaceHash: BytesLike | null,
      implementer: string | null
    ): EventFilter;

    ManagerChanged(addr: string | null, newManager: string | null): EventFilter;
  };

  estimateGas: {
    getInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getInterfaceImplementer(address,bytes32)"(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getManager(_addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getManager(address)"(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    implementsERC165Interface(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "implementsERC165Interface(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    implementsERC165InterfaceNoCache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "implementsERC165InterfaceNoCache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    interfaceHash(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "interfaceHash(string)"(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setInterfaceImplementer(address,bytes32,address)"(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setManager(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setManager(address,address)"(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    updateERC165Cache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "updateERC165Cache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getInterfaceImplementer(address,bytes32)"(
      _addr: string,
      _interfaceHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getManager(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getManager(address)"(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    implementsERC165Interface(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "implementsERC165Interface(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    implementsERC165InterfaceNoCache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "implementsERC165InterfaceNoCache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    interfaceHash(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "interfaceHash(string)"(
      _interfaceName: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setInterfaceImplementer(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setInterfaceImplementer(address,bytes32,address)"(
      _addr: string,
      _interfaceHash: BytesLike,
      _implementer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setManager(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setManager(address,address)"(
      _addr: string,
      _newManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    updateERC165Cache(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "updateERC165Cache(address,bytes4)"(
      _contract: string,
      _interfaceId: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
