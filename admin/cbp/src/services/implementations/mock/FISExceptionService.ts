import { IFISExceptionService } from '../../interfaces/IFISExceptionService';
import {
    FISException,
    FISExceptionStatus,
    FISExceptionHistory,
    FISResponseHistory,
    FISRetryResult,
    FISRefundRequest,
    FISExceptionFilters,
    FISErrorCode
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from '../real/BaseService';

export class MockFISExceptionService extends BaseService implements IFISExceptionService {
    constructor(basePath: string) {
        super(basePath);
    }

    private mockExceptions: FISException[] = [
        {
            id: 1,
            recordType: 'PAYMENT',
            sponsorTransactionId: 'ST001',
            sponsorId: 'SP001',
            sponsorName: 'Test Sponsor',
            customerId: 'CUST001',
            customerChangeIndicator: 'N',
            primaryCustomerFirstName: 'John',
            primaryCustomerLastName: 'Doe',
            primaryCustomerSsn: '123-45-6789',
            secondaryCustomerFirstName: '',
            secondaryCustomerLastName: '',
            secondaryCustomerSsn: '',
            businessName: '',
            federalTaxId: '',
            customerAddress1: '123 Main St',
            customerAddress2: '',
            customerCity: 'Anytown',
            customerState: 'CA',
            customerZip: '12345',
            customerCountry: 'USA',
            customerTelephone: '555-123-4567',
            internalPayeeId: 'PAY001',
            payeeChangeIndicator: 'N',
            payeeName: 'Test Payee',
            payeeAttentionLine: '',
            payeeTelephoneNumber: '555-987-6543',
            payeeAddress1: '456 Business Ave',
            payeeAddress2: '',
            payeeCity: 'Commerce City',
            payeeState: 'CA',
            payeeZip: '54321',
            payeeCountry: 'USA',
            payeeNickname: 'Test Payee',
            customerPayeeId: 'CPAY001',
            customerPayeeAccountNumber: 'ACC123456',
            confirmationNumber: 'CONF001',
            transactionAmount: '1000.00',
            memoLineInfo: 'Test Payment',
            serviceRequestNumber: 'SRN001',
            serviceRequestDate: new Date(),
            serviceRequestTime: '09:00:00',
            serviceRequestType: 'PAYMENT',
            problemCauseType: 'INVALID_ACCOUNT',
            effectiveDate: '2025-02-25',
            deliverByDate: '2025-02-26',
            checkNumber: 'CHK001',
            created: new Date(),
            status: FISExceptionStatus.PENDING,
            errorCode: FISErrorCode.INVALID_ACCOUNT,
            errorMessage: 'Invalid account number provided',
            retryCount: 0
        },
        {
            id: 2,
            recordType: 'PAYMENT',
            sponsorTransactionId: 'ST002',
            sponsorId: 'SP001',
            sponsorName: 'Test Sponsor',
            customerId: 'CUST002',
            customerChangeIndicator: 'N',
            primaryCustomerFirstName: 'Jane',
            primaryCustomerLastName: 'Smith',
            primaryCustomerSsn: '987-65-4321',
            secondaryCustomerFirstName: '',
            secondaryCustomerLastName: '',
            secondaryCustomerSsn: '',
            businessName: '',
            federalTaxId: '',
            customerAddress1: '789 Oak Rd',
            customerAddress2: '',
            customerCity: 'Somewhere',
            customerState: 'NY',
            customerZip: '67890',
            customerCountry: 'USA',
            customerTelephone: '555-555-5555',
            internalPayeeId: 'PAY002',
            payeeChangeIndicator: 'N',
            payeeName: 'Another Payee',
            payeeAttentionLine: '',
            payeeTelephoneNumber: '555-444-3333',
            payeeAddress1: '321 Commerce St',
            payeeAddress2: '',
            payeeCity: 'Business Town',
            payeeState: 'NY',
            payeeZip: '98765',
            payeeCountry: 'USA',
            payeeNickname: 'Another Payee',
            customerPayeeId: 'CPAY002',
            customerPayeeAccountNumber: 'ACC987654',
            confirmationNumber: 'CONF002',
            transactionAmount: '2500.00',
            memoLineInfo: 'Another Payment',
            serviceRequestNumber: 'SRN002',
            serviceRequestDate: new Date(),
            serviceRequestTime: '14:30:00',
            serviceRequestType: 'PAYMENT',
            problemCauseType: 'TECHNICAL_ERROR',
            effectiveDate: '2025-02-25',
            deliverByDate: '2025-02-26',
            checkNumber: 'CHK002',
            created: new Date(),
            status: FISExceptionStatus.FAILED,
            errorCode: FISErrorCode.TECHNICAL_ERROR,
            errorMessage: 'System error occurred',
            retryCount: 2
        }
    ];

    async getFISExceptions(filters: FISExceptionFilters): Promise<PaginatedResponse<FISException>> {
        let filtered = [...this.mockExceptions];
        
        if (filters.serviceRequestNumber) {
            filtered = filtered.filter(ex => ex.serviceRequestNumber === filters.serviceRequestNumber);
        }

        if (filters.status && filters.status.length > 0) {
            filtered = filtered.filter(ex => filters.status.includes(ex.status));
        }

        const limit = 10;
        const total = filtered.length;
        const totalPages = Math.ceil(total / limit);

        return {
            items: filtered.slice(0, limit),
            total,
            page: 1,
            limit,
            totalPages
        };
    }

    async getFISException(exceptionId: number): Promise<FISException> {
        const exception = this.mockExceptions.find(ex => ex.id === exceptionId);
        if (!exception) {
            throw new Error('Exception not found');
        }
        return exception;
    }

    async getFISExceptionHistory(exceptionId: number): Promise<FISExceptionHistory[]> {
        return [
            {
                id: '1',
                exceptionId: exceptionId.toString(),
                type: 'UPDATE',
                details: {
                    before: { status: FISExceptionStatus.PENDING },
                    after: { status: FISExceptionStatus.IN_PROGRESS }
                },
                userId: 'user1',
                userName: 'John Doe',
                timestamp: new Date().toISOString()
            }
        ];
    }

    async getFISResponseHistory(serviceRequestNumber: string): Promise<FISResponseHistory[]> {
        return [
            {
                id: '1',
                serviceRequestNumber,
                status: FISExceptionStatus.PENDING,
                response: { code: 200, message: 'Success' },
                timestamp: new Date().toISOString(),
                retryCount: 0
            }
        ];
    }

    async retryFISException(exceptionId: number): Promise<FISRetryResult> {
        const exception = await this.getFISException(exceptionId);
        return {
            success: true,
            message: 'Exception retry initiated',
            retryCount: 1,
            lastRetryAt: new Date().toISOString()
        };
    }

    async requestFISRefund(exceptionId: number, request: FISRefundRequest): Promise<void> {
        const exception = await this.getFISException(exceptionId);
        exception.status = FISExceptionStatus.PENDING_REFUND;
    }

    async updateFISExceptionStatus(exceptionId: number, status: FISExceptionStatus): Promise<void> {
        const exception = await this.getFISException(exceptionId);
        exception.status = status;
    }

    async getFISExceptionSummary(): Promise<{
        total: number;
        byStatus: Record<FISExceptionStatus, number>;
        successRate: number;
        avgRetryCount: number;
    }> {
        const byStatus = Object.values(FISExceptionStatus).reduce((acc, status) => {
            acc[status] = this.mockExceptions.filter(ex => ex.status === status).length;
            return acc;
        }, {} as Record<FISExceptionStatus, number>);

        const total = this.mockExceptions.length;
        const resolved = this.mockExceptions.filter(ex => ex.status === FISExceptionStatus.RESOLVED).length;
        const avgRetry = this.mockExceptions.reduce((sum, ex) => sum + ex.retryCount, 0) / total;

        return {
            total,
            byStatus,
            successRate: resolved / total,
            avgRetryCount: avgRetry
        };
    }
}
