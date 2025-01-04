import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

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

export class UtilityService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async getDeliveryDates(query: DeliveryDateQuery): Promise<DeliveryDate[]> {
    try {
      const result = await this.repository.executeProc('DELIVERYDATE', {
        StartDate: query.startDate,
        EndDate: query.endDate,
        PaymentType: query.paymentType
      });

      return result.recordset.map(date => ({
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
      const result = await this.repository.executeProc('NSFFees', {
        AccountType: query.accountType,
        Region: query.region
      });

      return result.recordset.map(fee => ({
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
      const result = await this.repository.executeProc('SAVED_EMAILS', {
        Type: query.type,
        Status: query.status
      });

      return result.recordset.map(email => ({
        id: email.EmailId,
        type: email.Type,
        subject: email.Subject,
        body: email.Body,
        status: email.Status,
        variables: this.parseEmailVariables(email.Variables),
        lastModified: email.LastModified,
        modifiedBy: email.ModifiedBy
      }));
    } catch (error) {
      logger.error('Error listing saved emails:', error);
      throw new HttpError(500, 'Failed to list saved emails');
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
