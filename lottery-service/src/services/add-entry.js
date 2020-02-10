const lotteries = require('./lotteries')

const addEntry = (user, number, lotteryName) => {
  const lottery = lotteries.getLottery(lotteryName)

  lottery.push({ user, number })

  return lottery
}

module.exports = addEntry
