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

describe('Test Lottery service', () => {
  it('should add new lottery', async () => {
    const lotteryService = require('../../../src/services/lotteries')
    const lotteryName = 'testLottery'

    const result = await lotteryService.addLoterry(lotteryName)

    expect(result).toHaveProperty('name', lotteryName)
    expect(result).toHaveProperty('active', true)

    const list = await lotteryService.getActiveLotteries()

    expect(list).toHaveLength(1)
  })

  it('should get created lottery', async () => {
    const lotteryService = require('../../../src/services/lotteries')
    const lotteryName = 'testLottery'

    await lotteryService.addLoterry(lotteryName)

    const result = await lotteryService.getLottery(lotteryName)

    expect(result).toHaveProperty('name', lotteryName)
    expect(result).toHaveProperty('active', true)
  })

  it('should upsert lottery if it already exists', async () => {
    const lotteryService = require('../../../src/services/lotteries')
    const lotteryName = 'testLottery'

    const result = await lotteryService.addLoterry(lotteryName)

    const currentId = result._id

    const result1 = await lotteryService.addLoterry(lotteryName)

    expect(String(result1._id)).toBe(String(currentId))

    const list = await lotteryService.getActiveLotteries()

    expect(list).toHaveLength(1)
  })

  it('should disable lottery', async () => {
    const lotteryService = require('../../../src/services/lotteries')
    const lotteryName = 'testLottery'

    await lotteryService.addLoterry(lotteryName)

    const list = await lotteryService.getActiveLotteries()

    expect(list).toHaveLength(1)

    await lotteryService.disableLottery(lotteryName)

    const list1 = await lotteryService.getActiveLotteries()

    expect(list1).toHaveLength(0)
  })

  it('should return error if lottery with given name does not exists', async () => {
    const lotteryService = require('../../../src/services/lotteries')
    const lotteryName = 'testLottery'

    expect(lotteryService.getLottery(lotteryName)).rejects.toThrow(
      'Error getting lottery'
    )
  })
})
