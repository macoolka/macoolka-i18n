import { getLanguageMessages } from '../utils'
import data from '../intl'
import { isFunction } from 'macoolka-predicate'
describe('inner', () => {
    it('intl data', () => {
        const result = getLanguageMessages(data);
        expect(isFunction(result['en']['macoolka.i18n.errors.LanguageNotFound'])).toBeTruthy()

    })

})