const sms = require('../../../middleware/sms')
const router = require('express').Router()

function prepare_on_battery_message(req, res, next) {
  req.message = "ON BATTERY"
  next()
}

function prepare_off_battery_message(req, res, next) {
  req.message = "OFF BATTERY"
  next()
}

router.post('/on-battery', prepare_on_battery_message, sms.send)
router.post('/off-battery', prepare_off_battery_message, sms.send)

module.exports = router
