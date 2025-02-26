import { ReportResponse } from '../../../../../types/report.types';

export const mockReportData: ReportResponse = {
    jsonResponse: JSON.stringify({
        message: 'Mock report data',
        data: {
            items: [
                { id: 1, name: 'Item 1', value: 100 },
                { id: 2, name: 'Item 2', value: 200 },
                { id: 3, name: 'Item 3', value: 300 }
            ]
        }
    })
};