import { getDistance } from './getDistance';

interface ISuggestion {
	source: string;
	suggestion: string;
	distance: number;
}

function compareSusggestions(a: ISuggestion, b: ISuggestion): number {
	return a.distance - b.distance;
}

function filterSuggestions(suggestions: ISuggestion[]): ISuggestion[] {
	return suggestions
		.filter(suggestion =>
			suggestion.distance < suggestion.source.length
			|| suggestion.suggestion.includes(suggestion.source));
}

function getDistances(operand: string, possibleNames: string[]): ISuggestion[] {
	const suggestions: ISuggestion[] = [];

	for (let i = 0; i < possibleNames.length; ++i) {
		const suggestion = possibleNames[i];
		const distance = getDistance(operand, suggestion);

		const suggestionDictionary: ISuggestion = {
			source: operand,
			suggestion,
			distance,
		};

		suggestions.push(suggestionDictionary);
	}

	return filterSuggestions(suggestions);
}

function _getSuggestionForOperand(
	operand: string,
	possibleSuggestions: string[][],
): ISuggestion[] {
	const metacollection = possibleSuggestions
		.map((collection) => getDistances(operand, collection))
		.filter(collection => collection.length > 0);

	const flattenArr: ISuggestion[] = [];

	for (let i = 0; i < metacollection.length; ++i) {
		for (let j = 0; j < metacollection[i].length; ++j) {
			flattenArr.push(metacollection[i][j]);
		}
	}

	return flattenArr.sort(compareSusggestions);
}

export function getSuggestionForOperand(
	operand: string,
	possibleSuggestions: string[][],
): string {
	const suggestions = _getSuggestionForOperand(operand, possibleSuggestions);

	const cannotFind = `Cannot find operand --> ${operand}.\n`;
	const assumptionAboutThisError = 'Most likely you made a mistake when you were writing the operand'
		+ ' or you forgot to cast string to number.\n';

	if (suggestions.length === 0) {
		const emptySuggestionsList = 'There are nothing even remotely close to your '
			+ 'input in config you passed :(';

		return cannotFind + assumptionAboutThisError + emptySuggestionsList;
	}

	const list = suggestions.reduce((acc, curr) => {
		return `${acc}\t${curr.suggestion}\n`;
	}, '');

	const suggestionsTitle = 'Maybe you want to use on of the following?\n';

	return cannotFind + assumptionAboutThisError + suggestionsTitle + list;
}
