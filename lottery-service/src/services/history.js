const mongoose = require('mongoose')

const History = mongoose.schema('History')

const getLatestWinners = async lotteryName => {
  const query = {
    lotteryName
  }

  const latestWinners = await History.find(query).limit(5)

  return latestWinners.toArray()
}

module.exports = getLatestWinners
