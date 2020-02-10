const router = require('express').Router()
const history = require('../../services/history')

router.get('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName }
  } = req

  const winners = await history(lotteryName)

  return res.json(winners)
})

module.exports = router
