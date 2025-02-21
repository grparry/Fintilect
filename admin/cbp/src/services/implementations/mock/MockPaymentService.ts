import { IPaymentService } from '../../interfaces/IPaymentService';
import { Payment, PaymentFilters, PaymentHistory, PaymentStatus, PaymentActivityRequest, PaymentActivity, PaymentActivityListResponse } from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { mockPayments, mockPaymentHistory, mockPendingPayments } from './data/processor/mockPaymentData';

export class MockPaymentService extends BaseMockService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payment') {
    super(basePath);
  }

  async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
    await this.delay();
    const filteredPayments = mockPayments.filter(payment => {
      const matchesDate = !filters.StartDate || new Date(payment.ProcessDate) >= new Date(filters.StartDate);
      const matchesEndDate = !filters.EndDate || new Date(payment.ProcessDate) <= new Date(filters.EndDate);
      const matchesStatus = !filters.Status || filters.Status.includes(payment.Status as PaymentStatus);
      return matchesDate && matchesEndDate && matchesStatus;
    });

    return {
      items: filteredPayments,
      total: filteredPayments.length,
      page: 1,
      limit: 10,
      totalPages: Math.ceil(filteredPayments.length / 10)
    };
  }

  async getPayment(paymentId: string): Promise<Payment> {
    await this.delay();
    const payment = mockPayments.find(p => p.Id === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    return payment;
  }

  async createPayment(payment: Omit<Payment, 'Id' | 'CreatedAt' | 'UpdatedAt'>): Promise<Payment> {
    await this.delay();
    const newPayment: Payment = {
      ...payment,
      Id: `pmt_${Date.now()}`,
      ProcessDate: new Date().toISOString()
    };
    mockPayments.push(newPayment);
    return newPayment;
  }

  async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
    await this.delay();
    const existingPayment = mockPayments.find(p => p.Id === paymentId);
    if (!existingPayment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    const updatedPayment = {
      ...existingPayment,
      ...payment,
      ProcessDate: new Date().toISOString()
    };
    const index = mockPayments.findIndex(p => p.Id === paymentId);
    if (index !== -1) {
      mockPayments[index] = updatedPayment;
    }
    return updatedPayment;
  }

  async cancelPayment(paymentId: string, reason: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.Id === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.Status = PaymentStatus.CANCELLED;
  }

  async getPaymentHistory(paymentId: string): Promise<PaymentHistory[]> {
    await this.delay();
    return mockPaymentHistory.filter(h => h.PaymentId === paymentId);
  }

  async approvePayment(paymentId: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.Id === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.Status = PaymentStatus.COMPLETED;
  }

  async rejectPayment(paymentId: string, reason: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.Id === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.Status = PaymentStatus.REJECTED;
  }

  async getPendingPayments(request: PaymentActivityRequest): Promise<PaymentActivityListResponse> {
    await this.delay();
    return {
      PaymentActivities: mockPendingPayments
    };
  }
}