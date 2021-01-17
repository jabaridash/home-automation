function log_request(req, res, next) {
  console.log(`${req.method}: ${req.originalUrl}`)
  res.on('finish', () => console.log(`Status: ${res.statusCode}`))
  next()
}

module.exports = {
  log_request,
}
