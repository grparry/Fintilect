import { v4 as uuidv4 } from 'uuid';

export const mockUsers = {
  standard: {
    id: '1',
    email: 'test@example.com',
    roles: ['user'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  admin: {
    id: '2',
    email: 'admin@example.com',
    roles: ['admin'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
};

export const mockClients = {
  standard: {
    id: 1,
    name: 'Test Client',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    settings: {
      paymentLimits: {
        daily: 10000,
        transaction: 5000
      }
    }
  }
};

export const mockPayments = {
  pending: {
    PaymentId: uuidv4(),
    PayeeId: uuidv4(),
    Amount: 1000.00,
    Currency: 'USD',
    Status: 'pending',
    EffectiveDate: new Date('2024-01-07'),
    Description: 'Test Payment',
    Reference: 'REF123',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: new Date('2024-01-06'),
    ModifiedBy: null,
    ModifiedDate: null,
    ClearedDate: null,
    Reason: null
  },
  approved: {
    PaymentId: uuidv4(),
    PayeeId: uuidv4(),
    Amount: 2000.00,
    Currency: 'USD',
    Status: 'approved',
    EffectiveDate: new Date('2024-01-07'),
    Description: 'Approved Payment',
    Reference: 'REF456',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: new Date('2024-01-06'),
    ModifiedBy: mockUsers.admin.id,
    ModifiedDate: new Date('2024-01-06'),
    ClearedDate: null,
    Reason: null
  }
};

export const createMockPayment = (overrides = {}) => ({
  ...mockPayments.pending,
  PaymentId: uuidv4(),
  ...overrides
});
