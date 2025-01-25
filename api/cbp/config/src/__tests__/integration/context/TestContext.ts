import { TestDatabase } from '../../../../src/config/test.db';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../../../src/config/logger';

interface MockCall {
  params: any;
  result: any;
  timestamp: Date;
}

interface MockHistory {
  calls: MockCall[];
  totalCalls: number;
}

export class TestContext {
  private static currentContext: TestContext;
  private db: TestDatabase;
  private testId: string;
  private mocks: Map<string, any>;
  private mockCalls: Map<string, MockHistory>;
  private cleanupTasks: (() => Promise<void>)[];

  private constructor() {
    this.db = new TestDatabase();
    this.testId = uuidv4();
    this.mocks = new Map();
    this.mockCalls = new Map();
    this.cleanupTasks = [];
    this.trackMockCalls();
  }

  static async setup(): Promise<void> {
    // Create a new context for each test
    TestContext.currentContext = new TestContext();
    const context = TestContext.currentContext;

    // Initialize test database
    await context.initialize();

    logger.info('Test context setup completed', { testId: context.testId });
  }

  async initialize(): Promise<void> {
    // Any additional initialization if needed
  }

  static async cleanup(): Promise<void> {
    const context = TestContext.currentContext;
    if (!context) {
      logger.warn('No test context to clean up');
      return;
    }

    try {
      // Execute cleanup tasks in reverse order
      for (const task of context.cleanupTasks.reverse()) {
        try {
          await task();
        } catch (error) {
          logger.error('Cleanup task failed:', { error, stack: (error as Error).stack });
        }
      }

      // Clear all mocks
      context.mocks.clear();
      context.mockCalls.clear();

      await context.cleanup();

      // Clear the current context
      TestContext.currentContext = null as any;

      logger.info('Test context cleanup completed', { testId: context.testId });
    } catch (error) {
      logger.error('Test context cleanup failed:', { 
        error, 
        stack: (error as Error).stack,
        testId: context.testId 
      });
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    await this.db.close();
  }

  static getTestDatabase(): TestDatabase {
    const context = TestContext.currentContext;
    if (!context?.db) {
      throw new Error('TestDatabase not initialized. Call setup() first.');
    }
    return context.db;
  }

  static getTestId(): string {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    return context.testId;
  }

  static setMock(key: string, value: any): void {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    context.mocks.set(key, value);
  }

  static getMock(key: string): any {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    return context.mocks.get(key);
  }

  static clearMock(key: string): void {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    context.mocks.delete(key);
  }

  static isolateTest(name: string): string {
    return `${name}_${TestContext.getTestId()}`;
  }

  static addCleanupTask(task: () => Promise<void>): void {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    context.cleanupTasks.push(task);
  }

  private trackMockCalls() {
    const db = this.db;
    if (!db) {
      throw new Error('TestDatabase not initialized');
    }

    const originalExecuteProc = db.executeProc;
    db.executeProc = async (procName: string, params?: any) => {
      const result = await originalExecuteProc.call(db, procName, params);
      this.recordMockCall(procName, params, result);
      return result;
    };
  }

  private recordMockCall(procName: string, params: any, result: any) {
    const history = this.mockCalls.get(procName) || { calls: [], totalCalls: 0 };
    history.calls.push({
      params,
      result,
      timestamp: new Date()
    });
    history.totalCalls++;
    this.mockCalls.set(procName, history);
  }

  static verifyMockCalls(procName: string, expectedCalls: number): void {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }

    const history = context.mockCalls.get(procName);
    const actualCalls = history?.totalCalls || 0;
    
    if (actualCalls !== expectedCalls) {
      const details = history?.calls.map(call => ({
        params: call.params,
        timestamp: call.timestamp
      }));
      
      throw new Error(
        `Mock verification failed for ${procName}:\n` +
        `Expected ${expectedCalls} calls, but got ${actualCalls}\n` +
        `Call history: ${JSON.stringify(details, null, 2)}`
      );
    }
  }

  static getMockCallCount(procName: string): number {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    return context.mockCalls.get(procName)?.totalCalls || 0;
  }

  static getMockCallHistory(procName: string): MockCall[] {
    const context = TestContext.currentContext;
    if (!context) {
      throw new Error('Test context not initialized. Call setup() first.');
    }
    return context.mockCalls.get(procName)?.calls || [];
  }
}

describe('TestContext', () => {
  it.todo('should initialize correctly');
  it.todo('should handle mock responses');
  it.todo('should track mock calls');
  it.todo('should manage cleanup tasks');
});
