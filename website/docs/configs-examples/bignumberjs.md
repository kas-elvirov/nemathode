---
sidebar_position: 1
---

# bignumber.js

Based on this lib but you can extend and combine any libraries you want

Modify the `nemathode.bignumber.config.js` file:

```js title="nemathode.bignumber.config.js"
import BignumberJS from 'bignumber.js';

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
				return (new BignumberJS(...args)).abs();
			},
		},
		'min': {
			implementation: Math.min,
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				const firstEl = new BignumberJS(args[0]);

				return args.every(arg => firstEl.isEqualTo(new BignumberJS(arg)));
			},
		},
	},
	toInputType: (val: unknown): BignumberJS | unknown => {
		if (typeof val === 'number') {
			const input = new BignumberJS(val);

			return input;
		}

		return val;
	},
	toOutputValue: (val: unknown): number | boolean => {
		if (val instanceof BignumberJS) {
			return val.toNumber();
		}

		return val;
	},
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (
				l: BignumberJS,
				r: BignumberJS,
			): BignumberJS => {
				return l.plus(r);
			},
		},
		'-': {
			precedence: 1,
			implementation: (
				l: BignumberJS,
				r: BignumberJS,
			): BignumberJS => {
				return l.minus(r);
			},
		},
		'*': {
			precedence: 2,
			implementation: (
				l: BignumberJS,
				r: BignumberJS,
			): BignumberJS => {
				return l.multipliedBy(r);
			},
		},
		'/': {
			precedence: 2,
			implementation: (
				l: BignumberJS,
				r: BignumberJS,
			): BignumberJS => {
				return l.div(r);
			},
		},
		'%': {
			precedence: 2,
			implementation: (l: BignumberJS, r: BignumberJS): BignumberJS => {
				return l.mod(r);
			},
		},
	},
};
```
