import { http, HttpResponse } from 'msw';
import {
  Permission,
  PermissionGroup,
  PermissionGroupInput,
  PermissionAction
} from '../../types/permission.types';

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Payments',
    description: 'View all payment transactions',
    category: 'BillPay',
    actions: ['view', 'export']
  },
  {
    id: '2',
    name: 'Process Payments',
    description: 'Process and approve payments',
    category: 'BillPay',
    actions: ['view', 'process', 'approve']
  },
  {
    id: '3',
    name: 'Manage Users',
    description: 'Create and manage user accounts',
    category: 'Users',
    actions: ['view', 'create', 'edit', 'delete']
  },
  {
    id: '4',
    name: 'View Reports',
    description: 'Access and export reports',
    category: 'Reports',
    actions: ['view', 'export']
  }
];

const mockGroups: PermissionGroup[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: {
      BillPay: ['view', 'edit', 'delete', 'process', 'approve', 'export', 'create'],
      Client: ['view', 'edit', 'delete', 'create'],
      MoneyDesktop: ['view', 'process'],
      Users: ['view', 'edit', 'delete', 'create'],
      Security: ['view', 'edit'],
      Settings: ['view', 'edit'],
      Reports: ['view', 'export']
    },
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: 2,
    name: 'Payment Processor',
    description: 'Process and approve payments',
    permissions: {
      BillPay: ['view', 'process', 'approve', 'export'],
      Client: ['view'],
      Reports: ['view', 'export']
    },
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z',
    createdBy: 'system',
    updatedBy: 'system'
  }
];

export const permissionHandlers = [
  // Get permission groups
  http.get('*/permission-groups', ({ request }) => {
    console.log('MSW: Handling get permission groups request');
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm') || '';
    const hasPermission = url.searchParams.get('hasPermission');

    let filteredGroups = [...mockGroups];

    // Apply filters
    if (searchTerm) {
      filteredGroups = filteredGroups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (hasPermission) {
      filteredGroups = filteredGroups.filter(group => {
        return Object.entries(group.permissions).some(([category, actions]) =>
          actions.includes(hasPermission as PermissionAction)
        );
      });
    }

    console.log('MSW: Returning filtered groups', filteredGroups);

    return HttpResponse.json({
      success: true,
      data: {
        groups: filteredGroups,
        total: filteredGroups.length
      }
    });
  }),

  // Get permission group by ID
  http.get('*/permission-groups/:id', ({ params }) => {
    console.log('MSW: Handling get permission group request', params);
    const { id } = params;
    const group = mockGroups.find(g => g.id === Number(id));

    if (!group) {
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: Returning group', group);

    return HttpResponse.json({
      success: true,
      data: group
    });
  }),

  // Create permission group
  http.post('*/permission-groups', async ({ request }) => {
    console.log('MSW: Handling create permission group request');
    const input = await request.json() as PermissionGroupInput;

    const newGroup: PermissionGroup = {
      id: mockGroups.length + 1,
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system'
    };

    mockGroups.push(newGroup);
    console.log('MSW: Created new group', newGroup);

    return HttpResponse.json({
      success: true,
      data: newGroup
    });
  }),

  // Update permission group
  http.put('*/permission-groups/:id', async ({ params, request }) => {
    console.log('MSW: Handling update permission group request', params);
    const { id } = params;
    const input = await request.json() as PermissionGroupInput;

    const index = mockGroups.findIndex(g => g.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedGroup: PermissionGroup = {
      ...mockGroups[index],
      ...input,
      updatedAt: new Date().toISOString(),
      updatedBy: 'system'
    };

    mockGroups[index] = updatedGroup;
    console.log('MSW: Updated group', updatedGroup);

    return HttpResponse.json({
      success: true,
      data: updatedGroup
    });
  }),

  // Delete permission group
  http.delete('*/permission-groups/:id', ({ params }) => {
    console.log('MSW: Handling delete permission group request', params);
    const { id } = params;

    const index = mockGroups.findIndex(g => g.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockGroups.splice(index, 1);
    console.log('MSW: Deleted group', id);

    return HttpResponse.json({
      success: true,
      data: null
    });
  }),

  // Get available permissions
  http.get('*/permission-groups/permissions', () => {
    console.log('MSW: Handling get permissions request');
    console.log('MSW: Returning permissions', mockPermissions);

    return HttpResponse.json({
      success: true,
      data: mockPermissions
    });
  })
];
