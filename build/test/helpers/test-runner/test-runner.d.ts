import { TestDefinition } from './test.types';
export declare class ExecutionManagerTestRunner {
    private snapshot;
    private contracts;
    private defaultPreState;
    run(test: TestDefinition): void;
    private initContracts;
    static getDummyAddress(placeholder: string): string;
    private setPlaceholderStrings;
    private runTestStep;
    private parseTestStep;
    private shouldStepOnlyValidateFlag;
    private getReturnStatus;
    private encodeFunctionData;
    private encodeExpectedReturnData;
}
