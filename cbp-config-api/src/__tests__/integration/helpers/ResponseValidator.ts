import { PaginatedResponse, SqlResponse, ValidationError } from '../../../types/common';

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
    expect(response.pagination).toHaveProperty('pageSize', expectedPageSize);
    if (expectedTotal !== undefined) {
      expect(response.pagination).toHaveProperty('total', expectedTotal);
    }
    return response;
  }

  static validateSqlResponse<T>(
    response: SqlResponse<T>,
    expectedRowCount?: number
  ) {
    expect(response).toHaveProperty('recordset');
    expect(Array.isArray(response.recordset)).toBe(true);
    expect(response).toHaveProperty('recordsets');
    expect(Array.isArray(response.recordsets)).toBe(true);
    expect(response).toHaveProperty('rowsAffected');
    expect(Array.isArray(response.rowsAffected)).toBe(true);
    
    if (expectedRowCount !== undefined) {
      expect(response.recordset).toHaveLength(expectedRowCount);
      expect(response.rowsAffected[0]).toBe(expectedRowCount);
    }
    return response;
  }

  static validateErrorResponse(
    error: any, 
    expectedStatus: number, 
    expectedMessage?: string,
    expectedValidationErrors?: ValidationError[]
  ) {
    expect(error).toHaveProperty('status', expectedStatus);
    if (expectedMessage) {
      expect(error).toHaveProperty('message', expectedMessage);
    }
    if (expectedValidationErrors) {
      expect(error).toHaveProperty('details');
      expect(Array.isArray(error.details)).toBe(true);
      expect(error.details).toHaveLength(expectedValidationErrors.length);
      
      expectedValidationErrors.forEach((expectedError, index) => {
        expect(error.details[index]).toHaveProperty('field', expectedError.field);
        expect(error.details[index]).toHaveProperty('message', expectedError.message);
      });
    }
  }

  static validateTimestamps<T extends Record<string, any>>(
    record: T,
    fields: Array<'createdDate' | 'modifiedDate' | 'deletedDate' | 'deactivatedDate'>
  ) {
    fields.forEach(field => {
      if (record[field]) {
        expect(record[field]).toBeInstanceOf(Date);
      }
    });
    return record;
  }

  static validateRequiredFields<T extends Record<string, any>>(
    record: T,
    requiredFields: Array<keyof T>
  ) {
    requiredFields.forEach(field => {
      expect(record).toHaveProperty(String(field));
      expect(record[field]).not.toBeNull();
      expect(record[field]).not.toBeUndefined();
    });
  }
}

describe('ResponseValidator', () => {
  it.todo('should validate response structure');
  it.todo('should validate response data types');
  it.todo('should handle invalid responses');
});
