export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverageFrom: [
    '**/src/**/*.js'
  ],
  testMatch: [
    '**/src/**/*.test.js'
  ]
}
