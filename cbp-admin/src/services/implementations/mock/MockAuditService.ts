import { IAuditService, AuditEvent, AuditLogFilters } from '../../interfaces/IAuditService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';

export class MockAuditService extends BaseMockService implements IAuditService {
    private events: AuditEvent[] = [];

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
            filteredEvents = filteredEvents.filter(event => 
                event.timestamp && event.timestamp >= filters.startDate!
            );
        }

        if (filters.endDate) {
            filteredEvents = filteredEvents.filter(event => 
                event.timestamp && event.timestamp <= filters.endDate!
            );
        }

        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filteredEvents = filteredEvents.filter(event =>
                event.eventType.toLowerCase().includes(searchTerm) ||
                event.resourceType.toLowerCase().includes(searchTerm)
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
