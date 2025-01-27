/**
 * Common mock data generation utilities
 */
export const mockUtils = {
  /**
   * Generate a random date within a range
   */
  randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },
  /**
   * Generate a random ID
   */
  randomId(): string {
    return Math.random().toString(36).substring(2, 15);
  },
  /**
   * Generate random items from an array
   */
  randomItems<T>(items: T[], count: number): T[] {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
  /**
   * Generate a random amount between min and max
   */
  randomAmount(min: number, max: number, decimals = 2): number {
    const amount = Math.random() * (max - min) + min;
    return Number(amount.toFixed(decimals));
  },
  /**
   * Generate a random boolean with probability
   */
  randomBoolean(trueProbability = 0.5): boolean {
    return Math.random() < trueProbability;
  },
  /**
   * Generate a random item from an array
   */
  randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  },
  /**
   * Generate a random string of specified length
   */
  randomString(length: number): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }
};

export * from '../../../../../mockValidation';
export * from '../../../../../generators/base';