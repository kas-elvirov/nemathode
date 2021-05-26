import {
	IState,
	IConfig,
} from '../../typings';

export function next<_O extends IConfig['binaryOperators']>(state: IState<_O>): void {
	state.operandsProcessedAlready += 1;
}
