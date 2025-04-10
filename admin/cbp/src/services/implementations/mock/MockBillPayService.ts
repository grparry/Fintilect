import { IBillPayService } from '../../interfaces/IBillPayService';
import logger from '../../../utils/logger';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
    Payee,
    BillPayStats,
    TransactionTrend,
    ExceptionResolution,
    FISException,
    FISExceptionStatus
} from '../../../types/bill-pay.types';
import {
    Holiday,
    HolidayInput,
    HolidayStatus
} from '../../../types/calendar.types';

import {
    PaymentException,
    PaymentFilters
} from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { Client } from '../../../types/client.types';
import { mockExceptions } from './data/billpay/exceptions';
import { mockDashboardStats, generateMockTrends } from './data/billpay/dashboard';
import { initialHolidays } from './data/billpay/settings';
import { mockClients, mockPayees } from './data/billpay/clients';
import { BaseMockService } from './BaseMockService';

export class MockBillPayService extends BaseMockService implements IBillPayService {
    constructor(basePath: string = '/api/v1/bill-pay') {
        super(basePath);
    }
    private config: BillPayConfig = {
        id: 'config-1',
        cutoffTime: '16:00',
        maxDailyLimit: 1000000,
        maxTransactionLimit: 100000,
        allowWeekendProcessing: false,
        requireDualApproval: true,
        retryAttempts: 3,
        notificationEmail: 'billpay@example.com',
        enableEmailNotifications: true,
        lastUpdatedAt: new Date().toISOString(),
        lastUpdatedBy: 'admin',
        validationRules: {
            minTransactionAmount: 0.01,
            maxTransactionAmount: 100000,
            minDailyLimit: 1000,
            maxDailyLimit: 1000000,
            minRetryAttempts: 1,
            maxRetryAttempts: 5
        }
    };
    private exceptions: FISException[] = [...mockExceptions];
    private holidays: Holiday[] = [...initialHolidays];
    private clients: Client[] = [...mockClients];
    private payees: Payee[] = [...mockPayees];

    async getConfiguration(): Promise<BillPayConfig> {
        return this.config;
    }

    async updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        // Validate configuration
        const validation: BillPayConfigValidation = {
            valid: true,
            errors: []
        };
        if (config.maxDailyLimit > this.config.validationRules.maxDailyLimit) {
            validation.valid = false;
            validation.errors.push({
                field: 'maxDailyLimit',
                message: `Cannot exceed maximum daily limit of ${this.config.validationRules.maxDailyLimit}`
            });
        }
        if (validation.valid) {
            this.config = {
                ...this.config,
                ...config,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: 'mock-user'
            };
        }
        return validation;
    }

    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        // Map FISExceptions to PaymentExceptions
        let filteredExceptions = this.exceptions.map(exception => ({
            id: exception.id,
            recordType: exception.recordType,
            sponsorTransactionID: exception.sponsorTransactionId,
            sponsorID: exception.sponsorId,
            sponsorName: exception.sponsorName,
            clientID: exception.customerId,
            clientChangeIndicator: exception.customerChangeIndicator,
            primaryClientFirstName: exception.primaryCustomerFirstName,
            primaryClientLastName: exception.primaryCustomerLastName,
            primaryClientSsn: exception.primaryCustomerSsn,
            secondaryClientFirstName: exception.secondaryCustomerFirstName,
            secondaryClientLastName: exception.secondaryCustomerLastName,
            secondaryClientSsn: exception.secondaryCustomerSsn,
            businessName: exception.businessName,
            federalTaxID: exception.federalTaxId,
            clientAddress1: exception.customerAddress1,
            clientAddress2: exception.customerAddress2,
            clientCity: exception.customerCity,
            clientState: exception.customerState,
            clientZip: exception.customerZip,
            clientCountry: exception.customerCountry,
            clientTelephone: exception.customerTelephone,
            internalPayeeID: exception.internalPayeeId,
            payeeChangeIndicator: exception.payeeChangeIndicator,
            payeeName: exception.payeeName,
            payeeAttentionLine: exception.payeeAttentionLine,
            payeeTelephoneNumber: exception.payeeTelephoneNumber,
            payeeAddress1: exception.payeeAddress1,
            payeeAddress2: exception.payeeAddress2,
            payeeCity: exception.payeeCity,
            payeeState: exception.payeeState,
            payeeZip: exception.payeeZip,
            payeeCountry: exception.payeeCountry,
            payeeNickname: exception.payeeNickname,
            clientPayeeID: exception.customerPayeeId,
            clientPayeeAccountNumber: exception.customerPayeeAccountNumber,
            confirmationNumber: exception.confirmationNumber,
            transactionAmount: exception.transactionAmount,
            memoLineInfo: exception.memoLineInfo,
            serviceRequestNumber: exception.serviceRequestNumber,
            serviceRequestDate: exception.serviceRequestDate.toISOString().split('T')[0],
            serviceRequestTime: exception.serviceRequestTime
        }));

        // Apply default pagination since C# APIs don't support it
        const startIndex = 0;
        const endIndex = filteredExceptions.length;
        const paginatedExceptions = filteredExceptions.slice(startIndex, endIndex);

        return {
            items: paginatedExceptions,
            total: filteredExceptions.length,
            page: 1,
            limit: filteredExceptions.length,
            totalPages: 1
        };
    }

    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        const exceptionIndex = this.exceptions.findIndex(e => e.id === parseInt(exceptionId));
        if (exceptionIndex === -1) {
            throw new Error(`Exception with ID ${exceptionId} not found`);
        }
        this.exceptions[exceptionIndex].status = FISExceptionStatus.RESOLVED;
        // Store resolution data in a way that matches FISException structure
        this.exceptions[exceptionIndex].errorMessage = resolution.notes || '';
        this.exceptions[exceptionIndex].created = new Date();
    }

    async getClients(): Promise<Client[]> {
        return this.clients;
    }

    async getPayees(clientId: string): Promise<Payee[]> {
        return this.payees.filter(p => p.clientId === clientId);
    }

    async getStats(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<BillPayStats> {
        return mockDashboardStats(timeframe);
    }

    async getTransactionTrends(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<TransactionTrend[]> {
        const daysMap = {
            'day': 1,
            'week': 7,
            'month': 30,
            'quarter': 90,
            'year': 365
        };
        return generateMockTrends(daysMap[timeframe]);
    }

    async getHolidays(): Promise<Holiday[]> {
        return this.holidays;
    }

    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        const newHoliday: Holiday = {
            id: Date.now(),
            ...holiday,
            status: HolidayStatus.ACTIVE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.holidays.push(newHoliday);
        return newHoliday;
    }

    async sendOTP(method: string, destination: string): Promise<void> {
        logger.log(`Sending OTP via ${method} to ${destination}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
    }

    async getFISException(id: number): Promise<FISException | null> {
        const exception = this.exceptions.find(ex => ex.id === id);
        if (!exception) {
            return null;
        }
        return exception;
    }

    async updateFISException(id: number, updates: Partial<FISException>): Promise<FISException> {
        const exception = await this.getFISException(id);
        if (!exception) {
            throw new Error('Exception not found');
        }
        const updated = {
            ...exception,
            ...updates,
            created: exception.created
        };
        const index = this.exceptions.findIndex(ex => ex.id === id);
        if (index !== -1) {
            this.exceptions[index] = updated;
        }
        return updated;
    }
}