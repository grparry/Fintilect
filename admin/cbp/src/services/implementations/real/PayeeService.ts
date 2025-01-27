import { IPayeeService } from '../../interfaces/IPayeeService';
import { BaseService } from './BaseService';
import { PaginatedResponse } from '../../../types/common.types';
import {
  Payee,
  PayeeStatus,
  PayeeType,
  PayeeValidationResult,
  PayeeConversionSummary,
  PayeeConversionFilters,
  PayeeConversionFile,
  PayeeConversionValidation,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
  PayeeConversionProgress,
  PayeeConversionRecord,
  PayeeConversionTemplate
} from '../../../types/bill-pay.types';

export class PayeeService extends BaseService implements IPayeeService {
  constructor(basePath: string = '/api/v1/payees') {
    super(basePath);
  }
  async getPayees(filters?: Record<string, any>): Promise<PaginatedResponse<Payee>> {
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
    await this.delete(`/${id}`);
  }
  async validatePayee(payee: Partial<Payee>): Promise<PayeeValidationResult> {
    return this.post<PayeeValidationResult>('/validate', payee);
  }
  async getPayeeTypes(): Promise<PayeeType[]> {
    return this.get<PayeeType[]>('/types');
  }
  async getPayeeStatuses(): Promise<PayeeStatus[]> {
    return this.get<PayeeStatus[]>('/statuses');
  }
  async getConversionSummary(): Promise<PayeeConversionSummary> {
    return this.get<PayeeConversionSummary>('/conversions/summary');
  }
  async getConversions(filters: PayeeConversionFilters): Promise<PaginatedResponse<PayeeConversionRecord>> {
    return this.get<PaginatedResponse<PayeeConversionRecord>>('/conversions', { params: filters });
  }
  async getConversionFiles(): Promise<PayeeConversionFile[]> {
    return this.get<PayeeConversionFile[]>('/conversions/files');
  }
  async uploadConversionFile(file: File, templateId: string): Promise<PayeeConversionFileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('templateId', templateId);
    return this.post<PayeeConversionFileUploadResponse>('/conversions/upload', formData);
  }
  async validateConversionFile(fileId: string): Promise<PayeeConversionValidation> {
    return this.post<PayeeConversionValidation>(`/conversions/${fileId}/validate`);
  }
  async startConversion(fileId: string): Promise<PayeeConversionProgressResponse> {
    return this.post<PayeeConversionProgressResponse>(`/conversions/${fileId}/start`);
  }
  async getConversionProgress(fileId: string): Promise<PayeeConversionProgress> {
    return this.get<PayeeConversionProgress>(`/conversions/${fileId}/progress`);
  }
  async cancelConversion(fileId: string): Promise<void> {
    await this.post(`/conversions/${fileId}/cancel`);
  }
  async getConversionTemplates(): Promise<PayeeConversionTemplate[]> {
    return this.get<PayeeConversionTemplate[]>('/conversions/templates');
  }
  async createConversionTemplate(template: Omit<PayeeConversionTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PayeeConversionTemplate> {
    return this.post<PayeeConversionTemplate>('/conversions/templates', template);
  }
  async updateConversionTemplate(templateId: string, template: Partial<PayeeConversionTemplate>): Promise<PayeeConversionTemplate> {
    return this.put<PayeeConversionTemplate>(`/conversions/templates/${templateId}`, template);
  }
  async deleteConversionTemplate(templateId: string): Promise<void> {
    await this.delete(`/conversions/templates/${templateId}`);
  }
  async getConversionHistory(conversionId: string): Promise<Array<{
    action: string;
    timestamp: string;
    details: Record<string, unknown>;
    user: string;
  }>> {
    return this.get(`/conversions/${conversionId}/history`);
  }
  async exportConversionResults(conversionId: string, format: 'csv' | 'excel'): Promise<string> {
    return this.get<string>(`/conversions/${conversionId}/export`, { params: { format } });
  }
  async retryFailedConversions(conversionId: string, recordIds?: string[]): Promise<{
    successful: number;
    failed: number;
    errors: Record<string, string>;
  }> {
    return this.post(`/conversions/${conversionId}/retry`, { recordIds });
  }
}