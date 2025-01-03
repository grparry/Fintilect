import { Alert } from '../../types/member-center.types';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'Security',
    message: 'Login attempt from new device detected',
    severity: 'warning',
    createdAt: '2024-01-15T10:30:00',
    acknowledged: false
  },
  {
    id: '2',
    type: 'Account',
    message: 'Balance below minimum threshold',
    severity: 'warning',
    createdAt: '2024-01-14T15:45:00',
    acknowledged: true
  },
  {
    id: '3',
    type: 'Transaction',
    message: 'Large transaction pending approval',
    severity: 'info',
    createdAt: '2024-01-13T11:20:00',
    acknowledged: false
  },
  {
    id: '4',
    type: 'System',
    message: 'Scheduled maintenance this weekend',
    severity: 'info',
    createdAt: '2024-01-12T09:15:00',
    expiresAt: '2024-01-15T00:00:00',
    acknowledged: false
  }
];
