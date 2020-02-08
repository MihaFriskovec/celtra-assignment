const schedule = require('node-schedule')

const pickWinner = require('./pick-winner')

const jobHalfMinute = schedule.scheduleJob('30 * * * * *', pickWinner)

const jobFullMinute = schedule.scheduleJob('* * * * *', pickWinner)
