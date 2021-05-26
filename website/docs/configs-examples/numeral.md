---
sidebar_position: 1
---

# numeral.js

Based on this lib but you can extend and combine any libraries you want

Modify the `nemathode.numeral.config.js` file:

```js title="nemathode.numeral.config.js"
import numeral, { Numeral } from 'numeral';

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
			implementation: (...args) => {
				return Math.abs(...args);
			},
		},
		'min': {
			implementation: (...args) => {
				return Math.min(...args);
			},
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				return args.every(v => v === args[0]);
			},
		},
	},
	toInputType: (val: number): Numeral | any => {
		if (typeof val === 'number') {
			const input = numeral(val);
			return input;
		}
		return val;
	},
	toOutputValue: (val: Numeral): number | any => {
		if (typeof val === 'object') {
			return val.value();
		}
		return val;
	},
	/* toInputType: (val: number): numeral.Numeral => numeral(val),
	toOutputValue: (val: numeral.Numeral): number => val.value() as number, */
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (
				l: Numeral,
				r: Numeral,
			): Numeral => {
				return l.add(r.value());
			},
		},
		'-': {
			precedence: 1,
			implementation: (
				l: Numeral,
				r: Numeral,
			): Numeral => {
				return l.subtract(r.value());
			},
		},
		'*': {
			precedence: 2,
			implementation: (
				l: Numeral,
				r: Numeral,
			): Numeral => {
				return l.multiply(r.value());
			},
		},
		'/': {
			precedence: 2,
			implementation: (
				l: Numeral,
				r: Numeral,
			): Numeral => {
				return l.divide(r.value());
			},
		},
		'%': {
			precedence: 2,
			implementation: (l: Numeral, r: Numeral): Numeral => {
				return numeral(l.value() % r.value());
			},
		},
	},
};
```
