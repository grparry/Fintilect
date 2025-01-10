import { 
  Client, 
  ClientType, 
  ClientStatus, 
  Environment,
  ClientSettings,
  User,
  UserRole,
  UserStatus,
  UserGroup,
  SecurityRole,
  Permission
} from '../../types/client.types';

// Default Settings
export const defaultSettings: ClientSettings = {
  general: {
    timezone: 'America/Denver',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    language: 'en',
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90,
    },
    loginPolicy: {
      maxAttempts: 3,
      lockoutDuration: 15,
    },
    sessionTimeout: 30,
    mfaEnabled: true,
    ipWhitelist: [],
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    frequency: 'daily',
    alertTypes: ['payment', 'security', 'system'],
  },
  branding: {
    logo: '',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    favicon: '',
  },
  features: {
    billPay: true,
    moneyDesktop: true,
    mobileDeposit: true,
    p2p: true,
    cardControls: true,
  },
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: UserRole.Admin,
    status: UserStatus.ACTIVE,
    department: 'IT Administration',
    lastLogin: new Date().toISOString(),
    locked: false
  },
  {
    id: 2,
    username: 'user1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    role: UserRole.User,
    status: UserStatus.ACTIVE,
    department: 'Operations',
    lastLogin: new Date().toISOString(),
    locked: false
  },
  {
    id: 3,
    username: 'support',
    firstName: 'Support',
    lastName: 'Team',
    email: 'support@example.com',
    role: UserRole.Support,
    status: UserStatus.ACTIVE,
    department: 'Customer Service',
    lastLogin: new Date().toISOString(),
    locked: false
  },
  {
    id: 4,
    username: 'manager',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    role: UserRole.Manager,
    status: UserStatus.ACTIVE,
    department: 'Management',
    lastLogin: new Date().toISOString(),
    locked: false
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Example Credit Union',
    type: ClientType.Enterprise,
    status: ClientStatus.Active,
    environment: Environment.Production,
    domain: 'example.com',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    contactPhone: '555-0123',
    settings: {
      general: {
        timezone: 'America/Denver',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
        language: 'en',
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expirationDays: 90,
        },
        loginPolicy: {
          maxAttempts: 3,
          lockoutDuration: 15,
        },
        sessionTimeout: 30,
        mfaEnabled: true,
        ipWhitelist: ['192.168.1.0/24'],
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: true,
        pushEnabled: true,
        frequency: 'daily',
        alertTypes: ['payment', 'security', 'system'],
      },
      branding: {
        logo: '',
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        favicon: '',
      },
      features: {
        billPay: true,
        moneyDesktop: true,
        mobileDeposit: true,
        p2p: true,
        cardControls: true,
      },
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
];

// Mock Groups
export const mockGroups: UserGroup[] = [
  {
    id: '1',
    name: 'Administrators',
    description: 'System administrators group',
    clientId: '1',
    roles: [],
    permissions: [],
    members: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock Roles
export const mockRoles: SecurityRole[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'System administrator role',
    permissions: [],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock Permissions
export const mockPermissions: Permission[] = [
  {
    id: 'user:read',
    name: 'Read Users',
    description: 'View user information',
    category: 'user',
    actions: ['read'],
  },
  {
    id: 'user:write',
    name: 'Modify Users',
    description: 'Create, update, and delete users',
    category: 'user',
    actions: ['create', 'update', 'delete'],
  }
];
