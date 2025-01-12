import { ISecurityService } from '../../interfaces/ISecurityService';
import {
    SecuritySettings,
    SecurityPolicy,
    AuditLog,
    SecurityEvent,
    RiskAssessment,
    AccessAttempt,
    SecurityAlert,
    AuditLogFilters
} from '../../../types/security.types';
import { PaginatedResponse } from '../../../types/common.types';
import { api, ApiResponse } from '../../../utils/api';

export class SecurityService implements ISecurityService {
    basePath = '/api/security';

    private handleResponse<T>(response: ApiResponse<T>): T {
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error.message);
    }

    async getSecuritySettings(): Promise<SecuritySettings> {
        const response = await api.get<SecuritySettings>(`${this.basePath}/settings`);
        return this.handleResponse(response);
    }

    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        const response = await api.patch<SecuritySettings>(`${this.basePath}/settings`, settings);
        return this.handleResponse(response);
    }

    async getAuditLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditLog>> {
        const response = await api.get<PaginatedResponse<AuditLog>>(`${this.basePath}/audit`, { params: filters });
        return this.handleResponse(response);
    }

    async getAuditLog(logId: string): Promise<AuditLog> {
        const response = await api.get<AuditLog>(`${this.basePath}/audit/${logId}`);
        return this.handleResponse(response);
    }

    async createAuditLog(event: SecurityEvent): Promise<AuditLog> {
        const response = await api.post<AuditLog>(`${this.basePath}/audit`, event);
        return this.handleResponse(response);
    }

    async getSecurityPolicies(): Promise<SecurityPolicy[]> {
        const response = await api.get<SecurityPolicy[]>(`${this.basePath}/policies`);
        return this.handleResponse(response);
    }

    async updateSecurityPolicy(policyId: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
        const response = await api.patch<SecurityPolicy>(`${this.basePath}/policies/${policyId}`, policy);
        return this.handleResponse(response);
    }

    async performRiskAssessment(context: Record<string, unknown>): Promise<RiskAssessment> {
        const response = await api.post<RiskAssessment>(`${this.basePath}/risk-assessment`, context);
        return this.handleResponse(response);
    }

    async logAccessAttempt(attempt: AccessAttempt): Promise<void> {
        await api.post(`${this.basePath}/access-attempts`, attempt);
    }

    async getRecentAccessAttempts(userId?: string): Promise<AccessAttempt[]> {
        const response = await api.get<AccessAttempt[]>(`${this.basePath}/access-attempts`, {
            params: { userId }
        });
        return this.handleResponse(response);
    }

    async createSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert> {
        const response = await api.post<SecurityAlert>(`${this.basePath}/alerts`, alert);
        return this.handleResponse(response);
    }

    async getActiveAlerts(): Promise<SecurityAlert[]> {
        const response = await api.get<SecurityAlert[]>(`${this.basePath}/alerts/active`);
        return this.handleResponse(response);
    }

    async dismissAlert(alertId: string, resolution: string): Promise<void> {
        await api.post(`${this.basePath}/alerts/${alertId}/dismiss`, { resolution });
    }

    async getSecurityMetrics(timeframe: 'day' | 'week' | 'month'): Promise<Record<string, number>> {
        const response = await api.get<Record<string, number>>(`${this.basePath}/metrics`, {
            params: { timeframe }
        });
        return this.handleResponse(response);
    }
}
