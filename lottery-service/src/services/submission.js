const logger = require('pino')()
const redis = require('redis')

const { promisify } = require('util')

const lotteries = require('./lotteries')

const client = redis.createClient({ host: 'redis' })

const asyncPush = promisify(client.rpush).bind(client)
const asyncList = promisify(client.lrange).bind(client)
const asyncDelete = promisify(client.del).bind(client)
const asyncExists = promisify(client.exists).bind(client)

/**
 * Submit user to given lottery. Submission is handled trough REDIS.
 * @param {String} user - Name of the user
 * @param {Number} number - Selected number
 * @param {String} lotteryName - Lottery name
 */
const submit = async (user, number, lotteryName) => {
  const lottery = await lotteries.getLottery(lotteryName)

  const { name } = lottery

  const data = JSON.stringify({ user, number })

  try {
    const result = await asyncPush(name, data)

    logger.info('Added item to list')

    return result
  } catch (e) {
    logger.error(`Error submiting user to lottery ${e.message}`)
    throw new Error('Error submiting user to lottery')
  }
}

/**
 * List all users submited for given lottery. Users are stored in REDIS
 * @param {String} lotteryName - Lottery name
 * @returns {Array} - Array of all users in given list
 * @throws Throws error if there is an error reading submissions from REDIS
 */
const getSubmission = async lotteryName => {
  const lottery = lotteries.getLottery(lotteryName)

  const { name } = lottery

  try {
    const exists = await asyncExists(name)

    if (!exists) return []

    const result = await asyncList(lottery, 0, -1)

    logger.info('List items from list')

    return result
  } catch (e) {
    logger.error(`Error getting submission for lottery ${e.message}`)
    throw new Error('Error getting submission for lottery')
  }
}

/**
 * Clear all submission for given list.
 * @param {String} looteryName - Lottery name
 */
const clearSubmission = async lotteryName => {
  try {
    const result = await asyncDelete(lotteryName)

    logger.info('Removed items from list')

    return result
  } catch (e) {
    logger.error(`Error deleting submission from lottery ${e.message}`)
    throw new Error('Error deleting submission from lottery')
  }
}

module.exports = { submit, getSubmission, clearSubmission }
