import { Database } from '../config/db';
import { IExceptionService } from './interfaces/exception.service.interface';
import { 
  ExceptionSearchRequest,
  ExceptionSearchResponse,
  ExceptionRefundRequest,
  ExceptionRefundResponse,
  ExceptionNotificationRequest,
  ExceptionUpdateRequest,
  ExceptionError,
  ExceptionErrorCodes,
  FisException
} from '../types/fis-exception';
import { ServiceResponse } from '../types/common';
import { logger } from '../config/logger';

export class ExceptionService implements IExceptionService {
  constructor(private db: Database) {}

  async searchExceptions(request: ExceptionSearchRequest): Promise<ServiceResponse<ExceptionSearchResponse>> {
    try {
      const result = await this.db.executeProc('sp_SearchExceptions', [
        request.page,
        request.pageSize,
        request.startDate,
        request.endDate,
        request.type,
        request.status
      ]);

      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      logger.error('Failed to search exceptions:', error);
      throw new ExceptionError(
        ExceptionErrorCodes.SEARCH_FAILED,
        500,
        'Failed to search exceptions'
      );
    }
  }

  async getException(id: number): Promise<ServiceResponse<FisException>> {
    try {
      const result = await this.db.executeProc('sp_GetException', [id]);
      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      logger.error(`Failed to get exception ${id}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.NOT_FOUND,
        404,
        `Exception ${id} not found`
      );
    }
  }

  async updateException(request: ExceptionUpdateRequest): Promise<ServiceResponse<void>> {
    try {
      await this.db.executeProc('sp_UpdateException', [
        request.id,
        request.status,
        request.resolution,
        request.notes
      ]);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to update exception ${request.id}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.UPDATE_FAILED,
        500,
        'Failed to update exception'
      );
    }
  }

  async checkRefundAdjustment(request: ExceptionRefundRequest): Promise<ServiceResponse<ExceptionRefundResponse>> {
    try {
      const result = await this.db.executeProc('sp_CheckRefundAdjustment', [
        request.exceptionId,
        request.amount
      ]);
      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      logger.error(`Failed to check refund for exception ${request.exceptionId}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.REFUND_VALIDATION_FAILED,
        500,
        'Failed to validate refund'
      );
    }
  }

  async sendNotification(request: ExceptionNotificationRequest): Promise<ServiceResponse<void>> {
    try {
      await this.db.executeProc('sp_SendExceptionNotification', [
        request.exceptionId,
        request.notificationType,
        request.recipients
      ]);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to send notification for exception ${request.exceptionId}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.NOTIFICATION_FAILED,
        500,
        'Failed to send notification'
      );
    }
  }
}