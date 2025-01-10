import {
  PaymentStatus,
  AccountType,
  AccountStatus,
  PayeeStatus,
  AlertType,
  DeviceType,
  DeviceStatus,
  ServiceStatus,
  MemberDashboard
} from '../../types/member-center.types';

export const mockMemberDetails: MemberDashboard = {
  recentPayments: [
    { date: '2024-01-15', amount: 150.00, status: 'Completed', description: 'Monthly Bill Payment' },
    { date: '2024-01-01', amount: 75.50, status: 'Completed', description: 'Utility Payment' },
    { date: '2023-12-15', amount: 200.00, status: 'Completed', description: 'Credit Card Payment' },
  ],
  accountSummary: {
    totalPayments: 25,
    activePayees: 8,
    pendingPayments: 2,
  },
  paymentAccounts: [
    { id: 1, type: 'Checking', number: '*****1234', status: 'Primary' },
    { id: 2, type: 'Savings', number: '*****5678', status: 'Active' },
  ],
  payees: [
    { id: 1, name: 'Electric Company', accountNumber: '12345', lastPayment: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Water Utility', accountNumber: '67890', lastPayment: '2024-01-01', status: 'Active' },
    { id: 3, name: 'Credit Card Co', accountNumber: '11111', lastPayment: '2023-12-15', status: 'Inactive' },
  ],
  scheduledPayments: [
    { id: 1, payee: 'Electric Company', amount: 150.00, date: '2024-02-15', status: 'Scheduled' },
    { id: 2, payee: 'Water Utility', amount: 75.50, date: '2024-02-01', status: 'Scheduled' },
  ],
  alerts: [
    { id: 1, type: 'Account', message: 'Payment account ending in 1234 expires next month' },
    { id: 2, type: 'Transaction', message: 'Failed payment attempt for Credit Card Co' },
    { id: 3, type: 'System', message: 'Successfully processed payment to Electric Company' },
  ],
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    dateOfBirth: '1980-01-01',
    ssn: '***-**-1234'
  },
  security: {
    lastLogin: '2024-01-15T10:30:00',
    twoFactorEnabled: true,
    passwordLastChanged: '2023-12-01',
    securityQuestions: [
      { question: 'What was your first pet\'s name?', isSet: true },
      { question: 'In what city were you born?', isSet: true },
      { question: 'What was your first car?', isSet: false }
    ]
  },
  devices: [
    { id: 1, type: 'Mobile', name: 'iPhone 13', lastAccess: '2024-01-15T12:00:00', status: 'Active' },
    { id: 2, type: 'Desktop', name: 'Chrome - Windows', lastAccess: '2024-01-14T15:30:00', status: 'Active' },
    { id: 3, type: 'Tablet', name: 'iPad Pro', lastAccess: '2024-01-10T09:15:00', status: 'Inactive' }
  ],
  accounts: [
    { id: 1, type: 'Checking', number: '*****1234', balance: 5000.00, status: 'Active' },
    { id: 2, type: 'Savings', number: '*****5678', balance: 10000.00, status: 'Active' },
    { id: 3, type: 'Credit', number: '*****9012', balance: -1500.00, status: 'Active' }
  ],
  otherServices: [
    { id: 1, name: 'E-Statements', status: 'Available', enrollDate: '2023-01-15' },
    { id: 2, name: 'Mobile Banking', status: 'Available', enrollDate: '2023-02-01' },
    { id: 3, name: 'Document Center', status: 'Available', enrollDate: '2023-03-15' },
    { id: 4, name: 'Cardlytics', status: 'Unavailable', enrollDate: null },
    { id: 5, name: 'Secure Message Attachments', status: 'Available', enrollDate: '2023-04-01' }
  ]
};
