import { Request, Response, NextFunction } from 'express';
import { Database } from '@/../config/db';
import { ExceptionHistoryController } from '@/exception-history.controller';
import { ExceptionHistoryService } from '@/../services/exception-history.service';
import { ExceptionError, ExceptionErrorCodes } from '@/../types/fis-exception';
import { ExceptionHistoryType } from '@/../types/exception-history';
import { UserRole } from '@/../types/auth'; // Import UserRole

jest.mock('../../config/db');
jest.mock('../../services/exception-history.service');
jest.mock('../../utils/logger');

describe('ExceptionHistoryController', () => {
  let controller: ExceptionHistoryController;
  let mockDb: jest.Mocked<Database>;
  let mockService: jest.Mocked<ExceptionHistoryService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
    } as unknown as jest.Mocked<Database>;

    mockService = {
      searchHistory: jest.fn(),
      getHistoryById: jest.fn(),
      createHistory: jest.fn(),
    } as unknown as jest.Mocked<ExceptionHistoryService>;

    // @ts-ignore - Mock the service constructor
    ExceptionHistoryService.mockImplementation(() => mockService);

    controller = new ExceptionHistoryController(mockDb);

    mockRequest = {
      query: {},
      params: {},
      body: {},
      user: { id: 'USER123', email: 'user@example.com', roles: [UserRole.USER] } // Use UserRole.USER
    };

    mockResponse = {
      json: jest.fn()
    };

    mockNext = jest.fn();
  });

  describe('search', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');

    it('should search history records successfully', async () => {
      mockRequest.query = {
        exceptionId: '100',
        type: ['CREATED', 'UPDATED'],
        startDate: mockDate.toISOString(),
        endDate: mockDate.toISOString(),
        userId: 'USER123',
        page: '1',
        pageSize: '10'
      };

      const mockResult = {
        success: true,
        data: {
          data: [
            {
              id: 1,
              exceptionId: 100,
              type: ExceptionHistoryType.CREATED,
              userId: 'USER123',
              timestamp: mockDate,
              details: {}
            }
          ],
          pagination: {
            total: 1,
            page: 1,
            pageSize: 10
          }
        }
      };

      mockService.searchHistory.mockResolvedValue(mockResult);

      await controller.search(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.searchHistory).toHaveBeenCalledWith({
        exceptionId: 100,
        type: ['CREATED', 'UPDATED'],
        startDate: mockDate,
        endDate: mockDate,
        userId: 'USER123',
        page: 1,
        pageSize: 10
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle search errors', async () => {
      const error = new ExceptionError(
        ExceptionErrorCodes.DATABASE_ERROR,
        500,
        'Database error'
      );

      mockService.searchHistory.mockRejectedValue(error);

      await controller.search(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');

    it('should get history record by ID successfully', async () => {
      mockRequest.params = { id: '1' };

      const mockResult = {
        success: true,
        data: {
          id: 1,
          exceptionId: 100,
          type: ExceptionHistoryType.CREATED,
          userId: 'USER123',
          timestamp: mockDate,
          details: {}
        }
      };

      mockService.getHistoryById.mockResolvedValue(mockResult);

      await controller.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.getHistoryById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle getById errors', async () => {
      mockRequest.params = { id: 'invalid' };

      const error = new ExceptionError(
        ExceptionErrorCodes.INVALID_REQUEST,
        400,
        'Invalid history ID'
      );

      mockService.getHistoryById.mockRejectedValue(error);

      await controller.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create history record successfully', async () => {
      mockRequest.params = { exceptionId: '100' };
      mockRequest.body = {
        type: ExceptionHistoryType.UPDATED,
        details: {
          before: { status: 'PENDING' },
          after: { status: 'COMPLETED' }
        }
      };

      const mockResult = {
        success: true,
        data: {
          id: 1,
          exceptionId: 100,
          type: ExceptionHistoryType.UPDATED,
          userId: 'USER123',
          timestamp: new Date(),
          details: {
            before: { status: 'PENDING' },
            after: { status: 'COMPLETED' }
          }
        }
      };

      mockService.createHistory.mockResolvedValue(mockResult);

      await controller.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockService.createHistory).toHaveBeenCalledWith({
        exceptionId: 100,
        type: ExceptionHistoryType.UPDATED,
        userId: 'USER123',
        details: {
          before: { status: 'PENDING' },
          after: { status: 'COMPLETED' }
        }
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle create errors', async () => {
      mockRequest.params = { exceptionId: 'invalid' };

      const error = new ExceptionError(
        ExceptionErrorCodes.INVALID_REQUEST,
        400,
        'Invalid exception ID'
      );

      mockService.createHistory.mockRejectedValue(error);

      await controller.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});
