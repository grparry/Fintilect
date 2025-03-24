import { 
    SecuritySettings,
    PasswordPolicy,
    LoginPolicy,
    IPWhitelist,
    MFASettings,
    AlertSettings,
    MFAMethod
} from '../../../../../types/security.types';

export const mockSecuritySettings: SecuritySettings = {
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
        sessionTimeout: 60,
        requireMFA: true,
        allowRememberMe: true,
        allowMultipleSessions: false,
        requirePasswordChange: false
    },
    ipWhitelist: {
        enabled: false,
        addresses: [],
        allowedRanges: []
    },
    mfaSettings: {
        methods: ['email', 'sms'] as MFAMethod[],
        defaultMethod: 'email' as MFAMethod,
        gracePeriod: 7,
        trustDuration: 30
    },
    alertSettings: {
        enableEmailAlerts: true,
        enableSMSAlerts: false,
        recipients: [],
        severityLevels: ['high', 'critical']
    }
};