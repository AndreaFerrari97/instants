import logger from "../logger";
import { Settings } from "../settings";


export default function makeInstantsDb({ makeDb }) {
    const log = logger('Instants-db', Settings.logging.instantsDb);
    return Object.freeze({
        findAll,
        findById,
        insert,
        removeAll
    })

    async function findAll(): Promise<Object> {
        const connection = await makeDb();
        log.info("get all Instants");
        const instants = await new Promise<any>((resolve, reject) => connection.query(
            "SELECT * FROM instant ORDER BY createdOn DESC", (err, results) => err ? reject(err) : resolve(results)));
        if (!instants) { log.error(`instant table is empty`); return null }
        log.info(`${instants.length} instants returned from query`);
        log.debug(`${JSON.stringify(instants)}`)
        return instants;
    }

    async function findById(id: number): Promise<Object> {
        const connection = await makeDb()
        log.info(`get instants with Id ${id}`);
        const instant = await new Promise<any>((resolve, reject) => connection.query(
            "SELECT * FROM instant WHERE id=?", [id], (err, results) => err ? reject(err) : resolve(results[0])));
        if (!instant) { log.error(`instant not found with id #${id}`); return null }
        log.debug(`Instant (id ${id}) returned from query: ${JSON.stringify(instant)}`)
        return instant;
    }

    async function insert(instant: Object): Promise<number> {
        const connection = await makeDb();
        log.info(`Add instant to DB`);
        log.debug(`${JSON.stringify(instant)}`)
        return await new Promise<number>((resolve, reject) => connection.query("INSERT INTO instant SET ?", instant,
            (e, result) => e ? reject(e) : resolve(result.insertId)));
    }

    //function created for testing
    //TODO: move it inside move it inside __test__/fixtures/db.ts 
    async function removeAll() {
        const connection = await makeDb();
        log.info("Remove all instants from DB")
        return await new Promise<any>((resolve, reject) => connection.query(
            "DELETE FROM instant WHERE id is not null", (err, results) => err ? reject(err) : resolve(results[0])));
    }
}

