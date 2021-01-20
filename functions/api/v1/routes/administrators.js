const validation = require('../../../middleware/validation')
const administrators = require('../../../middleware/administrators')
const router = require('express').Router()

router.post('/', validation.administrator, administrators.handle)

module.exports = router
