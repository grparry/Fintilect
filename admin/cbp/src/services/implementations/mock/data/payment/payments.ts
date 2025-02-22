import {
  Payment,
  PaymentStatus,
  PaymentMethod,
  PendingPayment,
  PendingPaymentResponse,
  SearchType,
  PaymentHistory
} from '../../../../../types/payment.types';
import {
  Priority
} from '../../../../../types/bill-pay.types';

export const mockPayments: Payment[] = [
  {
    Id: 'pmt_1',
    WillProcessDate: '2025-02-18T00:00:00Z',
    Memo: 'Electric bill payment',
    BillReference: 'ELEC-2025-02',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_1',
    MemberId: 'mem_1',
    Amount: 100.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-20T00:00:00Z',
    Status: PaymentStatus.COMPLETED,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-18T00:00:00Z'
  },
  {
    Id: 'pmt_2',
    WillProcessDate: '2025-02-15T00:00:00Z',
    Memo: 'Water utility payment',
    BillReference: 'WATER-2025-02',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_2',
    MemberId: 'mem_1',
    Amount: 75.50,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-17T00:00:00Z',
    Status: PaymentStatus.COMPLETED,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-15T00:00:00Z'
  },
  {
    Id: 'pmt_3',
    WillProcessDate: '2025-02-17T00:00:00Z',
    Memo: 'Office supplies',
    BillReference: 'OFF-2025-02',
    FundingAccount: 'acc_2',
    UserPayeeListId: 'upl_3',
    MemberId: 'mem_2',
    Amount: 250.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-19T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-17T00:00:00Z'
  },
  {
    Id: 'pmt_4',
    WillProcessDate: '2025-02-14T00:00:00Z',
    Memo: 'Cloud services',
    BillReference: 'CLOUD-2025-02',
    FundingAccount: 'acc_2',
    UserPayeeListId: 'upl_4',
    MemberId: 'mem_2',
    Amount: 500.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-16T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'monthly',
    NumPayments: 12,
    ProcessDate: '2025-02-14T00:00:00Z'
  },
  {
    Id: 'pmt_5',
    WillProcessDate: '2025-02-16T00:00:00Z',
    Memo: 'Insurance premium',
    BillReference: 'INS-2025-02',
    FundingAccount: 'acc_3',
    UserPayeeListId: 'upl_5',
    MemberId: 'mem_3',
    Amount: 1000.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-18T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'monthly',
    NumPayments: 12,
    ProcessDate: '2025-02-16T00:00:00Z'
  },
  {
    Id: 'pmt_6',
    WillProcessDate: '2025-02-16T00:00:00Z',
    Memo: 'Fleet maintenance',
    BillReference: 'FLEET-2025-02',
    FundingAccount: 'acc_3',
    UserPayeeListId: 'upl_6',
    MemberId: 'mem_3',
    Amount: 750.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-18T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-16T00:00:00Z'
  },
  {
    Id: 'pmt_7',
    WillProcessDate: '2025-02-16T00:00:00Z',
    Memo: 'Cloud storage',
    BillReference: 'STORAGE-2025-02',
    FundingAccount: 'acc_2',
    UserPayeeListId: 'upl_7',
    MemberId: 'mem_2',
    Amount: 300.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-18T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'monthly',
    NumPayments: 12,
    ProcessDate: '2025-02-16T00:00:00Z'
  },
  {
    Id: 'pmt_8',
    WillProcessDate: '2025-02-16T00:00:00Z',
    Memo: 'Liability insurance',
    BillReference: 'LIAB-2025-02',
    FundingAccount: 'acc_3',
    UserPayeeListId: 'upl_8',
    MemberId: 'mem_3',
    Amount: 2000.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-18T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'monthly',
    NumPayments: 12,
    ProcessDate: '2025-02-16T00:00:00Z'
  },
  {
    Id: 'pmt_9',
    WillProcessDate: '2025-02-15T00:00:00Z',
    Memo: 'Office supplies',
    BillReference: 'OFF2-2025-02',
    FundingAccount: 'acc_2',
    UserPayeeListId: 'upl_9',
    MemberId: 'mem_2',
    Amount: 150.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-17T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-15T00:00:00Z'
  },
  {
    Id: 'pmt_10',
    WillProcessDate: '2025-02-16T00:00:00Z',
    Memo: 'Marketing services',
    BillReference: 'MKT-2025-02',
    FundingAccount: 'acc_1',
    UserPayeeListId: 'upl_10',
    MemberId: 'mem_1',
    Amount: 5000.00,
    SourceApplication: 'WEB',
    DeliveryDate: '2025-02-18T00:00:00Z',
    Status: PaymentStatus.PENDING,
    Frequency: 'once',
    NumPayments: 1,
    ProcessDate: '2025-02-16T00:00:00Z'
  }
];

export const mockPendingPayments: PendingPaymentResponse[] = [
  {
    Id: 'pmt_1',
    UserPayeeListId: 'upl_1',
    FundingAccount: 'acc_1',
    Amount: 100.00,
    StatusCode: 1, // PENDING
    FriendlyName: 'Electric Company',
    Memo: 'Electric bill payment',
    WillProcessDate: '2025-02-18T00:00:00Z',
    LastUpdate: new Date().toISOString(),
    SourceApplication: 'WEB',
    EntryDate: new Date().toISOString(),
    UsersAccountAtPayee: '987654321',
    NameOnAccount: 'John Doe',
    PayeeId: 'payee_1',
    FisPayeeId: 'fis_payee_1',
    PayeeType: 'UTILITY',
    PaymentMethod: PaymentMethod.ACH,
    MemberId: 'member_1',
    Source: 'WEB',
    DeliveryDate: '2025-02-20T00:00:00Z'
  },
  {
    Id: 'pmt_2',
    UserPayeeListId: 'upl_2',
    FundingAccount: 'acc_1',
    Amount: 100.00,
    StatusCode: 2, // COMPLETED
    FriendlyName: 'Water Utility',
    Memo: 'Water utility payment',
    WillProcessDate: '2025-02-15T00:00:00Z',
    LastUpdate: new Date().toISOString(),
    SourceApplication: 'WEB',
    EntryDate: new Date().toISOString(),
    UsersAccountAtPayee: '123456789',
    NameOnAccount: 'John Doe',
    PayeeId: 'payee_2',
    FisPayeeId: 'fis_payee_2',
    PayeeType: 'UTILITY',
    PaymentMethod: PaymentMethod.ACH,
    MemberId: 'member_1',
    Source: 'WEB',
    DeliveryDate: '2025-02-17T00:00:00Z'
  }
];

export const mockPaymentHistory: PaymentHistory[] = [
  {
    Id: 1,
    PaymentId: 'pmt_1',
    UserPayeeListId: 'upl_1',
    MemberId: 'mem_1',
    FundingAccount: 'acc_1',
    Amount: 100.00,
    WillProcessDate: '2025-02-18T00:00:00Z',
    ProcessedDate: '2025-02-18T00:00:00Z',
    StatusCode: 3, // Completed
    Memo: 'Electric bill payment',
    LastUpdate: '2025-02-18T00:00:00Z',
    SourceApplication: 'WEB',
    EntryDate: '2025-02-18T00:00:00Z',
    DeliveryDate: '2025-02-20T00:00:00Z',
    PayeeId: 'payee_1',
    UsersAccountAtPayee: '987654321',
    NameOnAccount: 'John Doe',
    PayeeType: 'UTILITY',
    PaymentMethod: PaymentMethod.ACH,
    ConfirmationNumber: 'CONF123'
  },
  {
    Id: 2,
    PaymentId: 'pmt_2',
    UserPayeeListId: 'upl_2',
    MemberId: 'mem_1',
    FundingAccount: 'acc_1',
    Amount: 75.50,
    WillProcessDate: '2025-02-15T00:00:00Z',
    ProcessedDate: '2025-02-15T00:00:00Z',
    StatusCode: 3, // Completed
    Memo: 'Water utility payment',
    LastUpdate: '2025-02-15T00:00:00Z',
    SourceApplication: 'WEB',
    EntryDate: '2025-02-15T00:00:00Z',
    DeliveryDate: '2025-02-17T00:00:00Z',
    PayeeId: 'payee_2',
    UsersAccountAtPayee: '123456789',
    NameOnAccount: 'John Doe',
    PayeeType: 'UTILITY',
    PaymentMethod: PaymentMethod.ACH,
    ConfirmationNumber: 'CONF456'
  }
];

export const mockPaymentActions = [
  {
    Action: 'CREATED',
    PerformedBy: 'Test User',
    Timestamp: '2025-02-16T21:43:09-07:00',
    Details: {
      Status: PaymentStatus.PENDING,
      Method: PaymentMethod.ACH
    }
  },
  {
    Action: 'COMPLETED',
    PerformedBy: 'Test User',
    Timestamp: '2025-02-15T12:00:00-07:00',
    Details: {
      Status: PaymentStatus.COMPLETED,
      Method: PaymentMethod.ACH
    }
  }
];