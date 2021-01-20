const twilio = require('twilio')
const environment = require('../configuration')

//------------------------------------------------------------------------------

function send(message) {
  const client = twilio(environment.twilio.account_sid, environment.twilio.auth_token)

  const promises = environment.admins.phone_numbers.map(number => {
    return client.messages.create({
      body: message,
      from: environment.twilio.phone_number,
      to: number
    })
  })

  return Promise.all(promises)
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
