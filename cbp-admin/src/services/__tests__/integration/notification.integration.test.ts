import { jest } from '@jest/globals';
import { notificationService } from '../../notification.service';
import { auditService } from '../../audit.service';
import { api } from '../../../utils/api';
import {
  NotificationType,
  NotificationRequest,
  NotificationResponse,
  NotificationConfig,
} from '../../../types/bill-pay.types';
import { ApiResponse } from '../../../types/api.types';

// Mock dependencies
jest.mock('../../../utils/api');
jest.mock('../../audit.service');

// Type the mocked modules
const mockedApi = api as jest.Mocked<typeof api>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;

describe('Notification Service Integration', () => {
  // Test data
  const mockNotificationConfig: NotificationConfig = {
    providers: {
      email: {
        enabled: true,
        provider: 'sendgrid',
        apiKey: 'test_key',
        fromEmail: 'test@example.com',
        templates: {
          PAYMENT_COMPLETED: 'template_payment_complete',
          PAYMENT_FAILED: 'template_payment_failed',
          PAYMENT_APPROVAL_REQUIRED: 'template_approval_required',
          PAYMENT_CANCELLED: 'template_payment_cancelled',
          PAYMENT_EXPIRED: 'template_payment_expired'
        },
      },
      sms: {
        enabled: true,
        provider: 'twilio',
        apiKey: 'test_key',
        fromNumber: '+1234567890',
        templates: {
          PAYMENT_COMPLETED: 'sms_payment_complete',
          PAYMENT_FAILED: 'sms_payment_failed',
          PAYMENT_APPROVAL_REQUIRED: 'sms_approval_required',
          PAYMENT_CANCELLED: 'sms_payment_cancelled',
          PAYMENT_EXPIRED: 'sms_payment_expired'
        },
      },
    },
    defaultChannel: 'email',
  };

  const mockNotificationRequest: NotificationRequest = {
    type: NotificationType.PAYMENT_COMPLETED,
    recipientId: 'test_recipient',
    data: {
      paymentId: 'test_payment_1',
      amount: 100,
      currency: 'USD',
    },
  };

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Reset cached config
    (notificationService as any).notificationConfig = null;

    // Mock successful responses
    mockedApi.get.mockImplementation(<T>(url: string) => {
      if (url.includes('config')) {
        return Promise.resolve({
          success: true,
          data: mockNotificationConfig,
        } as ApiResponse<T>);
      } else if (url.includes('status')) {
        return Promise.resolve({
          success: true,
          data: {
            id: 'notification_1',
            status: 'DELIVERED',
            type: NotificationType.PAYMENT_COMPLETED,
            recipientId: 'test_recipient',
            channel: 'email',
            sentAt: new Date().toISOString(),
          },
        } as ApiResponse<T>);
      }
      return Promise.resolve({
        success: true,
        data: [],
      } as ApiResponse<T>);
    });

    mockedApi.post.mockImplementation(<T>() => Promise.resolve({
      success: true,
      data: {
        id: 'notification_1',
        status: 'DELIVERED',
        type: NotificationType.PAYMENT_COMPLETED,
        recipientId: 'test_recipient',
        channel: 'email',
        sentAt: new Date().toISOString(),
      },
    } as ApiResponse<T>));

    // Mock audit service
    mockedAuditService.logEvent.mockResolvedValue(undefined);
  });

  describe('Notification Flow', () => {
    it('should successfully send a notification and verify its status', async () => {
      // Send notification
      const response = await notificationService.sendNotification(mockNotificationRequest);

      // Verify API call
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/notifications',
        mockNotificationRequest
      );

      // Verify notification response
      expect(response).toEqual(expect.objectContaining({
        id: 'notification_1',
        status: 'DELIVERED',
        type: NotificationType.PAYMENT_COMPLETED,
      }));

      // Verify audit logs for notification send
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_SEND',
          resourceId: mockNotificationRequest.recipientId,
          resourceType: 'notification',
          status: 'COMPLETED',
        })
      );

      // Check notification status
      const statusResponse = await notificationService.getNotificationStatus(response.id);

      // Verify status response
      expect(statusResponse).toEqual({
        ...response,
        sentAt: expect.any(String),
      });

      // Verify audit logs for status check
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_STATUS',
          resourceId: response.id,
          resourceType: 'notification',
          status: 'COMPLETED',
        })
      );
    });

    it('should handle notification send failures and log errors', async () => {
      // Mock API error
      const mockError = new Error('Failed to send notification');
      mockedApi.post.mockRejectedValue(mockError);

      // Attempt to send notification and expect error
      await expect(notificationService.sendNotification(mockNotificationRequest))
        .rejects.toThrow('Failed to send notification');

      // Verify error was logged
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_SEND',
          resourceId: mockNotificationRequest.recipientId,
          resourceType: 'notification',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: mockError.message,
          }),
        })
      );
    });

    it('should handle status check failures and log errors', async () => {
      // Mock API error
      const mockError = new Error('Failed to get notification status');
      mockedApi.get.mockRejectedValue(mockError);

      // Attempt to check status and expect error
      await expect(notificationService.getNotificationStatus('notification_1'))
        .rejects.toThrow('Failed to get notification status');

      // Verify error was logged
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_STATUS',
          resourceId: 'notification_1',
          resourceType: 'notification',
          status: 'ERROR',
          metadata: expect.objectContaining({
            error: mockError.message,
          }),
        })
      );
    });
  });

  describe('Configuration Management', () => {
    it('should get notification config and cache it', async () => {
      // Get config first time
      const config1 = await notificationService.getConfig();
      expect(config1).toEqual(mockNotificationConfig);
      expect(mockedApi.get).toHaveBeenCalledTimes(1);

      // Get config second time (should use cache)
      const config2 = await notificationService.getConfig();
      expect(config2).toEqual(mockNotificationConfig);
      expect(mockedApi.get).toHaveBeenCalledTimes(1); // Still 1 because of caching
    });

    it('should update notification config and update cache', async () => {
      const updatedConfig = {
        ...mockNotificationConfig,
        defaultChannel: 'sms',
      };

      mockedApi.put.mockResolvedValue({
        success: true,
        data: updatedConfig,
      } as ApiResponse<NotificationConfig>);

      // Update config
      const config = await notificationService.updateConfig({ defaultChannel: 'sms' });
      expect(config).toEqual(updatedConfig);

      // Get config should return updated cached version
      const cachedConfig = await notificationService.getConfig();
      expect(cachedConfig).toEqual(updatedConfig);
      expect(mockedApi.get).not.toHaveBeenCalled(); // Should use cache
    });
  });

  describe('History and Management', () => {
    it('should get notification history with filters', async () => {
      const mockHistory = [
        {
          id: 'notification_1',
          status: 'DELIVERED',
          type: NotificationType.PAYMENT_COMPLETED,
          recipientId: 'test_recipient',
          channel: 'email',
          sentAt: new Date().toISOString(),
        },
      ];

      mockedApi.get.mockResolvedValue({
        success: true,
        data: mockHistory,
      } as ApiResponse<NotificationResponse[]>);

      const history = await notificationService.getHistory('test_recipient', {
        type: NotificationType.PAYMENT_COMPLETED,
        status: 'DELIVERED',
      });

      expect(history).toEqual(mockHistory);
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/notifications/history/test_recipient')
      );
    });

    it('should resend a failed notification', async () => {
      const mockResponse = {
        id: 'notification_2',
        status: 'SENT',
        type: NotificationType.PAYMENT_COMPLETED,
        recipientId: 'test_recipient',
        channel: 'email',
        sentAt: new Date().toISOString(),
      };

      mockedApi.post.mockResolvedValue({
        success: true,
        data: mockResponse,
      } as ApiResponse<NotificationResponse>);

      const response = await notificationService.resend('notification_1');
      expect(response).toEqual(mockResponse);
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/api/v1/notifications/notification_1/resend',
        {}
      );
    });

    it('should cancel a pending notification', async () => {
      mockedApi.delete.mockResolvedValue({
        success: true,
        data: undefined,
      } as ApiResponse<void>);

      await notificationService.cancel('notification_1');
      expect(mockedApi.delete).toHaveBeenCalledWith(
        '/api/v1/notifications/notification_1'
      );
    });
  });
});
