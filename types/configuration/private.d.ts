import { IState } from '../typings';
export declare const INITIAL_STATE: Readonly<IState<{
    [operatorName: string]: {
        precedence: number;
        implementation: import("../typings").FunctionSignature;
    };
}>>;
