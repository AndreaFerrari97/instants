import makeAddInstant from './add-instant'
import makeInstantsDb from '../data-access/instants-db'
import makeFakeInstant from '../../__test__/fixtures/instant'
import makeDb from '../../__test__/fixtures/db'
import makeInstantsEmit from '../data-access/instants-emit'
import makeInstatsFtp from '../data-access/instants-ftp'
import makeGetInstant from './get-instant'

describe('get instant', () => {
    let instantsDb, instantsEmit, instantsFtp, getInstant;

    beforeAll(() => {
        instantsDb = makeInstantsDb({ makeDb })
        instantsEmit = makeInstantsEmit()
        instantsFtp = makeInstatsFtp();
        getInstant = makeGetInstant({ instantsDb, instantsFtp })
    })

    it('requires a post id', () => {
        expect(getInstant()).rejects.toThrow('You must supply an instant id.')
    })


    //TODO: improve fileName testing
    it('get instant from DB', async () => {
        const instant = makeFakeInstant();
        const addInstant = makeAddInstant({ instantsDb, instantsEmit, instantsFtp });
        const instantId = await addInstant(instant);
        const instantFromDB = await getInstant(instantId)
        const path = `http://localhost:3000/downloads/instants/${instant.fileName}`
        const instantMockWithIdAndURL = { ...instant, ...{ id: instantId, url: path } };
        expect(instantMockWithIdAndURL).toEqual(instantFromDB)
    })

    it('get instant from FTP', async () => {
        const newInstant = makeFakeInstant();
        const addInstant = makeAddInstant({ instantsDb, instantsEmit, instantsFtp });
        const instantId = await addInstant(newInstant);
        const instantFromDb = await instantsDb.findById(instantId);
        const instantFromFtp = await instantsFtp.getInstantImg(instantFromDb.fileName);
        expect(instantFromFtp).toEqual(true)
    })
})