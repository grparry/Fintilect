import { NotificationTemplateData } from '../../types/notification';

export const getSubject = (data: NotificationTemplateData): string => {
  return `Exception ${data.exceptionId} Updated`;
};

export const getBody = (data: NotificationTemplateData): string => {
  const { exceptionId, correctionType, notes, userId, timestamp } = data;
  const date = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

  return `
Exception Update Notification

Exception ID: ${exceptionId}
Updated By: ${userId}
Date: ${date}

Changes Made:
${correctionType ? `- Correction Type: ${correctionType}` : ''}
${notes ? `- Notes: ${notes}` : ''}

Please review these changes in the exception management system.

This is an automated notification. Please do not reply to this email.
`;
};
