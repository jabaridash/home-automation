const config = require('firebase-functions').config()

// TODO - Implement real authorization / authentication

function authorize(req, res, next) {
  let api_key = req.headers['X-API-KEY'] || req.headers['x-api-key']

  if (!api_key) {
    res.status(404).json({ message: 'Please supply header \'X-API-KEY\''})
  } else if (api_key !== config.api.key) {
    res.status(404).json({ message: 'Invalid X-API-KEY'})
  } else {
    next()
  }
}

module.exports = {
  authorize,
}
