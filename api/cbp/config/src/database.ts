import { IResult } from 'mssql';

export interface Database {
  executeProc<T>(procedureName: string, params?: Record<string, any>): Promise<IResult<T>>;
  executeProcWithTransaction<T>(procedureName: string, params?: Record<string, any>): Promise<IResult<T>>;
  executeStoredProcedure<T>(procedureName: string, params?: Record<string, any>): Promise<IResult<T>>;
  executeQuery<T>(query: string, params?: Record<string, any>): Promise<IResult<T>>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
