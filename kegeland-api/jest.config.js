module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  clearMocks: true,
  cacheDirectory: '.jest/cache',
  collectCoverageFrom: ['src/**/*.(t|j)s', '!**/node_modules/**'],
  testEnvironment: 'node',
};
