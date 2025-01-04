import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

export class PayeeService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async listPayees() {
    try {
      const result = await this.repository.executeProc('PAYEE');
      return result.recordset;
    } catch (error) {
      logger.error('Error listing payees:', error);
      throw new HttpError(500, 'Failed to list payees');
    }
  }

  async getPayee(id: string) {
    try {
      const result = await this.repository.executeProc('PAYEE_GET', {
        PayeeId: id
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error getting payee ${id}:`, error);
      throw new HttpError(500, 'Failed to get payee details');
    }
  }

  async createPayee(payeeData: any) {
    try {
      // Validate required fields
      if (!payeeData.name || !payeeData.accountNumber) {
        throw new HttpError(400, 'Name and account number are required');
      }

      const result = await this.repository.executeProc('PAYEE_CREATE', {
        ...payeeData,
        CreatedBy: 'system', // TODO: Get from auth context
        CreatedDate: new Date()
      });
      return result.recordset[0];
    } catch (error) {
      logger.error('Error creating payee:', error);
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to create payee');
    }
  }

  async updatePayee(id: string, payeeData: any) {
    try {
      const result = await this.repository.executeProc('PAYEE_UPDATE', {
        PayeeId: id,
        ...payeeData,
        ModifiedBy: 'system', // TODO: Get from auth context
        ModifiedDate: new Date()
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error updating payee ${id}:`, error);
      throw new HttpError(500, 'Failed to update payee');
    }
  }

  async removePayee(id: string) {
    try {
      // Check if payee has associated payments
      const hasPayments = await this.checkPayeePayments(id);
      if (hasPayments) {
        throw new HttpError(409, 'Cannot delete payee with existing payments');
      }

      await this.repository.executeProc('PAYEE_DELETE', {
        PayeeId: id,
        DeletedBy: 'system', // TODO: Get from auth context
        DeletedDate: new Date()
      });
    } catch (error) {
      logger.error(`Error removing payee ${id}:`, error);
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to remove payee');
    }
  }

  async listUserPayees(userId: string) {
    try {
      const result = await this.repository.executeProc('USER_PAYEE', {
        UserId: userId
      });
      return result.recordset;
    } catch (error) {
      logger.error(`Error listing payees for user ${userId}:`, error);
      throw new HttpError(500, 'Failed to list user payees');
    }
  }

  private async checkPayeePayments(payeeId: string): Promise<boolean> {
    try {
      const result = await this.repository.executeProc('PAYEE_CHECK_PAYMENTS', {
        PayeeId: payeeId
      });
      return result.recordset[0]?.hasPayments || false;
    } catch (error) {
      logger.error(`Error checking payee payments ${payeeId}:`, error);
      throw new HttpError(500, 'Failed to check payee payments');
    }
  }
}
