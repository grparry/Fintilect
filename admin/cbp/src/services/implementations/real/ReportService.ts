import { IReportService } from '../../interfaces/IReportService';
import { ReportResponse } from '../../../types/report.types';
import { BaseService } from './BaseService';

export class ReportService extends BaseService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async runReport(name: string, args: string): Promise<ReportResponse> {
        return this.post<ReportResponse>('/run', { name, arguments: args });
    }
}