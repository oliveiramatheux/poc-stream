import { readFileSync, createWriteStream, createReadStream } from 'fs'
import { getRandomCountryCode } from './utils/utils.js'

// https://restcountries.com/ api for get country code
// https://www.mockaroo.com/ site for generate biggest mocks

const countryCodes = JSON.parse(readFileSync('src/data/codes.json'))

const totalLines = 100
const nameFile = 'data'
const filePath = `src/data/${nameFile}.csv`

const writeStream = createWriteStream(filePath)

writeStream.write('id,first_name,last_name,gender,country_code\n')

for (let index = 0; index < totalLines; index++) {
  writeStream.write(`${index + 1},matheus,oliveira,male,${countryCodes[getRandomCountryCode(0, countryCodes.length - 1)]}\n`)
}

writeStream.end()

console.log(`generate ${nameFile}.csv`)

createReadStream(filePath, { encoding: 'utf-8' })
  .on('data', (chunk) => {
    const countryCode = chunk.toString().split('\n')
    for (const data of countryCode) {
      const code = data.split(',')
      console.log(code[code.length - 1])
    }
  })
  .on('error', (error) => {
    console.log(error)
  })
  .on('end', function () {
    console.log('read process finished')
  })
