import { IBaseService } from '../interfaces/IBaseService';
import { IUserService } from '../interfaces/IUserService';
import { IClientService } from '../interfaces/IClientService';
import { IBillPayService } from '../interfaces/IBillPayService';
import { IAuthService } from '../interfaces/IAuthService';
import { ISecurityService } from '../interfaces/ISecurityService';
import { INotificationService } from '../interfaces/INotificationService';
import { IExceptionService } from '../interfaces/IExceptionService';
import { IFISExceptionService } from '../interfaces/IFISExceptionService';
import { IPayeeService } from '../interfaces/IPayeeService';
import { IPaymentProcessorService } from '../interfaces/IPaymentProcessorService';
import { IPaymentService } from '../interfaces/IPaymentService';
import { IReportService } from '../interfaces/IReportService';
import { IHolidayService } from '../interfaces/IHolidayService';
import { IPermissionService } from '../interfaces/IPermissionService';
import { IDashboardService } from '../interfaces/IDashboardService';
import { IAuditService } from '../interfaces/IAuditService';
import { UserService } from '../implementations/real/UserService';
import { ClientService } from '../implementations/real/ClientService';
import { BillPayService } from '../implementations/real/BillPayService';
import { AuthService } from '../implementations/real/AuthService';
import { SecurityService } from '../implementations/real/SecurityService';
import { NotificationService } from '../implementations/real/NotificationService';
import { ExceptionService } from '../implementations/real/ExceptionService';
import { FISExceptionService } from '../implementations/real/FISExceptionService';
import { PayeeService } from '../implementations/real/PayeeService';
import { PaymentProcessorService } from '../implementations/real/PaymentProcessorService';
import { PaymentService } from '../implementations/real/PaymentService';
import { ReportService } from '../implementations/real/ReportService';
import { HolidayService } from '../implementations/real/HolidayService';
import { PermissionService } from '../implementations/real/PermissionService';
import { DashboardService } from '../implementations/real/DashboardService';
import { AuditService } from '../implementations/real/AuditService';
import { MockUserService } from '../implementations/mock/MockUserService';
import { MockClientService } from '../implementations/mock/MockClientService';
import { MockBillPayService } from '../implementations/mock/MockBillPayService';
import { MockAuthService } from '../implementations/mock/MockAuthService';
import { MockSecurityService } from '../implementations/mock/MockSecurityService';
import { MockNotificationService } from '../implementations/mock/MockNotificationService';
import { MockExceptionService } from '../implementations/mock/MockExceptionService';
import { MockFISExceptionService } from '../implementations/mock/FISExceptionService';
import { MockPayeeService } from '../implementations/mock/MockPayeeService';
import { MockPaymentProcessorService } from '../implementations/mock/MockPaymentProcessorService';
import { MockPaymentService } from '../implementations/mock/MockPaymentService';
import { MockReportService } from '../implementations/mock/MockReportService';
import { MockHolidayService } from '../implementations/mock/MockHolidayService';
import { MockPermissionService } from '../implementations/mock/MockPermissionService';
import { MockDashboardService } from '../implementations/mock/MockDashboardService';
import { MockAuditService } from '../implementations/mock/MockAuditService';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private static readonly adminBaseUrl = '/api/admin';
  private static readonly adminCuBaseUrl = '/api/admin-cu';
  private static readonly cbpBaseUrl = '/api/cbp';

  private services: Map<string, IUserService | IClientService | IBillPayService | IAuthService | ISecurityService | 
    INotificationService | IExceptionService | IFISExceptionService | IPayeeService | IPaymentProcessorService | IPaymentService | 
    IReportService | IHolidayService | IPermissionService | IDashboardService | IAuditService > = new Map();

  private constructor() {
    // Initialize services
    this.initializeServices();
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  static getAdminEndpoint(path: string): string {
    return `${this.adminBaseUrl}${path}`;
  }

  static getAdminCuEndpoint(path: string): string {
    return `${this.adminCuBaseUrl}${path}`;
  }

  static getCbpEndpoint(path: string): string {
    return `${this.cbpBaseUrl}${path}`;
  }

  private initializeServices(): void {
    if (process.env.REACT_APP_USE_MOCK_SERVICES === 'true') {
      this.services.set('user', new MockUserService(ServiceFactory.getAdminEndpoint('/users')));
      this.services.set('client', new MockClientService(ServiceFactory.getAdminEndpoint('/clients')));
      this.services.set('billPay', new MockBillPayService(ServiceFactory.getAdminEndpoint('/bill-pay')));
      this.services.set('auth', new MockAuthService(ServiceFactory.getAdminEndpoint('/auth')));
      this.services.set('security', new MockSecurityService(ServiceFactory.getAdminEndpoint('/security')));
      this.services.set('notification', new MockNotificationService(ServiceFactory.getAdminEndpoint('/notifications')));
      this.services.set('exceptionService', new MockExceptionService(ServiceFactory.getAdminEndpoint('/exceptions')));
      this.services.set('fisExceptionService', new MockFISExceptionService(ServiceFactory.getAdminEndpoint('/fis-exceptions')));
      this.services.set('payee', new MockPayeeService(ServiceFactory.getAdminEndpoint('/payees')));
      this.services.set('paymentProcessor', new MockPaymentProcessorService(ServiceFactory.getAdminEndpoint('/payment-processor')));
      this.services.set('payment', new MockPaymentService(ServiceFactory.getAdminEndpoint('/payments')));
      this.services.set('report', new MockReportService(ServiceFactory.getAdminEndpoint('/reports')));
      this.services.set('holiday', new MockHolidayService(ServiceFactory.getAdminEndpoint('/holidays')));
      this.services.set('permission', new MockPermissionService(ServiceFactory.getAdminEndpoint('/permissions')));
      this.services.set('dashboard', new MockDashboardService(ServiceFactory.getAdminEndpoint('/dashboard')));
      this.services.set('audit', new MockAuditService(ServiceFactory.getAdminEndpoint('/audit')));
    } else {
      this.services.set('user', new UserService(ServiceFactory.getAdminEndpoint('/users')));
      this.services.set('client', new ClientService(ServiceFactory.getAdminEndpoint('/clients')));
      this.services.set('billPay', new BillPayService(ServiceFactory.getAdminEndpoint('/bill-pay')));
      this.services.set('auth', new AuthService(ServiceFactory.getAdminEndpoint('/auth')));
      this.services.set('security', new SecurityService(ServiceFactory.getAdminEndpoint('/security')));
      this.services.set('notification', new NotificationService(ServiceFactory.getAdminEndpoint('/notifications')));
      this.services.set('exceptionService', new ExceptionService(ServiceFactory.getAdminEndpoint('/exceptions')));
      this.services.set('fisExceptionService', new FISExceptionService(ServiceFactory.getAdminEndpoint('/fis-exceptions')));
      this.services.set('payee', new PayeeService(ServiceFactory.getAdminEndpoint('/payees')));
      this.services.set('paymentProcessor', new PaymentProcessorService(ServiceFactory.getAdminEndpoint('/payment-processor')));
      this.services.set('payment', new PaymentService(ServiceFactory.getAdminEndpoint('/payments')));
      this.services.set('report', new ReportService(ServiceFactory.getAdminEndpoint('/reports')));
      this.services.set('holiday', new HolidayService(ServiceFactory.getAdminEndpoint('/holidays')));
      this.services.set('permission', new PermissionService(ServiceFactory.getAdminEndpoint('/permissions')));
      this.services.set('dashboard', new DashboardService(ServiceFactory.getAdminEndpoint('/dashboard')));
      this.services.set('audit', new AuditService(ServiceFactory.getAdminEndpoint('/audit')));
    }
  }

  getUserService(): IUserService {
    const service = this.services.get('user');
    if (!service) {
      throw new Error('UserService not initialized');
    }
    return service as IUserService;
  }

  getClientService(): IClientService {
    const service = this.services.get('client');
    if (!service) {
      throw new Error('ClientService not initialized');
    }
    return service as IClientService;
  }

  getBillPayService(): IBillPayService {
    const service = this.services.get('billPay');
    if (!service) {
      throw new Error('BillPayService not initialized');
    }
    return service as IBillPayService;
  }

  getAuthService(): IAuthService {
    const service = this.services.get('auth');
    if (!service) {
      throw new Error('AuthService not initialized');
    }
    return service as IAuthService;
  }

  getSecurityService(): ISecurityService {
    const service = this.services.get('security');
    if (!service) {
      throw new Error('SecurityService not initialized');
    }
    return service as ISecurityService;
  }

  getNotificationService(): INotificationService {
    const service = this.services.get('notification');
    if (!service) {
      throw new Error('NotificationService not initialized');
    }
    return service as INotificationService;
  }

  getExceptionService(): IExceptionService {
    const service = this.services.get('exceptionService');
    if (!service) {
      throw new Error('ExceptionService not initialized');
    }
    return service as IExceptionService;
  }

  getFISExceptionService(): IFISExceptionService {
    const service = this.services.get('fisExceptionService');
    if (!service) {
      throw new Error('FISExceptionService not initialized');
    }
    return service as IFISExceptionService;
  }

  getPayeeService(): IPayeeService {
    const service = this.services.get('payee');
    if (!service) {
      throw new Error('PayeeService not initialized');
    }
    return service as IPayeeService;
  }

  getPaymentProcessorService(): IPaymentProcessorService {
    const service = this.services.get('paymentProcessor');
    if (!service) {
      throw new Error('PaymentProcessorService not initialized');
    }
    return service as IPaymentProcessorService;
  }

  getPaymentService(): IPaymentService {
    const service = this.services.get('payment');
    if (!service) {
      throw new Error('PaymentService not initialized');
    }
    return service as IPaymentService;
  }

  getReportService(): IReportService {
    const service = this.services.get('report');
    if (!service) {
      throw new Error('ReportService not initialized');
    }
    return service as IReportService;
  }

  getHolidayService(): IHolidayService {
    const service = this.services.get('holiday');
    if (!service) {
      throw new Error('HolidayService not initialized');
    }
    return service as IHolidayService;
  }

  getPermissionService(): IPermissionService {
    const service = this.services.get('permission');
    if (!service) {
      throw new Error('PermissionService not initialized');
    }
    return service as IPermissionService;
  }

  getDashboardService(): IDashboardService {
    const service = this.services.get('dashboard');
    if (!service) {
      throw new Error('DashboardService not initialized');
    }
    return service as IDashboardService;
  }

  getAuditService(): IAuditService {
    const service = this.services.get('audit');
    if (!service) {
      throw new Error('AuditService not initialized');
    }
    return service as IAuditService;
  }
}

// Export service instances
export const userService = ServiceFactory.getInstance().getUserService();
export const clientService = ServiceFactory.getInstance().getClientService();
export const billPayService = ServiceFactory.getInstance().getBillPayService();
export const authService = ServiceFactory.getInstance().getAuthService();
export const securityService = ServiceFactory.getInstance().getSecurityService();
export const notificationService = ServiceFactory.getInstance().getNotificationService();
export const exceptionService = ServiceFactory.getInstance().getExceptionService();
export const fisExceptionService = ServiceFactory.getInstance().getFISExceptionService();
export const payeeService = ServiceFactory.getInstance().getPayeeService();
export const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
export const paymentService = ServiceFactory.getInstance().getPaymentService();
export const reportService = ServiceFactory.getInstance().getReportService();
export const holidayService = ServiceFactory.getInstance().getHolidayService();
export const permissionService = ServiceFactory.getInstance().getPermissionService();
export const dashboardService = ServiceFactory.getInstance().getDashboardService();
export const auditService = ServiceFactory.getInstance().getAuditService();
