import { IBaseService } from '../interfaces/IBaseService';
import { IUserService } from '../interfaces/IUserService';
import { IClientService } from '../interfaces/IClientService';
import { IBillPayService } from '../interfaces/IBillPayService';
import { IAuthService } from '../interfaces/IAuthService';
import { ISecurityService } from '../interfaces/ISecurityService';
import { INotificationService } from '../interfaces/INotificationService';
import { IExceptionService } from '../interfaces/IExceptionService';
import { IFISExceptionService } from '../interfaces/IFISExceptionService';
import { IGlobalPayeeService } from '../interfaces/IGlobalPayeeService';
import { IPayeeService } from '../interfaces/IPayeeService';
import { IPaymentProcessorService } from '../interfaces/IPaymentProcessorService';
import { IPaymentService } from '../interfaces/IPaymentService';
import { IReportService } from '../interfaces/IReportService';
import { ICalendarService } from '../interfaces/ICalendarService';
import { IPermissionService } from '../interfaces/IPermissionService';
import { IDashboardService } from '../interfaces/IDashboardService';
import { IConfigurationService } from '../interfaces/IConfigurationService';
import { IClientLoginSecurityService } from '../interfaces/IClientLoginSecurityService';
import { UserService } from '../implementations/real/UserService';
import { ClientService } from '../implementations/real/ClientService';
import { BillPayService } from '../implementations/real/BillPayService';
import { AuthService } from '../implementations/real/AuthService';
import { SecurityService } from '../implementations/real/SecurityService';
import { NotificationService } from '../implementations/real/NotificationService';
import { ExceptionService } from '../implementations/real/ExceptionService';
import { FISExceptionService } from '../implementations/real/FISExceptionService';
import { GlobalPayeeService } from '../implementations/real/GlobalPayeeService';
import { PayeeService } from '../implementations/real/PayeeService';
import { PaymentProcessorService } from '../implementations/real/PaymentProcessorService';
import { PaymentService } from '../implementations/real/PaymentService';
import { ReportService } from '../implementations/real/ReportService';
import { PermissionService } from '../implementations/real/PermissionService';
import { DashboardService } from '../implementations/real/DashboardService';
import { ConfigurationService } from '../implementations/real/ConfigurationService';
import { ClientLoginSecurityService } from '../implementations/real/ClientLoginSecurityService';
import { CalendarService } from '../implementations/real/CalendarService';
import { MockUserService } from '../implementations/mock/MockUserService';
import { MockClientService } from '../implementations/mock/MockClientService';
import { MockBillPayService } from '../implementations/mock/MockBillPayService';
import { MockAuthService } from '../implementations/mock/MockAuthService';
import { MockSecurityService } from '../implementations/mock/MockSecurityService';
import { MockNotificationService } from '../implementations/mock/MockNotificationService';
import { MockExceptionService } from '../implementations/mock/MockExceptionService';
import { MockFISExceptionService } from '../implementations/mock/FISExceptionService';
import { MockGlobalPayeeService } from '../implementations/mock/MockGlobalPayeeService';
import { MockPayeeService } from '../implementations/mock/MockPayeeService';
import { MockPaymentProcessorService } from '../implementations/mock/MockPaymentProcessorService';
import { MockPaymentService } from '../implementations/mock/MockPaymentService';
import { MockReportService } from '../implementations/mock/MockReportService';
import { MockCalendarService } from '../implementations/mock/MockCalendarService';
import { MockPermissionService } from '../implementations/mock/MockPermissionService';
import { MockDashboardService } from '../implementations/mock/MockDashboardService';
import { MockConfigurationService } from '../implementations/mock/MockConfigurationService';
import { MockClientLoginSecurityService } from '../implementations/mock/MockClientLoginSecurityService';
import { shouldUseMockService, API_CONFIG } from '../../config/api.config';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instance: ServiceFactory;

  private constructor() {
    console.log('ServiceFactory initialized - services will be created on demand');
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  static getAdminEndpoint(path: string): string {
    return `${API_CONFIG.urls.admin()}${path}`;
  }

  static getAdminCuEndpoint(path: string): string {
    return `${API_CONFIG.urls.adminCu()}${path}`;
  }

  getUserService(): IUserService {
    console.log('[ServiceFactory] Creating UserService instance');
    return shouldUseMockService('user')
      ? new MockUserService(ServiceFactory.getAdminEndpoint('/api'))
      : new UserService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getClientService(): IClientService {
    console.log('[ServiceFactory] Creating ClientService instance');
    return shouldUseMockService('client')
      ? new MockClientService(ServiceFactory.getAdminEndpoint('/api'))
      : new ClientService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getBillPayService(): IBillPayService {
    console.log('[ServiceFactory] Creating BillPayService instance');
    return shouldUseMockService('billPay')
      ? new MockBillPayService(ServiceFactory.getAdminEndpoint('/api'))
      : new BillPayService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getAuthService(): IAuthService {
    console.log('[ServiceFactory] Creating AuthService instance');
    return shouldUseMockService('auth')
      ? new MockAuthService(ServiceFactory.getAdminEndpoint('/api'))
      : new AuthService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getSecurityService(): ISecurityService {
    console.log('[ServiceFactory] Creating SecurityService instance');
    return shouldUseMockService('security')
      ? new MockSecurityService(ServiceFactory.getAdminEndpoint('/api'))
      : new SecurityService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getNotificationService(): INotificationService {
    console.log('[ServiceFactory] Creating NotificationService instance');
    return shouldUseMockService('notification')
      ? new MockNotificationService(ServiceFactory.getAdminEndpoint('/notifications'))
      : new NotificationService(ServiceFactory.getAdminCuEndpoint('/api/v1/Notification'));
  }

  getExceptionService(): IExceptionService {
    console.log('[ServiceFactory] Creating ExceptionService instance');
    return shouldUseMockService('exception')
      ? new MockExceptionService(ServiceFactory.getAdminEndpoint('/api'))
      : new ExceptionService(ServiceFactory.getAdminEndpoint('/api/v1/Exception'));
  }

  getFISExceptionService(): IFISExceptionService {
    console.log('[ServiceFactory] Creating FISExceptionService instance');
    return shouldUseMockService('fisException')
      ? new MockFISExceptionService(ServiceFactory.getAdminEndpoint('/api'))
      : new FISExceptionService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getGlobalPayeeService(): IGlobalPayeeService {
    console.log('[ServiceFactory] Creating GlobalPayeeService instance');
    return shouldUseMockService('globalPayee')
      ? new MockGlobalPayeeService(ServiceFactory.getAdminEndpoint('/api'))
      : new GlobalPayeeService(ServiceFactory.getAdminEndpoint('/api/v1/Payee'));
  }

  getPayeeService(): IPayeeService {
    console.log('[ServiceFactory] Creating PayeeService instance');
    return shouldUseMockService('payee')
      ? new MockPayeeService(ServiceFactory.getAdminEndpoint('/payees'))
      : new PayeeService(ServiceFactory.getAdminCuEndpoint('/api/v1/Payee'));
  }

  getPaymentProcessorService(): IPaymentProcessorService {
    console.log('[ServiceFactory] Creating PaymentProcessorService instance');
    return shouldUseMockService('paymentProcessor')
      ? new MockPaymentProcessorService(ServiceFactory.getAdminEndpoint('/api'))
      : new PaymentProcessorService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getPaymentService(): IPaymentService {
    console.log('[ServiceFactory] Creating PaymentService instance');
    return shouldUseMockService('payment')
      ? new MockPaymentService(ServiceFactory.getAdminEndpoint('/payments'))
      : new PaymentService(ServiceFactory.getAdminCuEndpoint('/api/v1/Payment'));
  }

  getReportService(): IReportService {
    console.log('[ServiceFactory] Creating ReportService instance');
    return shouldUseMockService('report')
      ? new MockReportService(ServiceFactory.getAdminEndpoint('/reports'))
      : new ReportService(ServiceFactory.getAdminCuEndpoint('/api/v1/Report'));
  }

  getCalendarService(): ICalendarService {
    console.log('[ServiceFactory] Creating CalendarService instance with URL:', ServiceFactory.getAdminCuEndpoint('/api/v1/Calendar'));
    return shouldUseMockService('calendar')
      ? new MockCalendarService(ServiceFactory.getAdminCuEndpoint('/api/v1/Calendar'))
      : new CalendarService(ServiceFactory.getAdminCuEndpoint('/api/v1/Calendar'));
  }

  getPermissionService(): IPermissionService {
    console.log('[ServiceFactory] Creating PermissionService instance');
    return shouldUseMockService('permission')
      ? new MockPermissionService(ServiceFactory.getAdminEndpoint('/api'))
      : new PermissionService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getDashboardService(): IDashboardService {
    console.log('[ServiceFactory] Creating DashboardService instance');
    return shouldUseMockService('dashboard')
      ? new MockDashboardService(ServiceFactory.getAdminEndpoint('/api'))
      : new DashboardService(ServiceFactory.getAdminEndpoint('/api'));
  }

  getConfigurationService(): IConfigurationService {
    console.log('[ServiceFactory] Creating ConfigurationService instance');
    return shouldUseMockService('configuration')
      ? new MockConfigurationService()
      : new ConfigurationService();
  }

  getClientLoginSecurityService(): IClientLoginSecurityService {
    console.log('[ServiceFactory] Creating ClientLoginSecurityService instance');
    return shouldUseMockService('clientLoginSecurity')
      ? new MockClientLoginSecurityService(ServiceFactory.getAdminEndpoint('/api'))
      : new ClientLoginSecurityService(ServiceFactory.getAdminEndpoint('/api'));
  }
}

// Export service instances
export const userService = ServiceFactory.getInstance().getUserService();
export const clientService = ServiceFactory.getInstance().getClientService();
export const billPayService = ServiceFactory.getInstance().getBillPayService();
export const authService = ServiceFactory.getInstance().getAuthService();
export const securityService = ServiceFactory.getInstance().getSecurityService();
export const clientLoginSecurityService = ServiceFactory.getInstance().getClientLoginSecurityService();
export const notificationService = ServiceFactory.getInstance().getNotificationService();
export const exceptionService = ServiceFactory.getInstance().getExceptionService();
export const fisExceptionService = ServiceFactory.getInstance().getFISExceptionService();
export const globalPayeeService = ServiceFactory.getInstance().getGlobalPayeeService();
export const payeeService = ServiceFactory.getInstance().getPayeeService();
export const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
export const paymentService = ServiceFactory.getInstance().getPaymentService();
export const reportService = ServiceFactory.getInstance().getReportService();
export const calendarService = ServiceFactory.getInstance().getCalendarService();
export const permissionService = ServiceFactory.getInstance().getPermissionService();
export const dashboardService = ServiceFactory.getInstance().getDashboardService();
export const configurationService = ServiceFactory.getInstance().getConfigurationService();
