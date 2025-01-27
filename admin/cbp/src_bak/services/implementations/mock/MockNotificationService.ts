import { INotificationService } from '../../interfaces/INotificationService';
import { BaseMockService } from './BaseMockService';
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
import { 
    mockTemplates,
    mockTemplateCategories,
    mockTemplateVariables,
    mockTemplateVersions
} from './data/notification/templates';
import { 
    mockDeliveryMethods,
    mockDeliveryPreferences,
    mockDeliveryStats
} from './data/notification/delivery';
import { v4 as uuidv4 } from 'uuid';
import { mockDeliverySettings } from './data/notifications/mockNotificationData';

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






        // Apply filters
            );

        // Apply pagination



            ...template,



            ...this.templates[index],
            ...template,





        // Replace variables in content





    ): Promise<boolean> {

        // Simulate sending notification


    ): Promise<{ valid: boolean; errors: string[] }> {

        // Check if all required variables are present

        // Check for invalid variables



            ...this.deliverySettings,
            ...settings





        // Simulate retry
            ...status,




