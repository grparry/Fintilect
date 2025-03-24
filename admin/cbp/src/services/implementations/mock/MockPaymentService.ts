import { IPaymentService } from '../../interfaces/IPaymentService';
import { Payment, PaymentFilters, PaymentHistory, PaymentStatus, PaymentActivityRequest, PaymentActivity, PaymentActivityListResponse } from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { mockPayments, mockPaymentHistory, mockPendingPayments } from './data/processor/mockPaymentData';

export class MockPaymentService extends BaseMockService implements IPaymentService {
  constructor(basePath: string = '/api/v1/Payment') {
    super(basePath);
  }

  async getPayments(filters: PaymentFilters): Promise<PaginatedResponse<Payment>> {
    await this.delay();
    const filteredPayments = mockPayments.filter(payment => {
      const matchesDate = !filters.startDate || new Date(payment.processDate) >= new Date(filters.startDate);
      const matchesEndDate = !filters.endDate || new Date(payment.processDate) <= new Date(filters.endDate);
      const matchesStatus = !filters.status || filters.status.includes(payment.status as PaymentStatus);
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
    const payment = mockPayments.find(p => p.paymentID === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    return payment;
  }

  async createPayment(payment: Omit<Payment, 'paymentID' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    await this.delay();
    const newPayment: Payment = {
      ...payment,
      paymentID: `pmt_${Date.now()}`,
      processDate: new Date().toISOString()
    };
    mockPayments.push(newPayment);
    return newPayment;
  }

  async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
    await this.delay();
    const existingPayment = mockPayments.find(p => p.paymentID === paymentId);
    if (!existingPayment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    const updatedPayment = {
      ...existingPayment,
      ...payment,
      processDate: new Date().toISOString()
    };
    const index = mockPayments.findIndex(p => p.paymentID === paymentId);
    if (index !== -1) {
      mockPayments[index] = updatedPayment;
    }
    return updatedPayment;
  }

  async cancelPayment(paymentId: string, reason: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.paymentID === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.status = PaymentStatus.CANCELLED;
  }

  async getPaymentHistory(paymentId: string, searchParams?: any): Promise<PaymentHistory[]> {
    await this.delay();
    
    // If using the new API format with SearchType and SearchValue
    if (searchParams && searchParams.SearchType === 2 && searchParams.SearchValue) {
      // Mock the API response format but return the expected type (PaymentHistory[])
      const filteredHistory = mockPaymentHistory.filter(h => h.paymentID === searchParams.SearchValue);
      return filteredHistory;
    }
    
    // Fallback to legacy format for backward compatibility
    return mockPaymentHistory.filter(h => h.paymentID === paymentId);
  }

  async approvePayment(paymentId: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.paymentID === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.status = PaymentStatus.APPROVED;
  }

  async rejectPayment(paymentId: string, reason: string): Promise<void> {
    await this.delay();
    const payment = mockPayments.find(p => p.paymentID === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }
    payment.status = PaymentStatus.REJECTED;
  }

  async getPendingPayments(request: PaymentActivityRequest): Promise<PaymentActivityListResponse> {
    await this.delay();
    
    // Filter pending payments based on request parameters
    let filteredPayments = [...mockPendingPayments];
    
    if (request.startDate && request.endDate) {
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.dateProcessed || payment.dueDate || '');
        return paymentDate >= new Date(request.startDate) && paymentDate <= new Date(request.endDate);
      });
    }
    
    if (request.searchType && request.searchValue) {
      switch (request.searchType) {
        case 'MemberID':
          filteredPayments = filteredPayments.filter(p => p.memberID === request.searchValue);
          break;
        case 'PaymentID':
          filteredPayments = filteredPayments.filter(p => p.paymentID === request.searchValue);
          break;
        case 'PayeeID':
          filteredPayments = filteredPayments.filter(p => p.payeeID === request.searchValue);
          break;
        case 'PayeeName':
          if (request.payeeName) {
            filteredPayments = filteredPayments.filter(p => 
              p.payeeName.toLowerCase().includes(request.payeeName?.toLowerCase() || '')
            );
          }
          break;
      }
    }
    
    return {
      paymentActivities: filteredPayments
    };
  }
}