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
import { BaseMockService } from './BaseMockService';
import { mockReportData } from './data/report/reports';

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




        // Initialize with mock data

            ...mockReportData[0]
        




        // No-op in mock








