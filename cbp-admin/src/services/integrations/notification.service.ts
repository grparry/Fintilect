import api from '../api';
import {
  NotificationType,
  NotificationRequest,
  NotificationResponse,
  NotificationConfig,
} from '../../types/bill-pay.types';
import { ApiSuccessResponse } from '../../types/api.types';
import { auditService } from '../audit.service';

class NotificationService {
  private readonly baseUrl = '/api/v1/notifications';
  private notificationConfig: NotificationConfig | null = null;

  private async getConfig(): Promise<NotificationConfig> {
    if (!this.notificationConfig) {
      const response = await api.get<{ data: NotificationConfig }>(
        `${this.baseUrl}/config`
      );
      this.notificationConfig = response.data.data;
    }
    return this.notificationConfig;
  }

  public async sendNotification(
    request: NotificationRequest
  ): Promise<NotificationResponse> {
    const config = await this.getConfig();

    try {
      // Pre-send logging
      await auditService.logEvent({
        eventType: 'NOTIFICATION_SEND',
        resourceId: request.recipientId,
        resourceType: 'notification',
        status: 'INITIATED',
        metadata: {
          type: request.type,
          data: request.data,
        },
      });

      // Send notification
      const response = await api.post<ApiSuccessResponse<NotificationResponse>>(
        `${this.baseUrl}/send`,
        {
          ...request,
          config,
        }
      );

      // Post-send logging
      await auditService.logEvent({
        eventType: 'NOTIFICATION_SEND',
        resourceId: request.recipientId,
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          notificationId: response.data.data.id,
          deliveryStatus: response.data.data.status,
        },
      });

      return response.data.data;
    } catch (err) {
      const error = err as Error;
      await auditService.logEvent({
        eventType: 'NOTIFICATION_SEND',
        resourceId: request.recipientId,
        resourceType: 'notification',
        status: 'ERROR',
        metadata: {
          error: error.message,
          request,
        },
      });

      throw error;
    }
  }

  public async getNotificationStatus(
    notificationId: string
  ): Promise<NotificationResponse> {
    try {
      const response = await api.get<ApiSuccessResponse<NotificationResponse>>(
        `${this.baseUrl}/status/${notificationId}`
      );

      await auditService.logEvent({
        eventType: 'NOTIFICATION_STATUS',
        resourceId: notificationId,
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          deliveryStatus: response.data.data.status,
        },
      });

      return response.data.data;
    } catch (err) {
      const error = err as Error;
      await auditService.logEvent({
        eventType: 'NOTIFICATION_STATUS',
        resourceId: notificationId,
        resourceType: 'notification',
        status: 'ERROR',
        metadata: {
          error: error.message,
        },
      });

      throw error;
    }
  }
}

export const notificationService = new NotificationService();
