import { 
    Exception,
    ExceptionFilter,
    ExceptionStatus,
    UpdateExceptionRequest,
    ExceptionListResponse,
    ExceptionCorrectionType
} from '../../../types/exception.types';
import { PaginatedResponse } from '../../../types/common.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { BaseService } from './BaseService';

export class ExceptionService extends BaseService implements IExceptionService {
    constructor(basePath: string = '/api/v1/Exception') {
        super(basePath);
    }

    async getExceptions(filters?: ExceptionFilter): Promise<ExceptionListResponse> {
        // Ensure we have at least one search parameter
        const searchRequest: Record<string, any> = {};
        
        // Convert filter properties to the exact parameter names expected by the API
        if (filters) {
            if (filters.date) {
                searchRequest.Date = filters.date;
            }
            if (filters.endDate) {
                searchRequest.EndDate = filters.endDate;
            }
            if (filters.sponsorIds && filters.sponsorIds.length > 0) {
                searchRequest.SponsorIds = filters.sponsorIds;
            }
            if (filters.correctionMade !== undefined) {
                searchRequest.CorrectionMade = filters.correctionMade;
            }
        }
        
        // If no filters were provided, use a default date range of the last 30 days
        if (Object.keys(searchRequest).length === 0) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            
            searchRequest.Date = startDate.toISOString();
            searchRequest.EndDate = endDate.toISOString();
        }
        
        return this.post<ExceptionListResponse>('/search', searchRequest);
    }

    async getException(exceptionId: string): Promise<Exception> {
        return this.get<Exception>(`/${exceptionId}`);
    }

    async updateExceptionStatus(
        exceptionId: string,
        status: ExceptionStatus,
        notes?: string
    ): Promise<void> {
        const updateRequest: UpdateExceptionRequest = { 
            status, 
            ...(notes ? { resolution: notes } : {})
        };
        await this.put<void>(`/${exceptionId}/status`, updateRequest);
    }

    async updateExceptionPriority(
        exceptionId: string,
        priority: string
    ): Promise<void> {
        await this.put<void>('', { id: exceptionId, priority });
    }

    async getExceptionSummary(): Promise<{
        totalCount: number;
        byStatus: Record<ExceptionStatus, number>;
        byCategory: Record<string, number>;
        bySeverity: Record<string, number>;
        avgResolutionTime: number;
    }> {
        return this.get('/summary');
    }

    async assignException(exceptionId: string, userId: string): Promise<void> {
        const updateRequest: UpdateExceptionRequest = { 
            assignedTo: userId 
        };
        await this.put<void>('', { id: exceptionId, ...updateRequest });
    }

    async bulkUpdateExceptions(
        exceptionIds: string[],
        updates: {
            status?: ExceptionStatus;
            priority?: string;
            assignedTo?: string;
        }
    ): Promise<void> {
        await this.post<void>('/bulk/update', { exceptionIds, updates });
    }

    async getExceptionAuditTrail(exceptionId: string): Promise<Array<{
        action: string;
        performedBy: string;
        timestamp: string;
        details: Record<string, unknown>;
    }>> {
        return this.get(`/${exceptionId}/audit`);
    }

    async addExceptionNote(
        exceptionId: string,
        note: string,
        userId: string
    ): Promise<void> {
        await this.post<void>(`/${exceptionId}/notes`, { note, userId });
    }

    async getExceptionNotes(exceptionId: string): Promise<Array<{
        id: string;
        content: string;
        createdBy: string;
        createdAt: string;
    }>> {
        return this.get(`/${exceptionId}/notes`);
    }

    async resolveException(exceptionId: string, resolution: string): Promise<void> {
        const updateRequest: UpdateExceptionRequest = { 
            status: ExceptionStatus.RESOLVED,
            resolution
        };
        await this.put<void>('', { id: exceptionId, ...updateRequest });
    }

    async updateExceptionCorrection(
        exceptionId: string, 
        correctionType: ExceptionCorrectionType, 
        correctionData: {
            usersAccountAtPayee?: string;
            manualDescription?: string;
            fisPayeeId?: string;
        }
    ): Promise<void> {
        const updateRequest = {
            id: parseInt(exceptionId, 10),
            correctionType,
            ...correctionData
        };
        
        await this.put<void>('', updateRequest);
    }
}