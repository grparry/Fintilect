import { IResult, IRecordSet, Table, IColumnMetadata, ISqlType, ISqlTypeFactoryWithLength, ISqlTypeFactoryWithNoParams, TYPES } from 'mssql';
import { Database } from '@/../database';

interface MockParams {
  PayeeId?: string;
  PaymentId?: string;
  ClientId?: string;
  UserId?: string;
  Status?: string;
  Type?: string;
  Page?: number;
  PageSize?: number;
  Settings?: any;
  StartDate?: string;
  EndDate?: string;
  Currency?: string;
  Amount?: number;
  PaymentDate?: string;
  EffectiveDate?: string;
  PaymentType?: string;
  PaymentMethod?: string;
  PaymentStatus?: string;
  PaymentReference?: string;
  PaymentDescription?: string;
  PaymentNotes?: string;
  PaymentMetadata?: any;
  PaymentTags?: string[];
  PaymentCategory?: string;
}

export class MockRecordSet<T> extends Array<T> implements IRecordSet<T> {
  private _columns: IColumnMetadata;
  public caseSensitive: boolean;
  public identity: boolean;
  public readOnly: boolean;

  constructor(data: T[]) {
    super();
    // Push all items into the array
    if (Array.isArray(data)) {
      data.forEach(item => this.push(item));
    }
    this._columns = this.generateColumnMetadata(this[0] || {} as T);
    this.caseSensitive = false;
    this.identity = false;
    this.readOnly = false;
  }

  get columns(): IColumnMetadata {
    return this._columns;
  }

  private generateColumnMetadata(sample: T): IColumnMetadata {
    const metadata: IColumnMetadata = {};
    
    // Handle null, undefined, or non-object cases
    if (!sample || typeof sample !== 'object' || Array.isArray(sample)) {
      return metadata;
    }

    // Now TypeScript knows sample is a non-null object
    Object.entries(sample as object).forEach(([key, value], index) => {
      metadata[key] = {
        index,
        name: key,
        length: 255, // Default length for most fields
        type: this.getSqlType(value),
        nullable: true,
        caseSensitive: false,
        identity: false,
        readOnly: false
      };
    });
    return metadata;
  }

  private getSqlType(value: T[keyof T] | null): ISqlType | ISqlTypeFactoryWithLength | ISqlTypeFactoryWithNoParams {
    if (value === null || value === undefined) return TYPES.NVarChar(4000);
    
    if (typeof value === 'object') {
      if (value instanceof Date) return TYPES.DateTime;
      return TYPES.NVarChar(4000);
    }
    
    switch (typeof value) {
      case 'string':
        return TYPES.NVarChar(4000);
      case 'number':
        return Number.isInteger(value) ? TYPES.Int : TYPES.Float;
      case 'boolean':
        return TYPES.Bit;
      default:
        return TYPES.NVarChar(4000);
    }
  }

  toTable(): Table {
    const table = new Table();
    // Add columns based on the first row
    if (this.length > 0) {
      const firstRow = this[0];
      if (firstRow && typeof firstRow === 'object' && firstRow !== null) {
        Object.keys(firstRow as object).forEach(key => {
          table.columns.add(key, this._columns[key]?.type || TYPES.NVarChar);
        });
      }
    }
    return table;
  }
}

export class MockDatabase implements Database {
  private mockResults: Map<string, any> = new Map();

  constructor() {
    this.mockResults = new Map();
  }

  setMockResult<T>(procName: string, result: T): void {
    this.mockResults.set(procName, result);
  }

  async executeProc<T>(procName: string, params?: Record<string, any>): Promise<IResult<T>> {
    const result = this.mockResults.get(procName) as T;
    return this.createMockResult(result);
  }

  async executeProcWithTransaction<T>(procName: string, params?: MockParams): Promise<IResult<T>> {
    return this.executeProc<T>(procName, params);
  }

  async executeStoredProcedure<T>(procedureName: string, params: Record<string, any> = {}): Promise<IResult<T>> {
    const result = this.mockResults.get(procedureName) as T;
    return this.createMockResult(result);
  }

  async executeQuery(query: string, params: Record<string, any> = {}): Promise<IResult<any>> {
    // For now, just return an empty result
    return this.createMockResult([]);
  }

  async connect(): Promise<void> {
    return Promise.resolve();
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  async beginTransaction(): Promise<void> {
    return Promise.resolve();
  }

  async commitTransaction(): Promise<void> {
    return Promise.resolve();
  }

  async rollbackTransaction(): Promise<void> {
    return Promise.resolve();
  }

  reset(initialData?: Record<string, any>): void {
    this.mockResults.clear();
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        this.setMockResult(key, value);
      });
    }
  }

  private createMockResult(data: any): IResult<any> {
    if (!data) {
      return {
        recordset: new MockRecordSet([]),
        recordsets: [new MockRecordSet([])],
        rowsAffected: [0],
        output: {},
      };
    }

    const recordset = new MockRecordSet(Array.isArray(data) ? data : [data]);
    return {
      recordset,
      recordsets: [recordset],
      rowsAffected: [Array.isArray(data) ? data.length : 1],
      output: {},
    };
  }
}

describe('MockDb', () => {
  it.todo('should initialize database connection');
  it.todo('should handle stored procedures');
  it.todo('should manage transactions');
});
