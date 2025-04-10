import { PermissionRegistry, ResourceId } from '../types/permissions.types';

/**
 * Central permission registry defining all protected resources and their requirements
 * This serves as the single source of truth for permission requirements across the application
 */
export const permissionRegistry: PermissionRegistry = {
  // Bill Pay Section
  'navigation:billPay': {
    resourceId: 'navigation:billPay',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Access to Bill Pay section'
  },
  'route:billPay': {
    resourceId: 'route:billPay',
    permissions: [],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Access to Bill Pay routes'
  },
  'route:billPay.index': {
    resourceId: 'route:billPay.index',
    permissions: [],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Bill Pay home page'
  },
  'route:billPay.dashboard': {
    resourceId: 'route:billPay.dashboard',
    permissions: [],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Bill Pay dashboard'
  },
  'route:billPay.payments': {
    resourceId: 'route:billPay.payments',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Manage Bill Pay payments'
  },
  'route:billPay.payments.index': {
    resourceId: 'route:billPay.payments.index',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View payments management home'
  },
  'route:billPay.payments.manage': {
    resourceId: 'route:billPay.payments.manage',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Manage pending payments'
  },
  'route:billPay.payments.exceptions': {
    resourceId: 'route:billPay.payments.exceptions',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Handle payment exceptions'
  },
  'route:billPay.payments.fis-exceptions': {
    resourceId: 'route:billPay.payments.fis-exceptions',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Handle FIS payment exceptions'
  },
  'route:billPay.payments.fis-payee': {
    resourceId: 'route:billPay.payments.fis-payee',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Handle FIS payee management'
  },
  'route:billPay.payments.copy-payees': {
    resourceId: 'route:billPay.payments.copy-payees',
    permissions: ['BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Copy payees between members'
  },
  'route:billPay.payments.manual': {
    resourceId: 'route:billPay.payments.manual',
    permissions: ['BillPayRead', 'BillPayWrite'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Create manual payments'
  },
  'route:billPay.payments.history': {
    resourceId: 'route:billPay.payments.history',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View payment history'
  },
  'route:billPay.payments.change-history': {
    resourceId: 'route:billPay.payments.change-history',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View payment change history'
  },
  
  // Bill Pay Settings
  'route:billPay.settings': {
    resourceId: 'route:billPay.settings',
    permissions: ['BillPayAdmin'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access Bill Pay settings'
  },
  'route:billPay.settings.config': {
    resourceId: 'route:billPay.settings.config',
    permissions: ['BillPayAdmin'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage Bill Pay configuration settings'
  },
  'route:billPay.settings.holidays': {
    resourceId: 'route:billPay.settings.holidays',
    permissions: ['BillPayAdmin'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage Bill Pay holidays'
  },
  'route:billPay.settings.notifications': {
    resourceId: 'route:billPay.settings.notifications',
    permissions: ['BillPayAdmin'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage Bill Pay notification templates'
  },
  'route:billPay.settings.security': {
    resourceId: 'route:billPay.settings.security',
    permissions: ['BillPayAdmin'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage Bill Pay security settings'
  },
  
  'route:billPay.reports': {
    resourceId: 'route:billPay.reports',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Access Bill Pay reports'
  },
  'route:billPay.reports.index': {
    resourceId: 'route:billPay.reports.index',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View reports home'
  },
  'route:billPay.reports.generate': {
    resourceId: 'route:billPay.reports.generate',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Generate new reports'
  },
  'route:billPay.reports.view': {
    resourceId: 'route:billPay.reports.view',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View existing reports'
  },
  'route:billPay.reports.paymentActivity': {
    resourceId: 'route:billPay.reports.paymentActivity',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Payment Activity Report'
  },
  'route:billPay.reports.errorRecap': {
    resourceId: 'route:billPay.reports.errorRecap',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Error Recap Report'
  },
  'route:billPay.reports.activeUserCount': {
    resourceId: 'route:billPay.reports.activeUserCount',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Active User Count Report'
  },
  'route:billPay.reports.failedOnUs': {
    resourceId: 'route:billPay.reports.failedOnUs',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Failed On Us Report'
  },
  'route:billPay.reports.globalHolidays': {
    resourceId: 'route:billPay.reports.globalHolidays',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Global Holidays Report'
  },
  'route:billPay.reports.payee': {
    resourceId: 'route:billPay.reports.payee',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Payee Report'
  },
  'route:billPay.reports.payment': {
    resourceId: 'route:billPay.reports.payment',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Payment Report'
  },
  'route:billPay.reports.paymentClear': {
    resourceId: 'route:billPay.reports.paymentClear',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Payment Clear Report'
  },
  'route:billPay.reports.recurringPayment': {
    resourceId: 'route:billPay.reports.recurringPayment',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Recurring Payment Report'
  },
  'route:billPay.reports.userPayee': {
    resourceId: 'route:billPay.reports.userPayee',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View User Payee Report'
  },
  'route:billPay.reports.monthlyUsers': {
    resourceId: 'route:billPay.reports.monthlyUsers',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Monthly Users Report'
  },
  'route:billPay.reports.pendingPayments': {
    resourceId: 'route:billPay.reports.pendingPayments',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Pending Payments Report'
  },
  'route:billPay.reports.recurringPaymentChangeHistory': {
    resourceId: 'route:billPay.reports.recurringPaymentChangeHistory',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Recurring Payment Change History Report'
  },
  'route:billPay.reports.userPayeeChangeHistory': {
    resourceId: 'route:billPay.reports.userPayeeChangeHistory',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View User Payee Change History Report'
  },
  'route:billPay.reports.onUsPostings': {
    resourceId: 'route:billPay.reports.onUsPostings',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View On Us Postings Report'
  },
  'route:billPay.reports.statusesWithNotifications': {
    resourceId: 'route:billPay.reports.statusesWithNotifications',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Statuses with Notifications Report'
  },
  'route:billPay.reports.largePayment': {
    resourceId: 'route:billPay.reports.largePayment',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Large Payment Report'
  },
  'route:billPay.reports.processingConfirmation': {
    resourceId: 'route:billPay.reports.processingConfirmation',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Processing Confirmation Report'
  },
  'route:billPay.reports.scheduledPaymentChangeHistory': {
    resourceId: 'route:billPay.reports.scheduledPaymentChangeHistory',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Scheduled Payment Change History Report'
  },
  'route:billPay.reports.ofacExceptions': {
    resourceId: 'route:billPay.reports.ofacExceptions',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View OFAC Exceptions Report'
  },
  'route:billPay.reports.suspendedPayment': {
    resourceId: 'route:billPay.reports.suspendedPayment',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Suspended Payment Report'
  },
  'route:billPay.reports.settlementSummary': {
    resourceId: 'route:billPay.reports.settlementSummary',
    permissions: ['BillPayRead'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Settlement Summary Report'
  },

  // Client Management Section
  'navigation:client-management': {
    resourceId: 'navigation:client-management',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Access to Client Management section'
  },
  'route:client-management-root': {
    resourceId: 'route:client-management-root',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Root access to Client Management'
  },
  'route:client-management': {
    resourceId: 'route:client-management',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Access to Client Management routes'
  },
  'route:client-management.index': {
    resourceId: 'route:client-management.index',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View Client Management home'
  },
  'route:client-management.list': {
    resourceId: 'route:client-management.list',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'View list of clients'
  },
  'route:client-management.create': {
    resourceId: 'route:client-management.create',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Create new clients'
  },
  'route:client-management.edit': {
    resourceId: 'route:client-management.edit',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Edit existing clients'
  },
  'route:client-management.edit.details': {
    resourceId: 'route:client-management.edit.details',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Edit client details'
  },
  'route:client-management.edit.settings': {
    resourceId: 'route:client-management.edit.settings',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Edit client settings'
  },
  'route:client-management.edit.users': {
    resourceId: 'route:client-management.edit.users',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Manage client users'
  },
  'route:client-management.edit.groups': {
    resourceId: 'route:client-management.edit.groups',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser'],
    description: 'Manage client groups'
  },

  // Development Section
  'navigation:development': {
    resourceId: 'navigation:development',
    adminPermissions: ['ConnectSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to Development section'
  },
  'route:development': {
    resourceId: 'route:development',
    adminPermissions: ['ConnectSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to Development tools'
  },
  'route:development.api-testing': {
    resourceId: 'route:development.api-testing',
    adminPermissions: ['ConnectSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to API Testing tools'
  },
  'route:development.report-table-test-harness': {
    resourceId: 'route:development.report-table-test-harness',
    adminPermissions: ['ConnectSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to Report Table Test Harness'
  }
};

/**
 * Helper function to get a resource ID with type safety
 */
export const getResourceId = (context: 'navigation' | 'route' | 'landing', path: string): ResourceId => {
  return `${context}:${path}` as ResourceId;
};

/**
 * Helper function to check if a resource exists in the registry
 */
export const hasResource = (resourceId: ResourceId): boolean => {
  return resourceId in permissionRegistry;
};

/**
 * Get permission requirement for a resource
 */
export const getPermissionRequirement = (resourceId: ResourceId) => {
  if (!hasResource(resourceId)) {
    throw new Error(`No permission requirement found for resource: ${resourceId}`);
  }
  return permissionRegistry[resourceId];
};
