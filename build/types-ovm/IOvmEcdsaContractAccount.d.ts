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

interface IOvmEcdsaContractAccountInterface extends ethers.utils.Interface {
  functions: {
    "execute(bytes,uint8,uint8,bytes32,bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "execute",
    values: [BytesLike, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;

  events: {};
}

export class IOvmEcdsaContractAccount extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IOvmEcdsaContractAccountInterface;

  functions: {
    execute(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "execute(bytes,uint8,uint8,bytes32,bytes32)"(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  execute(
    _transaction: BytesLike,
    _signatureType: BigNumberish,
    _v: BigNumberish,
    _r: BytesLike,
    _s: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "execute(bytes,uint8,uint8,bytes32,bytes32)"(
    _transaction: BytesLike,
    _signatureType: BigNumberish,
    _v: BigNumberish,
    _r: BytesLike,
    _s: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    execute(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _success: boolean;
      _returndata: string;
      0: boolean;
      1: string;
    }>;

    "execute(bytes,uint8,uint8,bytes32,bytes32)"(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      _success: boolean;
      _returndata: string;
      0: boolean;
      1: string;
    }>;
  };

  filters: {};

  estimateGas: {
    execute(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "execute(bytes,uint8,uint8,bytes32,bytes32)"(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    execute(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "execute(bytes,uint8,uint8,bytes32,bytes32)"(
      _transaction: BytesLike,
      _signatureType: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
