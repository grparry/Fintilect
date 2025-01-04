import * as sql from 'mssql';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

interface QueryParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  entityType?: string;
  status?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class TrackingService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async listChangeHistory(params: QueryParams): Promise<PaginatedResponse<any>> {
    try {
      const result = await this.repository.executeProc('CHANGE_HISTORY', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        EntityType: params.entityType
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
      const result = await this.repository.executeProc('ONUSPAYMENTS', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        Status: params.status
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
      const result = await this.repository.executeProc('COURTESY_PAY', {
        Offset: (params.page - 1) * params.limit,
        Limit: params.limit,
        StartDate: params.startDate,
        EndDate: params.endDate,
        Status: params.status
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
        total,
        totalPages: Math.ceil(total / params.limit)
      }
    };
  }

  private maskAccountNumber(accountNumber: string): string {
    if (!accountNumber) return '';
    return accountNumber.slice(-4).padStart(accountNumber.length, '*');
  }
}
