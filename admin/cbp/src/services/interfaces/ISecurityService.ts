import { IBaseService } from './IBaseService';
import {
    AuditLog,
    AuditLogFilters,
    SecuritySettings,
    SecurityPolicy,
    SecurityEvent,
    RiskAssessment,
    AccessAttempt,
    SecurityAlert
} from '../../types/security.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for security operations
 * Handles security settings, audit logs, and security monitoring
 */
export interface ISecurityService extends IBaseService {
    /**
     * Get security settings
     * @returns Current security settings
     */
    getSecuritySettings(): Promise<SecuritySettings>;

    /**
     * Update security settings
     * @param settings Updated security settings
     * @returns Updated settings
     */
    updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings>;

    /**
     * Get audit logs with pagination and filtering
     * @param filters Audit log filters
     * @returns Paginated audit logs
     */
    getAuditLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditLog>>;

    /**
     * Get specific audit log entry
     * @param logId Audit log identifier
     * @returns Audit log entry
     */
    getAuditLog(logId: string): Promise<AuditLog>;

    /**
     * Create audit log entry
     * @param event Security event to log
     * @returns Created audit log entry
     */
    createAuditLog(event: SecurityEvent): Promise<AuditLog>;

    /**
     * Get security policies
     * @returns List of security policies
     */
    getSecurityPolicies(): Promise<SecurityPolicy[]>;

    /**
     * Update security policy
     * @param policyId Policy identifier
     * @param policy Updated policy
     * @returns Updated policy
     */
    updateSecurityPolicy(policyId: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy>;

    /**
     * Perform security risk assessment
     * @param context Context for risk assessment
     * @returns Risk assessment results
     */
    performRiskAssessment(context: Record<string, unknown>): Promise<RiskAssessment>;

    /**
     * Log access attempt
     * @param attempt Access attempt details
     * @returns Created access log
     */
    logAccessAttempt(attempt: AccessAttempt): Promise<void>;

    /**
     * Get recent access attempts
     * @param userId Optional user ID to filter by
     * @returns List of recent access attempts
     */
    getRecentAccessAttempts(userId?: string): Promise<AccessAttempt[]>;

    /**
     * Create security alert
     * @param alert Alert details
     * @returns Created alert
     */
    createSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert>;

    /**
     * Get active security alerts
     * @returns List of active security alerts
     */
    getActiveAlerts(): Promise<SecurityAlert[]>;

    /**
     * Dismiss security alert
     * @param alertId Alert identifier
     * @param resolution Resolution notes
     */
    dismissAlert(alertId: string, resolution: string): Promise<void>;

    /**
     * Get security metrics
     * @param timeframe Timeframe for metrics
     * @returns Security metrics
     */
    getSecurityMetrics(timeframe: 'day' | 'week' | 'month'): Promise<Record<string, number>>;
}
