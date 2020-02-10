const logger = require('pino')()

const lotteris = require('./lotteries')
const drawNumber = require('./draw-number')
const submission = require('./submission')

const History = require('../models/history')

/**
 * Pick winner for each active lottery and save result to histroy collection.
 */
const pickWinner = async () => {
  const lotteryApiResult = await drawNumber()
  const activeLotteries = await lotteris.getActiveLotteries()

  const { lotteryNumber } = lotteryApiResult

  for (const activeLottery of activeLotteries) {
    logger.info(`Active lottery ${JSON.stringify(activeLottery)}`)
    const { lotteryName } = activeLottery

    const users = await submission.getSubmission(lotteryName)
    await submission.clearSubmission(lotteryName)

    logger.info(`Users submited ${users}`)
    const winners = users
      .filter(entry => JSON.parse(entry).number === lotteryNumber)
      .map(user => JSON.parse(user).user)

    logger.info(`Winners ${winners}`)

    const historyData = {
      lotteryName,
      winners,
      lotteryNumber
    }

    const history = new History(historyData)

    try {
      const result = await history.save()

      logger.info(
        `Results for lottery ${lotteryName}: ${JSON.stringify(result)}`
      )
    } catch (e) {
      logger.error(`Error picking winner ${e.message}`)
    }
  }

  return 'done'
}

module.exports = pickWinner
