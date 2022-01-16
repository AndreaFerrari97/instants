import bodyParser from 'body-parser'
import express from 'express'
import { getAllInstants } from './controllers'
import { getInstant } from './controllers'
import makeCallback from './express-callback'
import Moment from "moment"
import multer from 'multer'
import { postInstant } from './controllers'
import { Settings } from './settings'
import logger from './logger'

const log = logger('index', Settings.logging.index)
log.createLogFileStream()

function getCurrentDateTime() {
    const timestamp = "YYYYMMDD_HHmmss"
    return Moment().format(timestamp)
}

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, getCurrentDateTime() + "_" + file.originalname)
})

const upload = multer({ storage: storage })
app.use('/downloads', express.static('downloads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(`/instant`, makeCallback(getInstant));
app.get(`/instants`, makeCallback(getAllInstants));

app.post(`/instant`, upload.single("file"), (req, res) => {

    log.info("" + JSON.stringify(req.file));
    if (req?.file?.originalname) {
        const fn = req.file.filename;
        req.body.fileName = req.file.filename;
        req.body.weight = req.file.size;
        req.body.createdOn = `${fn.split("_")[0]}_${fn.split("_")[1]}`
    }
    log.debug(`Received POST with the following body ${JSON.stringify(req.body)}`)
    makeCallback(postInstant)(req, res)
})

app.listen(3000, () => {
    log.info(`Server is listening on port 3000`)
})