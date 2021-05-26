---
sidebar_position: 1
---

# big.js

Based on this lib but you can extend and combine any libraries you want

Modify the `nemathode.big.config.js` file:

```js title="nemathode.big.config.js"
import bigjs, { Big } from 'big.js';

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
				return (bigjs(...args)).abs();
			},
		},
		'min': {
			implementation: Math.min,
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				const firstEl = bigjs(args[0]);

				return args.every(arg => firstEl.eq(bigjs(arg)));
			},
		},
	},
	toInputType: (val: unknown): Big | unknown => {
		if (typeof val === 'number') {
			const input = bigjs(val);

			return input;
		}

		return val;
	},
	toOutputValue: (val: unknown): unknown => {
		if (val instanceof Big) {
			return val.toNumber();
		}

		/* if (typeof val === 'string') {
			return Number(val);
		} */

		return val;
	},
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (
				l: Big,
				r: Big,
			): Big => {
				return l.plus(r);
			},
		},
		'-': {
			precedence: 1,
			implementation: (
				l: Big,
				r: Big,
			): Big => {
				return l.minus(r);
			},
		},
		'*': {
			precedence: 2,
			implementation: (
				l: Big,
				r: Big,
			): Big => {
				return l.mul(r);
			},
		},
		'/': {
			precedence: 2,
			implementation: (
				l: Big,
				r: Big,
			): Big => {
				return l.div(r);
			},
		},
		'%': {
			precedence: 2,
			implementation: (l: Big, r: Big): Big => {
				return new bigjs(l.toNumber() % r.toNumber());
			},
		},
	},
};
```
