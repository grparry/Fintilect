import { FISException, FISExceptionStatus, FISErrorCode } from '../../../../../types/bill-pay.types';

export const mockExceptions: FISException[] = [
  {
    id: '1',
    requestId: 'PMT123',
    status: FISExceptionStatus.PENDING,
    errorCode: FISErrorCode.INVALID_ACCOUNT,
    errorMessage: 'Invalid account number',
    metadata: {
      accountNumber: '1234567890',
      routingNumber: '987654321',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    retryCount: 0
  },
  {
    id: '2',
    requestId: 'PMT456',
    status: FISExceptionStatus.PENDING,
    errorCode: FISErrorCode.INSUFFICIENT_FUNDS,
    errorMessage: 'Insufficient funds',
    metadata: {
      amount: 1000.00,
      balance: 500.00,
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    retryCount: 0
  },
];