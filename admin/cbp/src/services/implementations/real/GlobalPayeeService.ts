import { IGlobalPayeeService } from '../../interfaces/IGlobalPayeeService';
import { BaseService } from './BaseService';
import { PaginatedResponse } from '../../../types/common.types';
import { PaymentStatus, PaymentMethod } from '../../../types/payment.types';
import {
  Payee,
  PaymentValidationResult,
  FisPayeeRequest,
  FisPayeeResponse
} from '../../../types/bill-pay.types';

export class GlobalPayeeService extends BaseService implements IGlobalPayeeService {
  constructor(basePath: string = '/api/v1/payees') {
    super(basePath);
  }

  async getFisPayee(request: FisPayeeRequest): Promise<FisPayeeResponse> {
    try {
      return await this.post<FisPayeeResponse>('/fis-payee', request);
    } catch (error: any) {
      // Handle 409 Conflict specifically for FIS payee endpoint
      if (error?.response?.status === 409 || (error?.message && error?.message.includes('409'))) {
        throw new Error('No matching FIS payee found. Please verify the information provided.');
      }
      throw error;
    }
  }

  async getPayees(filters?: { clientId?: string; status?: PaymentStatus; type?: PaymentMethod; searchTerm?: string; }): Promise<PaginatedResponse<Payee>> {
    return this.get<PaginatedResponse<Payee>>('', { params: filters });
  }

  async getPayee(id: string): Promise<Payee> {
    return this.get<Payee>(`/${id}`);
  }

  async createPayee(payee: Partial<Payee>): Promise<Payee> {
    return this.post<Payee>('', payee);
  }

  async updatePayee(id: string, payee: Partial<Payee>): Promise<Payee> {
    return this.put<Payee>(`/${id}`, payee);
  }

  async deletePayee(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }

  async validatePayee(payee: Partial<Payee>): Promise<PaymentValidationResult> {
    return this.post<PaymentValidationResult>('/validate', payee);
  }

  async getPayeeTypes(): Promise<PaymentMethod[]> {
    return this.get<PaymentMethod[]>('/types');
  }

  async getPayeeStatuses(): Promise<PaymentStatus[]> {
    return this.get<PaymentStatus[]>('/statuses');
  }
}