import { Request, Response, NextFunction } from 'express';
import { Database } from '@/../config/db';
import { ExceptionController } from '@/exception.controller';
import { ExceptionService } from '@/../services/exception.service';
import { ExceptionError, ExceptionErrorCodes } from '@/../types/fis-exception';

jest.mock('../../config/db');
jest.mock('../../services/exception.service');
jest.mock('../../utils/logger');

describe('ExceptionController - Refund Processing', () => {
  let controller: ExceptionController;
  let mockDb: Database;
  let mockService: jest.Mocked<ExceptionService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn().mockResolvedValue({}),
      executeProcWithTransaction: jest.fn().mockResolvedValue({}),
      executeStoredProcedure: jest.fn().mockResolvedValue({}),
      executeQuery: jest.fn().mockResolvedValue({}),
      beginTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      rollbackTransaction: jest.fn().mockResolvedValue(undefined),
      connect: jest.fn().mockResolvedValue(undefined),
      disconnect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined)
    } as Database;

    // Create a proper mock of the ExceptionService
    mockService = new ExceptionService(mockDb) as jest.Mocked<ExceptionService>;
    
    // Mock the service methods
    mockService.searchExceptions = jest.fn();
    mockService.getException = jest.fn();
    mockService.updateException = jest.fn();
    mockService.checkRefundAdjustment = jest.fn();
    mockService.sendNotification = jest.fn();

    controller = new ExceptionController(mockDb);

    mockRequest = {
      params: { id: '1' },
      body: { amount: 100.00 }
    };

    mockResponse = {
      json: jest.fn()
    };

    mockNext = jest.fn();
  });

  describe('checkRefundAdjustment', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');

    it('should process refund check successfully', async () => {
      const mockResult = {
        success: true,
        data: {
          isValid: true,
          adjustmentAmount: 100.00,
          validationMessages: ['Refund is valid']
        }
      };

      mockService.checkRefundAdjustment.mockResolvedValue(mockResult);

      await controller.checkRefundAdjustment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.checkRefundAdjustment).toHaveBeenCalledWith({
        exceptionId: 1,
        amount: 100.00
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult.data);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle unsuccessful refund check', async () => {
      const mockResult = {
        success: false,
        error: {
          code: ExceptionErrorCodes.REFUND_VALIDATION_FAILED,
          message: 'Invalid refund amount'
        }
      };

      mockService.checkRefundAdjustment.mockResolvedValue(mockResult);

      await controller.checkRefundAdjustment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        new ExceptionError(
          ExceptionErrorCodes.REFUND_VALIDATION_FAILED,
          500,
          'Failed to validate refund'
        )
      );
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle invalid exception ID', async () => {
      mockRequest.params = { id: 'invalid' };

      const error = new ExceptionError(
        ExceptionErrorCodes.INVALID_REQUEST,
        400,
        'Invalid exception ID'
      );

      mockService.checkRefundAdjustment.mockRejectedValue(error);

      await controller.checkRefundAdjustment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle missing amount', async () => {
      mockRequest.body = {};

      const error = new ExceptionError(
        ExceptionErrorCodes.INVALID_REQUEST,
        400,
        'Amount is required'
      );

      mockService.checkRefundAdjustment.mockRejectedValue(error);

      await controller.checkRefundAdjustment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      const error = new ExceptionError(
        ExceptionErrorCodes.DATABASE_ERROR,
        500,
        'Database error'
      );

      mockService.checkRefundAdjustment.mockRejectedValue(error);

      await controller.checkRefundAdjustment(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});
