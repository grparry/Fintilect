import { IUserService } from '../../interfaces/IUserService';
import { BaseMockService } from './BaseMockService';
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
import { mockUsers } from './data/client/mockClientData';

/**
 * Mock implementation of UserService
 */
export class MockUserService extends BaseMockService implements IUserService {
  private users: User[] = [...mockUsers];
  private userGroups: Map<string, UserGroup[]> = new Map();
  private userPreferences: Map<string, UserPreferences> = new Map();

  constructor() {
    super('/api/v1/users');
  }

  /**
   * Get user by ID
   */
  async getUser(userId: string): Promise<User> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    const user = this.users.find(u => u.id === userId);
    if (!user) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    return this.createResponse(user).data;
  }

  /**
   * Get list of users with pagination
   */
  async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
    await this.delay();

    const { page = 1, pageSize = 10 } = queryParams;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = this.users.slice(start, end);

    return this.createResponse({
      items,
      meta: {
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(this.users.length / pageSize),
        totalCount: this.users.length
      }
    }).data;
  }

  /**
   * Create new user
   */
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    await this.delay();
    this.validateRequired(user, ['username', 'email']);

    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as User;

    this.users.push(newUser);
    return this.createResponse(newUser).data;
  }

  /**
   * Update existing user
   */
  async updateUser(userId: string, user: Partial<User>): Promise<User> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    const updatedUser = {
      ...this.users[index],
      ...user,
      updatedAt: new Date().toISOString()
    };

    this.users[index] = updatedUser;
    return this.createResponse(updatedUser).data;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    this.users.splice(index, 1);
    this.userGroups.delete(userId);
    this.userPreferences.delete(userId);
  }

  /**
   * Get user's groups
   */
  async getUserGroups(userId: string): Promise<UserGroup[]> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    if (!this.users.some(u => u.id === userId)) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    return this.createResponse(this.userGroups.get(userId) || []).data;
  }

  /**
   * Update user's groups
   */
  async updateUserGroups(userId: string, groupIds: string[]): Promise<UserGroup[]> {
    await this.delay();
    this.validateRequired({ userId, groupIds }, ['userId', 'groupIds']);

    if (!this.users.some(u => u.id === userId)) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    const groups: UserGroup[] = groupIds.map(id => ({
      id,
      name: `Group ${id}`,
      description: `Mock group ${id}`,
      permissions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: 1
    }));

    this.userGroups.set(userId, groups);
    return this.createResponse(groups).data;
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    if (!this.users.some(u => u.id === userId)) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    let prefs = this.userPreferences.get(userId);
    if (!prefs) {
      prefs = {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        displayDensity: 'comfortable'
      };
      this.userPreferences.set(userId, prefs);
    }

    return this.createResponse(prefs).data;
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    if (!this.users.some(u => u.id === userId)) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    const currentPrefs = await this.getUserPreferences(userId);
    const updatedPrefs = {
      ...currentPrefs,
      ...preferences
    };

    this.userPreferences.set(userId, updatedPrefs);
    return this.createResponse(updatedPrefs).data;
  }

  /**
   * Update user status
   */
  async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
    await this.delay();
    this.validateRequired({ userId, status }, ['userId', 'status']);

    return this.updateUser(userId, { status });
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    await this.delay();
    this.validateRequired({ userId, role }, ['userId', 'role']);

    return this.updateUser(userId, { role });
  }

  /**
   * Search users
   */
  async searchUsers(filters: UserFilters): Promise<UsersResponse> {
    await this.delay();

    let filteredUsers = [...this.users];

    if (filters.status) {
      filteredUsers = filteredUsers.filter(u => u.status === filters.status);
    }
    if (filters.role) {
      filteredUsers = filteredUsers.filter(u => u.role === filters.role);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(u =>
        u.username.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.firstName?.toLowerCase().includes(search) ||
        u.lastName?.toLowerCase().includes(search)
      );
    }

    return this.createResponse({
      users: filteredUsers,
      total: filteredUsers.length
    }).data;
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<UserStats> {
    await this.delay();
    this.validateRequired({ userId }, ['userId']);

    if (!this.users.some(u => u.id === userId)) {
      return this.createError(`User not found: ${userId}`, 404);
    }

    return this.createResponse({
      totalLogins: Math.floor(Math.random() * 100),
      lastActiveDate: new Date().toISOString(),
      failedLoginAttempts: Math.floor(Math.random() * 5),
      accountCreatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      lastPasswordChange: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      groupCount: this.userGroups.get(userId)?.length || 0,
      activeSessionCount: Math.floor(Math.random() * 3)
    }).data;
  }
}
