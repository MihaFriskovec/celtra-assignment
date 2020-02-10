const router = require('express').Router()
const latestWinnsers = require('../../services/latest-winners')

router.get('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName }
  } = req

  const winners = await latestWinnsers(lotteryName)

  return res.json(winners)
})

module.exports = router
