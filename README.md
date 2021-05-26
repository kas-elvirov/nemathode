# <a href='https://nemathode.org'><img src='./docs/images/logo with name (small - light).png' height='60' alt='Nemathode logo' aria-label='nemathode.org' /></a>

Nemathode is array based mathematical expression notation (further in the text: nematode/s, expression/s).

```js

[0, '+', 1] === (0 + 1)

[0, '+', 1, '*', [2, '/', 3, '-', 4]] === (0 + 1б * (2 / 3 - 4))
```

Nemathode.js is a JavaScript library for nemathodes evaluation. It lets you to combine any number of libraries while leaving the format of the expressions unchanged (aggregator of solutions under one format)

<img src='./docs/images/main flow.jpg' height='500px' alt='Main flow' aria-label='main flow schema' />

```js
const res1 = nemathode.evaluate([0, '+', 1]); // 1
const res2 = nemathode.evaluate([0, '+', 1, '*', [2, '/', 1, '-', 3]]); // -1
```


![dependencies](https://img.shields.io/badge/dependencies-0-blue?style=flat-square)
![bundle size](https://img.shields.io/badge/build--size-9kb-green?style=flat-square)
![npm](https://img.shields.io/npm/v/nemathode?style=flat-square&logo=npm)
<!-- ![npm](https://img.shields.io/npm/dm/nemathode?style=flat-square&logo=npm) -->
<!-- ![npm bundle size](https://img.shields.io/bundlephobia/min/nemathode?style=flat-square) -->


---

## Installation

```
$ npm install --save nemathode
```
or
```
$ yarn add nemathode
```

## Fast introduction

Read article [here](https://medium.com/p/7474359d8484)

## Examples

- binary operators

```js
const sumOperator = nemathode.evaluate([1, '+', 1]); // 2
const mulOperator = nemathode.evaluate([1, '*', 1]); // 1
```

- functions

```js
const customFunction = nemathode.evaluate([1, '+', ['abs', 1, 2, 3]]); //a rguments are not evaluated (future)
const singleFunction = nemathode.evaluate([['abs', 1, 2, 3]]; // single function syntax (it's not convinient, but for now it's only way)
const boolResult = nemathode.evaluate([['areEqual', 1, 2, 3]]); // returns boolean
// etc
```

- math constants
```js
const piConst = nemathode.mathConstants.PI;
const piConstInUse = nemathode.evaluate([1, '+', 'PI']);
```

- nested expressions

```js
const resOfNestedExp = nemathode.evaluate([1, '+', 'PI', '*', ['abs', 1, 2, 3], '-', [1, '+', [1, '/', 25]]]);
```

# Configuration

### mathConstants
Literally, mathematical constants

- <a href="#example-purejs">full example</a>

### functions
Set of records with implementations

- <a href="#example-purejs">full example</a>

### toInputType
It seems excessive but not everyone using pure js functionality. There are set of libraries where intermediate type is not a number, for example: bignumber.js, decimal.js etc (we have on our website set of configs for most popular libs). So you can configure entry handler for them like

```js
const toInputType = (val: unknown): Decimal | unknown => {
	if (typeof val === 'number') {
		const input = new Decimal(val);

		return input;
	}

	return val;
};
```

### toOutputType
Opposite of toInputType. See at an example

```js
const toOutputValue = (val: unknown): number | boolean => {
	if (val instanceof Decimal) {
		return val.toNumber();
	}

	return val;
};
```

### binaryOperators
Let's look at one of examples

```js
...
    '+': {
        precedence: 1,
        implementation: (l: number, r: number): number => {
            return l + r;
        },
    }
...
```
It's a configuration for operator that consists from two (by now) fields: precedence, implementation (the same as in functions).

## example (pure js)
```js
const config = {
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
		toOutputValue: (val: unknown): number | boolean => val as number | boolean,
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

# API

```js
import Nemathode from 'nemathode';
import { config } from './config';

const nemathode = Nemathode({
    ...config,
});

// method for expression evaluation
const res = nemathode.evaluate([...]);

// example of getting math constant
nemathode.mathConstants.SOME_CONST;
```

## License

MIT © [Artem Vadimovich Solovev](http://www.artemsolovev.com/)