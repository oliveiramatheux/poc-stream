import { pipeline } from 'stream/promises'
import { Readable } from 'stream'
import { getCountryName } from '../getCountryName'

describe('getCountryName', () => {
  it('should call getCountryName with country code and return country name', async () => {
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

    await pipeline(mockStream, getCountryName)
  })
})
