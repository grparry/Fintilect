import { MemberActivity } from '../../../../../types/member-center.types';

export const mockMemberActivity: { [key: string]: MemberActivity[] } = {
  // Activities for John Doe (id: '1')
  '1': [
    {
      id: 'act-101',
      memberId: '1',
      type: 'Login',
      description: 'Successful login from San Francisco, CA',
      timestamp: '2025-01-22T10:15:00Z',
      ipAddress: '192.168.1.100',
      device: 'iPhone 14 Pro'
    },
    {
      id: 'act-102',
      memberId: '1',
      type: 'AccountAccess',
      description: 'Viewed checking account CHK-1234',
      timestamp: '2025-01-22T10:16:00Z',
      ipAddress: '192.168.1.100',
      device: 'iPhone 14 Pro'
    },
    {
      id: 'act-103',
      memberId: '1',
      type: 'TransactionInitiated',
      description: 'Initiated transfer of $2,500 to SAV-5678',
      timestamp: '2025-01-21T15:45:00Z',
      ipAddress: '192.168.1.200',
      device: 'MacBook Pro'
    },
    {
      id: 'act-104',
      memberId: '1',
      type: 'AlertAcknowledged',
      description: 'Acknowledged low balance alert for CHK-1234',
      timestamp: '2025-01-21T23:35:00Z',
      ipAddress: '192.168.1.200',
      device: 'MacBook Pro'
    },
    {
      id: 'act-105',
      memberId: '1',
      type: 'ProfileUpdate',
      description: 'Updated phone number',
      timestamp: '2025-01-20T14:30:00Z',
      ipAddress: '192.168.1.200',
      device: 'MacBook Pro'
    },
    {
      id: 'act-106',
      memberId: '1',
      type: 'PasswordChange',
      description: 'Changed account password',
      timestamp: '2025-01-15T09:00:00Z',
      ipAddress: '192.168.1.200',
      device: 'MacBook Pro'
    }
  ],
  // Activities for Jane Smith (id: '2')
  '2': [
    {
      id: 'act-201',
      memberId: '2',
      type: 'Login',
      description: 'First-time login from new account',
      timestamp: '2025-01-22T10:00:00Z',
      ipAddress: '192.168.2.100',
      device: 'Samsung Galaxy S23'
    },
    {
      id: 'act-202',
      memberId: '2',
      type: 'ProfileUpdate',
      description: 'Completed initial profile setup',
      timestamp: '2025-01-22T10:05:00Z',
      ipAddress: '192.168.2.100',
      device: 'Samsung Galaxy S23'
    },
    {
      id: 'act-203',
      memberId: '2',
      type: 'AccountAccess',
      description: 'First account access',
      timestamp: '2025-01-22T10:10:00Z',
      ipAddress: '192.168.2.100',
      device: 'Samsung Galaxy S23'
    }
  ]
};