module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@model-generator/(.*)$': '<rootDir>/src/$1',
    '^@infrastructure/(.*)$': '<rootDir>../../infrastructure/src/$1',
    '^@logs/(.*)$': '<rootDir>../../logs/src/$1'
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts']
};
