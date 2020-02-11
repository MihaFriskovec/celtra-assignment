const Lottery = require('../models/lotteries')

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

console.log('SEED')
Lottery.create(lotteries, (err, res) => {
  console.log(err, res)
})
