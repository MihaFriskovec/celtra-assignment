const lotteris = require('./lotteries')
const drawNumber = require('./draw-number')

const pickWinner = async () => {
  console.log('Picking winner')
  const lotteryApiResult = await drawNumber()
  const activeLotteries = lotteris.getLotteries()

  const { lotteryNumber } = lotteryApiResult
  const results = []

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

    results.push(winner)
  }

  console.log(results)
}

module.exports = pickWinner
