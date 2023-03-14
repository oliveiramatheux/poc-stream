import { Writable } from 'stream'
import { io } from '../clients/index.js'

const save = async (chunk, callback) => {
  const pipeline = io.pipeline()
  for (const value of chunk) {
    pipeline.set(value.id, JSON.stringify(value, null, 2))
  }
  await pipeline.exec().catch(() => console.log('An error occured when save on redis'))

  callback()
}

const saveOnCache = () => new Writable({
  objectMode: true,
  write (chunk, _encoding, callback) {
    save(chunk, callback)
  }
})

export { saveOnCache }
