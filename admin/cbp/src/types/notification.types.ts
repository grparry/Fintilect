

// Notification system types
export interface DeliverySettings {
    emailEnabled: boolean;
    smsEnabled: boolean;
    defaultRecipients: string[];
    retryAttempts: number;
    retryInterval: number;
}
export interface NotificationTemplate {
    id: number;
    name: string;
    description?: string;
    subject: string;
    body: string;
    type: 'email' | 'sms';
    variables: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface NotificationEvent {
    id: string;
    templateId: string;
    recipient: string;
    type: 'email' | 'sms';
    status: 'pending' | 'sent' | 'failed';
    data: Record<string, unknown>;
    sentAt?: string;
    error?: string;
    createdAt: string;
}
export interface NotificationStats {
    totalSent: number;
    totalFailed: number;
    deliveryRate: number;
    averageDeliveryTime: number;
}