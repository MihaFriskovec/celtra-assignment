const router = require('express').Router()
const history = require('../../services/history')
const scheduler = require('../../services/scheduler')

router.get('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName }
  } = req

  try {
    const winners = await history.getLatestWinners(lotteryName)
    const nextTick = await scheduler.getNextTick()

    return res.json({ winners, nextTick })
  } catch (e) {}
})

module.exports = router
