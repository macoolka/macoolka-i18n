/**
 * I18n type
 * @desczh
 * I18N类型
 * @file
 */
import FormatMessage from 'intl-messageformat';
import * as R from 'fp-ts/lib/Reader';
export * from './types';
export {
    FormatMessage
};
/**
 * Format a context to string
 * @ignore
 * @since 0.2.0
 */
export type FormatFunction = (context?: any) => string;
/**
 * The define i18n locale and id and message
 * The Key is locale,Value is Record<ID,Message>
 * @desczh
 * i18n语言包
 *
 * 定义了语言以及对应的消息id和消息格式。
 * @example
 * import { I18NLanguagePackage } from 'macoolka-i18n'
 * const languagePackage={
 *      en: {
 *          "macoolka.i18n.errors.LanguageNotFound": "Must provide a default locale({locale})",
 *          "macoolka.i18n.errors.MessageNotFound": "Message ({id}) not found in locale({locale})"
 *      },
 *      zh: {
 *           "macoolka.i18n.errors.LanguageNotFound": "缺省语言({locale})没有发现",
 *           "macoolka.i18n.errors.MessageNotFound": "消息({id})没有定义，请核对语言包({locale})"
 *      }
 * }
 *
 * @since 0.2.0
 */
export interface I18NLanguagePackage {
    [locale: string]: { [id: string]: string };
}
/**
 * The seem `I18NLanguagePackage`,but value is `FormatMessage`.
 * @ignore
 */
export interface I18NLanguageMessages {
    [locale: string]: {
        [id: string]: FormatFunction
    };
}
/**
 * The define application's default language and suport languages
 * @example
 * import { I18NOptions } from 'macoolka-i18n'
 * const options:I18NOptions={
 *      defaultLanguage='en',
 *      languages=['en','zh'],
 * }
 * @ignore
 */
export interface I18NOptions {
    defaultLanguage: string;
    languages: string[];
}
/**
 * @ignore
 */
export type I18NParam = Required<I18NOption>;
/**
 * The define a message template.
 * @desczh
 * 消息模板
 *
 * @example
 * import { MessageInfo } from 'macoolka-i18n'
 * export const messageNotFound = (value: { id: string, locale: string }): MessageInfo => ({
 *   id: 'macoolka.i18n.errors.MessageNotFound',
 *   value,
 * })
 */
export interface MessageInfo<K extends string = string, T = any> {
    /**
     * The is a tag,It is unique string on the application
     * @desczh
     * 这是一个标志，在应用程序中不能重复
     */
    id: K;
    /**
     * The is a record object,will be used when parse message
     * @desczh
     * 在解析消息时用到的数据结构
     */
    value?: T;
}

/**
 * Provide param when parse message
 * @desczh
 * 解析消息时用到的参数
 * @since 0.2.0
 */
export interface I18NOption {
    /**
     * default language
     * @desczh
     * 缺省语言
     */
    defaultLanguage?: string;
    /**
     * suport languages
     * @desczh
     * 可用的语言
     */
    languages?: string[];
    /**
     * language Package
     * @desczh
     * 预定义的消息
     */
    data?: I18NLanguagePackage;
    /**
     * current locale
     * @desczh
     * 当前的语言
     */
    locale?: string;
}
/**
 * The Param for MonidI18N
 * @desczh
 * MonidI18N的参数
 * @since 0.2.0
 */
export interface MonidI18NParam {
    i18n?: I18NOption;
}
/**
 * MonidI18N
 * @desczh
 * MonidI18N
 * @since 0.2.0
 */
export type MonidI18N<A = string> = R.Reader<MonidI18NParam, A>;
