import { ISecurityService } from '../../interfaces/ISecurityService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';
import {
    SecuritySettings,
    SecurityPolicy,
    SecurityEvent,
    RiskAssessment,
    AccessAttempt,
    SecurityAlert,
    AuditLog,
    AuditLogFilters
} from '../../../types/security.types';

export class SecurityService extends BaseService implements ISecurityService {
    constructor(basePath: string = '/api/v1/security') {
        super(basePath);
    }
    async getSecuritySettings(): Promise<SecuritySettings> {
        try {
            return await this.get<SecuritySettings>('/settings');
        } catch (error) {
            throw error;
        }
    }
    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        try {
            return await this.patch<SecuritySettings>('/settings', settings);
        } catch (error) {
            throw error;
        }
    }
    async getAuditLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditLog>> {
        try {
            return await this.get<PaginatedResponse<AuditLog>>('/audit', { params: filters });
        } catch (error) {
            throw error;
        }
    }
    async getAuditLog(logId: string): Promise<AuditLog> {
        try {
            return await this.get<AuditLog>(`/audit/${logId}`);
        } catch (error) {
            throw error;
        }
    }
    async createAuditLog(event: SecurityEvent): Promise<AuditLog> {
        try {
            return await this.post<AuditLog>('/audit', event);
        } catch (error) {
            throw error;
        }
    }
    async getSecurityPolicies(): Promise<SecurityPolicy[]> {
        try {
            return await this.get<SecurityPolicy[]>('/policies');
        } catch (error) {
            throw error;
        }
    }
    async updateSecurityPolicy(policyId: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
        try {
            return await this.patch<SecurityPolicy>(`/policies/${policyId}`, policy);
        } catch (error) {
            throw error;
        }
    }
    async performRiskAssessment(context: Record<string, any>): Promise<RiskAssessment> {
        try {
            return await this.post<RiskAssessment>('/risk-assessment', context);
        } catch (error) {
            throw error;
        }
    }
    async recordAccessAttempt(attempt: Omit<AccessAttempt, 'id' | 'timestamp'>): Promise<void> {
        try {
            await this.post('/access-attempts', attempt);
        } catch (error) {
            throw error;
        }
    }
    async logAccessAttempt(attempt: AccessAttempt): Promise<void> {
        try {
            await this.post('/access-attempts', attempt);
        } catch (error) {
            throw error;
        }
    }
    async getRecentAccessAttempts(userId?: string): Promise<AccessAttempt[]> {
        try {
            return await this.get<AccessAttempt[]>('/access-attempts', {
                params: { userId }
            });
        } catch (error) {
            throw error;
        }
    }
    async createSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert> {
        try {
            return await this.post<SecurityAlert>('/alerts', alert);
        } catch (error) {
            throw error;
        }
    }
    async getActiveAlerts(): Promise<SecurityAlert[]> {
        try {
            return await this.get<SecurityAlert[]>('/alerts/active');
        } catch (error) {
            throw error;
        }
    }
    async getActiveSecurityAlerts(): Promise<SecurityAlert[]> {
        try {
            return await this.get<SecurityAlert[]>('/alerts/active');
        } catch (error) {
            throw error;
        }
    }
    async dismissAlert(alertId: string, resolution: string): Promise<void> {
        try {
            await this.patch(`/alerts/${alertId}/dismiss`, { resolution });
        } catch (error) {
            throw error;
        }
    }
    async dismissSecurityAlert(alertId: string, resolution: string): Promise<void> {
        try {
            await this.post(`/alerts/${alertId}/dismiss`, { resolution });
        } catch (error) {
            throw error;
        }
    }
    async getSecurityMetrics(timeframe: 'day' | 'week' | 'month'): Promise<Record<string, number>> {
        try {
            return await this.get<Record<string, number>>('/metrics', {
                params: { timeframe }
            });
        } catch (error) {
            throw error;
        }
    }
}