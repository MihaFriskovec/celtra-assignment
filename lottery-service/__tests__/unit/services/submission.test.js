const redis = require('redis')

const redisMock = require('redis-mock')

jest.spyOn(redis, 'createClient').mockImplementation(redisMock.createClient)

describe('Test submission service', () => {
  it('should submit user to given lottery', async () => {
    const submission = require('../../../src/services/submission')

    const result = await submission.submit('Miha', 10, 'lottery1')

    expect(result).toBe(1)
  })

  it('should add multiple submitions to given lottery', async () => {
    const submission = require('../../../src/services/submission')
    const lotteryName = 'lottery1'

    const first = await submission.submit('Miha', 10, lotteryName)

    expect(first).toBe(1)

    const second = await submission.submit('Janez', 11, lotteryName)

    expect(second).toBe(2)
  })
})
