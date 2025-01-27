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
 * Interface for audit logging operations
 * Handles event logging, retrieval, and audit trail management
 */
export interface IAuditService extends IBaseService {
  /**
   * Log an audit event
   * @param event Event details to log
   */
  logEvent(event: AuditEvent): Promise<void>;

  /**
   * Get audit events for a specific resource
   * @param resourceId Resource identifier
   * @returns List of audit events
   */
  getEvents(resourceId: string): Promise<AuditEvent[]>;

  /**
   * Search audit logs with filtering and pagination
   * @param filters Search filters
   * @returns Paginated list of audit events
   */
  searchLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditEvent>>;

  /**
   * Get audit event details
   * @param eventId Event identifier
   * @returns Audit event details
   */
  getEventDetails(eventId: string): Promise<AuditEvent>;

  /**
   * Export audit logs based on filters
   * @param filters Export filters
   * @returns URL to download exported logs
   */
  exportLogs(filters: AuditLogFilters): Promise<string>;
}