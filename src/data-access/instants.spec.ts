import makeDb from '../../__test__/fixtures/db'
import makeInstantDb from './instants-db'
import makeFakeInstant from '../../__test__/fixtures/instant'

describe('instants db', () => {
    let instantsDb

    beforeEach(async () => {
        instantsDb = makeInstantDb({ makeDb })
        await instantsDb.removeAll();
    })
    it('lists instants', async () => {
        const insertsIds = await Promise.all(
            [makeFakeInstant(), makeFakeInstant(), makeFakeInstant()].map(
                instantsDb.insert
            )
        )
        let instants = [];
        for await (const id of insertsIds) {
            const instant = await instantsDb.findById(id);
            instants.push(instant)
        }
        const found = await instantsDb.findAll()
        return instants.forEach(instant => expect(found).toContainEqual(instant))
    })

    it('inserts and find a  instant', async () => {
        const instant = makeFakeInstant()
        const id = await instantsDb.insert(instant);
        const instantFromDb = await instantsDb.findById(id);
        return expect(instantFromDb).toEqual({ ...{ id: id }, ...instant })
    })
})