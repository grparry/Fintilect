import { PaginatedResponse } from './common';

export enum ExceptionHistoryType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  REFUND_CHECKED = 'REFUND_CHECKED',
  NOTIFICATION_SENT = 'NOTIFICATION_SENT'
}

export interface ExceptionHistoryDetails {
  before?: Record<string, any>;
  after?: Record<string, any>;
  metadata?: Record<string, any>;
  changes?: Record<string, any>;
  paymentId?: string;
  result?: Record<string, any>;
  notificationType?: string;
  recipients?: string[];
  message?: string;
}

export interface ExceptionHistory {
  id: number;
  exceptionId: number;
  type: ExceptionHistoryType;
  userId: string;
  timestamp: Date;
  details: ExceptionHistoryDetails;
}

export interface ExceptionHistorySearchRequest {
  exceptionId?: number;
  type?: ExceptionHistoryType[];
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  page?: number;
  pageSize?: number;
}

export interface ExceptionHistorySearchResponse extends PaginatedResponse<ExceptionHistory> {}

export interface ExceptionHistoryCreateRequest {
  exceptionId: number;
  type: ExceptionHistoryType;
  userId: string;
  details: ExceptionHistoryDetails;
}
