import { addInstant } from '../use-cases';
import { findAllInstants } from '../use-cases'
import { findInstant } from '../use-cases'
import makePostInstant from './post-instant';
import makeGetInstant from './get-instant'
import makeGetAllInstants from './get-all-instants';

const getAllInstants = makeGetAllInstants({ findAllInstants })
const getInstant = makeGetInstant({ findInstant })
const postInstant = makePostInstant({ addInstant })

const instantController = Object.freeze({
    getAllInstants,
    getInstant,
    postInstant
})

export default instantController;
export { getAllInstants, getInstant, postInstant }