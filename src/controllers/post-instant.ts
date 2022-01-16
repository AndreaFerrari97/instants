export default function makePostInstant({ addInstant }) {
    return async function postInstant(httpRequest) {
        try {
            const posted = await addInstant(httpRequest.body)
            return { statusCode: 201, body: { id: posted } }
        } catch (e) {
            return { statusCode: 400, body: { error: e.message } }
        }
    }
}
