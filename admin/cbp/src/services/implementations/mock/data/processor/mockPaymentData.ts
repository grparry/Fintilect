import { 
  PaymentMethod, 
  PaymentStatus,
  PaymentPriority,
  Payment, 
  PaymentHistory,
  PaymentActivity
} from '../../../../../types/payment.types';

// Payment status distribution for mock data
export const mockPaymentStatusDistribution: Record<PaymentStatus, number> = {
  [PaymentStatus.PENDING]: 45,
  [PaymentStatus.PENDING_APPROVAL]: 12,
  [PaymentStatus.PROCESSING]: 8,
  [PaymentStatus.COMPLETED]: 156,
  [PaymentStatus.FAILED]: 3,
  [PaymentStatus.CANCELLED]: 5,
  [PaymentStatus.REJECTED]: 2,
  [PaymentStatus.ON_HOLD]: 4,
  [PaymentStatus.APPROVED]: 10,
  [PaymentStatus.EXPIRED]: 1
};

// Regular payments
export const mockPayments: Payment[] = [
  {
    paymentID: 'pmt_1',
    willProcessDate: '2024-12-20T00:00:00Z',
    memo: 'Electric bill payment',
    billReference: 'ELEC-001',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_1',
    memberID: 'mem_1',
    amount: 500.00,
    status: PaymentStatus.PENDING,
    processDate: '2024-12-16T00:00:00Z',
    deliveryDate: '2024-12-20T00:00:00Z'
  },
  {
    paymentID: 'pmt_2',
    willProcessDate: '2024-12-15T00:00:00Z',
    memo: 'Water utility payment',
    billReference: 'WATER-001',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_1',
    memberID: 'mem_1',
    amount: 100.00,
    status: PaymentStatus.COMPLETED,
    processDate: '2024-12-14T00:00:00Z',
    deliveryDate: '2024-12-15T00:00:00Z'
  }
];

// Pending payments
export const mockPendingPayments: PaymentActivity[] = [
  {
    memberID: 'mem_1',
    paymentID: 'payment_1',
    payeeID: 'payee_1',
    fisPayeeID: 'fis_1',
    payeeName: 'John Doe',
    dateProcessed: '2024-12-28T00:00:00Z',
    dueDate: '2024-12-29T00:00:00Z',
    statusCode: 1,
    statusName: 'Pending',
    paymentMethod: 'ACH',
    amount: 2000.00
  },
  {
    memberID: 'mem_1',
    paymentID: 'payment_2',
    payeeID: 'payee_2',
    fisPayeeID: 'fis_2',
    payeeName: 'Insurance Co',
    dateProcessed: '2024-12-29T00:00:00Z',
    dueDate: '2024-12-30T00:00:00Z',
    statusCode: 1,
    statusName: 'Pending',
    paymentMethod: 'ACH',
    amount: 150.00
  }
];

// Additional mock payment data
export const mockAdditionalPayments: PaymentActivity[] = [
  {
    memberID: 'mem_1',
    paymentID: 'pmt_001',
    payeeID: 'payee_3',
    fisPayeeID: 'fis_3',
    payeeName: 'Water Company',
    dateProcessed: '2024-12-30T00:00:00Z',
    dueDate: '2024-12-31T00:00:00Z',
    statusCode: 2,
    statusName: 'Processing',
    paymentMethod: 'CHECK',
    amount: 75.00
  },
  {
    memberID: 'mem_2',
    paymentID: 'pmt_002',
    payeeID: 'payee_4',
    fisPayeeID: 'fis_4',
    payeeName: 'Electric Company',
    dateProcessed: '2024-12-31T00:00:00Z',
    dueDate: '2025-01-01T00:00:00Z',
    statusCode: 3,
    statusName: 'Completed',
    paymentMethod: 'ACH',
    amount: 120.00
  },
  {
    memberID: 'mem_2',
    paymentID: 'pmt_003',
    payeeID: 'payee_5',
    fisPayeeID: 'fis_5',
    payeeName: 'Gas Company',
    dateProcessed: '2024-12-31T00:00:00Z',
    dueDate: '2025-01-01T00:00:00Z',
    statusCode: 1,
    statusName: 'Pending',
    paymentMethod: 'ACH',
    amount: 85.00
  },
  {
    memberID: 'mem_3',
    paymentID: 'pmt_004',
    payeeID: 'payee_6',
    fisPayeeID: 'fis_6',
    payeeName: 'Phone Company',
    dateProcessed: '2025-01-01T00:00:00Z',
    dueDate: '2025-01-02T00:00:00Z',
    statusCode: 1,
    statusName: 'Pending',
    paymentMethod: 'ACH',
    amount: 95.00
  }
];

// Additional mock payment data for recurring payments
export const mockRecurringPayments: Payment[] = [
  {
    paymentID: 'rec_001',
    willProcessDate: '2024-12-29T00:00:00Z',
    memo: 'Monthly rent',
    billReference: 'RENT-001',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_1',
    memberID: 'mem_1',
    amount: 1500.00,
    status: PaymentStatus.PENDING,
    processDate: '2024-12-28T00:00:00Z',
    deliveryDate: '2024-12-29T00:00:00Z',
    frequency: 'monthly',
    numPayments: 12
  },
  {
    paymentID: 'rec_002',
    willProcessDate: '2024-12-29T00:00:00Z',
    memo: 'Weekly cleaning service',
    billReference: 'CLEAN-001',
    fundingAccount: 'acc_2',
    userPayeeListID: 'upl_2',
    memberID: 'mem_2',
    amount: 100.00,
    status: PaymentStatus.PENDING,
    processDate: '2024-12-28T00:00:00Z',
    deliveryDate: '2024-12-29T00:00:00Z',
    frequency: 'weekly',
    numPayments: 52
  }
];

// Payment history for audit trails
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 1,
    paymentID: 'pmt_001',
    userPayeeListID: 'upl_001',
    memberID: 'user_001',
    fundingAccount: 'acc_001',
    amount: 1000.00,
    willProcessDate: '2024-12-28T00:00:00Z',
    statusCode: 1, // Pending
    memo: 'Monthly rent payment',
    lastUpdate: '2024-12-28T17:02:57-07:00',
    sourceApplication: 'WEB',
    entryDate: '2024-12-28T17:02:57-07:00',
    deliveryDate: '2024-12-28T00:00:00Z',
    payeeID: 'payee_001',
    usersAccountAtPayee: '1234567890',
    nameOnAccount: 'John Doe',
    payeeType: 'RENT',
    paymentMethod: PaymentMethod.ACH,
    runID: 12345,
    confirmationNumber: 'CONF001',
    fisPayeeID: 'fis_001'
  },
  {
    id: 2,
    paymentID: 'pmt_001',
    userPayeeListID: 'upl_001',
    memberID: 'user_001',
    fundingAccount: 'acc_001',
    amount: 1000.00,
    willProcessDate: '2024-12-28T00:00:00Z',
    processedDate: '2024-12-28T10:15:00-07:00',
    statusCode: 3, // Completed
    memo: 'Monthly rent payment',
    lastUpdate: '2024-12-28T10:15:00-07:00',
    sourceApplication: 'WEB',
    entryDate: '2024-12-28T17:02:57-07:00',
    deliveryDate: '2024-12-28T00:00:00Z',
    payeeID: 'payee_001',
    usersAccountAtPayee: '1234567890',
    nameOnAccount: 'John Doe',
    payeeType: 'RENT',
    paymentMethod: PaymentMethod.ACH,
    runID: 12345,
    confirmationNumber: 'CONF001',
    fisPayeeID: 'fis_001'
  }
];