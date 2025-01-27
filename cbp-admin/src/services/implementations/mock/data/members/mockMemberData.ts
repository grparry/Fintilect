import { Member, MemberStatus } from '@/../../../../types/member-center.types';

export const mockMembers: Member[] = [
  {
    id: '1',
    accountNumber: '12345',
    joinDate: '1995-01-01',
    lastLogin: '2023-01-01',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe',
    status: 'Active',
    phone: '+1234567890',
    address: {
      street: '123 Main St',
      city: 'Sample City',
      state: 'CA',
      zip: '12345'
    },
    accounts: [
      {
        id: '101',
        accountNumber: 'CHK-1234',
        type: 'checking',
        status: 'active',
        balance: 5000.00,
        currency: 'USD',
        lastTransaction: '2025-01-21T15:30:00Z',
        openDate: '2020-01-01',
        nickname: 'Primary Checking',
        routingNumber: '123456789',
        minimumBalance: 500
      },
      {
        id: '102',
        accountNumber: 'SAV-5678',
        type: 'savings',
        status: 'active',
        balance: 15000.00,
        currency: 'USD',
        lastTransaction: '2025-01-20T10:15:00Z',
        openDate: '2020-01-01',
        nickname: 'High-Yield Savings',
        routingNumber: '123456789',
        interestRate: 0.025,
        minimumBalance: 1000
      }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      preferredMethod: 'sms',
      lastUpdated: '2025-01-15T08:30:00Z'
    },
    alerts: [
      {
        id: 'alert-101',
        type: 'Security',
        message: 'Unusual login attempt detected from new location: Chicago, IL',
        severity: 'warning',
        createdAt: '2025-01-22T08:15:00Z',
        acknowledged: false
      },
      {
        id: 'alert-102',
        type: 'Account',
        message: 'Balance in CHK-1234 is below minimum threshold ($500)',
        severity: 'error',
        createdAt: '2025-01-21T23:30:00Z',
        acknowledged: true
      },
      {
        id: 'alert-103',
        type: 'Transaction',
        message: 'Large transaction ($2,500) detected on account ending in 1234',
        severity: 'info',
        createdAt: '2025-01-21T15:45:00Z',
        acknowledged: false
      },
      {
        id: 'alert-104',
        type: 'System',
        message: 'Scheduled maintenance: Online banking will be unavailable on Jan 25, 2025, from 2-4 AM PT',
        severity: 'info',
        createdAt: '2025-01-20T12:00:00Z',
        expiresAt: '2025-01-25T12:00:00Z',
        acknowledged: false
      }
    ],
    devices: [
      {
        id: 'dev-101',
        name: 'iPhone 14 Pro',
        type: 'mobile',
        lastUsed: '2025-01-22T10:15:00Z',
        lastAccess: '2025-01-22T10:15:00Z',
        status: 'Active',
        trusted: true,
        browser: 'Safari Mobile',
        operatingSystem: 'iOS 17.2',
        location: 'San Francisco, CA'
      },
      {
        id: 'dev-102',
        name: 'MacBook Pro',
        type: 'desktop',
        lastUsed: '2025-01-22T09:30:00Z',
        lastAccess: '2025-01-22T09:30:00Z',
        status: 'Active',
        trusted: true,
        browser: 'Chrome',
        operatingSystem: 'macOS 14.2',
        location: 'San Francisco, CA'
      },
      {
        id: 'dev-103',
        name: 'iPad Air',
        type: 'tablet',
        lastUsed: '2025-01-20T14:45:00Z',
        lastAccess: '2025-01-20T14:45:00Z',
        status: 'Inactive',
        trusted: false,
        browser: 'Safari',
        operatingSystem: 'iPadOS 17.2',
        location: 'Los Angeles, CA'
      }
    ]
  },
  {
    id: '2',
    accountNumber: '67890',
    joinDate: '1995-01-01',
    lastLogin: '2023-01-01',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Pending',
    phone: '+1987654321',
    address: {
      street: '456 Oak Ave',
      city: 'Another City',
      state: 'NY',
      zip: '67890'
    },
    accounts: [
      {
        id: '201',
        accountNumber: 'CHK-9012',
        type: 'checking',
        status: 'active',
        balance: 3500.00,
        currency: 'USD',
        lastTransaction: '2025-01-21T12:45:00Z',
        openDate: '2021-03-15',
        nickname: 'Essential Checking',
        routingNumber: '123456789',
        minimumBalance: 500
      },
      {
        id: '202',
        accountNumber: 'CC-3456',
        type: 'credit',
        status: 'active',
        balance: -2500.00,
        currency: 'USD',
        lastTransaction: '2025-01-19T09:30:00Z',
        openDate: '2021-03-15',
        nickname: 'Rewards Credit Card',
        routingNumber: '123456789',
        interestRate: 0.1499,
        overdraftLimit: 5000
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      preferredMethod: 'email',
      lastUpdated: '2025-01-10T15:45:00Z'
    },
    alerts: [
      {
        id: 'alert-201',
        type: 'Security',
        message: 'Please verify your email address to complete account setup',
        severity: 'warning',
        createdAt: '2025-01-22T10:00:00Z',
        acknowledged: false
      },
      {
        id: 'alert-202',
        type: 'System',
        message: 'Welcome to Emerge! Complete your profile to access all features',
        severity: 'info',
        createdAt: '2025-01-22T10:00:00Z',
        acknowledged: false
      }
    ],
    devices: [
      {
        id: 'dev-201',
        name: 'Samsung Galaxy S23',
        type: 'mobile',
        lastUsed: '2025-01-22T11:00:00Z',
        lastAccess: '2025-01-22T11:00:00Z',
        status: 'Active',
        trusted: true,
        browser: 'Chrome Mobile',
        operatingSystem: 'Android 14',
        location: 'New York, NY'
      },
      {
        id: 'dev-202',
        name: 'Windows Laptop',
        type: 'desktop',
        lastUsed: '2025-01-21T16:20:00Z',
        lastAccess: '2025-01-21T16:20:00Z',
        status: 'Active',
        trusted: true,
        browser: 'Edge',
        operatingSystem: 'Windows 11',
        location: 'New York, NY'
      }
    ]
  }
];
