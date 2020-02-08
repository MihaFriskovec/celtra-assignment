const activeLotteris = new Set()

const addLoterry = lotteryName => {
  if (activeLotteris.has(lotteryName)) return activeLotteris

  activeLotteris.add(lotteryName)

  return activeLotteris
}

const getLotteries = () => activeLotteris

module.exports = { addLoterry, getLotteries }
