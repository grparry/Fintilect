import { INotificationService } from '../../interfaces/INotificationService';
import { BaseMockService } from './BaseMockService';
import logger from '../../../utils/logger';
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
import { v4 as uuidv4 } from 'uuid';
import { 
    mockNotifications, 
    mockNotificationListResponse, 
    mockSavedNotifications, 
    mockSavedNotificationListResponse 
} from './data/notifications/mockNotificationData';

export class MockNotificationService extends BaseMockService implements INotificationService {
    constructor(basePath: string = '/api/v1/notification') {
        super(basePath);
    }

    private notifications: NotificationResponse[] = [...mockNotifications];
    private savedNotifications: SavedNotificationResponse[] = [...mockSavedNotifications];

    // API-aligned notification methods
    async createNotification(request: NotificationCreateRequest): Promise<void> {
        const newNotification: NotificationResponse = {
            ...request,
            id: uuidv4()
        };
        this.notifications.push(newNotification);
        return Promise.resolve();
    }

    async updateNotification(request: NotificationUpdateRequest): Promise<void> {
        const index = this.notifications.findIndex(n => n.id === request.id);
        if (index === -1) {
            throw new Error('Notification not found');
        }
        this.notifications[index] = {
            ...this.notifications[index],
            ...request
        };
        return Promise.resolve();
    }

    async deleteNotification(notificationId: string): Promise<void> {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index === -1) {
            throw new Error('Notification not found');
        }
        this.notifications.splice(index, 1);
        return Promise.resolve();
    }

    async getNotification(notificationId: string): Promise<NotificationResponse> {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        return Promise.resolve(notification);
    }

    async getAllNotifications(): Promise<NotificationListResponse> {
        return Promise.resolve({
            notifications: this.notifications
        });
    }

    async sendNotification(request: NotificationSendRequest): Promise<void> {
        // Simulate sending a notification
        logger.log(`Mock: Sending notification for status code ${request.statusCode}`);
        return Promise.resolve();
    }

    async sendCustomerNotification(request: NotificationSendCustomerRequest): Promise<void> {
        // Simulate sending a customer notification
        logger.log(`Mock: Sending customer notification for payment ${request.paymentID} with status code ${request.statusCode}`);
        return Promise.resolve();
    }

    async getSavedNotifications(): Promise<SavedNotificationListResponse> {
        return Promise.resolve({
            savedNotifications: this.savedNotifications
        });
    }

    async searchSavedNotifications(request: SavedNotificationSearchRequest): Promise<SavedNotificationListResponse> {
        // Simple implementation of search
        let filteredNotifications = [...this.savedNotifications];
        
        if (request.parameters && request.parameters.length > 0) {
            request.parameters.forEach(param => {
                switch (param.type) {
                    case 1: // Member ID
                        if (param.value) {
                            filteredNotifications = filteredNotifications.filter(n => 
                                n.memberID?.includes(param.value!)
                            );
                        }
                        break;
                    case 2: // Payment ID
                        if (param.value) {
                            filteredNotifications = filteredNotifications.filter(n => 
                                n.paymentID?.includes(param.value!)
                            );
                        }
                        break;
                    case 3: // Date range
                        if (param.value && param.value2) {
                            const startDate = new Date(param.value).getTime();
                            const endDate = new Date(param.value2).getTime();
                            filteredNotifications = filteredNotifications.filter(n => {
                                const notificationDate = new Date(n.date).getTime();
                                return notificationDate >= startDate && notificationDate <= endDate;
                            });
                        }
                        break;
                    case 4: // Status code
                        if (param.value) {
                            const statusCode = parseInt(param.value);
                            filteredNotifications = filteredNotifications.filter(n => 
                                n.statusCode === statusCode
                            );
                        }
                        break;
                }
            });
        }
        
        return Promise.resolve({
            savedNotifications: filteredNotifications
        });
    }

    async clearSavedNotifications(request: SavedNotificationClearRequest): Promise<void> {
        const clearDate = new Date(request.clearUpToDate).getTime();
        this.savedNotifications = this.savedNotifications.filter(n => {
            const notificationDate = new Date(n.date).getTime();
            return notificationDate > clearDate;
        });
        return Promise.resolve();
    }
}