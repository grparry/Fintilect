import { IReportService } from '../../interfaces/IReportService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';
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

export class ReportService extends BaseService implements IReportService {
    constructor(basePath: string = '/api/v1/reports') {
        super(basePath);
    }
    async getReportTypes(): Promise<ReportType[]> {
        return this.get<ReportType[]>('/types');
    }
    async getReportData(type: ReportType, filters?: ReportFilters): Promise<ReportData> {
        return this.get<ReportData>(`/${type}`, { params: filters });
    }
    async exportReport(request: ReportRunRequest<ExportReportArguments>): Promise<string> {
        const response = await this.post<{ url: string }>(`/${request.arguments.reportType}/export`, request.arguments);
        return response.url;
    }
    async scheduleReport(request: ReportRunRequest<ScheduleReportArguments>): Promise<string> {
        const response = await this.post<{ id: string }>(`/${request.arguments.reportType}/schedule`, request.arguments);
        return response.id;
    }
    async runReport(request: ReportRunRequest<BaseReportArguments>): Promise<ReportResponse<ReportData>> {
        return this.post<ReportResponse<ReportData>>(`/${request.arguments.reportType}/run`, request);
    }
    async getAuditRecords(filters?: ReportFilters): Promise<PaginatedResponse<AuditRecord>> {
        return this.get<PaginatedResponse<AuditRecord>>('/audit', { params: filters });
    }
    async getTransactionRecords(filters?: ReportFilters): Promise<PaginatedResponse<TransactionRecord>> {
        return this.get<PaginatedResponse<TransactionRecord>>('/transactions', { params: filters });
    }
    async getUserRecords(filters?: ReportFilters): Promise<PaginatedResponse<UserRecord>> {
        return this.get<PaginatedResponse<UserRecord>>('/users', { params: filters });
    }
    async getReport(reportId: string): Promise<ReportData> {
        return this.get<ReportData>(`/${reportId}`);
    }
    async searchReports(filters: ReportFilters): Promise<PaginatedResponse<ReportData>> {
        return this.get<PaginatedResponse<ReportData>>('/search', { params: filters });
    }
    async cancelScheduledReport(reportId: string): Promise<void> {
        await this.delete(`/schedule/${reportId}`);
    }
    async getExportOptions(): Promise<ExportOptions> {
        return this.get<ExportOptions>('/export/options');
    }
    async getReportErrors(reportId: string): Promise<string[]> {
        return this.get<string[]>(`/${reportId}/errors`);
    }
    async validateReportArgs(args: BaseReportArguments): Promise<boolean> {
        try {
            await this.post('/validate', args);
            return true;
        } catch {
            return false;
        }
    }
}