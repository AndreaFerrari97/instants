import dotenv from 'dotenv';
import Client from 'ftp';
import fs from 'fs';
import logger from "../logger";
import { Settings } from '../settings';

const ftp = new Client();
dotenv.config();

ftp.connect({
    host: '127.0.0.1',
    port: '21',
    user: process.env.FTP_USER,
    password: process.env.FTP_PSW,
});

export default function makeInstantsFtp() {
    const log = logger('Instants-emit', Settings.logging.instantFtp);
    const pathInstantDowload: string = `./${Settings.path.local.download}`;
    const pathInstantUpload: string = `./${Settings.path.local.upload}`;
    const pathInstant: string = Settings.path.instants;
    const pathInstantResized: string = Settings.path.instantsResized;

    if (!fs.existsSync(pathInstantDowload)) fs.mkdirSync(pathInstantDowload)
    if (!fs.existsSync(pathInstantUpload)) fs.mkdirSync(pathInstantUpload)
    if (!fs.existsSync(`${pathInstantDowload}/${pathInstant}`))
        fs.mkdirSync(`${pathInstantDowload}/${pathInstant}`)
    if (!fs.existsSync(`${pathInstantDowload}/${pathInstantResized}`))
        fs.mkdirSync(`${pathInstantDowload}/${pathInstantResized}`)

    return Object.freeze({
        getInstantImg,
        getInstantResizedImg,
        upload
    })

    async function upload(fileName: string): Promise<boolean> {
        try {
            const found = await existDirectoryToSaveFile(pathInstant);
            log.debug(`Does ${pathInstant} exists on FTP? ${found}`);
            if (!found) await createDirectory(pathInstant);
            return await uploadImage(fileName)
        } catch (e) { log.error(e) }
    }

    async function uploadImage(fileName: string): Promise<boolean> {
        const localFilePath = `${pathInstantUpload}/${fileName}`
        const ftpFilePath = `${pathInstant}/${fileName}`
        return new Promise<any>((resolve) => {
            ftp.put(localFilePath, ftpFilePath,
                function (err) {
                    if (err) { log.error(err); resolve(false); }
                    log.info(`${fileName} uploaded`)
                    resolve(true);
                })
        })
    }

    async function createDirectory(dir: string): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            ftp.mkdir(dir, (err) => {
                if (err) { reject(err); }
                log.info(`creating directory ${dir}`);
                resolve(true);
            })
        })
    }

    async function existDirectoryToSaveFile(dir): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            ftp.list('./', function (err, data) {
                if (err) reject(err);
                let found = false;
                for (const directory of data)
                    if (directory?.name == dir) found = true;
                resolve(found);
            })
        })
    }

    async function getInstantImg(fileName: string): Promise<boolean> {
        log.debug(`Download instant ${fileName} from FTP server`);
        const downloadPath = `${pathInstantDowload}/${pathInstant}/${fileName}`;
        return new Promise<any>((resolve) => {
            ftp.get(`${pathInstant}/${fileName}`, function (err, stream) {
                if (err) { log.error(`${err} (Instant: ${fileName})`); resolve(false) }
                if (stream) {
                    stream.pipe(fs.createWriteStream(downloadPath));
                    log.info(`Instant ${fileName} downloaded in ${downloadPath}`);
                    resolve(true);
                }
            })
        });
    }

    async function getInstantResizedImg(fileName: string): Promise<boolean> {
        const downloadPath = `${pathInstantDowload}/${pathInstantResized}/${fileName}`
        const ftpPath = `${pathInstantResized}/${fileName}`
        log.debug(`Download instant resized ${fileName} (dest path = ${downloadPath}) from FTP server (src path = ${ftpPath})`);
        return new Promise<any>((resolve) => {
            ftp.get(`${pathInstantResized}/${fileName}`, function (err, stream) {
                if (err) { log.error(`${err} (Instant resized: ${fileName})`); resolve(false); }
                if (stream) {
                    stream.pipe(fs.createWriteStream(downloadPath));
                    log.info(`Instant resized ${fileName} downloaded in ${downloadPath}`);
                    resolve(true);
                }
                resolve(false);
            })
        })
    }
}