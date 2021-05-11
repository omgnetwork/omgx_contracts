import { Contract, Signer } from 'ethers';
export declare class GasMeasurement {
    GasMeasurementContract: Contract;
    init(wallet: Signer): Promise<void>;
    getGasCost(targetContract: Contract, methodName: string, methodArgs?: Array<any>): Promise<number>;
}
