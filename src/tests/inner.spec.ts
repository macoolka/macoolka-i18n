import innerErrors from '../inner'
import { languageNotFound, messageNotFound } from '../errors'
import { right } from 'fp-ts/lib/Either'
describe('inner', () => {
    it('intl data', () => {
        expect(innerErrors()('en')(languageNotFound({ locale: 'fr' }))).toEqual(right("Must provide a default locale(fr)"))
        expect(innerErrors()('zh')(languageNotFound({ locale: 'fr' }))).toEqual(right('缺省语言(fr)没有发现'))
        expect(innerErrors()('en')(messageNotFound({ locale: 'fr', id: 'a.b.c' }))).toEqual(right('Message (a.b.c) not found in locale(fr)'))
        expect(innerErrors()('zh')(messageNotFound({ locale: 'fr', id: 'a.b.c' }))).toEqual(right('消息(a.b.c)没有定义，请核对语言包(fr)'))

    })

})