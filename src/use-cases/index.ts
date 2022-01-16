import makeAddInstant from "./add-instant";
import makeGetAllInstants from "./get-all-instant"
import makeGetInstant from './get-instant'
import { instantsDb } from '../data-access'
import { instantsEmit } from '../data-access'
import { instantsFtp } from "../data-access";

const addInstant = makeAddInstant({ instantsDb, instantsEmit, instantsFtp })
const findAllInstants = makeGetAllInstants({ instantsDb, instantsFtp })
const findInstant = makeGetInstant({ instantsDb, instantsFtp })
const instantService = Object.freeze({
    addInstant,
    findAllInstants,
    findInstant
})

export default instantService;
export { addInstant, findAllInstants, findInstant }