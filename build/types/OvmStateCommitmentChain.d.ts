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

interface OvmStateCommitmentChainInterface extends ethers.utils.Interface {
  functions: {
    "FRAUD_PROOF_WINDOW()": FunctionFragment;
    "SEQUENCER_PUBLISH_WINDOW()": FunctionFragment;
    "appendStateBatch(bytes32[],uint256)": FunctionFragment;
    "batches()": FunctionFragment;
    "deleteStateBatch(tuple)": FunctionFragment;
    "getLastSequencerTimestamp()": FunctionFragment;
    "getTotalBatches()": FunctionFragment;
    "getTotalElements()": FunctionFragment;
    "insideFraudProofWindow(tuple)": FunctionFragment;
    "libAddressManager()": FunctionFragment;
    "resolve(string)": FunctionFragment;
    "verifyStateCommitment(bytes32,tuple,tuple)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "FRAUD_PROOF_WINDOW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SEQUENCER_PUBLISH_WINDOW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "appendStateBatch",
    values: [BytesLike[], BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "batches", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deleteStateBatch",
    values: [
      {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getLastSequencerTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalBatches",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalElements",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "insideFraudProofWindow",
    values: [
      {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "libAddressManager",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "resolve", values: [string]): string;
  encodeFunctionData(
    functionFragment: "verifyStateCommitment",
    values: [
      BytesLike,
      {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      { index: BigNumberish; siblings: BytesLike[] }
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "FRAUD_PROOF_WINDOW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SEQUENCER_PUBLISH_WINDOW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "appendStateBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "batches", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deleteStateBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastSequencerTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalBatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalElements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insideFraudProofWindow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "libAddressManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyStateCommitment",
    data: BytesLike
  ): Result;

  events: {
    "StateBatchAppended(uint256,bytes32,uint256,uint256,bytes)": EventFragment;
    "StateBatchDeleted(uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "StateBatchAppended"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StateBatchDeleted"): EventFragment;
}

export class OvmStateCommitmentChain extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OvmStateCommitmentChainInterface;

  functions: {
    FRAUD_PROOF_WINDOW(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "FRAUD_PROOF_WINDOW()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    SEQUENCER_PUBLISH_WINDOW(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "SEQUENCER_PUBLISH_WINDOW()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    appendStateBatch(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "appendStateBatch(bytes32[],uint256)"(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    batches(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "batches()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    deleteStateBatch(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "deleteStateBatch(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getLastSequencerTimestamp(
      overrides?: CallOverrides
    ): Promise<{
      _lastSequencerTimestamp: BigNumber;
      0: BigNumber;
    }>;

    "getLastSequencerTimestamp()"(
      overrides?: CallOverrides
    ): Promise<{
      _lastSequencerTimestamp: BigNumber;
      0: BigNumber;
    }>;

    getTotalBatches(
      overrides?: CallOverrides
    ): Promise<{
      _totalBatches: BigNumber;
      0: BigNumber;
    }>;

    "getTotalBatches()"(
      overrides?: CallOverrides
    ): Promise<{
      _totalBatches: BigNumber;
      0: BigNumber;
    }>;

    getTotalElements(
      overrides?: CallOverrides
    ): Promise<{
      _totalElements: BigNumber;
      0: BigNumber;
    }>;

    "getTotalElements()"(
      overrides?: CallOverrides
    ): Promise<{
      _totalElements: BigNumber;
      0: BigNumber;
    }>;

    insideFraudProofWindow(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<{
      _inside: boolean;
      0: boolean;
    }>;

    "insideFraudProofWindow(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<{
      _inside: boolean;
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

    verifyStateCommitment(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "verifyStateCommitment(bytes32,tuple,tuple)"(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;
  };

  FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

  "FRAUD_PROOF_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

  SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

  "SEQUENCER_PUBLISH_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

  appendStateBatch(
    _batch: BytesLike[],
    _shouldStartAtElement: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "appendStateBatch(bytes32[],uint256)"(
    _batch: BytesLike[],
    _shouldStartAtElement: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  batches(overrides?: CallOverrides): Promise<string>;

  "batches()"(overrides?: CallOverrides): Promise<string>;

  deleteStateBatch(
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "deleteStateBatch(tuple)"(
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  "getLastSequencerTimestamp()"(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;

  "getTotalBatches()"(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;

  "getTotalElements()"(overrides?: CallOverrides): Promise<BigNumber>;

  insideFraudProofWindow(
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    overrides?: CallOverrides
  ): Promise<boolean>;

  "insideFraudProofWindow(tuple)"(
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    overrides?: CallOverrides
  ): Promise<boolean>;

  libAddressManager(overrides?: CallOverrides): Promise<string>;

  "libAddressManager()"(overrides?: CallOverrides): Promise<string>;

  resolve(_name: string, overrides?: CallOverrides): Promise<string>;

  "resolve(string)"(_name: string, overrides?: CallOverrides): Promise<string>;

  verifyStateCommitment(
    _element: BytesLike,
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    _proof: { index: BigNumberish; siblings: BytesLike[] },
    overrides?: CallOverrides
  ): Promise<boolean>;

  "verifyStateCommitment(bytes32,tuple,tuple)"(
    _element: BytesLike,
    _batchHeader: {
      batchIndex: BigNumberish;
      batchRoot: BytesLike;
      batchSize: BigNumberish;
      prevTotalElements: BigNumberish;
      extraData: BytesLike;
    },
    _proof: { index: BigNumberish; siblings: BytesLike[] },
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

    "FRAUD_PROOF_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

    SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

    "SEQUENCER_PUBLISH_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

    appendStateBatch(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "appendStateBatch(bytes32[],uint256)"(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    batches(overrides?: CallOverrides): Promise<string>;

    "batches()"(overrides?: CallOverrides): Promise<string>;

    deleteStateBatch(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    "deleteStateBatch(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    "getLastSequencerTimestamp()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalBatches()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalElements()"(overrides?: CallOverrides): Promise<BigNumber>;

    insideFraudProofWindow(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<boolean>;

    "insideFraudProofWindow(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<boolean>;

    libAddressManager(overrides?: CallOverrides): Promise<string>;

    "libAddressManager()"(overrides?: CallOverrides): Promise<string>;

    resolve(_name: string, overrides?: CallOverrides): Promise<string>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<string>;

    verifyStateCommitment(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<boolean>;

    "verifyStateCommitment(bytes32,tuple,tuple)"(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    StateBatchAppended(
      _batchIndex: BigNumberish | null,
      _batchRoot: null,
      _batchSize: null,
      _prevTotalElements: null,
      _extraData: null
    ): EventFilter;

    StateBatchDeleted(
      _batchIndex: BigNumberish | null,
      _batchRoot: null
    ): EventFilter;
  };

  estimateGas: {
    FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

    "FRAUD_PROOF_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

    SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;

    "SEQUENCER_PUBLISH_WINDOW()"(overrides?: CallOverrides): Promise<BigNumber>;

    appendStateBatch(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "appendStateBatch(bytes32[],uint256)"(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    batches(overrides?: CallOverrides): Promise<BigNumber>;

    "batches()"(overrides?: CallOverrides): Promise<BigNumber>;

    deleteStateBatch(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "deleteStateBatch(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    "getLastSequencerTimestamp()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalBatches()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalElements()"(overrides?: CallOverrides): Promise<BigNumber>;

    insideFraudProofWindow(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "insideFraudProofWindow(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;

    "libAddressManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyStateCommitment(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "verifyStateCommitment(bytes32,tuple,tuple)"(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    FRAUD_PROOF_WINDOW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "FRAUD_PROOF_WINDOW()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SEQUENCER_PUBLISH_WINDOW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "SEQUENCER_PUBLISH_WINDOW()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    appendStateBatch(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "appendStateBatch(bytes32[],uint256)"(
      _batch: BytesLike[],
      _shouldStartAtElement: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    batches(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "batches()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deleteStateBatch(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "deleteStateBatch(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getLastSequencerTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getLastSequencerTimestamp()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalBatches(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTotalBatches()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalElements(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTotalElements()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    insideFraudProofWindow(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "insideFraudProofWindow(tuple)"(
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "libAddressManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolve(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "resolve(string)"(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyStateCommitment(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "verifyStateCommitment(bytes32,tuple,tuple)"(
      _element: BytesLike,
      _batchHeader: {
        batchIndex: BigNumberish;
        batchRoot: BytesLike;
        batchSize: BigNumberish;
        prevTotalElements: BigNumberish;
        extraData: BytesLike;
      },
      _proof: { index: BigNumberish; siblings: BytesLike[] },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}