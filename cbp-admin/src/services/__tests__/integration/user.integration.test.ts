import { api, type ApiResponse } from '../../../utils/api';
import { userService } from '../../user.service';
import type {
  User,
  UserPreferences,
  UserSession,
  UserStats,
  UsersResponse,
} from '../../../types';

// Mock the API client
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('User Service Integration', () => {
  const mockUser: User = {
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    permissionGroup: 'User',
    lastLogin: '2025-01-09T22:24:59.544Z',
    locked: false,
  };

  const mockPreferences: UserPreferences = {
    theme: 'dark',
    notifications: true,
    language: 'en',
  };

  const mockSession: UserSession = {
    token: 'jwt-token',
    refreshToken: 'refresh-token',
    expiresAt: '2025-01-09T22:24:59.544Z',
  };

  const mockStats: UserStats = {
    totalLogins: 42,
    lastActiveDate: '2025-01-09T22:24:59.544Z',
    failedLoginAttempts: 0,
    accountCreatedAt: '2025-01-09T22:24:59.544Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Management', () => {
    it('should get users with filters', async () => {
      const mockResponse: ApiResponse<UsersResponse> = {
        success: true,
        data: {
          items: [mockUser],
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const filters = {
        page: 1,
        limit: 10,
        status: 'Active',
        role: 'User',
        search: 'John',
      };

      const response = await userService.getUsers(filters);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/users', { params: filters });
    });

    it('should get a single user', async () => {
      const mockResponse = {
        success: true,
        data: mockUser,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.getUser(1);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/users/1');
    });

    it('should create a user', async () => {
      const mockResponse = {
        success: true,
        data: mockUser,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: 'Active' as const,
        permissionGroup: 'User' as const,
      };

      const response = await userService.createUser(userData);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users', userData);
    });

    it('should update a user', async () => {
      const mockResponse = {
        success: true,
        data: mockUser,
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = {
        firstName: 'Johnny',
        lastName: 'Doeson',
      };

      const response = await userService.updateUser(1, updateData);
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/users/1', updateData);
    });

    it('should delete a user', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.deleteUser(1);
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/users/1');
    });
  });

  describe('User Status and Role', () => {
    it('should update user status', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockUser, status: 'Inactive' },
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.updateUserStatus(1, 'Inactive');
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/users/1/status', { status: 'Inactive' });
    });

    it('should update user role', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockUser, permissionGroup: 'Admin' },
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.updateUserRole(1, 'Admin');
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/users/1/role', { role: 'Admin' });
    });
  });

  describe('User Preferences', () => {
    it('should get user preferences', async () => {
      const mockResponse = {
        success: true,
        data: mockPreferences,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.getUserPreferences(1);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/users/1/preferences');
    });

    it('should update user preferences', async () => {
      const mockResponse = {
        success: true,
        data: mockPreferences,
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const preferences = {
        theme: 'light' as const,
        notifications: false,
      };

      const response = await userService.updateUserPreferences(1, preferences);
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/users/1/preferences', preferences);
    });
  });

  describe('Session Management', () => {
    it('should get user session', async () => {
      const mockResponse = {
        success: true,
        data: mockSession,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.getUserSession(1);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/users/1/session');
    });

    it('should invalidate session', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.invalidateSession(1);
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/users/1/session');
    });

    it('should refresh session', async () => {
      const mockResponse = {
        success: true,
        data: mockSession,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.refreshSession('refresh-token');
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/refresh-session', { refreshToken: 'refresh-token' });
    });
  });

  describe('Account Security', () => {
    it('should lock user account', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockUser, locked: true },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.lockUser(1);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/1/lock', {});
    });

    it('should unlock user account', async () => {
      const mockResponse = {
        success: true,
        data: { ...mockUser, locked: false },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.unlockUser(1);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/1/unlock', {});
    });

    it('should reset password', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.resetPassword(1);
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/1/reset-password', {});
    });

    it('should change password', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.changePassword(1, 'oldpass', 'newpass');
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/1/change-password', {
        currentPassword: 'oldpass',
        newPassword: 'newpass',
      });
    });
  });

  describe('User Statistics', () => {
    it('should get user statistics', async () => {
      const mockResponse = {
        success: true,
        data: mockStats,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.getUserStats(1);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/users/1/stats');
    });
  });

  describe('Authentication', () => {
    it('should authenticate user', async () => {
      const mockResponse = {
        success: true,
        data: mockSession,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await userService.authenticate('johndoe', 'password123');
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/users/authenticate', {
        username: 'johndoe',
        password: 'password123',
      });
    });
  });
});
