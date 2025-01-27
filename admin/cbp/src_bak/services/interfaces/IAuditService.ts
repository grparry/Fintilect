import { IBaseService } from './IBaseService';
import { PaginatedResponse } from '../../types/common.types';

export interface AuditEvent {
    eventType: string;
    resourceId: string;
    resourceType: string;
    status: 'INITIATED' | 'COMPLETED' | 'ERROR' | 'RECEIVED' | 'PROCESSED';
    metadata?: Record<string, any>;
    timestamp?: string;
}

export interface AuditLogFilters {
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
    page?: number;
    pageSize?: number;
    resourceType?: string;
    status?: string;
}

/**




/**
 * Interface for audit logging operations
 * Handles event logging, retrieval, and audit trail management
 */
    /**
     * Log an audit event
     * @param event Event details to log
     */

    /**
     * Get audit events for a specific resource
     * @param resourceId Resource identifier
     * @returns List of audit events
     */

    /**
     * Search audit logs with filtering and pagination
     * @param filters Search filters
     * @returns Paginated list of audit events
     */

    /**
     * Get audit event details
     * @param eventId Event identifier
     * @returns Audit event details
     */

    /**
     * Export audit logs based on filters
     * @param filters Export filters
     * @returns URL to download exported logs
     */
