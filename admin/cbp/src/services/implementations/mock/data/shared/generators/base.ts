/**
 * Base class for mock data generators
 */
export abstract class BaseMockGenerator<T> {
  protected constructor(protected readonly options?: Record<string, any>) {}

  /**
   * Generate a single mock data item
   */
  abstract generate(): T;

  /**
   * Generate multiple mock data items
   * @param count Number of items to generate
   */
  generateMany(count: number): T[] {
    return Array.from({ length: count }, () => this.generate());
  }

  /**
   * Generate a paginated result
   * @param page Page number
   * @param limit Items per page
   */
  generatePaginated(page: number, limit: number): {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  } {
    const total = Math.floor(Math.random() * 100) + limit;
    const pages = Math.ceil(total / limit);
    const items = this.generateMany(Math.min(limit, total - (page - 1) * limit));

    return {
      items,
      total,
      page,
      limit,
      pages,
    };
  }

  /**
   * Generate data with a specific seed for consistency
   * @param seed Seed value
   */
  protected getRandomWithSeed(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) / 0x7fffffff;
  }
}
