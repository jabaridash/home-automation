const config = require('firebase-functions').config()
const Validator = require('jsonschema').Validator
const validator = new Validator()

//------------------------------------------------------------------------------

const schema = {
  id: "/config-schema",
  properties: {
    application: {
      type: "object",
      properties: {
        name: { type: "string" },
        notification_config: {
          type: "object",
          properties: {
            should_send_email: { type: "boolean" },
            should_send_sms: { type: "boolean" },
          },
          required: [
            "should_send_email",
            "should_send_sms",
          ]
        },
        required: ["notification_config"]
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
  required: ["twilio", "api", "email", "application"],
}

//------------------------------------------------------------------------------

function get_environment() {
  const result = validator.validate(config, schema)

  if (!result.valid) {
    const message = 'Required config\n' + JSON.stringify(schema, null, 2)
    throw new Error(message)
  }

  return {
    application_name: config.application.name,
    api_key: config.api.key,
    twilio: config.twilio,
    email: config.email,
    should_send_email: config.application.notification_config.should_send_email,
    should_send_sms: config.application.notification_config.should_send_sms,
  }
}

//------------------------------------------------------------------------------

module.exports = get_environment()
