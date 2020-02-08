const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config')

const startServer = async () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.static(`${__dirname}/public`))

  app.use(require('./api/index'))

  try {
    await app.listen(config.port)
    console.log('Server started')
  } catch (e) {
    console.log('Error starting server on port: ', config.port)
  }
}

startServer()
