import MySql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

let connection;

export default async function makeDb() {
    connection = connection || MySql.createConnection({
        database: process.env.MOCK_DB_NAME,
        dateStrings: true, // date queries returns 2014-12-10 15:31:43 instead of 2014-12-10T14:31:43.000Z
        debug: false, // { true, ['ComQueryPacket'] }
        host: "localhost",
        password: process.env.DB_USER_PSW,
        user: process.env.DB_USER
    });
    return connection
}

export async function closeDb() {
    await connection.close()
}

export { connection }
