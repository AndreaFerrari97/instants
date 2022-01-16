export default function makeGetInstant({ instantsDb, instantsFtp }) {
    return async function findInstant(instantId) {
        if (!instantId) {
            throw new Error('You must supply an instant id.')
        }
        const response = await instantsDb.findById(instantId);
        const found = await instantsFtp.getInstantImg(response.fileName);
        const imgPath = found ?
            `http://localhost:3000/downloads/instants/${response.fileName}`
            : "Image not present in the ftp server"
        return { ...response, ...{ url: imgPath } };
    }
}