import { User } from './index';
import { PaymentStatus, PaymentPriority, PaymentAction, PaymentActivity, PaymentActivityListResponse } from './payment.types';

// Component Props Types
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface SettingsState {
  activeTab: number;
  lastUpdated?: string;
}

// Audit Log and API Response Types
export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userId: string;
  userName: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, any> | string;
  status: AuditEventStatus;
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ExceptionStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  IGNORED = 'ignored'
}

export enum FISExceptionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  REVERSED = 'REVERSED',
  STOPPED = 'STOPPED',
  PENDING_REVERSAL = 'PENDING_REVERSAL',
  PENDING_REFUND = 'PENDING_REFUND',
  PENDING_RETURN = 'PENDING_RETURN',
  PENDING_STOP_PAYMENT = 'PENDING_STOP_PAYMENT',
  PENDING_RESEND = 'PENDING_RESEND'
}

export enum FISErrorCode {
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  ACCOUNT_CLOSED = 'ACCOUNT_CLOSED',
  TECHNICAL_ERROR = 'TECHNICAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

export enum AuditEventStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  RECEIVED = 'RECEIVED',
  PROCESSED = 'PROCESSED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  RETRYING = 'RETRYING',
  REVERSED = 'REVERSED',
  STOPPED = 'STOPPED',
  RETURNED = 'RETURNED',
  RESENT = 'RESENT',
  REINITIATED = 'REINITIATED',
  PENDING_REVERSAL = 'PENDING_REVERSAL',
  PENDING_REFUND = 'PENDING_REFUND',
  PENDING_RETURN = 'PENDING_RETURN',
  PENDING_STOP_PAYMENT = 'PENDING_STOP_PAYMENT',
  PENDING_RESEND = 'PENDING_RESEND',
  PENDING_REINITIATE = 'PENDING_REINITIATE'
}

export interface ExceptionResolution {
  type: 'manual' | 'automated' | 'ignore';
  action: string;
  notes: string;
  userId?: string;
  timestamp?: string;
}

export interface ExceptionFilters {
  status?: FISExceptionStatus[];
  type?: string[];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FISExceptionFilters extends ExceptionFilters {
  serviceRequestNumber?: string;
  status?: FISExceptionStatus[];
  errorCode?: FISErrorCode[];
  startDate?: string;
  endDate?: string;
}

export interface FISResponseHistory {
  id: string;
  serviceRequestNumber: string;
  status: FISExceptionStatus;
  response: Record<string, any>;
  timestamp: string;
  retryCount: number;
}

export interface PaymentException {
  id: number;
  recordType: string;
  sponsorTransactionId: string;
  sponsorId: string;
  sponsorName: string;
  customerId: string;
  customerChangeIndicator: string;
  primaryCustomerFirstName: string;
  primaryCustomerLastName: string;
  primaryCustomerSsn: string;
  secondaryCustomerFirstName: string;
  secondaryCustomerLastName: string;
  secondaryCustomerSsn: string;
  businessName: string;
  federalTaxId: string;
  customerAddress1: string;
  customerAddress2: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  customerCountry: string;
  customerTelephone: string;
  internalPayeeId: string;
  payeeChangeIndicator: string;
  payeeName: string;
  payeeAttentionLine: string;
  payeeTelephoneNumber: string;
  payeeAddress1: string;
  payeeAddress2: string;
  payeeCity: string;
  payeeState: string;
  payeeZip: string;
  payeeCountry: string;
  payeeNickname: string;
  customerPayeeId: string;
  customerPayeeAccountNumber: string;
  confirmationNumber: string;
  transactionAmount: string;
  memoLineInfo: string;
  serviceRequestNumber: string;
  serviceRequestDate: Date;
  serviceRequestTime: string;
  serviceRequestType: string;
  problemCauseType: string;
  effectiveDate: string;
  deliverByDate: string;
  checkNumber: string;
  created: Date;
}

export interface FisExceptionsCorrection {
  id: number;
  fisExceptionId: number;
  correctionMade: boolean;
  correctionType?: number;
  correctionDate?: Date;
  reprocessed: boolean;
  reprocessedDate?: Date;
  manualDescription?: string;
}

export interface FISException {
  id: number;
  recordType: string;
  sponsorTransactionId: string;
  sponsorId: string;
  sponsorName: string;
  customerId: string;
  customerChangeIndicator: string;
  primaryCustomerFirstName: string;
  primaryCustomerLastName: string;
  primaryCustomerSsn: string;
  secondaryCustomerFirstName: string;
  secondaryCustomerLastName: string;
  secondaryCustomerSsn: string;
  businessName: string;
  federalTaxId: string;
  customerAddress1: string;
  customerAddress2: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  customerCountry: string;
  customerTelephone: string;
  internalPayeeId: string;
  payeeChangeIndicator: string;
  payeeName: string;
  payeeAttentionLine: string;
  payeeTelephoneNumber: string;
  payeeAddress1: string;
  payeeAddress2: string;
  payeeCity: string;
  payeeState: string;
  payeeZip: string;
  payeeCountry: string;
  payeeNickname: string;
  customerPayeeId: string;
  customerPayeeAccountNumber: string;
  confirmationNumber: string;
  transactionAmount: string;
  memoLineInfo: string;
  serviceRequestNumber: string;
  serviceRequestDate: Date;
  serviceRequestTime: string;
  serviceRequestType: string;
  problemCauseType: string;
  effectiveDate: string;
  deliverByDate: string;
  checkNumber: string;
  created: Date;
  status: FISExceptionStatus;
  errorCode: FISErrorCode;
  errorMessage: string;
  retryCount: number;
}

export interface FISRetryResult {
  success: boolean;
  message: string;
  newStatus?: string;
  retryCount: number;
  lastRetryAt: string;
}

export interface FISExceptionHistory {
  id: string;
  exceptionId: string;
  type: 'CREATE' | 'UPDATE' | 'RESOLVE' | 'REPROCESS' | 'REFUND';
  details: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };
  userId: string;
  userName: string;
  timestamp: string;
}

export interface FISRefundRequest {
  amount: number;
  reason: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

// Dashboard Types
export interface BillPayStats {
  totalTransactions: number;
  totalAmount: number;
  successRate: number;
  averageTransactionSize: number;
  transactionsByMethod: Record<string, number>;
  transactionsByStatus: Record<PaymentStatus, number>;
  recentActivity: Array<{
    id: string;
    amount: number;
    method: string;
    status: PaymentStatus;
    timestamp: string;
  }>;
}

export interface TransactionTrend {
  date: string;
  amount: number;
  count: number;
}

// Manual Processing Types
export enum PaymentMethodType {
  ACH = 'ACH',
  CHECK = 'CHECK',
  CARD = 'CARD'
}

export interface Payee {
  id: string;
  clientId: string;
  name: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ManualPayment {
  id: string;
  clientId: string;
  payeeId: string;
  amount: number;
  paymentType: PaymentMethodType;
  effectiveDate: string;
  memo?: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  status: 'Draft' | 'Submitted' | 'Processing' | 'Complete' | 'Failed';
  createdAt: string;
  updatedAt: string;
}

export interface ManualPaymentFormData {
  clientId: string;
  payeeId: string;
  amount: number;
  paymentType: PaymentMethodType;
  effectiveDate: string;
  memo?: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

export interface ManualPaymentValidation {
  valid: boolean;
  errors: Array<{
    field: keyof ManualPaymentFormData;
    message: string;
  }>;
}

// Holiday Types
export enum HolidayType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  BANK = 'BANK',
  CUSTOM = 'CUSTOM'
}

export enum HolidayStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export interface Holiday {
  id: number;
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface HolidayInput {
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
}

export interface HolidayValidation {
  isValid: boolean;
  errors: {
    name?: string;
    date?: string;
    type?: string;
    description?: string;
    status?: string;
  };
}

// Bill Pay Config Types
export interface BillPayConfig {
  id: string;
  cutoffTime: string;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  retryAttempts: number;
  notificationEmail: string;
  enableEmailNotifications: boolean;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  validationRules: {
    minTransactionAmount: number;
    maxTransactionAmount: number;
    minDailyLimit: number;
    maxDailyLimit: number;
    minRetryAttempts: number;
    maxRetryAttempts: number;
  };
}

export interface BillPayConfigUpdate {
  cutoffTime: string;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  retryAttempts: number;
  notificationEmail: string;
  enableEmailNotifications: boolean;
}

export interface BillPayConfigValidation {
  valid: boolean;
  errors: Array<{
    field: keyof BillPayConfigUpdate;
    message: string;
  }>;
}

// Notification Template Types
export enum NotificationType {
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_APPROVAL_REQUIRED = 'PAYMENT_APPROVAL_REQUIRED',
  PAYMENT_CANCELLED = 'PAYMENT_CANCELLED',
  PAYMENT_EXPIRED = 'PAYMENT_EXPIRED'
}

export enum NotificationCategory {
  PAYMENT = 'Payment',
  ACCOUNT = 'Account',
  SYSTEM = 'System'
}

export interface NotificationVariable {
  name: string;
  description: string;
  example?: string;
}

export interface NotificationTemplate {
  id: number;
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject: string;
  content: string;
  active: boolean;
  lastModified: string;
  createdAt?: string;
  updatedAt?: string;
  variables?: NotificationVariable[];
}

export interface NotificationTemplateInput {
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject: string;
  content: string;
  active: boolean;
}

export interface NotificationTemplateFilters {
  searchTerm?: string;
  type?: NotificationType | 'all';
  category?: NotificationCategory | 'all';
  active?: boolean;
}

export interface NotificationPreview {
  subject: string;
  content: string;
  sampleData: Record<string, string>;
}

// Exception Tool Types
export type ExceptionToolStatus = 'Pending' | 'Resolved' | 'Failed';

export type ExceptionToolPriority = 'High' | 'Medium' | 'Low';

export interface ExceptionTool {
  id: string;
  clientName: string;
  paymentId: string;
  amount: number;
  status: ExceptionToolStatus;
  errorCode: string;
  errorMessage: string;
  timestamp: string;
  paymentType: string;
  retryCount: number;
  priority: ExceptionToolPriority;
}

export interface ExceptionToolFilters {
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  status?: ExceptionToolStatus;
  priority?: ExceptionToolPriority;
  paymentType?: string;
  showResolved?: boolean;
  page?: number;
  limit?: number;
}

export interface ResolutionHistory {
  id: number;
  exceptionId: number;
  action: string;
  timestamp: string;
  user: string;
  notes?: string;
}

// FISExceptionService Types
export interface FISExceptionService {
  getExceptions: (filters: FISExceptionFilters) => Promise<FISException[]>;
  getResponseHistory: (serviceRequestNumber: string) => Promise<FISResponseHistory[]>;
  retryException: (id: string) => Promise<void>;
  ignoreException: (id: string, notes: string) => Promise<void>;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  type?: 'error' | 'warning';
}

export interface PaymentValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
  requiresApproval?: boolean;
}

export interface PaymentMethodLimits {
  maxAmount: number;
  minAmount: number;
  allowedCurrencies: string[];
  requiresApproval: boolean;
}

export interface DailyLimitCheck {
  totalAmount: number;
  remainingLimit: number;
  reachedLimit: boolean;
}

// Payment Processor Types
export interface ProcessorConfig {
  processorId: string;
  apiKey: string;
  apiEndpoint: string;
  webhookSecret: string;
  timeout: number;
  retryAttempts: number;
  supportedMethods: string[];
  methodConfigs: Record<string, {
    enabled: boolean;
    limits: {
      min: number;
      max: number;
    };
    currencies: string[];
    requiresApproval: boolean;
  }>;
}

export interface ProcessorResponse {
  success: boolean;
  processorId: string;
  transactionId: string;
  status: PaymentStatus;
  timestamp: string;
  requiresApproval: boolean;
  metadata?: Record<string, any>;
}

export interface ProcessorWebhookEvent {
  eventId: string;
  paymentId: string;
  processorId: string;
  status: string;
  timestamp: string;
  metadata: {
    clientId: string;
    amount: number;
    currency: string;
    completedAt?: string;
    error?: string;
  };
}

// Notification Types
export interface NotificationConfig {
  providers: {
    email: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromEmail: string;
      templates: Record<NotificationType, string>;
    };
    sms: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromNumber: string;
      templates: Record<NotificationType, string>;
    };
  };
  defaultChannel: 'email' | 'sms';
}

export interface NotificationRequest {
  type: NotificationType;
  recipientId: string;
  data: Record<string, any>;
  channel?: 'email' | 'sms';
  priority?: 'high' | 'normal' | 'low';
}

export interface NotificationResponse {
  id: string;
  recipientId: string;
  type: NotificationType;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  channel: 'email' | 'sms';
  sentAt: string;
  deliveredAt?: string;
  error?: string;
}

export interface FisPayeeRequest {
  name?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  usersAccountAtPayee?: string;
}

export interface FisPayeeResponse {
  payeeId?: string;
  message?: string;
  payeeName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface FisPayeeDetailedResponse {
  payeeId?: string;
  message?: string;
  merchantId?: string;
  merchantName?: string;
  webhelp?: string;
  payeeName?: string;
  accountNumber?: string;
  cutoffTime?: string;
  leadDays?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  dpbc?: string;
  billerType?: string;
  billerId?: string;
  help?: string;
  terms?: string;
  valid?: boolean;
}

// Report Types
export interface ReportFilters {
  startDate: string;
  endDate: string;
  status?: PaymentStatus[];
  methods?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export interface ReportData {
  summary: {
    totalTransactions: number;
    totalAmount: number;
    successRate: number;
    averageProcessingTime: number;
  };
  transactions: any[];
  breakdown: {
    byMethod: Record<string, number>;
    byStatus: Record<PaymentStatus, number>;
    byDay: {
      date: string;
      count: number;
      amount: number;
    }[];
  };
}

// Generic Types
export type { PaginatedResponse } from './common.types';

// Data Conversion Types
export interface ConversionJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  sourceFormat: string;
  targetFormat: string;
  totalRecords: number;
  processedRecords: number;
  errorCount: number;
  startTime: string;
  endTime?: string;
  errors?: {
    line: number;
    message: string;
  }[];
}

export interface ConversionTemplate {
  id: string;
  name: string;
  description?: string;
  sourceFormat: string;
  targetFormat: string;
  mappings: {
    source: string;
    target: string;
    transformation?: string;
  }[];
  validation?: {
    required?: string[];
    format?: Record<string, string>;
  };
}

export interface ExceptionType {
  code: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

export interface ExceptionCategory {
  code: string;
  name: string;
  description: string;
}

export interface ExceptionSeverity {
  code: string;
  name: string;
  description: string;
}

export interface ExceptionToolProps {
  api: {
    getExceptions: () => Promise<PaymentActivity[]>;
    resolveException: (id: string, resolution: ExceptionResolution) => Promise<void>;
  };
  onClose: () => void;
}

export interface FISExceptionStats {
  total: number;
  byStatus: Record<FISExceptionStatus, number>;
  byType: Record<string, number>;
  byErrorCode: Record<FISErrorCode, number>;
  avgResolutionTime: number;
  resolutionRate: number;
  successRate: number;
  avgRetryCount: number;
}