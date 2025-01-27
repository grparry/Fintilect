import { NotificationTemplateData } from '@/../types/notification';

export const getSubject = (data: NotificationTemplateData): string => {
  return `Exception ${data.exceptionId} Refund Status Update`;
};

export const getBody = (data: NotificationTemplateData): string => {
  const { exceptionId, paymentId, amount, status, userId, timestamp } = data;
  const date = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

  return `
Refund Status Update

Exception ID: ${exceptionId}
Payment ID: ${paymentId}
Amount: $${amount?.toFixed(2) || 'N/A'}
Status: ${status}
Updated By: ${userId}
Date: ${date}

Please review the refund status in the exception management system.

This is an automated notification. Please do not reply to this email.
`;
};
