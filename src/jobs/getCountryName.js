import axios from 'axios'
import { Transform } from 'stream'

// const getCountryNameOperator = async (chunk, callback) => {
//   const result = []
//   for (const iterator of chunk) {
//     const { country_code: countryCode } = iterator
//     const { data } = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${countryCode}`).catch(() => ({ data: [] }))
//     const [country] = data
//     result.push({ ...iterator, country_name: country?.name?.common || '' })
//   }
//   callback(null, result)
// }

// const getCountryName = new Transform({
//   objectMode: true,
//   transform (chunk, _encoding, callback) {
//     getCountryNameOperator(chunk, callback)
//   }
// })

async function * getCountryNameRequest (chunk) {
  for await (const item of chunk) {
    const { country_code: countryCode } = item
    const { data } = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${countryCode}`).catch(() => ({ data: [] }))
    const [country] = data
    yield ({ ...item, country_name: country?.name?.common || '' })
  }
}

const getCountryName = new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    const getCountryNameOperator = async () => {
      const result = getCountryNameRequest(chunk)
      for await (const item of result) {
        this.push(item)
      }
      callback()
    }
    getCountryNameOperator()
  }
})

export { getCountryName }
