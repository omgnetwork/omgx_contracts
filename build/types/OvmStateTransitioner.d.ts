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

interface OvmStateTransitionerInterface extends ethers.utils.Interface {
  functions: {
    "applyTransaction(tuple)": FunctionFragment;
    "commitContractState(address,bytes)": FunctionFragment;
    "commitStorageSlot(address,bytes32,bytes)": FunctionFragment;
    "completeTransition()": FunctionFragment;
    "getPostStateRoot()": FunctionFragment;
    "getPreStateRoot()": FunctionFragment;
    "isComplete()": FunctionFragment;
    "libAddressManager()": FunctionFragment;
    "ovmStateManager()": FunctionFragment;
    "phase()": FunctionFragment;
    "proveContractState(address,address,bytes)": FunctionFragment;
    "proveStorageSlot(address,bytes32,bytes)": FunctionFragment;
    "resolve(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "applyTransaction",
    values: [
      {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "commitContractState",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "commitStorageSlot",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "completeTransition",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPostStateRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPreStateRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isComplete",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "libAddressManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ovmStateManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "phase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proveContractState",
    values: [string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proveStorageSlot",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "resolve", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "applyTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commitContractState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commitStorageSlot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeTransition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPostStateRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPreStateRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isComplete", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "libAddressManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ovmStateManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "phase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proveContractState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proveStorageSlot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;

  events: {
    "AccountCommitted(address)": EventFragment;
    "ContractStorageCommitted(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccountCommitted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContractStorageCommitted"): EventFragment;
}

export class OvmStateTransitioner extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OvmStateTransitionerInterface;

  functions: {
    applyTransaction(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "applyTransaction(tuple)"(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    commitContractState(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "commitContractState(address,bytes)"(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    commitStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "commitStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    completeTransition(overrides?: Overrides): Promise<ContractTransaction>;

    "completeTransition()"(overrides?: Overrides): Promise<ContractTransaction>;

    getPostStateRoot(
      overrides?: CallOverrides
    ): Promise<{
      _postStateRoot: string;
      0: string;
    }>;

    "getPostStateRoot()"(
      overrides?: CallOverrides
    ): Promise<{
      _postStateRoot: string;
      0: string;
    }>;

    getPreStateRoot(
      overrides?: CallOverrides
    ): Promise<{
      _preStateRoot: string;
      0: string;
    }>;

    "getPreStateRoot()"(
      overrides?: CallOverrides
    ): Promise<{
      _preStateRoot: string;
      0: string;
    }>;

    isComplete(
      overrides?: CallOverrides
    ): Promise<{
      _complete: boolean;
      0: boolean;
    }>;

    "isComplete()"(
      overrides?: CallOverrides
    ): Promise<{
      _complete: boolean;
      0: boolean;
    }>;

    libAddressManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "libAddressManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    ovmStateManager(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "ovmStateManager()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    phase(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "phase()"(
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    proveContractState(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proveContractState(address,address,bytes)"(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    proveStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proveStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    resolve(
      _name: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  applyTransaction(
    _transaction: {
      timestamp: BigNumberish;
      blockNumber: BigNumberish;
      l1QueueOrigin: BigNumberish;
      l1TxOrigin: string;
      entrypoint: string;
      gasLimit: BigNumberish;
      data: BytesLike;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "applyTransaction(tuple)"(
    _transaction: {
      timestamp: BigNumberish;
      blockNumber: BigNumberish;
      l1QueueOrigin: BigNumberish;
      l1TxOrigin: string;
      entrypoint: string;
      gasLimit: BigNumberish;
      data: BytesLike;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  commitContractState(
    _ovmContractAddress: string,
    _stateTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "commitContractState(address,bytes)"(
    _ovmContractAddress: string,
    _stateTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  commitStorageSlot(
    _ovmContractAddress: string,
    _key: BytesLike,
    _storageTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "commitStorageSlot(address,bytes32,bytes)"(
    _ovmContractAddress: string,
    _key: BytesLike,
    _storageTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  completeTransition(overrides?: Overrides): Promise<ContractTransaction>;

  "completeTransition()"(overrides?: Overrides): Promise<ContractTransaction>;

  getPostStateRoot(overrides?: CallOverrides): Promise<string>;

  "getPostStateRoot()"(overrides?: CallOverrides): Promise<string>;

  getPreStateRoot(overrides?: CallOverrides): Promise<string>;

  "getPreStateRoot()"(overrides?: CallOverrides): Promise<string>;

  isComplete(overrides?: CallOverrides): Promise<boolean>;

  "isComplete()"(overrides?: CallOverrides): Promise<boolean>;

  libAddressManager(overrides?: CallOverrides): Promise<string>;

  "libAddressManager()"(overrides?: CallOverrides): Promise<string>;

  ovmStateManager(overrides?: CallOverrides): Promise<string>;

  "ovmStateManager()"(overrides?: CallOverrides): Promise<string>;

  phase(overrides?: CallOverrides): Promise<number>;

  "phase()"(overrides?: CallOverrides): Promise<number>;

  proveContractState(
    _ovmContractAddress: string,
    _ethContractAddress: string,
    _stateTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proveContractState(address,address,bytes)"(
    _ovmContractAddress: string,
    _ethContractAddress: string,
    _stateTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  proveStorageSlot(
    _ovmContractAddress: string,
    _key: BytesLike,
    _storageTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proveStorageSlot(address,bytes32,bytes)"(
    _ovmContractAddress: string,
    _key: BytesLike,
    _storageTrieWitness: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  resolve(_name: string, overrides?: CallOverrides): Promise<string>;

  "resolve(string)"(_name: string, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    applyTransaction(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    "applyTransaction(tuple)"(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    commitContractState(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "commitContractState(address,bytes)"(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    commitStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "commitStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    completeTransition(overrides?: CallOverrides): Promise<void>;

    "completeTransition()"(overrides?: CallOverrides): Promise<void>;

    getPostStateRoot(overrides?: CallOverrides): Promise<string>;

    "getPostStateRoot()"(overrides?: CallOverrides): Promise<string>;

    getPreStateRoot(overrides?: CallOverrides): Promise<string>;

    "getPreStateRoot()"(overrides?: CallOverrides): Promise<string>;

    isComplete(overrides?: CallOverrides): Promise<boolean>;

    "isComplete()"(overrides?: CallOverrides): Promise<boolean>;

    libAddressManager(overrides?: CallOverrides): Promise<string>;

    "libAddressManager()"(overrides?: CallOverrides): Promise<string>;

    ovmStateManager(overrides?: CallOverrides): Promise<string>;

    "ovmStateManager()"(overrides?: CallOverrides): Promise<string>;

    phase(overrides?: CallOverrides): Promise<number>;

    "phase()"(overrides?: CallOverrides): Promise<number>;

    proveContractState(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "proveContractState(address,address,bytes)"(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    proveStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "proveStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    resolve(_name: string, overrides?: CallOverrides): Promise<string>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    AccountCommitted(_address: null): EventFilter;

    ContractStorageCommitted(_address: null, _key: null): EventFilter;
  };

  estimateGas: {
    applyTransaction(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "applyTransaction(tuple)"(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    commitContractState(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "commitContractState(address,bytes)"(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    commitStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "commitStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    completeTransition(overrides?: Overrides): Promise<BigNumber>;

    "completeTransition()"(overrides?: Overrides): Promise<BigNumber>;

    getPostStateRoot(overrides?: CallOverrides): Promise<BigNumber>;

    "getPostStateRoot()"(overrides?: CallOverrides): Promise<BigNumber>;

    getPreStateRoot(overrides?: CallOverrides): Promise<BigNumber>;

    "getPreStateRoot()"(overrides?: CallOverrides): Promise<BigNumber>;

    isComplete(overrides?: CallOverrides): Promise<BigNumber>;

    "isComplete()"(overrides?: CallOverrides): Promise<BigNumber>;

    libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;

    "libAddressManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    ovmStateManager(overrides?: CallOverrides): Promise<BigNumber>;

    "ovmStateManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    phase(overrides?: CallOverrides): Promise<BigNumber>;

    "phase()"(overrides?: CallOverrides): Promise<BigNumber>;

    proveContractState(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proveContractState(address,address,bytes)"(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    proveStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proveStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    applyTransaction(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "applyTransaction(tuple)"(
      _transaction: {
        timestamp: BigNumberish;
        blockNumber: BigNumberish;
        l1QueueOrigin: BigNumberish;
        l1TxOrigin: string;
        entrypoint: string;
        gasLimit: BigNumberish;
        data: BytesLike;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    commitContractState(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "commitContractState(address,bytes)"(
      _ovmContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    commitStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "commitStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    completeTransition(overrides?: Overrides): Promise<PopulatedTransaction>;

    "completeTransition()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getPostStateRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getPostStateRoot()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPreStateRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getPreStateRoot()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isComplete(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "isComplete()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "libAddressManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ovmStateManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ovmStateManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    phase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "phase()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proveContractState(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proveContractState(address,address,bytes)"(
      _ovmContractAddress: string,
      _ethContractAddress: string,
      _stateTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    proveStorageSlot(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proveStorageSlot(address,bytes32,bytes)"(
      _ovmContractAddress: string,
      _key: BytesLike,
      _storageTrieWitness: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    resolve(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
