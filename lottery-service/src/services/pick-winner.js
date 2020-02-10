const lotteris = require('./lotteries')
const drawNumber = require('./draw-number')
const mongoose = require('mongoose')

const LatestWinners = mongoose.model('LatestWinners')

const pickWinner = async () => {
  const lotteryApiResult = await drawNumber()
  const activeLotteries = lotteris.getLotteries()

  const { lotteryNumber } = lotteryApiResult

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of activeLotteries.entries()) {
    const winners = value
      .filter(entry => entry.number === lotteryNumber)
      .map(users => users.user)

    value.splice(0, value.length)

    const winner = {
      lotteryName: key,
      winners,
      winningNumber: lotteryNumber
    }

    const doc = new LatestWinners(winner)

    doc.save()
  }
}

module.exports = pickWinner
