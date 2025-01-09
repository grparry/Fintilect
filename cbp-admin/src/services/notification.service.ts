import { api } from '../utils/api';
import {
  NotificationRequest,
  NotificationResponse,
  NotificationType,
  NotificationConfig,
} from '../types/bill-pay.types';
import { auditService } from './audit.service';
import { ApiResponse } from '../types/api.types';

class NotificationService {
  private notificationConfig: NotificationConfig | null = null;

  /**
   * Send a notification to a recipient
   * @param request The notification request containing type, recipient, and data
   * @returns The notification response with delivery status
   */
  async sendNotification(request: NotificationRequest): Promise<NotificationResponse> {
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

      const response = await api.post<NotificationResponse>('/api/v1/notifications', request);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to send notification');
      }

      // Post-send logging
      await auditService.logEvent({
        eventType: 'NOTIFICATION_SEND',
        resourceId: request.recipientId,
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          notificationId: response.data.id,
          deliveryStatus: response.data.status,
        },
      });

      return response.data;
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

  /**
   * Get notification status
   * @param notificationId The ID of the notification
   * @returns The notification response with current status
   */
  async getNotificationStatus(notificationId: string): Promise<NotificationResponse> {
    try {
      const response = await api.get<NotificationResponse>(`/api/v1/notifications/${notificationId}/status`);
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to get notification status');
      }

      await auditService.logEvent({
        eventType: 'NOTIFICATION_STATUS',
        resourceId: notificationId,
        resourceType: 'notification',
        status: 'COMPLETED',
        metadata: {
          deliveryStatus: response.data.status,
        },
      });

      return response.data;
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

  /**
   * Get notification configuration
   * @returns The current notification configuration
   */
  async getConfig(): Promise<NotificationConfig> {
    if (!this.notificationConfig) {
      const response = await api.get<NotificationConfig>('/api/v1/notifications/config');
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to get notification config');
      }
      this.notificationConfig = response.data;
    }
    return this.notificationConfig;
  }

  /**
   * Update notification configuration
   * @param config The new notification configuration
   * @returns The updated notification configuration
   */
  async updateConfig(config: Partial<NotificationConfig>): Promise<NotificationConfig> {
    const response = await api.put<NotificationConfig>('/api/v1/notifications/config', config);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to update notification config');
    }
    this.notificationConfig = response.data;
    return response.data;
  }

  /**
   * Get notification history for a recipient
   * @param recipientId The ID of the recipient
   * @param filters Optional filters for the notification history
   * @returns Array of notification responses
   */
  async getHistory(
    recipientId: string,
    filters?: {
      type?: NotificationType;
      startDate?: string;
      endDate?: string;
      status?: 'SENT' | 'DELIVERED' | 'FAILED';
      channel?: 'email' | 'sms';
    }
  ): Promise<NotificationResponse[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const response = await api.get<NotificationResponse[]>(
      `/api/v1/notifications/history/${recipientId}?${queryParams.toString()}`
    );
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to get notification history');
    }
    return response.data;
  }

  /**
   * Resend a failed notification
   * @param notificationId The ID of the failed notification
   * @returns The new notification response
   */
  async resend(notificationId: string): Promise<NotificationResponse> {
    const response = await api.post<NotificationResponse>(
      `/api/v1/notifications/${notificationId}/resend`,
      {}
    );
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to resend notification');
    }
    return response.data;
  }

  /**
   * Cancel a pending notification
   * @param notificationId The ID of the pending notification
   */
  async cancel(notificationId: string): Promise<void> {
    const response = await api.delete<void>(`/api/v1/notifications/${notificationId}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to cancel notification');
    }
  }
}

export const notificationService = new NotificationService();
