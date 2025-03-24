import { IBaseService } from './IBaseService';
import { PaginatedResponse } from '../../types/common.types';
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
} from '../../types/notification.types';

/**
 * Interface for notification management
 * Handles notification templates, delivery settings, and sending notifications
 */
export interface INotificationService extends IBaseService {
    /**
     * Create a new notification
     * @param request Notification creation request
     * @returns Created notification response
     */
    createNotification(request: NotificationCreateRequest): Promise<void>;

    /**
     * Update an existing notification
     * @param request Notification update request
     * @returns Updated notification response
     */
    updateNotification(request: NotificationUpdateRequest): Promise<void>;

    /**
     * Delete a notification
     * @param notificationId Notification identifier
     * @returns Success status
     */
    deleteNotification(notificationId: string): Promise<void>;

    /**
     * Get a notification by ID
     * @param notificationId Notification identifier
     * @returns Notification details
     */
    getNotification(notificationId: string): Promise<NotificationResponse>;

    /**
     * Get all notifications
     * @returns List of all notifications
     */
    getAllNotifications(): Promise<NotificationListResponse>;

    /**
     * Send a notification
     * @param request Notification send request
     * @returns Success status
     */
    sendNotification(request: NotificationSendRequest): Promise<void>;

    /**
     * Send a notification to a customer
     * @param request Notification send customer request
     * @returns Success status
     */
    sendCustomerNotification(request: NotificationSendCustomerRequest): Promise<void>;

    /**
     * Get saved notifications
     * @returns List of saved notifications
     */
    getSavedNotifications(): Promise<SavedNotificationListResponse>;

    /**
     * Search saved notifications
     * @param request Search parameters
     * @returns List of matching saved notifications
     */
    searchSavedNotifications(request: SavedNotificationSearchRequest): Promise<SavedNotificationListResponse>;

    /**
     * Clear saved notifications up to a specific date
     * @param request Clear request with date
     * @returns Success status
     */
    clearSavedNotifications(request: SavedNotificationClearRequest): Promise<void>;
}