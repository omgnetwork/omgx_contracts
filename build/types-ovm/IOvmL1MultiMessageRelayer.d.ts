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

interface IOvmL1MultiMessageRelayerInterface extends ethers.utils.Interface {
  functions: {
    "batchRelayMessages(tuple[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "batchRelayMessages",
    values: [
      {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "batchRelayMessages",
    data: BytesLike
  ): Result;

  events: {};
}

export class IOvmL1MultiMessageRelayer extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IOvmL1MultiMessageRelayerInterface;

  functions: {
    batchRelayMessages(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "batchRelayMessages(tuple[])"(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  batchRelayMessages(
    _messages: {
      target: string;
      sender: string;
      message: BytesLike;
      messageNonce: BigNumberish;
      proof: {
        stateRoot: BytesLike;
        stateRootBatchHeader: {
          batchIndex: BigNumberish;
          batchRoot: BytesLike;
          batchSize: BigNumberish;
          prevTotalElements: BigNumberish;
          extraData: BytesLike;
        };
        stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
        stateTrieWitness: BytesLike;
        storageTrieWitness: BytesLike;
      };
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "batchRelayMessages(tuple[])"(
    _messages: {
      target: string;
      sender: string;
      message: BytesLike;
      messageNonce: BigNumberish;
      proof: {
        stateRoot: BytesLike;
        stateRootBatchHeader: {
          batchIndex: BigNumberish;
          batchRoot: BytesLike;
          batchSize: BigNumberish;
          prevTotalElements: BigNumberish;
          extraData: BytesLike;
        };
        stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
        stateTrieWitness: BytesLike;
        storageTrieWitness: BytesLike;
      };
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    batchRelayMessages(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "batchRelayMessages(tuple[])"(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    batchRelayMessages(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "batchRelayMessages(tuple[])"(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    batchRelayMessages(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "batchRelayMessages(tuple[])"(
      _messages: {
        target: string;
        sender: string;
        message: BytesLike;
        messageNonce: BigNumberish;
        proof: {
          stateRoot: BytesLike;
          stateRootBatchHeader: {
            batchIndex: BigNumberish;
            batchRoot: BytesLike;
            batchSize: BigNumberish;
            prevTotalElements: BigNumberish;
            extraData: BytesLike;
          };
          stateRootProof: { index: BigNumberish; siblings: BytesLike[] };
          stateTrieWitness: BytesLike;
          storageTrieWitness: BytesLike;
        };
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
