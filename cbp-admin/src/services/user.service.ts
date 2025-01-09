import { api } from '../utils/api';
import type { ApiResponse } from '../utils/api';
import type {
  User,
  CreateUserData,
  UpdateUserData,
  UserStatus,
  UserRole,
  UsersResponse,
  UserFilters,
  UserPreferences,
  UserSession,
  UserStats,
} from '../types';

/**
 * Service for managing users in the application
 */
class UserService {
  private readonly basePath = '/users';

  /**
   * Get a list of users with optional filters
   */
  async getUsers(filters: UserFilters): Promise<ApiResponse<UsersResponse>> {
    return api.get(`${this.basePath}`, { params: filters });
  }

  /**
   * Get a single user by ID
   */
  async getUser(userId: number): Promise<ApiResponse<User>> {
    return api.get(`${this.basePath}/${userId}`);
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserData): Promise<ApiResponse<User>> {
    return api.post(`${this.basePath}`, data);
  }

  /**
   * Update an existing user
   */
  async updateUser(userId: number, data: Partial<UpdateUserData>): Promise<ApiResponse<User>> {
    return api.patch(`${this.basePath}/${userId}`, data);
  }

  /**
   * Delete a user
   */
  async deleteUser(userId: number): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${userId}`);
  }

  /**
   * Update user status
   */
  async updateUserStatus(userId: number, status: UserStatus): Promise<ApiResponse<User>> {
    return api.patch(`${this.basePath}/${userId}/status`, { status });
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: number, role: UserRole): Promise<ApiResponse<User>> {
    return api.patch(`${this.basePath}/${userId}/role`, { role });
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: number): Promise<ApiResponse<UserPreferences>> {
    return api.get(`${this.basePath}/${userId}/preferences`);
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: number, preferences: Partial<UserPreferences>): Promise<ApiResponse<UserPreferences>> {
    return api.patch(`${this.basePath}/${userId}/preferences`, preferences);
  }

  /**
   * Get user session
   */
  async getUserSession(userId: number): Promise<ApiResponse<UserSession>> {
    return api.get(`${this.basePath}/${userId}/session`);
  }

  /**
   * Invalidate user session (logout)
   */
  async invalidateSession(userId: number): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${userId}/session`);
  }

  /**
   * Lock user account
   */
  async lockUser(userId: number): Promise<ApiResponse<User>> {
    return api.post(`${this.basePath}/${userId}/lock`, {});
  }

  /**
   * Unlock user account
   */
  async unlockUser(userId: number): Promise<ApiResponse<User>> {
    return api.post(`${this.basePath}/${userId}/unlock`, {});
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: number): Promise<ApiResponse<UserStats>> {
    return api.get(`${this.basePath}/${userId}/stats`);
  }

  /**
   * Reset user password
   */
  async resetPassword(userId: number): Promise<ApiResponse<void>> {
    return api.post(`${this.basePath}/${userId}/reset-password`, {});
  }

  /**
   * Change user password
   */
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return api.post(`${this.basePath}/${userId}/change-password`, {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Authenticate user
   */
  async authenticate(username: string, password: string): Promise<ApiResponse<UserSession>> {
    return api.post(`${this.basePath}/authenticate`, {
      username,
      password,
    });
  }

  /**
   * Refresh user session
   */
  async refreshSession(refreshToken: string): Promise<ApiResponse<UserSession>> {
    return api.post(`${this.basePath}/refresh-session`, {
      refreshToken,
    });
  }
}

// Export singleton instance
export const userService = new UserService();
