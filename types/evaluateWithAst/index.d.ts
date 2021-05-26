import { IState, Ast, IConfig, FunctionSignature } from '../typings';
declare const _evaluateWithAst: <_O extends {
    [operatorName: string]: {
        precedence: number;
        implementation: FunctionSignature;
    };
}, _FS extends FunctionSignature>(state: IState<_O>, ast: Ast<_O, _FS>, config: IConfig) => number | boolean;
export default _evaluateWithAst;
