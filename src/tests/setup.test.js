import pipe from '../setup.js'
import IoredisMocked from 'ioredis-mock'

const fileDataMocked = 'src/tests/dataMock/dataMock.csv'
jest.mock('ioredis', () => require('ioredis-mock'))

describe('setup', () => {
  describe('with all corrects returns', () => {
    let redisClientMocked

    beforeAll(async () => {
      redisClientMocked = new IoredisMocked()

      await pipe({ filePath: fileDataMocked, aggregateQuantity: 5 })
    })

    afterAll(async () => {
      jest.resetAllMocks()
      jest.restoreAllMocks()
    })

    it('should call setup and execute correctly', async () => {
      const test = await redisClientMocked.dbsize()
      console.log('quantidade ioredis', test)
    })
  })
})
