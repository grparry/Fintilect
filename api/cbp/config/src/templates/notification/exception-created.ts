import { NotificationTemplateData } from '@cbp-config-api/../types/notification';

export const getSubject = (data: NotificationTemplateData): string => {
  return `New Exception ${data.exceptionId} Created`;
};

export const getBody = (data: NotificationTemplateData): string => {
  const { exceptionId, userId, timestamp } = data;
  const date = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

  return `
New Exception Created

Exception ID: ${exceptionId}
Created By: ${userId}
Date: ${date}

A new exception has been created in the system. Please review it at your earliest convenience.

This is an automated notification. Please do not reply to this email.
`;
};
