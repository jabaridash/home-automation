const database = require('../utility/database')
const http = require('../utility/http')
const sms = require('../utility/sms')

//------------------------------------------------------------------------------

function get_text_message(event) {
  switch (event.type) {
    case 'onbattery': return `The power has gone out on the UPS ${event.status.upsname}, and it has switched to battery. The battery has ${event.status.bcharge} charge (${event.status.timeleft}) left.`
    case 'offbattery': return `The power has been restored on UPS ${event.status.upsname}`
    default: return `An event of type '${event.type}' has occured on UPS ${event.status.upsname}.`
  }
}

//------------------------------------------------------------------------------

function handle(req, res, next) {
  sms.send(get_text_message(req.body))

  database.ups_events.save(req.body)
  .then(doc => res.status(http.STATUS_CODES.OK).json({ message: 'Ok' }))
  .catch(next)
}

module.exports = { handle }
