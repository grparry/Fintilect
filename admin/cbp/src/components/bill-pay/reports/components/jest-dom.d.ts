// Type definitions for @testing-library/jest-dom
// This extends the Jest matchers with Testing Library's custom matchers

import '@testing-library/jest-dom';

declare global {
  // Declare Jest globals
  const describe: (name: string, fn: () => void) => void;
  const test: (name: string, fn: (done?: jest.DoneCallback) => any) => void;
  const it: typeof test;
  const expect: jest.Expect;
  const beforeAll: (fn: () => any) => void;
  const beforeEach: (fn: () => any) => void;
  const afterAll: (fn: () => any) => void;
  const afterEach: (fn: () => any) => void;
  
  // Declare jest object as a value with all necessary functions
  const jest: {
    fn: <T extends (...args: any[]) => any>(implementation?: T) => jest.Mock<ReturnType<T>, Parameters<T>>;
    spyOn: <T extends {}, M extends keyof T>(object: T, method: M) => jest.SpyInstance<T[M] extends (...args: any[]) => any ? ReturnType<T[M]> : T[M], T[M] extends (...args: any[]) => any ? Parameters<T[M]> : []>;
    mock: (moduleName: string, factory?: any) => jest.Mock;
    setTimeout: (timeout: number) => void;
    clearAllMocks: () => void;
    resetAllMocks: () => void;
    restoreAllMocks: () => void;
    advanceTimersByTime: (msToRun: number) => void;
    runAllTimers: () => void;
    useRealTimers: () => void;
    useFakeTimers: (options?: { now?: number }) => void;
    runOnlyPendingTimers: () => void;
    requireActual: <T = any>(moduleName: string) => T;
    requireMock: <T = any>(moduleName: string) => T;
    createMockFromModule: <T = any>(moduleName: string) => T;
    resetModules: () => void;
    isolateModules: (fn: () => void) => void;
    doMock: (moduleName: string, factory?: any) => void;
    dontMock: (moduleName: string) => void;
    setMock: <T>(moduleName: string, moduleExports: T) => void;
    genMockFromModule: <T>(moduleName: string) => T;
    mocked: <T>(item: T, deep?: boolean) => jest.Mocked<T>;
  };
  namespace jest {
    // Extend the Jest Matchers interface with Testing Library's custom matchers
    interface Matchers<R, T = {}> {
      toBeInTheDocument(): R;
      toBeEnabled(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveStyle(css: string | object): R;
      toBeDisabled(): R;
      toBeChecked(): R;
      toBeEmpty(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveFocus(): R;
      toHaveFormValues(values: { [name: string]: any }): R;
      toHaveValue(value: string | string[] | number): R;
      toBeEmptyDOMElement(): R;
    }
  }
}

// This is needed to make TypeScript happy
export {};
