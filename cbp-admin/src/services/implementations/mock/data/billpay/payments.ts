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
    effectiveDate: '2024-12-31T00:00:00Z',
    description: 'Office supplies quarterly payment',
    priority: Priority.LOW,
    createdAt: '2024-12-29T09:15:00-07:00',
    updatedAt: '2024-12-29T09:15:00-07:00'
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
    effectiveDate: '2024-12-26T00:00:00Z',
    description: 'Cloud services monthly subscription',
    priority: Priority.HIGH,
    createdAt: '2024-12-26T08:00:00-07:00',
    updatedAt: '2024-12-26T08:30:00-07:00'
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
    effectiveDate: '2024-12-29T00:00:00Z',
    description: 'Monthly insurance premium',
    priority: Priority.MEDIUM,
    createdAt: '2024-12-28T14:20:00-07:00',
    updatedAt: '2024-12-28T14:20:00-07:00'
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
    effectiveDate: '2024-12-30T00:00:00Z',
    description: 'Fleet maintenance services',
    priority: Priority.HIGH,
    createdAt: '2024-12-28T16:45:00-07:00',
    updatedAt: '2024-12-28T16:45:00-07:00'
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
    effectiveDate: '2024-12-29T00:00:00Z',
    description: 'Monthly cloud services',
    priority: Priority.HIGH,
    createdAt: '2024-12-28T14:30:00-07:00',
    updatedAt: '2024-12-28T14:30:00-07:00'
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
    effectiveDate: '2024-12-31T00:00:00Z',
    description: 'Annual insurance premium',
    priority: Priority.MEDIUM,
    createdAt: '2024-12-28T15:00:00-07:00',
    updatedAt: '2024-12-28T15:00:00-07:00'
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
    effectiveDate: '2024-12-28T00:00:00Z',
    description: 'Office supplies and equipment',
    priority: Priority.LOW,
    createdAt: '2024-12-27T09:00:00-07:00',
    updatedAt: '2024-12-27T09:00:00-07:00'
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
    effectiveDate: '2024-12-29T00:00:00Z',
    description: 'Q4 marketing campaign',
    priority: Priority.HIGH,
    createdAt: '2024-12-28T11:15:00-07:00',
    updatedAt: '2024-12-28T11:15:00-07:00'
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
      bankName: 'First National Bank'
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
    method: PaymentMethod.WIRE,
    effectiveDate: '2024-12-31T00:00:00Z',
    status: PaymentStatus.PENDING_APPROVAL,
    priority: Priority.LOW,
    description: 'Office supplies quarterly payment',
    recipient: {
      name: 'Office Supplies Co',
      accountNumber: '5555666677',
      routingNumber: '444433322',
      bankName: 'Third Bank'
    },
    createdAt: '2024-12-29T09:15:00-07:00',
    updatedAt: '2024-12-29T09:15:00-07:00'
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
    method: PaymentMethod.WIRE,
    effectiveDate: '2024-12-26T00:00:00Z',
    status: PaymentStatus.FAILED,
    priority: Priority.HIGH,
    description: 'Cloud services monthly subscription',
    recipient: {
      name: 'Cloud Services Provider',
      accountNumber: '9999888877',
      routingNumber: '666655544',
      bankName: 'Fourth Bank'
    },
    createdAt: '2024-12-26T08:00:00-07:00',
    updatedAt: '2024-12-26T08:30:00-07:00'
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
    effectiveDate: '2024-12-29T00:00:00Z',
    status: PaymentStatus.PROCESSING,
    priority: Priority.MEDIUM,
    description: 'Monthly insurance premium',
    recipient: {
      name: 'Insurance Provider',
      accountNumber: '1111222233',
      routingNumber: '888877766',
      bankName: 'Fifth Bank'
    },
    createdAt: '2024-12-28T14:20:00-07:00',
    updatedAt: '2024-12-28T14:20:00-07:00'
  },
  {
    id: 'pending_6',
    paymentId: 'pmt_6',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_6',
    payeeName: 'Fleet Maintenance Co',
    amount: 7500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    effectiveDate: '2024-12-30T00:00:00Z',
    status: PaymentStatus.PENDING_APPROVAL,
    priority: Priority.HIGH,
    description: 'Fleet maintenance services',
    recipient: {
      name: 'Fleet Maintenance Co',
      accountNumber: '4444333322',
      routingNumber: '111122233',
      bankName: 'Sixth Bank'
    },
    createdAt: '2024-12-28T16:45:00-07:00',
    updatedAt: '2024-12-28T16:45:00-07:00'
  },
  {
    id: 'pending_7',
    paymentId: 'pmt_7',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_7',
    payeeName: 'Cloud Services Provider',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    effectiveDate: '2024-12-29T00:00:00Z',
    status: PaymentStatus.PROCESSING,
    priority: Priority.HIGH,
    description: 'Monthly cloud services',
    recipient: {
      name: 'Cloud Services Provider',
      accountNumber: '2468135790',
      routingNumber: '135792468',
      bankName: 'Tech Banking Corp'
    },
    createdAt: '2024-12-28T14:30:00-07:00',
    updatedAt: '2024-12-28T14:30:00-07:00'
  },
  {
    id: 'pending_8',
    paymentId: 'pmt_8',
    clientId: 'client_3',
    clientName: 'Global Logistics LLC',
    payeeId: 'payee_8',
    payeeName: 'Insurance Provider',
    amount: 5000.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2024-12-31T00:00:00Z',
    status: PaymentStatus.PENDING,
    priority: Priority.MEDIUM,
    description: 'Annual insurance premium',
    recipient: {
      name: 'Insurance Provider',
      accountNumber: '9876543210',
      routingNumber: '456789123',
      bankName: 'Secure Trust Bank'
    },
    createdAt: '2024-12-28T15:00:00-07:00',
    updatedAt: '2024-12-28T15:00:00-07:00'
  },
  {
    id: 'pending_9',
    paymentId: 'pmt_9',
    clientId: 'client_2',
    clientName: 'TechStart Inc',
    payeeId: 'payee_9',
    payeeName: 'Office Supplies Co',
    amount: 750.00,
    currency: 'USD',
    method: PaymentMethod.CHECK,
    effectiveDate: '2024-12-28T00:00:00Z',
    status: PaymentStatus.REJECTED,
    priority: Priority.LOW,
    description: 'Office supplies and equipment',
    recipient: {
      name: 'Office Supplies Co',
      accountNumber: '1357924680',
      routingNumber: '246813579',
      bankName: 'Business First Bank'
    },
    createdAt: '2024-12-27T09:00:00-07:00',
    updatedAt: '2024-12-27T09:00:00-07:00'
  },
  {
    id: 'pending_10',
    paymentId: 'pmt_10',
    clientId: 'client_1',
    clientName: 'ACME Corp',
    payeeId: 'payee_10',
    payeeName: 'Marketing Agency',
    amount: 3000.00,
    currency: 'USD',
    method: PaymentMethod.RTP,
    effectiveDate: '2024-12-29T00:00:00Z',
    status: PaymentStatus.FAILED,
    priority: Priority.HIGH,
    description: 'Q4 marketing campaign',
    recipient: {
      name: 'Marketing Agency',
      accountNumber: '3698521470',
      routingNumber: '147258369',
      bankName: 'Digital Commerce Bank'
    },
    createdAt: '2024-12-28T11:15:00-07:00',
    updatedAt: '2024-12-28T11:15:00-07:00'
  }
];

export const mockPaymentHistory: IPaymentHistory[] = [
  {
    paymentId: 'pmt_1',
    action: 'CREATED',
    performedBy: 'user_1',
    timestamp: '2024-12-28T21:43:09-07:00',
    details: { status: 'PENDING' }
  },
  {
    paymentId: 'pmt_2',
    action: 'COMPLETED',
    performedBy: 'user_1',
    timestamp: '2024-12-27T12:00:00-07:00',
    details: { status: 'COMPLETED' }
  }
];

export const mockPaymentActions: PaymentAction[] = [
  {
    action: 'CREATED',
    performedBy: 'user_1',
    timestamp: '2024-12-28T21:43:09-07:00',
    details: { status: 'PENDING' }
  },
  {
    action: 'COMPLETED',
    performedBy: 'user_1',
    timestamp: '2024-12-27T12:00:00-07:00',
    details: { status: 'COMPLETED' }
  }
];
