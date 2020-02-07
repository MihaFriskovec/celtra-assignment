const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  lotteryAPI: process.env.LOTTERY_API
}
