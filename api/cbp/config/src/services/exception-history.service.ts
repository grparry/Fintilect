import { Database } from '../config/db';
import { logger } from '../utils/logger';
import { ExceptionError, ExceptionErrorCodes } from '../types/fis-exception';
import { ServiceResponse } from '../types/common';
import {
  ExceptionHistory,
  ExceptionHistoryCreateRequest,
  ExceptionHistorySearchRequest,
  ExceptionHistorySearchResponse
} from '../types/exception-history';

export class ExceptionHistoryService {
  constructor(private db: Database) {}

  async createHistory(request: ExceptionHistoryCreateRequest): Promise<ServiceResponse<ExceptionHistory>> {
    try {
      if (!request.exceptionId) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Exception ID is required'
        );
      }

      if (!request.type) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'History type is required'
        );
      }

      if (!request.userId) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'User ID is required'
        );
      }

      const result = await this.db.executeProc<ExceptionHistory>('PROC_FIS_EXCEPTION_HISTORY_CREATE', {
        ExceptionId: request.exceptionId,
        Type: request.type,
        UserId: request.userId,
        Details: JSON.stringify(request.details)
      });

      if (!result.recordset?.[0]) {
        throw new ExceptionError(
          ExceptionErrorCodes.DATABASE_ERROR,
          500,
          'Failed to create history record'
        );
      }

      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      logger.error('Error creating exception history:', error);
      if (error instanceof ExceptionError) {
        throw error;
      }
      throw new ExceptionError(
        ExceptionErrorCodes.DATABASE_ERROR,
        500,
        'Failed to create history record'
      );
    }
  }

  async searchHistory(request: ExceptionHistorySearchRequest): Promise<ServiceResponse<ExceptionHistorySearchResponse>> {
    try {
      const { page = 1, pageSize = 10 } = request;

      if (page < 1) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Invalid page number'
        );
      }

      if (pageSize < 1 || pageSize > 100) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Invalid page size'
        );
      }

      const result = await this.db.executeProc<ExceptionHistory & { TotalCount: number }>('PROC_FIS_EXCEPTION_HISTORY_SEARCH', {
        ExceptionId: request.exceptionId,
        Types: request.type ? JSON.stringify(request.type) : null,
        StartDate: request.startDate,
        EndDate: request.endDate,
        UserId: request.userId,
        PageNumber: page,
        PageSize: pageSize
      });

      if (!result.recordset) {
        throw new ExceptionError(
          ExceptionErrorCodes.DATABASE_ERROR,
          500,
          'Invalid response from database'
        );
      }

      const history = result.recordset.map(record => ({
        ...record,
        timestamp: new Date(record.timestamp),
        details: typeof record.details === 'string' ? JSON.parse(record.details) : record.details
      }));

      const totalCount = history[0]?.TotalCount || 0;

      return {
        success: true,
        data: {
          data: history,
          pagination: {
            total: totalCount,
            page,
            pageSize
          }
        }
      };
    } catch (error) {
      logger.error('Error searching exception history:', error);
      if (error instanceof ExceptionError) {
        throw error;
      }
      throw new ExceptionError(
        ExceptionErrorCodes.DATABASE_ERROR,
        500,
        'Failed to search history records'
      );
    }
  }

  async getHistoryById(id: number): Promise<ServiceResponse<ExceptionHistory>> {
    try {
      if (!id) {
        throw new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'History ID is required'
        );
      }

      const result = await this.db.executeProc<ExceptionHistory>('PROC_FIS_EXCEPTION_HISTORY_GET', {
        Id: id
      });

      if (!result.recordset?.length) {
        throw new ExceptionError(
          ExceptionErrorCodes.NOT_FOUND,
          404,
          `History record with id ${id} not found`
        );
      }

      const history = {
        ...result.recordset[0],
        timestamp: new Date(result.recordset[0].timestamp),
        details: typeof result.recordset[0].details === 'string' 
          ? JSON.parse(result.recordset[0].details) 
          : result.recordset[0].details
      };

      return {
        success: true,
        data: history
      };
    } catch (error) {
      logger.error('Error getting exception history:', error);
      if (error instanceof ExceptionError) {
        throw error;
      }
      throw new ExceptionError(
        ExceptionErrorCodes.DATABASE_ERROR,
        500,
        'Failed to get history record'
      );
    }
  }
}
