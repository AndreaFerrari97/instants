import makeInstant from "../instant";
export default function makeAddInstant({ instantsDb, instantsEmit, instantsFtp }) {
    return async function addInstant(instantInfo) {
        const instant = makeInstant(instantInfo);
        const instantFileName = instant.getFileName()
        await instantsFtp.upload(instantFileName);
        await instantsEmit.send(instantFileName)
        return instantsDb.insert({
            createdOn: instant.getCreatedOn(),
            fileName: instantFileName,
            height: instant.getHeight(),
            latitude: instant.getLatitude(),
            longitude: instant.getLongitude(),
            user: instant.getUser(),
            weight: instant.getWeight(),
            width: instant.getWidth()
        })
    }
}