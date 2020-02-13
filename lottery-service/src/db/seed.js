const Lottery = require('../models/lotteries')
const History = require('../models/history')
// const db = require('../loaders/mongoose')

const lotteries = [
  {
    name: 'celtra',
    active: true
  },
  {
    name: 'custom',
    active: false
  }
]
module.exports = async () => {
  await Lottery.deleteMany({})
  await History.deleteMany({})
  // await db()
  const inserted = await Lottery.insertMany(lotteries)

  console.log(inserted)
}
