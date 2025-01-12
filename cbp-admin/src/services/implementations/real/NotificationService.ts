import { INotificationService } from '../../interfaces/INotificationService';
import {
    NotificationTemplate,
    NotificationTemplateInput,
    NotificationTemplateFilters,
    NotificationPreview,
    NotificationType,
    NotificationVariable,
    NotificationCategory
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { api } from '../../../utils/api';

export class NotificationService implements INotificationService {
    basePath = '/api/notifications';

    async getTemplates(filters: NotificationTemplateFilters): Promise<PaginatedResponse<NotificationTemplate>> {
        const response = await api.get<PaginatedResponse<NotificationTemplate>>(
            `${this.basePath}/templates`,
            { params: filters }
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getTemplate(templateId: number): Promise<NotificationTemplate> {
        const response = await api.get<NotificationTemplate>(
            `${this.basePath}/templates/${templateId}`
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async createTemplate(template: NotificationTemplateInput): Promise<NotificationTemplate> {
        const response = await api.post<NotificationTemplate>(
            `${this.basePath}/templates`,
            template
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async updateTemplate(templateId: number, template: Partial<NotificationTemplateInput>): Promise<NotificationTemplate> {
        const response = await api.patch<NotificationTemplate>(
            `${this.basePath}/templates/${templateId}`,
            template
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async deleteTemplate(templateId: number): Promise<void> {
        const response = await api.delete<void>(`${this.basePath}/templates/${templateId}`);
        if (!response.success) {
            throw new Error(response.error.message);
        }
    }

    async previewTemplate(templateId: number, sampleData: Record<string, string>): Promise<NotificationPreview> {
        const response = await api.post<NotificationPreview>(
            `${this.basePath}/templates/${templateId}/preview`,
            { sampleData }
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getNotificationTypes(): Promise<NotificationType[]> {
        const response = await api.get<NotificationType[]>(`${this.basePath}/types`);
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getNotificationCategories(): Promise<NotificationCategory[]> {
        const response = await api.get<NotificationCategory[]>(`${this.basePath}/categories`);
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getTemplateVariables(type: NotificationType): Promise<NotificationVariable[]> {
        const response = await api.get<NotificationVariable[]>(
            `${this.basePath}/variables/${type}`
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async sendTestNotification(
        templateId: number,
        testData: Record<string, string>,
        recipients: string[]
    ): Promise<boolean> {
        const response = await api.post<{ success: boolean }>(
            `${this.basePath}/templates/${templateId}/test`,
            { testData, recipients }
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data.success;
    }

    async validateTemplateContent(
        content: string,
        type: NotificationType
    ): Promise<{ valid: boolean; errors: string[] }> {
        const response = await api.post<{ valid: boolean; errors: string[] }>(
            `${this.basePath}/templates/validate`,
            { content, type }
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getDeliverySettings(): Promise<{
        emailEnabled: boolean;
        smsEnabled: boolean;
        defaultRecipients: string[];
        retryAttempts: number;
        retryInterval: number;
    }> {
        const response = await api.get<{
            emailEnabled: boolean;
            smsEnabled: boolean;
            defaultRecipients: string[];
            retryAttempts: number;
            retryInterval: number;
        }>(`${this.basePath}/delivery/settings`);
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async updateDeliverySettings(settings: {
        emailEnabled?: boolean;
        smsEnabled?: boolean;
        defaultRecipients?: string[];
        retryAttempts?: number;
        retryInterval?: number;
    }): Promise<{
        emailEnabled: boolean;
        smsEnabled: boolean;
        defaultRecipients: string[];
        retryAttempts: number;
        retryInterval: number;
    }> {
        const response = await api.patch<{
            emailEnabled: boolean;
            smsEnabled: boolean;
            defaultRecipients: string[];
            retryAttempts: number;
            retryInterval: number;
        }>(
            `${this.basePath}/delivery/settings`,
            settings
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async getDeliveryStatus(notificationId: string): Promise<{
        status: 'pending' | 'sent' | 'failed';
        attempts: number;
        lastAttempt?: string;
        error?: string;
    }> {
        const response = await api.get<{
            status: 'pending' | 'sent' | 'failed';
            attempts: number;
            lastAttempt?: string;
            error?: string;
        }>(`${this.basePath}/delivery/status/${notificationId}`);
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data;
    }

    async retryNotification(notificationId: string): Promise<boolean> {
        const response = await api.post<{ success: boolean }>(
            `${this.basePath}/delivery/retry/${notificationId}`,
            {}
        );
        if (!response.success) {
            throw new Error(response.error.message);
        }
        return response.data.success;
    }
}
