const functions = require('firebase-functions')
const api = require('./api/express')

exports.api = functions.https.onRequest(api)
