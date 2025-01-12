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
import { 
    mockSecuritySettings,
    mockSecurityAuditLog,
    mockSecurityAlerts,
    mockSecurityMetrics
} from './data/security/mockSecurityData';
import { v4 as uuidv4 } from 'uuid';

export class MockSecurityService implements ISecurityService {
    basePath = '/api/security';
    private settings: SecuritySettings = { ...mockSecuritySettings };
    private policies: SecurityPolicy[] = [];
    private auditLogs: AuditLog[] = [];
    private accessAttempts: AccessAttempt[] = [];
    private alerts: SecurityAlert[] = [...mockSecurityAlerts];

    async getSecuritySettings(): Promise<SecuritySettings> {
        return this.settings;
    }

    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        this.settings = {
            ...this.settings,
            ...settings
        };
        return this.settings;
    }

    async getAuditLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditLog>> {
        let filteredLogs = [...this.auditLogs];

        // Apply filters
        if (filters.startDate) {
            filteredLogs = filteredLogs.filter(log => 
                new Date(log.timestamp) >= new Date(filters.startDate!)
            );
        }
        if (filters.endDate) {
            filteredLogs = filteredLogs.filter(log => 
                new Date(log.timestamp) <= new Date(filters.endDate!)
            );
        }
        if (filters.eventTypes?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.eventTypes!.includes(log.eventType)
            );
        }
        if (filters.userIds?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.userIds!.includes(log.userId)
            );
        }
        if (filters.riskLevels?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.riskLevels!.includes(log.riskLevel)
            );
        }

        // Apply pagination
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

        return {
            items: paginatedLogs,
            total: filteredLogs.length,
            page,
            limit,
            totalPages: Math.ceil(filteredLogs.length / limit)
        };
    }

    async getAuditLog(logId: string): Promise<AuditLog> {
        const log = this.auditLogs.find(l => l.id === logId);
        if (!log) {
            throw new Error('Audit log not found');
        }
        return log;
    }

    async createAuditLog(event: SecurityEvent): Promise<AuditLog> {
        const newLog: AuditLog = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            eventType: event.type,
            userId: event.user?.id || 'unknown',
            userAgent: 'Mock User Agent',
            ipAddress: '127.0.0.1',
            resourceType: event.resource?.type || 'unknown',
            resourceId: event.resource?.id || 'unknown',
            action: event.type,
            status: 'success',
            details: event.context,
            riskLevel: event.severity
        };

        this.auditLogs.unshift(newLog);
        return newLog;
    }

    async getSecurityPolicies(): Promise<SecurityPolicy[]> {
        return this.policies;
    }

    async updateSecurityPolicy(policyId: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
        const index = this.policies.findIndex(p => p.id === policyId);
        if (index === -1) {
            throw new Error('Security policy not found');
        }

        this.policies[index] = {
            ...this.policies[index],
            ...policy,
            lastUpdated: new Date().toISOString()
        };

        return this.policies[index];
    }

    async performRiskAssessment(context: Record<string, unknown>): Promise<RiskAssessment> {
        // Simple mock risk assessment logic
        const score = Math.random() * 100;
        return {
            score,
            level: score > 75 ? 'critical' :
                   score > 50 ? 'high' :
                   score > 25 ? 'medium' : 'low',
            factors: [
                {
                    name: 'IP Risk',
                    score: Math.random() * 100,
                    details: 'Based on IP reputation'
                },
                {
                    name: 'User Behavior',
                    score: Math.random() * 100,
                    details: 'Based on user activity patterns'
                }
            ],
            recommendations: [
                'Enable MFA',
                'Review access policies'
            ],
            timestamp: new Date().toISOString()
        };
    }

    async logAccessAttempt(attempt: AccessAttempt): Promise<void> {
        this.accessAttempts.unshift({
            ...attempt,
            id: uuidv4(),
            timestamp: new Date().toISOString()
        });
    }

    async getRecentAccessAttempts(userId?: string): Promise<AccessAttempt[]> {
        let attempts = [...this.accessAttempts];
        if (userId) {
            attempts = attempts.filter(a => a.userId === userId);
        }
        return attempts.slice(0, 10); // Return last 10 attempts
    }

    async createSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert> {
        const newAlert: SecurityAlert = {
            ...alert,
            id: uuidv4(),
            timestamp: new Date().toISOString()
        };

        this.alerts.unshift(newAlert);
        return newAlert;
    }

    async getActiveAlerts(): Promise<SecurityAlert[]> {
        return this.alerts.filter(a => a.status === 'active');
    }

    async dismissAlert(alertId: string, resolution: string): Promise<void> {
        const index = this.alerts.findIndex(a => a.id === alertId);
        if (index === -1) {
            throw new Error('Security alert not found');
        }

        this.alerts[index] = {
            ...this.alerts[index],
            status: 'dismissed',
            resolution
        };
    }

    async getSecurityMetrics(timeframe: 'day' | 'week' | 'month'): Promise<Record<string, number>> {
        // Mock metrics based on timeframe
        return {
            totalAlerts: this.alerts.length,
            activeAlerts: this.alerts.filter(a => a.status === 'active').length,
            failedLogins: this.accessAttempts.filter(a => a.status === 'failure').length,
            highRiskEvents: this.auditLogs.filter(l => l.riskLevel === 'high').length
        };
    }
}
