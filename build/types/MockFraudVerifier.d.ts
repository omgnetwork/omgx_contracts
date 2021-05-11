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

interface MockFraudVerifierInterface extends ethers.utils.Interface {
  functions: {
    "finalize(bytes32,address,uint256)": FunctionFragment;
    "getStateTransitioner(bytes32,bytes32)": FunctionFragment;
    "setBondManager(address)": FunctionFragment;
    "setStateTransitioner(bytes32,bytes32,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "finalize",
    values: [BytesLike, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStateTransitioner",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setBondManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStateTransitioner",
    values: [BytesLike, BytesLike, string]
  ): string;

  decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getStateTransitioner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBondManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStateTransitioner",
    data: BytesLike
  ): Result;

  events: {};
}

export class MockFraudVerifier extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: MockFraudVerifierInterface;

  functions: {
    finalize(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "finalize(bytes32,address,uint256)"(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getStateTransitioner(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getStateTransitioner(bytes32,bytes32)"(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    setBondManager(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setBondManager(address)"(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setStateTransitioner(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setStateTransitioner(bytes32,bytes32,address)"(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  finalize(
    _preStateRoot: BytesLike,
    publisher: string,
    timestamp: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "finalize(bytes32,address,uint256)"(
    _preStateRoot: BytesLike,
    publisher: string,
    timestamp: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getStateTransitioner(
    _preStateRoot: BytesLike,
    _txHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "getStateTransitioner(bytes32,bytes32)"(
    _preStateRoot: BytesLike,
    _txHash: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  setBondManager(
    _bondManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setBondManager(address)"(
    _bondManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setStateTransitioner(
    preStateRoot: BytesLike,
    txHash: BytesLike,
    addr: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setStateTransitioner(bytes32,bytes32,address)"(
    preStateRoot: BytesLike,
    txHash: BytesLike,
    addr: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    finalize(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "finalize(bytes32,address,uint256)"(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getStateTransitioner(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "getStateTransitioner(bytes32,bytes32)"(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    setBondManager(
      _bondManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBondManager(address)"(
      _bondManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setStateTransitioner(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setStateTransitioner(bytes32,bytes32,address)"(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    finalize(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "finalize(bytes32,address,uint256)"(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getStateTransitioner(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStateTransitioner(bytes32,bytes32)"(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setBondManager(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setBondManager(address)"(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setStateTransitioner(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setStateTransitioner(bytes32,bytes32,address)"(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    finalize(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "finalize(bytes32,address,uint256)"(
      _preStateRoot: BytesLike,
      publisher: string,
      timestamp: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getStateTransitioner(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getStateTransitioner(bytes32,bytes32)"(
      _preStateRoot: BytesLike,
      _txHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setBondManager(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setBondManager(address)"(
      _bondManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setStateTransitioner(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setStateTransitioner(bytes32,bytes32,address)"(
      preStateRoot: BytesLike,
      txHash: BytesLike,
      addr: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
