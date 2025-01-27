import { Request, Response, NextFunction } from 'express';
import { NotificationController } from '@cbp-config-api/notification.controller';
import { NotificationService } from '@cbp-config-api/../services/notification.service';
import { Database } from '@cbp-config-api/../config/db';
import { NotificationType, NotificationTemplate } from '@cbp-config-api/../types/notification';
import { JwtUser } from '@cbp-config-api/../types/auth';

jest.mock('../../services/notification.service');
jest.mock('../../config/db');

describe('NotificationController', () => {
  let controller: NotificationController;
  let mockDb: jest.Mocked<Database>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      close: jest.fn()
    } as unknown as jest.Mocked<Database>;
    controller = new NotificationController(mockDb);
    mockRequest = {
      body: {},
      query: {},
      user: {
        id: 'USER123',
        email: 'user@example.com',
        roles: ['USER']
      } as JwtUser
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('send', () => {
    const mockNotificationRequest = {
      type: NotificationType.EMAIL,
      template: NotificationTemplate.EXCEPTION_UPDATED,
      recipients: [
        {
          email: 'test@example.com',
          name: 'Test User'
        }
      ],
      data: {
        exceptionId: 1,
        correctionType: 'MANUAL',
        notes: 'Test notes',
        userId: 'USER123',
        timestamp: new Date('2025-01-09T03:54:39.000Z')
      }
    };

    it('should send notification successfully', async () => {
      mockRequest.body = mockNotificationRequest;
      const expectedResponse = {
        success: true,
        data: {
          id: 1,
          ...mockNotificationRequest,
          userId: 'USER123',
          status: 'SENT' as const,
          createdAt: expect.any(Date)
        }
      };

      const mockService = NotificationService.prototype as jest.Mocked<NotificationService>;
      mockService.sendNotification.mockResolvedValueOnce(expectedResponse);

      await controller.send(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.sendNotification).toHaveBeenCalledWith({
        ...mockNotificationRequest,
        userId: 'USER123'
      });
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle notification failure', async () => {
      mockRequest.body = mockNotificationRequest;
      const error = new Error('Failed to send notification');

      const mockService = NotificationService.prototype as jest.Mocked<NotificationService>;
      mockService.sendNotification.mockRejectedValueOnce(error);

      await controller.send(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.sendNotification).toHaveBeenCalledWith({
        ...mockNotificationRequest,
        userId: 'USER123'
      });
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('searchHistory', () => {
    const mockSearchRequest = {
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-01-31T23:59:59.999Z',
      type: NotificationType.EMAIL,
      template: NotificationTemplate.EXCEPTION_UPDATED,
      userId: 'USER123',
      status: 'SENT' as const,
      page: '1',
      pageSize: '10'
    };

    it('should search notification history successfully', async () => {
      mockRequest.query = mockSearchRequest;
      const expectedResponse = {
        success: true,
        data: [
          {
            id: 1,
            type: NotificationType.EMAIL,
            template: NotificationTemplate.EXCEPTION_UPDATED,
            recipients: [{ email: 'test@example.com', name: 'Test User' }],
            data: {
              exceptionId: 1,
              correctionType: 'MANUAL',
              notes: 'Test notes'
            },
            userId: 'USER123',
            status: 'SENT' as const,
            createdAt: new Date('2025-01-09T03:54:39.000Z')
          }
        ],
        totalCount: 1,
        page: 1,
        pageSize: 10
      };

      const mockService = NotificationService.prototype as jest.Mocked<NotificationService>;
      mockService.searchNotificationHistory.mockResolvedValueOnce(expectedResponse);

      await controller.searchHistory(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.searchNotificationHistory).toHaveBeenCalledWith({
        startDate: new Date(mockSearchRequest.startDate),
        endDate: new Date(mockSearchRequest.endDate),
        type: mockSearchRequest.type,
        template: mockSearchRequest.template,
        userId: mockSearchRequest.userId,
        status: mockSearchRequest.status,
        page: parseInt(mockSearchRequest.page, 10),
        pageSize: parseInt(mockSearchRequest.pageSize, 10)
      });
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle search failure', async () => {
      mockRequest.query = mockSearchRequest;
      const error = new Error('Failed to search notification history');

      const mockService = NotificationService.prototype as jest.Mocked<NotificationService>;
      mockService.searchNotificationHistory.mockRejectedValueOnce(error);

      await controller.searchHistory(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.searchNotificationHistory).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should use default pagination values', async () => {
      mockRequest.query = {
        type: NotificationType.EMAIL
      };

      const mockService = NotificationService.prototype as jest.Mocked<NotificationService>;
      await controller.searchHistory(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.searchNotificationHistory).toHaveBeenCalledWith(
        expect.objectContaining({
          type: NotificationType.EMAIL,
          page: undefined,
          pageSize: undefined
        })
      );
    });
  });
});
