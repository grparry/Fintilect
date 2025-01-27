import * as sql from 'mssql';
import { Database } from '@cbp-config-api/config/db';
import { HttpError } from '@cbp-config-api/utils/errors';
import { logger } from '@cbp-config-api/config/logger';
import { IResult, IRecordSet } from 'mssql';
import { PaginatedResponse, SqlResponse } from '@cbp-config-api/types/common';

export interface PaymentRecord {
  PaymentId: string;
  PayeeId: string;
  Amount: number;
  Currency: string;
  Status: string;
  EffectiveDate: Date;
  Description?: string;
  Reference?: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  ClearedDate?: Date;
  Reason?: string;
}

export interface PaymentResponse {
  id: string;
  payeeId: string;
  amount: number;
  currency: string;
  status: string;
  effectiveDate: Date;
  description?: string;
  reference?: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  clearedAt?: Date;
  reason?: string;
}

export interface CreatePaymentRequest {
  payeeId: string;
  amount: number;
  currency: string;
  effectiveDate?: Date;
  description?: string;
  reference?: string;
}

export interface UpdatePaymentRequest {
  amount?: number;
  description?: string;
  effectiveDate?: Date;
}

export class PaymentService {
  constructor(private db: Database) {}

  private mapPaymentRecord(record: PaymentRecord): PaymentResponse {
    return {
      id: record.PaymentId,
      payeeId: record.PayeeId,
      amount: record.Amount,
      currency: record.Currency,
      status: record.Status,
      effectiveDate: record.EffectiveDate,
      description: record.Description,
      reference: record.Reference,
      createdBy: record.CreatedBy,
      createdAt: record.CreatedDate,
      updatedBy: record.ModifiedBy,
      updatedAt: record.ModifiedDate,
      clearedAt: record.ClearedDate,
      reason: record.Reason
    };
  }

  async listPayments(page: number, pageSize: number): Promise<PaginatedResponse<PaymentResponse>> {
    if (page < 1) {
      throw new HttpError(400, 'Invalid page number');
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new HttpError(400, 'Invalid page size');
    }

    try {
      const result = await this.db.executeProc<PaymentRecord & { TotalCount: number }>('PAYMENT', { 
        page,
        pageSize 
      });

      const payments = result.recordset.map(this.mapPaymentRecord);
      const total = result.recordset[0]?.TotalCount || 0;

      return {
        data: payments,
        pagination: {
          page,
          pageSize,
          total
        }
      };
    } catch (error) {
      logger.error('Error in listPayments:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to list payments');
    }
  }

  async getPayment(id: string): Promise<PaymentResponse | null> {
    if (!id) {
      throw new HttpError(400, 'Invalid payment ID');
    }

    try {
      const result = await this.db.executeProc<PaymentRecord>('PAYMENT_GET', { id });
      
      if (result.recordset.length === 0) {
        return null;
      }

      return this.mapPaymentRecord(result.recordset[0]);
    } catch (error) {
      logger.error('Error in getPayment:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to get payment');
    }
  }

  async createPayment(payment: CreatePaymentRequest): Promise<PaymentResponse> {
    try {
      this.validatePaymentData(payment);

      const result = await this.db.executeProc<PaymentRecord>('INSERT_PAYMENT', {
        ...payment,
        status: 'pending'
      });

      if (result.recordset.length === 0) {
        throw new HttpError(500, 'Failed to create payment');
      }

      return this.mapPaymentRecord(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in createPayment:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to create payment');
    }
  }

  async updatePayment(id: string, updates: UpdatePaymentRequest): Promise<PaymentResponse> {
    try {
      this.validatePaymentData(updates);

      const result = await this.db.executeProc<PaymentRecord>('UPDATE_PAYMENT', {
        id,
        ...updates
      });

      if (result.recordset.length === 0) {
        throw new HttpError(404, 'Payment not found');
      }

      return this.mapPaymentRecord(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in updatePayment:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to update payment');
    }
  }

  async deletePayment(id: string): Promise<void> {
    try {
      const result = await this.db.executeProc('DELETE_PAYMENT', { id });

      if (result.rowsAffected[0] === 0) {
        throw new HttpError(404, 'Payment not found');
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in deletePayment:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to delete payment');
    }
  }

  private validatePaymentData(payment: CreatePaymentRequest | UpdatePaymentRequest) {
    const errors = [];

    if ('amount' in payment && payment.amount !== undefined) {
      if (payment.amount <= 0) {
        throw new HttpError(400, 'Invalid payment amount');
      }
    }

    if ('currency' in payment && payment.currency !== undefined && !['USD', 'EUR', 'GBP'].includes(payment.currency)) {
      throw new HttpError(400, 'Invalid currency code');
    }
  }

  async getPaymentStatus(id: string): Promise<{ id: string; status: string; lastUpdated: Date }> {
    try {
      const result = await this.db.executeProc('PAYMENT_STATUS', { id });
      if (!result.recordset || result.recordset.length === 0) {
        throw new HttpError(404, 'Payment not found');
      }
      const record = result.recordset[0];
      return {
        id: record.PaymentId,
        status: record.Status,
        lastUpdated: record.LastUpdated
      };
    } catch (error) {
      logger.error('Error in getPaymentStatus:', error);
      throw new HttpError(500, 'Failed to get payment status');
    }
  }

  async getClearedPayments(startDate: Date, endDate: Date): Promise<PaymentResponse[]> {
    try {
      const result = await this.db.executeProc('PAYMENT_CLEARED', { startDate, endDate });
      return result.recordset.map(this.mapPaymentRecord);
    } catch (error) {
      logger.error('Error in getClearedPayments:', error);
      throw new HttpError(500, 'Failed to get cleared payments');
    }
  }

  async approvePayment(id: string): Promise<PaymentResponse | null> {
    try {
      const result = await this.db.executeProc('PAYMENT_APPROVE', { id });
      if (!result.recordset || result.recordset.length === 0) {
        return null;
      }
      return this.mapPaymentRecord(result.recordset[0]);
    } catch (error) {
      logger.error('Error in approvePayment:', error);
      throw new HttpError(500, 'Failed to approve payment');
    }
  }

  async rejectPayment(id: string, reason: string): Promise<PaymentResponse | null> {
    try {
      const result = await this.db.executeProc('PAYMENT_REJECT', { id, reason });
      if (!result.recordset || result.recordset.length === 0) {
        return null;
      }
      return this.mapPaymentRecord(result.recordset[0]);
    } catch (error) {
      logger.error('Error in rejectPayment:', error);
      throw new HttpError(500, 'Failed to reject payment');
    }
  }
}
