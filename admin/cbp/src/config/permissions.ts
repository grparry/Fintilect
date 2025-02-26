import { PermissionRegistry, ResourceId } from '../types/permissions.types';

/**
 * Central permission registry defining all protected resources and their requirements
 * This serves as the single source of truth for permission requirements across the application
 */
export const permissionRegistry: PermissionRegistry = {
  // Bill Pay Section
  'navigation:billPay': {
    resourceId: 'navigation:billPay',
    requiredPermissions: ['BillPayViewer'],
    description: 'Access to Bill Pay section'
  },
  'route:billPay': {
    resourceId: 'route:billPay',
    requiredPermissions: ['BillPayViewer'],
    description: 'Access to Bill Pay routes'
  },
  'route:billPay.index': {
    resourceId: 'route:billPay.index',
    requiredPermissions: ['BillPayViewer'],
    description: 'View Bill Pay home page'
  },
  'route:billPay.dashboard': {
    resourceId: 'route:billPay.dashboard',
    requiredPermissions: ['BillPayViewer', 'BillPayReports_Read'],
    description: 'View Bill Pay dashboard'
  },
  'route:billPay.payments': {
    resourceId: 'route:billPay.payments',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'Manage Bill Pay payments'
  },
  'route:billPay.payments.index': {
    resourceId: 'route:billPay.payments.index',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'View payments management home'
  },
  'route:billPay.payments.manage': {
    resourceId: 'route:billPay.payments.manage',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'Manage pending payments'
  },
  'route:billPay.payments.exceptions': {
    resourceId: 'route:billPay.payments.exceptions',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'Handle payment exceptions'
  },
  'route:billPay.payments.manual': {
    resourceId: 'route:billPay.payments.manual',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'Process payments manually'
  },
  'route:billPay.payments.fis-payee': {
    resourceId: 'route:billPay.payments.fis-payee',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'Check FIS payee status'
  },
  'route:billPay.payments.fis-exceptions': {
    resourceId: 'route:billPay.payments.fis-exceptions',
    requiredPermissions: ['BillPayViewer', 'BillPayProcessor'],
    description: 'FIS Exception Management'
  },
  'route:billPay.reports': {
    resourceId: 'route:billPay.reports',
    requiredPermissions: ['BillPayViewer', 'BillPayReports_Read'],
    description: 'View Bill Pay reports'
  },
  'route:billPay.settings': {
    resourceId: 'route:billPay.settings',
    requiredPermissions: ['BillPayViewer', 'BillPayConfiguration_Read'],
    description: 'Manage Bill Pay settings'
  },
  'route:billPay.settings.config': {
    resourceId: 'route:billPay.settings.config',
    requiredPermissions: ['BillPayViewer', 'BillPayConfiguration_Read'],
    description: 'Configure Bill Pay settings'
  },
  'route:billPay.settings.holidays': {
    resourceId: 'route:billPay.settings.holidays',
    requiredPermissions: ['BillPayViewer', 'BillPayConfiguration_Read'],
    description: 'Manage holiday settings'
  },
  'route:billPay.settings.notifications': {
    resourceId: 'route:billPay.settings.notifications',
    requiredPermissions: ['BillPayViewer', 'BillPayConfiguration_Read'],
    description: 'Manage notification templates'
  },
  'route:billPay.settings.security': {
    resourceId: 'route:billPay.settings.security',
    requiredPermissions: ['BillPayViewer', 'BillPayConfiguration_Read'],
    description: 'Manage Bill Pay security settings'
  },
  'landing:billPay.welcome': {
    resourceId: 'landing:billPay.welcome',
    requiredPermissions: ['BillPayViewer'],
    description: 'View Bill Pay welcome page'
  },

  // Client Management Section
  'navigation:clientManagement': {
    resourceId: 'navigation:clientManagement',
    requiredPermissions: ['SecurityUsers_Read'],
    description: 'Access to Client Management section'
  },
  'route:client-management-root': {
    resourceId: 'route:client-management-root',
    requiredPermissions: ['ClientManager'],
    description: 'Access to Client Management root'
  },
  'route:client-management.list': {
    resourceId: 'route:client-management.list',
    requiredPermissions: ['ClientManager'],
    description: 'View client list'
  },
  'route:client-management.edit': {
    resourceId: 'route:client-management.edit',
    requiredPermissions: ['ClientManager'],
    description: 'Edit client details'
  },
  'route:client-management.edit.contact': {
    resourceId: 'route:client-management.edit.contact',
    requiredPermissions: ['ClientManager'],
    description: 'Edit client contact information'
  },
  'route:client-management.edit.users': {
    resourceId: 'route:client-management.edit.users',
    requiredPermissions: ['ClientManager', 'SecurityUsers_Manage'],
    description: 'Manage client users'
  },
  'route:client-management.edit.users.edit': {
    resourceId: 'route:client-management.edit.users.edit',
    requiredPermissions: ['ClientManager', 'SecurityUsers_Manage'],
    description: 'Edit client user'
  },
  'route:client-management.edit.groups': {
    resourceId: 'route:client-management.edit.groups',
    requiredPermissions: ['ClientManager', 'SecurityGroups_Manage'],
    description: 'Manage client groups'
  },
  'route:client-management.edit.security': {
    resourceId: 'route:client-management.edit.security',
    requiredPermissions: ['ClientManager', 'Security_Manage'],
    description: 'Manage client security settings'
  },
  'route:client-management.edit.member-security': {
    resourceId: 'route:client-management.edit.member-security',
    requiredPermissions: ['ClientManager', 'Security_Manage'],
    description: 'Manage client member security settings'
  },

  // Development Section
  'navigation:development': {
    resourceId: 'navigation:development',
    requiredPermissions: ['Development_Access'],
    description: 'Access to Development section'
  },
  'route:development': {
    resourceId: 'route:development',
    requiredPermissions: ['Development_Access'],
    description: 'Access development tools'
  },
  'route:development.api-testing': {
    resourceId: 'route:development.api-testing',
    requiredPermissions: ['Development_Access', 'API_Test'],
    description: 'Access API testing tools'
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
  const requirement = permissionRegistry[resourceId];
  if (!requirement) {
    throw new Error(`No permission requirement found for resource: ${resourceId}`);
  }
  return requirement;
};
