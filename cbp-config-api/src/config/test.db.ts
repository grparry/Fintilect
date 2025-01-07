import { Database } from './db';
import { HttpError } from '../utils/errors';
import * as sql from 'mssql';

export class TestRecordSet<T extends Record<string, any>> extends Array<T> implements sql.IRecordSet<T> {
  columns: sql.IColumnMetadata;

  constructor(items: T[]) {
    super(...items);
    Object.setPrototypeOf(this, TestRecordSet.prototype);
    this.columns = this.generateColumns(items[0]);
  }

  toTable(): sql.Table {
    const table = new sql.Table('TestTable');
    for (const [key, metadata] of Object.entries(this.columns)) {
      table.columns.add(key, metadata.type, { nullable: metadata.nullable });
    }
    this.forEach(row => {
      const values: any[] = [];
      for (const key of Object.keys(this.columns)) {
        values.push(row[key]);
      }
      table.rows.push(values);
    });
    return table;
  }

  private generateColumns(item: T | undefined): sql.IColumnMetadata {
    if (!item) return {};
    const columns: sql.IColumnMetadata = {};
    Object.keys(item).forEach((key, index) => {
      columns[key] = {
        index,
        name: key,
        length: 255,
        type: this.getSqlType(item[key]),
        nullable: true,
        caseSensitive: true,
        identity: false,
        readOnly: false
      };
    });
    return columns;
  }

  private getSqlType(value: any): sql.ISqlType {
    if (typeof value === 'number') {
      return sql.Int();
    }
    if (typeof value === 'boolean') {
      return sql.Bit();
    }
    if (value instanceof Date) {
      return sql.DateTime();
    }
    return sql.VarChar(255);
  }
}

export class TestDb implements Database {
  private mockResponses: Map<string, (params: any) => any>;

  constructor() {
    this.mockResponses = new Map();
  }

  setMockResponse(procName: string, handler: (params: any) => any) {
    this.mockResponses.set(procName, handler);
  }

  clearMockResponses() {
    this.mockResponses.clear();
  }

  async executeProc(procName: string, params: any = {}): Promise<any> {
    const handler = this.mockResponses.get(procName);
    if (!handler) {
      return { recordset: new TestRecordSet([]) };
    }

    try {
      const result = handler(params);
      if (!result) {
        return { recordset: new TestRecordSet([]) };
      }

      // Handle errors
      if (result instanceof Error) {
        throw result;
      }

      // If the result is already in the correct format, return it
      if (result && typeof result === 'object' && 'recordset' in result) {
        if (Array.isArray(result.recordset)) {
          result.recordset = new TestRecordSet(result.recordset);
          return result;
        }
        return { recordset: new TestRecordSet([result.recordset]) };
      }

      // If the result is an array, wrap it in a recordset
      if (Array.isArray(result)) {
        return { recordset: new TestRecordSet(result) };
      }

      // If it's a single object, wrap it in an array and then in a recordset
      return { recordset: new TestRecordSet([result]) };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      if (error instanceof Error) {
        // Convert validation errors to 400 Bad Request
        if (error.message.includes('Invalid') || error.message.includes('Missing')) {
          throw new HttpError(400, error.message);
        }
        // Convert not found errors to 404 Not Found
        if (error.message.includes('not found')) {
          throw new HttpError(404, error.message);
        }
        // All other errors are internal server errors
        throw new HttpError(500, error.message);
      }
      throw new HttpError(500, 'Database error');
    }
  }

  async connect(): Promise<void> {
    // No-op for test db
  }

  async disconnect(): Promise<void> {
    // No-op for test db
  }

  async executeQuery(query: string, params: any = {}): Promise<any> {
    return this.executeProc(query, params);
  }

  async executeProcWithTransaction(procName: string, params: any = {}): Promise<any> {
    return this.executeProc(procName, params);
  }

  async executeStoredProcedure(procName: string, params: any = {}): Promise<any> {
    return this.executeProc(procName, params);
  }

  async beginTransaction(): Promise<void> {}
  async commitTransaction(): Promise<void> {}
  async rollbackTransaction(): Promise<void> {}
  async close(): Promise<void> {}
}

export const testDb = new TestDb();
