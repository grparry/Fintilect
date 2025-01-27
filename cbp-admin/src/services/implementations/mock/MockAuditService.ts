import { IAuditService, AuditEvent, AuditLogFilters } from '../../interfaces/IAuditService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { mockAuditLogs } from './data/client/mockClientData';

export class MockAuditService extends BaseMockService implements IAuditService {
    private events: AuditEvent[] = [];

    constructor(basePath: string = '/api/v1/audit') {
        super(basePath);
        this.initializeEvents();
    }

    private initializeEvents(): void {
        // Convert audit logs to audit events
        this.events = mockAuditLogs.map(log => ({
            eventType: log.eventType,
            resourceId: log.resourceId,
            resourceType: log.resourceType,
            status: this.mapStatus(log.status),
            metadata: {
                userId: log.userId,
                userEmail: log.userEmail,
                userAgent: log.userAgent,
                ipAddress: log.ipAddress,
                action: log.action,
                riskLevel: log.riskLevel,
                details: log.details
            },
            timestamp: log.timestamp
        }));
    }

    private mapStatus(status: 'success' | 'failure'): 'COMPLETED' | 'ERROR' {
        return status === 'success' ? 'COMPLETED' : 'ERROR';
    }

    async logEvent(event: AuditEvent): Promise<void> {
        this.events.push({
            ...event,
            timestamp: event.timestamp || new Date().toISOString()
        });
    }

    async getEvents(resourceId: string): Promise<AuditEvent[]> {
        return this.events.filter(event => event.resourceId === resourceId);
    }

    async searchLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditEvent>> {
        let filteredEvents = [...this.events];

        // Apply filters
        if (filters.startDate) {
            const startDate = new Date(filters.startDate).getTime();
            filteredEvents = filteredEvents.filter(event => 
                event.timestamp && new Date(event.timestamp).getTime() >= startDate
            );
        }

        if (filters.endDate) {
            const endDate = new Date(filters.endDate).getTime();
            filteredEvents = filteredEvents.filter(event => 
                event.timestamp && new Date(event.timestamp).getTime() <= endDate
            );
        }

        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filteredEvents = filteredEvents.filter(event =>
                event.eventType.toLowerCase().includes(searchTerm) ||
                event.resourceType.toLowerCase().includes(searchTerm) ||
                (event.metadata?.userEmail as string)?.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.resourceType) {
            filteredEvents = filteredEvents.filter(event =>
                event.resourceType === filters.resourceType
            );
        }

        if (filters.status) {
            filteredEvents = filteredEvents.filter(event =>
                event.status === filters.status
            );
        }

        // Apply pagination
        const page = filters.page || 1;
        const pageSize = filters.pageSize || 10;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
            items: filteredEvents.slice(start, end),
            total: filteredEvents.length,
            page,
            limit: pageSize,
            totalPages: Math.ceil(filteredEvents.length / pageSize)
        };
    }

    async getEventDetails(eventId: string): Promise<AuditEvent> {
        const event = this.events.find(e => e.resourceId === eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    }

    async exportLogs(filters: AuditLogFilters): Promise<string> {
        // Mock export URL
        return 'https://mock-storage.example.com/audit-logs-export.csv';
    }

    // Helper methods for testing
    _clearEvents(): void {
        this.events = [];
    }

    _setEvents(events: AuditEvent[]): void {
        this.events = events;
    }
}
