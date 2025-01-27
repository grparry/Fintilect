import { IBaseService } from './IBaseService';
import {
    NotificationTemplate,
    NotificationTemplateInput,
    NotificationTemplateFilters,
    NotificationPreview,
    NotificationType,
    NotificationVariable,
    NotificationCategory
} from '../../types/bill-pay.types';
import { PaginatedResponse } from '../../types/common.types';

/**


/**
 * Interface for notification management
 * Handles notification templates, delivery settings, and sending notifications
 */
    /**
     * Get notification templates with pagination and filtering
     * @param filters Template filters
     * @returns Paginated list of notification templates
     */

    /**
     * Get specific notification template
     * @param templateId Template identifier
     * @returns Template details
     */

    /**
     * Create notification template
     * @param template Template to create
     * @returns Created template
     */

    /**
     * Update notification template
     * @param templateId Template identifier
     * @param template Updated template data
     * @returns Updated template
     */

    /**
     * Delete notification template
     * @param templateId Template identifier
     */

    /**
     * Preview notification with sample data
     * @param templateId Template identifier
     * @param sampleData Sample data for preview
     * @returns Preview with rendered content
     */

    /**
     * Get available notification types
     * @returns List of notification types
     */

    /**
     * Get available notification categories
     * @returns List of notification categories
     */

    /**
     * Get template variables
     * @param type Notification type
     * @returns List of available variables for the type
     */

    /**
     * Send test notification
     * @param templateId Template identifier
     * @param testData Test data for notification
     * @param recipients Test recipients
     * @returns Success status
     */
    ): Promise<boolean>;

    /**
     * Validate template content
     * @param content Template content to validate
     * @param type Notification type
     * @returns Validation result with any errors
     */
    ): Promise<{ valid: boolean; errors: string[] }>;

    /**
     * Get notification delivery settings
     * @returns Current delivery settings
     */

    /**
     * Update notification delivery settings
     * @param settings Updated delivery settings
     * @returns Updated settings
     */

    /**
     * Get notification delivery status
     * @param notificationId Notification identifier
     * @returns Delivery status details
     */

    /**
     * Retry failed notification
     * @param notificationId Notification identifier
     * @returns Success status
     */
