import { IAuditService, AuditEvent, AuditLogFilters } from '../../interfaces/IAuditService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class AuditService extends BaseService implements IAuditService {
    constructor(basePath: string = '/api/v1/audit') {
        super(basePath);
    }
    async logEvent(event: AuditEvent): Promise<void> {
        try {
            await this.post<void>('/events', {
                ...event,
                timestamp: event.timestamp || new Date().toISOString(),
            });
        } catch (error) {
            logger.error(`Error logging audit event: ${error}`);
            throw error;
        }
    }
    async getEvents(resourceId: string): Promise<AuditEvent[]> {
        try {
            return await this.get<AuditEvent[]>(`/events/${resourceId}`);
        } catch (error) {
            logger.error(`Error getting audit events: ${error}`);
            throw error;
        }
    }
    async searchLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditEvent>> {
        try {
            return await this.get<PaginatedResponse<AuditEvent>>('/search', filters);
        } catch (error) {
            logger.error(`Error searching audit logs: ${error}`);
            throw error;
        }
    }
    async getEventDetails(eventId: string): Promise<AuditEvent> {
        try {
            return await this.get<AuditEvent>(`/events/details/${eventId}`);
        } catch (error) {
            logger.error(`Error getting audit event details: ${error}`);
            throw error;
        }
    }
    async exportLogs(filters: AuditLogFilters): Promise<string> {
        try {
            return await this.get<string>('/export', filters);
        } catch (error) {
            logger.error(`Error exporting audit logs: ${error}`);
            throw error;
        }
    }
}