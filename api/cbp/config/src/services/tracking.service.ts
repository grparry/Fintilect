import * as sql from 'mssql';
import { Database, db } from '../config/db';
import { BaseRepository } from '../repositories/base.repository';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';

interface QueryParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  type?: string;
}

interface TrackingEvent {
  type: string;
  data: any;
  userId: string;
  timestamp: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export class TrackingService extends BaseRepository {
  constructor() {
    super('tracking', db);
  }

  async trackEvent(event: TrackingEvent): Promise<void> {
    try {
      await this.executeProc('sp_TrackEvent', {
        type: event.type,
        data: JSON.stringify(event.data),
        userId: event.userId,
        timestamp: event.timestamp
      });
      logger.info('Event tracked successfully', { type: event.type });
    } catch (error) {
      logger.error('Error tracking event:', error);
      throw new HttpError(500, 'Failed to track event');
    }
  }

  async getEvents(params: QueryParams): Promise<PaginatedResponse<TrackingEvent>> {
    try {
      const result = await this.executeProc<TrackingEvent>('sp_GetEvents', {
        page: params.page || 1,
        limit: params.limit || 10,
        startDate: params.startDate,
        endDate: params.endDate,
        type: params.type
      });

      const total = result.recordset.length;
      const offset = (params.page - 1) * params.limit;
      const data = result.recordset.slice(offset, offset + params.limit);

      return {
        data,
        pagination: {
          page: params.page,
          limit: params.limit,
          total
        }
      };
    } catch (error) {
      logger.error('Error getting events:', error);
      throw new HttpError(500, 'Failed to get events');
    }
  }

  async listChangeHistory(params: QueryParams): Promise<PaginatedResponse<any>> {
    try {
      const result: sql.IResult<any> = await this.executeProc('CHANGE_HISTORY', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        EntityType: ''
      });

      return this.buildPaginatedResponse(
        result.recordset,
        params,
        result.recordset[0]?.TotalCount || 0
      );
    } catch (error) {
      logger.error('Error listing change history:', error);
      throw new HttpError(500, 'Failed to list change history');
    }
  }

  async listOnUsPayments(params: QueryParams): Promise<PaginatedResponse<any>> {
    try {
      const result: sql.IResult<any> = await this.executeProc('ONUSPAYMENTS', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        Status: ''
      });

      const transformedData = result.recordset.map(payment => ({
        id: payment.PaymentId,
        amount: payment.Amount,
        status: payment.Status,
        processedDate: payment.ProcessedDate,
        accountNumber: this.maskAccountNumber(payment.AccountNumber),
        routingNumber: payment.RoutingNumber,
        paymentMethod: payment.PaymentMethod,
        description: payment.Description
      }));

      return this.buildPaginatedResponse(
        transformedData,
        params,
        result.recordset[0]?.TotalCount || 0
      );
    } catch (error) {
      logger.error('Error listing on-us payments:', error);
      throw new HttpError(500, 'Failed to list on-us payments');
    }
  }

  async listCourtesyPayments(params: QueryParams): Promise<PaginatedResponse<any>> {
    try {
      const result: sql.IResult<any> = await this.executeProc('COURTESY_PAY', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        Status: ''
      });

      const transformedData = result.recordset.map(payment => ({
        id: payment.PaymentId,
        amount: payment.Amount,
        status: payment.Status,
        processedDate: payment.ProcessedDate,
        accountNumber: this.maskAccountNumber(payment.AccountNumber),
        paymentMethod: payment.PaymentMethod,
        description: payment.Description,
        courtesyFee: payment.CourtesyFee,
        overdraftAmount: payment.OverdraftAmount
      }));

      return this.buildPaginatedResponse(
        transformedData,
        params,
        result.recordset[0]?.TotalCount || 0
      );
    } catch (error) {
      logger.error('Error listing courtesy payments:', error);
      throw new HttpError(500, 'Failed to list courtesy payments');
    }
  }

  async getPaymentTracking(params: QueryParams): Promise<PaginatedResponse<any>> {
    try {
      const result: sql.IResult<any> = await this.executeProc('sp_GetPaymentTracking', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        Status: params.type
      });

      const transformedData = result.recordset.map(tracking => ({
        id: tracking.TrackingId,
        paymentId: tracking.PaymentId,
        status: tracking.Status,
        timestamp: tracking.Timestamp,
        details: tracking.Details,
        amount: tracking.Amount,
        accountNumber: this.maskAccountNumber(tracking.AccountNumber)
      }));

      return this.buildPaginatedResponse(
        transformedData,
        params,
        result.recordset[0]?.TotalCount || 0
      );
    } catch (error) {
      logger.error('Error getting payment tracking:', error);
      throw new HttpError(500, 'Failed to get payment tracking');
    }
  }

  private buildPaginatedResponse<T>(
    data: T[],
    params: QueryParams,
    total: number
  ): PaginatedResponse<T> {
    return {
      data,
      pagination: {
        page: params.page,
        limit: params.limit,
        total
      }
    };
  }

  private maskAccountNumber(accountNumber: string): string {
    if (!accountNumber) return '';
    return accountNumber.slice(-4).padStart(accountNumber.length, '*');
  }
}
