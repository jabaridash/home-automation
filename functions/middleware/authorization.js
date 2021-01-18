const config = require('firebase-functions').config()
const http = require('../utility/http')

const API_KEY_HEADER_NAME = 'X-API-KEY'

// TODO - Implement real authorization / authentication

function authorize(req, res, next) {
  let api_key = req.headers[API_KEY_HEADER_NAME] || req.headers[API_KEY_HEADER_NAME.toLowerCase()]

  if (!api_key) {
    res.status(http.STATUS_CODES.UNAUTHORIZED).json({ message: `Please supply header '${API_KEY_HEADER_NAME}'`})
  } else if (api_key !== config.api.key) {
    res.status(http.STATUS_CODES.UNAUTHORIZED).json({ message: `Invalid ${API_KEY_HEADER_NAME}`})
  } else {
    next()
  }
}

module.exports = {
  authorize,
}
