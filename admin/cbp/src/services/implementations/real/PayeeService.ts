import { IPayeeService } from '../../interfaces/IPayeeService';
import { BaseService } from './BaseService';
import { PaginatedResponse } from '../../../types/common.types';
import { PaymentStatus, PaymentMethod } from '../../../types/payment.types';
import {
  Payee,
  PaymentValidationResult,
  FisPayeeRequest,
  FisPayeeResponse
} from '../../../types/bill-pay.types';

export class PayeeService extends BaseService implements IPayeeService {
  constructor(basePath: string = '/api/v1/payees') {
    super(basePath);
  }

  async getFisPayee(request: FisPayeeRequest): Promise<FisPayeeResponse> {
    return this.post<FisPayeeResponse>('/fis-payee', request);
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