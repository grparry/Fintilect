import { notificationService } from '../notification.service';
import { auditService } from '../../audit.service';
import api from '../../api';
import {
  NotificationType,
  NotificationRequest,
  NotificationResponse,
  NotificationConfig,
} from '../../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../../types/api.types';

jest.mock('../../api');
jest.mock('../../audit.service');

const mockedApi = api as jest.Mocked<typeof api>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;

describe('NotificationService', () => {
  const mockNotificationRequest: NotificationRequest = {
    type: 'PAYMENT_COMPLETED' as NotificationType,
    recipientId: 'client123',
    data: {
      paymentId: 'payment123',
      amount: 1000,
      currency: 'USD',
    },
    channel: 'email',
    priority: 'normal',
  };

  const mockNotificationResponse: NotificationResponse = {
    id: 'notification123',
    recipientId: 'client123',
    type: 'PAYMENT_COMPLETED' as NotificationType,
    status: 'SENT',
    channel: 'email',
    sentAt: '2025-01-08T12:00:00Z',
  };

  const mockConfig: NotificationConfig = {
    providers: {
      email: {
        enabled: true,
        provider: 'sendgrid',
        apiKey: 'test-key',
        fromEmail: 'test@example.com',
        templates: {
          PAYMENT_COMPLETED: 'template-1',
          PAYMENT_FAILED: 'template-2',
          PAYMENT_APPROVAL_REQUIRED: 'template-3',
          PAYMENT_CANCELLED: 'template-4',
          PAYMENT_EXPIRED: 'template-5',
        } as Record<NotificationType, string>,
      },
      sms: {
        enabled: true,
        provider: 'twilio',
        apiKey: 'test-key',
        fromNumber: '+1234567890',
        templates: {
          PAYMENT_COMPLETED: 'template-3',
          PAYMENT_FAILED: 'template-4',
          PAYMENT_APPROVAL_REQUIRED: 'template-5',
          PAYMENT_CANCELLED: 'template-6',
          PAYMENT_EXPIRED: 'template-7',
        } as Record<NotificationType, string>,
      },
    },
    defaultChannel: 'email',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedApi.get.mockResolvedValue({
      success: true,
      data: {
        data: mockConfig,
      },
      meta: {
        timestamp: '2025-01-08T14:16:27-07:00',
        requestId: 'test-request-id',
      },
    } as ApiSuccessResponse<{ data: NotificationConfig }>);
  });

  describe('sendNotification', () => {
    it('should send notification successfully', async () => {
      mockedApi.post.mockResolvedValueOnce({
        success: true,
        data: {
          data: mockNotificationResponse,
        },
        meta: {
          timestamp: '2025-01-08T14:16:27-07:00',
          requestId: 'test-request-id',
        },
      } as ApiSuccessResponse<{ data: NotificationResponse }>);

      const result = await notificationService.sendNotification(
        mockNotificationRequest
      );

      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/notifications/send',
        expect.objectContaining({
          ...mockNotificationRequest,
          config: mockConfig,
        })
      );

      expect(result).toEqual(mockNotificationResponse);
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_SEND',
        resourceId: mockNotificationRequest.recipientId,
        resourceType: 'notification',
        status: 'INITIATED',
        metadata: {
          type: mockNotificationRequest.type,
          data: mockNotificationRequest.data,
        },
      });

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_SEND',
        resourceId: mockNotificationRequest.recipientId,
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          notificationId: mockNotificationResponse.id,
          deliveryStatus: mockNotificationResponse.status,
        },
      });
    });

    it('should handle send errors', async () => {
      const error = new Error('Notification error');
      mockedApi.post.mockRejectedValueOnce(error);

      await expect(
        notificationService.sendNotification(mockNotificationRequest)
      ).rejects.toThrow('Notification error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_SEND',
        resourceId: mockNotificationRequest.recipientId,
        resourceType: 'notification',
        status: 'INITIATED',
        metadata: {
          type: mockNotificationRequest.type,
          data: mockNotificationRequest.data,
        },
      });

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_SEND',
        resourceId: mockNotificationRequest.recipientId,
        resourceType: 'notification',
        status: 'ERROR',
        metadata: {
          error: error.message,
          request: mockNotificationRequest,
        },
      });
    });
  });

  describe('getNotificationStatus', () => {
    it('should get notification status successfully', async () => {
      mockedApi.get.mockResolvedValueOnce({
        success: true,
        data: {
          data: mockNotificationResponse,
        },
        meta: {
          timestamp: '2025-01-08T14:16:27-07:00',
          requestId: 'test-request-id',
        },
      } as ApiSuccessResponse<{ data: NotificationResponse }>);

      const result = await notificationService.getNotificationStatus(
        'notification123'
      );

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/api/v1/notifications/status/notification123'
      );

      expect(result).toEqual(mockNotificationResponse);
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_STATUS',
        resourceId: 'notification123',
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          deliveryStatus: mockNotificationResponse.status,
        },
      });
    });

    it('should handle status check errors', async () => {
      const error = new Error('Status check error');
      mockedApi.get.mockRejectedValueOnce(error);

      await expect(
        notificationService.getNotificationStatus('notification123')
      ).rejects.toThrow('Status check error');

      expect(mockedAuditService.logEvent).toHaveBeenCalledWith({
        eventType: 'NOTIFICATION_STATUS',
        resourceId: 'notification123',
        resourceType: 'notification',
        status: 'ERROR',
        metadata: {
          error: error.message,
        },
      });
    });
  });
});
