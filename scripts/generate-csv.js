import { readFileSync, createWriteStream } from 'fs'
import { getRandomCountryCode } from '../src/utils/utils.js'
import { faker } from '@faker-js/faker'

// https://restcountries.com/ api for get country code
// https://www.mockaroo.com/ site for generate biggest mocks

const countryCodes = JSON.parse(readFileSync('src/data/codes.json'))

const totalLines = process.argv[2] || 100
const nameFile = 'data'
const filePath = `src/data/${nameFile}.csv`

const writeStream = createWriteStream(filePath)

writeStream.write('id,first_name,last_name,gender,country_code\n')

for (let index = 0; index < totalLines; index++) {
  writeStream.write(`${index + 1},${faker.name.firstName()},${faker.name.lastName()},${faker.name.sex()},${countryCodes[getRandomCountryCode(0, countryCodes.length - 1)]}\n`)
}

writeStream.end()

console.log(`Generate ${nameFile}.csv`)
