import { Locale } from './getLanguage';
interface IProps {
    key: string;
    targetLanguage: Locale;
    options?: Record<string, string | number>;
}
export default function translate(props: IProps): string;
export {};
