export function getUnexpectedExpressionFormatError(): SyntaxError {
	return new SyntaxError(
		'It looks like you passed expression with wrong format:' +
		'\n1. Check your expression, please' +
		'\n2. Check TS configuration',
	);
}

export function getErrorForAnEmptyExpression(): SyntaxError {
	return new SyntaxError(
		'It looks like you passed an empty expression' +
		'\n1. Please check your expression',
	);
}
