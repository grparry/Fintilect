import * as mssql from 'mssql';
import { executeQuery, executeStoredProcedure, withTransaction } from '../config/database';
import { logger } from '../config/logger';

export interface QueryOptions {
  transaction?: mssql.Transaction;
  timeout?: number;
}

export class BaseRepository {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Execute a stored procedure
   */
  protected async callProcedure<T>(
    procedureName: string,
    params: { [key: string]: any } = {},
    options: QueryOptions = {}
  ): Promise<T[]> {
    try {
      return await executeStoredProcedure<T>(
        procedureName,
        params,
        options.transaction
      );
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
  ): Promise<T[]> {
    try {
      return await executeQuery<T>(
        query,
        params,
        options.transaction
      );
    } catch (error) {
      logger.error('Error executing query:', {
        query,
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
    return result[0]?.total || 0;
  }
}
