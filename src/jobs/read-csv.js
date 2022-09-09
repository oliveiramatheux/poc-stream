import { createReadStream } from 'fs'

const nameFile = 'data'
const filePath = `src/data/${nameFile}.csv`

export default createReadStream(filePath)
