import {
    ReportType,
    ReportData,
    ReportFilters,
    ExportOptions,
    AuditRecord,
    TransactionRecord,
    UserRecord
} from '@/../../types/report.types';
import {
    BaseReportArguments,
    ExportReportArguments,
    ScheduleReportArguments,
    ReportRunRequest,
    ReportResponse
} from '@/../../types/report-api.types';
import { PaginatedResponse } from '@/../../types/common.types';
import { BaseMockService } from '@/BaseMockService';
import { mockReportData } from '@/data/report/reports';

export class MockReportService extends BaseMockService {
    private reports: Map<string, ReportData> = new Map();
    private reportTypes: ReportType[] = ['all', 'login', 'payments', 'system'];
    private exportOptions: ExportOptions = {
        format: 'csv',
        includeHeaders: true,
        dateFormat: 'YYYY-MM-DD'
    };

    constructor(basePath: string = '/api/v1/reports') {
        super(basePath);
        this.initializeData();
    }

    private initializeData(): void {
        // Initialize with mock data
        mockReportData.forEach(report => {
            const id = Math.random().toString(36).substring(7);
            this.reports.set(id, report);
        });
    }

    async runReport(request: ReportRunRequest): Promise<ReportResponse<ReportData>> {
        await this.delay();
        const reportId = Math.random().toString(36).substring(7);
        const report = {
            ...mockReportData[0]
        };
        this.reports.set(reportId, report);
        
        return {
            data: report,
            status: 'completed',
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
        };
    }

    async getReport(reportId: string): Promise<ReportData> {
        await this.delay();
        const report = this.reports.get(reportId);
        if (!report) {
            throw this.createError(`Report not found: ${reportId}`);
        }
        return report;
    }

    async searchReports(filters: ReportFilters): Promise<PaginatedResponse<ReportData>> {
        await this.delay();
        const reports = Array.from(this.reports.values());
        return {
            items: reports,
            total: reports.length,
            page: 1,
            limit: 10,
            totalPages: 1
        };
    }

    async scheduleReport(request: ReportRunRequest<ScheduleReportArguments>): Promise<string> {
        await this.delay();
        return Math.random().toString(36).substring(7);
    }

    async cancelScheduledReport(reportId: string): Promise<void> {
        await this.delay();
        // No-op in mock
    }

    async exportReport(request: ReportRunRequest<ExportReportArguments>): Promise<string> {
        await this.delay();
        return 'https://mock-export-url.com/report.pdf';
    }

    async getAuditRecords(filters: ReportFilters): Promise<PaginatedResponse<AuditRecord>> {
        await this.delay();
        return {
            items: mockReportData[0].audit,
            total: mockReportData[0].audit.length,
            page: 1,
            limit: 10,
            totalPages: 1
        };
    }

    async getTransactionRecords(filters: ReportFilters): Promise<PaginatedResponse<TransactionRecord>> {
        await this.delay();
        return {
            items: mockReportData[0].transactions,
            total: mockReportData[0].transactions.length,
            page: 1,
            limit: 10,
            totalPages: 1
        };
    }

    async getUserRecords(filters: ReportFilters): Promise<PaginatedResponse<UserRecord>> {
        await this.delay();
        return {
            items: mockReportData[0].users,
            total: mockReportData[0].users.length,
            page: 1,
            limit: 10,
            totalPages: 1
        };
    }

    async getReportTypes(): Promise<ReportType[]> {
        await this.delay();
        return this.reportTypes;
    }

    async getExportOptions(): Promise<ExportOptions> {
        await this.delay();
        return this.exportOptions;
    }

    async validateReportArgs(args: BaseReportArguments): Promise<boolean> {
        await this.delay();
        return true;
    }

    async getReportErrors(reportId: string): Promise<string[]> {
        await this.delay();
        return [];
    }
}
