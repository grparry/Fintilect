import { NotificationType, NotificationCategory, NotificationVariable, NotificationTemplate } from '../../../../../types/bill-pay.types';

export const mockNotificationTypes: NotificationType[] = [
    NotificationType.PAYMENT_COMPLETED,
    NotificationType.PAYMENT_FAILED,
    NotificationType.PAYMENT_APPROVAL_REQUIRED,
    NotificationType.PAYMENT_CANCELLED,
    NotificationType.PAYMENT_EXPIRED
];

export const mockNotificationCategories: NotificationCategory[] = [
    NotificationCategory.PAYMENT,
    NotificationCategory.ACCOUNT,
    NotificationCategory.SYSTEM
];

export const mockTemplateVariables: Record<NotificationType, NotificationVariable[]> = {
    [NotificationType.PAYMENT_COMPLETED]: [
        {
            name: 'paymentId',
            description: 'The unique identifier of the payment',
            example: 'PAY-123456'
        },
        {
            name: 'amount',
            description: 'The payment amount',
            example: '$1,000.00'
        }
    ],
    [NotificationType.PAYMENT_FAILED]: [
        {
            name: 'paymentId',
            description: 'The unique identifier of the payment',
            example: 'PAY-123456'
        },
        {
            name: 'errorMessage',
            description: 'The error message explaining why the payment failed',
            example: 'Insufficient funds'
        }
    ],
    [NotificationType.PAYMENT_APPROVAL_REQUIRED]: [
        {
            name: 'paymentId',
            description: 'The unique identifier of the payment',
            example: 'PAY-123456'
        },
        {
            name: 'amount',
            description: 'The payment amount',
            example: '$1,000.00'
        },
        {
            name: 'approvalLink',
            description: 'Link to approve the payment',
            example: 'https://example.com/approve/PAY-123456'
        }
    ],
    [NotificationType.PAYMENT_CANCELLED]: [
        {
            name: 'paymentId',
            description: 'The unique identifier of the payment',
            example: 'PAY-123456'
        },
        {
            name: 'cancelReason',
            description: 'The reason for cancellation',
            example: 'User requested cancellation'
        }
    ],
    [NotificationType.PAYMENT_EXPIRED]: [
        {
            name: 'paymentId',
            description: 'The unique identifier of the payment',
            example: 'PAY-123456'
        },
        {
            name: 'expirationDate',
            description: 'The date when the payment expired',
            example: '2025-01-11'
        }
    ]
};

export const mockTemplates: NotificationTemplate[] = [
  {
    id: 1,
    name: 'Payment Completed',
    type: NotificationType.PAYMENT_COMPLETED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Successfully Processed',
    content: 'Your payment {{paymentId}} for {{amount}} has been successfully processed.',
    active: true,
    lastModified: new Date().toISOString(),
    variables: mockTemplateVariables[NotificationType.PAYMENT_COMPLETED]
  },
  {
    id: 2,
    name: 'Payment Failed',
    type: NotificationType.PAYMENT_FAILED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Processing Failed',
    content: 'Your payment {{paymentId}} failed to process. Error: {{errorMessage}}',
    active: true,
    lastModified: new Date().toISOString(),
    variables: mockTemplateVariables[NotificationType.PAYMENT_FAILED]
  }
];

export const mockTemplateCategories = mockNotificationCategories;

export const mockTemplateVersions = [
  {
    id: 1,
    templateId: 1,
    version: 1,
    content: 'Your payment {{paymentId}} for {{amount}} has been successfully processed.',
    createdAt: new Date().toISOString(),
    active: false
  },
  {
    id: 2,
    templateId: 1,
    version: 2,
    content: 'Payment {{paymentId}} for {{amount}} has been processed successfully.',
    createdAt: new Date().toISOString(),
    active: true
  }
];

export const mockNotificationTemplates = [
    {
        id: 1,
        name: 'Payment Completed Notification',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        subject: 'Payment Successfully Completed',
        content: 'Your payment {{paymentId}} for {{amount}} has been successfully processed.',
        active: true,
        lastModified: '2025-01-11T16:42:24-07:00',
        createdAt: '2025-01-11T16:42:24-07:00',
        updatedAt: '2025-01-11T16:42:24-07:00',
        variables: mockTemplateVariables[NotificationType.PAYMENT_COMPLETED]
    },
    {
        id: 2,
        name: 'Payment Failed Notification',
        type: NotificationType.PAYMENT_FAILED,
        category: NotificationCategory.PAYMENT,
        subject: 'Payment Failed',
        content: 'Your payment {{paymentId}} has failed. Reason: {{errorMessage}}',
        active: true,
        lastModified: '2025-01-11T16:42:24-07:00',
        createdAt: '2025-01-11T16:42:24-07:00',
        updatedAt: '2025-01-11T16:42:24-07:00',
        variables: mockTemplateVariables[NotificationType.PAYMENT_FAILED]
    },
    {
        id: 3,
        name: 'Payment Approval Required',
        type: NotificationType.PAYMENT_APPROVAL_REQUIRED,
        category: NotificationCategory.PAYMENT,
        subject: 'Payment Requires Your Approval',
        content: 'A payment {{paymentId}} for {{amount}} requires your approval. Click here to review: {{approvalLink}}',
        active: true,
        lastModified: '2025-01-11T16:42:24-07:00',
        createdAt: '2025-01-11T16:42:24-07:00',
        updatedAt: '2025-01-11T16:42:24-07:00',
        variables: mockTemplateVariables[NotificationType.PAYMENT_APPROVAL_REQUIRED]
    }
];
