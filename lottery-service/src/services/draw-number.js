const request = require('request-promise-native')
const config = require('../config')

const getWinningNumber = async () => {
  const options = {
    uri: config.lotteryAPI
  }

  try {
    const response = await request(options)
    const winningNumber = JSON.parse(response)

    console.log('WINNING NUMBER', winningNumber)

    return winningNumber
  } catch (e) {
    console.log(e)
    throw new Error('Error getting winning number')
  }
}

module.exports = getWinningNumber
