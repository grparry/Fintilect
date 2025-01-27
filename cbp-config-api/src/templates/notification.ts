import { NotificationTemplate, NotificationTemplateData } from '@/types/notification';
import { HttpError } from '@/utils/errors';

interface NotificationContent {
  subject: string;
  body: string;
}

export function getNotificationContent(template: NotificationTemplate, data: NotificationTemplateData): NotificationContent {
  switch (template) {
    case NotificationTemplate.EXCEPTION_CREATED:
      return {
        subject: `New Exception Created: ${data.exceptionId}`,
        body: `A new exception has been created with ID ${data.exceptionId}.
              ${data.notes ? `\nNotes: ${data.notes}` : ''}`
      };

    case NotificationTemplate.EXCEPTION_UPDATED:
      return {
        subject: `Exception Updated: ${data.exceptionId}`,
        body: `Exception ${data.exceptionId} has been updated.
              ${data.correctionType ? `\nCorrection Type: ${data.correctionType}` : ''}
              ${data.notes ? `\nNotes: ${data.notes}` : ''}`
      };

    case NotificationTemplate.EXCEPTION_REFUNDED:
      return {
        subject: `Exception Refunded: ${data.exceptionId}`,
        body: `Exception ${data.exceptionId} has been refunded.
              ${data.notes ? `\nNotes: ${data.notes}` : ''}`
      };

    default:
      throw new HttpError(400, `Unsupported notification template: ${template}`);
  }
}
