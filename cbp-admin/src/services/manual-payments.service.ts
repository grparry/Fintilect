import api from './api';
import { PaymentApiResponse } from '../types/api.types';
import {
  Client,
  Payee,
  ManualPayment,
  ManualPaymentValidation,
} from '../types/bill-pay.types';

interface FetchClientsParams {
  environment?: string;
  status?: string;
  search?: string;
}

interface FetchPayeesParams {
  clientId?: string;
  accountType?: string;
  status?: string;
  search?: string;
}

class ManualPaymentsService {
  private readonly baseUrl = '/api/manual-payments';

  // Client operations
  async fetchClients(params?: FetchClientsParams): Promise<Client[]> {
    const response = await api.get<PaymentApiResponse<Client[]>>('/api/clients', {
      params,
    });
    return response.data.data;
  }

  async getClientById(id: string): Promise<Client> {
    const response = await api.get<PaymentApiResponse<Client>>(`/api/clients/${id}`);
    return response.data.data;
  }

  // Payee operations
  async fetchPayees(params?: FetchPayeesParams): Promise<Payee[]> {
    const response = await api.get<PaymentApiResponse<Payee[]>>('/api/payees', {
      params,
    });
    return response.data.data;
  }

  async getPayeeById(id: string): Promise<Payee> {
    const response = await api.get<PaymentApiResponse<Payee>>(`/api/payees/${id}`);
    return response.data.data;
  }

  // Payment operations
  async validatePayment(
    payment: Omit<ManualPayment, 'id' | 'status' | 'createdAt' | 'processedAt'>
  ): Promise<ManualPaymentValidation> {
    const response = await api.post<PaymentApiResponse<ManualPaymentValidation>>(
      `${this.baseUrl}/validate`,
      payment
    );
    return response.data.data;
  }

  async validateBankDetails(
    routingNumber: string,
    accountNumber: string
  ): Promise<{
    valid: boolean;
    bankName?: string;
    error?: string;
  }> {
    const response = await api.post<PaymentApiResponse<{
      valid: boolean;
      bankName?: string;
      error?: string;
    }>>(`${this.baseUrl}/validate-bank`, {
      routingNumber,
      accountNumber,
    });
    return response.data.data;
  }

  async submitPayment(
    payment: Omit<ManualPayment, 'id' | 'status' | 'createdAt' | 'processedAt'>
  ): Promise<ManualPayment> {
    const response = await api.post<PaymentApiResponse<ManualPayment>>(
      this.baseUrl,
      payment
    );
    return response.data.data;
  }

  async saveDraft(
    draft: Omit<ManualPayment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ManualPayment> {
    const response = await api.post<PaymentApiResponse<ManualPayment>>(
      `${this.baseUrl}/drafts`,
      draft
    );
    return response.data.data;
  }

  async updateDraft(
    id: string,
    draft: Partial<ManualPayment>
  ): Promise<ManualPayment> {
    const response = await api.patch<PaymentApiResponse<ManualPayment>>(
      `${this.baseUrl}/drafts/${id}`,
      draft
    );
    return response.data.data;
  }

  async getDraft(id: string): Promise<ManualPayment> {
    const response = await api.get<PaymentApiResponse<ManualPayment>>(`${this.baseUrl}/drafts/${id}`);
    return response.data.data;
  }

  async deleteDraft(id: string): Promise<void> {
    const response = await api.delete<PaymentApiResponse<void>>(`${this.baseUrl}/drafts/${id}`);
    return response.data.data;
  }

  async getPaymentLimits(
    clientId: string,
    paymentType: string
  ): Promise<{
    min: number;
    max: number;
    currency: string;
    dailyLimit: number;
    monthlyLimit: number;
  }> {
    const response = await api.get<PaymentApiResponse<{
      min: number;
      max: number;
      currency: string;
      dailyLimit: number;
      monthlyLimit: number;
    }>>(`${this.baseUrl}/limits/${clientId}/${paymentType}`);
    return response.data.data;
  }
}

export const manualPaymentsService = new ManualPaymentsService();
