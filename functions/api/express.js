const express = require('express')
const cors = require('cors')({ origin: true })
const v1 = require('./v1/router')
const app = express()

app.use(cors)
app.use(express.json())
app.use('/v1', v1)

module.exports = app
