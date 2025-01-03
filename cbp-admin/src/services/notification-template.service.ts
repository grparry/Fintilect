import { ApiSuccessResponse } from '../types/api.types';
import api from './api';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateFilters,
  NotificationPreview,
  NotificationVariable,
} from '../types/bill-pay.types';

class NotificationTemplateService {
  private readonly baseUrl = '/notification-templates';

  async getTemplates(filters: NotificationTemplateFilters): Promise<{
    templates: NotificationTemplate[];
    total: number;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      templates: NotificationTemplate[];
      total: number;
    }>>(this.baseUrl, { params: filters });
    return response.data.data;
  }

  async getTemplate(id: number): Promise<NotificationTemplate> {
    const response = await api.get<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async createTemplate(template: NotificationTemplateInput): Promise<NotificationTemplate> {
    const response = await api.post<ApiSuccessResponse<NotificationTemplate>>(
      this.baseUrl,
      template
    );
    return response.data.data;
  }

  async updateTemplate(
    id: number,
    template: NotificationTemplateInput
  ): Promise<NotificationTemplate> {
    const response = await api.put<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}`,
      template
    );
    return response.data.data;
  }

  async deleteTemplate(id: number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async duplicateTemplate(id: number): Promise<NotificationTemplate> {
    const response = await api.post<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}/duplicate`
    );
    return response.data.data;
  }

  async previewTemplate(
    id: number,
    sampleData?: Record<string, string>
  ): Promise<NotificationPreview> {
    const response = await api.post<ApiSuccessResponse<NotificationPreview>>(
      `${this.baseUrl}/${id}/preview`,
      { sampleData }
    );
    return response.data.data;
  }

  async getAvailableVariables(): Promise<NotificationVariable[]> {
    const response = await api.get<ApiSuccessResponse<NotificationVariable[]>>(
      `${this.baseUrl}/variables`
    );
    return response.data.data;
  }

  async validateTemplate(template: NotificationTemplateInput): Promise<{
    isValid: boolean;
    errors: Record<string, string>;
  }> {
    const response = await api.post<ApiSuccessResponse<{
      isValid: boolean;
      errors: Record<string, string>;
    }>>(`${this.baseUrl}/validate`, template);
    return response.data.data;
  }

  async exportTemplates(filters: NotificationTemplateFilters): Promise<Blob> {
    const response = await api.get<ApiSuccessResponse<Blob>>(`${this.baseUrl}/export`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data.data;
  }

  async importTemplates(file: File): Promise<{
    imported: NotificationTemplate[];
    errors: Array<{ line: number; error: string }>;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<ApiSuccessResponse<{
      imported: NotificationTemplate[];
      errors: Array<{ line: number; error: string }>;
    }>>(`${this.baseUrl}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }
}

export const notificationTemplateService = new NotificationTemplateService();
