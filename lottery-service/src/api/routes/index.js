const router = require('express').Router()

router.use('/entries', require('./entry'))
router.use('/history', require('./history'))
router.use('/lotteries', require('./lottery'))

module.exports = router
