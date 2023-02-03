import expect from 'expect';
import each from 'jest-each';

import Nemathode from '../index';

const nemathode = Nemathode();

const data = {
	simple: [
		/**
		 * -
		*/
		[
			[1, '-', 1],
			0,
		],
		[
			[10, '-', 1],
			9,
		],
		[
			[1, '-', 10],
			-9,
		],

		/**
		 * +
		*/
		[
			[1, '+', 1],
			2,
		],
		[
			[10, '+', 1],
			11,
		],
		[
			[1, '+', 10],
			11,
		],

		/**
		 * *
		*/
		[
			[1, '*', 1],
			1,
		],

		/**
		 * /
		*/
		[
			[1, '/', 1],
			1,
		],

		/**
		 * %
		*/
		[
			[1, '%', 1],
			0,
		],
	],
	multiLevel: [
		[
			[1, '-', 1, '*', [1, '+', 1]],
			-1,
		],
		[
			[3, '-', 20, '*', [1, '+', 1]],
			-37,
		],
		[
			[0.1, '+', 3.33, '+', [0.1, '+', 3.33, '+', [4, '*', 100]], '+', 10, '*', 3],
			436.86,
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
			12.853916621954689,
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
			12,
		],
		[
			[
				['areEqual', 1, 1, 1, 1],
			],
			true,
		],
		[
			[
				['areEqual', 2, 1, 1, 1],
			],
			false,
		],
		[
			[
				['min', 1, 2, 3, 4],
			],
			1,
		],
	],
};

describe('nemathode simple', () => {
	each(data.simple).test(
		'shouldnt pass %o and gives us %s',
		(input, expected) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			expect(nemathode.evaluate(input)).toEqual(expected);
		},
	);
});

describe('nemathode multiLevel', () => {
	each(data.multiLevel).test(
		'shouldnt pass %o and gives us %s',
		(input, expected) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			expect(nemathode.evaluate(input)).toEqual(expected);
		},
	);
});

describe('nemathode mathConstants', () => {
	each(data.mathConstants).test(
		'shouldnt pass %o and gives us %s',
		(input, expected) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			expect(nemathode.evaluate(input)).toEqual(expected);
		},
	);
});

describe('nemathode functions', () => {
	each(data.functions).test(
		'shouldnt pass %o and gives us %s',
		(input, expected) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			expect(nemathode.evaluate(input)).toEqual(expected);
		},
	);
});
