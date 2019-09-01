import { MessageInfo } from './types';

export const languageNotFound = (value: { locale: string }): MessageInfo => ({
    id: 'macoolka.i18n.errors.LanguageNotFound',
    value,
});
export const messageNotFound = (value: { id: string, locale: string }): MessageInfo => ({
    id: 'macoolka.i18n.errors.MessageNotFound',
    value,
});
