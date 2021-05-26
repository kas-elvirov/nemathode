import { Expression, IConfig, Ast, FunctionSignature } from './typings';
/**
 * Private
*/
declare class _Nemathode<_M extends IConfig['mathConstants'], _F extends IConfig['functions'], _FN extends keyof _F, _O extends IConfig['binaryOperators'], _FS extends FunctionSignature> {
    private config;
    mathConstants: _M;
    constructor(config: IConfig);
    evaluate: (expression: Expression<_M, _F, _FN, _O>) => number | boolean;
    evaluatePlease: (expression: Expression<_M, _F, _FN, _O>) => number | boolean;
    evaluateAst: (ast: Readonly<Ast<_O, _FS>>) => number | boolean;
    getAst: (expression: Readonly<Expression<_M, _F, _FN, _O>>) => Ast<_O, _FS>;
}
/**
 * Public
*/
export default function Nemathode<_M extends IConfig['mathConstants'], _F extends IConfig['functions'], _FN extends keyof _F, _O extends IConfig['binaryOperators'], _FS extends FunctionSignature>(config?: Readonly<Partial<IConfig>>): _Nemathode<_M, _F, _FN, _O, _FS>;
export {};
