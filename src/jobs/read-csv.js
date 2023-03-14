import { createReadStream } from 'fs'

const nameFile = 'data'
const filePath = `src/data/${nameFile}.csv`

const readCsv = (file = filePath) => createReadStream(file)

export default readCsv
