import { PaginatedResponse } from '@cbp-config-api/common';

export enum ExceptionErrorCodes {
  NOT_FOUND = 'EXCEPTION_NOT_FOUND',
  SEARCH_FAILED = 'EXCEPTION_SEARCH_FAILED',
  RETRIEVAL_FAILED = 'EXCEPTION_RETRIEVAL_FAILED',
  UPDATE_FAILED = 'EXCEPTION_UPDATE_FAILED',
  REFUND_VALIDATION_FAILED = 'EXCEPTION_REFUND_VALIDATION_FAILED',
  NOTIFICATION_FAILED = 'EXCEPTION_NOTIFICATION_FAILED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  REPROCESS_FAILED = 'EXCEPTION_REPROCESS_FAILED',
  REFUND_FAILED = 'EXCEPTION_REFUND_FAILED',
  RESOLVE_FAILED = 'EXCEPTION_RESOLVE_FAILED'
}

export interface FisException {
  id: number;
  payeeAttentionLine?: string;
  payeeTelephoneNumber?: string;
  payeeAddress1?: string;
  payeeAddress2?: string;
  payeeCity?: string;
  payeeState?: string;
  payeeZip?: string;
  payeeCountry?: string;
  payeeNickname?: string;
  customerPayeeId?: string;
  customerPayeeAccountNumber?: string;
  confirmationNumber?: string;
  transactionAmount?: string;
  memoLineInfo?: string;
  serviceRequestNumber?: string;
  serviceRequestDate: Date;
  serviceRequestTime?: string;
  serviceRequestType?: string;
  problemCauseType?: string;
  effectiveDate?: string;
  deliverByDate?: string;
  payeeName?: string;
  status?: string;
  resolution?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExceptionSearchRequest {
  page?: number;
  pageSize?: number;
  startDate?: Date;
  endDate?: Date;
  type?: string;
  status?: string;
}

export interface ExceptionSearchResponse {
  items: FisException[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ExceptionUpdateRequest {
  id: number;
  status: string;
  resolution?: string;
  notes?: string;
}

export interface ExceptionRefundRequest {
  exceptionId: number;
  amount: number;
}

export interface ExceptionRefundResponse {
  isValid: boolean;
  adjustmentAmount: number;
  validationMessages: string[];
}

export interface ExceptionNotificationRequest {
  exceptionId: number;
  notificationType: string;
  recipients: string[];
}

export class ExceptionError extends Error {
  constructor(
    public code: ExceptionErrorCodes,
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ExceptionError';
  }
}
