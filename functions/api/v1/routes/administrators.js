const validation = require('../../../middleware/validation')
const administrators = require('../../../middleware/administrators')
const router = require('express').Router()

router.get('/', administrators.get_all)
router.post('/', validation.administrator, administrators.save)

module.exports = router
