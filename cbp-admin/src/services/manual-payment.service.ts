import { PaymentApiResponse } from '../types/api.types';
import { paymentApi } from './api/payment.api';
import {
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  Client,
  Payee,
  PaymentStatus,
  Payment,
  PaymentMethod,
  PaymentType
} from '../types/bill-pay.types';

class ManualPaymentService {
  private readonly baseUrl = '/api/v1/manual-payments';

  private readonly paymentMethodMap: Record<ManualPayment['paymentType'], PaymentMethod> = {
    'ACH': PaymentMethod.ACH,
    'Wire': PaymentMethod.WIRE,
    'RTP': PaymentMethod.RTP
  };

  async getClients(): Promise<Client[]> {
    const response = await paymentApi.getClients();
    return response.data;
  }

  async getPayees(): Promise<Payee[]> {
    const response = await paymentApi.getPayees();
    return response.data;
  }

  async createPayment(data: ManualPaymentFormData): Promise<ManualPayment> {
    const paymentData: Partial<Payment> = {
      clientId: data.clientId,
      payeeId: data.payeeId,
      amount: data.amount,
      method: this.paymentMethodMap[data.paymentType],
      effectiveDate: data.effectiveDate,
      description: data.memo,
      status: PaymentStatus.SUBMITTED,
      metadata: {
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
        bankName: data.bankName,
      }
    };

    const response = await paymentApi.saveDraft(paymentData);
    return this.convertToManualPayment(response.data);
  }

  async saveDraft(data: ManualPaymentFormData): Promise<ManualPayment> {
    const paymentData: Partial<Payment> = {
      clientId: data.clientId,
      payeeId: data.payeeId,
      amount: data.amount,
      method: this.paymentMethodMap[data.paymentType],
      effectiveDate: data.effectiveDate,
      description: data.memo,
      status: PaymentStatus.DRAFT,
      metadata: {
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
        bankName: data.bankName,
      }
    };

    const response = await paymentApi.saveDraft(paymentData);
    return this.convertToManualPayment(response.data);
  }

  async validatePayment(data: ManualPaymentFormData): Promise<ManualPaymentValidation> {
    const paymentData: Partial<Payment> = {
      clientId: data.clientId,
      payeeId: data.payeeId,
      amount: data.amount,
      method: this.paymentMethodMap[data.paymentType],
      effectiveDate: data.effectiveDate,
      description: data.memo,
      metadata: {
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
        bankName: data.bankName,
      }
    };

    const response = await paymentApi.validatePayment(paymentData);
    return {
      valid: response.data,
      errors: []
    };
  }

  async validateRoutingNumber(routingNumber: string): Promise<{
    valid: boolean;
    bankName?: string;
    message?: string;
  }> {
    const response = await paymentApi.validatePayment({ metadata: { routingNumber } });
    return {
      valid: response.data,
      bankName: undefined,
      message: undefined
    };
  }

  async getPayment(id: string): Promise<ManualPayment> {
    const response = await paymentApi.saveDraft({ id });
    return this.convertToManualPayment(response.data);
  }

  async getDrafts(): Promise<ManualPayment[]> {
    const response = await paymentApi.saveDraft({ status: PaymentStatus.DRAFT });
    const payments = Array.isArray(response.data) ? response.data : [response.data];
    return payments.map(payment => this.convertToManualPayment(payment));
  }

  async deleteDraft(id: string): Promise<void> {
    await paymentApi.bulkDelete([id]);
  }

  private convertToManualPayment(payment: Payment): ManualPayment {
    const reverseMethodMap: Partial<Record<PaymentMethod, PaymentType>> = {
      [PaymentMethod.ACH]: 'ACH',
      [PaymentMethod.WIRE]: 'Wire',
      [PaymentMethod.RTP]: 'RTP'
    };

    const statusMap: Record<PaymentStatus, ManualPayment['status']> = {
      [PaymentStatus.PENDING]: 'Draft',
      [PaymentStatus.APPROVED]: 'Submitted',
      [PaymentStatus.PROCESSING]: 'Processing',
      [PaymentStatus.COMPLETED]: 'Complete',
      [PaymentStatus.FAILED]: 'Failed',
      [PaymentStatus.REJECTED]: 'Failed',
      [PaymentStatus.CANCELLED]: 'Failed',
      [PaymentStatus.EXPIRED]: 'Failed',
      [PaymentStatus.PENDING_APPROVAL]: 'Draft',
      [PaymentStatus.DRAFT]: 'Draft',
      [PaymentStatus.SUBMITTED]: 'Submitted',
      [PaymentStatus.SCHEDULED]: 'Processing',
      [PaymentStatus.RETURNED]: 'Failed',
      [PaymentStatus.STOP_PAYMENT]: 'Failed',
      [PaymentStatus.REVERSED]: 'Failed',
      [PaymentStatus.REFUNDED]: 'Failed',
      [PaymentStatus.RESENT]: 'Processing',
      [PaymentStatus.REINITIATED]: 'Processing',
      [PaymentStatus.PENDING_REVERSAL]: 'Processing',
      [PaymentStatus.PENDING_REFUND]: 'Processing',
      [PaymentStatus.PENDING_RETURN]: 'Processing',
      [PaymentStatus.PENDING_STOP_PAYMENT]: 'Processing',
      [PaymentStatus.PENDING_RESEND]: 'Processing',
      [PaymentStatus.PENDING_REINITIATE]: 'Processing'
    };

    const paymentType = reverseMethodMap[payment.method];
    if (!paymentType) {
      throw new Error(`Unsupported payment method: ${payment.method}`);
    }

    return {
      id: payment.id,
      clientId: payment.clientId,
      payeeId: payment.payeeId,
      amount: payment.amount,
      paymentType,
      effectiveDate: payment.effectiveDate,
      memo: payment.description,
      accountNumber: payment.metadata?.accountNumber || '',
      routingNumber: payment.metadata?.routingNumber || '',
      bankName: payment.metadata?.bankName || '',
      status: statusMap[payment.status],
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    };
  }
}

export const manualPaymentService = new ManualPaymentService();
