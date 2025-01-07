import { PaginatedResponse } from '../../../types/common';

export class ResponseValidator {
  static validateArrayResponse<T>(response: T[], expectedLength?: number) {
    expect(Array.isArray(response)).toBe(true);
    if (expectedLength !== undefined) {
      expect(response).toHaveLength(expectedLength);
    }
    return response;
  }

  static validateSingletonResponse<T>(response: T | null, expectNull = false) {
    if (expectNull) {
      expect(response).toBeNull();
    } else {
      expect(response).not.toBeNull();
    }
    return response;
  }

  static validateVoidResponse(response: void) {
    expect(response).toBeUndefined();
  }

  static validatePaginatedResponse<T>(
    response: PaginatedResponse<T>,
    expectedPage: number,
    expectedPageSize: number,
    expectedTotal?: number
  ) {
    expect(response).toHaveProperty('data');
    expect(Array.isArray(response.data)).toBe(true);
    expect(response).toHaveProperty('pagination');
    expect(response.pagination).toHaveProperty('page', expectedPage);
    expect(response.pagination).toHaveProperty('limit', expectedPageSize);
    if (expectedTotal !== undefined) {
      expect(response.pagination).toHaveProperty('total', expectedTotal);
    }
    return response;
  }

  static validateErrorResponse(error: any, expectedStatus: number, expectedMessage?: string) {
    expect(error).toHaveProperty('status', expectedStatus);
    if (expectedMessage) {
      expect(error).toHaveProperty('message', expectedMessage);
    }
  }
}
