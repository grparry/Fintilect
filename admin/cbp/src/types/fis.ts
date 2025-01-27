

export type FISExceptionStatus = 'PENDING' | 'RESOLVED' | 'IGNORED';
export interface FISException {
  id: string;
  status: FISExceptionStatus;
  createdAt: string;
  updatedAt: string;
  type: string;
  message: string;
  details: Record<string, any>;
}
export interface FISRetryResult {
  success: boolean;
  message: string;
}
export interface FISExceptionFilters {
  status?: FISExceptionStatus[];
  startDate?: string;
  endDate?: string;
  errorCodes?: string[];
  searchTerm?: string;
}
export interface FISResponseHistory {
  id: string;
  timestamp: string;
  status: string;
  message: string;
  details?: Record<string, any>;
}
export interface ExceptionStats {
  total: number;
  pending: number;
  resolved: number;
  ignored: number;
  byErrorCode: Record<string, number>;
}