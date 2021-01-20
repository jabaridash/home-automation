const database = require('../utility/database')
const http = require('../utility/http')

//------------------------------------------------------------------------------

function get_all(req, res, next) {
  database.administrators.get_all()
  .then(administrators => res.status(http.STATUS_CODES.OK).json(administrators))
  .catch(next)
}

//------------------------------------------------------------------------------

function save(req, res, next) {
  database.administrators.save(req.body)
  .then(() => res.status(http.STATUS_CODES.OK).json({ message: 'Ok' }))
  .catch(next)
}

//------------------------------------------------------------------------------

module.exports = {
  get_all,
  save,
}
