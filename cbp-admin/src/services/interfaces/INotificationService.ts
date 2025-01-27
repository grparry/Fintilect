import { IBaseService } from '@/IBaseService';
import {
    NotificationTemplate,
    NotificationTemplateInput,
    NotificationTemplateFilters,
    NotificationPreview,
    NotificationType,
    NotificationVariable,
    NotificationCategory
} from '@/../types/bill-pay.types';
import { PaginatedResponse } from '@/../types/common.types';

/**
 * Interface for notification management
 * Handles notification templates, delivery settings, and sending notifications
 */
export interface INotificationService extends IBaseService {
    /**
     * Get notification templates with pagination and filtering
     * @param filters Template filters
     * @returns Paginated list of notification templates
     */
    getTemplates(filters: NotificationTemplateFilters): Promise<PaginatedResponse<NotificationTemplate>>;

    /**
     * Get specific notification template
     * @param templateId Template identifier
     * @returns Template details
     */
    getTemplate(templateId: number): Promise<NotificationTemplate>;

    /**
     * Create notification template
     * @param template Template to create
     * @returns Created template
     */
    createTemplate(template: NotificationTemplateInput): Promise<NotificationTemplate>;

    /**
     * Update notification template
     * @param templateId Template identifier
     * @param template Updated template data
     * @returns Updated template
     */
    updateTemplate(templateId: number, template: Partial<NotificationTemplateInput>): Promise<NotificationTemplate>;

    /**
     * Delete notification template
     * @param templateId Template identifier
     */
    deleteTemplate(templateId: number): Promise<void>;

    /**
     * Preview notification with sample data
     * @param templateId Template identifier
     * @param sampleData Sample data for preview
     * @returns Preview with rendered content
     */
    previewTemplate(templateId: number, sampleData: Record<string, string>): Promise<NotificationPreview>;

    /**
     * Get available notification types
     * @returns List of notification types
     */
    getNotificationTypes(): Promise<NotificationType[]>;

    /**
     * Get available notification categories
     * @returns List of notification categories
     */
    getNotificationCategories(): Promise<NotificationCategory[]>;

    /**
     * Get template variables
     * @param type Notification type
     * @returns List of available variables for the type
     */
    getTemplateVariables(type: NotificationType): Promise<NotificationVariable[]>;

    /**
     * Send test notification
     * @param templateId Template identifier
     * @param testData Test data for notification
     * @param recipients Test recipients
     * @returns Success status
     */
    sendTestNotification(
        templateId: number,
        testData: Record<string, string>,
        recipients: string[]
    ): Promise<boolean>;

    /**
     * Validate template content
     * @param content Template content to validate
     * @param type Notification type
     * @returns Validation result with any errors
     */
    validateTemplateContent(
        content: string,
        type: NotificationType
    ): Promise<{ valid: boolean; errors: string[] }>;

    /**
     * Get notification delivery settings
     * @returns Current delivery settings
     */
    getDeliverySettings(): Promise<{
        emailEnabled: boolean;
        smsEnabled: boolean;
        defaultRecipients: string[];
        retryAttempts: number;
        retryInterval: number;
    }>;

    /**
     * Update notification delivery settings
     * @param settings Updated delivery settings
     * @returns Updated settings
     */
    updateDeliverySettings(settings: {
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
    }>;

    /**
     * Get notification delivery status
     * @param notificationId Notification identifier
     * @returns Delivery status details
     */
    getDeliveryStatus(notificationId: string): Promise<{
        status: 'pending' | 'sent' | 'failed';
        attempts: number;
        lastAttempt?: string;
        error?: string;
    }>;

    /**
     * Retry failed notification
     * @param notificationId Notification identifier
     * @returns Success status
     */
    retryNotification(notificationId: string): Promise<boolean>;
}
