import { api } from '../../../utils/api';
import { clientService, type Client, type ClientSettings } from '../../clients.service';

// Mock the API client
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Client Service Integration', () => {
  const mockClient: Client = {
    id: 'client_1',
    name: 'Test Client',
    type: 'ENTERPRISE',
    status: 'ACTIVE',
    environment: 'PRODUCTION',
  };

  const mockSettings: ClientSettings = {
    general: {
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      language: 'en',
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90,
      },
      loginPolicy: {
        maxAttempts: 5,
        lockoutDuration: 30,
      },
      sessionTimeout: 30,
      mfaEnabled: true,
      ipWhitelist: ['192.168.1.1'],
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: false,
      frequency: 'realtime',
      alertTypes: ['payment', 'security'],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Client Management', () => {
    it('should get clients with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockClient],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getClients(1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients?page=1&limit=20');
    });

    it('should get a single client', async () => {
      const mockResponse = {
        success: true,
        data: mockClient,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getClient('client_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1');
    });

    it('should create a client', async () => {
      const mockResponse = {
        success: true,
        data: mockClient,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const newClient = {
        name: 'Test Client',
        type: 'ENTERPRISE' as const,
        status: 'ACTIVE' as const,
        environment: 'PRODUCTION' as const,
      };

      const response = await clientService.createClient(newClient);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/clients', newClient);
    });

    it('should update a client', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockClient, name: 'Updated Client' },
      };

      (api.put as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = { name: 'Updated Client' };
      const response = await clientService.updateClient('client_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalledWith('/clients/client_1', updateData);
    });

    it('should delete a client', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.deleteClient('client_1');
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/clients/client_1');
    });
  });

  describe('Client Settings', () => {
    it('should get client settings', async () => {
      const mockResponse = {
        success: true,
        data: mockSettings,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getClientSettings('client_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1/settings');
    });

    it('should update client settings', async () => {
      const mockResponse = {
        success: true,
        data: {
          ...mockSettings,
          general: { ...mockSettings.general, timezone: 'America/Los_Angeles' },
        },
      };

      (api.put as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = {
        general: { timezone: 'America/Los_Angeles' },
      };

      const response = await clientService.updateClientSettings('client_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalledWith('/clients/client_1/settings', updateData);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors', async () => {
      const errorResponse = {
        success: false,
        error: {
          code: '404',
          message: 'Client not found',
        },
      };

      (api.get as jest.Mock).mockResolvedValue(errorResponse);

      const response = await clientService.getClient('non_existent');
      expect(response).toEqual(errorResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/non_existent');
    });
  });

  describe('User Management', () => {
    const mockUser = {
      id: 'user_1',
      clientId: 'client_1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      status: 'ACTIVE' as const,
      role: 'admin',
      createdAt: '2025-01-09T22:24:59.544Z',
      updatedAt: '2025-01-09T22:24:59.544Z',
    };

    it('should get users with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockUser],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getUsers('client_1', 1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1/users?page=1&limit=20');
    });

    it('should get a single user', async () => {
      const mockResponse = {
        success: true,
        data: mockUser,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getUser('client_1', 'user_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1/users/user_1');
    });

    it('should create a user', async () => {
      const mockResponse = {
        success: true,
        data: mockUser,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        status: 'ACTIVE' as const,
        role: 'admin',
      };

      const response = await clientService.createUser('client_1', userData);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/clients/client_1/users', userData);
    });

    it('should update a user', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockUser, firstName: 'Updated' },
      };

      (api.put as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = { firstName: 'Updated' };
      const response = await clientService.updateUser('client_1', 'user_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalledWith('/clients/client_1/users/user_1', updateData);
    });

    it('should delete a user', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.deleteUser('client_1', 'user_1');
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/clients/client_1/users/user_1');
    });
  });

  describe('Group Management', () => {
    const mockGroup = {
      id: 'group_1',
      clientId: 'client_1',
      name: 'Test Group',
      description: 'Test group description',
      members: ['user_1'],
      permissions: ['read:clients', 'write:clients'],
      createdAt: '2025-01-09T22:24:59.544Z',
      updatedAt: '2025-01-09T22:24:59.544Z',
    };

    it('should get groups with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockGroup],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getGroups('client_1', 1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1/groups?page=1&limit=20');
    });

    it('should get a single group', async () => {
      const mockResponse = {
        success: true,
        data: mockGroup,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getGroup('client_1', 'group_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/client_1/groups/group_1');
    });

    it('should create a group', async () => {
      const mockResponse = {
        success: true,
        data: mockGroup,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const groupData = {
        name: 'Test Group',
        description: 'Test group description',
        members: ['user_1'],
        permissions: ['read:clients', 'write:clients'],
      };

      const response = await clientService.createGroup('client_1', groupData);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/clients/client_1/groups', groupData);
    });

    it('should update a group', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockGroup, name: 'Updated Group' },
      };

      (api.put as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = { name: 'Updated Group' };
      const response = await clientService.updateGroup('client_1', 'group_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalledWith('/clients/client_1/groups/group_1', updateData);
    });

    it('should delete a group', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.deleteGroup('client_1', 'group_1');
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/clients/client_1/groups/group_1');
    });
  });

  describe('Role Management', () => {
    const mockRole = {
      id: 'role_1',
      name: 'Admin',
      description: 'Administrator role',
      permissions: ['read:all', 'write:all'],
      createdAt: '2025-01-09T22:24:59.544Z',
      updatedAt: '2025-01-09T22:24:59.544Z',
    };

    it('should get roles with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockRole],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getRoles(1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/roles?page=1&limit=20');
    });

    it('should get a single role', async () => {
      const mockResponse = {
        success: true,
        data: mockRole,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getRole('role_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/roles/role_1');
    });

    it('should create a role', async () => {
      const mockResponse = {
        success: true,
        data: mockRole,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const roleData = {
        name: 'Admin',
        description: 'Administrator role',
        permissions: ['read:all', 'write:all'],
      };

      const response = await clientService.createRole(roleData);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/clients/roles', roleData);
    });

    it('should update a role', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockRole, name: 'Super Admin' },
      };

      (api.put as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = { name: 'Super Admin' };
      const response = await clientService.updateRole('role_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.put).toHaveBeenCalledWith('/clients/roles/role_1', updateData);
    });

    it('should delete a role', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.deleteRole('role_1');
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/clients/roles/role_1');
    });
  });

  describe('Permission Management', () => {
    const mockPermissions = [
      {
        id: 'perm_1',
        name: 'read:clients',
        description: 'Read client information',
        category: 'clients',
        scope: 'READ' as const,
      },
      {
        id: 'perm_2',
        name: 'write:clients',
        description: 'Modify client information',
        category: 'clients',
        scope: 'WRITE' as const,
      },
    ];

    it('should get all permissions', async () => {
      const mockResponse = {
        success: true,
        data: mockPermissions,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await clientService.getPermissions();
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/clients/permissions');
    });
  });
});
