const mongoose = require('mongoose')
const logger = require('pino')()
const config = require('../config')

const connect = async () => {
  try {
    await mongoose.connect(config.databaseURL, { useNewUrlParser: true })
    logger.info('Successfully connected to MongoDB')
  } catch (e) {
    logger.error(`Error connecting to MongoDB ${e.message}`)
    throw new Error('Error connecting to MongoDB')
  }
}

module.exports = connect
