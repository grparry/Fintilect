import { NotificationTemplate, NotificationTemplateData } from '@/../types/notification';
import * as exceptionUpdated from '@/exception-updated';
import * as exceptionRefunded from '@/exception-refunded';
import * as exceptionCreated from '@/exception-created';

const templates = {
  [NotificationTemplate.EXCEPTION_UPDATED]: exceptionUpdated,
  [NotificationTemplate.EXCEPTION_REFUNDED]: exceptionRefunded,
  [NotificationTemplate.EXCEPTION_CREATED]: exceptionCreated
};

export const getNotificationContent = (
  template: NotificationTemplate,
  data: NotificationTemplateData
): { subject: string; body: string } => {
  const templateModule = templates[template];
  if (!templateModule) {
    throw new Error(`Template ${template} not found`);
  }

  return {
    subject: templateModule.getSubject(data),
    body: templateModule.getBody(data)
  };
};
