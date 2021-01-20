const administrator_schema = require('../schemas/administrator')
const ups_schema = require('../schemas/ups')
const http = require('../utility/http')
const Validator = require('jsonschema').Validator
const validator = new Validator()

//------------------------------------------------------------------------------

function validate(schema, req, res, next) {
  const result = validator.validate(req.body, schema)

  if (!result.valid) {
    res.status(http.STATUS_CODES.BAD_REQUEST).json(result)
  } else {
    next()
  }
}

//------------------------------------------------------------------------------

function administrator(req, res, next) {
  validate(administrator_schema, req, res, next)
}

//------------------------------------------------------------------------------

function ups(req, res, next) {
  validate(ups_schema.event, req, res, next)
}

//------------------------------------------------------------------------------

module.exports = {
  administrator,
  ups,
}
