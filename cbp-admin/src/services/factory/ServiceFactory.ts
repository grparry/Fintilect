import { IBaseService } from '../interfaces/IBaseService';
import { IUserService } from '../interfaces/IUserService';
import { IClientService } from '../interfaces/IClientService';
import { IBillPayService } from '../interfaces/IBillPayService';
import { IAuthService } from '../interfaces/IAuthService';
import { ISecurityService } from '../interfaces/ISecurityService';
import { INotificationService } from '../interfaces/INotificationService';
import { IExceptionService } from '../interfaces/IExceptionService';
import { IPayeeService } from '../interfaces/IPayeeService';
import { IPaymentProcessorService } from '../interfaces/IPaymentProcessorService';
import { IReportService } from '../interfaces/IReportService';
import { IHolidayService } from '../interfaces/IHolidayService';
import { IPermissionService } from '../interfaces/IPermissionService';
import { IDashboardService } from '../interfaces/IDashboardService';

// Import real service implementations
import { UserService } from '../implementations/real/UserService';
import { ClientService } from '../implementations/real/ClientService';
import { BillPayService } from '../implementations/real/BillPayService';
import { AuthService } from '../implementations/real/AuthService';
import { SecurityService } from '../implementations/real/SecurityService';
import { NotificationService } from '../implementations/real/NotificationService';
import { ExceptionService } from '../implementations/real/ExceptionService';
import { PayeeService } from '../implementations/real/PayeeService';
import { PaymentProcessorService } from '../implementations/real/PaymentProcessorService';
import { ReportService } from '../implementations/real/ReportService';
import { HolidayService } from '../implementations/real/HolidayService';
import { PermissionService } from '../implementations/real/PermissionService';
import { DashboardService } from '../implementations/real/DashboardService';

// Import mock service implementations
import { MockUserService } from '../implementations/mock/MockUserService';
import { MockClientService } from '../implementations/mock/MockClientService';
import { MockBillPayService } from '../implementations/mock/MockBillPayService';
import { MockAuthService } from '../implementations/mock/MockAuthService';
import { MockSecurityService } from '../implementations/mock/MockSecurityService';
import { MockNotificationService } from '../implementations/mock/MockNotificationService';
import { MockExceptionService } from '../implementations/mock/MockExceptionService';
import { MockPayeeService } from '../implementations/mock/MockPayeeService';
import { MockPaymentProcessorService } from '../implementations/mock/MockPaymentProcessorService';
import { MockReportService } from '../implementations/mock/MockReportService';
import { MockHolidayService } from '../implementations/mock/MockHolidayService';
import { MockPermissionService } from '../implementations/mock/MockPermissionService';
import { MockDashboardService } from '../implementations/mock/MockDashboardService';

import { getConfig } from '../../config/api.config';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instances: Map<string, IBaseService> = new Map();
  private static useMock: boolean = getConfig().useMockServices;

  /**
   * Get service instance with caching
   */
  private static getInstance<T extends IBaseService>(
    key: string,
    createReal: () => T,
    createMock: () => T
  ): T {
    if (!ServiceFactory.instances.has(key)) {
      const instance = ServiceFactory.useMock ? createMock() : createReal();
      ServiceFactory.instances.set(key, instance);
    }
    return ServiceFactory.instances.get(key) as T;
  }

  /**
   * Get UserService instance
   */
  static getUserService(): IUserService {
    return ServiceFactory.getInstance<IUserService>(
      'user',
      () => new UserService(),
      () => new MockUserService()
    );
  }

  /**
   * Get ClientService instance
   */
  static getClientService(): IClientService {
    return ServiceFactory.getInstance<IClientService>(
      'client',
      () => new ClientService(),
      () => new MockClientService()
    );
  }

  /**
   * Get BillPayService instance
   */
  static getBillPayService(): IBillPayService {
    return ServiceFactory.getInstance<IBillPayService>(
      'billPay',
      () => new BillPayService(),
      () => new MockBillPayService()
    );
  }

  /**
   * Get AuthService instance
   */
  static getAuthService(): IAuthService {
    return ServiceFactory.getInstance<IAuthService>(
      'auth',
      () => new AuthService(),
      () => new MockAuthService()
    );
  }

  /**
   * Get SecurityService instance
   */
  static getSecurityService(): ISecurityService {
    return ServiceFactory.getInstance<ISecurityService>(
      'security',
      () => new SecurityService(),
      () => new MockSecurityService()
    );
  }

  /**
   * Get NotificationService instance
   */
  static getNotificationService(): INotificationService {
    return ServiceFactory.getInstance<INotificationService>(
      'notification',
      () => new NotificationService(),
      () => new MockNotificationService()
    );
  }

  /**
   * Get ExceptionService instance
   */
  static getExceptionService(): IExceptionService {
    return ServiceFactory.getInstance<IExceptionService>(
      'exception',
      () => new ExceptionService(),
      () => new MockExceptionService()
    );
  }

  /**
   * Get PayeeService instance
   */
  static getPayeeService(): IPayeeService {
    return ServiceFactory.getInstance<IPayeeService>(
      'payee',
      () => new PayeeService(),
      () => new MockPayeeService()
    );
  }

  /**
   * Get PaymentProcessorService instance
   */
  static getPaymentProcessorService(): IPaymentProcessorService {
    return ServiceFactory.getInstance<IPaymentProcessorService>(
      'paymentProcessor',
      () => new PaymentProcessorService(),
      () => new MockPaymentProcessorService()
    );
  }

  /**
   * Get ReportService instance
   */
  static getReportService(): IReportService {
    return ServiceFactory.getInstance<IReportService>(
      'report',
      () => new ReportService(),
      () => new MockReportService()
    );
  }

  /**
   * Get HolidayService instance
   */
  static getHolidayService(): IHolidayService {
    return ServiceFactory.getInstance<IHolidayService>(
      'holiday',
      () => new HolidayService(),
      () => new MockHolidayService()
    );
  }

  /**
   * Get PermissionService instance
   */
  static getPermissionService(): IPermissionService {
    return ServiceFactory.getInstance<IPermissionService>(
      'permission',
      () => new PermissionService(),
      () => new MockPermissionService()
    );
  }

  /**
   * Get DashboardService instance
   */
  static getDashboardService(): IDashboardService {
    return ServiceFactory.getInstance<IDashboardService>(
      'dashboard',
      () => new DashboardService(),
      () => new MockDashboardService()
    );
  }

  /**
   * Clear all cached instances
   */
  static clearInstances(): void {
    ServiceFactory.instances.clear();
  }

  /**
   * Set whether to use mock services
   */
  static setUseMock(useMock: boolean): void {
    if (ServiceFactory.useMock !== useMock) {
      ServiceFactory.useMock = useMock;
      ServiceFactory.clearInstances();
    }
  }
}
