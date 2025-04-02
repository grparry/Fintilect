/**
 * Statuses with Notifications Report utility file
 * Contains types, enums, and API service functions for the Statuses with Notifications report
 */
import { reportService } from '../../services/factory/ServiceFactory';

/**
 * Enum for Statuses with Notifications sort columns
 * These values must match the API's StatusesWithNotificationsSortColumn enum
 */
export enum StatusesWithNotificationsSortColumn {
  StatusCode = 'StatusCode',
  StatusDescription = 'StatusDescription',
  StatusFriendlyName = 'StatusFriendlyName',
  StatusHostCode = 'StatusHostCode',
  NotificationId = 'NotificationId'
}

/**
 * Display names for Statuses with Notifications sort columns
 */
export const STATUSES_WITH_NOTIFICATIONS_SORT_COLUMNS: Record<StatusesWithNotificationsSortColumn, string> = {
  [StatusesWithNotificationsSortColumn.StatusCode]: 'Status Code',
  [StatusesWithNotificationsSortColumn.StatusDescription]: 'Status Description',
  [StatusesWithNotificationsSortColumn.StatusFriendlyName]: 'Status Friendly Name',
  [StatusesWithNotificationsSortColumn.StatusHostCode]: 'Status Host Code',
  [StatusesWithNotificationsSortColumn.NotificationId]: 'Notification ID'
};

/**
 * Interface for Statuses with Notifications report parameters
 */
export interface StatusesWithNotificationsParams {
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: StatusesWithNotificationsSortColumn;
  sortDirection?: string;
}

/**
 * Interface for Statuses with Notifications report item
 */
export interface StatusesWithNotificationsItem {
  statusCode?: string;
  statusDescription?: string;
  statusFriendlyName?: string;
  statusHostCode?: string;
  notificationId?: string;
  notificationErrorNumber?: number;
  notificationMatchMode?: number;
  notificationMatchOrder?: number;
  notificationMatchText?: string;
  notificationMessageSubject?: string;
  notificationMessageBody?: string;
  notificationEmailMember?: boolean;
  notificationEmailMemberServices?: boolean;
  notificationEmailSysOp?: boolean;
  notificationNotes?: string;
  notificationCreatedOn?: string;
  notificationModifiedOn?: string;
}

/**
 * Interface for Statuses with Notifications report response
 */
export interface StatusesWithNotificationsResponse {
  items: StatusesWithNotificationsItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Get statuses with notifications data from the API
 * @param params Statuses with notifications search parameters
 * @returns Promise with statuses with notifications data
 */
export const getStatusesWithNotifications = async (
  params: StatusesWithNotificationsParams
): Promise<StatusesWithNotificationsResponse> => {
  return reportService.getStatusesWithNotifications(params);
};
