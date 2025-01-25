import { v4 as uuidv4 } from 'uuid';
import { UserRecord } from '../../../services/user.service';

export const mockTimestamps = {
  past: new Date('2024-01-01T00:00:00Z'),
  present: new Date('2024-01-07T00:00:00Z'),
  future: new Date('2024-01-14T00:00:00Z')
};

export const mockUsers = {
  standard: {
    id: uuidv4(),
    email: 'test@example.com',
    roles: ['user'],
    firstName: 'Test',
    lastName: 'User',
    status: 'active' as const,
    preferences: {
      theme: 'light' as const,
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      timezone: 'UTC',
      language: 'en'
    },
    createdAt: mockTimestamps.past,
    updatedAt: mockTimestamps.past,
    lastLogin: undefined
  } as UserRecord,
  admin: {
    id: uuidv4(),
    email: 'admin@example.com',
    roles: ['admin'],
    firstName: 'Admin',
    lastName: 'User',
    status: 'active' as const,
    preferences: {
      theme: 'dark' as const,
      notifications: {
        email: true,
        push: true,
        sms: true
      },
      timezone: 'UTC',
      language: 'en'
    },
    createdAt: mockTimestamps.past,
    updatedAt: mockTimestamps.past,
    lastLogin: undefined
  } as UserRecord,
  inactive: {
    id: uuidv4(),
    email: 'inactive@example.com',
    roles: ['user'],
    firstName: 'Inactive',
    lastName: 'User',
    status: 'inactive' as const,
    preferences: {
      theme: 'system' as const,
      notifications: {
        email: false,
        push: false,
        sms: false
      },
      timezone: 'UTC',
      language: 'en'
    },
    createdAt: mockTimestamps.past,
    updatedAt: mockTimestamps.past,
    deactivatedAt: mockTimestamps.present,
    lastLogin: undefined
  } as UserRecord
};

export const mockClients = {
  standard: {
    id: uuidv4(),
    name: 'Test Client',
    email: 'client@example.com',
    status: 'active' as const,
    clientType: 'standard' as const,
    createdAt: mockTimestamps.past,
    updatedAt: mockTimestamps.past,
    settings: {
      paymentLimits: {
        daily: 10000,
        transaction: 5000
      }
    }
  },
  inactive: {
    id: uuidv4(),
    name: 'Inactive Client',
    email: 'inactive@example.com',
    status: 'inactive' as const,
    clientType: 'standard' as const,
    createdAt: mockTimestamps.past,
    updatedAt: mockTimestamps.present,
    deactivatedAt: mockTimestamps.present,
    settings: {
      paymentLimits: {
        daily: 0,
        transaction: 0
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
    EffectiveDate: mockTimestamps.future,
    Description: 'Test Payment',
    Reference: 'REF123',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: mockTimestamps.present,
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
    EffectiveDate: mockTimestamps.future,
    Description: 'Approved Payment',
    Reference: 'REF456',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: mockTimestamps.past,
    ModifiedBy: mockUsers.admin.id,
    ModifiedDate: mockTimestamps.present,
    ClearedDate: null,
    Reason: null
  },
  rejected: {
    PaymentId: uuidv4(),
    PayeeId: uuidv4(),
    Amount: 50000.00,
    Currency: 'USD',
    Status: 'rejected',
    EffectiveDate: mockTimestamps.future,
    Description: 'Rejected Payment',
    Reference: 'REF789',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: mockTimestamps.past,
    ModifiedBy: mockUsers.admin.id,
    ModifiedDate: mockTimestamps.present,
    ClearedDate: null,
    Reason: 'Amount exceeds transaction limit'
  },
  cleared: {
    PaymentId: uuidv4(),
    PayeeId: uuidv4(),
    Amount: 1500.00,
    Currency: 'USD',
    Status: 'cleared',
    EffectiveDate: mockTimestamps.past,
    Description: 'Cleared Payment',
    Reference: 'REF012',
    CreatedBy: mockUsers.standard.id,
    CreatedDate: mockTimestamps.past,
    ModifiedBy: mockUsers.admin.id,
    ModifiedDate: mockTimestamps.past,
    ClearedDate: mockTimestamps.present,
    Reason: null
  }
};

export const mockErrors = {
  validation: {
    status: 400,
    message: 'Validation failed',
    details: [
      { field: 'amount', message: 'Amount must be greater than 0' },
      { field: 'currency', message: 'Currency must be a valid ISO code' }
    ]
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized access'
  },
  forbidden: {
    status: 403,
    message: 'Insufficient permissions'
  },
  notFound: {
    status: 404,
    message: 'Resource not found'
  },
  conflict: {
    status: 409,
    message: 'Resource already exists'
  }
};

export const createMockPayment = (overrides = {}) => ({
  ...mockPayments.pending,
  PaymentId: uuidv4(),
  CreatedDate: new Date(),
  ...overrides
});

export const createMockClient = (overrides = {}) => ({
  id: uuidv4(),
  name: 'New Test Client',
  email: 'newclient@example.com',
  status: 'active' as const,
  clientType: 'standard' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  settings: {
    paymentLimits: {
      daily: 10000,
      transaction: 5000
    }
  },
  ...overrides
});

export const createMockUser = (overrides = {}) => ({
  ...mockUsers.standard,
  id: uuidv4(),
  createdAt: new Date(),
  ...overrides
});

describe('MockData', () => {
  it.todo('should provide valid mock data');
  it.todo('should handle all required data types');
  it.todo('should maintain data consistency');
});
