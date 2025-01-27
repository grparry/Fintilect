import { IBaseService } from './interfaces/IBaseService';
import { IUserService } from './interfaces/IUserService';
import { IClientService } from './interfaces/IClientService';
import { IBillPayService } from './interfaces/IBillPayService';
import { IAuthService } from './interfaces/IAuthService';
import { ISecurityService } from './interfaces/ISecurityService';
import { INotificationService } from './interfaces/INotificationService';
import { IExceptionService } from './interfaces/IExceptionService';
import { IPayeeService } from './interfaces/IPayeeService';
import { IPaymentProcessorService } from './interfaces/IPaymentProcessorService';
import { IPaymentService } from './interfaces/IPaymentService';
import { IReportService } from './interfaces/IReportService';
import { IHolidayService } from './interfaces/IHolidayService';
import { IPermissionService } from './interfaces/IPermissionService';
import { IDashboardService } from './interfaces/IDashboardService';
import { IAuditService } from './interfaces/IAuditService';
import { IMemberService } from './interfaces/IMemberService';
import { ISettingsService } from './interfaces/ISettingsService';
import { IMoneyDesktopService } from './interfaces/IMoneyDesktopService';

// Import real service implementations

import { IBaseService } from './interfaces/IBaseService';
import { IUserService } from './interfaces/IUserService';
import { IClientService } from './interfaces/IClientService';
import { IBillPayService } from './interfaces/IBillPayService';
import { IAuthService } from './interfaces/IAuthService';
import { ISecurityService } from './interfaces/ISecurityService';
import { INotificationService } from './interfaces/INotificationService';
import { IExceptionService } from './interfaces/IExceptionService';
import { IPayeeService } from './interfaces/IPayeeService';
import { IPaymentProcessorService } from './interfaces/IPaymentProcessorService';
import { IPaymentService } from './interfaces/IPaymentService';
import { IReportService } from './interfaces/IReportService';
import { IHolidayService } from './interfaces/IHolidayService';
import { IPermissionService } from './interfaces/IPermissionService';
import { IDashboardService } from './interfaces/IDashboardService';
import { IAuditService } from './interfaces/IAuditService';
import { IMemberService } from './interfaces/IMemberService';
import { ISettingsService } from './interfaces/ISettingsService';
import { IMoneyDesktopService } from './interfaces/IMoneyDesktopService';

// Import real service implementations
import { UserService } from './implementations/real/UserService';
import { ClientService } from './implementations/real/ClientService';
import { BillPayService } from './implementations/real/BillPayService';
import { AuthService } from './implementations/real/AuthService';
import { SecurityService } from './implementations/real/SecurityService';
import { NotificationService } from './implementations/real/NotificationService';
import { ExceptionService } from './implementations/real/ExceptionService';
import { PayeeService } from './implementations/real/PayeeService';
import { PaymentProcessorService } from './implementations/real/PaymentProcessorService';
import { PaymentService } from './implementations/real/PaymentService';
import { ReportService } from './implementations/real/ReportService';
import { HolidayService } from './implementations/real/HolidayService';
import { PermissionService } from './implementations/real/PermissionService';
import { DashboardService } from './implementations/real/DashboardService';
import { AuditService } from './implementations/real/AuditService';
import { MemberService } from './implementations/real/MemberService';
import { SettingsService } from './implementations/real/SettingsService';
import { MoneyDesktopService } from './implementations/real/MoneyDesktopService';

// Import mock service implementations

import { IBaseService } from './interfaces/IBaseService';
import { IUserService } from './interfaces/IUserService';
import { IClientService } from './interfaces/IClientService';
import { IBillPayService } from './interfaces/IBillPayService';
import { IAuthService } from './interfaces/IAuthService';
import { ISecurityService } from './interfaces/ISecurityService';
import { INotificationService } from './interfaces/INotificationService';
import { IExceptionService } from './interfaces/IExceptionService';
import { IPayeeService } from './interfaces/IPayeeService';
import { IPaymentProcessorService } from './interfaces/IPaymentProcessorService';
import { IPaymentService } from './interfaces/IPaymentService';
import { IReportService } from './interfaces/IReportService';
import { IHolidayService } from './interfaces/IHolidayService';
import { IPermissionService } from './interfaces/IPermissionService';
import { IDashboardService } from './interfaces/IDashboardService';
import { IAuditService } from './interfaces/IAuditService';
import { IMemberService } from './interfaces/IMemberService';
import { ISettingsService } from './interfaces/ISettingsService';
import { IMoneyDesktopService } from './interfaces/IMoneyDesktopService';

// Import real service implementations
import { UserService } from './implementations/real/UserService';
import { ClientService } from './implementations/real/ClientService';
import { BillPayService } from './implementations/real/BillPayService';
import { AuthService } from './implementations/real/AuthService';
import { SecurityService } from './implementations/real/SecurityService';
import { NotificationService } from './implementations/real/NotificationService';
import { ExceptionService } from './implementations/real/ExceptionService';
import { PayeeService } from './implementations/real/PayeeService';
import { PaymentProcessorService } from './implementations/real/PaymentProcessorService';
import { PaymentService } from './implementations/real/PaymentService';
import { ReportService } from './implementations/real/ReportService';
import { HolidayService } from './implementations/real/HolidayService';
import { PermissionService } from './implementations/real/PermissionService';
import { DashboardService } from './implementations/real/DashboardService';
import { AuditService } from './implementations/real/AuditService';
import { MemberService } from './implementations/real/MemberService';
import { SettingsService } from './implementations/real/SettingsService';
import { MoneyDesktopService } from './implementations/real/MoneyDesktopService';

// Import mock service implementations
import { MockUserService } from './implementations/mock/MockUserService';
import { MockClientService } from './implementations/mock/MockClientService';
import { MockBillPayService } from './implementations/mock/MockBillPayService';
import { MockAuthService } from './implementations/mock/MockAuthService';
import { MockSecurityService } from './implementations/mock/MockSecurityService';
import { MockNotificationService } from './implementations/mock/MockNotificationService';
import { MockExceptionService } from './implementations/mock/MockExceptionService';
import { MockPayeeService } from './implementations/mock/MockPayeeService';
import { MockPaymentProcessorService } from './implementations/mock/MockPaymentProcessorService';
import { MockPaymentService } from './implementations/mock/MockPaymentService';
import { MockReportService } from './implementations/mock/MockReportService';
import { MockHolidayService } from './implementations/mock/MockHolidayService';
import { MockPermissionService } from './implementations/mock/MockPermissionService';
import { MockDashboardService } from './implementations/mock/MockDashboardService';
import { MockAuditService } from './implementations/mock/MockAuditService';
import { MockMemberService } from './implementations/mock/MockMemberService';
import { MockSettingsService } from './implementations/mock/MockSettingsService';
import { MockMoneyDesktopService } from './implementations/mock/MockMoneyDesktopService';

import { getConfig, shouldUseMockService } from '../config/api.config';

/**


// Import real service implementations

// Import mock service implementations


/**
 * Service factory for managing service instantiation
 */

    // Initialize services






































// Export service instances
