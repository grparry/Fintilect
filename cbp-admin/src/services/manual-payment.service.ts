import api from './api';
import { PaymentApiResponse } from '../types/api.types';
import {
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  Client,
  Payee,
} from '../types/bill-pay.types';

class ManualPaymentService {
  private readonly baseUrl = '/api/manual-payments';

  async getClients(): Promise<Client[]> {
    const response = await api.get<PaymentApiResponse<Client[]>>(`/api/clients`);
    return response.data.data;
  }

  async getPayees(): Promise<Payee[]> {
    const response = await api.get<PaymentApiResponse<Payee[]>>(`/api/payees`);
    return response.data.data;
  }

  async createPayment(data: ManualPaymentFormData): Promise<ManualPayment> {
    const response = await api.post<PaymentApiResponse<ManualPayment>>(this.baseUrl, data);
    return response.data.data;
  }

  async saveDraft(data: ManualPaymentFormData): Promise<ManualPayment> {
    const response = await api.post<PaymentApiResponse<ManualPayment>>(`${this.baseUrl}/draft`, data);
    return response.data.data;
  }

  async validatePayment(data: ManualPaymentFormData): Promise<ManualPaymentValidation> {
    const response = await api.post<PaymentApiResponse<ManualPaymentValidation>>(`${this.baseUrl}/validate`, data);
    return response.data.data;
  }

  async validateRoutingNumber(routingNumber: string): Promise<{
    valid: boolean;
    bankName?: string;
    message?: string;
  }> {
    const response = await api.post<PaymentApiResponse<{
      valid: boolean;
      bankName?: string;
      message?: string;
    }>>(`${this.baseUrl}/validate-routing`, { routingNumber });
    return response.data.data;
  }

  async getPayment(id: string): Promise<ManualPayment> {
    const response = await api.get<PaymentApiResponse<ManualPayment>>(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  async getDrafts(): Promise<ManualPayment[]> {
    const response = await api.get<PaymentApiResponse<ManualPayment[]>>(`${this.baseUrl}/drafts`);
    return response.data.data;
  }

  async deleteDraft(id: string): Promise<void> {
    const response = await api.delete<PaymentApiResponse<void>>(`${this.baseUrl}/drafts/${id}`);
    return response.data.data;
  }
}

export const manualPaymentService = new ManualPaymentService();
