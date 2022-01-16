export default function buildMakeInstant({ isFileFormatValid }) {
    return function makeInstant({
        fileName,
        height,
        latitude,
        longitude,
        user,
        weight,
        width,
        createdOn
    }) {
        if (!fileName) throw new Error('Instant must have a valid file name.');
        if (!createdOn) throw new Error('Instant must have a valid created on.');
        if (!isFileFormatValid(fileName))
            throw new Error('Instant must have a valid file name format.');
        if (!height) throw new Error('Instant must have a valid height.');
        if (!latitude) throw new Error('Instant must have a valid latitude.');
        if (!longitude) throw new Error('Instant must have a valid longitude.');
        if (!user) throw new Error('Instant must have a valid user.');
        if (!weight) throw new Error('Instant must have a valid weight.');
        if (!width) throw new Error('Instant must have a valid width.');
        return Object.freeze({
            getCreatedOn: () => createdOn,
            getFileName: () => fileName,
            getHeight: () => height,
            getLatitude: () => latitude,
            getLongitude: () => longitude,
            getUser: () => user,
            getWeight: () => weight,
            getWidth: () => width
        })
    }
}