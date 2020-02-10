const logger = require('pino')()
const scheduler = require('./scheduler')

const History = require('../models/history')

/**
 * Get winners history by lottery name
 * @param {String} lotteryName - Lottery name
 * @returns {Array} - Latest winners
 */
const getLatestWinners = async lotteryName => {
  const query = {
    lotteryName
  }

  try {
    const latestWinners = await History.find(query).limit(5)

    const latestWinnersData = latestWinners.toArray()

    logger.info(`Latests winners ${JSON.stringify(latestWinnersData)}`)
    logger.info(`Next tick ${scheduler.getNextTick}`)

    const data = {
      data: latestWinnersData,
      nextTick: scheduler.getNextTick()
    }

    return data
  } catch (e) {
    logger.error(`Error getting latest winners ${e.message}`)
    throw new Error('Error getting latest winners')
  }
}

/**
 * Save history data to collection
 * @param {Object} data - Data to be saved in history collection
 * @returns {Object} - Saved history data
 */
const setLatestWinners = async data => {
  const history = new History(data)

  try {
    const result = await history.save()

    return result
  } catch (e) {
    logger.error(`Error saving historz ${e.message}`)

    throw new Error('Error saving history')
  }
}

module.exports = { getLatestWinners, setLatestWinners }
