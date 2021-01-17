const sms = require('../../../middleware/sms')
const router = require('express').Router()

router.post('/on-battery', (req, res, next) => sms.send('ON BATTERY', req, res, next))
router.post('/off-battery', (req, res, next) => sms.send('OFF BATTERY', req, res, next))

module.exports = router
