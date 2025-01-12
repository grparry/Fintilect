import {
  Payment,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  PaymentAction
} from '../../types/bill-pay.types';

export const mockPayments: Payment[] = [
  {
    id: 'pmt_1',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_1',
    payeeName: 'Electric Company',
    amount: 500.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    effectiveDate: '2024-12-30T00:00:00Z',
    description: 'Electric bill payment',
    priority: Priority.HIGH,
    createdAt: '2024-12-28T21:43:09-07:00',
    updatedAt: '2024-12-28T21:43:09-07:00'
  },
  {
    id: 'pmt_2',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_2',
    payeeName: 'Water Utility',
    amount: 100.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.COMPLETED,
    effectiveDate: '2024-12-27T00:00:00Z',
    description: 'Water utility payment',
    priority: Priority.MEDIUM,
    createdAt: '2024-12-27T10:00:00-07:00',
    updatedAt: '2024-12-27T12:00:00-07:00'
  }
];

// Using PendingPayment type for detailed payment information
export const mockPendingPayments = [
  {
    id: 'pending_1',
    paymentId: 'pmt_1',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_1',
    payeeName: 'Electric Company',
    amount: 500.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2024-12-30T00:00:00Z',
    status: PaymentStatus.PENDING,
    priority: Priority.HIGH,
    description: 'Electric bill payment',
    recipient: {
      name: 'Electric Company',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'First Bank'
    },
    createdAt: '2024-12-28T21:42:13-07:00',
    updatedAt: '2024-12-28T21:42:13-07:00'
  },
  {
    id: 'pending_2',
    paymentId: 'pmt_2',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_2',
    payeeName: 'Water Utility',
    amount: 100.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2024-12-27T00:00:00Z',
    status: PaymentStatus.COMPLETED,
    priority: Priority.MEDIUM,
    description: 'Water utility payment',
    recipient: {
      name: 'Water Utility',
      accountNumber: '0987654321',
      routingNumber: '123456789',
      bankName: 'Second Bank'
    },
    createdAt: '2024-12-27T10:00:00-07:00',
    updatedAt: '2024-12-27T12:00:00-07:00'
  }
];

export const mockPaymentHistory: PaymentHistory[] = [
  {
    paymentId: 'pmt_1',
    action: 'CREATED',
    performedBy: 'John Doe',
    timestamp: '2024-12-28T21:42:13-07:00',
    details: {
      amount: 500.00,
      currency: 'USD',
      method: PaymentMethod.ACH
    }
  },
  {
    paymentId: 'pmt_1',
    action: 'APPROVED',
    performedBy: 'Jane Smith',
    timestamp: '2024-12-28T21:42:13-07:00',
    details: {
      notes: 'Payment approved after verification'
    }
  },
  {
    paymentId: 'pmt_2',
    action: 'COMPLETED',
    performedBy: 'System',
    timestamp: '2024-12-27T12:00:00-07:00',
    details: {
      transactionId: 'tx_123456'
    }
  }
];

export const mockPaymentActions: PaymentAction[] = [
  {
    action: 'create',
    performedBy: 'user-1',
    timestamp: new Date().toISOString(),
    details: {
      amount: 1000.00,
      payee: 'John Doe',
      paymentId: 'pmt_1'
    }
  },
  {
    action: 'approve',
    performedBy: 'user-2',
    timestamp: new Date().toISOString(),
    details: {
      paymentId: 'pmt_1',
      notes: 'Payment approved'
    }
  }
];
