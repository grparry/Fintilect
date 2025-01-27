

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
export interface ExceptionMetadata {
  userId?: string;
  resourceId?: string;
  resourceType?: string;
  correlationId?: string;
  stackTrace?: string;
  [key: string]: any;
}
export interface Exception {
  id: string;
  message: string;
  category: ExceptionCategory;
  severity: ExceptionSeverity;
  status: ExceptionStatus;
  metadata: ExceptionMetadata;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  resolution?: string;
}
export interface CreateExceptionRequest {
  message: string;
  category: ExceptionCategory;
  severity: ExceptionSeverity;
  metadata?: ExceptionMetadata;
}
export interface UpdateExceptionRequest {
  status?: ExceptionStatus;
  assignedTo?: string;
  resolution?: string;
  metadata?: ExceptionMetadata;
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