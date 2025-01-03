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
    { date: '2024-01-15', amount: 150.00, status: 'Completed' as PaymentStatus, description: 'Monthly Bill Payment' },
    { date: '2024-01-01', amount: 75.50, status: 'Completed' as PaymentStatus, description: 'Utility Payment' },
    { date: '2023-12-15', amount: 200.00, status: 'Completed' as PaymentStatus, description: 'Credit Card Payment' },
  ],
  accountSummary: {
    totalPayments: 25,
    activePayees: 8,
    pendingPayments: 2,
  },
  paymentAccounts: [
    { id: 1, type: 'Checking' as AccountType, number: '*****1234', status: 'Primary' as AccountStatus },
    { id: 2, type: 'Savings' as AccountType, number: '*****5678', status: 'Active' as AccountStatus },
  ],
  payees: [
    { id: 1, name: 'Electric Company', accountNumber: '12345', lastPayment: '2024-01-15', status: 'Active' as PayeeStatus },
    { id: 2, name: 'Water Utility', accountNumber: '67890', lastPayment: '2024-01-01', status: 'Active' as PayeeStatus },
    { id: 3, name: 'Credit Card Co', accountNumber: '11111', lastPayment: '2023-12-15', status: 'Inactive' as PayeeStatus },
  ],
  scheduledPayments: [
    { id: 1, payee: 'Electric Company', amount: 150.00, date: '2024-02-15', status: 'Scheduled' as PaymentStatus },
    { id: 2, payee: 'Water Utility', amount: 75.50, date: '2024-02-01', status: 'Scheduled' as PaymentStatus },
  ],
  alerts: [
    { id: 1, type: 'warning' as AlertType, message: 'Payment account ending in 1234 expires next month' },
    { id: 2, type: 'error' as AlertType, message: 'Failed payment attempt for Credit Card Co' },
    { id: 3, type: 'success' as AlertType, message: 'Successfully processed payment to Electric Company' },
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
    { id: 1, type: 'Mobile' as DeviceType, name: 'iPhone 13', lastAccess: '2024-01-15T12:00:00', status: 'Active' as DeviceStatus },
    { id: 2, type: 'Browser' as DeviceType, name: 'Chrome - Windows', lastAccess: '2024-01-14T15:30:00', status: 'Active' as DeviceStatus },
    { id: 3, type: 'Tablet' as DeviceType, name: 'iPad Pro', lastAccess: '2024-01-10T09:15:00', status: 'Inactive' as DeviceStatus }
  ],
  accounts: [
    { id: 1, type: 'Checking' as AccountType, number: '*****1234', balance: 5000.00, status: 'Active' as AccountStatus },
    { id: 2, type: 'Savings' as AccountType, number: '*****5678', balance: 10000.00, status: 'Active' as AccountStatus },
    { id: 3, type: 'Credit Card' as AccountType, number: '*****9012', balance: -1500.00, status: 'Active' as AccountStatus }
  ],
  otherServices: [
    { id: 1, name: 'E-Statements', status: 'Enrolled' as ServiceStatus, enrollDate: '2023-01-15' },
    { id: 2, name: 'Mobile Banking', status: 'Enrolled' as ServiceStatus, enrollDate: '2023-02-01' },
    { id: 3, name: 'Document Center', status: 'Enrolled' as ServiceStatus, enrollDate: '2023-03-15' },
    { id: 4, name: 'Cardlytics', status: 'Not Enrolled' as ServiceStatus, enrollDate: null },
    { id: 5, name: 'Secure Message Attachments', status: 'Enabled' as ServiceStatus, enrollDate: '2023-04-01' }
  ]
};
