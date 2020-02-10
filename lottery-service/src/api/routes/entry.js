const router = require('express').Router()
const addUserEntry = require('../../services/add-entry')

router.post('/:lotteryName', async (req, res) => {
  const {
    params: { lotteryName },
    body: { user, number }
  } = req

  const entry = await addUserEntry(user, number, lotteryName)

  return res.json(entry)
})

module.exports = router
