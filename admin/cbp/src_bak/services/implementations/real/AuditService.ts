import { IAuditService, AuditEvent, AuditLogFilters } from '../interfaces/IAuditService';
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



                ...event,




