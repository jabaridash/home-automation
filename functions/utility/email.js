const nodemailer = require('nodemailer')
const environment = require('../environment')

//------------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  service: environment.email.service,
  auth: {
    user: environment.email.auth.user,
    pass: environment.email.auth.pass,
  }
})

async function send(text, subject, to) {
  console.log('Sending email message')

  const message = {
    from: environment.email.auth.user,
    to: to,
    subject: subject,
    html: text
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
