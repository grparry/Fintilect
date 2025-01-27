import { INotificationService } from '@/../interfaces/INotificationService';
import { BaseMockService } from '@/BaseMockService';
import {
    NotificationTemplate,
    NotificationTemplateInput,
    NotificationTemplateFilters,
    NotificationPreview,
    NotificationType,
    NotificationVariable,
    NotificationCategory
} from '@/../../types/bill-pay.types';
import { PaginatedResponse } from '@/../../types/common.types';
import { 
    mockTemplates,
    mockTemplateCategories,
    mockTemplateVariables,
    mockTemplateVersions
} from '@/data/notification/templates';
import { 
    mockDeliveryMethods,
    mockDeliveryPreferences,
    mockDeliveryStats
} from '@/data/notification/delivery';
import { v4 as uuidv4 } from 'uuid';
import { mockDeliverySettings } from '@/data/notifications/mockNotificationData';

export class MockNotificationService extends BaseMockService implements INotificationService {
    constructor(basePath: string = '/api/v1/notifications') {
        super(basePath);
    }

    private templates: NotificationTemplate[] = [...mockTemplates];
    private deliverySettings = { ...mockDeliverySettings };

    private deliveryStatuses: Record<string, {
        status: 'sent' | 'failed';
        attempts: number;
        lastAttempt: string;
    }> = {};

    async getTemplates(filters: NotificationTemplateFilters): Promise<PaginatedResponse<NotificationTemplate>> {
        let filteredTemplates = [...this.templates];

        // Apply filters
        if (filters.type && filters.type !== 'all') {
            filteredTemplates = filteredTemplates.filter(t => t.type === filters.type);
        }
        if (filters.category && filters.category !== 'all') {
            filteredTemplates = filteredTemplates.filter(t => t.category === filters.category);
        }
        if (filters.active !== undefined) {
            filteredTemplates = filteredTemplates.filter(t => t.active === filters.active);
        }
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filteredTemplates = filteredTemplates.filter(t => 
                t.name.toLowerCase().includes(searchLower) ||
                t.subject.toLowerCase().includes(searchLower)
            );
        }

        // Apply pagination
        const page = 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

        return {
            items: paginatedTemplates,
            total: filteredTemplates.length,
            page,
            limit,
            totalPages: Math.ceil(filteredTemplates.length / limit)
        };
    }

    async getTemplate(templateId: number): Promise<NotificationTemplate> {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) {
            throw new Error('Template not found');
        }
        return template;
    }

    async createTemplate(template: NotificationTemplateInput): Promise<NotificationTemplate> {
        const newTemplate: NotificationTemplate = {
            ...template,
            id: this.templates.length + 1,
            active: true,
            lastModified: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            variables: mockTemplateVariables[template.type]
        };

        this.templates.push(newTemplate);
        return newTemplate;
    }

    async updateTemplate(templateId: number, template: Partial<NotificationTemplateInput>): Promise<NotificationTemplate> {
        const index = this.templates.findIndex(t => t.id === templateId);
        if (index === -1) {
            throw new Error('Template not found');
        }

        this.templates[index] = {
            ...this.templates[index],
            ...template,
            updatedAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        return this.templates[index];
    }

    async deleteTemplate(templateId: number): Promise<void> {
        const index = this.templates.findIndex(t => t.id === templateId);
        if (index === -1) {
            throw new Error('Template not found');
        }

        this.templates.splice(index, 1);
    }

    async previewTemplate(templateId: number, sampleData: Record<string, string>): Promise<NotificationPreview> {
        const template = await this.getTemplate(templateId);
        let content = template.content;

        // Replace variables in content
        Object.entries(sampleData).forEach(([key, value]) => {
            content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });

        return {
            subject: template.subject,
            content,
            sampleData
        };
    }

    async getNotificationTypes(): Promise<NotificationType[]> {
        return Object.values(NotificationType);
    }

    async getNotificationCategories(): Promise<NotificationCategory[]> {
        return mockTemplateCategories;
    }

    async getTemplateVariables(type: NotificationType): Promise<NotificationVariable[]> {
        return mockTemplateVariables[type] || [];
    }

    async sendTestNotification(
        templateId: number,
        testData: Record<string, string>,
        recipients: string[]
    ): Promise<boolean> {
        const template = await this.getTemplate(templateId);
        const preview = await this.previewTemplate(templateId, testData);

        // Simulate sending notification
        const notificationId = uuidv4();
        this.deliveryStatuses[notificationId] = {
            status: 'sent',
            attempts: 1,
            lastAttempt: new Date().toISOString()
        };

        return true;
    }

    async validateTemplateContent(
        content: string,
        type: NotificationType
    ): Promise<{ valid: boolean; errors: string[] }> {
        const variables = mockTemplateVariables[type];
        const errors: string[] = [];

        // Check if all required variables are present
        variables.forEach(variable => {
            if (!content.includes(`{{${variable.name}}}`)) {
                errors.push(`Missing required variable: ${variable.name}`);
            }
        });

        // Check for invalid variables
        const matches = content.match(/{{([^}]+)}}/g) || [];
        matches.forEach(match => {
            const variableName = match.slice(2, -2);
            if (!variables.some(v => v.name === variableName)) {
                errors.push(`Invalid variable: ${variableName}`);
            }
        });

        return {
            valid: errors.length === 0,
            errors
        };
    }

    async getDeliverySettings(): Promise<{
        emailEnabled: boolean;
        smsEnabled: boolean;
        defaultRecipients: string[];
        retryAttempts: number;
        retryInterval: number;
    }> {
        return this.deliverySettings;
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
        this.deliverySettings = {
            ...this.deliverySettings,
            ...settings
        };
        return this.deliverySettings;
    }

    async getDeliveryStatus(notificationId: string): Promise<{
        status: 'pending' | 'sent' | 'failed';
        attempts: number;
        lastAttempt?: string;
        error?: string;
    }> {
        const status = this.deliveryStatuses[notificationId];
        if (!status) {
            throw new Error('Notification not found');
        }
        return {
            status: status.status,
            attempts: status.attempts,
            lastAttempt: status.lastAttempt
        };
    }

    async retryNotification(notificationId: string): Promise<boolean> {
        const status = this.deliveryStatuses[notificationId];
        if (!status) {
            throw new Error('Notification not found');
        }

        if (status.status !== 'failed') {
            throw new Error('Can only retry failed notifications');
        }

        if (status.attempts >= this.deliverySettings.retryAttempts) {
            return false;
        }

        // Simulate retry
        this.deliveryStatuses[notificationId] = {
            ...status,
            status: 'sent',
            attempts: status.attempts + 1,
            lastAttempt: new Date().toISOString()
        };

        return true;
    }

    async getDeliveryStats(method?: string): Promise<{
        totalSent: number;
        totalFailed: number;
        byMethod: {
            email: { sent: number; failed: number };
            sms: { sent: number; failed: number };
        };
    }> {
        const stats = {
            totalSent: 0,
            totalFailed: 0,
            byMethod: {
                email: { sent: 0, failed: 0 },
                sms: { sent: 0, failed: 0 }
            }
        };

        Object.values(this.deliveryStatuses).forEach(status => {
            if (status.status === 'sent') {
                stats.totalSent++;
                if (method === 'email') stats.byMethod.email.sent++;
                if (method === 'sms') stats.byMethod.sms.sent++;
            } else {
                stats.totalFailed++;
                if (method === 'email') stats.byMethod.email.failed++;
                if (method === 'sms') stats.byMethod.sms.failed++;
            }
        });

        return stats;
    }
}
