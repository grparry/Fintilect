import { PaginationOptions, BaseEntity } from './common.types';
import { User } from './client.types';

// General Security Types
export interface SecuritySettings {
    passwordPolicy: PasswordPolicy;
    loginPolicy: LoginPolicy;
    ipWhitelist: IPWhitelist;
    mfaSettings: MFASettings;
    alertSettings: AlertSettings;
}

export interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expirationDays: number;
    preventReuse: number;
    complexityScore: number;
}

export interface LoginPolicy {
    maxAttempts: number;
    lockoutDuration: number;
    sessionTimeout: number;
    requireMFA: boolean;
    allowRememberMe: boolean;
    allowMultipleSessions: boolean;
    requirePasswordChange: boolean;
}

export interface IPWhitelist {
    enabled: boolean;
    addresses: string[];
    allowedRanges: string[];
}

export interface MFASettings {
    methods: MFAMethod[];
    defaultMethod: MFAMethod;
    gracePeriod: number;
    trustDuration: number;
}

export type MFAMethod = 'email' | 'sms' | 'authenticator' | 'security-key';

export interface AlertSettings {
    enableEmailAlerts: boolean;
    enableSMSAlerts: boolean;
    recipients: string[];
    severityLevels: string[];
}

// Bill Pay Security Types
export interface BillPayPasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expiryDays: number;
    preventReuse: number;
}

export interface BillPayLoginPolicy {
    maxAttempts: number;
    lockoutDuration: number;
    sessionTimeout: number;
    requireMFA: boolean;
    allowRememberMe: boolean;
}

export interface BillPayIPWhitelist {
    enabled: boolean;
    addresses: string;
}

export enum BillPayOTPMethod {
    EMAIL = 'email',
    SMS = 'sms'
}

export interface BillPayOTPSettings {
    method: BillPayOTPMethod;
    email: string;
    phone: string;
}

export interface BillPaySecuritySettings {
    passwordPolicy: BillPayPasswordPolicy;
    loginPolicy: BillPayLoginPolicy;
    ipWhitelist: BillPayIPWhitelist;
    otpSettings: BillPayOTPSettings;
    /**
     * Entity tag for optimistic concurrency control
     */
    etag?: string;
}

export interface BillPaySecurityValidation {
    isValid: boolean;
    errors: Record<string, string>;
}

// Client Login Security Types
/**
 * Response model for client login security settings
 */
export interface ClientLoginSecurityResponse {
    id: number;
    clientId: number;
    minPasswordLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialCharacters: boolean;
    passwordExpiryDays: number;
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
    preventPasswordReuse: number;
    twoFactorAuthRequired: boolean;
    createdOn: string;
    updatedOn: string | null;
    lastModifiedBy: string | null;
    clientName: string | null;
}

/**
 * Request model for updating client login security settings
 */
export interface ClientLoginSecurityUpdateRequest {
    id: number;
    minPasswordLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialCharacters: boolean;
    passwordExpiryDays: number;
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
    preventPasswordReuse: number;
    twoFactorAuthRequired: boolean;
}