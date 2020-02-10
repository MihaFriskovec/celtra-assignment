jest.mock('../../../src/services/draw-number')
jest.mock('../../../src/services/lotteries')
jest.mock('../../../src/services/submission')
jest.mock('../../../src/services/history')

describe('Test Pick Winner service', () => {
  it('should pick a new winner for given lottery', async () => {
    const pickWinner = require('../../../src/services/pick-winner')

    const drawNumber = require('../../../src/services/draw-number')
    const lotteryService = require('../../../src/services/lotteries')
    const subbmisionService = require('../../../src/services/submission')
    const historyService = require('../../../src/services/history')

    drawNumber.mockResolvedValue({
      lotteryNumber: 10,
      createdAt: '2020-02-09 21:56:30'
    })

    lotteryService.getLottery.mockResolvedValue({
      lotteryName: 'lotteryName1',
      active: true
    })

    lotteryService.getActiveLotteries.mockResolvedValue([
      {
        lotteryName: 'lotteryName1',
        active: true
      }
    ])

    subbmisionService.getSubmission.mockResolvedValue([
      JSON.stringify({
        user: 'Miha',
        number: 10
      })
    ])

    historyService.setLatestWinners.mockResolvedValue({
      lotteryName: 'lottetyName1',
      users: ['Miha'],
      winningNumber: 10
    })

    const result = await pickWinner()

    expect(result).toHaveLength(1)
    expect(result[0].lotteryName).toBe('lotteryName1')
    expect(result[0].lotteryNumber).toBe(10)
    expect(result[0].winners).toHaveLength(1)
  })

  it('should not be a winner', async () => {
    const pickWinner = require('../../../src/services/pick-winner')

    const drawNumber = require('../../../src/services/draw-number')
    const lotteryService = require('../../../src/services/lotteries')
    const subbmisionService = require('../../../src/services/submission')
    const historyService = require('../../../src/services/history')

    drawNumber.mockResolvedValue({
      lotteryNumber: 10,
      createdAt: '2020-02-09 21:56:30'
    })

    lotteryService.getLottery.mockResolvedValue({
      lotteryName: 'lotteryName1',
      active: true
    })

    lotteryService.getActiveLotteries.mockResolvedValue([
      {
        lotteryName: 'lotteryName1',
        active: true
      }
    ])

    subbmisionService.getSubmission.mockResolvedValue([
      JSON.stringify({
        user: 'Miha',
        number: 11
      })
    ])

    historyService.setLatestWinners.mockResolvedValue({
      lotteryName: 'lottetyName1',
      users: ['Miha'],
      winningNumber: 10
    })

    const result = await pickWinner()

    expect(result).toHaveLength(1)
    expect(result[0].lotteryName).toBe('lotteryName1')
    expect(result[0].lotteryNumber).toBe(10)
    expect(result[0].winners).toHaveLength(0)
  })
})
