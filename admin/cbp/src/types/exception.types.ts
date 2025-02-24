

export type ExceptionSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ExceptionStatus = 'NEW' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type ExceptionCategory = 
  | 'PAYMENT_PROCESSING' 
  | 'SECURITY' 
  | 'VALIDATION' 
  | 'SYSTEM' 
  | 'INTEGRATION'
  | 'RATE_LIMIT'
  | 'DATA_INTEGRITY';
export interface Exception {
  id: string;
  payeeAttentionLine: string;
  payeeTelephoneNumber: string;
  payeeAddress1: string;
  payeeAddress2: string;
  payeeCity: string;
  payeeState: string;
  payeeZip: string;
  payeeCountry: string;
  payeeNickname: string;
  clientPayeeId: string;
  clientPayeeAccountNumber: string;
  confirmationNumber: string;
  transactionAmount: string;
  memoLineInfo: string;
  serviceRequestNumber: string;
}

export interface CreateExceptionRequest {
  message: string;
  category: ExceptionCategory;
  severity: ExceptionSeverity;
}
export interface UpdateExceptionRequest {
  status?: ExceptionStatus;
  assignedTo?: string;
  resolution?: string;
}
export interface ExceptionFilter {
  category?: ExceptionCategory[];
  severity?: ExceptionSeverity[];
  status?: ExceptionStatus[];
  startDate?: string;
  endDate?: string;
  assignedTo?: string;
}
export interface ExceptionStats {
  totalCount: number;
  bySeverity: Record<ExceptionSeverity, number>;
  byCategory: Record<ExceptionCategory, number>;
  byStatus: Record<ExceptionStatus, number>;
  mttr: number; // Mean Time To Resolution (in minutes)
}
export interface Error {
  message: string;
  code: string;
}
export interface ApiError extends Error {
  status: number;
  timestamp: string;
  path: string;
  details?: Record<string, any>;
}