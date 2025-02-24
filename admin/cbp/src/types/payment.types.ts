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
  MemberId = 'MemberId',
  PaymentId = 'PaymentId',
  PayeeId = 'PayeeId',
  RecurringPaymentId = 'RecurringPaymentId',
  MemberIdAndDate = 'MemberIdAndDate',
  MemberIdAndPayeeName = 'MemberIdAndPayeeName',
  MemberIdAndDateAndPayeeName = 'MemberIdAndDateAndPayeeName',
  Date = 'Date',
  PayeeName = 'PayeeName',
  FisPayeeId = 'FisPayeeId'
}
export interface DateRange {
    StartDate: string;
    EndDate: string;
}
export interface PaymentTransaction {
    Id: string;
    ClientId: string;
    Amount: number;
    Currency: string;
    Method: PaymentMethod;
    Type: PaymentType;
    Status: PaymentStatus;
    Priority: PaymentPriority;
    Metadata?: Record<string, unknown>;
    CreatedAt: Date;
    UpdatedAt: Date;
    ProcessedAt?: Date;
    ScheduledAt?: Date;
}
export interface PaymentSchedule {
    WillProcessDate: string;
    Frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    NumPayments?: number;
}
export interface TransactionBatch {
    Id: string;
    Status: BatchStatus;
    TotalCount: number;
    SuccessCount: number;
    FailureCount: number;
    Transactions: PaymentTransaction[];
    CreatedAt: Date;
    CompletedAt?: Date;
}
export interface ProcessorConfig {
    MaxBatchSize: number;
    RetryAttempts: number;
    ProcessingDelay: number;
    SupportedMethods: PaymentMethod[];
    SupportedTypes: PaymentType[];
    ValidationRules: {
        MinAmount: number;
        MaxAmount: number;
        RequiresApproval: number;
    };
}
export interface ProcessingError {
    Code: string;
    Message: string;
    Timestamp: Date;
    Details?: Record<string, unknown>;
}
export interface PaymentValidation {
    IsValid: boolean;
    RequiresApproval: boolean;
    Errors: Array<{
        Code: string;
        Message: string;
    }>;
}
export interface PaymentReceipt {
    TransactionId: string;
    ReceiptNumber: string;
    Timestamp: Date;
    Amount: number;
    Currency: string;
    Status: PaymentStatus;
    Method: PaymentMethod;
    Metadata?: Record<string, unknown>;
}
export interface TransactionSummary {
    TotalCount: number;
    TotalAmount: number;
    SuccessfulCount: number;
    FailedCount: number;
    ByMethod: Record<PaymentMethod, number>;
    ByType: Record<PaymentType, number>;
    ByStatus: Record<PaymentStatus, number>;
}
export interface ProcessorMetrics {
    TotalPayments: number;
    TotalAmount: number;
    FailedPayments: number;
    FailedAmount: number;
    CompletedPayments: number;
    CompletedAmount: number;
    InProcessPayments: number;
    InProcessAmount: number;
    CancelledPayments: number;
    CancelledAmount: number;
}
export interface PaymentHistory {
  Id: number;
  PaymentId: string;
  UserPayeeListId: string;
  MemberId: string;
  FundingAccount: string;
  Amount: number;
  CheckNum?: string;
  WillProcessDate: string;
  ProcessedDate?: string;
  FailedDate?: string;
  CancelledDate?: string;
  RecurringPaymentId?: string;
  StatusCode: number;
  Memo: string;
  EntryDate?: string;
  DeliveryDate?: string;
  SourceApplication?: string;
  PayeeId?: string;
  UsersAccountAtPayee?: string;
  NameOnAccount?: string;
  PayeeType?: string;
  PaymentMethod?: string;
  RunId?: number;
  LastUpdate?: string;
  ConfirmationNumber?: string;
  FisPayeeId?: string;
}

export interface Payment {
  Id: string;
  WillProcessDate: string;
  Memo: string;
  BillReference: string;
  FundingAccount: string;
  UserPayeeListId: string;
  MemberId: string;
  Amount: number;
  SourceApplication?: string;
  DeliveryDate?: string;
  Status: string;
  Frequency?: string;
  NumPayments?: number;
  ProcessDate?: string;
  PaymentMethod?: string;
}

export interface PaymentFilters {
  ClientId?: string;
  PayeeId?: string;
  Method?: string[];
  Status?: PaymentStatus[];
  Priority?: PaymentPriority[];
  StartDate?: string;
  EndDate?: string;
  MinAmount?: number;
  MaxAmount?: number;
}

export interface PaymentActivityRequest {
  StartDate: string;
  EndDate: string;
  SearchType: string;
  SearchValue: string;
  PayeeName: string;
}

export interface PaymentUpdateStatusRequest {
  PaymentId: string;
  StatusCode: number;
}

export interface PaymentEditRequest {
  Account: string;
  Amount: number;
  WillProcessDate: string;
  MemberId: string;
  Frequency: number;
  NumPayments: number;
}

export interface PaymentAction {
  Action: string;
  PerformedBy: string;
  Timestamp: string;
  Details: Record<string, unknown>;
}

export interface PaymentActivity {
    MemberID: string;
    PaymentID: string;
    PayeeID: string;
    FisPayeeId: string;
    PayeeName: string;
    DateProcessed?: string;  
    DueDate?: string;        
    StatusCode: number;
    StatusName: string;
    PaymentMethod: string;
    Amount: number;
}

export interface PaymentActivityListResponse {
    PaymentActivities: PaymentActivity[];
}

export interface PendingPayment {
  Id: string;
  UserPayeeListId: string;
  FundingAccount: string;
  Amount: number;
  WillProcessDate: string;
  StatusCode: number;
  Memo: string;
  FriendlyName: string;
  LastUpdate: string;
  SourceApplication: string;
  EntryDate: string;
  DeliveryDate?: string;
  PayeeId: string;
  UsersAccountAtPayee: string;
  NameOnAccount: string;
  PayeeType: string;
  PaymentMethod: string;
  RunId?: number;
  ConfirmationNumber?: string;
  FisPayeeId?: string;
}

export interface PendingPaymentResponse extends PendingPayment {
  MemberId: string;
  Source: string;
  DeliveryDate?: string;
}

/** Core model for payment exceptions with details about the client, payee, and transaction */
export interface PaymentException {
    Id: number;
    RecordType: string;
    SponsorTransactionId: string;
    SponsorId: string;
    SponsorName: string;
    ClientId: string;
    ClientChangeIndicator: string;
    PrimaryClientFirstName: string;
    PrimaryClientLastName: string;
    PrimaryClientSsn: string;
    SecondaryClientFirstName: string;
    SecondaryClientLastName: string;
    SecondaryClientSsn: string;
    BusinessName: string;
    FederalTaxId: string;
    ClientAddress1: string;
    ClientAddress2: string;
    ClientCity: string;
    ClientState: string;
    ClientZip: string;
    ClientCountry: string;
    ClientTelephone: string;
    InternalPayeeId: string;
    PayeeChangeIndicator: string;
    PayeeName: string;
    PayeeAttentionLine: string;
    PayeeTelephoneNumber: string;
    PayeeAddress1: string;
    PayeeAddress2: string;
    PayeeCity: string;
    PayeeState: string;
    PayeeZip: string;
    PayeeCountry: string;
    PayeeNickname: string;
    ClientPayeeId: string;
    ClientPayeeAccountNumber: string;
    ConfirmationNumber: string;
    TransactionAmount: string;
    MemoLineInfo: string;
    ServiceRequestNumber: string;
    ServiceRequestDate: string;
    ServiceRequestTime: string;
}

/** Represents an adjustment made to a payment exception */
export interface PaymentExceptionAdjustment {
    Id: number;
    PaymentExceptionId: number;
    PaymentHistoryId: number;
    Successful: boolean;
    Amount: number;
    Created: string;
    Type: string;
}

/** Represents a correction made to a payment exception */
export interface PaymentExceptionCorrection {
    Exception: PaymentException;
    Correction: FISException;
}

export type { PaginatedResponse } from './common.types';