const router = require('express').Router()
const lotteries = require('../../services/lotteries')

router.post('/', async (req, res) => {
  const {
    body: { lotteryName }
  } = req

  const lottery = await lotteries.addLoterry(lotteryName)

  return res.status(201).json(lottery)
})

module.exports = router
