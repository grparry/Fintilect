import { PaginatedResponse } from './common.types';

export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    SCHEDULED = 'SCHEDULED'
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
    scheduledDate: Date;
    recurrence?: {
        frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        interval: number;
        endDate?: Date;
    };
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
    processingTime: {
        average: number;
        min: number;
        max: number;
    };
    successRate: number;
    failureRate: number;
    throughput: {
        daily: number;
        hourly: number;
    };
    errorRates: {
        validation: number;
        processing: number;
        network: number;
    };
}
export type { PaginatedResponse } from './common.types';