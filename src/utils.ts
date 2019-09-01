import { I18NLanguagePackage, FormatMessage, I18NLanguageMessages, FormatFunction } from './types';
import { Reader } from 'fp-ts/lib/Reader';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
const getFormatMessages = (locale: string) =>
    (message: string): FormatFunction => {
        const root = new FormatMessage(message, locale);
        return context => root.format(context);

    };
export const getLanguageMessages: Reader<I18NLanguagePackage, I18NLanguageMessages> = (o => {
    return pipe(
        o,
        R.mapWithIndex((locale, languages) =>
            pipe(
                languages,
                R.map(value => getFormatMessages(locale)(value))
            )

        )
    );
});
