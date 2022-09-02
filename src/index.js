import { readFileSync } from 'fs'

// import myJson from '../codes.json' assert {type: 'json'};

// https://restcountries.com/ api for get country code
// https://www.mockaroo.com/ site for generate biggest mocks

JSON.parse(readFileSync('./package.json'))

const { v4: uuidv4 } = require('uuid')
const { createWriteStream } = require('fs')

const totalLines = process.argv[2] || 10
const nameFile = process.argv[3] || 'csv-teste'

const writeStream = createWriteStream(`./${nameFile}.csv`)

writeStream.write('id\n')

for (let index = 0; index < totalLines; index++) {
  writeStream.write(`${uuidv4()}\n`)
}

writeStream.end()

console.log(`generate ${nameFile}.csv`)
