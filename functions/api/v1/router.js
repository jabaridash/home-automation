const logging = require('../../middleware/logging')
const errors = require('../../middleware/errors')
const ups = require('./routes/ups')
const router = require('express').Router()

router.use(logging.log_request)
router.use('/ups', ups)
router.use(errors.catch_all)

module.exports = router
