const activeLotteris = new Map()

activeLotteris.set('test', [])

const addLoterry = lotteryName => {
  if (activeLotteris.has(lotteryName)) {
    return {
      status: 'Lottery already exists'
    }
  }

  activeLotteris.set(lotteryName, [])

  return {
    status: 'Created'
  }
}

const getLotteries = () => activeLotteris

const getLottery = lotteryName => activeLotteris.get(lotteryName)

module.exports = { addLoterry, getLotteries, getLottery }
