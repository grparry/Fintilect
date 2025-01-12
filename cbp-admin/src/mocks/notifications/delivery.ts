interface DeliveryStatus {
    status: 'pending' | 'sent' | 'failed';
    attempts: number;
    lastAttempt?: string;
    error?: string;
}

export const mockDeliverySettings = {
    emailEnabled: true,
    smsEnabled: false,
    defaultRecipients: ['admin@example.com', 'support@example.com'],
    retryAttempts: 3,
    retryInterval: 300 // 5 minutes in seconds
};

export const mockDeliveryStatuses: Record<string, DeliveryStatus> = {
    'notification_1': {
        status: 'sent',
        attempts: 1,
        lastAttempt: new Date().toISOString()
    },
    'notification_2': {
        status: 'failed',
        attempts: 3,
        lastAttempt: new Date().toISOString(),
        error: 'SMTP connection failed'
    },
    'notification_3': {
        status: 'pending',
        attempts: 0
    }
};
