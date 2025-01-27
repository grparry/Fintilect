import {
  BillPayConfig,
  Holiday,
  HolidayType,
  HolidayStatus,
  NotificationTemplate,
  NotificationType,
  NotificationCategory,
  PermissionGroup,
  Permission
} from '../../../../../types/bill-pay.types';

export const mockTemplates: NotificationTemplate[] = [
  {
    id: 1,
    name: 'Payment Confirmation',
    type: NotificationType.PAYMENT_COMPLETED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Confirmation',
    content: 'Your payment of {{amount}} has been processed',
    active: true,
    lastModified: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Payment Failed',
    type: NotificationType.PAYMENT_FAILED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Failed',
    content: 'Your payment of {{amount}} has failed',
    active: true,
    lastModified: new Date().toISOString()
  }
];
export const availableVariables: string[] = [
  'amount',
  'date',
  'paymentId',
  'status'
];
export const initialHolidays: Holiday[] = [
  {
    id: 1,
    name: 'New Year\'s Day',
    date: '2024-01-01',
    type: 'Federal' as HolidayType,
    status: 'Active' as HolidayStatus
  },
  {
    id: 2,
    name: 'Memorial Day',
    date: '2024-05-27',
    type: 'Federal' as HolidayType,
    status: 'Active' as HolidayStatus
  }
];
export const mockPermissionGroups: PermissionGroup[] = [
  {
    id: 1,
    name: 'Payment Approvers',
    description: 'Can approve payments',
    permissions: ['approve_payments', 'view_payments'] as Permission[]
  },
  {
    id: 2,
    name: 'Payment Viewers',
    description: 'Can view payments only',
    permissions: ['view_payments'] as Permission[]
  }
];