export default function makeExpressCallback(controller) {
    return (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
        }
        controller(httpRequest)
            .then(httpResponse => {
                res.set({ headers: { 'Content-Type': 'application/json' } })
                res.type('json')
                res.status(httpResponse.statusCode).send(httpResponse.body)
            })
            .catch(e => res.status(500).send({ error: 'An unkown error occurred.' + e }))
    }
}
