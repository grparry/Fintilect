import { PermissionRegistry, ResourceId } from '../types/permissions.types';

/**
 * Central permission registry defining all protected resources and their requirements
 * This serves as the single source of truth for permission requirements across the application
 */
export const permissionRegistry: PermissionRegistry = {
  // Bill Pay Section
  'navigation:billPay': {
    resourceId: 'navigation:billPay',
    permissions: ['BillPayViewer'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access to Bill Pay section'
  },
  'route:billPay': {
    resourceId: 'route:billPay',
    permissions: ['BillPayViewer'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access to Bill Pay routes'
  },
  'route:billPay.index': {
    resourceId: 'route:billPay.index',
    permissions: ['BillPayViewer'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Bill Pay home page'
  },
  'route:billPay.dashboard': {
    resourceId: 'route:billPay.dashboard',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Bill Pay dashboard'
  },
  'route:billPay.payments': {
    resourceId: 'route:billPay.payments',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage Bill Pay payments'
  },
  'route:billPay.payments.index': {
    resourceId: 'route:billPay.payments.index',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View payments management home'
  },
  'route:billPay.payments.manage': {
    resourceId: 'route:billPay.payments.manage',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage pending payments'
  },
  'route:billPay.payments.exceptions': {
    resourceId: 'route:billPay.payments.exceptions',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Handle payment exceptions'
  },
  'route:billPay.payments.fis-exceptions': {
    resourceId: 'route:billPay.payments.fis-exceptions',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Handle FIS payment exceptions'
  },
  'route:billPay.payments.fis-payee': {
    resourceId: 'route:billPay.payments.fis-payee',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Handle FIS payee management'
  },
  'route:billPay.payments.manual': {
    resourceId: 'route:billPay.payments.manual',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Create manual payments'
  },
  'route:billPay.payments.history': {
    resourceId: 'route:billPay.payments.history',
    permissions: ['BillPayViewer', 'BillPayProcessor'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View payment history'
  },
  'route:billPay.reports': {
    resourceId: 'route:billPay.reports',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access Bill Pay reports'
  },
  'route:billPay.reports.index': {
    resourceId: 'route:billPay.reports.index',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View reports home'
  },
  'route:billPay.reports.generate': {
    resourceId: 'route:billPay.reports.generate',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Generate new reports'
  },
  'route:billPay.reports.view': {
    resourceId: 'route:billPay.reports.view',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View existing reports'
  },

  // Client Management Section
  'navigation:client-management': {
    resourceId: 'navigation:client-management',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access to Client Management section'
  },
  'route:client-management-root': {
    resourceId: 'route:client-management-root',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Root access to Client Management'
  },
  'route:client-management': {
    resourceId: 'route:client-management',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Access to Client Management routes'
  },
  'route:client-management.index': {
    resourceId: 'route:client-management.index',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Client Management home'
  },
  'route:client-management.list': {
    resourceId: 'route:client-management.list',
    permissions: ['ClientManager'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View list of clients'
  },
  'route:client-management.create': {
    resourceId: 'route:client-management.create',
    permissions: ['ClientManager', 'Client_Create'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Create new clients'
  },
  'route:client-management.edit': {
    resourceId: 'route:client-management.edit',
    permissions: ['ClientManager', 'Client_Edit'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Edit existing clients'
  },
  'route:client-management.edit.details': {
    resourceId: 'route:client-management.edit.details',
    permissions: ['ClientManager', 'Client_Edit'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Edit client details'
  },
  'route:client-management.edit.settings': {
    resourceId: 'route:client-management.edit.settings',
    permissions: ['ClientManager', 'Client_Edit'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Edit client settings'
  },
  'route:client-management.edit.users': {
    resourceId: 'route:client-management.edit.users',
    permissions: ['ClientManager', 'Users_Manage'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage client users'
  },
  'route:client-management.edit.groups': {
    resourceId: 'route:client-management.edit.groups',
    permissions: ['ClientManager', 'SecurityGroups_Manage'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'Manage client groups'
  },

  // Development Section
  'navigation:development': {
    resourceId: 'navigation:development',
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to Development section'
  },
  'route:development': {
    resourceId: 'route:development',
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to Development tools'
  },
  'route:development.api-testing': {
    resourceId: 'route:development.api-testing',
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    allowedEnvironments: ['development', 'test'],
    description: 'Access to API Testing tools'
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
