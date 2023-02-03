import {
	OperandType,
	Expression,
	Ast,
	IToken,
	IConfig,
	FunctionName,
	FunctionExpression,
	FunctionArguments,
	FunctionSignature,
	BinaryOperatorName,
	IFunctionValueForToken,
} from '../typings';

import { getUnknownOperandType } from '../errors/getters/common';
import {
	getUnexpectedExpressionFormatError,
	getErrorForAnEmptyExpression,
} from '../errors/getters/getAst';

export default function getAst<_M extends IConfig['mathConstants'],
	_F extends IConfig['functions'],
	_FN extends keyof _F,
	_O extends IConfig['binaryOperators'],
	_FS extends FunctionSignature>(expression: Readonly<Expression<_M, _F, _FN, _O>>, config: IConfig): Ast<_O, _FS> {
	if (!Array.isArray(expression)) {
		throw getUnexpectedExpressionFormatError();
	}

	if ((expression as Array<unknown>).length === 0) {
		throw getErrorForAnEmptyExpression();
	}

	const ast = [];

	for (let i = 0; i < expression.length; ++i) {
		if (typeof expression[i] === 'number') {
			const token: IToken<_O, _FS> = {
				type: OperandType.Number,
				value: expression[i] as number,
			};

			ast.push(token);

			continue;
		}

		const isString = typeof expression[i] === 'string';

		if (
			isString
			&& config.binaryOperators[expression[i] as string]
		) {
			const token: IToken<_O, _FS> = {
				type: OperandType.BinaryOperator,
				value: expression[i] as BinaryOperatorName<_O>,
			};

			ast.push(token);

			continue;
		}

		if (
			isString
			&& config.mathConstants[expression[i] as string]
		) {
			const token: IToken<_O, _FS> = {
				type: OperandType.MathConstantName,
				value: config.mathConstants[expression[i] as string],
			};

			ast.push(token);

			continue;
		}

		if (
			Array.isArray(expression[i])
			&& typeof ((expression[i] as Array<unknown>)[0]) === 'string'
			&& config.functions[(expression[i] as Array<string>)[0]]
		) {
			const functionExpression = [
				...expression[i] as FunctionExpression<_F, _FN>,
			];
			const functionName = functionExpression.shift() as FunctionName<_F>;
			const functionArguments = [...functionExpression] as FunctionArguments<_FS>;
			const tokenValue = {
				name: functionName,
				args: functionArguments,
			} as IFunctionValueForToken<_O, _FS>;

			const token: IToken<_O, _FS> = {
				type: OperandType.Function,
				value: tokenValue,
			};

			ast.push(token);

			continue;
		}

		const astLen = ast.length;
		const isArgumentsOperand = astLen > 0
			&& ast[astLen - 1].type === OperandType.Function;

		// skip arguments for function (we handled them in the previous step)
		if (isArgumentsOperand) {
			continue;
		}

		if (Array.isArray(expression[i])) {
			const token: IToken<_O, _FS> = {
				type: OperandType.Expression,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				value: getAst(expression[i], config),
			};

			ast.push(token);

			continue;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		throw getUnknownOperandType(expression[i], config);
	}

	return ast;
}
