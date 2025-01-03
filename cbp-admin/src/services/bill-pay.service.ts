import api from './api';
import { AuditLog } from '../types/bill-pay.types';
import { ApiResponse } from '../types/api.types';

interface AuditLogRequest {
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

class BillPayService {
  private readonly baseUrl = '/api/bill-pay';

  async getAuditLogs(params: AuditLogRequest): Promise<ApiResponse<AuditLog[]>> {
    const response = await api.get<ApiResponse<AuditLog[]>>(`${this.baseUrl}/audit-log`, { params });
    return response.data;
  }
}

export const billPayService = new BillPayService();
