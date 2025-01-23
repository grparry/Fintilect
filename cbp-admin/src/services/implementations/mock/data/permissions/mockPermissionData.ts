import { Permission, PermissionGroup, PermissionCategoryType, PermissionAction } from '../../../../../types/permission.types';

export const mockPermissions: Permission[] = [
    // System Permissions
    {
        id: '1',
        name: 'View System Settings',
        description: 'Can view system settings',
        category: 'System' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Bill Pay Permissions
    {
        id: '2',
        name: 'View Bill Pay',
        description: 'Can view bill pay section',
        category: 'BillPay' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Manage Bill Pay',
        description: 'Can manage bill pay',
        category: 'BillPay' as PermissionCategoryType,
        actions: ['edit' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Client Management Permissions
    {
        id: '4',
        name: 'View Client Management',
        description: 'Can view client management section',
        category: 'ClientManagement' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Emerge Permissions
    {
        id: '5',
        name: 'View Emerge',
        description: 'Can view emerge section',
        category: 'Emerge' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // Development Permissions
    {
        id: '6',
        name: 'View Development',
        description: 'Can view development section',
        category: 'Development' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const mockPermissionGroups: PermissionGroup[] = [
    {
        id: 1,
        name: 'Admin Group',
        description: 'Administrative permissions',
        permissions: {
            system: ['view', 'edit'],
            billpay: ['view', 'edit'],
            clientmanagement: ['view', 'edit'],
            emerge: ['view', 'edit'],
            development: ['view', 'edit']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Read Only Group',
        description: 'View only permissions',
        permissions: {
            billpay: ['view'],
            clientmanagement: ['view'],
            emerge: ['view'],
            development: ['view']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
