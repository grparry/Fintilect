import { MemberActivity } from '../../types/member-center.types';

export const mockActivities: MemberActivity[] = [
  {
    id: '1',
    memberId: '12345',
    type: 'Login',
    description: 'Successful login from Chrome browser',
    timestamp: '2024-01-15T10:30:00',
    ipAddress: '192.168.1.1',
    device: 'Chrome on Windows'
  },
  {
    id: '2',
    memberId: '12345',
    type: 'PasswordChange',
    description: 'Password changed successfully',
    timestamp: '2024-01-14T15:45:00',
    ipAddress: '192.168.1.1',
    device: 'Chrome on Windows'
  },
  {
    id: '3',
    memberId: '12346',
    type: 'Login',
    description: 'Successful login from Safari browser',
    timestamp: '2024-01-15T09:15:00',
    ipAddress: '192.168.1.2',
    device: 'Safari on macOS'
  },
  {
    id: '4',
    memberId: '12346',
    type: 'ProfileUpdate',
    description: 'Updated contact information',
    timestamp: '2024-01-13T11:20:00',
    ipAddress: '192.168.1.2',
    device: 'Safari on macOS'
  }
];
