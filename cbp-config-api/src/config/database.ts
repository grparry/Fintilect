import * as mssql from 'mssql';
import { logger } from '@/logger';

// SQL Server configuration
export const sqlConfig: mssql.config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_HOST || '10.214.40.150',
  port: parseInt(process.env.DB_PORT || '1433'),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,  // Disabled for local network SQL Server
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

// Global connection pool
let pool: mssql.ConnectionPool | null = null;

export async function getConnection(): Promise<mssql.ConnectionPool> {
  try {
    if (pool) {
      return pool;
    }

    pool = await new mssql.ConnectionPool(sqlConfig).connect();
    logger.info('Database connection pool created');
    
    pool.on('error', (err) => {
      logger.error('Database pool error:', err);
      pool = null;
    });

    return pool;
  } catch (error) {
    logger.error('Error creating database connection:', error);
    throw error;
  }
}

export async function closeConnection(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      logger.info('Database connection pool closed');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
}

// Utility function for parameterized queries
export async function executeQuery<T>(
  query: string,
  params: { [key: string]: any } = {},
  transaction?: mssql.Transaction
): Promise<T[]> {
  const conn = await getConnection();
  const request = transaction ? transaction.request() : conn.request();

  try {
    // Add parameters to request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    logger.error('Error executing query:', { query, params, error });
    throw error;
  }
}

// Utility function for stored procedures
export async function executeStoredProcedure<T>(
  procedureName: string,
  params: { [key: string]: any } = {},
  transaction?: mssql.Transaction
): Promise<T[]> {
  const conn = await getConnection();
  const request = transaction ? transaction.request() : conn.request();

  try {
    // Add parameters to request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.execute(procedureName);
    return result.recordset;
  } catch (error) {
    logger.error('Error executing stored procedure:', { procedureName, params, error });
    throw error;
  }
}

// Transaction management
export async function withTransaction<T>(
  operation: (transaction: mssql.Transaction) => Promise<T>
): Promise<T> {
  const conn = await getConnection();
  const transaction = new mssql.Transaction(conn);

  try {
    await transaction.begin();
    const result = await operation(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
