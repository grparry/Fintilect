import { ReportResponse } from '../../../types/report.types';
import { IReportService } from '../../interfaces/IReportService';
import { BaseMockService } from './BaseMockService';

export class MockReportService extends BaseMockService implements IReportService {
    constructor(basePath: string = '/api/v1/Report') {
        super(basePath);
    }

    async runReport(name: string, args: string): Promise<ReportResponse> {
        await this.delay();
        return {
            jsonResponse: JSON.stringify({
                message: 'Mock report response',
                name,
                args: JSON.parse(args)
            })
        };
    }
}