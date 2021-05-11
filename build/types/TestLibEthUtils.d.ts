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

interface TestLibEthUtilsInterface extends ethers.utils.Interface {
  functions: {
    "createContract(bytes)": FunctionFragment;
    "getAddressForCREATE(address,uint256)": FunctionFragment;
    "getAddressForCREATE2(address,bytes,bytes32)": FunctionFragment;
    "getCode(address,uint256,uint256)": FunctionFragment;
    "getCodeHash(address)": FunctionFragment;
    "getCodeSize(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createContract",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressForCREATE",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressForCREATE2",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCode",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getCodeHash", values: [string]): string;
  encodeFunctionData(functionFragment: "getCodeSize", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "createContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAddressForCREATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAddressForCREATE2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCode", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCodeHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCodeSize",
    data: BytesLike
  ): Result;

  events: {};
}

export class TestLibEthUtils extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TestLibEthUtilsInterface;

  functions: {
    createContract(
      _code: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createContract(bytes)"(
      _code: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getAddressForCREATE(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      _address: string;
      0: string;
    }>;

    "getAddressForCREATE(address,uint256)"(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      _address: string;
      0: string;
    }>;

    getAddressForCREATE2(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _address: string;
      0: string;
    }>;

    "getAddressForCREATE2(address,bytes,bytes32)"(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _address: string;
      0: string;
    }>;

    "getCode(address,uint256,uint256)"(
      _address: string,
      _offset: BigNumberish,
      _length: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      _code: string;
      0: string;
    }>;

    "getCode(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<{
      _code: string;
      0: string;
    }>;

    getCodeHash(
      _address: string,
      overrides?: CallOverrides
    ): Promise<{
      _codeHash: string;
      0: string;
    }>;

    "getCodeHash(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<{
      _codeHash: string;
      0: string;
    }>;

    getCodeSize(
      _address: string,
      overrides?: CallOverrides
    ): Promise<{
      _codeSize: BigNumber;
      0: BigNumber;
    }>;

    "getCodeSize(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<{
      _codeSize: BigNumber;
      0: BigNumber;
    }>;
  };

  createContract(
    _code: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createContract(bytes)"(
    _code: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getAddressForCREATE(
    _creator: string,
    _nonce: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getAddressForCREATE(address,uint256)"(
    _creator: string,
    _nonce: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getAddressForCREATE2(
    _creator: string,
    _bytecode: BytesLike,
    _salt: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "getAddressForCREATE2(address,bytes,bytes32)"(
    _creator: string,
    _bytecode: BytesLike,
    _salt: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "getCode(address,uint256,uint256)"(
    _address: string,
    _offset: BigNumberish,
    _length: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getCode(address)"(
    _address: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getCodeHash(_address: string, overrides?: CallOverrides): Promise<string>;

  "getCodeHash(address)"(
    _address: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getCodeSize(_address: string, overrides?: CallOverrides): Promise<BigNumber>;

  "getCodeSize(address)"(
    _address: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    createContract(
      _code: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "createContract(bytes)"(
      _code: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddressForCREATE(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getAddressForCREATE(address,uint256)"(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddressForCREATE2(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "getAddressForCREATE2(address,bytes,bytes32)"(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "getCode(address,uint256,uint256)"(
      _address: string,
      _offset: BigNumberish,
      _length: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getCode(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getCodeHash(_address: string, overrides?: CallOverrides): Promise<string>;

    "getCodeHash(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getCodeSize(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCodeSize(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    createContract(_code: BytesLike, overrides?: Overrides): Promise<BigNumber>;

    "createContract(bytes)"(
      _code: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getAddressForCREATE(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAddressForCREATE(address,uint256)"(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAddressForCREATE2(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAddressForCREATE2(address,bytes,bytes32)"(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCode(address,uint256,uint256)"(
      _address: string,
      _offset: BigNumberish,
      _length: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCode(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCodeHash(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCodeHash(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCodeSize(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCodeSize(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createContract(
      _code: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createContract(bytes)"(
      _code: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getAddressForCREATE(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAddressForCREATE(address,uint256)"(
      _creator: string,
      _nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAddressForCREATE2(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAddressForCREATE2(address,bytes,bytes32)"(
      _creator: string,
      _bytecode: BytesLike,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCode(address,uint256,uint256)"(
      _address: string,
      _offset: BigNumberish,
      _length: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCode(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCodeHash(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCodeHash(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCodeSize(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCodeSize(address)"(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}