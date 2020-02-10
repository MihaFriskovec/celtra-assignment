const request = require('request-promise-native')
const logger = require('pino')()

const config = require('../config')

const options = {
  uri: config.lotteryAPI
}

/**
 * Makes call to lotteryApi and returns new winning number.
 * @returns {object} - New winning number with timestamp
 * @throws Will throw error if request to external API in not successful.
 */
const getWinningNumber = async () => {
  try {
    logger.info(`Getting new winning number with options: ${options}`)
    const response = await request.get(options)

    const winningNumber = JSON.parse(response)

    logger.info(`Winning number: ${winningNumber}`)

    return winningNumber
  } catch (e) {
    logger.error(`Error getting new winning number ${e.message}`)
    throw new Error('Error getting winning number')
  }
}

module.exports = getWinningNumber
