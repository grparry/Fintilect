import { IPaymentService } from '@/../interfaces/IPaymentService';
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
} from '@/../../types/bill-pay.types';
import { BaseMockService } from '@/BaseMockService';
import { mockPayments, mockPendingPayments } from '@/data/billpay/payments';

export class MockPaymentService extends BaseMockService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payments') {
    super(basePath);
  }

  async getPendingPayments(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>> {
    await this.delay();
    
    const startIndex = ((request.page || 1) - 1) * (request.limit || 10);
    const endIndex = startIndex + (request.limit || 10);
    const filteredPayments = mockPendingPayments.filter(payment => {
      const matchesStatus = !request.status?.length || request.status.includes(payment.status);
      const matchesMethod = !request.method?.length || request.method.includes(payment.method);
      const matchesPriority = !request.priority?.length || request.priority.includes(payment.priority);
      const matchesStartDate = !request.startDate || new Date(payment.effectiveDate) >= new Date(request.startDate);
      const matchesEndDate = !request.endDate || new Date(payment.effectiveDate) <= new Date(request.endDate);
      return matchesStatus && matchesMethod && matchesPriority && matchesStartDate && matchesEndDate;
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
    
    const filteredPayments = mockPendingPayments.filter(payment => {
      const matchesStatus = !request.status?.length || request.status.includes(payment.status);
      const matchesMethod = !request.method?.length || request.method.includes(payment.method);
      const matchesPriority = !request.priority?.length || request.priority.includes(payment.priority);
      const matchesStartDate = !request.startDate || new Date(payment.effectiveDate) >= new Date(request.startDate);
      const matchesEndDate = !request.endDate || new Date(payment.effectiveDate) <= new Date(request.endDate);
      return matchesStatus && matchesMethod && matchesPriority && matchesStartDate && matchesEndDate;
    });

    const byMethod = Object.values(PaymentMethod).reduce((acc, method) => {
      const payments = filteredPayments.filter(p => p.method === method);
      acc[method] = {
        count: payments.length,
        amount: payments.reduce((sum, p) => sum + p.amount, 0)
      };
      return acc;
    }, {} as Record<PaymentMethod, { count: number; amount: number }>);

    const byStatus = Object.values(PaymentStatus).reduce((acc, status) => {
      acc[status] = filteredPayments.filter(p => p.status === status).length;
      return acc;
    }, {} as Record<PaymentStatus, number>);

    const byPriority = Object.values(Priority).reduce((acc, priority) => {
      acc[priority] = filteredPayments.filter(p => p.priority === priority).length;
      return acc;
    }, {} as Record<Priority, number>);

    return {
      byMethod,
      byStatus,
      byPriority
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
