---
sidebar_position: 1
---

# decimal.js

Based on this lib but you can extend and combine any libraries you want

Modify the `nemathode.decimal.config.js` file:

```js title="nemathode.decimal.config.js"
import { Decimal } from 'decimal.js';

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
				return (new Decimal(...args)).abs();
			},
		},
		'min': {
			implementation: Math.min,
		},
		'areEqual': {
			implementation: (...args: number[]): boolean => {
				const firstEl = new Decimal(args[0]);
				return args.every(arg => firstEl.equals(new Decimal(arg)));
			},
		},
	},
	toInputType: (val: unknown): Decimal | unknown => {
		if (typeof val === 'number') {
			const input = new Decimal(val);
			return input;
		}
		return val;
	},
	toOutputValue: (val: unknown): number | boolean => {
		if (val instanceof Decimal) {
			return val.toNumber();
		}
		return val;
	},
	binaryOperators: {
		'+': {
			precedence: 1,
			implementation: (
				l: Decimal,
				r: Decimal,
			): Decimal => {
				return l.plus(r);
			},
		},
		'-': {
			precedence: 1,
			implementation: (
				l: Decimal,
				r: Decimal,
			): Decimal => {
				return l.minus(r);
			},
		},
		'*': {
			precedence: 2,
			implementation: (
				l: Decimal,
				r: Decimal,
			): Decimal => {
				return l.mul(r);
			},
		},
		'/': {
			precedence: 2,
			implementation: (
				l: Decimal,
				r: Decimal,
			): Decimal => {
				return l.div(r);
			},
		},
		'%': {
			precedence: 2,
			implementation: (l: Decimal, r: Decimal): Decimal => {
				return l.mod(r);
			},
		},
	},
};
```
