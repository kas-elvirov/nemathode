export function getUnexpectedOperatorError(
	operator: string,
	position: number,
): SyntaxError {
	return new SyntaxError(
		`It\'s just unexpected operator ${operator} at position ${position}. '
		+ 'Remove it from there`,
	);
}

export function getUnknownOperandTypeAtOperatorPosition(
	operand: string,
	position: number,
): SyntaxError {
	return new SyntaxError(
		`You are using unknown operand <${operand}> at position '
		+ '${position}.'
		+ '\n1. most likely you missed the operator between expressions'
		+ '\n2. or you forgot to define your implementation for this operator`,
	);
}

export function getUnknownOperandTypeAtNumberPosition(
	operand: string,
	position: number,
): SyntaxError {
	return new SyntaxError(
		`You are using unknown operand <${operand}> at position ${position}.'
		+ '\n1. most likely you missed to write a number or expression'
		+ '\n2. or you forgot to cast string to number`,
	);
}

export function getUnexpectedEndOfExpression(): SyntaxError {
	return new SyntaxError(
		'It shouldn\'t have happened. Please let me know about this case',
	);
}
