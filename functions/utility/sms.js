const twilio = require('twilio')
const environment = require('../environment')

//------------------------------------------------------------------------------

function send(message, to) {
  console.log(`Sending SMS message`)

  const client = twilio(environment.twilio.account_sid, environment.twilio.auth_token)

  return client.messages.create({
    body: message,
    from: environment.twilio.phone_number,
    to: to
  })
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
