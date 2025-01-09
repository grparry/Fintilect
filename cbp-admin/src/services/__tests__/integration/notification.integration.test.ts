import { jest } from '@jest/globals';
import { notificationService } from '../../integrations/notification.service';
import { auditService } from '../../audit.service';
import api from '../../api';
import {
  NotificationType,
  NotificationRequest,
  NotificationResponse,
  NotificationConfig,
} from '../../../types/bill-pay.types';
import { ApiSuccessResponse, ApiRequestOptions } from '../../../types/api.types';

// Mock dependencies
jest.mock('../../api');
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
    type: 'PAYMENT_COMPLETED',
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

    // Mock config endpoint
    mockedApi.get.mockImplementation(<T>(endpoint: string, _config?: Omit<ApiRequestOptions, 'method'>): Promise<ApiSuccessResponse<T>> => {
      if (endpoint.includes('/config')) {
        return Promise.resolve({
          success: true,
          data: { data: mockNotificationConfig },
        }) as Promise<ApiSuccessResponse<T>>;
      }
      return Promise.resolve({
        success: true,
        data: {},
      }) as Promise<ApiSuccessResponse<T>>;
    });

    // Mock audit service
    mockedAuditService.logEvent.mockResolvedValue(undefined);
  });

  describe('Notification Flow', () => {
    it('should successfully send a notification and verify its status', async () => {
      // Mock successful notification send
      const mockResponse: NotificationResponse = {
        id: 'notification_1',
        status: 'DELIVERED',
        type: 'PAYMENT_COMPLETED',
        recipientId: 'test_recipient',
        channel: 'email',
        sentAt: new Date().toISOString(),
      };

      mockedApi.post.mockImplementation(<T>(_endpoint: string, _data?: unknown, _config?: Omit<ApiRequestOptions, 'method'>): Promise<ApiSuccessResponse<T>> => {
        return Promise.resolve({
          success: true,
          data: { data: mockResponse },
        }) as Promise<ApiSuccessResponse<T>>;
      });

      // Send notification
      const response = await notificationService.sendNotification(mockNotificationRequest);

      // Verify notification response
      expect(response).toEqual(mockResponse);

      // Verify audit logs for notification send
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_SEND',
          resourceId: mockNotificationRequest.recipientId,
          resourceType: 'notification',
          status: 'COMPLETED',
          metadata: expect.objectContaining({
            notificationId: mockResponse.id,
            deliveryStatus: mockResponse.status,
          }),
        })
      );

      // Mock status check response
      mockedApi.get.mockImplementation(<T>(endpoint: string, _config?: Omit<ApiRequestOptions, 'method'>): Promise<ApiSuccessResponse<T>> => {
        if (endpoint.includes('/status')) {
          return Promise.resolve({
            success: true,
            data: { data: mockResponse },
          }) as Promise<ApiSuccessResponse<T>>;
        }
        return Promise.resolve({
          success: true,
          data: { data: mockNotificationConfig },
        }) as Promise<ApiSuccessResponse<T>>;
      });

      // Check notification status
      const statusResponse = await notificationService.getNotificationStatus(mockResponse.id);

      // Verify status response
      expect(statusResponse).toEqual(mockResponse);

      // Verify audit logs for status check
      expect(mockedAuditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'NOTIFICATION_STATUS',
          resourceId: mockResponse.id,
          resourceType: 'notification',
          status: 'COMPLETED',
          metadata: expect.objectContaining({
            deliveryStatus: 'DELIVERED',
          }),
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
            request: mockNotificationRequest,
          }),
        })
      );
    });

    it('should handle status check failures and log errors', async () => {
      // Mock API error
      const mockError = new Error('Failed to get notification status');
      mockedApi.get.mockImplementation(<T>(endpoint: string, _config?: Omit<ApiRequestOptions, 'method'>): Promise<ApiSuccessResponse<T>> => {
        if (endpoint.includes('/status')) {
          return Promise.reject(mockError);
        }
        return Promise.resolve({
          success: true,
          data: { data: mockNotificationConfig },
        }) as Promise<ApiSuccessResponse<T>>;
      });

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
});
