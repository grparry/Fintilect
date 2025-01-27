import { INotificationService } from '../../interfaces/INotificationService';
import { BaseService } from './BaseService';
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

export class NotificationService extends BaseService implements INotificationService {
    constructor(basePath: string = '/api/notifications') {
        super(basePath);
    }

    async getTemplates(filters?: NotificationTemplateFilters): Promise<PaginatedResponse<NotificationTemplate>> {
        return this.get('/templates', { params: filters });
    }

    async getTemplate(id: number): Promise<NotificationTemplate> {
        return this.get(`/templates/${id}`);
    }

    async createTemplate(input: NotificationTemplateInput): Promise<NotificationTemplate> {
        return this.post('/templates', input);
    }

    async updateTemplate(templateId: number, template: Partial<NotificationTemplateInput>): Promise<NotificationTemplate> {
        return this.put(`/templates/${templateId}`, template);
    }

    async deleteTemplate(templateId: number): Promise<void> {
        return this.delete(`/templates/${templateId}`);
    }

    async previewTemplate(templateId: number, sampleData: Record<string, string>): Promise<NotificationPreview> {
        return this.post(`/templates/${templateId}/preview`, { variables: sampleData });
    }

    async getNotificationTypes(): Promise<NotificationType[]> {
        return this.get('/types');
    }

    async getNotificationVariables(): Promise<NotificationVariable[]> {
        return this.get('/variables');
    }

    async getNotificationCategories(): Promise<NotificationCategory[]> {
        return this.get('/categories');
    }

    async sendTestNotification(
        templateId: number,
        testData: Record<string, string>,
        recipients: string[]
    ): Promise<boolean> {












    ): Promise<boolean> {

    ): Promise<{ valid: boolean; errors: string[] }> {





