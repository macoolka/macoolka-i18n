import parse from '../parse'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
describe('parse', () => {
    it('empty in other langues', () => {
        pipe(
            parse({ defaultLanguage: 'en', languages: ['en', 'zh'] })({ en: { a: 'a1' } }),
            E.fold(left => {
                throw new Error(left.toString())
            }, right => {
                expect(right).toEqual({ zh: { a: 'a1' }, en: { a: 'a1' } })
            }
            )
        )
    })
    it('empty item in other langues', () => {
        pipe(
            parse({ defaultLanguage: 'en', languages: ['en', 'zh'] })({ en: { a: 'a1', b: 'b1' }, zh: { a: 'a2', c: 'c1' } }),
            E.fold(left => {
                throw new Error(left.toString())
            }, right => {
                expect(right).toEqual({ zh: { a: 'a2', b: 'b1' }, en: { a: 'a1', b: 'b1' } })
            }
            )
        )
    })
    it('remove more langues', () => {
        pipe(
            parse({ defaultLanguage: 'en', languages: ['en'] })({ en: { a: 'a1', b: 'b1' }, zh: { a: 'aa1' } }),
            E.fold(left => {
                throw new Error(left.toString())
            }, right => {
                expect(right).toEqual({ en: { a: 'a1', b: 'b1' } })
            }
            )
        )
    })
    it('language not found', () => {
        pipe(
            parse({ defaultLanguage: 'en', languages: ['en'] })({ zh: { a: 'aa1' } }),
            E.fold(left => {
                expect(left).toEqual([{ "id": "macoolka.i18n.errors.LanguageNotFound", "value": { "locale": "en" } }])
            }, right => {
                throw new Error(right.toString())
            }
            )
        )
    })
})