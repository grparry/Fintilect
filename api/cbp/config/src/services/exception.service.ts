import { Database } from '@cbp-config-api/config/db';
import { IExceptionService } from '@cbp-config-api/interfaces/exception.service.interface';
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
} from '@cbp-config-api/types/fis-exception';
import { ServiceResponse } from '@cbp-config-api/types/common';
import { logger } from '@cbp-config-api/config/logger';

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

  async resolveException(id: number, resolution: string, notes?: string): Promise<ServiceResponse<void>> {
    try {
      await this.db.executeProc('sp_ResolveException', [id, resolution, notes]);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to resolve exception ${id}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.RESOLVE_FAILED,
        500,
        'Failed to resolve exception'
      );
    }
  }

  async reprocessException(id: number, notes?: string): Promise<ServiceResponse<void>> {
    try {
      await this.db.executeProc('sp_ReprocessException', [id, notes]);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to reprocess exception ${id}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.REPROCESS_FAILED,
        500,
        'Failed to reprocess exception'
      );
    }
  }

  async refundException(id: number, amount: number, reason: string, notes?: string): Promise<ServiceResponse<void>> {
    try {
      await this.db.executeProc('sp_RefundException', [id, amount, reason, notes]);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to process refund for exception ${id}:`, error);
      throw new ExceptionError(
        ExceptionErrorCodes.REFUND_FAILED,
        500,
        'Failed to process refund'
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