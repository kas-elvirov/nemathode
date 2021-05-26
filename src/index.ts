import {
	Expression,
	IConfig,
	Ast,
	FunctionSignature,
} from './typings';

import {
	INITIAL_CONFIG,
} from './configuration/pureJS';

import { evaluateAstWithInitialState } from './evaluateAst';
import getAst from './getAst';

/**
 * Private
*/
class _Nemathode<_M extends IConfig['mathConstants'],
	_F extends IConfig['functions'],
	_FN extends keyof _F,
	_O extends IConfig['binaryOperators'],
	_FS extends FunctionSignature> {
	private config: Readonly<IConfig>;
	public mathConstants: _M;

	constructor(config: IConfig) {
		this.config = config;
		this.mathConstants = config.mathConstants as _M;
	}

	evaluate = (expression: Expression<_M, _F, _FN, _O>) => {
		const ast = getAst(expression, { ...this.config });

		const result = evaluateAstWithInitialState(
			[...ast],
			{ ...this.config },
		);

		return result;
	};

	evaluatePlease = (expression: Expression<_M, _F, _FN, _O>) => {
		console.info('🤗');

		return this.evaluate(expression);
	};


	evaluateAst = (ast: Readonly<Ast<_O, _FS>>) => {
		const result = evaluateAstWithInitialState(
			[...ast],
			{ ...this.config },
		);

		return result;
	};

	getAst = (expression: Readonly<Expression<_M, _F, _FN, _O>>): Ast<_O, _FS> => {
		const ast = getAst(expression, { ...this.config });

		return ast;
	};
}

/**
 * Public
*/
export default function Nemathode<_M extends IConfig['mathConstants'],
	_F extends IConfig['functions'],
	_FN extends keyof _F,
	_O extends IConfig['binaryOperators'],
	_FS extends FunctionSignature>
	(config?: Readonly<Partial<IConfig>>): _Nemathode<_M, _F, _FN, _O, _FS> {
	return new _Nemathode(
		{
			mathConstants: config?.mathConstants
				|| INITIAL_CONFIG.mathConstants,
			functions: config?.functions
				|| INITIAL_CONFIG.functions,
			binaryOperators: config?.binaryOperators
				|| INITIAL_CONFIG.binaryOperators,
			toInputType: config?.toInputType
				|| INITIAL_CONFIG.toInputType,
			toOutputValue: config?.toOutputValue
				|| INITIAL_CONFIG.toOutputValue,
		},
	);
}
