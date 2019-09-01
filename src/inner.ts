import { MessageInfo, I18NOptions } from './types';
import * as E from 'fp-ts/lib/Either';
import parsePackage from './parse';
import intlPackage from './intl';
import { getLanguageMessages } from './utils';
import { get } from 'macoolka-object';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as  array from 'fp-ts/lib/Array';
const messageToString = (a: MessageInfo) => `messageid:${a.id}${
    pipe(
        a.value,
        O.fromNullable,
        O.fold(
            () => '',
            value => `,value=${JSON.stringify(value)}`

        )
    )}`;
const innerError = 'Mocoolka I18N Error :';
/**
 * Get Inner Error Message
 */
const innerErrorMessage = (option: I18NOptions = { defaultLanguage: 'en', languages: ['en', 'zh'] }) => {
    return pipe(
        parsePackage(option)(intlPackage),
        E.mapLeft(errors =>
            pipe(
                errors,
                array.map(messageToString),
                as => as.join('\n')

            )),
        E.map(getLanguageMessages),
        E.fold(left => () => () => E.left([innerError + left]),
            right => {
                return (locale: string) => (a: MessageInfo) =>
                    pipe(
                        get(right, [locale, a.id]),
                        O.fromNullable,
                        O.map(b => E.right(b(a.value))),
                        O.getOrElse(() =>
                            E.left([innerError + messageToString(a)])
                        )
                    );
            })
    );

};
export default innerErrorMessage;
