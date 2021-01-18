const http = require('../utility/http')

function catch_all(error, req, res, next) {
  console.error(error)

  res.status(http.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    title: 'Oops!',
    message: 'Something went wrong',
  })
}

module.exports = {
  catch_all,
}
