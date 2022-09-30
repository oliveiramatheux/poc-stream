import transformCsvToJson from 'csv-parser'
import { pipeline, Transform } from 'stream'
import { promisify } from 'util'
import { readCsv, getCountryName, aggregate } from './jobs/index.js'

const pipelineStream = promisify(pipeline)

const tranformStreamPrint = () => new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    console.log(chunk)
    callback()
  }
})

await pipelineStream(
  readCsv,
  transformCsvToJson(),
  aggregate(10),
  getCountryName,
  tranformStreamPrint()
)
