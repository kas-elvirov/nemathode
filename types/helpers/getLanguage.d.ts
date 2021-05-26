export declare type Locale = 'ru' | 'en';
export declare type TranslationsForLocale = Record<string, string>;
export declare const DEFAULT_LANGUAGE: Locale;
export default function getLanguage(): Locale;
