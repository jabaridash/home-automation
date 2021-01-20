// TODO - using logging library

function log_request(req, res, next) {
  console.log(`${req.method}: ${req.originalUrl}`)

  if (req.body) {
    console.log(req.body)
  }

  res.on('finish', () => console.log(`Status: ${res.statusCode}`))
  next()
}

module.exports = {
  log_request,
}
