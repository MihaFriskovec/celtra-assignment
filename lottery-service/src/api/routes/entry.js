const router = require('express').Router()
const addUserEntry = require('../../services/add-entry')

router.post('/', async (req, res) => {
  const entry = await addUserEntry(req.body)

  return res.json(entry)
})

module.exports = router
