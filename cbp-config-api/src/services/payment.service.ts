import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

export class PaymentService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async listPayments() {
    try {
      const result = await this.repository.executeProc('PAYMENT_HISTORY');
      return result.recordset;
    } catch (error) {
      logger.error('Error listing payments:', error);
      throw new HttpError(500, 'Failed to list payments');
    }
  }

  async getPayment(id: string) {
    try {
      const result = await this.repository.executeProc('PAYMENT_GET', { 
        PaymentId: id 
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error getting payment ${id}:`, error);
      throw new HttpError(500, 'Failed to get payment details');
    }
  }

  async createPayment(paymentData: any) {
    try {
      const result = await this.repository.executeProc('PAYMENT_CREATE', {
        ...paymentData,
        CreatedBy: 'system', // TODO: Get from auth context
        CreatedDate: new Date()
      });
      return result.recordset[0];
    } catch (error) {
      logger.error('Error creating payment:', error);
      throw new HttpError(500, 'Failed to create payment');
    }
  }

  async updatePayment(id: string, paymentData: any) {
    try {
      const result = await this.repository.executeProc('PAYMENT_UPDATE', {
        PaymentId: id,
        ...paymentData,
        ModifiedBy: 'system', // TODO: Get from auth context
        ModifiedDate: new Date()
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error updating payment ${id}:`, error);
      throw new HttpError(500, 'Failed to update payment');
    }
  }

  async cancelPayment(id: string) {
    try {
      await this.repository.executeProc('PAYMENT_CANCEL', {
        PaymentId: id,
        CancelledBy: 'system', // TODO: Get from auth context
        CancelledDate: new Date()
      });
    } catch (error) {
      logger.error(`Error cancelling payment ${id}:`, error);
      throw new HttpError(500, 'Failed to cancel payment');
    }
  }

  async getPaymentStatus(id: string) {
    try {
      const result = await this.repository.executeProc('PAYMENT_STATUS', {
        PaymentId: id
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error getting payment status ${id}:`, error);
      throw new HttpError(500, 'Failed to get payment status');
    }
  }

  async listClearedPayments() {
    try {
      const result = await this.repository.executeProc('PAYMENT_CLEAR');
      return result.recordset;
    } catch (error) {
      logger.error('Error listing cleared payments:', error);
      throw new HttpError(500, 'Failed to list cleared payments');
    }
  }
}
