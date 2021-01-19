const logging = require('../../middleware/logging')
const errors = require('../../middleware/errors')
const events = require('./routes/events')
const router = require('express').Router()

router.use(logging.log_request)
router.use('/events', events)
router.use(errors.catch_all)

module.exports = router
