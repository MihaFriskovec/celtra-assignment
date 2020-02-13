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

  const { lotteryNumber } = lotteryApiResult

  logger.info(`Winning number: ${lotteryNumber}`)

  const result = []

  for (let i = 0; i < activeLotteries.length; i++) {
    const activeLottery = activeLotteries[i]
    // for (const activeLottery of activeLotteries) {
    const { name: lotteryName } = activeLottery

    const users = await submission.getSubmission(lotteryName)
    await submission.clearSubmission(lotteryName)

    const winners = users
      .filter(entry => Number(entry.split(':')[1]) === lotteryNumber)
      .map(user => user.split(':')[0])

    logger.info(`Winners ${winners}`)

    const historyData = {
      lotteryName,
      users: winners,
      winningNumber: lotteryNumber
    }

    result.push(historyData)

    await history.setLatestWinners(historyData)
  }

  return result
}

module.exports = pickWinner
