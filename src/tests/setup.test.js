import pipe from '../setup.js'
import IoredisMocked from 'ioredis-mock'
import nock from 'nock'
import { countryNameApiHost } from '../jobs/getCountryName.js'

const fileDataMocked = 'src/tests/dataMock/dataMock.csv'
jest.mock('ioredis', () => require('ioredis-mock'))

const nockReturn = [
  {
    name: {
      common: 'Country name test'
    }
  }
]

const regexUrl = /\/v3\.1\/alpha\?codes=[A-Z]{2}$/g

console.log = jest.fn()

describe('setup', () => {
  describe('with all corrects returns', () => {
    let redisClientMocked

    beforeAll(async () => {
      nock(countryNameApiHost).persist().get(regexUrl).reply(200, nockReturn)

      redisClientMocked = new IoredisMocked()

      await pipe({ filePath: fileDataMocked, aggregateQuantity: 5 })
    })

    afterAll(async () => {
      jest.resetAllMocks()
      jest.restoreAllMocks()
      nock.cleanAll()
    })

    it('should call setup and execute correctly', async () => {
      const ioRedisDBSize = await redisClientMocked.dbsize()

      expect(ioRedisDBSize).toBe(10)
    })
  })
})
