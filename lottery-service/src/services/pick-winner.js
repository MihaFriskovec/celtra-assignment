const logger = require('pino')()

const lotteris = require('./lotteries')
const drawNumber = require('./draw-number')
const submission = require('./submission')
const history = require('./history')

/**
 * Pick winner for each active lottery and save result to histroy collection.
 */
const pickWinner = async () => {
  logger.info('Picking new winners')
  const lotteryApiResult = await drawNumber()
  const activeLotteries = await lotteris.getActiveLotteries()
  logger.info(`Active lotteris ${activeLotteries}`)

  const { lotteryNumber } = lotteryApiResult

  logger.info(`Winning number: ${lotteryNumber}`)

  const result = []

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

    result.push(historyData)

    await history.setLatestWinners(historyData)
  }

  return result
}

module.exports = pickWinner
