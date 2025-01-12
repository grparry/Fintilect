import { IUserService } from '../../interfaces/IUserService';
import { BaseService } from './BaseService';
import {
  User,
  UserGroup,
  UserPreferences,
  UserStatus,
  UserRole,
  UsersResponse,
  UserFilters,
  UserStats
} from '../../../types/user.types';
import { PaginatedResponse, QueryOptions } from '../../../types/api.types';

/**
 * Real implementation of UserService
 */
export class UserService extends BaseService implements IUserService {
  constructor() {
    super('/api/v1/users');
  }

  /**
   * Get user by ID
   */
  async getUser(userId: string): Promise<User> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.get<User>(`/${userId}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get list of users with pagination
   */
  async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
    try {
      const response = await this.get<PaginatedResponse<User>>('', queryParams);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create new user
   */
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    try {
      this.validateRequired(user, ['username', 'email']);
      const response = await this.post<User>('', user);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update existing user
   */
  async updateUser(userId: string, user: Partial<User>): Promise<User> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.patch<User>(`/${userId}`, user);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      this.validateRequired({ userId }, ['userId']);
      await this.delete(`/${userId}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user's groups
   */
  async getUserGroups(userId: string): Promise<UserGroup[]> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.get<UserGroup[]>(`/${userId}/groups`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update user's groups
   */
  async updateUserGroups(userId: string, groupIds: string[]): Promise<UserGroup[]> {
    try {
      this.validateRequired({ userId, groupIds }, ['userId', 'groupIds']);
      const response = await this.put<UserGroup[]>(`/${userId}/groups`, { groupIds });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.get<UserPreferences>(`/${userId}/preferences`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.patch<UserPreferences>(`/${userId}/preferences`, preferences);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update user status
   */
  async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
    try {
      this.validateRequired({ userId, status }, ['userId', 'status']);
      const response = await this.patch<User>(`/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    try {
      this.validateRequired({ userId, role }, ['userId', 'role']);
      const response = await this.patch<User>(`/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Search users
   */
  async searchUsers(filters: UserFilters): Promise<UsersResponse> {
    try {
      const response = await this.post<UsersResponse>('/search', filters);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<UserStats> {
    try {
      this.validateRequired({ userId }, ['userId']);
      const response = await this.get<UserStats>(`/${userId}/stats`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
