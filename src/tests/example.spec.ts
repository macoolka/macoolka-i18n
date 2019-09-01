import buildi18n, { MessageInfo } from '..'
describe('i18n', () => {

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
                'macoolka.test.noparam': 'noparam',
                'macoolka.test.oneparam': 'one params {value}',
                'macoolka.test.plural': ` You have {value, plural,
                    =0 {no photos.}
                    =1 {one photo.}
                    other {# photos.}
                }`
            },
            zh: {
                'macoolka.test.noparam': '没有参数',
                'macoolka.test.oneparam': '一个参数 {value}'
            }
        }
    }
    type Message = MessageInfo<keyof typeof options.data.en, { value: number }>;
    const formatI18N = buildi18n<Message>(options)


    const formatNoParam = formatI18N({ id: 'macoolka.test.noparam', value: { value: 0 } })
    it('no param', () => {

        expect(formatNoParam({})).toEqual('noparam')
        expect(formatNoParam({ i18n: { locale: 'zh' } })).toEqual('没有参数')
    })
    const formatOneParam = formatI18N({ id: 'macoolka.test.oneparam', value: { value: 111 } })
    it('one param', () => {

        expect(formatOneParam({})).toEqual('one params 111')
        expect(formatOneParam({ i18n: { locale: 'zh' } })).toEqual('一个参数 111')
    })
    it('format array', () => {

        const format = formatI18N(
            [
                { id: 'macoolka.test.oneparam', value: { value: 111 } },
                { id: 'macoolka.test.noparam', value: { value: 0 } }
            ]
        )

        expect(format({})).toEqual('one params 111' + '\n' + 'noparam')
        expect(format({ i18n: { locale: 'zh' } })).toEqual('一个参数 111' + '\n' + '没有参数')
    })
    it('plural', () => {

        expect(
            formatI18N(
                {
                    id: 'macoolka.test.plural',
                    value: { value: 0 }
                })({})
        ).toEqual(" You have no photos.")
        expect(
            formatI18N(
                {
                    id: 'macoolka.test.plural',
                    value: { value: 1 }
                })({})
        ).toEqual(" You have one photo.")
        expect(
            formatI18N(
                {
                    id: 'macoolka.test.plural',
                    value: { value: 2 }
                })({})
        ).toEqual(" You have 2 photos.")
    })
})