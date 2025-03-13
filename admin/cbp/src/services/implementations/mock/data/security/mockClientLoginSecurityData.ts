import { ClientLoginSecurityResponse } from '../../../../../types/security.types';
import { mockClients } from '../client/mockClientData';

/**
 * Mock data for client login security settings
 */
export const mockClientLoginSecuritySettings: ClientLoginSecurityResponse[] = [
  {
    id: 1,
    clientId: 1,
    minPasswordLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
    passwordExpiryDays: 90,
    maxLoginAttempts: 3,
    sessionTimeoutMinutes: 60,
    preventPasswordReuse: 5,
    twoFactorAuthRequired: true,
    createdOn: '2025-01-01T00:00:00Z',
    updatedOn: '2025-02-15T00:00:00Z',
    lastModifiedBy: 'admin@example.com',
    clientName: mockClients[0]?.name || 'Default Client'
  },
  {
    id: 2,
    clientId: 2,
    minPasswordLength: 10,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
    passwordExpiryDays: 60,
    maxLoginAttempts: 5,
    sessionTimeoutMinutes: 30,
    preventPasswordReuse: 10,
    twoFactorAuthRequired: true,
    createdOn: '2025-01-01T00:00:00Z',
    updatedOn: '2025-03-01T00:00:00Z',
    lastModifiedBy: 'admin@example.com',
    clientName: mockClients[1]?.name || 'Second Client'
  }
];
