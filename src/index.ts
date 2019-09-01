/**
 * I18n
 * @desczh
 * I18N
 * @file
 */
import parsePackage from './parse';
import { I18NOptions, I18NLanguagePackage, MessageInfo, I18NParam, I18NOption, MonidI18NParam, MonidI18N } from './types';
import languagePackage from './intl';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { get, merge } from 'macoolka-object';
import { messageNotFound } from './errors';
import { getLanguageMessages } from './utils';
import innerErrorMessage from './inner';
import { pipe } from 'fp-ts/lib/pipeable';
export * from './types';
import { fold as _fold, Monoid } from 'fp-ts/lib/Monoid';
import { isArray } from 'macoolka-predicate';
import * as A from 'fp-ts/lib/Array';
import { getFunctionSemigroup, Semigroup, getLastSemigroup } from 'fp-ts/lib/Semigroup';
export * from './types';

/**
 * Parse a given message.
 * `Left` is Inner error messages array.
 * `Right` is format message
 *
 */
const _i18n = (options: Partial<I18NOptions> & { data: I18NLanguagePackage }) => {
  const { defaultLanguage = 'en', languages = ['en', 'zh'], data } = options;
  // inner error define
  const innerError = innerErrorMessage({ defaultLanguage, languages });

  const result = pipe(
    data,
    parsePackage({ defaultLanguage, languages }),
    E.map(getLanguageMessages),
    E.mapLeft(as => as.map(innerError(defaultLanguage)).join('\n')), // get error message
    E.fold(
      left => () => () => E.left([left]),
      right => (locale: string) => <Message extends MessageInfo>(a: Message) =>
        pipe(
          get(right, [locale, a.id]), // get format function
          O.fromNullable,
          O.map(format => E.right(format(a.value))),
          O.getOrElse(() => innerError(locale)(messageNotFound({ id: a.id, locale })))// format inner error
        )
    )
  );
  return result;

};
/**
 * default i18n option
 * @desczh
 * 缺省的i18n option
 * @since 0.2.0
 */
export const defaultOption: I18NParam = {
  defaultLanguage: 'en',
  locale: 'en',
  languages: ['en', 'zh'],
  data: languagePackage,
};
const stringSemigroup: Semigroup<string> = {
  concat: (a, b) => `${a}\n${b}`,
};
const fSemigroup = getFunctionSemigroup(stringSemigroup)<MonidI18NParam>();
/**
 * Validation for MonidI18N
 * @since 0.2.0
 */
export const I18NValidation = E.getValidation<MonidI18N>(fSemigroup);
/**
 * Monoid for MonidI18N
 * @since 0.2.0
 */
export const MonidI18NMonoid: Monoid<MonidI18N> = {
  empty: () => '',
  concat: fSemigroup.concat,
};
const MonidFirstT = <T>(empty: T): Monoid<T> => ({
  empty,
  concat: getLastSemigroup<T>().concat,
});
/**
 * Monoid for ValidationMonoid
 * @since 0.2.0
 */
export const i18ValidationMonoid = <T>(empty: T) =>
  E.getValidationMonoid<MonidI18N, T>(MonidI18NMonoid, MonidFirstT(empty));
/**
 * Monoid for I18NOption
 * @since 0.2.0
 */
const i18nOptionMonoid: Monoid<I18NOption> = {
  empty: defaultOption,
  concat: (a, b) => merge({}, a, b),
};
/**
 * Fold for I18NOption
 * @since 0.2.0
 */
export const foldI18NOption = _fold(i18nOptionMonoid);
/**
 * build a message format to MonidI18N
 * @desczh
 * 消息格式化到MonidI18N
 * @example
 * const options = {
 *    languages: ['en', 'zh'],
 *    defaultLanguage: 'en',
 *    locale: 'en',
 *     data: {
 *        en: {
 *            'macoolka.test.noparam': 'noparam',
 *            'macoolka.test.oneparam': 'one params {value}',
 *        },
 *        zh: {
 *            'macoolka.test.noparam': '没有参数',
 *            'macoolka.test.oneparam': '一个参数 {value}'
 *        }
 *    }
 * }
 * type Message = MessageInfo<keyof typeof options.data.en, { value: number }>;
 * const formatI18N = buildi18n<Message>(options)
 *
 * const formatNoParam = formatI18N({ id: 'macoolka.test.noparam', value: { value: 0 } })
 * it('no param', () => {
 *
 *    expect(formatNoParam({})).toEqual('noparam')
 *    expect(formatNoParam({ i18n: { locale: 'zh' } })).toEqual('没有参数')
 * })
 */

const i18nBuild = <Message extends MessageInfo = MessageInfo>(defaultParam: I18NOption) =>
  (message: Message | Message[]): MonidI18N => (
    ({ i18n = {} }) => {
      const _options = foldI18NOption([defaultOption, defaultParam, i18n]) as I18NParam;
      const f = _i18n(_options)(_options.locale);
      message = isArray(message) ? message : [message];
      return pipe(
        message,
        A.map(value => pipe(
          value,
          f,
          result => {
            if (E.isLeft(result)) {// inner error
              throw new Error(result.left.join('\n'));
            }
            return result.right.split('\n');
          }
        )),
        A.flatten,
        as => as.join('\n')
      );
    }
  );

export default i18nBuild;
