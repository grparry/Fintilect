import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { Database } from '@cbp-config-api/../config/db';
import { createNotificationRouter } from '@cbp-config-api/notification.routes';
import { NotificationType, NotificationTemplate } from '@cbp-config-api/../types/notification';
import { JwtUser } from '@cbp-config-api/../types/auth';

// Mock authentication middleware
const mockAuthMiddleware = jest.fn((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    id: 'USER123',
    email: 'user@example.com',
    roles: ['USER']
  } as JwtUser;
  next();
});

// Mock validation middleware
const mockValidateRequest = jest.fn(() => (req: Request, res: Response, next: NextFunction) => next());

jest.mock('../../middleware/auth.middleware', () => ({
  authenticateUser: (req: Request, res: Response, next: NextFunction) => mockAuthMiddleware(req, res, next)
}));

jest.mock('../../middleware/validation.middleware', () => ({
  validateRequest: () => (req: Request, res: Response, next: NextFunction) => mockValidateRequest()(req, res, next)
}));

jest.mock('../../config/db');
jest.mock('../../services/notification.service', () => {
  return {
    NotificationService: jest.fn().mockImplementation(() => ({
      sendNotification: jest.fn().mockImplementation((request) => ({
        success: true,
        data: {
          id: 1,
          ...request,
          status: 'SENT',
          createdAt: new Date('2025-01-09T03:54:39.000Z').toISOString()
        }
      })),
      searchNotificationHistory: jest.fn().mockImplementation(() => ({
        success: true,
        data: [{
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
          status: 'SENT',
          createdAt: new Date('2025-01-09T03:54:39.000Z').toISOString()
        }],
        totalCount: 1,
        page: 1,
        pageSize: 10
      }))
    }))
  };
});

describe('Notification Routes', () => {
  let app: express.Application;
  let mockDb: jest.Mocked<Database>;

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      close: jest.fn()
    } as unknown as jest.Mocked<Database>;
    app = express();
    app.use(express.json());
    app.use('/api/notifications', createNotificationRouter(mockDb));

    // Reset mocks
    mockAuthMiddleware.mockClear();
    mockValidateRequest.mockClear();
  });

  describe('POST /send', () => {
    const validNotification = {
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
        notes: 'Test notes'
      }
    };

    it('should require authentication', async () => {
      mockAuthMiddleware.mockImplementationOnce((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .post('/api/notifications/send')
        .send(validNotification);

      expect(response.status).toBe(401);
    });

    it('should validate request body', async () => {
      const invalidNotification = {
        type: 'INVALID_TYPE',
        template: 'INVALID_TEMPLATE'
      };

      mockValidateRequest.mockImplementationOnce(() => (req: Request, res: Response) => {
        res.status(400).json({ message: 'Invalid request body' });
      });

      const response = await request(app)
        .post('/api/notifications/send')
        .send(invalidNotification);

      expect(response.status).toBe(400);
    });

    it('should send notification successfully', async () => {
      const expectedResponse = {
        success: true,
        data: {
          id: 1,
          ...validNotification,
          userId: 'USER123',
          status: 'SENT' as const,
          createdAt: new Date('2025-01-09T03:54:39.000Z').toISOString()
        }
      };

      const response = await request(app)
        .post('/api/notifications/send')
        .send(validNotification);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('GET /history', () => {
    it('should require authentication', async () => {
      mockAuthMiddleware.mockImplementationOnce((req: Request, res: Response) => {
        res.status(401).json({ message: 'Unauthorized' });
      });

      const response = await request(app)
        .get('/api/notifications/history');

      expect(response.status).toBe(401);
    });

    it('should validate query parameters', async () => {
      mockValidateRequest.mockImplementationOnce(() => (req: Request, res: Response) => {
        res.status(400).json({ message: 'Invalid query parameters' });
      });

      const response = await request(app)
        .get('/api/notifications/history')
        .query({ type: 'INVALID_TYPE' });

      expect(response.status).toBe(400);
    });

    it('should search notification history successfully', async () => {
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
            createdAt: new Date('2025-01-09T03:54:39.000Z').toISOString()
          }
        ],
        totalCount: 1,
        page: 1,
        pageSize: 10
      };

      const response = await request(app)
        .get('/api/notifications/history')
        .query({
          startDate: '2025-01-01T00:00:00.000Z',
          endDate: '2025-01-31T23:59:59.999Z',
          type: NotificationType.EMAIL,
          template: NotificationTemplate.EXCEPTION_UPDATED,
          status: 'SENT',
          page: '1',
          pageSize: '10'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should handle missing query parameters', async () => {
      const response = await request(app)
        .get('/api/notifications/history');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.page).toBe(1);
      expect(response.body.pageSize).toBe(10);
    });
  });
});
