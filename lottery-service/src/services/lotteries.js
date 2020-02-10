const mongoose = require('mongoose')
const logger = require('pino')()

const Lottery = mongoose.model('Lottery')

/**
 * Register new lottery. Save lottery to DB
 * @param {String} lotteryName - Lottery name
 * @returns {Object} - Saved lottery
 * @throws Throws error if there is a problem with databse
 */
const addLoterry = async lotteryName => {
  const lottery = new Lottery(lotteryName)

  try {
    const savedLottery = await lottery.save()

    return savedLottery
  } catch (e) {
    logger.error(`Error saving new lottery ${e.message}`)
    throw new Error('Error saving new lottery')
  }
}

/**
 * Returns array of all active lotteries. Filter by field "active"
 * @returns {Array} - Array of all active lotteries
 * @throws Throws error if there is a problem with databse
 */
const getActiveLotteries = async () => {
  try {
    const activeLotteries = await Lottery.find({ active: true })

    return activeLotteries
  } catch (e) {
    logger.error(`Error getting active lotteris ${e.message}`)
    throw new Error('Error getting active lotteries')
  }
}

/**
 * Return lottery with given name
 * @param {String} lotteryName - Lottery name
 * @returns {Object} - Lottery from database with given name
 * @throws Throws error if there is a problem with databse
 *
 */
const getLottery = async lotteryName => {
  try {
    const lottery = await Lottery.findOne({ name: lotteryName })

    return lottery
  } catch (e) {
    logger.error(`Error getting lottery ${e.message}`)
    throw new Error('Error getting lottery')
  }
}

/**
 * Disable lottery with given name. Set "active" field to false
 * @param {String} lotteryName - Lottery name
 * @returns {Object} - Disabled lottery
 * @throws Throws error if there is a problem with databse
 */
const disableLottery = async lotteryName => {
  try {
    const lottery = await Lottery.findOneAndUpdate(
      { name: lotteryName },
      { active: false }
    )

    return lottery
  } catch (e) {
    logger.error(`Error disabling lottery ${e.message}`)
    throw new Error('Error disabling lottery')
  }
}

module.exports = { addLoterry, getActiveLotteries, getLottery, disableLottery }
