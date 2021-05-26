import {
	getUnexpectedOperatorError,
	getUnknownOperandTypeAtOperatorPosition,
	getUnknownOperandTypeAtNumberPosition,
} from '../errors/getters/evaluateWithAst';

import { INITIAL_STATE } from '../configuration/private';

import {
	EvaluationStage,
	IState,
	Ast,
	OperandType,
	BinaryOperatorName,
	IConfig,
	FunctionSignature,
	IFunctionValueForToken,
} from '../typings';

import { next } from './helpers/next';

export const evaluateAstWithInitialState = <
	_O extends IConfig['binaryOperators'],
	_FS extends FunctionSignature
>(ast: Ast<_O, _FS>, config: IConfig) => {
	return evaluateAst(
		{ ...INITIAL_STATE } as IState<_O>,
		ast,
		config,
	);
};

export const evaluateAst = <
	_O extends IConfig['binaryOperators'],
	_FS extends FunctionSignature>(
		state: IState<_O>,
		ast: Ast<_O, _FS>,
		config: IConfig,
): number | boolean => {
	while (false === (state.operandsProcessedAlready >= ast.length)) {
		const currentToken = ast[state.operandsProcessedAlready];

		switch (state.evaluationStage) {
			/**
			 * 1st
			*/
			case EvaluationStage.LeftOperandProcessing:
				switch (currentToken.type) {
					case OperandType.MathConstantName:
					case OperandType.Number:
						state.evaluationStage = EvaluationStage.OperatorProcessing;
						state.memoizedLValue = config.toInputType(currentToken.value);

						next(state);

						break;
					case OperandType.Function: {
						const functionValueForToken = currentToken.value as IFunctionValueForToken<_O, _FS>;
						const value = config
							.functions[functionValueForToken.name]
							.implementation
							.apply(
								undefined,
								functionValueForToken.args,
							);

						state.evaluationStage = EvaluationStage.OperatorProcessing;
						state.memoizedLValue = config.toInputType(value);

						next(state);

						break;
					}

					case OperandType.Expression: {
						state.evaluationStage = EvaluationStage.OperatorProcessing;
						state.memoizedLValue = config.toInputType(
							evaluateAstWithInitialState(
								currentToken.value as Ast<_O, _FS>,
								config,
							));

						next(state);

						break;
					}

					case OperandType.BinaryOperator: {
						const position = state.operandsProcessedAlready;

						throw getUnexpectedOperatorError(
							currentToken.value as string,
							position,
						);
					}
				}

				break;

			/**
			 * 2nd
			*/
			case EvaluationStage.OperatorProcessing:
				switch (currentToken.type) {
					case OperandType.BinaryOperator:
						state.evaluationStage = EvaluationStage.ReadyToCalcXValue;
						state.memoizedBinaryOperator = currentToken.value as BinaryOperatorName<_O>;

						next(state);

						break;

					case OperandType.Expression:
					case OperandType.MathConstantName:
					case OperandType.Number: {
						const position = state.operandsProcessedAlready;

						throw getUnknownOperandTypeAtOperatorPosition(
							currentToken.value as string,
							position,
						);
					}
				}

				break;

			/**
			 * 3rd
			*/
			case EvaluationStage.ReadyToCalcXValue:
				switch (currentToken.type) {
					case OperandType.MathConstantName:
					case OperandType.Number:
						state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
						state.memoizedRValue = config.toInputType(currentToken.value);

						next(state);

						break;

					case OperandType.Function: {
						const functionValueForToken = currentToken.value as IFunctionValueForToken<_O, _FS>;
						const value = config
							.functions[functionValueForToken.name]
							.implementation
							.apply(
								undefined,
								functionValueForToken.args,
							);

						state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
						state.memoizedRValue = config.toInputType(value);

						next(state);

						break;
					}

					case OperandType.Expression:
						state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
						state.memoizedRValue = config.toInputType(
							evaluateAstWithInitialState(
								currentToken.value as Ast<_O, _FS>,
								config,
							));

						next(state);

						break;

					case OperandType.BinaryOperator: {
						const position = state.operandsProcessedAlready;

						throw getUnknownOperandTypeAtNumberPosition(
							currentToken.value as BinaryOperatorName<_O>,
							position,
						);
					}
				}

				break;

			/**
			 * 4th
			*/
			case EvaluationStage.AllOperandsAreProcessed: {
				switch (currentToken.type) {
					case OperandType.BinaryOperator: {
						const currentOperator = currentToken.value as BinaryOperatorName<_O>;
						const previousOperator = state.memoizedBinaryOperator;

						const currentPrecedence = config
							.binaryOperators[previousOperator].precedence;
						const nextPrecedence = config
							.binaryOperators[currentOperator].precedence;

						if (currentPrecedence >= nextPrecedence) {
							state.evaluationStage = EvaluationStage.ReadyToCalcXValue;
							state.memoizedLValue = config
								.binaryOperators[previousOperator].implementation(
									state.memoizedLValue,
									state.memoizedRValue,
								);

							state.memoizedBinaryOperator = currentOperator;
							state.memoizedRValue = undefined;

							next(state);
						} else {
							const newState: IState<_O> = {
								evaluationStage: EvaluationStage.ReadyToCalcXValue,
								operandsProcessedAlready: state.operandsProcessedAlready + 1,
								memoizedLValue: state.memoizedRValue,
								memoizedBinaryOperator: currentOperator,
								memoizedRValue: undefined,
							};

							state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
							state.memoizedRValue = config.toInputType(
								evaluateAst(
									newState,
									ast,
									config,
								),
							);
							state.operandsProcessedAlready = newState.operandsProcessedAlready;
						}

						break;
					}
				}

				break;
			}
		}
	}

	/**
	 * TODO
	 * case with expression where only one function was provided
	 * for example: ['areEqual', 1, 1, 1, 1]
	*/
	if (!state.memoizedBinaryOperator) {
		return config.toOutputValue(state.memoizedLValue);
	}

	return config.toOutputValue(
		config.binaryOperators[state.memoizedBinaryOperator]
			.implementation(
				state.memoizedLValue,
				state.memoizedRValue,
			),
	);
};
