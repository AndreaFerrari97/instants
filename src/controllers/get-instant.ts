export default function makeGetInstant({ findInstant }) {
    return async function getInstant(httpRequest) {
        try {
            const instant = await findInstant(httpRequest.query.id)
            return { statusCode: 201, body: { instant } }
        } catch (e) {
            console.log(e)
            return { statusCode: 400, body: { error: e.message } }
        }
    }
}
