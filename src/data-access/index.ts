import makeInstantsDb from './instants-db'
import makeInstantsEmit from './instants-emit'
import makeInstantsFtp from './instants-ftp';
import MySql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

export async function makeDb() {
    return MySql.createConnection({
        database: process.env.DB_NAME,
        dateStrings: true, // date queries returns 2014-12-10 15:31:43 instead of 2014-12-10T14:31:43.000Z
        debug: false, // { true, ['ComQueryPacket'] }
        host: "localhost",
        password: process.env.DB_USER_PSW,
        user: process.env.DB_USER
    });
}

export const instantsDb = makeInstantsDb({ makeDb })
export const instantsEmit = makeInstantsEmit()
export const instantsFtp = makeInstantsFtp();

