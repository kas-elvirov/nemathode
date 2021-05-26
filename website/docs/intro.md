---
sidebar_position: 1
---

# Nemathode syntax

Nemathode is array based mathematical expression notation

The need to create an intermediate type of mathematical expressions, as close as possible to the native type of language (JavaScript as first experiment), in order to get the opportunity to bring the entire diversity of the ecosystem of mathematical libraries under one denominator

## Type of operands

### Number

> type: number

```js
// example
[1, ... , 1]
```

### Binary operator

> type: string

```js
// common notation
[..., 'OPERATOR', ...]

// examples
[..., '+', ...]
[..., '-', ...]
[..., '*', ...]
[..., 'CUSTOM_OPERATOR', ...]
```

### Function

> type: string

First argument is a function name and the rest are parameters of this function. When you are placing an operand in expression you have to wrap it in square brackets

```js
// common notation
[['FUNCTION_NAME', ...functionArguments[]], ...]

// example
[['abs', 1, 2, 3]]
```

### Math Constant

> type: string

First argument is a function name and the rest are parameters of this function

```js
// common notation
['MATH_CONSTANT', ...]

// example
['E', '+', 1, ...]
```

### Nested expression

> type: nemathode

Expression (based on structures above but still, it’s an operand). Combine all of the rules from above. Nesting depth is unlimited

```js
// example with two levels of nesting
[0, '+', 1, '*', [2, '/', 3, '-', 4]]
```
