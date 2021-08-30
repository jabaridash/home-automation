const environment = require('../environment')
const database = require('../utility/database')
const http = require('../utility/http')
const email = require('../utility/email')
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

function get_subject(event) {
  switch (event.type) {
    case 'onbattery': return `${environment.application_name}: The power has gone out`
    case 'offbattery': return `${environment.application_name}: The power has been restored`
    default: return `${environment.application_name}: An event has occured with your UPS`
  }
}

//------------------------------------------------------------------------------

function get_email_html(event, administrator) {
  const status = [
    `<strong>Status:</strong> ${event.status.status}`,
    `<strong>Load:</strong> ${event.status.loadpct}`,
    `<strong>Battery charge:</strong> ${event.status.bcharge}`,
    `<strong>Time remaining:</strong> ${event.status.timeleft}`,
    `<strong>Time on battery:</strong> ${event.status.tonbatt}`,
  ]
  .map(text => `${text}<br>`)
  .join('')

  return `
  <p>Hi ${administrator.name},</p>

  <p>${get_text_message(event)}</p>

  <p>The status of UPS '${event.status.upsname}' follows:</p>
  ${status}

  <p>Please log into your affected servers to verify that they have responded appropriately.</p>
  `
}

//------------------------------------------------------------------------------

async function notify(event) {
  return database.administrators.get_all().then(administrators => {
    return administrators.map(administrator => {
      console.log(`Notifying administrator ${administrator.name} of event: ${event.type}`)

      const promises = []

      if (environment.should_send_email) {
        promises.push(
          email.send(
            get_email_html(event, administrator),
            get_subject(event),
            administrator.email
          ).catch(error => {
            console.error(`Failed to email administrator: ${administrator.name}\n${error.stack}`)
          })
        )
      }

      if (environment.should_send_sms) {
        promises.push(
          sms.send(get_text_message(event), administrator.phone_number)
          .catch(error => {
            console.error(`Failed to email administrator: ${administrator.name}\n${error.stack}`)
          })
        )
      }

      return Promise.all(promises)
    })
  })
}


//------------------------------------------------------------------------------

function save(req, res, next) {
  Promise.all([
    notify(req.body),
    database.ups_events.save(req.body)
  ])
  .then(doc => res.status(http.STATUS_CODES.OK).json({ message: 'Ok' }))
  .catch(next)
}

module.exports = { save }
