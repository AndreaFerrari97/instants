import makeAddInstant from './add-instant'
import makeInstantsDb from '../data-access/instants-db'
import makeInstantsEmit from '../data-access/instants-emit'
import makeInstatsFtp from '../data-access/instants-ftp'
import makeFakeInstant from '../../__test__/fixtures/instant'
import makeDb from '../../__test__/fixtures/db'

describe('add instant', () => {
    let instantsDb, instantsEmit, instantsFtp;

    beforeAll(() => {
        instantsDb = makeInstantsDb({ makeDb })
        instantsFtp = makeInstatsFtp()
        instantsEmit = makeInstantsEmit()
    })

    //TODO: improve test
    it('inserts instant in ftp server', async () => {
        const newInstant = makeFakeInstant();
        const addInstant = makeAddInstant({ instantsDb, instantsEmit, instantsFtp });
        const instantId = await addInstant(newInstant);
        const instantFromDb = await instantsDb.findById(instantId);
        const instantFromFtp = await instantsFtp.getInstantImg(instantFromDb.fileName);
        expect(instantFromFtp).toEqual(true)
    })
})