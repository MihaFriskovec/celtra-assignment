const router = require('express').Router()
const submission = require('../../services/submission')

router.post('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName },
    body: { user, number }
  } = req

  const entry = await submission.submit(user, number, lotteryName)

  return res.json(entry)
})

module.exports = router
