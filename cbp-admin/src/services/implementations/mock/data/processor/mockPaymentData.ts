import { PaymentMethod, PaymentStatus, PendingPayment, Priority, Payment } from '../../../../../types/bill-pay.types';

// Payment status distribution for mock data
export const mockPaymentStatusDistribution: Record<PaymentStatus, number> = {
  [PaymentStatus.PENDING]: 50,
  [PaymentStatus.APPROVED]: 25,
  [PaymentStatus.REJECTED]: 10,
  [PaymentStatus.PROCESSING]: 40,
  [PaymentStatus.COMPLETED]: 200,
  [PaymentStatus.FAILED]: 15,
  [PaymentStatus.CANCELLED]: 5,
  [PaymentStatus.EXPIRED]: 2,
  [PaymentStatus.PENDING_APPROVAL]: 20,
  [PaymentStatus.DRAFT]: 30,
  [PaymentStatus.SUBMITTED]: 15,
  [PaymentStatus.SCHEDULED]: 10,
  [PaymentStatus.RETURNED]: 8,
  [PaymentStatus.STOP_PAYMENT]: 3,
  [PaymentStatus.VOID]: 5,
  [PaymentStatus.HOLD]: 4,
  [PaymentStatus.SUSPENDED]: 3,
  [PaymentStatus.REFUNDED]: 3,
  [PaymentStatus.PARTIALLY_REFUNDED]: 1,
  [PaymentStatus.CHARGEBACK]: 1
};

// Regular payments
export const mockPayments: Payment[] = [
  {
    id: 'pmt_1',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    payeeId: 'payee_1',
    payeeName: 'Electric Company',
    amount: 500.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    effectiveDate: '2024-12-20T00:00:00Z',
    description: 'Electric bill payment',
    priority: Priority.HIGH,
    createdAt: '2024-12-16T00:00:00Z',
    updatedAt: '2024-12-16T00:00:00Z'
  },
  {
    id: 'pmt_2',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    payeeId: 'payee_2',
    payeeName: 'Water Utility',
    amount: 100.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.COMPLETED,
    effectiveDate: '2024-12-15T00:00:00Z',
    description: 'Water utility payment',
    priority: Priority.MEDIUM,
    createdAt: '2024-12-14T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  }
];

// Pending payments with more detailed information
export const mockPendingPayments: PendingPayment[] = [
  {
    id: 'payment_1',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    payeeId: 'payee_1',
    payeeName: 'John Doe',
    amount: 1000.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.PENDING,
    priority: Priority.HIGH,
    effectiveDate: '2024-12-30',
    createdAt: '2024-12-30T09:00:00Z',
    updatedAt: '2024-12-30T09:00:00Z',
    recipient: {
      name: 'John Doe',
      accountNumber: '1234567890',
      routingNumber: '123456789',
      bankName: 'First Bank'
    },
    metadata: {
      invoiceNumber: 'INV-001',
      department: 'Sales'
    }
  },
  {
    id: 'payment_2',
    clientId: 'client_1',
    clientName: 'Acme Corp',
    payeeId: 'payee_2',
    payeeName: 'Jane Smith',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    status: PaymentStatus.PENDING,
    priority: Priority.MEDIUM,
    effectiveDate: '2024-12-30',
    createdAt: '2024-12-30T09:15:00Z',
    updatedAt: '2024-12-30T09:15:00Z',
    recipient: {
      name: 'Jane Smith',
      accountNumber: '0987654321',
      routingNumber: '987654321',
      bankName: 'Second Bank'
    },
    metadata: {
      invoiceNumber: 'INV-002',
      department: 'Marketing'
    }
  },
  {
    id: 'payment_3',
    clientId: 'client_2',
    clientName: 'Beta Inc',
    payeeId: 'payee_3',
    payeeName: 'Bob Wilson',
    amount: 500.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    status: PaymentStatus.APPROVED,
    priority: Priority.LOW,
    effectiveDate: '2024-12-30',
    createdAt: '2024-12-30T09:30:00Z',
    updatedAt: '2024-12-30T09:35:00Z',
    recipient: {
      name: 'Bob Wilson',
      accountNumber: '5678901234',
      routingNumber: '567890123',
      bankName: 'Third Bank'
    },
    metadata: {
      invoiceNumber: 'INV-003',
      department: 'Engineering'
    }
  }
];

// Additional mock payment data
export const mockAdditionalPayments: PendingPayment[] = [
  {
    id: 'pmt_001',
    clientId: 'client_001',
    clientName: 'Acme Corp',
    payeeId: 'payee_001',
    payeeName: 'John Doe',
    amount: 1000.00,
    currency: 'USD',
    method: PaymentMethod.ACH,
    effectiveDate: '2024-12-29',
    description: 'Monthly service payment',
    reference: 'INV-001',
    metadata: {
      department: 'IT',
      category: 'Services'
    },
    status: PaymentStatus.PENDING,
    priority: Priority.HIGH,
    createdAt: '2024-12-28T17:02:57-07:00',
    updatedAt: '2024-12-28T17:02:57-07:00',
    recipient: {
      name: 'John Doe',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      bankName: 'First Bank'
    }
  },
  {
    id: 'pmt_002',
    clientId: 'client_002',
    clientName: 'Beta Inc',
    payeeId: 'payee_002',
    payeeName: 'Jane Smith',
    amount: 2500.00,
    currency: 'USD',
    method: PaymentMethod.WIRE,
    effectiveDate: '2024-12-29',
    description: 'Equipment purchase',
    reference: 'PO-002',
    metadata: {
      department: 'Operations',
      category: 'Equipment'
    },
    status: PaymentStatus.PENDING,
    priority: Priority.MEDIUM,
    createdAt: '2024-12-28T17:02:57-07:00',
    updatedAt: '2024-12-28T17:02:57-07:00',
    recipient: {
      name: 'Jane Smith',
      accountNumber: '0987654321',
      routingNumber: '123456789',
      bankName: 'Second Bank'
    }
  },
  {
    id: 'pmt_003',
    clientId: 'client_003',
    clientName: 'Gamma LLC',
    payeeId: 'payee_003',
    payeeName: 'Bob Wilson',
    amount: 500.00,
    currency: 'USD',
    method: PaymentMethod.RTP,
    effectiveDate: '2024-12-29',
    description: 'Consulting fees',
    reference: 'CONS-003',
    metadata: {
      department: 'Consulting',
      category: 'Professional Services'
    },
    status: PaymentStatus.PENDING,
    priority: Priority.LOW,
    createdAt: '2024-12-28T17:02:57-07:00',
    updatedAt: '2024-12-28T17:02:57-07:00',
    recipient: {
      name: 'Bob Wilson',
      accountNumber: '5432109876',
      routingNumber: '678901234',
      bankName: 'Third Bank'
    }
  }
];

// Mock payee conversion files
export const mockPayeeConversionFiles = {
  success: true,
  data: [
    {
      id: 'file_001',
      name: 'payees_batch1.csv',
      status: 'PENDING',
      createdAt: '2024-12-28T17:02:57-07:00',
      validation: {
        totalRecords: 100,
        validRecords: 0,
        invalidRecords: 0,
        errors: [] as Array<{ field: string; message: string }>,
        warnings: [] as Array<{ field: string; message: string }>
      }
    },
    {
      id: 'file_002',
      name: 'payees_batch2.csv',
      status: 'COMPLETED',
      createdAt: '2024-12-27T15:30:00-07:00',
      validation: {
        totalRecords: 50,
        validRecords: 45,
        invalidRecords: 5,
        errors: [] as Array<{ field: string; message: string }>,
        warnings: [] as Array<{ field: string; message: string }>
      }
    }
  ]
};

// Payment history for audit trails
export const mockPaymentHistory = [
  {
    id: 'hist_001',
    paymentId: 'pmt_001',
    actions: [
      {
        action: 'payment_created',
        performedBy: 'user_001',
        timestamp: '2024-12-28T17:02:57-07:00',
        details: {}
      }
    ]
  }
];
