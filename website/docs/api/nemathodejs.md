---
id: nemathode.js
title: nemathode.js
description: API methods of nemathode.js.
slug: /nemathode.js
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

Read article if you have a few minutes [here](https://medium.com/p/7474359d8484)

or

Start with placing your config and creating an instance

```js title="nemathode.js"
import Nemathode from 'nemathode';
import { config } from './config';

const nemathode = Nemathode({
    ...config,
});
```

### `evaluate` {#evaluate}

- Type: `(expression: Expression) => boolean | number`

Method for expression evaluation

```js title="nemathode.js"
const res = nemathode.evaluate([...]);
```

### `evaluatePlease` {#evaluatePlease}

- Type: `(expression: Expression) => boolean | number`

Doing same thing as `evaluate` but with love (don't forget being polite even with code)

```js title="nemathode.js"
const res = nemathode.evaluatePlease([...]);
```

### `mathConstants` {#mathConstants}

- Type: `any`

Static property of nemathode.js instance

```js title="nemathode.js"
console.log(nemathode.mathConstants.SOME_CONST);
```

