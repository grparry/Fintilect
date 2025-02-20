import { PaymentException, FISExceptionStatus, ExceptionResolution } from '../../../../../types/bill-pay.types';

export const mockExceptions: PaymentException[] = [
  {
    id: '1',
    paymentId: 'PMT123',
    type: 'INVALID_ACCOUNT',
    status: FISExceptionStatus.PENDING,
    message: 'Invalid account number',
    details: {
      accountNumber: '1234567890',
      routingNumber: '987654321',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    resolutions: [],
  },
  {
    id: '2',
    paymentId: 'PMT456',
    type: 'INSUFFICIENT_FUNDS',
    status: FISExceptionStatus.RESOLVED,
    message: 'Insufficient funds',
    details: {
      amount: 1000.00,
      balance: 500.00,
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    resolutions: [
      {
        type: 'manual',
        action: 'Funds added',
        notes: 'Customer added funds to account',
        userId: 'USER123',
        timestamp: '2023-01-02T12:00:00Z',
      },
    ],
  },
];