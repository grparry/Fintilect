import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

export class UserService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async getPayeeOptions(userId: string) {
    try {
      const result = await this.repository.executeProc('UserPayeeOptions', {
        UserId: userId,
        Action: 'GET'
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error getting payee options for user ${userId}:`, error);
      throw new HttpError(500, 'Failed to get user payee options');
    }
  }

  async updatePayeeOptions(userId: string, options: any) {
    try {
      // Validate required fields
      if (!options.defaultPaymentMethod || !options.defaultDeliveryMethod) {
        throw new HttpError(400, 'Default payment and delivery methods are required');
      }

      const result = await this.repository.executeProc('UserPayeeOptions', {
        UserId: userId,
        Action: 'UPDATE',
        ...options,
        ModifiedBy: 'system', // TODO: Get from auth context
        ModifiedDate: new Date()
      });
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error updating payee options for user ${userId}:`, error);
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to update user payee options');
    }
  }

  async getHostInfo(userId: string) {
    try {
      const result = await this.repository.executeProc('HOSTMEMBERACCTINFO', {
        UserId: userId
      });

      // Mask sensitive information
      const hostInfo = result.recordset[0];
      if (hostInfo) {
        hostInfo.accountNumber = this.maskAccountNumber(hostInfo.accountNumber);
        hostInfo.ssn = this.maskSSN(hostInfo.ssn);
      }

      return hostInfo;
    } catch (error) {
      logger.error(`Error getting host info for user ${userId}:`, error);
      throw new HttpError(500, 'Failed to get user host info');
    }
  }

  private maskAccountNumber(accountNumber: string): string {
    if (!accountNumber) return '';
    return accountNumber.slice(-4).padStart(accountNumber.length, '*');
  }

  private maskSSN(ssn: string): string {
    if (!ssn) return '';
    return ssn.slice(-4).padStart(9, '*');
  }
}
