const getRandomCountryCode = (minRange, maxRange) => {
  const min = Math.ceil(minRange)
  const max = Math.floor(maxRange)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export {
  getRandomCountryCode
}
