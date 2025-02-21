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
  [PaymentStatus.EXPIRED]: 1
};

// Regular payments
export const mockPayments: Payment[] = [
  {
    Id: 'pmt_1',
    WillProcessDate: '2024-12-20T00:00:00Z',
    Memo: 'Electric bill payment',
    BillReference: 'ELEC-001',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_1',
    MemberId: 'mem_1',
    Amount: 500.00,
    Status: PaymentStatus.PENDING,
    ProcessDate: '2024-12-16T00:00:00Z',
    DeliveryDate: '2024-12-20T00:00:00Z'
  },
  {
    Id: 'pmt_2',
    WillProcessDate: '2024-12-15T00:00:00Z',
    Memo: 'Water utility payment',
    BillReference: 'WATER-001',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_1',
    MemberId: 'mem_1',
    Amount: 100.00,
    Status: PaymentStatus.COMPLETED,
    ProcessDate: '2024-12-14T00:00:00Z',
    DeliveryDate: '2024-12-15T00:00:00Z'
  }
];

// Pending payments
export const mockPendingPayments: PaymentActivity[] = [
  {
    MemberID: 'mem_1',
    PaymentID: 'payment_1',
    PayeeID: 'payee_1',
    FisPayeeId: 'fis_1',
    PayeeName: 'John Doe',
    DateProcessed: '2024-12-28T00:00:00Z',
    DueDate: '2024-12-29T00:00:00Z',
    StatusCode: 1,
    StatusName: 'Pending',
    PaymentMethod: 'ACH',
    Amount: 2000.00
  },
  {
    MemberID: 'mem_1',
    PaymentID: 'payment_2',
    PayeeID: 'payee_2',
    FisPayeeId: 'fis_2',
    PayeeName: 'Insurance Co',
    DateProcessed: '2024-12-29T00:00:00Z',
    DueDate: '2024-12-30T00:00:00Z',
    StatusCode: 1,
    StatusName: 'Pending',
    PaymentMethod: 'ACH',
    Amount: 150.00
  }
];

// Additional mock payment data
export const mockAdditionalPayments: PaymentActivity[] = [
  {
    MemberID: 'mem_1',
    PaymentID: 'pmt_001',
    PayeeID: 'payee_3',
    FisPayeeId: 'fis_3',
    PayeeName: 'Water Company',
    DateProcessed: '2024-12-30T00:00:00Z',
    DueDate: '2024-12-31T00:00:00Z',
    StatusCode: 2,
    StatusName: 'Processing',
    PaymentMethod: 'CHECK',
    Amount: 75.00
  },
  {
    MemberID: 'mem_2',
    PaymentID: 'pmt_002',
    PayeeID: 'payee_4',
    FisPayeeId: 'fis_4',
    PayeeName: 'Electric Company',
    DateProcessed: '2024-12-31T00:00:00Z',
    DueDate: '2025-01-01T00:00:00Z',
    StatusCode: 3,
    StatusName: 'Completed',
    PaymentMethod: 'ACH',
    Amount: 120.00
  },
  {
    MemberID: 'mem_2',
    PaymentID: 'pmt_003',
    PayeeID: 'payee_5',
    FisPayeeId: 'fis_5',
    PayeeName: 'Gas Company',
    DateProcessed: '2024-12-31T00:00:00Z',
    DueDate: '2025-01-01T00:00:00Z',
    StatusCode: 1,
    StatusName: 'Pending',
    PaymentMethod: 'ACH',
    Amount: 85.00
  },
  {
    MemberID: 'mem_3',
    PaymentID: 'pmt_004',
    PayeeID: 'payee_6',
    FisPayeeId: 'fis_6',
    PayeeName: 'Phone Company',
    DateProcessed: '2025-01-01T00:00:00Z',
    DueDate: '2025-01-02T00:00:00Z',
    StatusCode: 1,
    StatusName: 'Pending',
    PaymentMethod: 'ACH',
    Amount: 95.00
  }
];

// Additional mock payment data for recurring payments
export const mockRecurringPayments: Payment[] = [
  {
    Id: 'rec_001',
    WillProcessDate: '2024-12-29T00:00:00Z',
    Memo: 'Monthly rent',
    BillReference: 'RENT-001',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_1',
    MemberId: 'mem_1',
    Amount: 1500.00,
    Status: PaymentStatus.PENDING,
    ProcessDate: '2024-12-28T00:00:00Z',
    DeliveryDate: '2024-12-29T00:00:00Z',
    Frequency: 'monthly',
    NumPayments: 12
  },
  {
    Id: 'rec_002',
    WillProcessDate: '2024-12-29T00:00:00Z',
    Memo: 'Weekly cleaning service',
    BillReference: 'CLEAN-001',
    FundingAccount: 'acc_2',
    UserPayeeListId: 'upl_2',
    MemberId: 'mem_2',
    Amount: 100.00,
    Status: PaymentStatus.PENDING,
    ProcessDate: '2024-12-28T00:00:00Z',
    DeliveryDate: '2024-12-29T00:00:00Z',
    Frequency: 'weekly',
    NumPayments: 52
  }
];

// Payment history for audit trails
export const mockPaymentHistory: PaymentHistory[] = [
  {
    Id: 1,
    PaymentId: 'pmt_001',
    UserPayeeListId: 'upl_001',
    MemberId: 'user_001',
    FundingAccount: 'acc_001',
    Amount: 1000.00,
    WillProcessDate: '2024-12-28T00:00:00Z',
    StatusCode: 1, // Pending
    Memo: 'Monthly rent payment',
    LastUpdate: '2024-12-28T17:02:57-07:00',
    SourceApplication: 'WEB',
    EntryDate: '2024-12-28T17:02:57-07:00',
    DeliveryDate: '2024-12-28T00:00:00Z',
    PayeeId: 'payee_001',
    UsersAccountAtPayee: '1234567890',
    NameOnAccount: 'John Doe',
    PayeeType: 'RENT',
    PaymentMethod: PaymentMethod.ACH,
    RunId: 12345,
    ConfirmationNumber: 'CONF001',
    FisPayeeId: 'fis_001'
  },
  {
    Id: 2,
    PaymentId: 'pmt_001',
    UserPayeeListId: 'upl_001',
    MemberId: 'user_001',
    FundingAccount: 'acc_001',
    Amount: 1000.00,
    WillProcessDate: '2024-12-28T00:00:00Z',
    StatusCode: 2, // Processing
    Memo: 'Monthly rent payment',
    LastUpdate: '2024-12-28T17:03:00-07:00',
    SourceApplication: 'SYSTEM',
    EntryDate: '2024-12-28T17:02:57-07:00',
    DeliveryDate: '2024-12-28T00:00:00Z',
    PayeeId: 'payee_001',
    UsersAccountAtPayee: '1234567890',
    NameOnAccount: 'John Doe',
    PayeeType: 'RENT',
    PaymentMethod: PaymentMethod.ACH,
    RunId: 12345,
    ConfirmationNumber: 'CONF001',
    FisPayeeId: 'fis_001'
  },
  {
    Id: 3,
    PaymentId: 'pmt_001',
    UserPayeeListId: 'upl_001',
    MemberId: 'user_001',
    FundingAccount: 'acc_001',
    Amount: 1000.00,
    WillProcessDate: '2024-12-28T00:00:00Z',
    StatusCode: 3, // Completed
    Memo: 'Monthly rent payment',
    LastUpdate: '2024-12-28T17:05:00-07:00',
    SourceApplication: 'SYSTEM',
    EntryDate: '2024-12-28T17:02:57-07:00',
    DeliveryDate: '2024-12-28T00:00:00Z',
    PayeeId: 'payee_001',
    UsersAccountAtPayee: '1234567890',
    NameOnAccount: 'John Doe',
    PayeeType: 'RENT',
    PaymentMethod: PaymentMethod.ACH,
    RunId: 12345,
    ConfirmationNumber: 'CONF001',
    FisPayeeId: 'fis_001'
  }
];