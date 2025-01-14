import {
  Client,
  ClientType,
  ClientStatus,
  Environment,
  ClientSettings,
  User,
  UserRole,
  UserStatus,
  Permission,
  UserGroup,
  SecurityRole
} from '../../../../../types/client.types';

// Default Settings
export const defaultSettings: ClientSettings = {
  general: {
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    language: 'en'
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90,
      preventReuse: 5,
      complexityScore: 3
    },
    loginPolicy: {
      maxAttempts: 3,
      lockoutDuration: 30,
      sessionTimeout: 30,
      requireMFA: true,
      allowRememberMe: false,
      allowMultipleSessions: false,
      requirePasswordChange: true
    },
    ipWhitelist: {
      enabled: true,
      addresses: ['192.168.1.1'],
      allowedRanges: ['10.0.0.0/24']
    },
    mfaSettings: {
      methods: ['email', 'sms'],
      defaultMethod: 'email',
      gracePeriod: 300,
      trustDuration: 30
    },
    auditSettings: {
      retentionDays: 90,
      highRiskEvents: ['login_failed', 'permission_changed', 'security_settings_changed'],
      alertThresholds: {
        'login_failed': 5,
        'permission_changed': 3,
        'security_settings_changed': 1
      }
    },
    alertSettings: {
      enableEmailAlerts: true,
      enableSMSAlerts: false,
      recipients: ['admin@example.com'],
      severityLevels: ['high', 'critical']
    }
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: false,
    frequency: 'daily',
    alertTypes: ['payment', 'security']
  }
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    clientId: '1',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: UserRole.Admin,
    status: UserStatus.ACTIVE,
    department: 'IT Administration',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    clientId: '1',
    username: 'user1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    role: UserRole.User,
    status: UserStatus.ACTIVE,
    department: 'Operations',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    clientId: '1',
    username: 'support',
    firstName: 'Support',
    lastName: 'Team',
    email: 'support@example.com',
    role: UserRole.Support,
    status: UserStatus.ACTIVE,
    department: 'Customer Service',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    clientId: '1',
    username: 'manager',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    role: UserRole.Manager,
    status: UserStatus.ACTIVE,
    department: 'Management',
    lastLogin: new Date().toISOString(),
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock Roles
export const mockRoles: SecurityRole[] = [
  {
    id: "role-1",
    name: "Administrator",
    description: "Full system access",
    permissions: [
      {
        id: 'manage_users',
        name: 'Manage Users',
        description: 'Can manage users',
        category: 'user',
        actions: ['create', 'read', 'update', 'delete']
      }
    ],
    createdAt: "2025-01-13T14:23:27-07:00",
    updatedAt: "2025-01-13T14:23:27-07:00"
  },
  {
    id: "role-2",
    name: "User",
    description: "Regular user access",
    permissions: [
      {
        id: 'view_users',
        name: 'View Users',
        description: 'Can view users',
        category: 'user',
        actions: ['read']
      }
    ],
    createdAt: "2025-01-13T14:23:27-07:00",
    updatedAt: "2025-01-13T14:23:27-07:00"
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
    settings: defaultSettings,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock Groups
export const mockGroups: UserGroup[] = [
  {
    id: "group-1",
    name: "Administrators",
    description: "Admin group with full access",
    clientId: "client-1",
    roles: [mockRoles[0]], // Administrator role
    permissions: [
      {
        id: 'view_users',
        name: 'View Users',
        description: 'Can view users',
        category: 'user',
        actions: ['read']
      },
      {
        id: 'manage_users',
        name: 'Manage Users',
        description: 'Can manage users',
        category: 'user',
        actions: ['create', 'update', 'delete']
      },
      {
        id: 'view_reports',
        name: 'View Reports',
        description: 'Can view reports',
        category: 'reports',
        actions: ['read']
      }
    ],
    members: ["user-1", "user-2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "group-2",
    name: "Users",
    description: "Regular users group",
    clientId: "client-1",
    roles: [mockRoles[1]], // Regular user role
    permissions: [
      {
        id: 'view_users',
        name: 'View Users',
        description: 'Can view users',
        category: 'user',
        actions: ['read']
      }
    ],
    members: ["user-3", "user-4"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock Permissions
export const mockPermissions: Permission[] = [
  {
    id: 'view_users',
    name: 'View Users',
    description: 'Can view users',
    category: 'user',
    actions: ['read']
  },
  {
    id: 'manage_users',
    name: 'Manage Users',
    description: 'Can manage users',
    category: 'user',
    actions: ['create', 'update', 'delete']
  },
  {
    id: 'view_reports',
    name: 'View Reports',
    description: 'Can view reports',
    category: 'reports',
    actions: ['read']
  }
];
