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

interface OvmDeployerWhitelistInterface extends ethers.utils.Interface {
  functions: {
    "allowArbitraryDeployment()": FunctionFragment;
    "enableArbitraryContractDeployment()": FunctionFragment;
    "initialize(address,bool)": FunctionFragment;
    "initialized()": FunctionFragment;
    "isDeployerAllowed(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "setAllowArbitraryDeployment(bool)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "setWhitelistedDeployer(address,bool)": FunctionFragment;
    "whitelist(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowArbitraryDeployment",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "enableArbitraryContractDeployment",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "initialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isDeployerAllowed",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setAllowArbitraryDeployment",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setWhitelistedDeployer",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "whitelist", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "allowArbitraryDeployment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableArbitraryContractDeployment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isDeployerAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAllowArbitraryDeployment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistedDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "whitelist", data: BytesLike): Result;

  events: {};
}

export class OvmDeployerWhitelist extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OvmDeployerWhitelistInterface;

  functions: {
    allowArbitraryDeployment(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "allowArbitraryDeployment()"(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    enableArbitraryContractDeployment(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "enableArbitraryContractDeployment()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    initialize(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address,bool)"(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    initialized(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "initialized()"(
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    isDeployerAllowed(
      _deployer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "isDeployerAllowed(address)"(
      _deployer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    setAllowArbitraryDeployment(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setAllowArbitraryDeployment(bool)"(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setOwner(
      _owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setOwner(address)"(
      _owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setWhitelistedDeployer(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setWhitelistedDeployer(address,bool)"(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "whitelist(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;
  };

  allowArbitraryDeployment(overrides?: CallOverrides): Promise<boolean>;

  "allowArbitraryDeployment()"(overrides?: CallOverrides): Promise<boolean>;

  enableArbitraryContractDeployment(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "enableArbitraryContractDeployment()"(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  initialize(
    _owner: string,
    _allowArbitraryDeployment: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address,bool)"(
    _owner: string,
    _allowArbitraryDeployment: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  initialized(overrides?: CallOverrides): Promise<boolean>;

  "initialized()"(overrides?: CallOverrides): Promise<boolean>;

  isDeployerAllowed(
    _deployer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "isDeployerAllowed(address)"(
    _deployer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  setAllowArbitraryDeployment(
    _allowArbitraryDeployment: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setAllowArbitraryDeployment(bool)"(
    _allowArbitraryDeployment: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setOwner(_owner: string, overrides?: Overrides): Promise<ContractTransaction>;

  "setOwner(address)"(
    _owner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setWhitelistedDeployer(
    _deployer: string,
    _isWhitelisted: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setWhitelistedDeployer(address,bool)"(
    _deployer: string,
    _isWhitelisted: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  "whitelist(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    allowArbitraryDeployment(overrides?: CallOverrides): Promise<boolean>;

    "allowArbitraryDeployment()"(overrides?: CallOverrides): Promise<boolean>;

    enableArbitraryContractDeployment(overrides?: CallOverrides): Promise<void>;

    "enableArbitraryContractDeployment()"(
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,bool)"(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    initialized(overrides?: CallOverrides): Promise<boolean>;

    "initialized()"(overrides?: CallOverrides): Promise<boolean>;

    isDeployerAllowed(
      _deployer: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isDeployerAllowed(address)"(
      _deployer: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    setAllowArbitraryDeployment(
      _allowArbitraryDeployment: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setAllowArbitraryDeployment(bool)"(
      _allowArbitraryDeployment: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(_owner: string, overrides?: CallOverrides): Promise<void>;

    "setOwner(address)"(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setWhitelistedDeployer(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setWhitelistedDeployer(address,bool)"(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    "whitelist(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    allowArbitraryDeployment(overrides?: CallOverrides): Promise<BigNumber>;

    "allowArbitraryDeployment()"(overrides?: CallOverrides): Promise<BigNumber>;

    enableArbitraryContractDeployment(
      overrides?: Overrides
    ): Promise<BigNumber>;

    "enableArbitraryContractDeployment()"(
      overrides?: Overrides
    ): Promise<BigNumber>;

    initialize(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(address,bool)"(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    initialized(overrides?: CallOverrides): Promise<BigNumber>;

    "initialized()"(overrides?: CallOverrides): Promise<BigNumber>;

    isDeployerAllowed(
      _deployer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "isDeployerAllowed(address)"(
      _deployer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    setAllowArbitraryDeployment(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setAllowArbitraryDeployment(bool)"(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setOwner(_owner: string, overrides?: Overrides): Promise<BigNumber>;

    "setOwner(address)"(
      _owner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setWhitelistedDeployer(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setWhitelistedDeployer(address,bool)"(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    whitelist(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "whitelist(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowArbitraryDeployment(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowArbitraryDeployment()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enableArbitraryContractDeployment(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "enableArbitraryContractDeployment()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address,bool)"(
      _owner: string,
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    initialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "initialized()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isDeployerAllowed(
      _deployer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "isDeployerAllowed(address)"(
      _deployer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAllowArbitraryDeployment(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAllowArbitraryDeployment(bool)"(
      _allowArbitraryDeployment: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setOwner(
      _owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setOwner(address)"(
      _owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setWhitelistedDeployer(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setWhitelistedDeployer(address,bool)"(
      _deployer: string,
      _isWhitelisted: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "whitelist(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}