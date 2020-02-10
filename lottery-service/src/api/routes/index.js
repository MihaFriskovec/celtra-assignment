const router = require('express').Router()

router.use('/draw', require('./draw'))
router.use('/entries', require('./entry'))
router.use('/history', require('./latest-winners'))
router.use('/lotteries', require('./lottery'))

module.exports = router
