module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
  },
  testMatch: [
    '**/__test__/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node',
  roots: [
    '<rootDir>/__test__/'
  ],
};
