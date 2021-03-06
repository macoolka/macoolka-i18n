import buildi18n, { MessageInfo, i18ValidationMonoid } from '..'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { fold } from 'fp-ts/lib/Monoid'
describe('I18NMonoid', () => {
    /**
     * The Appliction's i18n option.
     */
    const options = {
        languages: ['en', 'zh'],
        defaultLanguage: 'en',
        locale: 'en',
        /**
         * The i18n message
         */
        data: {
            en: {
                'macoolka.test.name': 'Name length must is less than 5,actual is {value}',
                'macoolka.test.age': 'Age must is middle of (1,120) type,actual is {value}',

            },
            zh: {
                'macoolka.test.name': '名称长度必须小于5，实际是{value}',
                'macoolka.test.age': '年龄必须在1和120之间，实际是{value}',
            }
        }
    }
    /**
     * Message Type
     */
    type Message = MessageInfo<keyof typeof options.data.en, { value: string | number }>;
    /**
     * Format a message
     */
    const formatI18N = buildi18n<Message>(options)
    /**
     * The Type be valided
     */
    interface Person {
        name: string,
        age: number
    }
    /**
     * Valid a Person with name
     * 
     */
    const validPersonName = (a: Person) => {
        return a.name.length > 5
            ? E.left(formatI18N({ id: 'macoolka.test.name', value: { value: a.name } }))
            : E.right(a)
    }
    /**
    * Valid a Person with age
    * 
    */
    const validPersonAge = (a: Person) => {
        return a.age < 1 || a.age > 120
            ? E.left(formatI18N({ id: 'macoolka.test.age', value: { value: a.age } }))
            : E.right(a)
    }
    /**
     * 
     */
    const i18nMonoid = i18ValidationMonoid({ name: '', age: 0 } as Person)
    /**
     * Valid a Person
     * 
     */
    const validPerson = (a: Person) => {
        return pipe(
            [validPersonName(a), validPersonAge(a)],
            fold(i18nMonoid),
        )

    }

    it('validPerson correct', () => {

        pipe(
            validPerson({ name: 'abc', age: 12 }),
            a => {
                expect(E.isRight(a)).toEqual(true)

                return a
            },
            E.map(a => {

                expect(a).toEqual({ name: 'abc', age: 12 })

            })
        )

    })
    it('validPerson one error', () => {

        pipe(
            validPerson({ name: 'abcdefg', age: 12 }),
            a => {
                expect(E.isLeft(a)).toEqual(true)
                return a
            },
            E.mapLeft(a => {
                const result = a({});
                const resultZh = a({ i18n: { locale: 'zh' } });
                expect(result).toEqual('Name length must is less than 5,actual is abcdefg')
                expect(resultZh).toEqual('名称长度必须小于5，实际是abcdefg')
            })
        )

    })
    it('validPerson mutli error', () => {

        pipe(
            validPerson({ name: 'abcdefg', age: -1 }),
            a => {
                expect(E.isLeft(a)).toEqual(true)
                return a
            },
            E.mapLeft(a => {
                const result = a({});
                const resultZh = a({ i18n: { locale: 'zh' } });
                expect(result).toEqual("Name length must is less than 5,actual is abcdefg\nAge must is middle of (1,120) type,actual is -1")
                expect(resultZh).toEqual("名称长度必须小于5，实际是abcdefg\n年龄必须在1和120之间，实际是-1")
            })
        )

    })
})