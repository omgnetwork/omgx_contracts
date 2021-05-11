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

interface TestLibRlpWriterInterface extends ethers.utils.Interface {
  functions: {
    "writeAddress(address)": FunctionFragment;
    "writeAddressWithTaintedMemory(address)": FunctionFragment;
    "writeBool(bool)": FunctionFragment;
    "writeBytes(bytes)": FunctionFragment;
    "writeList(bytes[])": FunctionFragment;
    "writeString(string)": FunctionFragment;
    "writeUint(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "writeAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "writeAddressWithTaintedMemory",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "writeBool", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "writeBytes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "writeList",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "writeString", values: [string]): string;
  encodeFunctionData(
    functionFragment: "writeUint",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "writeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "writeAddressWithTaintedMemory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "writeBool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "writeBytes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "writeList", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "writeString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "writeUint", data: BytesLike): Result;

  events: {};
}

export class TestLibRlpWriter extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TestLibRlpWriterInterface;

  functions: {
    writeAddress(
      _in: string,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeAddress(address)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    writeAddressWithTaintedMemory(
      _in: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "writeAddressWithTaintedMemory(address)"(
      _in: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    writeBool(
      _in: boolean,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeBool(bool)"(
      _in: boolean,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    writeBytes(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeBytes(bytes)"(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    writeList(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeList(bytes[])"(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    writeString(
      _in: string,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeString(string)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    writeUint(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;

    "writeUint(uint256)"(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      _out: string;
      0: string;
    }>;
  };

  writeAddress(_in: string, overrides?: CallOverrides): Promise<string>;

  "writeAddress(address)"(
    _in: string,
    overrides?: CallOverrides
  ): Promise<string>;

  writeAddressWithTaintedMemory(
    _in: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "writeAddressWithTaintedMemory(address)"(
    _in: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  writeBool(_in: boolean, overrides?: CallOverrides): Promise<string>;

  "writeBool(bool)"(_in: boolean, overrides?: CallOverrides): Promise<string>;

  writeBytes(_in: BytesLike, overrides?: CallOverrides): Promise<string>;

  "writeBytes(bytes)"(
    _in: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  writeList(_in: BytesLike[], overrides?: CallOverrides): Promise<string>;

  "writeList(bytes[])"(
    _in: BytesLike[],
    overrides?: CallOverrides
  ): Promise<string>;

  writeString(_in: string, overrides?: CallOverrides): Promise<string>;

  "writeString(string)"(
    _in: string,
    overrides?: CallOverrides
  ): Promise<string>;

  writeUint(_in: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "writeUint(uint256)"(
    _in: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    writeAddress(_in: string, overrides?: CallOverrides): Promise<string>;

    "writeAddress(address)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<string>;

    writeAddressWithTaintedMemory(
      _in: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "writeAddressWithTaintedMemory(address)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<string>;

    writeBool(_in: boolean, overrides?: CallOverrides): Promise<string>;

    "writeBool(bool)"(_in: boolean, overrides?: CallOverrides): Promise<string>;

    writeBytes(_in: BytesLike, overrides?: CallOverrides): Promise<string>;

    "writeBytes(bytes)"(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    writeList(_in: BytesLike[], overrides?: CallOverrides): Promise<string>;

    "writeList(bytes[])"(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<string>;

    writeString(_in: string, overrides?: CallOverrides): Promise<string>;

    "writeString(string)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<string>;

    writeUint(_in: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "writeUint(uint256)"(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    writeAddress(_in: string, overrides?: CallOverrides): Promise<BigNumber>;

    "writeAddress(address)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    writeAddressWithTaintedMemory(
      _in: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "writeAddressWithTaintedMemory(address)"(
      _in: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    writeBool(_in: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    "writeBool(bool)"(
      _in: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    writeBytes(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "writeBytes(bytes)"(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    writeList(_in: BytesLike[], overrides?: CallOverrides): Promise<BigNumber>;

    "writeList(bytes[])"(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    writeString(_in: string, overrides?: CallOverrides): Promise<BigNumber>;

    "writeString(string)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    writeUint(_in: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "writeUint(uint256)"(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    writeAddress(
      _in: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeAddress(address)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeAddressWithTaintedMemory(
      _in: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "writeAddressWithTaintedMemory(address)"(
      _in: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    writeBool(
      _in: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeBool(bool)"(
      _in: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeBytes(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeBytes(bytes)"(
      _in: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeList(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeList(bytes[])"(
      _in: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeString(
      _in: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeString(string)"(
      _in: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    writeUint(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "writeUint(uint256)"(
      _in: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
