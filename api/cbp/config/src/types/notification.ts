import { ServiceResponse } from './common';

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}

export enum NotificationTemplate {
  EXCEPTION_UPDATED = 'EXCEPTION_UPDATED',
  EXCEPTION_REFUNDED = 'EXCEPTION_REFUNDED',
  EXCEPTION_CREATED = 'EXCEPTION_CREATED'
}

export interface NotificationRecipient {
  email?: string;
  phone?: string;
  name?: string;
}

export interface NotificationTemplateData {
  exceptionId?: number;
  paymentId?: string;
  amount?: number;
  status?: string;
  correctionType?: string;
  notes?: string;
  userId?: string;
  timestamp?: Date;
  [key: string]: any;
}

export interface NotificationRequest {
  template: NotificationTemplate;
  type: NotificationType;
  recipients: NotificationRecipient[];
  data: NotificationTemplateData;
  userId: string;
}

export interface NotificationResponse {
  id: number;
  type: NotificationType;
  template: NotificationTemplate;
  recipients: NotificationRecipient[];
  data: NotificationTemplateData;
  userId: string;
  status: 'SENT' | 'FAILED';
  error?: string;
  createdAt?: Date;
}

export interface NotificationHistory {
  id: number;
  type: NotificationType;
  template: NotificationTemplate;
  recipients: NotificationRecipient[];
  data: NotificationTemplateData;
  userId: string;
  status: 'SENT' | 'FAILED';
  error?: string;
  createdAt: Date;
}

export interface NotificationHistorySearchRequest {
  startDate?: Date;
  endDate?: Date;
  type?: NotificationType;
  template?: NotificationTemplate;
  userId?: string;
  status?: 'SENT' | 'FAILED';
  page?: number;
  pageSize?: number;
}

export interface NotificationHistorySearchResponse extends ServiceResponse<NotificationHistory[]> {
  totalCount: number;
  page: number;
  pageSize: number;
}
