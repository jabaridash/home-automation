const functions = require('firebase-functions')
const api = require('./api/express')

// app.listen(8080, () => console.log(`Listening on port 8080`))

exports.api = functions.https.onRequest(api)
