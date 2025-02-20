import {
  Payment,
  PaymentMethod,
  PaymentStatus,
  Priority,
  ConfirmationMethod,
  ConfirmationStatus,
  PaymentHistory as IPaymentHistory,
  PaymentAction
} from '../../../../../types/bill-pay.types';

export interface PaymentHistory {
  paymentId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, any>;
}

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
    effectiveDate: '2025-02-18T00:00:00Z',
    description: 'Electric bill payment',
    priority: Priority.HIGH,
    createdAt: '2025-02-16T21:43:09-07:00',
    updatedAt: '2025-02-16T21:43:09-07:00',
    userPayeeListId: 'upl_1',
    memberId: 'mem_1',
    fundingAccount: {
      accountId: 'acc_1',
      accountType: 'CHECKING',
      accountNumber: '1234567890',
      routingNumber: '123456789'
    }
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
    effectiveDate: '2025-02-15T00:00:00Z',
    description: 'Water utility payment',
    priority: Priority.MEDIUM,
    createdAt: '2025-02-15T10:00:00-07:00',
    updatedAt: '2025-02-15T12:00:00-07:00',
    userPayeeListId: 'upl_2',
    memberId: 'mem_1',
    fundingAccount: {
      accountId: 'acc_1',
      accountType: 'CHECKING',
      accountNumber: '1234567890',
      routingNumber: '123456789'
    }
  },
  {
    id: 'pmt_3',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_3',
    payeeName: 'Office Supplies Co',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    status: PaymentStatus.PENDING_APPROVAL,
    effectiveDate: '2025-02-18T00:00:00Z',
    description: 'Office supplies quarterly payment',
    priority: Priority.LOW,
    createdAt: '2025-02-17T09:15:00-07:00',
    updatedAt: '2025-02-17T09:15:00-07:00',
    userPayeeListId: 'upl_3',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pmt_4',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_4',
    payeeName: 'Cloud Services Provider',
    amount: 5000.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    status: PaymentStatus.FAILED,
    effectiveDate: '2025-02-14T00:00:00Z',
    description: 'Cloud services monthly subscription',
    priority: Priority.HIGH,
    createdAt: '2025-02-14T08:00:00-07:00',
    updatedAt: '2025-02-14T08:30:00-07:00',
    userPayeeListId: 'upl_4',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pmt_5',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_5',
    payeeName: 'Insurance Provider',
    amount: 1200.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PROCESSING,
    effectiveDate: '2025-02-17T00:00:00Z',
    description: 'Monthly insurance premium',
    priority: Priority.MEDIUM,
    createdAt: '2025-02-16T14:20:00-07:00',
    updatedAt: '2025-02-16T14:20:00-07:00',
    userPayeeListId: 'upl_5',
    memberId: 'mem_3',
    fundingAccount: {
      accountId: 'acc_3',
      accountType: 'CHECKING',
      accountNumber: '1111222233',
      routingNumber: '111122223'
    }
  },
  {
    id: 'pmt_6',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_6',
    payeeName: 'Fleet Maintenance Co',
    amount: 7500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    status: PaymentStatus.PENDING_APPROVAL,
    effectiveDate: '2025-02-18T00:00:00Z',
    description: 'Fleet maintenance services',
    priority: Priority.HIGH,
    createdAt: '2025-02-16T16:45:00-07:00',
    updatedAt: '2025-02-16T16:45:00-07:00',
    userPayeeListId: 'upl_6',
    memberId: 'mem_3',
    fundingAccount: {
      accountId: 'acc_3',
      accountType: 'CHECKING',
      accountNumber: '1111222233',
      routingNumber: '111122223'
    }
  },
  {
    id: 'pmt_7',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_7',
    payeeName: 'Cloud Services Provider',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    status: PaymentStatus.PROCESSING,
    effectiveDate: '2025-02-17T00:00:00Z',
    description: 'Monthly cloud services',
    priority: Priority.HIGH,
    createdAt: '2025-02-16T14:30:00-07:00',
    updatedAt: '2025-02-16T14:30:00-07:00',
    userPayeeListId: 'upl_7',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pmt_8',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_8',
    payeeName: 'Insurance Provider',
    amount: 5000.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    effectiveDate: '2025-02-18T00:00:00Z',
    description: 'Annual insurance premium',
    priority: Priority.MEDIUM,
    createdAt: '2025-02-16T15:00:00-07:00',
    updatedAt: '2025-02-16T15:00:00-07:00',
    userPayeeListId: 'upl_8',
    memberId: 'mem_3',
    fundingAccount: {
      accountId: 'acc_3',
      accountType: 'CHECKING',
      accountNumber: '1111222233',
      routingNumber: '111122223'
    }
  },
  {
    id: 'pmt_9',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_9',
    payeeName: 'Office Supplies Co',
    amount: 750.00,
    currency: 'USD',
    method: PaymentMethod.CHECK,
    status: PaymentStatus.REJECTED,
    effectiveDate: '2025-02-16T00:00:00Z',
    description: 'Office supplies and equipment',
    priority: Priority.LOW,
    createdAt: '2025-02-15T09:00:00-07:00',
    updatedAt: '2025-02-15T09:00:00-07:00',
    userPayeeListId: 'upl_9',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pmt_10',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_10',
    payeeName: 'Marketing Agency',
    amount: 3000.00,
    currency: 'USD',
    method: PaymentMethod.RTP,
    status: PaymentStatus.FAILED,
    effectiveDate: '2025-02-17T00:00:00Z',
    description: 'Q4 marketing campaign',
    priority: Priority.HIGH,
    createdAt: '2025-02-16T11:15:00-07:00',
    updatedAt: '2025-02-16T11:15:00-07:00',
    userPayeeListId: 'upl_10',
    memberId: 'mem_1',
    fundingAccount: {
      accountId: 'acc_1',
      accountType: 'CHECKING',
      accountNumber: '1234567890',
      routingNumber: '123456789'
    }
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
    effectiveDate: '2025-02-18T00:00:00Z',
    status: PaymentStatus.PENDING,
    priority: Priority.HIGH,
    description: 'Electric bill payment',
    recipient: {
      name: 'Electric Company',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'First National Bank'
    },
    createdAt: '2025-02-16T21:42:13-07:00',
    updatedAt: '2025-02-16T21:42:13-07:00',
    userPayeeListId: 'upl_1',
    memberId: 'mem_1',
    fundingAccount: {
      accountId: 'acc_1',
      accountType: 'CHECKING',
      accountNumber: '1234567890',
      routingNumber: '123456789'
    }
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
    effectiveDate: '2025-02-15T00:00:00Z',
    status: PaymentStatus.COMPLETED,
    priority: Priority.MEDIUM,
    description: 'Water utility payment',
    recipient: {
      name: 'Water Utility',
      accountNumber: '0987654321',
      routingNumber: '123456789',
      bankName: 'Second Bank'
    },
    createdAt: '2025-02-15T10:00:00-07:00',
    updatedAt: '2025-02-15T12:00:00-07:00',
    userPayeeListId: 'upl_2',
    memberId: 'mem_1',
    fundingAccount: {
      accountId: 'acc_1',
      accountType: 'CHECKING',
      accountNumber: '1234567890',
      routingNumber: '123456789'
    }
  },
  {
    id: 'pending_3',
    paymentId: 'pmt_3',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_3',
    payeeName: 'Office Supplies Co',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2025-02-18T00:00:00Z',
    status: PaymentStatus.PENDING_APPROVAL,
    priority: Priority.LOW,
    description: 'Office supplies quarterly payment',
    recipient: {
      name: 'Office Supplies Co',
      accountNumber: '5555666677',
      routingNumber: '444433322',
      bankName: 'Third Bank'
    },
    createdAt: '2025-02-17T09:15:00-07:00',
    updatedAt: '2025-02-17T09:15:00-07:00',
    userPayeeListId: 'upl_3',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pending_4',
    paymentId: 'pmt_4',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_4',
    payeeName: 'Cloud Services Provider',
    amount: 5000.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2025-02-14T00:00:00Z',
    status: PaymentStatus.FAILED,
    priority: Priority.HIGH,
    description: 'Cloud services monthly subscription',
    recipient: {
      name: 'Cloud Services Provider',
      accountNumber: '9999888877',
      routingNumber: '666655544',
      bankName: 'Fourth Bank'
    },
    createdAt: '2025-02-14T08:00:00-07:00',
    updatedAt: '2025-02-14T08:30:00-07:00',
    userPayeeListId: 'upl_4',
    memberId: 'mem_2',
    fundingAccount: {
      accountId: 'acc_2',
      accountType: 'CHECKING',
      accountNumber: '9876543210',
      routingNumber: '987654321'
    }
  },
  {
    id: 'pending_5',
    paymentId: 'pmt_5',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_5',
    payeeName: 'Insurance Provider',
    amount: 1200.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2025-02-17T00:00:00Z',
    status: PaymentStatus.PROCESSING,
    priority: Priority.MEDIUM,
    description: 'Monthly insurance premium',
    recipient: {
      name: 'Insurance Provider',
      accountNumber: '1111222233',
      routingNumber: '888877766',
      bankName: 'Fifth Bank'
    },
    createdAt: '2025-02-16T14:20:00-07:00',
    updatedAt: '2025-02-16T14:20:00-07:00',
    userPayeeListId: 'upl_5',
    memberId: 'mem_3',
    fundingAccount: {
      accountId: 'acc_3',
      accountType: 'CHECKING',
      accountNumber: '1111222233',
      routingNumber: '111122223'
    }
  }
];

export const mockPaymentHistory = mockPayments.map(p => ({
  paymentId: p.id,
  action: 'CREATED',
  performedBy: 'Test User',
  timestamp: p.createdAt,
  details: {
    status: p.status,
    method: p.method
  }
}));

export const mockPaymentActions: PaymentAction[] = [
  {
    action: 'CREATED',
    performedBy: 'Test User',
    timestamp: '2025-02-16T21:43:09-07:00',
    details: {
      status: PaymentStatus.PENDING,
      method: PaymentMethod.ACH
    }
  },
  {
    action: 'COMPLETED',
    performedBy: 'Test User',
    timestamp: '2025-02-15T12:00:00-07:00',
    details: {
      status: PaymentStatus.COMPLETED,
      method: PaymentMethod.ACH
    }
  }
];