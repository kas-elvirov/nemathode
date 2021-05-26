import {
	BinaryOperatorName,
	EvaluationStage,
	IConfig,
	IState,
} from '../typings';

function initDefaultState<_O extends IConfig['binaryOperators']>(): Readonly<IState<_O>> {
	return {
		operandsProcessedAlready: 0,
		evaluationStage: EvaluationStage.LeftOperandProcessing,
		memoizedLValue: undefined,
		memoizedRValue: undefined,
		memoizedBinaryOperator: undefined as unknown as BinaryOperatorName<_O>, // TODO
	};
}

export const INITIAL_STATE = initDefaultState();
