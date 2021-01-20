// TODO - Imports

//------------------------------------------------------------------------------

async function send(message, to) {
  console.log('sending message ' + message + ' to ' + to)

  return {
    message: 'Sent'
  }
}

//------------------------------------------------------------------------------

module.exports = {
  send,
}
