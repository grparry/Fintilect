export interface IDatabase {
  executeProc(procName: string, params: any): Promise<{ recordset: any[] }>;
  query(sql: string, params: any): Promise<{ recordset: any[] }>;
}
