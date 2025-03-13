import { PaginatedResponse } from './common.types';
import { FISException } from './bill-pay.types';

export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    ON_HOLD = 'ON_HOLD',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    EXPIRED = 'EXPIRED'
}

export enum PaymentMethod {
    ACH = 'ACH',
    WIRE = 'WIRE',
    CHECK = 'CHECK',
    CARD = 'CARD'
}

export enum PaymentType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    REFUND = 'REFUND'
}

export enum PaymentPriority {
    HIGH = 'HIGH',
    NORMAL = 'NORMAL',
    LOW = 'LOW'
}

export enum BatchStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED'
}

export enum SearchType {
  UserPayeeListId = 'UserPayeeListId',
  MemberID = 'MemberID',
  PaymentID = 'PaymentID',
  PayeeID = 'PayeeID',
  RecurringPaymentID = 'RecurringPaymentID',
  MemberIDAndDate = 'MemberIDAndDate',
  MemberIDAndPayeeName = 'MemberIDAndPayeeName',
  MemberIDAndDateAndPayeeName = 'MemberIDAndDateAndPayeeName',
  Date = 'Date',
  PayeeName = 'PayeeName',
  FisPayeeID = 'FisPayeeID'
}

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface PaymentTransaction {
    id: string;
    clientId: string;
    amount: number;
    currency: string;
    method: PaymentMethod;
    type: PaymentType;
    status: PaymentStatus;
    priority: PaymentPriority;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
    processedAt?: Date;
    scheduledAt?: Date;
}

export interface PaymentSchedule {
    willProcessDate: string;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    numPayments?: number;
}

export interface TransactionBatch {
    id: string;
    status: BatchStatus;
    totalCount: number;
    successCount: number;
    failureCount: number;
    transactions: PaymentTransaction[];
    createdAt: Date;
    completedAt?: Date;
}

export interface ProcessorConfig {
    maxBatchSize: number;
    retryAttempts: number;
    processingDelay: number;
    supportedMethods: PaymentMethod[];
    supportedTypes: PaymentType[];
    validationRules: {
        minAmount: number;
        maxAmount: number;
        requiresApproval: number;
    };
}

export interface ProcessingError {
    code: string;
    message: string;
    timestamp: Date;
    details?: Record<string, unknown>;
}

export interface PaymentValidation {
    isValid: boolean;
    requiresApproval: boolean;
    errors: Array<{
        code: string;
        message: string;
    }>;
}

export interface PaymentReceipt {
    transactionId: string;
    receiptNumber: string;
    timestamp: Date;
    amount: number;
    currency: string;
    status: PaymentStatus;
    method: PaymentMethod;
    metadata?: Record<string, unknown>;
}

export interface TransactionSummary {
    totalCount: number;
    totalAmount: number;
    successfulCount: number;
    failedCount: number;
    byMethod: Record<PaymentMethod, number>;
    byType: Record<PaymentType, number>;
    byStatus: Record<PaymentStatus, number>;
}

export interface ProcessorMetrics {
    totalPayments: number;
    totalAmount: number;
    failedPayments: number;
    failedAmount: number;
    completedPayments: number;
    completedAmount: number;
    inProcessPayments: number;
    inProcessAmount: number;
    cancelledPayments: number;
    cancelledAmount: number;
}

export interface PaymentHistory {
  id: number;
  paymentID: string;
  userPayeeListID: string;
  memberID: string;
  fundingAccount: string;
  amount: number;
  checkNum?: string;
  willProcessDate: string;
  processedDate?: string;
  failedDate?: string;
  cancelledDate?: string;
  recurringPaymentID?: string;
  statusCode: number;
  memo: string;
  entryDate?: string;
  deliveryDate?: string;
  sourceApplication?: string;
  payeeID?: string;
  usersAccountAtPayee?: string;
  nameOnAccount?: string;
  payeeType?: string;
  paymentMethod?: string;
  runID?: number;
  lastUpdate?: string;
  confirmationNumber?: string;
  fisPayeeID?: string;
}

export interface Payment {
  paymentID: string;
  willProcessDate: string;
  memo: string;
  billReference: string;
  fundingAccount: string;
  userPayeeListID: string;
  memberID: string;
  amount: number;
  sourceApplication?: string;
  deliveryDate?: string;
  status: string;
  frequency?: string;
  numPayments?: number;
  processDate?: string;
  paymentMethod?: string;
}

export interface PaymentFilters {
  clientID?: string;
  payeeID?: string;
  method?: string[];
  status?: PaymentStatus[];
  priority?: PaymentPriority[];
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaymentActivityRequest {
  startDate: string;
  endDate: string;
  searchType: SearchType;
  searchValue?: string;
  payeeName?: string;
}

export interface PaymentUpdateStatusRequest {
  paymentID: string;
  statusCode: number;
}

export interface PaymentEditRequest {
  account: string;
  amount: number;
  willProcessDate: string;
  memberID: string;
  frequency: number;
  numPayments: number;
}

export interface PaymentAction {
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface PaymentActivity {
  memberID: string;
  paymentID: string;
  payeeID: string;
  fisPayeeID: string;
  payeeName: string;
  dateProcessed?: string;
  dueDate?: string;
  statusCode: number;
  statusName: string;
  paymentMethod: string;
  amount: number;
}

export interface PaymentActivityListResponse {
  paymentActivities: PaymentActivity[];
}

export interface PendingPayment {
  id: string;
  userPayeeListID: string;
  fundingAccount: string;
  amount: number;
  willProcessDate: string;
  statusCode: number;
  memo: string;
  friendlyName: string;
  lastUpdate: string;
  sourceApplication: string;
  entryDate: string;
  deliveryDate?: string;
  payeeID: string;
  usersAccountAtPayee: string;
  nameOnAccount: string;
  payeeType: string;
  paymentMethod: string;
  runID?: number;
  confirmationNumber?: string;
  fisPayeeID?: string;
}

export interface PendingPaymentResponse {
  memberID: string;
  source: string;
  deliveryDate?: string;
}

/** Core model for payment exceptions with details about the client, payee, and transaction */
export interface PaymentException {
  id: number;
  recordType: string;
  sponsorTransactionID: string;
  sponsorID: string;
  sponsorName: string;
  clientID: string;
  clientChangeIndicator: string;
  primaryClientFirstName: string;
  primaryClientLastName: string;
  primaryClientSsn: string;
  secondaryClientFirstName: string;
  secondaryClientLastName: string;
  secondaryClientSsn: string;
  businessName: string;
  federalTaxID: string;
  clientAddress1: string;
  clientAddress2: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientCountry: string;
  clientTelephone: string;
  internalPayeeID: string;
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
  clientPayeeID: string;
  clientPayeeAccountNumber: string;
  confirmationNumber: string;
  transactionAmount: string;
  memoLineInfo: string;
  serviceRequestNumber: string;
  serviceRequestDate: string;
  serviceRequestTime: string;
}

/** Represents an adjustment made to a payment exception */
export interface PaymentExceptionAdjustment {
  id: number;
  paymentExceptionID: number;
  paymentHistoryID: number;
  successful: boolean;
  amount: number;
  created: string;
  type: string;
}

/** Represents a correction made to a payment exception */
export interface PaymentExceptionCorrection {
  exception: PaymentException;
  correction: FISException;
}

export type { PaginatedResponse } from './common.types';