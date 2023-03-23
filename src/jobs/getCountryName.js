import axios from 'axios'
import { Transform } from 'stream'

const countryNameApiArguments = '/v3.1/alpha'
const countryNameApiHost = 'https://restcountries.com'
const countryNameApiUrl = `${countryNameApiHost}${countryNameApiArguments}`

const getCountryNameRequest = async (chunk, callback) => {
  const promisses = chunk.map(async (item) => {
    const { country_code: countryCode } = item
    const { data } = await axios.get(`${countryNameApiUrl}?codes=${countryCode}`).catch(() => ({ data: [] }))
    const [country] = data
    return { ...item, country_name: country?.name?.common || '' }
  })
  const response = await Promise.all(promisses)
  callback(null, response)
}

const getCountryName = () => new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    getCountryNameRequest(chunk, callback)
  }
})

export { getCountryName, countryNameApiUrl, countryNameApiHost, countryNameApiArguments }
