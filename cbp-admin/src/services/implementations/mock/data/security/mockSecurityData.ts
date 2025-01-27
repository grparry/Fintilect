import { 
    SecuritySettings,
    SecurityPolicy,
    RiskLevel,
    SecurityAlert,
    AccessAttempt,
    SecurityMetrics,
    AuditLog,
    PasswordPolicy,
    LoginPolicy,
    IPWhitelist,
    MFASettings,
    AuditSettings,
    AlertSettings,
    MFAMethod
} from '@/../../../../types/security.types';

export const mockSecuritySettings: SecuritySettings = {
    passwordPolicy: {
        minLength: 12,
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
        sessionTimeout: 60,
        requireMFA: true,
        allowRememberMe: true,
        allowMultipleSessions: false,
        requirePasswordChange: false
    },
    ipWhitelist: {
        enabled: true,
        addresses: ['192.168.1.1', '10.0.0.1'],
        allowedRanges: ['192.168.0.0/24']
    },
    mfaSettings: {
        methods: ['email', 'sms', 'authenticator', 'security-key'] as MFAMethod[],
        defaultMethod: 'authenticator' as MFAMethod,
        gracePeriod: 7,
        trustDuration: 30
    },
    auditSettings: {
        retentionDays: 90,
        highRiskEvents: ['login_failed', 'password_reset', 'mfa_disabled'],
        alertThresholds: {
            'login_failed': 5,
            'password_reset': 3
        }
    },
    alertSettings: {
        enableEmailAlerts: true,
        enableSMSAlerts: true,
        recipients: ['admin@example.com'],
        severityLevels: ['high', 'critical']
    }
};

export const mockSecurityPolicies: SecurityPolicy[] = [
    {
        id: 'policy-1',
        name: 'Default Access Policy',
        description: 'Default security policy for all users',
        enabled: true,
        rules: [
            {
                condition: 'ip_range',
                parameters: { range: '192.168.0.0/16' },
                type: 'allow'
            }
        ],
        actions: [
            {
                type: 'require_mfa',
                parameters: {}
            }
        ],
        priority: 1,
        lastUpdated: new Date().toISOString()
    }
];

export const mockAuditLogs: AuditLog[] = [
    {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        eventType: 'login',
        userId: 'user-1',
        userEmail: 'user1@example.com',
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        resourceType: 'session',
        resourceId: 'session-1',
        action: 'login',
        status: 'success',
        details: {
            message: 'Successful login from known IP address',
            location: 'US-West'
        },
        riskLevel: 'low' as RiskLevel
    },
    {
        id: 'log-2',
        timestamp: new Date().toISOString(),
        eventType: 'password_reset',
        userId: 'user-2',
        userEmail: 'user2@example.com',
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.2',
        resourceType: 'user',
        resourceId: 'user-2',
        action: 'reset_password',
        status: 'success',
        details: {
            message: 'Password reset completed successfully',
            method: 'self-service'
        },
        riskLevel: 'medium' as RiskLevel
    }
];

export const mockSecurityAuditLog: AuditLog[] = [
    {
        id: '1',
        timestamp: '2025-01-13T13:00:00Z',
        eventType: 'LOGIN_ATTEMPT',
        userId: 'user1',
        userEmail: 'user1@example.com',
        userAgent: 'Chrome/120.0.0.0',
        ipAddress: '192.168.1.1',
        resourceType: 'AUTH',
        resourceId: 'session1',
        action: 'LOGIN',
        status: 'success',
        details: { browser: 'Chrome', success: true },
        riskLevel: 'low' as RiskLevel
    },
    {
        id: '2',
        timestamp: '2025-01-13T13:05:00Z',
        eventType: 'PASSWORD_CHANGE',
        userId: 'user2',
        userEmail: 'user2@example.com',
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.2',
        resourceType: 'USER',
        resourceId: 'user2',
        action: 'PASSWORD_CHANGE',
        status: 'success',
        details: { reason: 'expired' },
        riskLevel: 'low' as RiskLevel
    }
];

export const mockAccessAttempts: AccessAttempt[] = [
    {
        id: 'attempt-1',
        timestamp: new Date().toISOString(),
        userId: 'user-1',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        status: 'success',
        location: {
            country: 'US',
            city: 'San Francisco'
        }
    },
    {
        id: 'attempt-2',
        timestamp: new Date().toISOString(),
        userId: 'user-2',
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0',
        status: 'failure',
        failureReason: 'Invalid password',
        location: {
            country: 'US',
            city: 'New York'
        }
    }
];

export const mockSecurityAlerts: SecurityAlert[] = [
    {
        id: 'alert-1',
        type: 'suspicious_login',
        severity: 'high' as RiskLevel,
        message: 'Multiple failed login attempts detected',
        details: {
            attempts: 3,
            ipAddress: '192.168.1.2'
        },
        timestamp: new Date().toISOString(),
        status: 'active',
        affectedResources: [
            {
                type: 'user',
                id: 'user-2'
            }
        ]
    }
];

export const mockSecurityMetrics: SecurityMetrics = {
    loginAttempts: {
        successful: 1250,
        failed: 23,
        locked: 5
    },
    mfaUsage: {
        enabled: 450,
        disabled: 50,
        byMethod: {
            'email': 150,
            'sms': 200,
            'authenticator': 100,
            'security-key': 0
        }
    },
    passwordResets: {
        selfService: 45,
        adminInitiated: 12,
        forgotten: 33
    },
    riskLevels: {
        'low': 850,
        'medium': 120,
        'high': 25,
        'critical': 5
    }
};
