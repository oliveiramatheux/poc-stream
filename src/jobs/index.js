import readCsv from './read-csv.js'
import { getCountryName } from './getCountryName.js'

export {
  readCsv,
  getCountryName
}

// ler o arquivo
// percorrer o arquivo
// para cada linha pegar o country code
// fazer chamada para api https://restcountries.com/v3.1/alpha?codes={code} e pegar o name
// salvar no redis
