const database = require('../utility/database')
const http = require('../utility/http')

//------------------------------------------------------------------------------

function handle(req, res, next) {
  database.administrators.save(req.body)
  .then(doc => res.status(http.STATUS_CODES.OK).json({ message: 'Ok' }))
  .catch(next)
}

//------------------------------------------------------------------------------

module.exports = {
  handle,
}
