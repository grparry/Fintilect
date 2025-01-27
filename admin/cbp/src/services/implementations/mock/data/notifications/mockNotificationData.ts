import { DeliverySettings } from '../../../../../types/notification.types';

export const mockDeliverySettings: DeliverySettings = {
    emailEnabled: true,
    smsEnabled: true,
    defaultRecipients: ['admin@example.com'],
    retryAttempts: 3,
    retryInterval: 300
};