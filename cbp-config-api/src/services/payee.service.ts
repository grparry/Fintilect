import * as sql from 'mssql';
import { Database } from '../config/db';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

interface PayeeRecord {
  PayeeId: string;
  Name: string;
  AccountNumber: string;
  Status: string;
  CreatedBy?: string;
  CreatedDate?: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
}

interface PayeeCreateData {
  name: string;
  accountNumber: string;
  status?: string;
}

interface PayeeUpdateData {
  name?: string;
  accountNumber?: string;
  status?: string;
}

interface PayeePaymentCheck {
  hasPayments: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export class PayeeService extends BaseRepository {
  constructor(db: Database) {
    super('payees', db);
  }

  async listPayees(page = 1, pageSize = 10): Promise<PaginatedResponse<PayeeRecord>> {
    try {
      const result = await this.db.executeProc<PayeeRecord & { TotalCount: number }>('PAYEE', {
        page,
        pageSize
      });
      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }

      const total = result.recordset[0]?.TotalCount || 0;
      const totalPages = Math.ceil(total / pageSize);

      return {
        data: result.recordset,
        pagination: {
          total,
          page,
          pageSize,
          totalPages
        }
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error listing payees:', error);
      throw new HttpError(500, 'Failed to list payees');
    }
  }

  async getPayee(id: string): Promise<PayeeRecord> {
    try {
      const result = await this.db.executeProc<PayeeRecord>('PAYEE_GET', { id });
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Payee not found');
      }
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting payee ${id}:`, error);
      throw new HttpError(500, 'Failed to get payee');
    }
  }

  async createPayee(data: PayeeCreateData): Promise<PayeeRecord> {
    try {
      const result = await this.db.executeProc<PayeeRecord>('PAYEE_CREATE', {
        Name: data.name,
        AccountNumber: data.accountNumber,
        Status: data.status || 'ACTIVE',
        CreatedBy: 'system',
        CreatedDate: new Date()
      });

      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(500, 'Failed to create payee');
      }

      return result.recordset[0];
    } catch (error) {
      logger.error('Error creating payee:', error);
      throw new HttpError(500, 'Failed to create payee');
    }
  }

  async updatePayee(id: string, data: PayeeUpdateData): Promise<PayeeRecord> {
    try {
      const result = await this.db.executeProc<PayeeRecord>('PAYEE_UPDATE', {
        id,
        Name: data.name,
        AccountNumber: data.accountNumber,
        Status: data.status,
        ModifiedBy: 'system',
        ModifiedDate: new Date()
      });

      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Payee not found');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error updating payee ${id}:`, error);
      throw new HttpError(500, 'Failed to update payee');
    }
  }

  async deletePayee(id: string): Promise<void> {
    try {
      // First check if payee has any payments
      const paymentCheck = await this.db.executeProc<PayeePaymentCheck>('PAYEE_CHECK_PAYMENTS', { id });
      if (paymentCheck.recordset?.[0]?.hasPayments) {
        throw new HttpError(400, 'Cannot delete payee with existing payments');
      }

      // Then delete the payee
      const result = await this.db.executeProc('PAYEE_DELETE', {
        id,
        DeletedBy: 'system',
        DeletedDate: new Date()
      });

      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Payee not found');
      }
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error deleting payee ${id}:`, error);
      throw new HttpError(500, 'Failed to delete payee');
    }
  }

  async listUserPayees(userId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<PayeeRecord>> {
    try {
      const result = await this.db.executeProc<PayeeRecord & { TotalCount: number }>('USER_PAYEE', {
        UserId: userId,
        page,
        pageSize
      });

      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }

      const total = result.recordset[0]?.TotalCount || 0;
      const totalPages = Math.ceil(total / pageSize);

      return {
        data: result.recordset,
        pagination: {
          total,
          page,
          pageSize,
          totalPages
        }
      };
    } catch (error) {
      logger.error(`Error listing user payees for user ${userId}:`, error);
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Failed to list user payees');
    }
  }
}
