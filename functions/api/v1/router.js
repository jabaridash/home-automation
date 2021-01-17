const logging = require('../../middleware/logging')
const errors = require('../../middleware/errors')
const ups = require('./routes/ups')
const router = require('express').Router()

router.use(logging.log_request)
router.post('/on-battery', ups.on_battery)
router.post('/off-battery', ups.off_battery)
router.use(errors.catch_all)

module.exports = router
