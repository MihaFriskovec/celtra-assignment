const schedule = require('node-schedule')

const pickWinner = require('./pick-winner')

const jobHalfMinute = schedule.scheduleJob('31 * * * * *', pickWinner)

const jobFullMinute = schedule.scheduleJob('1 * * * * *', pickWinner)

const getNextTick = () => {
  const halfMinuteTick = jobHalfMinute.nextInvocation().getTime()
  const fullMinuteTick = jobFullMinute.nextInvocation().getTime()

  return Math.min([halfMinuteTick, fullMinuteTick])
}

module.exports = { getNextTick }
