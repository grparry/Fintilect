import dotenv from 'dotenv';
import { TestContext } from './integration/context/TestContext';

// Load environment variables from .env.test if it exists, otherwise from .env
dotenv.config({ path: '.env.test' });

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Increase test timeout for slower integration tests
jest.setTimeout(30000);

// Ensure each test starts with a clean state
beforeEach(async () => {
  await TestContext.setup();
});

// Clean up after each test
afterEach(async () => {
  await TestContext.cleanup();
});

// Global error handler for unhandled promises
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Promise Rejection:', error);
  process.exit(1);
});

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

// Mock logger to prevent console noise during tests
jest.mock('../config/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

// Clean up after all tests
afterAll(async () => {
  // Add any cleanup logic here
});

describe('Test Setup', () => {
  it.todo('should initialize test environment');
  it.todo('should configure global test settings');
  it.todo('should handle test teardown');
});
