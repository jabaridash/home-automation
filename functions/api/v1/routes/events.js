const validation = require('../../../middleware/validation')
const ups = require('../../../middleware/ups')
const router = require('express').Router()

router.post('/ups', validation.ups, ups.handle)

module.exports = router
