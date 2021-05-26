---
sidebar_position: 1
---

# math.js

Based on this lib but you can extend and combine any libraries you want

Modify the `nemathode.math.config.js` file:

```js title="nemathode.math.config.js"
import * as mathjs from 'mathjs';

module.exports = {
	mathConstants: {
		'E': mathjs.e,
		'LN2': mathjs.LN2,
		'LN10': mathjs.LN10,
		'LOG10E': mathjs.LOG10E,
		'LOG2E': mathjs.LOG2E,
		'PI': mathjs.pi,
		'SQRT1_2': mathjs.SQRT1_2,
		'SQRT2': mathjs.SQRT2,
	},
	functions: {
		'abs': {
			implementation: (...args: Parameters<typeof mathjs.abs>): ReturnType<typeof mathjs.abs> => {
				return mathjs.abs(...args);
			},
		},
		'min': {
			implementation: (...args: Parameters<typeof mathjs.min>): ReturnType<typeof mathjs.min> => {
				// eslint-disable-next-line
				return mathjs.min(...args);
			},
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				return args.every(v => v === args[0]);
			},
		},
	},
	toInputType: (val: unknown): unknown => val,
	toOutputValue: (val: unknown): number | boolean => val,
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (
				l: mathjs.MathType,
				r: mathjs.MathType,
			): mathjs.MathType => {
				return mathjs.add(l, r);
			},
		},
		'-': {
			precedence: 1,
			implementation: (
				l: mathjs.MathType,
				r: mathjs.MathType,
			): mathjs.MathType => {
				return mathjs.subtract(l, r);
			},
		},
		'*': {
			precedence: 2,
			implementation: (
				l: mathjs.MathType,
				r: mathjs.MathType,
			): mathjs.MathType => {
				return mathjs.multiply(l, r);
			},
		},
		'/': {
			precedence: 2,
			implementation: (
				l: mathjs.MathType,
				r: mathjs.MathType,
			): mathjs.MathType => {
				return mathjs.divide(l, r);
			},
		},
		'%': {
			precedence: 2,
			implementation: (
				l: mathjs.MathType,
				r: mathjs.MathType,
			): mathjs.MathType => {
				return mathjs.mod(l, r);
			},
		},
	},
};
```
