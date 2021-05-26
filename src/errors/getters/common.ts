import {
	IConfig,
} from '../../typings';
import { getSuggestionForOperand } from '../helpers/getSuggestionForOperand';

export function getUnknownOperandType(
	operand: string,
	config: IConfig,
): SyntaxError {
	return new SyntaxError(getSuggestionForOperand(
		operand,
		[
			Object.keys(config.functions),
			Object.keys(config.mathConstants),
			Object.keys(config.binaryOperators),
		],
	));
}
