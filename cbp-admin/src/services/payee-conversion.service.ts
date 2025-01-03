import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import {
  PayeeConversionFile,
  PayeeConversionFilters,
  PayeeConversionProgress,
  PayeeConversionRecord,
  PayeeConversionTemplate,
  PayeeConversionValidation,
} from '../types/bill-pay.types';

class PayeeConversionService {
  private readonly baseUrl = '/payee-conversion';

  async getFiles(filters?: PayeeConversionFilters): Promise<{
    files: PayeeConversionFile[];
    total: number;
  }> {
    const response = await api.get<
      ApiSuccessResponse<{
        files: PayeeConversionFile[];
        total: number;
      }>
    >(this.baseUrl, { params: filters });
    return response.data.data;
  }

  async getFileById(id: string): Promise<PayeeConversionFile> {
    const response = await api.get<ApiSuccessResponse<PayeeConversionFile>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async uploadFile(file: File, templateId: string): Promise<PayeeConversionFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('templateId', templateId);

    const response = await api.post<ApiSuccessResponse<PayeeConversionFile>>(
      `${this.baseUrl}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  }

  async validateFile(id: string): Promise<PayeeConversionValidation> {
    const response = await api.post<ApiSuccessResponse<PayeeConversionValidation>>(
      `${this.baseUrl}/${id}/validate`
    );
    return response.data.data;
  }

  async processFile(id: string): Promise<void> {
    await api.post(`${this.baseUrl}/${id}/process`);
  }

  async getFileProgress(id: string): Promise<PayeeConversionProgress> {
    const response = await api.get<ApiSuccessResponse<PayeeConversionProgress>>(
      `${this.baseUrl}/${id}/progress`
    );
    return response.data.data;
  }

  async getFileRecords(
    id: string,
    page: number,
    limit: number
  ): Promise<{
    records: PayeeConversionRecord[];
    total: number;
  }> {
    const response = await api.get<
      ApiSuccessResponse<{
        records: PayeeConversionRecord[];
        total: number;
      }>
    >(`${this.baseUrl}/${id}/records`, {
      params: { page, limit },
    });
    return response.data.data;
  }

  async getTemplates(): Promise<PayeeConversionTemplate[]> {
    const response = await api.get<ApiSuccessResponse<PayeeConversionTemplate[]>>(
      `${this.baseUrl}/templates`
    );
    return response.data.data;
  }

  async downloadTemplate(id: string): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/templates/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async downloadValidationReport(id: string): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/${id}/validation/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async downloadProcessingReport(id: string): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/${id}/processing/download`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const payeeConversionService = new PayeeConversionService();
