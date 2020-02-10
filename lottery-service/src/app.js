const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')

const initDB = require('./loaders/mongoose')

const startServer = async () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.static(`${__dirname}/public`))

  app.use(require('./api/index'))

  const { port } = config

  await initDB()

  try {
    require('./services/scheduler')
    await app.listen(port)
    console.log(`Server started on port ${port}`)
  } catch (e) {
    console.log(`Error starting server on port ${port}`)
  }
}

startServer()
