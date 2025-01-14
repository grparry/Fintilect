import { PaymentException, ExceptionStatus, ExceptionResolution } from '../../../../../types/bill-pay.types';

export const mockExceptions: PaymentException[] = [
  {
    id: '1',
    paymentId: 'PMT123',
    type: 'INVALID_ACCOUNT',
    status: ExceptionStatus.PENDING,
    message: 'Invalid account number',
    details: {
      accountNumber: '1234567890',
      routingNumber: '987654321'
    },
    createdAt: '2024-12-16T08:00:00',
    updatedAt: '2024-12-16T08:00:00',
    resolutions: []
  },
  {
    id: '2',
    paymentId: 'PMT456',
    type: 'INSUFFICIENT_FUNDS',
    status: ExceptionStatus.RESOLVED,
    message: 'Insufficient funds',
    details: {
      amount: 1000.00,
      balance: 500.00
    },
    createdAt: '2024-12-15T14:30:00',
    updatedAt: '2024-12-15T16:45:00',
    resolutions: [
      {
        type: 'manual',
        action: 'Funds added to account',
        notes: 'Customer deposited additional funds',
        userId: 'USER123',
        timestamp: '2024-12-15T16:45:00'
      }
    ]
  }
];
