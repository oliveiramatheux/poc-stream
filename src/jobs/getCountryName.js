import axios from 'axios'
import { Transform } from 'stream'

const getCountryNameRequest = async (chunk, callback) => {
  const { country_code: countryCode } = chunk
  const { data } = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${countryCode}`).catch(() => ({ data: [] }))
  const [country] = data
  callback(null, { ...chunk, country_name: country?.name?.common || '' })
}

const getCountryName = new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    getCountryNameRequest(chunk, callback)
  }
})

export { getCountryName }
