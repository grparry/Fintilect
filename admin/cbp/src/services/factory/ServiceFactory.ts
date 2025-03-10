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
import { IHolidayService } from '../interfaces/IHolidayService';
import { IPermissionService } from '../interfaces/IPermissionService';
import { IDashboardService } from '../interfaces/IDashboardService';
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
import { HolidayService } from '../implementations/real/HolidayService';
import { PermissionService } from '../implementations/real/PermissionService';
import { DashboardService } from '../implementations/real/DashboardService';
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
import { MockHolidayService } from '../implementations/mock/MockHolidayService';
import { MockPermissionService } from '../implementations/mock/MockPermissionService';
import { MockDashboardService } from '../implementations/mock/MockDashboardService';
import { shouldUseMockService, API_CONFIG } from '../../config/api.config';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private static readonly adminBaseUrl = API_CONFIG.urls.admin;
  private static readonly adminCuBaseUrl = API_CONFIG.urls.adminCu;

  private services: Map<string, IUserService | IClientService | IBillPayService | IAuthService | ISecurityService | 
    INotificationService | IExceptionService | IFISExceptionService | IGlobalPayeeService | IPayeeService | IPaymentProcessorService | IPaymentService | 
    IReportService | IHolidayService | IPermissionService | IDashboardService > = new Map();

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

  private initializeServices(): void {
    console.log('Initializing services');
    
    // User Service
    this.services.set('user', 
      shouldUseMockService('user')
        ? new MockUserService(ServiceFactory.getAdminEndpoint('/api'))
        : new UserService(ServiceFactory.getAdminEndpoint('/api'))
    );

    // Client Service
    this.services.set('client',
      shouldUseMockService('client')
        ? new MockClientService(ServiceFactory.getAdminEndpoint('/api'))
        : new ClientService(ServiceFactory.getAdminEndpoint('/api'))
    );

    // BillPay Service
    this.services.set('billPay',
      shouldUseMockService('billPay')
        ? new MockBillPayService(ServiceFactory.getAdminEndpoint('/bill-pay'))
        : new BillPayService(ServiceFactory.getAdminEndpoint('/bill-pay'))
    );

    // Auth Service
    this.services.set('auth',
      shouldUseMockService('auth')
        ? new MockAuthService(ServiceFactory.getAdminEndpoint('/api'))
        : new AuthService(ServiceFactory.getAdminEndpoint('/api'))
    );

    // Security Service
    this.services.set('security',
      shouldUseMockService('security')
        ? new MockSecurityService(ServiceFactory.getAdminEndpoint('/security'))
        : new SecurityService(ServiceFactory.getAdminEndpoint('/security'))
    );

    // Notification Service
    this.services.set('notification',
      shouldUseMockService('notification')
        ? new MockNotificationService(ServiceFactory.getAdminEndpoint('/notifications'))
        : new NotificationService(ServiceFactory.getAdminCuEndpoint('/api/v1/Notification'))
    );

    // Exception Service
    this.services.set('exception',
      shouldUseMockService('exception')
        ? new MockExceptionService(ServiceFactory.getAdminEndpoint('/exceptions'))
        : new ExceptionService(ServiceFactory.getAdminEndpoint('/exceptions'))
    );

    // FIS Exception Service
    this.services.set('fisException',
      shouldUseMockService('fisException')
        ? new MockFISExceptionService(ServiceFactory.getAdminEndpoint('/fis-exceptions'))
        : new FISExceptionService(ServiceFactory.getAdminEndpoint('/fis-exceptions'))
    );

    // Global Payee Service
    this.services.set('globalPayee',
      shouldUseMockService('globalPayee')
        ? new MockGlobalPayeeService(ServiceFactory.getAdminEndpoint('/payees'))
        : new GlobalPayeeService(ServiceFactory.getAdminEndpoint('/api/v1/Payee'))
    );

    // User Payee Service
    this.services.set('payee',
      shouldUseMockService('payee')
        ? new MockPayeeService(ServiceFactory.getAdminEndpoint('/payees'))
        : new PayeeService(ServiceFactory.getAdminCuEndpoint('/api/v1/Payee'))
    );

    // Payment Processor Service
    this.services.set('paymentProcessor',
      shouldUseMockService('paymentProcessor')
        ? new MockPaymentProcessorService(ServiceFactory.getAdminEndpoint('/payment-processor'))
        : new PaymentProcessorService(ServiceFactory.getAdminEndpoint('/payment-processor'))
    );

    // Payment Service
    this.services.set('payment',
      shouldUseMockService('payment')
        ? new MockPaymentService(ServiceFactory.getAdminEndpoint('/payments'))
        : new PaymentService(ServiceFactory.getAdminCuEndpoint('/api/v1/Payment'))
    );

    // Report Service
    this.services.set('report',
      shouldUseMockService('report')
        ? new MockReportService(ServiceFactory.getAdminEndpoint('/reports'))
        : new ReportService(ServiceFactory.getAdminCuEndpoint('/api/v1/Report'))
    );

    // Holiday Service
    this.services.set('holiday',
      shouldUseMockService('holiday')
        ? new MockHolidayService(ServiceFactory.getAdminEndpoint('/holidays'))
        : new HolidayService(ServiceFactory.getAdminCuEndpoint('/api/v1/Calendar/holiday'))
    );

    // Permission Service
    this.services.set('permission',
      shouldUseMockService('permission')
        ? new MockPermissionService(ServiceFactory.getAdminEndpoint('/api'))
        : new PermissionService(ServiceFactory.getAdminEndpoint('/api'))
    );

    // Dashboard Service
    this.services.set('dashboard',
      shouldUseMockService('dashboard')
        ? new MockDashboardService(ServiceFactory.getAdminEndpoint('/dashboard'))
        : new DashboardService(ServiceFactory.getAdminEndpoint('/dashboard'))
    );
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
    console.log('Getting security service');
    const service = this.services.get('security');
    if (!service) {
      console.error('SecurityService not initialized');
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
    const service = this.services.get('exception');
    if (!service) {
      throw new Error('ExceptionService not initialized');
    }
    return service as IExceptionService;
  }

  getFISExceptionService(): IFISExceptionService {
    const service = this.services.get('fisException');
    if (!service) {
      throw new Error('FISExceptionService not initialized');
    }
    return service as IFISExceptionService;
  }

  getGlobalPayeeService(): IGlobalPayeeService {
    const service = this.services.get('globalPayee');
    if (!service) {
      throw new Error('GlobalPayeeService not initialized');
    }
    return service as IGlobalPayeeService;
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
export const globalPayeeService = ServiceFactory.getInstance().getGlobalPayeeService();
export const payeeService = ServiceFactory.getInstance().getPayeeService();
export const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
export const paymentService = ServiceFactory.getInstance().getPaymentService();
export const reportService = ServiceFactory.getInstance().getReportService();
export const holidayService = ServiceFactory.getInstance().getHolidayService();
export const permissionService = ServiceFactory.getInstance().getPermissionService();
export const dashboardService = ServiceFactory.getInstance().getDashboardService();
