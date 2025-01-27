import { IAuditService, AuditEvent, AuditLogFilters } from '../interfaces/IAuditService';
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




        // Convert audit logs to audit events


            ...event,



        // Apply filters
            );

            );

                (event.metadata?.userEmail as string)?.toLowerCase().includes(searchTerm)
            );

            );

            );

        // Apply pagination



        // Mock export URL

    // Helper methods for testing
    _clearEvents(): void {

    _setEvents(events: AuditEvent[]): void {
