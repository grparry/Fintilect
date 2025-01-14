import { Permission, PermissionGroup, PermissionCategoryType, PermissionAction } from '../../../../../types/permission.types';

export const mockPermissions: Permission[] = [
    {
        id: '1',
        name: 'View Security Settings',
        description: 'Can view security settings',
        category: 'Security' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'View Payments',
        description: 'Can view payment details',
        category: 'BillPay' as PermissionCategoryType,
        actions: ['view' as PermissionAction],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Manage Payments',
        description: 'Can create and modify payments',
        category: 'BillPay' as PermissionCategoryType,
        actions: ['edit' as PermissionAction],
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
            payments: ['view', 'edit'],
            users: ['view', 'edit'],
            reports: ['view']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Read Only Group',
        description: 'View only permissions',
        permissions: {
            payments: ['view'],
            users: ['view'],
            reports: ['view']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
