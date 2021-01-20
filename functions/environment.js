const config = require('firebase-functions').config()
const Validator = require('jsonschema').Validator
const validator = new Validator()

//------------------------------------------------------------------------------

const schema = {
  id: "/config-schema",
  properties: {
    name: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"]
    },
    api: {
      type: "object",
      properties: {
        key: { type: "string" },
      },
      required: ["key"]
    },
    twilio: {
      type: "object",
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        phone_number: { type: "string" },
      },
      required: [
        "account_sid",
        "auth_token",
        "phone_number",
      ],
    },
    email: {
      type: "object",
      properties: {
        service: { type: "string" },
        auth: {
          type: "object",
          properties: {
            user: { type: "string" },
            pass: { type: "string" },
          },
          required: ["user", "pass"]
        }
      },
      required: ["service", "auth"]
    }
  },
  required: ["twilio", "api", "email"],
}

//------------------------------------------------------------------------------

function get_environment() {
  const result = validator.validate(config, schema)

  if (!result.valid) {
    throw new Error(JSON.stringify(result, null, 2))
  }

  return {
    application_name: config.application.name,
    api_key: config.api.key,
    twilio: config.twilio,
    email: config.email,
  }
}

//------------------------------------------------------------------------------

module.exports = get_environment()
