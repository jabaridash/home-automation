const sms = require('../utility/sms')
const http = require('../utility/http')

function send(req, res, next) {
  sms.send(req.message)
  .then(() => res.status(http.STATUS_CODES.OK).json({ message: 'Message(s) sent' }))
  .catch(next)
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
