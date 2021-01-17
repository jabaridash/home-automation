const account_sid = process.env.TWILIO_ACCOUNT_SID
const auth_token = process.env.TWILIO_AUTH_TOKEN
const from = process.env.TWILIO_PHONE_NUMBER
const twilio = require('twilio')

// TODO - Put in environment variable and perse (splitting by comma)

const to = [
  "9142617432",
  // "9144346312"
]

//------------------------------------------------------------------------------

function validate_environment_variables() {
  const missing_environment_variables = []

  if (!account_sid) {
    missing_environment_variables.push('TWILIO_ACCOUNT_SID')
  }

  if (!auth_token) {
    missing_environment_variables.push('TWILIO_AUTH_TOKEN')
  }

  if(!from) {
    missing_environment_variables.push('TWILIO_PHONE_NUMBER')
  }

  if (missing_environment_variables.length !== 0) {
    message = `Missing environment variables ${missing_environment_variables.join(",")}`

    throw new Error(message)
  }
}

//------------------------------------------------------------------------------

function send(message, req, res, next) {
  const error_messages = []

  if (error_messages.length !== 0) {
    res.status(400).json({
      message: 'Message(s) not sent',
      errors: error_messages
    })
  }

  const promises = to.map(number => {
    return twilio(account_sid, auth_token).messages.create({
      body: message,
      from: from,
      to: number
    })
  })

  Promise.all(promises)
  .then(() => res.json({ message: 'Message(s) sent' }))
  .catch(next)
}

//------------------------------------------------------------------------------

validate_environment_variables()

module.exports = {
  send,
}
