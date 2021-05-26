---
sidebar_position: 1
---

# pure JS

Based on pure JS functionality but you can extend and combine any libraries you want

Modify the `nemathode.pure.config.js` file:

```js title="nemathode.pure.config.js"
module.exports = {
	mathConstants: {
		'E': Math.E,
		'LN2': Math.LN2,
		'LN10': Math.LN10,
		'LOG10E': Math.LOG10E,
		'LOG2E': Math.LOG2E,
		'PI': Math.PI,
		'SQRT1_2': Math.SQRT1_2,
		'SQRT2': Math.SQRT2,
	},
	functions: {
		'abs': {
			implementation: Math.abs,
		},
		'min': {
			implementation: Math.min,
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				return args.every(v => v === args[0]);
			},
		},
	},
	toInputType: (val: unknown): unknown => val,
	toOutputValue: (val: unknown): unknown => val,
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (l: number, r: number): number => {
				return l + r;
			},
		},
		'-': {
			precedence: 1,
			implementation: (l: number, r: number): number => {
				return l - r;
			},
		},
		'*': {
			precedence: 2,
			implementation: (l: number, r: number): number => {
				return l * r;
			},
		},
		'/': {
			precedence: 2,
			implementation: (l: number, r: number): number => {
				return l / r;
			},
		},
		'%': {
			precedence: 2,
			implementation: (l: number, r: number): number => {
				return l % r;
			},
		},
	},
};
```
