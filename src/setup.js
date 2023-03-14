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

const pipe = async ({ filePath, aggregateQuantity = 50 } = {}) => await pipelineStream(
  readCsv(filePath),
  transformCsvToJson(),
  aggregate(aggregateQuantity),
  getCountryName(),
  tranformStreamPrint(),
  saveOnCache()
).finally(() => io.quit())

export default pipe
