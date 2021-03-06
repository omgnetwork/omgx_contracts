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
  PayableOverrides,
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IOvmL1EthGatewayInterface extends ethers.utils.Interface {
  functions: {
    "deposit()": FunctionFragment;
    "depositTo(address)": FunctionFragment;
    "finalizeWithdrawal(address,uint256)": FunctionFragment;
    "getFinalizeDepositL2Gas()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "depositTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "finalizeWithdrawal",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getFinalizeDepositL2Gas",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "finalizeWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFinalizeDepositL2Gas",
    data: BytesLike
  ): Result;

  events: {
    "DepositInitiated(address,address,uint256)": EventFragment;
    "WithdrawalFinalized(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DepositInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawalFinalized"): EventFragment;
}

export class IOvmL1EthGateway extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IOvmL1EthGatewayInterface;

  functions: {
    deposit(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "deposit()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

    depositTo(
      _to: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "depositTo(address)"(
      _to: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    finalizeWithdrawal(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "finalizeWithdrawal(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getFinalizeDepositL2Gas(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "getFinalizeDepositL2Gas()"(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;
  };

  deposit(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "deposit()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  depositTo(
    _to: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "depositTo(address)"(
    _to: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  finalizeWithdrawal(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "finalizeWithdrawal(address,uint256)"(
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getFinalizeDepositL2Gas(overrides?: CallOverrides): Promise<number>;

  "getFinalizeDepositL2Gas()"(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    deposit(overrides?: CallOverrides): Promise<void>;

    "deposit()"(overrides?: CallOverrides): Promise<void>;

    depositTo(_to: string, overrides?: CallOverrides): Promise<void>;

    "depositTo(address)"(_to: string, overrides?: CallOverrides): Promise<void>;

    finalizeWithdrawal(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "finalizeWithdrawal(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getFinalizeDepositL2Gas(overrides?: CallOverrides): Promise<number>;

    "getFinalizeDepositL2Gas()"(overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    DepositInitiated(
      _from: string | null,
      _to: null,
      _amount: null
    ): EventFilter;

    WithdrawalFinalized(_to: string | null, _amount: null): EventFilter;
  };

  estimateGas: {
    deposit(overrides?: PayableOverrides): Promise<BigNumber>;

    "deposit()"(overrides?: PayableOverrides): Promise<BigNumber>;

    depositTo(_to: string, overrides?: PayableOverrides): Promise<BigNumber>;

    "depositTo(address)"(
      _to: string,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    finalizeWithdrawal(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "finalizeWithdrawal(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getFinalizeDepositL2Gas(overrides?: CallOverrides): Promise<BigNumber>;

    "getFinalizeDepositL2Gas()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "deposit()"(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    depositTo(
      _to: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "depositTo(address)"(
      _to: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    finalizeWithdrawal(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "finalizeWithdrawal(address,uint256)"(
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getFinalizeDepositL2Gas(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getFinalizeDepositL2Gas()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
