import { Transform } from 'stream'

const aggregate = (quantity = 3) => {
  const transform = new Transform({
    objectMode: true,
    transform (chunk, _encoding, callback) {
      this.list.push(chunk)
      if (this.list.length === quantity) {
        const chunkGroup = [...this.list]
        this.list = []
        this.push(chunkGroup)
      }
      callback(null)
    },
    final (callback) {
      if (this.list.length) this.push(this.list)
      callback(null)
    }
  })
  transform.list = []
  return transform
}

export { aggregate }
