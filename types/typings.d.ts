/**
 * ========= Math consts =========
*/
export declare type MathConstantValue = number;
export declare type MathConstantName<_M extends IConfig['mathConstants']> = Extract<keyof _M, string>;
/**
 * ========= Functions =========
*/
export declare type FunctionName<_F> = Extract<keyof _F, string>;
export declare type FunctionSignature = (...args: any) => unknown;
export declare type FunctionArguments<_F extends FunctionSignature> = Parameters<_F>;
/**
 * ========= Binary operators =========
*/
export declare type BinaryOperatorName<_O extends IConfig['binaryOperators']> = Extract<keyof _O, string>;
export interface IConfig {
    mathConstants: {
        [mathConstantName: string]: MathConstantValue;
    };
    functions: {
        [functionName: string]: {
            implementation: FunctionSignature;
        };
    };
    binaryOperators: {
        [operatorName: string]: {
            precedence: number;
            implementation: FunctionSignature;
        };
    };
    toInputType: (input: unknown) => unknown;
    toOutputValue: (output: unknown) => number | boolean;
}
/**
 * ========= Operands =========
*/
export declare type OddOperand<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = number | MathConstantName<M> | Expression<M, F, FN, O> | [FunctionName<F>, ...FunctionArguments<F[FN]['implementation']>];
export declare type EvenOperand<O extends IConfig['binaryOperators']> = BinaryOperatorName<O>;
export declare enum OperandType {
    Number = "NUMBER",
    Function = "FUNCTION",
    Expression = "EXPRESSION",
    MathConstantName = "MATH_CONSTANT",
    BinaryOperator = "BINARY_OPERATOR"
}
/**
 * ========= Expression =========
 *
 * Temporary but working solution
 *
 * Inspired by https://stackoverflow.com/a/54564117/5124009
*/
export declare type FunctionExpression<F extends IConfig['functions'], FN extends keyof F> = [
    FunctionName<F>,
    ...FunctionArguments<F[FN]['implementation']>
];
declare type Expression0<F extends IConfig['functions'], FN extends keyof F> = [
    FunctionExpression<F, FN>
];
declare type Expression1<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = [
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>
];
declare type Expression2<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = [
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>
];
declare type Expression3<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = [
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>
];
declare type Expression4<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = [
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>,
    EvenOperand<O>,
    OddOperand<M, F, FN, O>
];
export declare type Expression<M extends IConfig['mathConstants'], F extends IConfig['functions'], FN extends keyof F, O extends IConfig['binaryOperators']> = Expression0<F, FN> | Expression1<M, F, FN, O> | Expression2<M, F, FN, O> | Expression3<M, F, FN, O> | Expression4<M, F, FN, O>;
/**
 * ========= State =========
*/
export declare enum EvaluationStage {
    LeftOperandProcessing = 1,
    OperatorProcessing = 2,
    ReadyToCalcXValue = 3,
    AllOperandsAreProcessed = 4
}
export interface IState<O extends IConfig['binaryOperators']> {
    operandsProcessedAlready: number;
    evaluationStage: number;
    memoizedLValue: unknown;
    memoizedRValue: unknown;
    memoizedBinaryOperator: BinaryOperatorName<O>;
}
/**
 * ========= Ast =========
*/
export interface IFunctionValueForToken<_O extends IConfig['binaryOperators'], _F extends FunctionSignature> {
    name: FunctionName<_O>;
    args: FunctionArguments<_F>;
}
export interface IToken<_O extends IConfig['binaryOperators'], _F extends FunctionSignature> {
    type: OperandType;
    value: number | BinaryOperatorName<_O> | IFunctionValueForToken<_O, _F> | Ast<_O, _F>;
}
export declare type Ast<_O extends IConfig['binaryOperators'], _F extends FunctionSignature> = Array<IToken<_O, _F>>;
export {};
