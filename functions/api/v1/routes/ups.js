const sms = require('../../../middleware/sms')

function on_battery(req, res, next) {
  sms.send('ON BATTERY', req, res, next)
}

function off_battery(req, res, next) {
  sms.send('OFF BATTERY', req, res, next)
}

module.exports = {
  on_battery,
  off_battery,
}
