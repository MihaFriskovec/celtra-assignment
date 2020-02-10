const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod = null

beforeEach(async () => {
  mongod = new MongoMemoryServer({ autoStart: false })

  await mongod.start()

  const url = await mongod.getConnectionString()

  await mongoose.connect(url, { useNewUrlParser: true })
})

afterEach(async () => {
  await mongod.stop()
  await mongoose.disconnect()
})

describe('Test History service', () => {
  it('should save new histroy record', async () => {
    const histroyService = require('../../../src/services/history')
    const lotteryData = {
      lotteryName: 'lotteryName1',
      users: ['Miha'],
      winningNumber: 10
    }

    const result = await histroyService.setLatestWinners(lotteryData)

    expect(result).toHaveProperty('_id')
    expect(result).toHaveProperty('lotteryName', lotteryData.lotteryName)
    expect(result).toHaveProperty('winningNumber', lotteryData.winningNumber)
    expect(result).toHaveProperty('users')
    expect(Array.isArray(result.users)).toBe(true)
  })

  it('should get existing history', async () => {
    const histroyService = require('../../../src/services/history')
    const lotteryData = {
      lotteryName: 'lotteryName1',
      users: ['Miha'],
      winningNumber: 10
    }

    await histroyService.setLatestWinners(lotteryData)

    const result = await histroyService.getLatestWinners(
      lotteryData.lotteryName
    )

    expect(result).toHaveLength(1)

    const [winner] = result

    expect(winner).toHaveProperty('_id')
    expect(winner).toHaveProperty('lotteryName', lotteryData.lotteryName)
    expect(winner).toHaveProperty('winningNumber', lotteryData.winningNumber)
    expect(winner).toHaveProperty('users')
    expect(Array.isArray(winner.users)).toBe(true)
  })

  it('should return last 5 records', async () => {
    const histroyService = require('../../../src/services/history')
    const lotteryData = {
      lotteryName: 'lotteryName1',
      users: ['Miha'],
      winningNumber: 10
    }

    for (let i = 0; i < 10; i++) {
      await histroyService.setLatestWinners(lotteryData)
    }

    const result = await histroyService.getLatestWinners(
      lotteryData.lotteryName
    )

    expect(result).toHaveLength(5)
  })

  it('should get different lotteries', async () => {
    const histroyService = require('../../../src/services/history')
    const lotteryData1 = {
      lotteryName: 'lotteryName1',
      users: ['Miha'],
      winningNumber: 10
    }

    const lotteryData2 = {
      lotteryName: 'lotteryName2',
      users: ['Janez'],
      winningNumber: 11
    }

    await histroyService.setLatestWinners(lotteryData1)
    await histroyService.setLatestWinners(lotteryData2)

    const result = await histroyService.getLatestWinners(
      lotteryData1.lotteryName
    )

    expect(result[0].lotteryName).toBe(lotteryData1.lotteryName)

    const result1 = await histroyService.getLatestWinners(
      lotteryData2.lotteryName
    )

    expect(result1[0].lotteryName).toBe(lotteryData2.lotteryName)
  })
})
