import { Database } from '@cbp-config-api/config/db';
import { logger } from '@cbp-config-api/config/logger';
import { getNotificationContent } from '@cbp-config-api/templates/notification';
import {
  NotificationRequest,
  NotificationResponse,
  NotificationHistory,
  NotificationHistorySearchRequest,
  NotificationHistorySearchResponse,
  NotificationType
} from '@cbp-config-api/types/notification';
import { ServiceResponse } from '@cbp-config-api/types/common';
import { HttpError } from '@cbp-config-api/utils/errors';

export class NotificationService {
  constructor(private db: Database) {}

  async sendNotification(request: NotificationRequest): Promise<ServiceResponse<NotificationResponse>> {
    try {
      const { template, type, recipients, data, userId } = request;
      const { subject, body } = getNotificationContent(template, data);

      // Handle different notification types
      switch (type) {
        case NotificationType.EMAIL:
          // Get email recipients
          const emailRecipients = recipients
            .filter(r => r.email)
            .map(r => r.email as string);

          if (emailRecipients.length === 0) {
            throw new HttpError(400, 'No valid email recipients provided');
          }

          // Log email sending attempt
          logger.info('Sending email:', { to: emailRecipients, subject, body });

          // Create notification history record
          const result = await this.db.executeStoredProcedure<{ Id: number }>('CreateNotificationHistory', {
            Type: type,
            Template: template,
            Recipients: JSON.stringify(recipients),
            Data: JSON.stringify(data),
            UserId: userId,
            Status: 'SENT'
          });

          if (!result.recordset?.[0]?.Id) {
            throw new HttpError(500, 'Failed to create notification history record');
          }

          return {
            success: true,
            data: {
              id: result.recordset[0].Id,
              type,
              template,
              recipients,
              data,
              userId,
              status: 'SENT',
              createdAt: new Date()
            }
          };

        case NotificationType.SMS:
          // SMS implementation will go here
          throw new HttpError(501, 'SMS notifications not yet implemented');

        default:
          throw new HttpError(400, `Unsupported notification type: ${type}`);
      }
    } catch (error) {
      logger.error('Failed to send notification:', error);
      return {
        success: false,
        error: {
          code: error instanceof HttpError ? error.statusCode.toString() : 'NOTIFICATION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      };
    }
  }

  async searchNotificationHistory(request: NotificationHistorySearchRequest): Promise<ServiceResponse<NotificationHistory[]> & NotificationHistorySearchResponse> {
    try {
      const {
        startDate,
        endDate,
        type,
        template,
        userId,
        status,
        page = 1,
        pageSize = 10
      } = request;

      const result = await this.db.executeStoredProcedure<NotificationHistory & { TotalCount: number }>('SearchNotificationHistory', {
        StartDate: startDate ?? null,
        EndDate: endDate ?? null,
        Type: type ?? null,
        Template: template ?? null,
        UserId: userId ?? null,
        Status: status ?? null,
        Page: page,
        PageSize: pageSize
      });

      const records = result.recordset?.map(record => ({
        id: record.id,
        type: record.type,
        template: record.template,
        recipients: JSON.parse(record.recipients as unknown as string),
        data: JSON.parse(record.data as unknown as string),
        userId: record.userId,
        status: record.status,
        error: record.error,
        createdAt: record.createdAt
      })) ?? [];

      const totalCount = result.recordset?.[0]?.TotalCount ?? 0;

      return {
        success: true,
        data: records,
        totalCount,
        page,
        pageSize
      };
    } catch (error) {
      logger.error('Failed to search notification history:', error);
      return {
        success: false,
        error: {
          code: error instanceof HttpError ? error.statusCode.toString() : 'NOTIFICATION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        },
        totalCount: 0,
        page: 1,
        pageSize: 10,
        data: []
      };
    }
  }

  private async sendEmail(
    recipients: NotificationRequest['recipients'],
    subject: string,
    body: string
  ): Promise<ServiceResponse<void>> {
    // TODO: Implement email sending using your preferred email service
    // This is a placeholder that logs the email
    logger.info('Sending email:', {
      to: recipients.map(r => r.email).filter(Boolean),
      subject,
      body
    });
    return { success: true };
  }

  private async sendSMS(
    recipients: NotificationRequest['recipients'],
    message: string
  ): Promise<ServiceResponse<void>> {
    // TODO: Implement SMS sending using your preferred SMS service
    // This is a placeholder that logs the SMS
    logger.info('Sending SMS:', {
      to: recipients.map(r => r.phone).filter(Boolean),
      message
    });
    return { success: true };
  }
}
