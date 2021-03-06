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

interface AbsL2DepositedTokenInterface extends ethers.utils.Interface {
  functions: {
    "finalizeDeposit(address,uint256)": FunctionFragment;
    "getFinalizeWithdrawalL1Gas()": FunctionFragment;
    "init(address)": FunctionFragment;
    "l1TokenGateway()": FunctionFragment;
    "messenger()": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawTo(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "finalizeDeposit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getFinalizeWithdrawalL1Gas",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "init", values: [string]): string;
  encodeFunctionData(
    functionFragment: "l1TokenGateway",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "messenger", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTo",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "finalizeDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFinalizeWithdrawalL1Gas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "l1TokenGateway",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "messenger", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawTo", data: BytesLike): Result;

  events: {
    "DepositFinalized(address,uint256)": EventFragment;
    "Initialized(address)": EventFragment;
    "WithdrawalInitiated(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DepositFinalized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawalInitiated"): EventFragment;
}

export class AbsL2DepositedToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AbsL2DepositedTokenInterface;

  functions: {
    finalizeDeposit(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "finalizeDeposit(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getFinalizeWithdrawalL1Gas(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "getFinalizeWithdrawalL1Gas()"(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    init(
      _l1TokenGateway: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "init(address)"(
      _l1TokenGateway: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    l1TokenGateway(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "l1TokenGateway()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    messenger(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "messenger()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdraw(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdrawTo(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdrawTo(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  finalizeDeposit(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "finalizeDeposit(address,uint256)"(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getFinalizeWithdrawalL1Gas(overrides?: CallOverrides): Promise<number>;

  "getFinalizeWithdrawalL1Gas()"(overrides?: CallOverrides): Promise<number>;

  init(
    _l1TokenGateway: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "init(address)"(
    _l1TokenGateway: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  l1TokenGateway(overrides?: CallOverrides): Promise<string>;

  "l1TokenGateway()"(overrides?: CallOverrides): Promise<string>;

  messenger(overrides?: CallOverrides): Promise<string>;

  "messenger()"(overrides?: CallOverrides): Promise<string>;

  withdraw(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdraw(uint256)"(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdrawTo(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdrawTo(address,uint256)"(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    finalizeDeposit(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "finalizeDeposit(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getFinalizeWithdrawalL1Gas(overrides?: CallOverrides): Promise<number>;

    "getFinalizeWithdrawalL1Gas()"(overrides?: CallOverrides): Promise<number>;

    init(_l1TokenGateway: string, overrides?: CallOverrides): Promise<void>;

    "init(address)"(
      _l1TokenGateway: string,
      overrides?: CallOverrides
    ): Promise<void>;

    l1TokenGateway(overrides?: CallOverrides): Promise<string>;

    "l1TokenGateway()"(overrides?: CallOverrides): Promise<string>;

    messenger(overrides?: CallOverrides): Promise<string>;

    "messenger()"(overrides?: CallOverrides): Promise<string>;

    withdraw(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "withdraw(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawTo(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawTo(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    DepositFinalized(_to: string | null, _amount: null): EventFilter;

    Initialized(_l1TokenGateway: null): EventFilter;

    WithdrawalInitiated(
      _from: string | null,
      _to: null,
      _amount: null
    ): EventFilter;
  };

  estimateGas: {
    finalizeDeposit(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "finalizeDeposit(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getFinalizeWithdrawalL1Gas(overrides?: CallOverrides): Promise<BigNumber>;

    "getFinalizeWithdrawalL1Gas()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    init(_l1TokenGateway: string, overrides?: Overrides): Promise<BigNumber>;

    "init(address)"(
      _l1TokenGateway: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    l1TokenGateway(overrides?: CallOverrides): Promise<BigNumber>;

    "l1TokenGateway()"(overrides?: CallOverrides): Promise<BigNumber>;

    messenger(overrides?: CallOverrides): Promise<BigNumber>;

    "messenger()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(_amount: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    "withdraw(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    withdrawTo(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdrawTo(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    finalizeDeposit(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "finalizeDeposit(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getFinalizeWithdrawalL1Gas(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getFinalizeWithdrawalL1Gas()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    init(
      _l1TokenGateway: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "init(address)"(
      _l1TokenGateway: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    l1TokenGateway(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "l1TokenGateway()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    messenger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "messenger()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    withdrawTo(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdrawTo(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
