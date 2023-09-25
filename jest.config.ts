/* eslint-disable @typescript-eslint/naming-convention */
import { type Config } from 'jest';

const config: Config = {
  verbose: true,
  rootDir: './src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFiles: ['<rootDir>../.jest/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '^@test(.*)$': '<rootDir>../test$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
