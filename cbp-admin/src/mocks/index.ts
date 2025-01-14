import { http, HttpResponse } from 'msw';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { QueryOptions } from '../types/index';
import { PermissionCategoryType } from '../types/permission.types';
import { DashboardFilters } from '../types/dashboard.types';
import { TimeRange } from '../types';
import { ExceptionFilters, FISExceptionStatus } from '../types/bill-pay.types';

// Get service instances from factory
const factory = ServiceFactory.getInstance();
const holidayService = factory.getHolidayService();
const clientService = factory.getClientService();
const userService = factory.getUserService();
const paymentService = factory.getPaymentProcessorService();
const reportService = factory.getReportService();
const securityService = factory.getSecurityService();
const notificationService = factory.getNotificationService();
const billPayService = factory.getBillPayService();
const permissionService = factory.getPermissionService();
const dashboardService = factory.getDashboardService();
const exceptionService = factory.getExceptionService();

// Export all handlers
export const handlers = [
    // Holiday endpoints
    http.get('/api/v1/holidays', async () => {
        const holidays = await holidayService.getHolidays();
        return HttpResponse.json(holidays);
    }),

    // Client endpoints
    http.get('/api/v1/clients', async () => {
        const clients = await clientService.getClients();
        return HttpResponse.json(clients);
    }),

    // User endpoints
    http.get('/api/v1/users', async ({ request }) => {
        const url = new URL(request.url);
        const queryOptions: QueryOptions = {
            pagination: {
                page: parseInt(url.searchParams.get('page') || '1'),
                limit: parseInt(url.searchParams.get('limit') || '10')
            }
        };
        const users = await userService.getUsers(queryOptions);
        return HttpResponse.json(users);
    }),

    // Payment endpoints
    http.get('/api/v1/payments', async ({ request }) => {
        const url = new URL(request.url);
        const queryOptions: QueryOptions = {
            pagination: {
                page: parseInt(url.searchParams.get('page') || '1'),
                limit: parseInt(url.searchParams.get('limit') || '10')
            }
        };
        const payments = await paymentService.getTransaction(url.searchParams.get('id') || '');
        return HttpResponse.json(payments);
    }),

    // Report endpoints
    http.get('/api/v1/reports/:reportId', async ({ params }) => {
        const reportId = params.reportId as string;
        const report = await reportService.getReport(reportId);
        return HttpResponse.json(report);
    }),

    // Security endpoints
    http.get('/api/v1/security/policies', async () => {
        const policies = await securityService.getSecurityPolicies();
        return HttpResponse.json(policies);
    }),

    // Notification endpoints
    http.get('/api/v1/notifications/types', async () => {
        const types = await notificationService.getNotificationTypes();
        return HttpResponse.json(types);
    }),

    // Bill Pay endpoints
    http.get('/api/v1/bill-pay/config', async () => {
        const config = await billPayService.getConfiguration();
        return HttpResponse.json(config);
    }),

    // Permission endpoints
    http.get('/api/v1/permissions', async ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get('category') as PermissionCategoryType;
        const permissions = await permissionService.getPermissions(category);
        return HttpResponse.json(permissions);
    }),

    // Dashboard endpoints
    http.get('/api/v1/dashboard/metrics', async () => {
        const filters: DashboardFilters = {
            timeRange: TimeRange.WEEK,
            category: undefined,
            status: undefined
        };
        const metrics = await dashboardService.getDashboardMetrics(filters);
        return HttpResponse.json(metrics);
    }),

    // Exception endpoints
    http.get('/api/v1/exceptions', async ({ request }) => {
        const url = new URL(request.url);
        const queryOptions: ExceptionFilters = {
            page: parseInt(url.searchParams.get('page') || '1'),
            limit: parseInt(url.searchParams.get('limit') || '10'),
            status: url.searchParams.get('status')?.split(',') as FISExceptionStatus[],
            startDate: url.searchParams.get('startDate') || undefined,
            endDate: url.searchParams.get('endDate') || undefined,
            sortBy: url.searchParams.get('sortBy') || undefined,
            sortOrder: url.searchParams.get('sortOrder') as 'asc' | 'desc' | undefined
        };
        const exceptions = await exceptionService.getExceptions(queryOptions);
        return HttpResponse.json(exceptions);
    })
];

export async function initMocks() {
    if (process.env.NODE_ENV === 'development') {
        console.log('MSW: Starting initialization');
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'bypass'
        });
        console.log('MSW: Initialized');
    }
}
