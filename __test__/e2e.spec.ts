import axios from 'axios'
import { instantsFtp, makeDb } from '../src/data-access'
import { instantsDb } from '../src/data-access'
import makeFakeInstant from './fixtures/instant'
import makeInstantDb from '../src/data-access/instants-db'

describe('Instants API', () => {
    let instantsDb;

    beforeAll(() => {
        axios.defaults.baseURL = "http://localhost:3000"
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.validateStatus = function (status) {
            // Throw only if the status code is greater than or equal to 500
            return status < 500
        }
        instantsDb = makeInstantDb({ makeDb })
    })

    beforeEach(async () => {
        await instantsDb.removeAll();
    })

    describe('instant', () => {
        it('add instant to db', async () => {
            const mockInstant = makeFakeInstant();
            const response = await axios.post('/instant', mockInstant)
            expect(response.status).toBe(201);
            const instantDb = await instantsDb.findById(response.data.id);
            expect(instantDb).toEqual({ ...mockInstant, ...{ id: response.data.id } })
        })

        it('get instat return 201', async () => {
            let instant = makeFakeInstant();
            const responsePost = await axios.post('/instant', instant)
            const responseGet = await axios.get(`/instant`, { params: { id: responsePost.data.id } })
            expect(responseGet.status).toBe(201)
        })

        it('get instat return obj', async () => {
            let instant = makeFakeInstant();
            const responsePost = await axios.post('/instant', instant)
            instant = { ...instant, ...{ url: "http://localhost:3000/downloads/instants/tree.jpg", id: responsePost.data.id } }
            const responseGet = await axios.get(`/instant`, { params: { id: responsePost.data.id } })
            expect(responseGet.data).toEqual({ instant: instant })
        })
    })
})