import {
  Customer,
  ClientType,
  ClientStatus,
  Environment,
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

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    type: ClientType.Enterprise,
    status: ClientStatus.Active,
    environment: Environment.Production,
    tenantId: 1,
    isActive: true,
    createdOn: new Date('2024-01-01').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString(),
    domain: 'acme.com',
    contactName: 'John Doe',
    contactEmail: 'john.doe@acme.com',
    contactPhone: '+1234567890',
    require2fa: true
  },
  {
    id: 2,
    name: 'Startup Labs',
    type: ClientType.Startup,
    status: ClientStatus.Active,
    environment: Environment.Development,
    tenantId: 2,
    isActive: true,
    createdOn: new Date('2024-01-15').toISOString(),
    updatedOn: new Date('2024-01-22').toISOString(),
    domain: 'startuplabs.com',
    contactName: 'Jane Smith',
    contactEmail: 'jane.smith@startuplabs.com',
    contactPhone: '+1987654321',
    require2fa: true
  }
];

// Mock Customer Contacts
export const mockCustomerContacts: ClientContact[] = [
  {
    id: 1,
    clientId: 1,
    name: 'John Doe',
    email: 'john.doe@acme.com',
    phone: '+1234567890',
    role: 'Technical Lead',
    isPrimary: true,
    lastModified: new Date('2024-01-22').toISOString()
  },
  {
    id: 2,
    clientId: 1,
    name: 'Jane Smith',
    email: 'jane.smith@acme.com',
    phone: '+1987654321',
    role: 'Business Contact',
    isPrimary: false,
    lastModified: new Date('2024-01-22').toISOString()
  }
];

// Mock Customer Services
export const mockCustomerServices: ClientService[] = [
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

// Mock Customer API Keys
export const mockCustomerApiKeys: ClientApiKey[] = [
  {
    id: 1,
    clientId: 1,
    keyName: 'Production API Key',
    environment: Environment.Production,
    createdAt: new Date('2024-01-01').toISOString(),
    expiresAt: new Date('2025-01-01').toISOString(),
    lastUsed: new Date('2024-01-22').toISOString(),
    status: 'Active'
  },
  {
    id: 2,
    clientId: 1,
    keyName: 'Development API Key',
    environment: Environment.Development,
    createdAt: new Date('2024-01-01').toISOString(),
    expiresAt: new Date('2025-01-01').toISOString(),
    lastUsed: new Date('2024-01-22').toISOString(),
    status: 'Active'
  }
];

// Mock Customer Configurations
export const mockCustomerConfigurations: ClientConfiguration[] = [
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