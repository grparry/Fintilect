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
} from '../../../../../types/security.types';

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


            'login_failed': 5,
            'password_reset': 3

    {
            {
        ],
            {
        ],
];

    {
    {
];

    {
    {
];

    {
    {
];

    {
            {
        ]
];

            'email': 150,
            'sms': 200,
            'authenticator': 100,
            'security-key': 0
        'low': 850,
        'medium': 120,
        'high': 25,
        'critical': 5
