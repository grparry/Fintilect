import { http, HttpResponse } from 'msw';
import dayjs from 'dayjs';
import { 
  ReportRunRequest, 
  BaseReportArguments,
  ExportReportArguments 
} from '../../types/report-api.types';

export const reportHandlers = [
  // Main report endpoint
  http.post('*/api/v1/report/run', async ({ request }) => {
    const req = await request.json() as ReportRunRequest<BaseReportArguments>;
    const { startDate, endDate, reportType, searchTerm } = req.arguments;

    console.log('MSW Report Handler - Raw Request:', {
      name: req.name,
      arguments: req.arguments
    });

    // Generate mock data based on report type
    const mockData = {
      audit: [
        {
          id: 1,
          timestamp: '2024-12-26T10:00:00Z',
          user: 'john.doe',
          action: 'LOGIN',
          details: 'User logged in successfully'
        },
        {
          id: 2,
          timestamp: '2024-12-26T11:00:00Z',
          user: 'jane.smith',
          action: 'PAYMENT_APPROVED',
          details: 'Payment #12345 approved'
        }
      ],
      transactions: [
        {
          id: 1,
          date: '2024-12-26T10:30:00Z',
          amount: 1000.00,
          type: 'ACH',
          status: 'COMPLETED',
          recipient: 'Electric Company'
        },
        {
          id: 2,
          date: '2024-12-26T11:30:00Z',
          amount: 500.00,
          type: 'ACH',
          status: 'PENDING',
          recipient: 'Water Utility'
        }
      ],
      users: [
        {
          id: 1,
          username: 'john.doe',
          lastLogin: '2024-12-26T10:00:00Z',
          status: 'ACTIVE',
          role: 'ADMIN'
        },
        {
          id: 2,
          username: 'jane.smith',
          lastLogin: '2024-12-26T11:00:00Z',
          status: 'ACTIVE',
          role: 'USER'
        }
      ]
    };

    // Filter data based on report type
    let filteredData = { ...mockData };
    if (reportType !== 'all') {
      if (reportType === 'login') {
        filteredData = { audit: mockData.audit.filter(a => a.action === 'LOGIN'), transactions: [], users: [] };
      } else if (reportType === 'payments') {
        filteredData = { audit: mockData.audit.filter(a => a.action.includes('PAYMENT')), transactions: mockData.transactions, users: [] };
      } else if (reportType === 'system') {
        filteredData = { audit: mockData.audit.filter(a => !a.action.includes('PAYMENT') && a.action !== 'LOGIN'), transactions: [], users: [] };
      }
    }

    // Filter by date range
    if (startDate) {
      const startDateObj = dayjs(startDate).startOf('day');
      filteredData.audit = filteredData.audit.filter(a => dayjs(a.timestamp).isAfter(startDateObj) || dayjs(a.timestamp).isSame(startDateObj));
      filteredData.transactions = filteredData.transactions.filter(t => dayjs(t.date).isAfter(startDateObj) || dayjs(t.date).isSame(startDateObj));
      filteredData.users = filteredData.users.filter(u => dayjs(u.lastLogin).isAfter(startDateObj) || dayjs(u.lastLogin).isSame(startDateObj));
    }

    if (endDate) {
      const endDateObj = dayjs(endDate).endOf('day');
      filteredData.audit = filteredData.audit.filter(a => dayjs(a.timestamp).isBefore(endDateObj) || dayjs(a.timestamp).isSame(endDateObj));
      filteredData.transactions = filteredData.transactions.filter(t => dayjs(t.date).isBefore(endDateObj) || dayjs(t.date).isSame(endDateObj));
      filteredData.users = filteredData.users.filter(u => dayjs(u.lastLogin).isBefore(endDateObj) || dayjs(u.lastLogin).isSame(endDateObj));
    }

    // Filter by search term
    if (searchTerm) {
      filteredData.audit = filteredData.audit.filter(a =>
        a.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      filteredData.transactions = filteredData.transactions.filter(t =>
        t.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      filteredData.users = filteredData.users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log('MSW Report Handler - Filtered Data:', filteredData);

    return HttpResponse.json({ data: { data: filteredData } });
  }),

  // Export endpoint
  http.post('*/api/v1/report/export', async ({ request }) => {
    const req = await request.json() as ReportRunRequest<ExportReportArguments>;
    const { format } = req.arguments;
    
    // Mock export data
    const mockExportData = 'Date,Type,Amount\n2024-12-26,Payment,1000.00';
    
    return new HttpResponse(mockExportData, {
      headers: {
        'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
        'Content-Disposition': `attachment; filename=report.${format}`
      }
    });
  })
];
