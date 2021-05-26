import { Ast, IState, IConfig, FunctionSignature } from '../../typings';
export declare function isEvaluationFinished<_O extends IConfig['binaryOperators'], _FS extends FunctionSignature>(ast: Ast<_O, _FS>, state: IState<_O>): boolean;
