const router = require('express').Router()

router.use('/draw', require('./draw'))
router.use('/entry', require('./entry'))
router.use('/history', require('./latest-winners'))

module.exports = router
