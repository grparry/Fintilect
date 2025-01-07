import { testDb } from '../../../config/test.db';
import { setupTestDb, cleanupTestDb } from '../helpers';
import { logger } from '../../../config/logger';

export class TestContext {
  private static instance: TestContext;
  private mockCalls: Map<string, number> = new Map();
  
  private constructor() {}
  
  static getInstance(): TestContext {
    if (!TestContext.instance) {
      TestContext.instance = new TestContext();
    }
    return TestContext.instance;
  }

  async setup() {
    try {
      await setupTestDb();
      this.mockCalls.clear();
      this.trackMockCalls();
    } catch (error) {
      logger.error('Failed to setup test context:', error);
      throw error;
    }
  }

  async teardown() {
    try {
      await cleanupTestDb();
      this.mockCalls.clear();
    } catch (error) {
      logger.error('Failed to teardown test context:', error);
      throw error;
    }
  }

  private trackMockCalls() {
    const originalSetMockResponse = testDb.setMockResponse;
    testDb.setMockResponse = (procName: string, handler: (params: any) => any) => {
      const wrappedHandler = (params: any) => {
        this.incrementMockCall(procName);
        return handler(params);
      };
      return originalSetMockResponse.call(testDb, procName, wrappedHandler);
    };
  }

  private incrementMockCall(procName: string) {
    const currentCount = this.mockCalls.get(procName) || 0;
    this.mockCalls.set(procName, currentCount + 1);
  }

  verifyMockCalls(procName: string, expectedCalls: number) {
    const actualCalls = this.mockCalls.get(procName) || 0;
    if (actualCalls !== expectedCalls) {
      throw new Error(`Expected ${expectedCalls} calls to ${procName}, but got ${actualCalls}`);
    }
  }

  getMockCallCount(procName: string): number {
    return this.mockCalls.get(procName) || 0;
  }
}
