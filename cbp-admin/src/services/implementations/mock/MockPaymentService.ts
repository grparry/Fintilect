import { IPaymentService } from '../../interfaces/IPaymentService';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  PaginatedResponse,
  PaymentConfirmationResponse,
  ConfirmationStatus
} from '../../../types/bill-pay.types';
import { BaseMockService } from './BaseMockService';

export class MockPaymentService extends BaseMockService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payments') {
    super(basePath);
  }

  async getPendingPayments(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>> {
    await this.delay();
    
    // Mock data for testing
    const mockPayments: PendingPayment[] = [
      {
        id: '1',
        clientId: 'client1',
        clientName: 'Test Client 1',
        payeeId: 'payee1',
        payeeName: 'Test Payee 1',
        amount: 1000,
        currency: 'USD',
        status: PaymentStatus.PENDING,
        method: PaymentMethod.ACH,
        priority: Priority.MEDIUM,
        effectiveDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        recipient: {
          name: 'John Doe',
          accountNumber: '123456789',
          routingNumber: '987654321',
          bankName: 'Test Bank'
        }
      }
    ];

    const startIndex = ((request.page || 1) - 1) * (request.limit || 10);
    const endIndex = startIndex + (request.limit || 10);
    const filteredPayments = mockPayments.filter(payment => {
      if (request.status && payment.status !== request.status) return false;
      if (request.method && payment.method !== request.method) return false;
      return true;
    });

    return {
      data: filteredPayments.slice(startIndex, endIndex),
      total: filteredPayments.length,
      page: request.page || 1,
      limit: request.limit || 10
    };
  }

  async getPendingPaymentsSummary(request: PendingPaymentSearchRequest): Promise<PendingPaymentSummary> {
    await this.delay();
    
    return {
      byMethod: {
        [PaymentMethod.ACH]: { count: 1, amount: 1000 },
        [PaymentMethod.WIRE]: { count: 0, amount: 0 },
        [PaymentMethod.CHECK]: { count: 0, amount: 0 },
        [PaymentMethod.CARD]: { count: 0, amount: 0 },
        [PaymentMethod.RTP]: { count: 0, amount: 0 }
      },
      byStatus: {
        [PaymentStatus.PENDING]: 1,
        [PaymentStatus.PROCESSING]: 0,
        [PaymentStatus.COMPLETED]: 0,
        [PaymentStatus.FAILED]: 0,
        [PaymentStatus.CANCELLED]: 0,
        [PaymentStatus.EXPIRED]: 0,
        [PaymentStatus.PENDING_APPROVAL]: 0,
        [PaymentStatus.DRAFT]: 0,
        [PaymentStatus.APPROVED]: 0,
        [PaymentStatus.REJECTED]: 0,
        [PaymentStatus.SUBMITTED]: 0,
        [PaymentStatus.SCHEDULED]: 0,
        [PaymentStatus.RETURNED]: 0,
        [PaymentStatus.STOP_PAYMENT]: 0,
        [PaymentStatus.VOID]: 0,
        [PaymentStatus.HOLD]: 0,
        [PaymentStatus.SUSPENDED]: 0,
        [PaymentStatus.REFUNDED]: 0,
        [PaymentStatus.PARTIALLY_REFUNDED]: 0,
        [PaymentStatus.CHARGEBACK]: 0
      },
      byPriority: {
        [Priority.HIGH]: 0,
        [Priority.MEDIUM]: 1,
        [Priority.LOW]: 0
      }
    };
  }

  async exportPendingPayments(request: PendingPaymentSearchRequest): Promise<Blob> {
    await this.delay();
    
    const mockData = 'id,amount,status\n1,1000,pending';
    return new Blob([mockData], { type: 'text/csv' });
  }

  async approvePayment(paymentId: string): Promise<void> {
    await this.delay();
    return Promise.resolve();
  }

  async rejectPayment(paymentId: string, reason: string): Promise<void> {
    await this.delay();
    return Promise.resolve();
  }

  async bulkApprove(paymentIds: string[]): Promise<boolean> {
    await this.delay();
    return Promise.resolve(true);
  }

  async bulkReject(paymentIds: string[]): Promise<boolean> {
    await this.delay();
    return Promise.resolve(true);
  }

  async getPaymentHistory(paymentId: string): Promise<PaymentHistory> {
    await this.delay();
    
    return {
      paymentId,
      action: 'CREATED',
      performedBy: 'Test User',
      timestamp: new Date().toISOString(),
      details: {
        status: PaymentStatus.PENDING,
        method: PaymentMethod.ACH
      }
    };
  }

  async confirmPayment(paymentId: string, request: any): Promise<PaymentConfirmationResponse> {
    await this.delay();
    return Promise.resolve({
      success: true,
      confirmationStatus: ConfirmationStatus.VERIFIED,
      message: 'Payment confirmed successfully',
      attempts: 1,
      maxAttempts: 3,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    });
  }
}
