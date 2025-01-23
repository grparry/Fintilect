// Remove unused Dayjs import since we're using string type for dates
import { User } from './index';
import { PaymentApiResponse } from './api.types';

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

// Payment Types
export enum PaymentMethod {
  ACH = 'ach',
  WIRE = 'wire',
  CHECK = 'check',
  CARD = 'card',
  RTP = 'rtp'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  SCHEDULED = 'SCHEDULED',
  RETURNED = 'RETURNED',
  STOP_PAYMENT = 'STOP_PAYMENT',
  VOID = 'VOID',
  HOLD = 'HOLD',
  SUSPENDED = 'SUSPENDED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  CHARGEBACK = 'CHARGEBACK'
}

export enum ConfirmationMethod {
  MANUAL = 'manual',
  OTP = 'otp',
  EMAIL = 'email',
  SMS = 'sms'
}

export enum ConfirmationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
  EXPIRED = 'expired'
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

export enum PayeeConversionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED'
}

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  payeeId: string;
  payeeName: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  effectiveDate: string;
  description?: string;
  reference?: string;
  metadata?: Record<string, any>;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface PendingPayment extends Omit<Payment, 'recipient'> {
  recipient: {
    name: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
}

export interface PaymentConfirmationRequest {
  paymentId: string;
  method: PaymentMethod;
  confirmationMethod: ConfirmationMethod;
  code?: string;
  notes?: string;
  userId?: string;
}

export interface PaymentConfirmationResponse {
  success: boolean;
  confirmationStatus: ConfirmationStatus;
  message: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string;
}

export interface PaymentFilters {
  clientId?: string;
  payeeId?: string;
  method?: PaymentMethod[];
  status?: PaymentStatus[];
  priority?: Priority[];
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PendingPaymentFilters extends PaymentFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PendingPaymentSearchRequest {
  clientId?: string;
  payeeId?: string;
  method?: PaymentMethod[];
  status?: PaymentStatus[];
  priority?: Priority[];
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PendingPaymentListResponse {
  data: PendingPayment[];
  total: number;
  page: number;
  limit: number;
}

export interface PendingPaymentSummary {
  byMethod: Record<PaymentMethod, { count: number; amount: number }>;
  byStatus: Record<PaymentStatus, number>;
  byPriority: Record<Priority, number>;
}

export interface PendingPaymentApproval {
  paymentId: string;
  approvedBy: string;
  approvedAt: string;
  notes?: string;
}

export interface PendingPaymentRejection {
  paymentId: string;
  rejectedBy: string;
  rejectedAt: string;
  reason: string;
  notes?: string;
}

export interface PaymentHistory {
  paymentId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, any>;
}

export interface PaymentAction {
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface PaymentException {
  id: string;
  paymentId: string;
  type: string;
  status: ExceptionStatus;
  message: string;
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  resolutions?: ExceptionResolution[];
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
  requestId?: string;
}

export interface FISResponseHistory {
  id: string;
  requestId: string;
  status: FISExceptionStatus;
  response: Record<string, any>;
  timestamp: string;
  retryCount: number;
}

export interface FISException {
  id: string;
  requestId: string;
  status: FISExceptionStatus;
  errorCode: FISErrorCode;
  errorMessage: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
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

// Payee Conversion Types
export type PayeeStatus = 'pending' | 'validating' | 'validated' | 'processing' | 'completed' | 'failed';
export type PayeeType = 'Personal' | 'Business';

export interface PayeeValidationResult {
  id: string;
  payeeName: string;
  status: PayeeStatus;
  accountNumber: string;
  routingNumber: string;
  type: PayeeType;
  validationMessage?: string;
}

export interface PayeeConversionSummary {
  totalPayees: number;
  successfullyConverted: number;
  failed: number;
  conversionDate: string;
  conversionId: string;
}

export interface PayeeConversionFilters {
  clientId?: string;
  status?: PayeeConversionStatus;
  type?: PayeeType;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PayeeConversionFile {
  id: string;
  name: string;
  status: 'PENDING' | 'PROCESSED';
  createdAt: string;
  processedAt?: string;
}

export interface PayeeConversionValidation {
  valid: boolean;
  errors: Array<{
    field: string;
    message: string;
  }>;
  warnings: Array<{
    field: string;
    message: string;
  }>;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
}

export interface PayeeConversionFileUploadResponse {
  id: string;
  name: string;
  status: 'PENDING' | 'PROCESSED';
  validation: {
    totalRecords: number;
    validRecords: number;
    invalidRecords: number;
    errors: Array<{
      field: string;
      message: string;
    }>;
    warnings: Array<{
      field: string;
      message: string;
    }>;
  };
  createdAt: string;
}

export interface PayeeConversionProgressResponse {
  id: string;
  name: string;
  status: 'PENDING' | 'PROCESSING' | 'PROCESSED';
  validation: {
    totalRecords: number;
    validRecords: number;
    invalidRecords: number;
    errors: Array<{
      field: string;
      message: string;
    }>;
    warnings: Array<{
      field: string;
      message: string;
    }>;
  };
  createdAt: string;
  processedAt?: string;
}

export interface PayeeConversionProgress {
  status: 'PENDING' | 'PROCESSING' | 'PROCESSED';
  totalRecords: number;
  processedRecords: number;
  progress: number;
  currentStep: 'validation' | 'processing';
  totalSteps: number;
  errors: string[];
}

export interface PayeeConversionRecord {
  id: string;
  fileId: string;
  payeeName: string;
  payeeId?: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
  error?: string;
  createdAt: string;
  processedAt?: string;
}

export interface PayeeConversionTemplate {
  id: string;
  name: string;
  description?: string;
  format: 'csv' | 'excel';
  fields: Array<{
    name: string;
    required: boolean;
    type: 'string' | 'number' | 'date' | 'boolean';
    validation?: {
      pattern?: string;
      min?: number;
      max?: number;
      options?: string[];
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface BillPayStats {
  totalTransactions: number;
  totalAmount: number;
  successRate: number;
  averageTransactionSize: number;
  transactionsByMethod: Record<PaymentMethod, number>;
  transactionsByStatus: Record<PaymentStatus, number>;
  recentActivity: Array<{
    id: string;
    amount: number;
    method: PaymentMethod;
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
export type PaymentType = 'ACH' | 'Wire' | 'RTP';

export interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
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
  paymentType: PaymentType;
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
  paymentType: PaymentType;
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
export type ExceptionToolStatus = 'Failed' | 'Warning' | 'Resolved' | 'Pending';
export type ExceptionToolPriority = 'High' | 'Medium' | 'Low';

export interface ExceptionTool {
  id: number;
  clientName: string;
  paymentId: string;
  amount: number;
  status: ExceptionToolStatus;
  errorCode: string;
  errorMessage: string;
  timestamp: string;
  paymentType: PaymentType;
  retryCount: number;
  priority: ExceptionToolPriority;
}

export interface ExceptionToolFilters {
  startDate: string;
  endDate: string;
  searchTerm?: string;
  status?: ExceptionToolStatus;
  priority?: ExceptionToolPriority;
  paymentType?: PaymentType;
  showResolved?: boolean;
}

export interface ResolutionHistory {
  id: number;
  exceptionId: number;
  action: string;
  timestamp: string;
  user: string;
  notes?: string;
}

// Permission Types
export type Permission = 
  | 'approve_payments'
  | 'view_payments'
  | 'create_payments'
  | 'edit_payments'
  | 'delete_payments';

export interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

// Payment Confirmation Types
export interface PaymentConfirmationRequest {
  paymentId: string;
  method: PaymentMethod;
  confirmationMethod: ConfirmationMethod;
  code?: string;
  notes?: string;
  userId?: string;
}

export interface PaymentConfirmationResponse {
  success: boolean;
  confirmationStatus: ConfirmationStatus;
  message: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string;
}

export interface ExceptionStats {
  total: number;
  byStatus: Record<FISExceptionStatus, number>;
  byType: Record<string, number>;
  resolutionRate: number;
  averageRetryCount: number;
}

export interface PaymentListProps {
  status?: PaymentStatus;
  onStatusChange?: (status: PaymentStatus) => void;
  onPaymentSelect?: (payment: Payment) => void;
}

export interface PaymentDetailsProps {
  paymentId: string;
  onClose?: () => void;
  onStatusChange?: (status: PaymentStatus) => void;
}

export interface PaymentFilterProps {
  filters: ReportFilters;
  onFilterChange: (filters: ReportFilters) => void;
}

export interface DashboardWidgetProps {
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  loading?: boolean;
}

// Report Types
export interface ReportFilters {
  startDate: string;
  endDate: string;
  status?: PaymentStatus[];
  methods?: PaymentMethod[];
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
  transactions: Payment[];
  breakdown: {
    byMethod: Record<PaymentMethod, number>;
    byStatus: Record<PaymentStatus, number>;
    byDay: {
      date: string;
      count: number;
      amount: number;
    }[];
  };
}

// Generic Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

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
    getExceptions: () => Promise<PaymentException[]>;
    resolveException: (id: string, resolution: ExceptionResolution) => Promise<void>;
  };
  onClose: () => void;
}

export interface PaymentService {
  searchPendingPayments: (filters: PendingPaymentSearchRequest) => Promise<PendingPaymentListResponse>;
  getPendingPaymentSummary: () => Promise<PendingPaymentSummary>;
  confirmPayment: (request: PaymentConfirmationRequest) => Promise<PaymentConfirmationResponse>;
  getPaymentHistory: (paymentId: string) => Promise<PaymentHistory[]>;
  getExceptions: () => Promise<PaymentException[]>;
  resolveException: (id: string, resolution: ExceptionResolution) => Promise<void>;
}

export interface FISExceptionService {
  getExceptions: (filters: FISExceptionFilters) => Promise<FISException[]>;
  getResponseHistory: (requestId: string) => Promise<FISResponseHistory[]>;
  retryException: (id: string) => Promise<void>;
  ignoreException: (id: string, notes: string) => Promise<void>;
}

export interface PayeeConversionService {
  uploadFile: (file: File) => Promise<PayeeConversionFile>;
  getFiles: () => Promise<PayeeConversionFile[]>;
  getFileRecords: (fileId: string) => Promise<PayeeConversionRecord[]>;
  validateFile: (fileId: string) => Promise<void>;
  processFile: (fileId: string) => Promise<void>;
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
  supportedMethods: PaymentMethod[];
  methodConfigs: Record<PaymentMethod, {
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
