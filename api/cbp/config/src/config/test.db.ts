import { Database } from '@cbp-config-api/db';
import { HttpError } from '@cbp-config-api/utils/errors';
import * as sql from 'mssql';
import { QueryResult } from 'pg';

interface MockPayment {
  id: number;
  amount: number;
  status: string;
  description: string;
  createdDate: Date;
  modifiedDate: Date;
  deletedDate?: Date;
}

// Mock database state
let mockPayments = [
  {
    id: 1,
    amount: 100,
    status: 'completed',
    description: 'Test payment 1',
    createdDate: new Date(),
    modifiedDate: new Date()
  },
  {
    id: 2,
    amount: 200,
    status: 'pending',
    description: 'Test payment 2',
    createdDate: new Date(),
    modifiedDate: new Date()
  }
];

let nextId = 3;

// Mock query handler
export const mockDBHandlers = {
  query: async (text: string, values?: any[]): Promise<QueryResult> => {
    const now = new Date();
    const baseResult: QueryResult = {
      command: '',
      oid: 0,
      fields: [],
      rows: [],
      rowCount: 0
    };

    // Handle SQL queries
    if (typeof text === 'string') {
      if (text.includes('GetPayments()')) {
        return { ...baseResult, rows: mockPayments, rowCount: mockPayments.length };
      }

      if (text.includes('GetPaymentDetails')) {
        const id = Number(values?.[0]);
        const payment = mockPayments.find(p => p.id === id);
        return { ...baseResult, rows: payment ? [payment] : [], rowCount: payment ? 1 : 0 };
      }

      if (text.includes('InsertPayment')) {
        const [amount, status, description] = values || [];
        const newPayment = {
          id: nextId++,
          amount,
          status,
          description,
          createdDate: now,
          modifiedDate: now
        };
        mockPayments.push(newPayment);
        return { ...baseResult, rows: [newPayment], rowCount: 1 };
      }

      if (text.includes('UpdatePayment')) {
        const [id, amount, status, description] = values || [];
        const payment = mockPayments.find(p => p.id === Number(id));
        if (!payment) {
          return { ...baseResult, rows: [], rowCount: 0 };
        }
        const updatedPayment = {
          ...payment,
          amount: amount !== undefined ? amount : payment.amount,
          status: status || payment.status,
          description: description || payment.description,
          modifiedDate: now
        };
        const index = mockPayments.findIndex(p => p.id === Number(id));
        mockPayments[index] = updatedPayment;
        return { ...baseResult, rows: [updatedPayment], rowCount: 1 };
      }

      if (text.includes('DeletePayment')) {
        const id = Number(values?.[0]);
        const index = mockPayments.findIndex(p => p.id === id);
        if (index === -1) {
          return { ...baseResult, rows: [{ success: false }], rowCount: 0 };
        }
        mockPayments.splice(index, 1);
        return { ...baseResult, rows: [{ success: true }], rowCount: 1 };
      }
    }

    return { ...baseResult, rows: [], rowCount: 0 };
  }
};

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

// Export mock handlers for use in tests
export class TestDatabase {
  private mockResponses: Map<string, (params: any) => Promise<any>>;
  protected log: (message: string, ...args: any[]) => void;

  constructor() {
    this.mockResponses = new Map();
    this.log = console.log;
    // Reset mock state
    mockPayments = [
      {
        id: 1,
        amount: 100,
        status: 'completed',
        description: 'Test payment 1',
        createdDate: new Date(),
        modifiedDate: new Date()
      },
      {
        id: 2,
        amount: 200,
        status: 'pending',
        description: 'Test payment 2',
        createdDate: new Date(),
        modifiedDate: new Date()
      }
    ];
    nextId = 3;

    // Register SQL query handlers
    this.mockResponses.set('SELECT * FROM GetPayments()', mockDBHandlers.query);
    this.mockResponses.set('SELECT * FROM GetPaymentDetails($1)', mockDBHandlers.query);
    this.mockResponses.set('SELECT * FROM InsertPayment($1, $2, $3)', mockDBHandlers.query);
    this.mockResponses.set('SELECT * FROM UpdatePayment($1, $2, $3, $4)', mockDBHandlers.query);
    this.mockResponses.set('SELECT * FROM DeletePayment($1)', mockDBHandlers.query);
  }

  setMockResponse(procName: string, handler: (params: any) => any) {
    this.mockResponses.set(procName, handler);
  }

  clearMockResponses() {
    this.mockResponses.clear();
  }

  async executeProc(procName: string, params?: any): Promise<any> {
    return this.executeProcedure(procName, params);
  }

  async executeProcedure(procName: string, params: any = {}): Promise<any> {
    this.log('Executing ' + procName + ' with params:', params);

    const handler = this.mockResponses.get(procName);
    if (!handler) {
      return {
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      };
    }

    const result = await handler(params);
    this.log('Result from ' + procName + ':', result);

    return result;
  }

  async connect(): Promise<void> {}
  
  async disconnect(): Promise<void> {}
  
  async close(): Promise<void> {}
  
  async beginTransaction(): Promise<void> {}
  
  async commitTransaction(): Promise<void> {}
  
  async rollbackTransaction(): Promise<void> {}
  
  async executeQuery(query: string, params?: any): Promise<any> {
    return this.executeProcedure(query, params);
  }
  
  async executeProcWithTransaction(procName: string, params?: any): Promise<any> {
    return this.executeProcedure(procName, params);
  }
  
  async executeStoredProcedure(procName: string, params?: any): Promise<any> {
    return this.executeProcedure(procName, params);
  }
}

export type TestDb = TestDatabase;
export const testDb = new TestDatabase();
