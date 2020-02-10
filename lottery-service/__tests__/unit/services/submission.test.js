const redis = require('redis')
const redisMock = require('redis-mock')

jest.mock('../../../src/services/lotteries')
jest.spyOn(redis, 'createClient').mockImplementation(redisMock.createClient)

beforeEach(async () => {
  const submission = require('../../../src/services/submission')
  await submission.clearSubmission('lottery1')
  jest.clearAllMocks()
  jest.resetAllMocks()
})

describe('Test submission service', () => {
  it('should submit user to given lottery', async () => {
    const submission = require('../../../src/services/submission')

    const lotteryService = require('../../../src/services/lotteries')

    lotteryService.getLottery.mockResolvedValue({
      name: 'lottery1',
      active: true
    })

    const result = await submission.submit('Miha', 10, 'lottery1')

    expect(lotteryService.getLottery).toHaveBeenCalledTimes(1)

    expect(result).toBe(1)
  })

  it('should add multiple submitions to given lottery', async () => {
    const submission = require('../../../src/services/submission')
    const lotteryName = 'lottery1'

    const lotteryService = require('../../../src/services/lotteries')

    lotteryService.getLottery.mockResolvedValue({
      name: 'lottery1',
      active: true
    })

    const first = await submission.submit('Miha', 10, lotteryName)

    expect(first).toBe(1)

    const second = await submission.submit('Janez', 11, lotteryName)

    expect(lotteryService.getLottery).toHaveBeenCalledTimes(2)

    expect(second).toBe(2)
  })
})
