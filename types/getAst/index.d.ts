import { Expression, Ast, IConfig, FunctionSignature } from '../typings';
export default function getAst<_M extends IConfig['mathConstants'], _F extends IConfig['functions'], _FN extends keyof _F, _O extends IConfig['binaryOperators'], _FS extends FunctionSignature>(expression: Readonly<Expression<_M, _F, _FN, _O>>, config: IConfig): Ast<_O, _FS>;
