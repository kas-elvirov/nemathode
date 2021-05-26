import { IState, Ast, IConfig, FunctionSignature } from '../typings';
export declare const evaluateAstWithInitialState: <_O extends {
    [operatorName: string]: {
        precedence: number;
        implementation: FunctionSignature;
    };
}, _FS extends FunctionSignature>(ast: Ast<_O, _FS>, config: IConfig) => number | boolean;
export declare const evaluateAst: <_O extends {
    [operatorName: string]: {
        precedence: number;
        implementation: FunctionSignature;
    };
}, _FS extends FunctionSignature>(state: IState<_O>, ast: Ast<_O, _FS>, config: IConfig) => number | boolean;
