import * as O from 'fp-ts/lib/Option';
import { set, get } from 'macoolka-object';
import { I18NLanguagePackage, MessageInfo, I18NOptions } from './types';
import { languageNotFound } from './errors';
import { pipe } from 'fp-ts/lib/pipeable';
import { ReaderEither } from 'fp-ts/lib/ReaderEither';
import { left, right } from 'fp-ts/lib/Either';
import * as array from 'fp-ts/lib/Array';
export type ParseErrors = Array<MessageInfo>;

export type ParseResult<I, Output> = ReaderEither<Output, ParseErrors, I>;
type ParseMessageResult = ParseResult<I18NLanguagePackage, I18NLanguagePackage>;
/**
 * The prase language package with some rule.
 * Add other languge item when key exist in default language and no exist in other language
 * Remove other language item when key no exist in default language and exist in other language
 *
 * @example
 * import { parseLanguagePackage } from 'macoolka-i18n'
 * import {right} from 'fp-ts/lib/Either'
 * const option={
 *  defaultLanguage: 'en', languages: ['en', 'zh']
 * }
 * const init={
 *  en: { a: 'a1', b: 'b1' },
 *  zh: { a: 'a2', c: 'c1' }
 * }
 * const result = parseLanguagePackage(init)
 * expect(result).toEquals(right({
 *  zh: { a: 'a2', b: 'b1' },
 *  en: { a: 'a1', b: 'b1' }
 * }))
 */
const parseLanguagePackage = ({ defaultLanguage: locale, languages }: I18NOptions): ParseMessageResult => {
    return e => {

        return pipe(
            e[locale],
            O.fromNullable,
            O.fold(() => {
                return left([languageNotFound({ locale })]);
            }, defaultLocale => {
                const result: I18NLanguagePackage = { [locale]: defaultLocale };
                pipe(
                    languages,
                    array.filter(a => a !== locale),
                    array.map((a) => {
                        pipe(
                            Object.entries(defaultLocale),
                            array.map(([key, value]) => {
                                set(result, [a, key], get(e, [a, key], value));
                            })
                        );
                    })
                );
                return right(result);
            })
        );

    };
};

export default parseLanguagePackage;
