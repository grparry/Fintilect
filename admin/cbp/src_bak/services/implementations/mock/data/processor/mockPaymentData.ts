import { PaymentMethod, PaymentStatus, PendingPayment, Priority, Payment } from '../../../../types/bill-pay.types';

// Payment status distribution for mock data


// Payment status distribution for mock data
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

// Regular payments
  {
  {
];

// Pending payments with more detailed information
  {
  {
  {
];

// Additional mock payment data
  {
  {
  {
];

// Mock payee conversion files
    {
    {
  ]

// Payment history for audit trails
  {
      {
    ]
];
