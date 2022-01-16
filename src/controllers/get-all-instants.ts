export default function makeGetAllInstants({ findAllInstants }) {
    return async function getAllInstants() {
        try {
            const instants = await findAllInstants()
            return {
                statusCode: 201, body: { instants }
            }
        } catch (e) {
            console.log(e)
            return { statusCode: 400, body: { error: e.message } }
        }
    }
}
