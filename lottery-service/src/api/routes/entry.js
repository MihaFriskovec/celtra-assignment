const router = require('express').Router()
const submission = require('../../services/submission')

router.post('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName },
    body: { user, number }
  } = req

  try {
    const entry = await submission.submit(user, number, lotteryName)

    return res.json(entry)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

module.exports = router
