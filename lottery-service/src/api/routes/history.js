const router = require('express').Router()
const history = require('../../services/history')

router.get('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName }
  } = req

  try {
    const winners = await history.getLatestWinners(lotteryName)

    return res.json(winners)
  } catch (e) {}
})

module.exports = router
