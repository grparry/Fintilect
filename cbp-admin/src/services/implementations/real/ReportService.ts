import { IReportService } from '../../interfaces/IReportService';
import {
    ReportType,
    ReportData,
    ReportFilters,
    ExportOptions,
    AuditRecord,
    TransactionRecord,
    UserRecord
} from '../../../types/report.types';
import {
    BaseReportArguments,
    ExportReportArguments,
    ScheduleReportArguments,
    ReportRunRequest,
    ReportResponse
} from '../../../types/report-api.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';

export class ReportService extends BaseService implements IReportService {
    constructor() {
        super('/api/v1/reports');
    }

    async runReport(request: ReportRunRequest): Promise<ReportResponse<ReportData>> {
        return this.post('/run', request);
    }

    async getReport(reportId: string): Promise<ReportData> {
        return this.get(`/${reportId}`);
    }

    async searchReports(filters: ReportFilters): Promise<PaginatedResponse<ReportData>> {
        return this.get('/search', filters);
    }

    async scheduleReport(request: ReportRunRequest<ScheduleReportArguments>): Promise<string> {
        const response = await this.post<{ id: string }>('/schedule', request);
        return response.id;
    }

    async cancelScheduledReport(reportId: string): Promise<void> {
        await this.delete(`/schedule/${reportId}`);
    }

    async exportReport(request: ReportRunRequest<ExportReportArguments>): Promise<string> {
        const response = await this.post<{ url: string }>('/export', request);
        return response.url;
    }

    async getAuditRecords(filters: ReportFilters): Promise<PaginatedResponse<AuditRecord>> {
        return this.get('/audit', filters);
    }

    async getTransactionRecords(filters: ReportFilters): Promise<PaginatedResponse<TransactionRecord>> {
        return this.get('/transactions', filters);
    }

    async getUserRecords(filters: ReportFilters): Promise<PaginatedResponse<UserRecord>> {
        return this.get('/users', filters);
    }

    async getReportTypes(): Promise<ReportType[]> {
        return this.get('/types');
    }

    async getExportOptions(): Promise<ExportOptions> {
        return this.get('/export-options');
    }

    async validateReportArgs(args: BaseReportArguments): Promise<boolean> {
        const response = await this.post<{ isValid: boolean }>('/validate', args);
        return response.isValid;
    }

    async getReportErrors(reportId: string): Promise<string[]> {
        return this.get(`/${reportId}/errors`);
    }
}
