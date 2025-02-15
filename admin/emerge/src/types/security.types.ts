import { PaginationOptions, BaseEntity } from './common.types';
import { User } from './user.types';

// General Security Types
export interface SecuritySettings {
    passwordPolicy: PasswordPolicy;
    loginPolicy: LoginPolicy;
    ipWhitelist: IPWhitelist;
    mfaSettings: MFASettings;
    auditSettings: AuditSettings;
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
export interface AuditSettings {
    retentionDays: number;
    highRiskEvents: string[];
    alertThresholds: Record<string, number>;
}
export interface AlertSettings {
    enableEmailAlerts: boolean;
    enableSMSAlerts: boolean;
    enablePushAlerts: boolean;
    alertTypes: string[];
}
export interface AuditLog {
    id: string;
    timestamp: string;
    eventType: string;
    userId: string;
    userEmail: string;
    userAgent: string;
    ipAddress: string;
    resourceType: string;
    resourceId: string;
    action: string;
    status: 'success' | 'failure';
    details: Record<string, unknown>;
    riskLevel: RiskLevel;
}
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export interface AuditLogFilters {
    startDate?: string;
    endDate?: string;
    eventTypes?: string[];
    userIds?: string[];
    resourceTypes?: string[];
    actions?: string[];
    riskLevels?: RiskLevel[];
    status?: 'success' | 'failure';
}
export interface AuditSearchRequest {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface SecurityPolicy {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    rules: SecurityRule[];
    actions: SecurityAction[];
    priority: number;
    lastUpdated: string;
}
export interface SecurityRule {
    condition: string;
    parameters: Record<string, unknown>;
    type: 'allow' | 'deny';
}
export interface SecurityAction {
    type: string;
    parameters: Record<string, unknown>;
}
export interface SecurityEvent {
    type: string;
    user?: User;
    resource?: {
        type: string;
        id: string;
    };
    context: Record<string, unknown>;
    severity: RiskLevel;
    timestamp?: string;
}
export interface RiskAssessment {
    score: number;
    level: RiskLevel;
    factors: RiskFactor[];
    recommendations: string[];
    timestamp: string;
}
export interface RiskFactor {
    name: string;
    score: number;
    details: string;
}
export interface AccessAttempt {
    id: string;
    timestamp: string;
    userId: string;
    ipAddress: string;
    userAgent: string;
    status: 'success' | 'failure';
    failureReason?: string;
    location?: {
        country: string;
        city: string;
    };
}
export interface SecurityAlert {
    id: string;
    type: string;
    severity: RiskLevel;
    message: string;
    details: Record<string, unknown>;
    timestamp: string;
    status: 'active' | 'resolved' | 'dismissed';
    resolution?: string;
    affectedResources: Array<{
        type: string;
        id: string;
    }>;
}
export interface SecurityMetrics {
    loginAttempts: {
        successful: number;
        failed: number;
        locked: number;
    };
    mfaUsage: {
        enabled: number;
        disabled: number;
        byMethod: Record<MFAMethod, number>;
    };
    passwordResets: {
        selfService: number;
        adminInitiated: number;
        forgotten: number;
    };
    riskLevels: Record<RiskLevel, number>;
}
export interface IpAddress {
    address: string;
    description?: string;
    createdAt: string;
    lastUsed?: string;
    status: 'active' | 'blocked';
}
// General Security Types
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
    addresses: string[];
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
    etag?: string;
}
export interface BillPaySecurityValidation {
    isValid: boolean;
    errors: Record<string, string>;
}
