const router = require('express').Router()
const latestWinnsers = require('../../services/latest-winners')

router.get('/', async (req, res) => {
  const winners = await latestWinnsers()

  return res.json(winners)
})

module.exports = router
