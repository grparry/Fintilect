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
    paymentID: 'pmt_1',
    willProcessDate: '2025-02-18T00:00:00Z',
    memo: 'Electric bill payment',
    billReference: 'ELEC-2025-02',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_1',
    memberID: 'mem_1',
    amount: 100.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-02-20T00:00:00Z',
    status: PaymentStatus.COMPLETED,
    frequency: 'once',
    numPayments: 1,
    processDate: '2025-02-18T00:00:00Z'
  },
  {
    paymentID: 'pmt_2',
    willProcessDate: '2025-02-15T00:00:00Z',
    memo: 'Water utility payment',
    billReference: 'WATER-2025-02',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_2',
    memberID: 'mem_1',
    amount: 75.50,
    sourceApplication: 'WEB',
    deliveryDate: '2025-02-17T00:00:00Z',
    status: PaymentStatus.COMPLETED,
    frequency: 'once',
    numPayments: 1,
    processDate: '2025-02-15T00:00:00Z'
  },
  {
    paymentID: 'pmt_3',
    willProcessDate: '2025-02-20T00:00:00Z',
    memo: 'Internet service payment',
    billReference: 'INET-2025-02',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_3',
    memberID: 'mem_1',
    amount: 89.99,
    sourceApplication: 'WEB',
    deliveryDate: '2025-02-22T00:00:00Z',
    status: PaymentStatus.COMPLETED,
    frequency: 'once',
    numPayments: 1,
    processDate: '2025-02-20T00:00:00Z'
  },
  {
    paymentID: 'pmt_4',
    willProcessDate: '2025-02-25T00:00:00Z',
    memo: 'Cell phone bill',
    billReference: 'CELL-2025-02',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_4',
    memberID: 'mem_1',
    amount: 120.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-02-27T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_5',
    willProcessDate: '2025-02-28T00:00:00Z',
    memo: 'Credit card payment',
    billReference: 'CC-2025-02',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_5',
    memberID: 'mem_1',
    amount: 500.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-02T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_6',
    willProcessDate: '2025-03-05T00:00:00Z',
    memo: 'Rent payment',
    billReference: 'RENT-2025-03',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_6',
    memberID: 'mem_1',
    amount: 1200.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-07T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_7',
    willProcessDate: '2025-03-10T00:00:00Z',
    memo: 'Car insurance payment',
    billReference: 'INS-2025-03',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_7',
    memberID: 'mem_1',
    amount: 150.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-12T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_8',
    willProcessDate: '2025-03-15T00:00:00Z',
    memo: 'Gym membership',
    billReference: 'GYM-2025-03',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_8',
    memberID: 'mem_1',
    amount: 50.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-17T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_9',
    willProcessDate: '2025-03-20T00:00:00Z',
    memo: 'Streaming service',
    billReference: 'STREAM-2025-03',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_9',
    memberID: 'mem_1',
    amount: 14.99,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-22T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  },
  {
    paymentID: 'pmt_10',
    willProcessDate: '2025-03-25T00:00:00Z',
    memo: 'Student loan payment',
    billReference: 'LOAN-2025-03',
    fundingAccount: 'acc_1',
    userPayeeListID: 'upl_10',
    memberID: 'mem_1',
    amount: 350.00,
    sourceApplication: 'WEB',
    deliveryDate: '2025-03-27T00:00:00Z',
    status: PaymentStatus.PENDING,
    frequency: 'once',
    numPayments: 1,
    processDate: null
  }
];

export const mockPendingPayments: PendingPaymentResponse[] = [
  {
    memberID: 'member_1',
    source: 'WEB',
    deliveryDate: '2025-02-20T00:00:00Z'
  },
  {
    memberID: 'member_2',
    source: 'WEB',
    deliveryDate: '2025-02-22T00:00:00Z'
  }
];

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 1,
    paymentID: 'pmt_1',
    userPayeeListID: 'upl_1',
    memberID: 'mem_1',
    fundingAccount: 'acc_1',
    amount: 100.00,
    willProcessDate: '2025-02-18T00:00:00Z',
    processedDate: '2025-02-18T00:00:00Z',
    statusCode: 3, // Completed
    memo: 'Electric bill payment',
    lastUpdate: '2025-02-18T00:00:00Z',
    sourceApplication: 'WEB',
    entryDate: '2025-02-18T00:00:00Z',
    deliveryDate: '2025-02-20T00:00:00Z',
    payeeID: 'payee_1',
    usersAccountAtPayee: '987654321',
    nameOnAccount: 'John Doe',
    payeeType: 'UTILITY',
    paymentMethod: PaymentMethod.ACH,
    confirmationNumber: 'CONF123'
  },
  {
    id: 2,
    paymentID: 'pmt_2',
    userPayeeListID: 'upl_2',
    memberID: 'mem_1',
    fundingAccount: 'acc_1',
    amount: 75.50,
    willProcessDate: '2025-02-15T00:00:00Z',
    processedDate: '2025-02-15T00:00:00Z',
    statusCode: 3, // Completed
    memo: 'Water utility payment',
    lastUpdate: '2025-02-15T00:00:00Z',
    sourceApplication: 'WEB',
    entryDate: '2025-02-15T00:00:00Z',
    deliveryDate: '2025-02-17T00:00:00Z',
    payeeID: 'payee_2',
    usersAccountAtPayee: '123456789',
    nameOnAccount: 'John Doe',
    payeeType: 'UTILITY',
    paymentMethod: PaymentMethod.ACH,
    confirmationNumber: 'CONF456'
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