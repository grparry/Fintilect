import * as sql from 'mssql';
import { Database } from '@/config/db';
import { HttpError } from '@/utils/errors';
import { logger } from '@/config/logger';
import { BaseRepository } from '@/repositories/base.repository';

interface DeliveryDateQuery {
  startDate?: string;
  endDate?: string;
  paymentType?: string;
}

interface NsfFeeQuery {
  accountType?: string;
  region?: string;
}

interface EmailQuery {
  type?: string;
  status?: string;
}

interface DeliveryDateRecord {
  Date: Date;
  IsBusinessDay: boolean;
  IsHoliday: boolean;
  HolidayName?: string;
  CutoffTime: string;
  NextDeliveryDate: Date;
}

interface NsfFeeRecord {
  AccountType: string;
  Region: string;
  Fee: number;
  Currency: string;
  EffectiveDate: Date;
  Description: string;
}

interface EmailRecord {
  EmailId: string;
  Type: string;
  Subject: string;
  Body: string;
  Status: string;
  Variables: string;
  LastModified: Date;
  ModifiedBy: string;
}

interface DeliveryDate {
  date: Date;
  isBusinessDay: boolean;
  isHoliday: boolean;
  holidayName?: string;
  cutoffTime: string;
  nextDeliveryDate: Date;
}

interface NsfFee {
  accountType: string;
  region: string;
  fee: number;
  currency: string;
  effectiveDate: Date;
  description: string;
}

interface SavedEmail {
  id: string;
  type: string;
  subject: string;
  body: string;
  status: string;
  variables: string[];
  lastModified: Date;
  modifiedBy: string;
}

interface UtilityRecord {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UtilityCreateData {
  name: string;
  type: string;
  status?: string;
}

interface UtilityUpdateData {
  name?: string;
  type?: string;
  status?: string;
}

export class UtilityService extends BaseRepository {
  constructor(db: Database) {
    super('utility', db);
  }

  async getDeliveryDates(query: DeliveryDateQuery): Promise<DeliveryDate[]> {
    try {
      const result = await this.executeProc<DeliveryDateRecord>('DELIVERYDATE', {
        StartDate: query.startDate,
        EndDate: query.endDate,
        PaymentType: query.paymentType
      });

      return result.recordset.map((date: DeliveryDateRecord) => ({
        date: date.Date,
        isBusinessDay: date.IsBusinessDay,
        isHoliday: date.IsHoliday,
        holidayName: date.HolidayName,
        cutoffTime: date.CutoffTime,
        nextDeliveryDate: date.NextDeliveryDate
      }));
    } catch (error) {
      logger.error('Error getting delivery dates:', error);
      throw new HttpError(500, 'Failed to get delivery dates');
    }
  }

  async getNsfFees(query: NsfFeeQuery): Promise<NsfFee[]> {
    try {
      const result = await this.executeProc<NsfFeeRecord>('NSFFees', {
        AccountType: query.accountType,
        Region: query.region
      });

      return result.recordset.map((fee: NsfFeeRecord) => ({
        accountType: fee.AccountType,
        region: fee.Region,
        fee: fee.Fee,
        currency: fee.Currency,
        effectiveDate: fee.EffectiveDate,
        description: fee.Description
      }));
    } catch (error) {
      logger.error('Error getting NSF fees:', error);
      throw new HttpError(500, 'Failed to get NSF fees');
    }
  }

  async listSavedEmails(query: EmailQuery): Promise<SavedEmail[]> {
    try {
      const result = await this.executeProc<EmailRecord>('LISTSAVEDEMAILS', {
        Type: query.type,
        Status: query.status
      });
      return result.recordset.map((record: EmailRecord) => ({
        id: record.EmailId,
        type: record.Type,
        subject: record.Subject,
        body: record.Body,
        status: record.Status,
        variables: this.parseEmailVariables(record.Variables),
        lastModified: record.LastModified,
        modifiedBy: record.ModifiedBy
      }));
    } catch (error) {
      logger.error('Error listing saved emails:', error);
      throw new HttpError(500, 'Failed to list saved emails');
    }
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      await this.executeProc('HEALTHCHECK');
      return {
        status: 'healthy',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Health check failed:', error);
      throw new HttpError(503, 'Service unhealthy');
    }
  }

  async getMetrics(params: { startDate: string; endDate: string }): Promise<any> {
    try {
      const result = await this.executeProc('GETMETRICS', {
        StartDate: params.startDate,
        EndDate: params.endDate
      });
      return result.recordset;
    } catch (error) {
      logger.error('Error getting metrics:', error);
      throw new HttpError(500, 'Failed to get metrics');
    }
  }

  async getVersion(): Promise<{ version: string; buildDate: string }> {
    try {
      interface VersionRecord {
        Version: string;
        BuildDate: string;
      }
      const result = await this.executeProc<VersionRecord>('GETVERSION');
      const record = result.recordset[0];
      return {
        version: record?.Version || '1.0.0',
        buildDate: record?.BuildDate || new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error getting version:', error);
      throw new HttpError(500, 'Failed to get version');
    }
  }

  async getLogs(params: { level: string; startDate: string; endDate: string }): Promise<any[]> {
    try {
      const result = await this.executeProc('GETLOGS', {
        Level: params.level,
        StartDate: params.startDate,
        EndDate: params.endDate
      });
      return result.recordset;
    } catch (error) {
      logger.error('Error getting logs:', error);
      throw new HttpError(500, 'Failed to get logs');
    }
  }

  async listUtilities(): Promise<UtilityRecord[]> {
    try {
      const result = await this.executeProc<UtilityRecord>('UTILITY_LIST', {});
      return result.recordset;
    } catch (error) {
      logger.error('Error listing utilities:', error);
      throw new HttpError(500, 'Failed to list utilities');
    }
  }

  async getUtility(id: string): Promise<UtilityRecord> {
    try {
      const result = await this.executeProc<UtilityRecord>('UTILITY_GET', { id });
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Utility not found');
      }
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting utility ${id}:`, error);
      throw new HttpError(500, 'Failed to get utility');
    }
  }

  async createUtility(data: UtilityCreateData): Promise<UtilityRecord> {
    try {
      const result = await this.executeProc<UtilityRecord>('UTILITY_CREATE', {
        ...data,
        status: data.status || 'ACTIVE',
        createdAt: new Date()
      });
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(500, 'Failed to create utility');
      }
      return result.recordset[0];
    } catch (error) {
      logger.error('Error creating utility:', error);
      throw new HttpError(500, 'Failed to create utility');
    }
  }

  async updateUtility(id: string, data: UtilityUpdateData): Promise<UtilityRecord> {
    try {
      const result = await this.executeProc<UtilityRecord>('UTILITY_UPDATE', {
        id,
        ...data,
        updatedAt: new Date()
      });
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Utility not found');
      }
      return result.recordset[0];
    } catch (error) {
      logger.error(`Error updating utility ${id}:`, error);
      throw new HttpError(500, 'Failed to update utility');
    }
  }

  async deleteUtility(id: string): Promise<void> {
    try {
      const result = await this.executeProc('UTILITY_DELETE', { id });
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Utility not found');
      }
    } catch (error) {
      logger.error(`Error deleting utility ${id}:`, error);
      throw new HttpError(500, 'Failed to delete utility');
    }
  }

  private parseEmailVariables(variables: string): string[] {
    try {
      return variables ? JSON.parse(variables) : [];
    } catch {
      logger.warn('Failed to parse email variables, returning empty array');
      return [];
    }
  }
}
