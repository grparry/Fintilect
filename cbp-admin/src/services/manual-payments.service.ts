import api from './api';
import { ApiPaginatedResponse, PaymentApiResponse } from '../types/api.types';
import {
  Client,
  Payee,
  ManualPayment,
  ManualPaymentValidation,
  PaymentListProps,
  PaymentStatus,
} from '../types/bill-pay.types';

interface FetchClientsParams {
  environment?: string;
  status?: 'active' | 'inactive';
  search?: string;
}

interface FetchPayeesParams {
  clientId?: string;
  accountType?: string;
  status?: 'active' | 'inactive';
  search?: string;
}

interface ApiError {
  response?: {
    data?: {
      code?: string;
      message?: string;
    };
  };
}

class ManualPaymentsService {
  private readonly baseUrl = '/api/v2/payments/manual';

  // Client operations
  async fetchClients(params?: FetchClientsParams): Promise<ApiPaginatedResponse<Client[]>> {
    const response = await api.get<PaymentApiResponse<ApiPaginatedResponse<Client[]>>>('/api/v2/clients', {
      params,
    });
    return response.data.data;
  }

  async getClientById(id: string): Promise<Client> {
    const response = await api.get<PaymentApiResponse<Client>>(`/api/v2/clients/${id}`);
    return response.data.data;
  }

  // Payee operations
  async fetchPayees(params?: FetchPayeesParams): Promise<ApiPaginatedResponse<Payee[]>> {
    const response = await api.get<PaymentApiResponse<ApiPaginatedResponse<Payee[]>>>('/api/v2/payees', {
      params,
    });
    return response.data.data;
  }

  async getPayeeById(id: string): Promise<Payee> {
    const response = await api.get<PaymentApiResponse<Payee>>(`/api/v2/payees/${id}`);
    return response.data.data;
  }

  // Payment operations
  async validatePayment(
    payment: Omit<ManualPayment, 'id' | 'status' | 'createdAt' | 'processedAt'>
  ): Promise<ManualPaymentValidation> {
    try {
      const response = await api.post<PaymentApiResponse<ManualPaymentValidation>>(
        `${this.baseUrl}/validate`,
        payment
      );
      return response.data.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.data?.code === 'VALIDATION_ERROR') {
        throw new Error(apiError.response.data.message || 'Validation failed');
      }
      throw error;
    }
  }

  async validateBankDetails(
    routingNumber: string,
    accountNumber: string
  ): Promise<{
    valid: boolean;
    bankName?: string;
    error?: string;
  }> {
    try {
      const response = await api.post<PaymentApiResponse<{
        valid: boolean;
        bankName?: string;
        error?: string;
      }>>(`${this.baseUrl}/validate-bank`, {
        routingNumber,
        accountNumber,
      });
      return response.data.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.data?.code === 'INVALID_BANK_DETAILS') {
        return {
          valid: false,
          error: apiError.response.data.message || 'Invalid bank details',
        };
      }
      throw error;
    }
  }

  async submitPayment(
    payment: Omit<ManualPayment, 'id' | 'status' | 'createdAt' | 'processedAt'>
  ): Promise<ManualPayment> {
    try {
      const response = await api.post<PaymentApiResponse<ManualPayment>>(
        this.baseUrl,
        payment
      );
      return response.data.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.data?.code === 'PAYMENT_SUBMISSION_ERROR') {
        throw new Error(apiError.response.data.message || 'Payment submission failed');
      }
      throw error;
    }
  }

  async saveDraft(
    draft: Omit<ManualPayment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ManualPayment> {
    try {
      const response = await api.post<PaymentApiResponse<ManualPayment>>(
        `${this.baseUrl}/drafts`,
        draft
      );
      return response.data.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.data?.code === 'DRAFT_SAVE_ERROR') {
        throw new Error(apiError.response.data.message || 'Failed to save draft');
      }
      throw error;
    }
  }

  async fetchDrafts(params?: PaymentListProps): Promise<ApiPaginatedResponse<ManualPayment[]>> {
    const response = await api.get<PaymentApiResponse<ApiPaginatedResponse<ManualPayment[]>>>(
      `${this.baseUrl}/drafts`,
      { params }
    );
    return response.data.data;
  }

  async getDraftById(id: string): Promise<ManualPayment> {
    const response = await api.get<PaymentApiResponse<ManualPayment>>(
      `${this.baseUrl}/drafts/${id}`
    );
    return response.data.data;
  }

  async deleteDraft(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/drafts/${id}`);
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
