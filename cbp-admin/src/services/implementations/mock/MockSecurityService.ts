import { ISecurityService } from '@/../interfaces/ISecurityService';
import { 
    SecuritySettings,
    SecurityPolicy,
    AuditLog,
    SecurityEvent,
    RiskAssessment,
    AccessAttempt,
    SecurityAlert,
    AuditLogFilters
} from '@/../../types/security.types';
import { PaginatedResponse } from '@/../../types/common.types';
import { 
    mockSecuritySettings,
    mockSecurityAuditLog,
    mockSecurityAlerts,
    mockSecurityMetrics
} from '@/data/security/mockSecurityData';
import { v4 as uuidv4 } from 'uuid';
import { BaseMockService } from '@/BaseMockService';

export class MockSecurityService extends BaseMockService implements ISecurityService {
    constructor(basePath: string = '/api/v1/security') {
        super(basePath);
    }

    private settings: SecuritySettings = { ...mockSecuritySettings };
    private policies: SecurityPolicy[] = [];
    private auditLogs: AuditLog[] = [...mockSecurityAuditLog];
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
        if (filters.actions?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.actions!.includes(log.eventType)
            );
        }
        if (filters.userIds?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.userIds!.includes(log.userId)
            );
        }
        if (filters.resourceTypes?.length) {
            filteredLogs = filteredLogs.filter(log => 
                filters.resourceTypes!.includes(log.resourceType)
            );
        }
        if (filters.status) {
            filteredLogs = filteredLogs.filter(log => 
                log.status === filters.status
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
        const log: AuditLog = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            eventType: event.type,
            action: event.type,
            userId: '',
            userEmail: '',  
            userAgent: 'Mock User Agent',
            ipAddress: '127.0.0.1',
            resourceType: event.resource?.type || '',
            resourceId: event.resource?.id || '',
            details: event.context || {},
            status: 'success',
            riskLevel: 'low'
        };
        this.auditLogs.push(log);
        return log;
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
        return attempts.filter(a => a.status === 'success' || a.status === 'failure').slice(0, 10);
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
        const now = new Date();
        let startDate = new Date();
        
        switch (timeframe) {
            case 'day':
                startDate.setDate(now.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
        }

        const filteredLogs = this.auditLogs.filter(log => 
            new Date(log.timestamp) >= startDate
        );

        const filteredAttempts = this.accessAttempts.filter(attempt => 
            new Date(attempt.timestamp) >= startDate
        );

        return {
            totalEvents: filteredLogs.length,
            totalAlerts: this.alerts.filter(a => new Date(a.timestamp) >= startDate).length,
            activeAlerts: this.alerts.filter(a => a.status === 'active' && new Date(a.timestamp) >= startDate).length,
            failedLogins: filteredAttempts.filter(a => a.status === 'failure').length,
            successfulLogins: filteredAttempts.filter(a => a.status === 'success').length
        };
    }
}
