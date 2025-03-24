import {
  Client,
  ClientConfiguration,
  ClientContact,
  ClientService,
  ClientApiKey
} from '../../../../../types/client.types';

// Default Settings
export const defaultSettings = {
  general: {
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    language: 'en'
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: false,
    frequency: 'daily',
    alertTypes: ['payment', 'security']
  },
  apiSettings: {
    rateLimit: 1000,
    webhookUrl: '',
    webhookSecret: '',
    ipWhitelist: [] as string[]
  }
};

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    type: 'ENTERPRISE',
    status: 'ACTIVE',
    environment: 'PRODUCTION',
    tenantId: 1,
    isActive: true,
    createdOn: new Date('2024-01-01').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString(),
    domain: 'acme.com',
    sponsorId: null,
    routingId: null,
    logoUrl: null,
    require2FA: true
  },
  {
    id: 2,
    name: 'Startup Labs',
    type: 'STARTUP',
    status: 'ACTIVE',
    environment: 'DEVELOPMENT',
    tenantId: 2,
    isActive: true,
    createdOn: new Date('2024-01-15').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString(),
    domain: 'startuplabs.com',
    sponsorId: null,
    routingId: null,
    logoUrl: null,
    require2FA: true
  }
];

// Mock Client Contacts
export const mockClientContacts: ClientContact[] = [
  {
    id: 1,
    clientId: 1,
    name: 'John Doe',
    email: 'john.doe@acme.com',
    phone: '+1234567890',
    isActive: true,
    isPrimary: true,
    createdOn: new Date('2024-01-22').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString()
  },
  {
    id: 2,
    clientId: 1,
    name: 'Jane Smith',
    email: 'jane.smith@acme.com',
    phone: '+1987654321',
    isActive: true,
    isPrimary: false,
    createdOn: new Date('2024-01-22').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString()
  }
];

// Mock Client Services
export const mockClientServices: ClientService[] = [
  {
    id: 1,
    clientId: 1,
    serviceName: 'Data Analytics',
    status: 'Enabled',
    startDate: new Date('2024-01-01').toISOString(),
    configuration: {
      dataRetentionDays: 90,
      maxUsers: 100,
      features: ['realtime', 'historical', 'export']
    }
  },
  {
    id: 2,
    clientId: 1,
    serviceName: 'Reporting',
    status: 'Enabled',
    startDate: new Date('2024-01-01').toISOString(),
    configuration: {
      reportTypes: ['daily', 'weekly', 'monthly'],
      customization: true,
      exportFormats: ['pdf', 'csv', 'xlsx']
    }
  }
];

// Mock Client API Keys
export const mockClientApiKeys: ClientApiKey[] = [
  {
    id: 1,
    clientId: 1,
    keyName: 'Production API Key',
    environment: 'PRODUCTION',
    createdAt: new Date('2024-01-01').toISOString(),
    expiresAt: new Date('2025-01-01').toISOString(),
    lastUsed: new Date('2024-01-22').toISOString(),
    status: 'Active'
  },
  {
    id: 2,
    clientId: 1,
    keyName: 'Development API Key',
    environment: 'DEVELOPMENT',
    createdAt: new Date('2024-01-01').toISOString(),
    expiresAt: new Date('2025-01-01').toISOString(),
    lastUsed: new Date('2024-01-22').toISOString(),
    status: 'Active'
  }
];

// Mock Client Configurations
export const mockClientConfigurations: ClientConfiguration[] = [
  {
    id: 1,
    clientId: 1,
    maxDailyLimit: 1000000,
    maxTransactionLimit: 100000,
    allowWeekendProcessing: false,
    requireDualApproval: true,
    notificationEmail: 'alerts@acme.com',
    lastModified: new Date('2024-01-22').toISOString()
  },
  {
    id: 2,
    clientId: 2,
    maxDailyLimit: 100000,
    maxTransactionLimit: 10000,
    allowWeekendProcessing: false,
    requireDualApproval: true,
    notificationEmail: 'alerts@startuplabs.com',
    lastModified: new Date('2024-01-22').toISOString()
  }
];