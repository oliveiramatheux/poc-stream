import { pipeline } from 'stream/promises'
import { Readable, Transform } from 'stream'
import { getCountryName, countryNameApiUrl } from '../getCountryName'
import * as axios from 'axios'

jest.mock('axios')

describe('getCountryName', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call getCountryName with country code and return country name', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          name: {
            common: 'Brasil'
          }
        }
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          name: {
            common: 'Portugal'
          }
        }
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          name: {
            common: ''
          }
        }
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          name: {
            common: 'Argentina'
          }
        }
      ]
    })

    const chunckMocked = [
      [
        { country_code: 'BR' },
        { country_code: 'PT' }
      ],
      [
        { country_code: 'EN' },
        { country_code: 'ARG' }
      ]
    ]

    const mockStream = Readable.from(chunckMocked)

    const result = []

    await pipeline(mockStream, getCountryName(), Transform({
      objectMode: true,
      transform (chunk, _encoding, callback) {
        result.push(chunk)
        callback()
      }
    }))

    expect(result.flat()).toEqual([
      {
        country_code: 'BR',
        country_name: 'Brasil'
      },
      {
        country_code: 'PT',
        country_name: 'Portugal'
      },
      {
        country_code: 'EN',
        country_name: ''
      },
      {
        country_code: 'ARG',
        country_name: 'Argentina'
      }
    ])

    expect(result.flat().length).toBe(4)
    expect(axios.get).toBeCalledTimes(4)
    expect(axios.get).nthCalledWith(1, `${countryNameApiUrl}?codes=BR`)
  })

  it('should call getCountryName with country code but not return country name', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          name: undefined
        }
      ]
    })

    const chunckMocked = [
      [
        { country_code: 'BR' }
      ]
    ]

    const mockStream = Readable.from(chunckMocked)

    const result = []

    await pipeline(mockStream, getCountryName(), Transform({
      objectMode: true,
      transform (chunk, _encoding, callback) {
        result.push(chunk)
        callback()
      }
    }))

    expect(result.flat()).toEqual([
      {
        country_code: 'BR',
        country_name: ''
      }
    ])

    expect(result.flat().length).toBe(1)
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).nthCalledWith(1, `${countryNameApiUrl}?codes=BR`)
  })

  it('should call getCountryName with country code but not return country', async () => {
    axios.get.mockResolvedValueOnce({
      data: []
    })

    const chunckMocked = [
      [
        { country_code: 'BR' }
      ]
    ]

    const mockStream = Readable.from(chunckMocked)

    const result = []

    await pipeline(mockStream, getCountryName(), Transform({
      objectMode: true,
      transform (chunk, _encoding, callback) {
        result.push(chunk)
        callback()
      }
    }))

    expect(result.flat()).toEqual([
      {
        country_code: 'BR',
        country_name: ''
      }
    ])

    expect(result.flat().length).toBe(1)
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).nthCalledWith(1, `${countryNameApiUrl}?codes=BR`)
  })
})
