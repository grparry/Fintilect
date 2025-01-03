import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateFilters,
  NotificationVariable,
  NotificationPreview,
} from '../types/bill-pay.types';

class NotificationTemplatesService {
  private readonly baseUrl = '/api/notification-templates';

  async fetchTemplates(
    filters?: NotificationTemplateFilters
  ): Promise<{
    templates: NotificationTemplate[];
    total: number;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      templates: NotificationTemplate[];
      total: number;
    }>>(this.baseUrl, { params: filters });
    return response.data.data;
  }

  async getTemplateById(id: string): Promise<NotificationTemplate> {
    const response = await api.get<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async createTemplate(
    data: NotificationTemplateInput
  ): Promise<NotificationTemplate> {
    const response = await api.post<ApiSuccessResponse<NotificationTemplate>>(
      this.baseUrl,
      data
    );
    return response.data.data;
  }

  async updateTemplate(
    id: string,
    data: Partial<NotificationTemplateInput>
  ): Promise<NotificationTemplate> {
    const response = await api.patch<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data.data;
  }

  async deleteTemplate(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async validateTemplate(
    data: NotificationTemplateInput
  ): Promise<{ isValid: boolean; errors: Record<string, string> }> {
    const response = await api.post<
      ApiSuccessResponse<{ isValid: boolean; errors: Record<string, string> }>
    >(`${this.baseUrl}/validate`, data);
    return response.data.data;
  }

  async previewTemplate(
    id: string,
    variables: Record<string, string>
  ): Promise<NotificationPreview> {
    const response = await api.post<ApiSuccessResponse<NotificationPreview>>(
      `${this.baseUrl}/${id}/preview`,
      { variables }
    );
    return response.data.data;
  }

  async cloneTemplate(
    id: string,
    newName: string
  ): Promise<NotificationTemplate> {
    const response = await api.post<ApiSuccessResponse<NotificationTemplate>>(
      `${this.baseUrl}/${id}/clone`,
      { name: newName }
    );
    return response.data.data;
  }

  async getAvailableVariables(): Promise<NotificationVariable[]> {
    const response = await api.get<ApiSuccessResponse<NotificationVariable[]>>(
      `${this.baseUrl}/variables`
    );
    return response.data.data;
  }

  async sendTestNotification(
    id: string,
    recipient: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post<
      ApiSuccessResponse<{ success: boolean; message: string }>
    >(`${this.baseUrl}/${id}/test`, { recipient });
    return response.data.data;
  }
}

export const notificationTemplatesService = new NotificationTemplatesService();
