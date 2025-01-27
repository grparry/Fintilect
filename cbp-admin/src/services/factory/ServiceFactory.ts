import { IBaseService } from '@/interfaces/IBaseService';
import { IUserService } from '@/interfaces/IUserService';
import { IClientService } from '@/interfaces/IClientService';
import { IBillPayService } from '@/interfaces/IBillPayService';
import { IAuthService } from '@/interfaces/IAuthService';
import { ISecurityService } from '@/interfaces/ISecurityService';
import { INotificationService } from '@/interfaces/INotificationService';
import { IExceptionService } from '@/interfaces/IExceptionService';
import { IPayeeService } from '@/interfaces/IPayeeService';
import { IPaymentProcessorService } from '@/interfaces/IPaymentProcessorService';
import { IPaymentService } from '@/interfaces/IPaymentService';
import { IReportService } from '@/interfaces/IReportService';
import { IHolidayService } from '@/interfaces/IHolidayService';
import { IPermissionService } from '@/interfaces/IPermissionService';
import { IDashboardService } from '@/interfaces/IDashboardService';
import { IAuditService } from '@/interfaces/IAuditService';
import { IMemberService } from '@/interfaces/IMemberService';
import { ISettingsService } from '@/interfaces/ISettingsService';
import { IMoneyDesktopService } from '@/interfaces/IMoneyDesktopService';

// Import real service implementations
import { UserService } from '@/implementations/real/UserService';
import { ClientService } from '@/implementations/real/ClientService';
import { BillPayService } from '@/implementations/real/BillPayService';
import { AuthService } from '@/implementations/real/AuthService';
import { SecurityService } from '@/implementations/real/SecurityService';
import { NotificationService } from '@/implementations/real/NotificationService';
import { ExceptionService } from '@/implementations/real/ExceptionService';
import { PayeeService } from '@/implementations/real/PayeeService';
import { PaymentProcessorService } from '@/implementations/real/PaymentProcessorService';
import { PaymentService } from '@/implementations/real/PaymentService';
import { ReportService } from '@/implementations/real/ReportService';
import { HolidayService } from '@/implementations/real/HolidayService';
import { PermissionService } from '@/implementations/real/PermissionService';
import { DashboardService } from '@/implementations/real/DashboardService';
import { AuditService } from '@/implementations/real/AuditService';
import { MemberService } from '@/implementations/real/MemberService';
import { SettingsService } from '@/implementations/real/SettingsService';
import { MoneyDesktopService } from '@/implementations/real/MoneyDesktopService';

// Import mock service implementations
import { MockUserService } from '@/implementations/mock/MockUserService';
import { MockClientService } from '@/implementations/mock/MockClientService';
import { MockBillPayService } from '@/implementations/mock/MockBillPayService';
import { MockAuthService } from '@/implementations/mock/MockAuthService';
import { MockSecurityService } from '@/implementations/mock/MockSecurityService';
import { MockNotificationService } from '@/implementations/mock/MockNotificationService';
import { MockExceptionService } from '@/implementations/mock/MockExceptionService';
import { MockPayeeService } from '@/implementations/mock/MockPayeeService';
import { MockPaymentProcessorService } from '@/implementations/mock/MockPaymentProcessorService';
import { MockPaymentService } from '@/implementations/mock/MockPaymentService';
import { MockReportService } from '@/implementations/mock/MockReportService';
import { MockHolidayService } from '@/implementations/mock/MockHolidayService';
import { MockPermissionService } from '@/implementations/mock/MockPermissionService';
import { MockDashboardService } from '@/implementations/mock/MockDashboardService';
import { MockAuditService } from '@/implementations/mock/MockAuditService';
import { MockMemberService } from '@/implementations/mock/MockMemberService';
import { MockSettingsService } from '@/implementations/mock/MockSettingsService';
import { MockMoneyDesktopService } from '@/implementations/mock/MockMoneyDesktopService';

import { getConfig, shouldUseMockService } from '@/../config/api.config';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private services: Map<string, IUserService | IClientService | IBillPayService | IAuthService | ISecurityService | 
    INotificationService | IExceptionService | IPayeeService | IPaymentProcessorService | IPaymentService | 
    IReportService | IHolidayService | IPermissionService | IDashboardService | IAuditService | IMemberService |
    ISettingsService | IMoneyDesktopService> = new Map();

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

  private initializeServices(): void {
    if (shouldUseMockService('user')) {
      this.services.set('user', new MockUserService('/api/v1/users'));
    } else {
      this.services.set('user', new UserService('/api/v1/users'));
    }

    if (shouldUseMockService('client')) {
      this.services.set('client', new MockClientService('/api/v1/clients'));
    } else {
      this.services.set('client', new ClientService('/api/v1/clients'));
    }

    if (shouldUseMockService('billPay')) {
      this.services.set('billPay', new MockBillPayService('/api/v1/bill-pay'));
    } else {
      this.services.set('billPay', new BillPayService('/api/v1/bill-pay'));
    }

    if (shouldUseMockService('auth')) {
      this.services.set('auth', new MockAuthService('/api/v1/auth'));
    } else {
      this.services.set('auth', new AuthService('/api/v1/auth'));
    }

    if (shouldUseMockService('security')) {
      this.services.set('security', new MockSecurityService('/api/v1/security'));
    } else {
      this.services.set('security', new SecurityService('/api/v1/security'));
    }

    if (shouldUseMockService('notification')) {
      this.services.set('notification', new MockNotificationService('/api/v1/notifications'));
    } else {
      this.services.set('notification', new NotificationService('/api/v1/notifications'));
    }

    if (shouldUseMockService('exception')) {
      this.services.set('exception', new MockExceptionService('/api/v1/exceptions'));
    } else {
      this.services.set('exception', new ExceptionService('/api/v1/exceptions'));
    }

    if (shouldUseMockService('payee')) {
      this.services.set('payee', new MockPayeeService('/api/v1/payees'));
    } else {
      this.services.set('payee', new PayeeService('/api/v1/payees'));
    }

    if (shouldUseMockService('paymentProcessor')) {
      this.services.set('paymentProcessor', new MockPaymentProcessorService('/api/v1/payment-processor'));
    } else {
      this.services.set('paymentProcessor', new PaymentProcessorService('/api/v1/payment-processor'));
    }

    if (shouldUseMockService('payment')) {
      this.services.set('payment', new MockPaymentService('/api/v1/payments'));
    } else {
      this.services.set('payment', new PaymentService('/api/v1/payments'));
    }

    if (shouldUseMockService('report')) {
      this.services.set('report', new MockReportService('/api/v1/reports'));
    } else {
      this.services.set('report', new ReportService('/api/v1/reports'));
    }

    if (shouldUseMockService('holiday')) {
      this.services.set('holiday', new MockHolidayService('/api/v1/holidays'));
    } else {
      this.services.set('holiday', new HolidayService('/api/v1/holidays'));
    }

    if (shouldUseMockService('permission')) {
      this.services.set('permission', new MockPermissionService('/api/v1/permissions'));
    } else {
      this.services.set('permission', new PermissionService('/api/v1/permissions'));
    }

    if (shouldUseMockService('dashboard')) {
      this.services.set('dashboard', new MockDashboardService('/api/v1/dashboard'));
    } else {
      this.services.set('dashboard', new DashboardService('/api/v1/dashboard'));
    }

    if (shouldUseMockService('audit')) {
      this.services.set('audit', new MockAuditService('/api/v1/audit'));
    } else {
      this.services.set('audit', new AuditService('/api/v1/audit'));
    }

    if (shouldUseMockService('member')) {
      this.services.set('member', new MockMemberService('/api/v1/members'));
    } else {
      this.services.set('member', new MemberService('/api/v1/members'));
    }

    if (shouldUseMockService('moneyDesktop')) {
      this.services.set('moneyDesktop', new MockMoneyDesktopService('/api/money-desktop'));
    } else {
      this.services.set('moneyDesktop', new MoneyDesktopService('/api/money-desktop'));
    }

    if (shouldUseMockService('settings')) {
      this.services.set('settings', new MockSettingsService('/api/v1/settings'));
    } else {
      this.services.set('settings', new SettingsService('/api/v1/settings'));
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
    const service = this.services.get('exception');
    if (!service) {
      throw new Error('ExceptionService not initialized');
    }
    return service as IExceptionService;
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

  getMemberService(): IMemberService {
    const service = this.services.get('member');
    if (!service) {
      throw new Error('MemberService not initialized');
    }
    return service as IMemberService;
  }

  getMoneyDesktopService(): IMoneyDesktopService {
    const service = this.services.get('moneyDesktop');
    if (!service) {
      throw new Error('MoneyDesktopService not initialized');
    }
    return service as IMoneyDesktopService;
  }

  getSettingsService(): ISettingsService {
    const service = this.services.get('settings');
    if (!service) {
      throw new Error('SettingsService not initialized');
    }
    return service as ISettingsService;
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
export const payeeService = ServiceFactory.getInstance().getPayeeService();
export const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
export const paymentService = ServiceFactory.getInstance().getPaymentService();
export const reportService = ServiceFactory.getInstance().getReportService();
export const holidayService = ServiceFactory.getInstance().getHolidayService();
export const permissionService = ServiceFactory.getInstance().getPermissionService();
export const dashboardService = ServiceFactory.getInstance().getDashboardService();
export const auditService = ServiceFactory.getInstance().getAuditService();
export const memberService = ServiceFactory.getInstance().getMemberService();
export const moneyDesktopService = ServiceFactory.getInstance().getMoneyDesktopService();
export const settingsService = ServiceFactory.getInstance().getSettingsService();
