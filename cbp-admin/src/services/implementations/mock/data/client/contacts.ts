import { 
  ContactType, 
  ContactRole, 
  NotificationType, 
  Contact 
} from '../../types/client.types';

export const contactTypes: ContactType[] = [
  'Primary',
  'Technical',
  'Billing',
  'Emergency'
] as const;

export const roleOptions: ContactRole[] = [
  'Admin',
  'Technical',
  'Business',
  'Billing'
] as const;

export const notificationOptions: NotificationType[] = [
  'Email',
  'SMS',
  'Push'
] as const;

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'System Administrator',
    email: 'john.doe@example.com',
    phone: '555-0123',
    type: 'Primary' as ContactType,
    role: 'Admin' as ContactRole,
    notifications: ['Email', 'SMS'] as NotificationType[],
    isEmergencyContact: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Technical Lead',
    email: 'jane.smith@example.com',
    phone: '555-0124',
    type: 'Technical' as ContactType,
    role: 'Technical' as ContactRole,
    notifications: ['Email', 'Push'] as NotificationType[],
    isEmergencyContact: false
  }
];
