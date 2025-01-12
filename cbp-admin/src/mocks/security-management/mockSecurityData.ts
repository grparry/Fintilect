import { 
    SecuritySettings,
    SecurityPolicy,
    AuditLog,
    RiskLevel,
    SecurityAlert,
    AccessAttempt,
    MFAMethod
} from '../../types/security.types';

export const mockSecuritySettings: SecuritySettings = {
    passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90,
        preventReuse: 5,
        complexityScore: 3
    },
    loginPolicy: {
        maxAttempts: 3,
        lockoutDuration: 30,
        sessionTimeout: 60,
        requireMFA: true,
        allowRememberMe: false,
        allowMultipleSessions: false,
        requirePasswordChange: false
    },
    ipWhitelist: {
        enabled: true,
        addresses: ['192.168.1.1', '10.0.0.1'],
        allowedRanges: ['192.168.0.0/16']
    },
    mfaSettings: {
        methods: ['email', 'sms', 'authenticator'] as MFAMethod[],
        defaultMethod: 'email' as MFAMethod,
        gracePeriod: 7,
        trustDuration: 30
    },
    auditSettings: {
        retentionDays: 90,
        highRiskEvents: ['login_failed', 'mfa_failed', 'password_reset'],
        alertThresholds: {
            'login_failed': 3,
            'mfa_failed': 2
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
        eventType: 'login_success',
        userId: 'user-1',
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.1',
        resourceType: 'auth',
        resourceId: 'session-1',
        action: 'login',
        status: 'success',
        details: {},
        riskLevel: 'low'
    },
    {
        id: 'log-2',
        timestamp: new Date().toISOString(),
        eventType: 'password_reset',
        userId: 'user-2',
        userAgent: 'Mozilla/5.0',
        ipAddress: '192.168.1.2',
        resourceType: 'user',
        resourceId: 'user-2',
        action: 'reset_password',
        status: 'success',
        details: {},
        riskLevel: 'medium'
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
