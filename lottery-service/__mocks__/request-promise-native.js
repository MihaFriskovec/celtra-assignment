const requestPromiseNative = jest.genMockFromModule('request-promise-native')

const get = async options => {
  return JSON.stringify({
    lotteryNumber: 10,
    createdAt: '2020-02-10 09:04:00'
  })
}

requestPromiseNative.get = get

module.exports = requestPromiseNative
