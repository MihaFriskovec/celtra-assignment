jest.mock('request-promise-native')

describe('Test draw number service', () => {
  it('should return winning number', async () => {
    const drawService = require('../../../src/services/draw-number')

    const result = await drawService()

    expect(typeof result).toBe('object')

    expect(result).toHaveProperty('lotteryNumber', 10)
    expect(result).toHaveProperty('createdAt', '2020-02-10 09:04:00')
  })
})
