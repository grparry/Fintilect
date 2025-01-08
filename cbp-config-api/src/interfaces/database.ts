export interface DatabaseService {
  query<T>(query: string, params?: Record<string, any>): Promise<{
    recordset: T[];
    recordsets: T[][];
    rowsAffected: number[];
    output?: Record<string, any>;
  }>;
  executeProc<T>(procedureName: string, params?: Record<string, any>): Promise<{
    recordset: T[];
    recordsets: T[][];
    rowsAffected: number[];
    output?: Record<string, any>;
  }>;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
