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

export const mockDeliveryMethods = [
  {
    id: 'email',
    name: 'Email',
    enabled: true,
    config: {
      smtpServer: 'smtp.example.com',
      port: 587,
      useTLS: true
    }
  },
  {
    id: 'sms',
    name: 'SMS',
    enabled: false,
    config: {
      provider: 'twilio',
      accountSid: 'mock_account_sid',
      authToken: 'mock_auth_token'
    }
  }
];

export const mockDeliveryPreferences = {
  email: {
    enabled: true,
    recipients: ['admin@example.com', 'support@example.com'],
    frequency: 'realtime'
  },
  sms: {
    enabled: false,
    recipients: ['+1234567890'],
    frequency: 'daily'
  }
};

export const mockDeliveryStats = {
  totalSent: 1250,
  totalFailed: 23,
  byMethod: {
    email: {
      sent: 1000,
      failed: 15
    },
    sms: {
      sent: 250,
      failed: 8
    }
  }
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
