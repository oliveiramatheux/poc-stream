import { pipeline, Transform } from 'stream'
import { promisify } from 'util'
import { readCsv } from './jobs/index.js'

const pipelineStream = promisify(pipeline)

const tranformStreamSplitByLine = () => new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    for (const line of chunk.toString().split('\n')) {
      this.push(line)
    }
    callback()
  }
})

const tranformStreamMappedObject = () => {
  const transform = new Transform({
    objectMode: true,
    transform (chunk, _encoding, callback) {
      if (this.count === 0) {
        this.count += 1
        return callback()
      }
      callback(null, {
        id: chunk.split(',')[0]
      })
    }
  })
  transform.count = 0
  return transform
}

const tranformStreamPrint = () => new Transform({
  objectMode: true,
  transform (chunk, _encoding, callback) {
    console.log(chunk)
    callback()
  }
})

await pipelineStream(
  readCsv,
  tranformStreamSplitByLine(),
  tranformStreamMappedObject(),
  tranformStreamPrint()
)
