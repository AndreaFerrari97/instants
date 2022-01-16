import makePostInstant from './post-instant'
import makeFakeInstant from '../../__test__/fixtures/instant'
import { addInstant } from '../use-cases'

describe('post instant controller', () => {
    it('successfully posts a instant', async () => {
        const postInstant = makePostInstant({ addInstant: i => i })
        const request = { body: 12 }
        const expected = {
            statusCode: 201,
            body: { id: 12 }
        }
        const actual = await postInstant(request);
        expect(expected).toEqual(actual);
    })
    it('reports user error', async () => {
        const postInstant = makePostInstant({
            addInstant: () => { throw Error('Invalid') }
        })
        const fakeInstant = makeFakeInstant();
        const request = {
            body: fakeInstant
        }
        const expected = {
            statusCode: 400,
            body: { error: 'Invalid' }
        }
        const actual = await postInstant(request)
        expect(actual).toEqual(expected)
    })
})
