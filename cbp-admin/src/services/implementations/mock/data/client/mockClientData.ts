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
  SecurityRole,
  AuditLog
} from '@/../../../../types/client.types';

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
    roles: [UserRole.Admin],
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
    roles: [UserRole.User],
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
    roles: [UserRole.Support],
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
    roles: [UserRole.Manager],
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
    clientId: "1", 
    roles: [mockRoles[0]], 
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
    members: ["1", "2"], 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "group-2",
    name: "Users",
    description: "Regular users group",
    clientId: "1", 
    roles: [mockRoles[1]], 
    permissions: [
      {
        id: 'view_users',
        name: 'View Users',
        description: 'Can view users',
        category: 'user',
        actions: ['read']
      }
    ],
    members: ["3", "4"], 
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

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-01-22T11:30:00-07:00',
    eventType: 'user_login',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'user',
    resourceId: '1',
    action: 'login',
    status: 'success',
    details: {
      method: 'password',
      mfaUsed: true
    },
    riskLevel: 'low'
  },
  {
    id: '2',
    timestamp: '2025-01-22T11:35:00-07:00',
    eventType: 'security_settings_changed',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'security_settings',
    resourceId: '1',
    action: 'update',
    status: 'success',
    details: {
      changes: {
        'passwordPolicy.minLength': { from: 8, to: 12 },
        'passwordPolicy.requireSpecialChars': { from: false, to: true }
      }
    },
    riskLevel: 'high'
  },
  {
    id: '3',
    timestamp: '2025-01-22T11:40:00-07:00',
    eventType: 'user_created',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'user',
    resourceId: '5',
    action: 'create',
    status: 'success',
    details: {
      newUser: {
        email: 'newuser@example.com',
        role: 'user'
      }
    },
    riskLevel: 'medium'
  },
  {
    id: '4',
    timestamp: '2025-01-22T11:45:00-07:00',
    eventType: 'failed_login_attempt',
    userId: '2',
    userEmail: 'john.smith@example.com',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.200',
    resourceType: 'user',
    resourceId: '2',
    action: 'login',
    status: 'failure',
    details: {
      reason: 'invalid_password',
      attemptNumber: 2
    },
    riskLevel: 'medium'
  },
  {
    id: '5',
    timestamp: '2025-01-22T11:50:00-07:00',
    eventType: 'group_modified',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'group',
    resourceId: 'group-1',
    action: 'update',
    status: 'success',
    details: {
      changes: {
        addedMembers: ['3'],
        removedMembers: ['2'],
        permissions: ['added:view_reports', 'removed:manage_users']
      }
    },
    riskLevel: 'medium'
  },
  {
    id: '6',
    timestamp: '2025-01-22T11:55:00-07:00',
    eventType: 'permission_changed',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'user',
    resourceId: '3',
    action: 'update',
    status: 'success',
    details: {
      changes: {
        addedPermissions: ['manage_reports'],
        removedPermissions: []
      }
    },
    riskLevel: 'medium'
  },
  {
    id: '7',
    timestamp: '2025-01-22T12:00:00-07:00',
    eventType: 'user_locked',
    userId: '2',
    userEmail: 'john.smith@example.com',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ipAddress: '192.168.1.200',
    resourceType: 'user',
    resourceId: '2',
    action: 'lock',
    status: 'success',
    details: {
      reason: 'exceeded_login_attempts',
      lockDuration: '30m'
    },
    riskLevel: 'high'
  },
  {
    id: '8',
    timestamp: '2025-01-22T12:05:00-07:00',
    eventType: 'mfa_enabled',
    userId: '3',
    userEmail: 'jane.doe@example.com',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    ipAddress: '192.168.1.300',
    resourceType: 'user',
    resourceId: '3',
    action: 'update',
    status: 'success',
    details: {
      method: 'authenticator_app'
    },
    riskLevel: 'low'
  },
  {
    id: '9',
    timestamp: '2025-01-22T12:10:00-07:00',
    eventType: 'api_key_created',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'api_key',
    resourceId: 'key-1',
    action: 'create',
    status: 'success',
    details: {
      keyName: 'Production API Key',
      expiresAt: '2026-01-22T12:10:00-07:00'
    },
    riskLevel: 'high'
  },
  {
    id: '10',
    timestamp: '2025-01-22T12:15:00-07:00',
    eventType: 'backup_completed',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'System',
    ipAddress: '192.168.1.100',
    resourceType: 'system',
    resourceId: 'backup-1',
    action: 'create',
    status: 'success',
    details: {
      backupSize: '2.5GB',
      duration: '180s'
    },
    riskLevel: 'low'
  },
  {
    id: '11',
    timestamp: '2025-01-22T12:17:00-07:00',
    eventType: 'system_settings_changed',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'system_settings',
    resourceId: 'settings-1',
    action: 'update',
    status: 'success',
    details: {
      changes: {
        'emailNotifications': { from: false, to: true },
        'auditRetentionDays': { from: 30, to: 90 }
      }
    },
    riskLevel: 'medium'
  },
  {
    id: '12',
    timestamp: '2025-01-22T12:18:00-07:00',
    eventType: 'user_role_changed',
    userId: '1',
    userEmail: 'admin@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
    resourceType: 'user',
    resourceId: '4',
    action: 'update',
    status: 'success',
    details: {
      changes: {
        role: { from: 'user', to: 'admin' }
      }
    },
    riskLevel: 'high'
  }
];
