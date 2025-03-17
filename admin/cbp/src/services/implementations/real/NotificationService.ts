import { INotificationService } from '../../interfaces/INotificationService';
import { BaseService } from './BaseService';
import {
    NotificationCreateRequest,
    NotificationUpdateRequest,
    NotificationResponse,
    NotificationListResponse,
    NotificationSendRequest,
    NotificationSendCustomerRequest,
    SavedNotificationResponse,
    SavedNotificationListResponse,
    SavedNotificationClearRequest,
    SavedNotificationSearchRequest
} from '../../../types/notification.types';
import logger from '../../../utils/logger';

export class NotificationService extends BaseService implements INotificationService {
    constructor(basePath: string = '/api/v1/Notification') {
        super(basePath);
    }

    // API-aligned notification methods
    async createNotification(request: NotificationCreateRequest): Promise<void> {
        logger.info({
            message: 'Creating notification',
            endpoint: `${this.basePath}`
        });
        return this.post('', request);
    }

    async updateNotification(request: NotificationUpdateRequest): Promise<void> {
        logger.info({
            message: 'Updating notification',
            notificationID: request.id,
            endpoint: `${this.basePath}`
        });
        return this.put('', request);
    }

    async deleteNotification(notificationId: string): Promise<void> {
        if (!notificationId) {
            throw new Error('Notification ID is required for deletion');
        }
        
        // Using direct path without additional 'Notification' segment
        // since basePath already includes it
        const endpoint = `/${notificationId}`;
        
        logger.info({
            message: 'Deleting notification',
            notificationID: notificationId,
            endpoint: `${this.basePath}${endpoint}`
        });
        
        return this.delete(endpoint);
    }

    async getNotification(notificationId: string): Promise<NotificationResponse> {
        logger.info({
            message: 'Getting notification',
            notificationID: notificationId,
            endpoint: `${this.basePath}/${notificationId}`
        });
        return this.get<NotificationResponse>(`/${notificationId}`);
    }

    async getAllNotifications(): Promise<NotificationListResponse> {
        logger.info({
            message: 'Getting all notifications',
            endpoint: `${this.basePath}/all`
        });
        return this.get<NotificationListResponse>('/all');
    }

    async sendNotification(request: NotificationSendRequest): Promise<void> {
        logger.info({
            message: 'Sending notification',
            statusCode: request.statusCode,
            endpoint: `${this.basePath}/send`
        });
        return this.post('/send', request);
    }

    async sendCustomerNotification(request: NotificationSendCustomerRequest): Promise<void> {
        logger.info({
            message: 'Sending customer notification',
            paymentID: request.paymentID,
            endpoint: `${this.basePath}/send/customer`
        });
        return this.post('/send/customer', request);
    }

    async getSavedNotifications(): Promise<SavedNotificationListResponse> {
        logger.info({
            message: 'Getting saved notifications',
            endpoint: `${this.basePath}/saved`
        });
        return this.get<SavedNotificationListResponse>('/saved');
    }

    async searchSavedNotifications(request: SavedNotificationSearchRequest): Promise<SavedNotificationListResponse> {
        logger.info({
            message: 'Searching saved notifications',
            endpoint: `${this.basePath}/saved/search`
        });
        return this.post<SavedNotificationListResponse>('/saved/search', request);
    }

    async clearSavedNotifications(request: SavedNotificationClearRequest): Promise<void> {
        logger.info({
            message: 'Clearing saved notifications',
            endpoint: `${this.basePath}/saved/clear`
        });
        return this.post('/saved/clear', request);
    }
}