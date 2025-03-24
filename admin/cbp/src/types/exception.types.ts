export type ExceptionSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export enum ExceptionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}
export type ExceptionCategory = 
  | 'PAYMENT_PROCESSING' 
  | 'SECURITY' 
  | 'VALIDATION' 
  | 'SYSTEM' 
  | 'INTEGRATION'
  | 'RATE_LIMIT'
  | 'DATA_INTEGRITY';

// Updated to match ExceptionResponse schema from API spec
export interface Exception {
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
  serviceRequestDate: string; // date-time format
  serviceRequestTime?: string;
  serviceRequestType?: string;
  problemCauseType?: string;
  effectiveDate?: string;
  deliverByDate?: string;
  payeeName?: string;
  checkNumber?: string;
  payeeChangeIndicator?: string;
  customerTelephone?: string;
  recordType?: string;
  sponsorTransactionId?: string;
  sponsorId?: string;
  sponsorName?: string;
  customerId?: string;
  customerChangeIndicator?: string;
  primaryCustomerFirstName?: string;
  primaryCustomerLastName?: string;
  primaryCustomerSsn?: string;
  secondaryCustomerFirstName?: string;
  secondaryCustomerLastName?: string;
  secondaryCustomerSsn?: string;
  created: string; // date-time format
  correctionMade?: boolean;
  status?: ExceptionStatus; 
  priority?: string; 
}

export interface ExceptionListResponse {
  exceptions: Exception[] | null;
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

// Updated to match ExceptionSearchRequest schema from API spec
export interface ExceptionFilter {
  date?: string; // date-time format
  endDate?: string; // date-time format
  sponsorIds?: string[];
  correctionMade?: boolean;
}

export interface ExceptionStats {
  totalCount: number;
  byStatus: Record<ExceptionStatus, number>;
  byCategory: Record<ExceptionCategory, number>;
  bySeverity: Record<ExceptionSeverity, number>;
  avgResolutionTime: number;
}

export interface Error {
  message: string;
  code: string;
}

export interface ApiError {
  status: number;
  timestamp: string;
  path: string;
  details?: Record<string, any>;
}

export enum ExceptionCorrectionType {
  AccountNumber = 1,
  Manual = 2,
  MemberRefunded = 3,
  FisPayeeId = 4
}

export interface ExceptionCorrection {
  id: number;
  correctionType: ExceptionCorrectionType;
  usersAccountAtPayee?: string;
  manualDescription?: string;
  fisPayeeId?: string;
}