const router = require('express').Router()
const drawNumber = require('../../services/draw-number.js')

router.get('/', async (req, res) => {
  const number = await drawNumber()

  return res.json(number)
})

module.exports = router
