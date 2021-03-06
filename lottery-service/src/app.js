const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')

const initDB = require('./loaders/mongoose')

const seed = require('./db/seed')

const startServer = async () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.static(`${__dirname}/public`))

  app.use(cors())

  app.use(require('./api/index'))

  app.use((err, req, res, next) => {
    const error = {
      path: req.path,
      timestamp: new Date()
    }
    res.status(500).json(error)
  })

  const { port } = config

  try {
    await initDB()
    await seed()

    require('./services/scheduler')
    await app.listen(port)
    console.log(`Server started on port ${port}`)
  } catch (e) {
    console.log(`Error starting server on port ${port}`)
  }
}

startServer()
