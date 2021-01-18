const twilio = require('twilio')
const config = require('firebase-functions').config()

validate_environment_variables()

const to = get_phone_numbers()

//------------------------------------------------------------------------------

function get_phone_numbers() {
  phone_numbers = config.admin.phone_numbers.split(',')

  if (phone_numbers.length < 1) {
    const message = 'admin.phone_numbers should be a comma delimited string of valid phone numbers'
    throw new Error(message)
  }

  return phone_numbers
}

//------------------------------------------------------------------------------

function validate_environment_variables() {
  const missing_environment_variables = []

  if (!config.twilio.account_sid) {
    missing_environment_variables.push('twilio.account_sid')
  }

  if (!config.twilio.auth_token) {
    missing_environment_variables.push('twilio.auth_token')
  }

  if (!config.twilio.phone_number) {
    missing_environment_variables.push('twilio.phone_number')
  }

  if (!config.admin.phone_numbers) {
    missing_environment_variables.push('admin.phone_numbers')
  }

  if (missing_environment_variables.length !== 0) {
    const message = `Missing environment variables ${missing_environment_variables.join(",")}`
    throw new Error(message)
  }
}

//------------------------------------------------------------------------------

function send(message) {
  const client = twilio(config.twilio.account_sid, config.twilio.auth_token)

  const promises = to.map(number => {
    return client.messages.create({
      body: message,
      from: config.twilio.phone_number,
      to: number
    })
  })

  return Promise.all(promises)
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
