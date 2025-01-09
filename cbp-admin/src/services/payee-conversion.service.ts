import { api, ApiResponse } from '../utils/api';
import {
  PayeeConversionFile,
  PayeeConversionFilters,
  PayeeConversionProgress,
  PayeeConversionRecord,
  PayeeConversionTemplate,
  PayeeConversionValidation,
} from '../types/bill-pay.types';

class PayeeConversionService {
  private readonly baseUrl = '/api/v1/payee-conversion';

  async getFiles(filters?: PayeeConversionFilters): Promise<{
    files: PayeeConversionFile[];
    total: number;
  }> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await api.get<{
      files: PayeeConversionFile[];
      total: number;
    }>(`${this.baseUrl}?${queryParams.toString()}`);

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async getFileById(id: string): Promise<PayeeConversionFile> {
    const response = await api.get<PayeeConversionFile>(
      `${this.baseUrl}/${id}`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async uploadFile(file: File, templateId: string): Promise<PayeeConversionFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('templateId', templateId);

    const response = await api.post<PayeeConversionFile>(
      `${this.baseUrl}/upload`,
      formData
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async validateFile(id: string): Promise<PayeeConversionValidation> {
    const response = await api.post<PayeeConversionValidation>(
      `${this.baseUrl}/${id}/validate`,
      {}
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async processFile(id: string): Promise<void> {
    const response = await api.post<void>(
      `${this.baseUrl}/${id}/process`,
      {}
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }
  }

  async getFileProgress(id: string): Promise<PayeeConversionProgress> {
    const response = await api.get<PayeeConversionProgress>(
      `${this.baseUrl}/${id}/progress`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async getFileRecords(
    id: string,
    page: number,
    limit: number
  ): Promise<{
    records: PayeeConversionRecord[];
    total: number;
  }> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await api.get<{
      records: PayeeConversionRecord[];
      total: number;
    }>(`${this.baseUrl}/${id}/records?${queryParams.toString()}`);

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async getTemplates(): Promise<PayeeConversionTemplate[]> {
    const response = await api.get<PayeeConversionTemplate[]>(
      `${this.baseUrl}/templates`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async downloadTemplate(id: string): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/templates/${id}/download`,
      { isBlob: true }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async downloadValidationReport(id: string): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/${id}/validation/download`,
      { isBlob: true }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async downloadProcessingReport(id: string): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/${id}/processing/download`,
      { isBlob: true }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }
}

export const payeeConversionService = new PayeeConversionService();
