import sql from 'mssql';
import { logger } from '@cbp-config-api/logger';

export interface Database {
  executeProc<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeProcWithTransaction<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeStoredProcedure<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeQuery<T = any>(query: string, params?: any): Promise<sql.IResult<T>>;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  close(): Promise<void>;
}

class SQLDatabase implements Database {
  private pool: sql.ConnectionPool | null = null;
  private config: sql.config;
  private transaction: sql.Transaction | null = null;

  constructor() {
    this.config = {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      server: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433'),
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
      }
    };
  }

  async connect(): Promise<void> {
    try {
      if (!this.pool) {
        this.pool = await new sql.ConnectionPool(this.config).connect();
        logger.info('Connected to database');
      }
    } catch (error) {
      logger.error('Database connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.close();
  }

  async close(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        logger.info('Database connection closed');
      }
    } catch (error) {
      logger.error('Error closing database connection:', error);
      throw error;
    }
  }

  async beginTransaction(): Promise<void> {
    if (!this.pool) {
      throw new Error('Database connection not initialized');
    }
    this.transaction = new sql.Transaction(this.pool);
    await this.transaction.begin();
  }

  async commitTransaction(): Promise<void> {
    if (!this.transaction) {
      throw new Error('No active transaction');
    }
    await this.transaction.commit();
    this.transaction = null;
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.transaction) {
      throw new Error('No active transaction');
    }
    await this.transaction.rollback();
    this.transaction = null;
  }

  async executeProc<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>> {
    if (!this.pool) {
      throw new Error('Database connection not initialized');
    }

    const request = this.transaction ? this.transaction.request() : this.pool.request();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          request.input(key, value);
        }
      });
    }

    try {
      return await request.execute<T>(procName);
    } catch (error) {
      logger.error(`Error executing stored procedure ${procName}:`, error);
      throw error;
    }
  }

  async executeProcWithTransaction<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>> {
    await this.beginTransaction();
    try {
      const result = await this.executeProc<T>(procName, params);
      await this.commitTransaction();
      return result;
    } catch (error) {
      await this.rollbackTransaction();
      throw error;
    }
  }

  async executeStoredProcedure<T = any>(procName: string, params?: any): Promise<sql.IProcedureResult<T>> {
    return this.executeProc<T>(procName, params);
  }

  async executeQuery<T = any>(query: string, params?: any): Promise<sql.IResult<T>> {
    if (!this.pool) {
      throw new Error('Database connection not initialized');
    }

    const request = this.transaction ? this.transaction.request() : this.pool.request();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          request.input(key, value);
        }
      });
    }

    try {
      return await request.query<T>(query);
    } catch (error) {
      logger.error('Error executing query:', error);
      throw error;
    }
  }
}

export const db = process.env.NODE_ENV === 'test' 
  ? require('./test.db').testDb 
  : new SQLDatabase();
