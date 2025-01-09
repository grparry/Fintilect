import { api } from '../utils/api';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateFilters,
  NotificationPreview,
  NotificationVariable,
} from '../types/bill-pay.types';

class NotificationTemplateService {
  private readonly baseUrl = '/api/v1/notification-templates';

  async getTemplates(filters?: NotificationTemplateFilters): Promise<{
    templates: NotificationTemplate[];
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
      templates: NotificationTemplate[];
      total: number;
    }>(`${this.baseUrl}?${queryParams.toString()}`);

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async getTemplate(id: string): Promise<NotificationTemplate> {
    const response = await api.get<NotificationTemplate>(
      `${this.baseUrl}/${id}`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async createTemplate(template: NotificationTemplateInput): Promise<NotificationTemplate> {
    const response = await api.post<NotificationTemplate>(
      this.baseUrl,
      template
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async updateTemplate(
    id: string,
    template: Partial<NotificationTemplateInput>
  ): Promise<NotificationTemplate> {
    const response = await api.put<NotificationTemplate>(
      `${this.baseUrl}/${id}`,
      template
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async deleteTemplate(id: string): Promise<void> {
    const response = await api.delete<void>(`${this.baseUrl}/${id}`);

    if (!response.success) {
      throw new Error(response.error.message);
    }
  }

  async cloneTemplate(id: string, newName: string): Promise<NotificationTemplate> {
    const response = await api.post<NotificationTemplate>(
      `${this.baseUrl}/${id}/clone`,
      { name: newName }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async previewTemplate(
    id: string,
    variables?: Record<string, string>
  ): Promise<NotificationPreview> {
    const response = await api.post<NotificationPreview>(
      `${this.baseUrl}/${id}/preview`,
      { variables }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async getAvailableVariables(): Promise<NotificationVariable[]> {
    const response = await api.get<NotificationVariable[]>(
      `${this.baseUrl}/variables`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async validateTemplate(template: NotificationTemplateInput): Promise<{
    isValid: boolean;
    errors: Record<string, string>;
  }> {
    const response = await api.post<{
      isValid: boolean;
      errors: Record<string, string>;
    }>(`${this.baseUrl}/validate`, template);

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async exportTemplates(filters?: NotificationTemplateFilters): Promise<Blob> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await api.get<Blob>(
      `${this.baseUrl}/export?${queryParams.toString()}`,
      { isBlob: true }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async importTemplates(file: File): Promise<{
    imported: NotificationTemplate[];
    errors: Array<{ line: number; error: string }>;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{
      imported: NotificationTemplate[];
      errors: Array<{ line: number; error: string }>;
    }>(`${this.baseUrl}/import`, formData);

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  async sendTestNotification(
    id: string,
    recipient: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/${id}/test`,
      { recipient }
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }
}

export const notificationTemplateService = new NotificationTemplateService();
