import expect from 'expect';
import each from 'jest-each';

import getAst from '../getAst';
import { INITIAL_CONFIG } from '../configuration/pureJS';
import { OperandType } from '../typings';

const data = {
	simple: [
		[
			[1, '-', 1],
			[
				{ type: OperandType.Number, value: 1 },
				{ type: OperandType.BinaryOperator, value: '-' },
				{ type: OperandType.Number, value: 1 },
			],
		],
		[
			[1, '-', 2, '+', 3, '*', 4],
			[
				{ type: OperandType.Number, value: 1 },
				{ type: OperandType.BinaryOperator, value: '-' },
				{ type: OperandType.Number, value: 2 },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.Number, value: 3 },
				{ type: OperandType.BinaryOperator, value: '*' },
				{ type: OperandType.Number, value: 4 },
			],
		],
	],

	multiLevel: [
		[
			[1, '-', 2, '*', [3, '+', 4]],
			[
				{ type: OperandType.Number, value: 1 },
				{ type: OperandType.BinaryOperator, value: '-' },
				{ type: OperandType.Number, value: 2 },
				{ type: OperandType.BinaryOperator, value: '*' },
				{
					type: OperandType.Expression, value: [
						{ type: OperandType.Number, value: 3 },
						{ type: OperandType.BinaryOperator, value: '+' },
						{ type: OperandType.Number, value: 4 },
					],
				},
			],
		],
		[
			[1, '-', 2, '*', [[3, '+', 4], '+', 4]],
			[
				{ type: OperandType.Number, value: 1 },
				{ type: OperandType.BinaryOperator, value: '-' },
				{ type: OperandType.Number, value: 2 },
				{ type: OperandType.BinaryOperator, value: '*' },
				{
					type: OperandType.Expression, value: [
						{
							type: OperandType.Expression, value: [
								{ type: OperandType.Number, value: 3 },
								{ type: OperandType.BinaryOperator, value: '+' },
								{ type: OperandType.Number, value: 4 },
							],
						},
						{ type: OperandType.BinaryOperator, value: '+' },
						{ type: OperandType.Number, value: 4 },
					],
				},
			],
		],
	],

	mathConstants: [
		[
			[
				'E', '+',
				'LN2', '+',
				'LN10', '+',
				'LOG10E', '+',
				'LOG2E', '+',
				'PI', '+',
				'SQRT1_2', '+',
				'SQRT2',
			],
			[
				{ type: OperandType.MathConstantName, value: Math.E },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.LN2 },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.LN10 },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.LOG10E },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.LOG2E },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.PI },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.SQRT1_2 },
				{ type: OperandType.BinaryOperator, value: '+' },
				{ type: OperandType.MathConstantName, value: Math.SQRT2 },
				{ type: OperandType.BinaryOperator, value: '+' },
			],
		],
	],

	functions: [
		[
			[
				['abs', -5],
				'+',
				['min', 1, 2, 3, 4],
				'+', [
					['abs', -5],
					'+',
					['min', 1, 2, 3, 4],
					'*',
					['min', 1, 2, 3, 4],
				],
			],
			[
				{
					type: OperandType.Function, value: {
						name: 'abs',
						args: [-5],
					},
				},
				{ type: OperandType.BinaryOperator, value: '+' },
				{
					type: OperandType.Function, value: {
						name: 'min',
						args: [1, 2, 3, 4],
					},
				},
				{ type: OperandType.BinaryOperator, value: '+' },
				{
					type: OperandType.Expression, value: [
						{
							type: OperandType.Function, value: {
								name: 'abs',
								args: [-5],
							},
						},
						{ type: OperandType.BinaryOperator, value: '+' },
						{
							type: OperandType.Function, value: {
								name: 'min',
								args: [1, 2, 3, 4],
							},
						},
						{ type: OperandType.BinaryOperator, value: '*' },
						{
							type: OperandType.Function, value: {
								name: 'min',
								args: [1, 2, 3, 4],
							},
						},
					],
				},
			],
		],
	],

	errors: [
		[
			'',
			SyntaxError,
		],
		[
			[],
			SyntaxError,
		],
		[
			['123'],
			SyntaxError,
		],
	],
};

describe('nemathode simple', () => {
	each(data.simple).test(
		'shouldnt pass %o and gives us %s',
		(expression, ast) => {
			expect(getAst(expression, INITIAL_CONFIG)).toEqual(expect.arrayContaining(ast));
		},
	);
});

describe('nemathode multiLevel', () => {
	each(data.multiLevel).test(
		'shouldnt pass %o and gives us %s',
		(expression, ast) => {
			expect(getAst(expression, INITIAL_CONFIG)).toEqual(expect.arrayContaining(ast));
		},
	);
});

describe('nemathode mathConstants', () => {
	each(data.mathConstants).test(
		'shouldnt pass %o and gives us %s',
		(expression, ast) => {
			expect(getAst(expression, INITIAL_CONFIG)).toEqual(expect.arrayContaining(ast));
		},
	);
});

describe('nemathode functions', () => {
	each(data.functions).test(
		'shouldnt pass %o and gives us %s',
		(expression, ast) => {
			expect(getAst(expression, INITIAL_CONFIG)).toEqual(expect.arrayContaining(ast));
		},
	);
});

describe('nemathode error', () => {
	each(data.errors).test(
		'shouldnt pass %o and gives us %s',
		(expression, ast) => {
			try {
				getAst(expression, INITIAL_CONFIG);
			} catch (error) {
				expect(error).toBeInstanceOf(ast);
			}
		},
	);
});
