import transformCsvToJson from 'csv-parser'
import { pipeline, Transform } from 'stream'
import { promisify } from 'util'
import { readCsv, getCountryName, aggregate, saveOnCache } from './jobs/index.js'
import { io } from './clients/index.js'

const pipelineStream = promisify(pipeline)

const tranformStreamPrint = () => new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    console.log(chunk)
    callback(null, chunk)
  }
})

await pipelineStream(
  readCsv,
  transformCsvToJson(),
  aggregate(50),
  getCountryName(),
  tranformStreamPrint(),
  saveOnCache
).finally(() => io.quit())
