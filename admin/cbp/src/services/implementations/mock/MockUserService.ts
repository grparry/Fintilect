import { IUserService } from '../../interfaces/IUserService';
import { 
    User,
    UserGroup,
    UserPreferences,
    UserStatus, 
    UserRole, 
    UserFilters, 
    UserStats,
    Permission 
} from '../../../types/client.types';
import { PaginatedResponse } from '../../../types/common.types';
import { QueryOptions } from '../../../types/index';
import { BaseMockService } from './BaseMockService';
import { mockUsers } from './data/users/mockUserData';

/**
 * Mock implementation of UserService
 */
export class MockUserService extends BaseMockService implements IUserService {
  private users: User[] = [...mockUsers];
  private userGroups: Map<string, UserGroup[]> = new Map();
  private userPreferences: Map<string, UserPreferences> = new Map();
  constructor(basePath: string = '/api/v1/users') {
    super(basePath);
  }
  async getUser(userId: string): Promise<User> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    return user;
  }
  async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
    const page = queryParams.pagination?.page || 1;
    const limit = queryParams.pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const filteredUsers = this.users;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      items: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit)
    };
  }
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: String(this.users.length + 1),
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    const updatedUser = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }
  async deleteUser(userId: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    this.users.splice(index, 1);
  }
  async getUsersByGroup(groupId: string, queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
    const page = queryParams.pagination?.page || 1;
    const limit = queryParams.pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const usersInGroup = this.users.filter(user => {
      const groups = this.userGroups.get(user.id) || [];
      return groups.some(g => g.id === groupId);
    });
    const paginatedUsers = usersInGroup.slice(startIndex, endIndex);

    return {
      items: paginatedUsers,
      total: usersInGroup.length,
      page,
      limit,
      totalPages: Math.ceil(usersInGroup.length / limit)
    };
  }
  async getUserGroups(userId: string): Promise<UserGroup[]> {
    return this.userGroups.get(userId) || [];
  }
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    const defaultPreferences: UserPreferences = {
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
    return this.userPreferences.get(userId) || defaultPreferences;
  }
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const currentPrefs = await this.getUserPreferences(userId);
    const updatedPrefs = { ...currentPrefs, ...preferences };
    this.userPreferences.set(userId, updatedPrefs);
    return updatedPrefs;
  }
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    return this.updateUser(userId, { roles: [role] });
  }
  async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
    return this.updateUser(userId, { status });
  }
  async userExists(userId: string): Promise<boolean> {
    return this.users.some(u => u.id === userId);
  }
  async searchUsers(filters: UserFilters): Promise<{ users: User[], total: number }> {
    let filteredUsers = [...this.users];
    if (filters.status) {
      filteredUsers = filteredUsers.filter(u => u.status === filters.status);
    }
    if (filters.role) {
      filteredUsers = filteredUsers.filter(user => 
        user.roles.includes(filters.role as string)
      );
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
    return {
      users: filteredUsers,
      total: filteredUsers.length
    };
  }
  async getUserStats(userId: string): Promise<UserStats> {
    if (!this.users.some(u => u.id === userId)) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    return {
      totalLogins: Math.floor(Math.random() * 100),
      lastActiveDate: new Date().toISOString(),
      failedLoginAttempts: Math.floor(Math.random() * 5),
      accountCreatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      lastPasswordChange: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      groupCount: this.userGroups.get(userId)?.length || 0,
      activeSessionCount: Math.floor(Math.random() * 3)
    };
  }
  async addUserToGroup(userId: string, groupId: string): Promise<void> {
    const userGroups = this.userGroups.get(userId) || [];
    if (!userGroups.find(g => g.id === groupId)) {
      const newGroup: UserGroup = {
        id: groupId,
        name: `Group ${groupId}`,
        description: 'Auto-generated group',
        clientId: userId.split('-')[0], 
        roles: [], 
        permissions: [], 
        members: [],
        users: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      userGroups.push(newGroup);
      this.userGroups.set(userId, userGroups);
    }
  }
  async removeUserFromGroup(userId: string, groupId: string): Promise<void> {
    const userGroups = this.userGroups.get(userId) || [];
    const updatedGroups = userGroups.filter(g => g.id !== groupId);
    this.userGroups.set(userId, updatedGroups);
  }
}