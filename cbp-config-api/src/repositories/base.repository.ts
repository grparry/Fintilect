import * as mssql from 'mssql';
import { executeQuery, executeStoredProcedure, withTransaction } from '@/config/database';
import { logger } from '@/config/logger';
import { IResult } from 'mssql';
import { Database } from '@/database';

export interface QueryOptions {
  transaction?: mssql.Transaction;
  timeout?: number;
}

export class BaseRepository {
  protected tableName: string;
  protected db: Database;

  constructor(tableName: string, db: Database) {
    this.tableName = tableName;
    this.db = db;
  }

  /**
   * Execute a stored procedure
   */
  protected async executeProc<T>(
    procedureName: string,
    params: { [key: string]: any } = {},
    options: QueryOptions = {}
  ): Promise<IResult<T>> {
    try {
      return await this.db.executeProc<T>(procedureName, params);
    } catch (error) {
      logger.error('Error executing stored procedure:', {
        procedure: procedureName,
        error
      });
      throw error;
    }
  }

  /**
   * Execute a parameterized query
   */
  protected async executeQuery<T>(
    query: string,
    params: { [key: string]: any } = {},
    options: QueryOptions = {}
  ): Promise<IResult<T>> {
    try {
      return await this.db.executeQuery<T>(query, params);
    } catch (error) {
      logger.error('Error executing query:', {
        query,
        error
      });
      throw error;
    }
  }

  /**
   * Execute a stored procedure within a transaction
   */
  protected async executeProcWithTransaction<T>(
    procedureName: string,
    params: { [key: string]: any } = {},
    options: QueryOptions = {}
  ): Promise<IResult<T>> {
    try {
      return await this.db.executeProcWithTransaction<T>(procedureName, params);
    } catch (error) {
      logger.error('Error executing stored procedure with transaction:', {
        procedure: procedureName,
        error
      });
      throw error;
    }
  }

  /**
   * Execute operations within a transaction
   */
  protected async withTransaction<T>(
    operation: (transaction: mssql.Transaction) => Promise<T>
  ): Promise<T> {
    return await withTransaction(operation);
  }

  /**
   * Build a WHERE clause from filters
   */
  protected buildWhereClause(
    filters: { [key: string]: any },
    startIndex: number = 0
  ): { whereClause: string; parameters: { [key: string]: any } } {
    const conditions: string[] = [];
    const parameters: { [key: string]: any } = {};

    Object.entries(filters).forEach(([key, value], index) => {
      const paramName = `p${startIndex + index}`;
      if (value !== undefined && value !== null) {
        conditions.push(`${key} = @${paramName}`);
        parameters[paramName] = value;
      } else {
        conditions.push(`${key} IS NULL`);
      }
    });

    return {
      whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
      parameters
    };
  }

  /**
   * Build pagination parameters
   */
  protected buildPaginationClause(
    page: number = 1,
    pageSize: number = 10
  ): string {
    const offset = (page - 1) * pageSize;
    return `OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
  }

  /**
   * Count total records with filters
   */
  protected async countRecords(
    filters: { [key: string]: any } = {},
    options: QueryOptions = {}
  ): Promise<number> {
    const { whereClause, parameters } = this.buildWhereClause(filters);
    const query = `
      SELECT COUNT(*) as total
      FROM ${this.tableName}
      ${whereClause}
    `;

    const result = await this.executeQuery<{ total: number }>(
      query,
      parameters,
      options
    );
    return result.rowsAffected[0] || 0;
  }
}
