const functions = require('firebase-functions')
const api = require('./api/express')

const options = {
  timeoutSeconds: 10,
}

exports.api = functions.runWith(options).https.onRequest(api)
