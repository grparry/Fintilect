import { IUserService } from '../../interfaces/IUserService';
import { User, UserGroup, PaginatedResponse } from '../../../types/client.types';
import { BaseMockService } from './BaseMockService';

export class MockUserService extends BaseMockService implements IUserService {
  private users: Map<number, User>;
  private userGroups: Map<number, Set<number>>;

  constructor(basePath: string = '/api/v1/users') {
    super(basePath);
    this.users = new Map();
    this.userGroups = new Map();

    // Add some mock data
    this.users.set(1, {
      id: 1,
      tenantId: 1,
      isActive: true,
      creationDate: '2025-01-01T00:00:00Z',
      lastLogin: '2025-02-21T00:00:00Z',
      clientId: 1,
      firstName: 'John',
      lastName: 'Doe',
      department: 'Engineering',
      isLocked: false,
      username: 'john.doe',
      email: 'john.doe@example.com',
      mobilePhone: '123-456-7890',
      externalId: 'external-id-1'
    });

    this.users.set(2, {
      id: 2,
      tenantId: 1,
      isActive: true,
      creationDate: '2025-01-02T00:00:00Z',
      clientId: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'Finance',
      isLocked: false,
      username: 'jane.smith',
      email: 'jane.smith@example.com',
      mobilePhone: '987-654-3210',
      externalId: 'external-id-2'
    });

    // Add mock group assignments
    this.userGroups.set(1, new Set([1, 2])); // User 1 is in groups 1 and 2
    this.userGroups.set(2, new Set([1]));    // User 2 is in group 1
  }

  async getUser(userId: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    return user;
  }

  async getUsers(params?: {
    clientId?: number;
    isActive?: boolean;
    isLocked?: boolean;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    let filteredUsers = Array.from(this.users.values()).filter(user => {
      if (params?.clientId && user.clientId !== params.clientId) return false;
      if (params?.isActive !== undefined && user.isActive !== params.isActive) return false;
      if (params?.isLocked !== undefined && user.isLocked !== params.isLocked) return false;
      if (params?.searchTerm) {
        const searchLower = params.searchTerm.toLowerCase();
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        if (!fullName.includes(searchLower)) return false;
      }
      return true;
    });

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);

    return {
      items: paginatedUsers,
      total,
      page,
      limit,
      totalPages
    };
  }

  async createUser(user: Omit<User, 'id' | 'creationDate' | 'lastLogin'>): Promise<User> {
    const newId = Math.max(...Array.from(this.users.keys())) + 1;
    const now = new Date().toISOString();

    const newUser: User = {
      id: newId,
      username: user.username,
      tenantId: user.tenantId,
      isActive: true,
      creationDate: now,
      lastLogin: undefined,
      clientId: user.clientId,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      isLocked: false,
      email: user.email,
      mobilePhone: user.mobilePhone,
      externalId: user.externalId,
      password: user.password
    };

    this.users.set(newId, newUser);
    return newUser;
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    const existingUser = await this.getUser(userId);

    const updatedUser: User = {
      ...existingUser,
      ...user,
      id: existingUser.id,
      username: user.username || existingUser.username,
      tenantId: user.tenantId || existingUser.tenantId,
      clientId: user.clientId || existingUser.clientId,
      firstName: user.firstName || existingUser.firstName,
      lastName: user.lastName || existingUser.lastName,
      department: user.department || existingUser.department,
      isLocked: user.isLocked ?? existingUser.isLocked,
      isActive: user.isActive ?? existingUser.isActive,
      email: user.email || existingUser.email,
      mobilePhone: user.mobilePhone || existingUser.mobilePhone,
      externalId: user.externalId || existingUser.externalId,
      password: user.password || existingUser.password
    };

    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<void> {
    if (!this.users.has(userId)) {
      throw this.createError(`User not found: ${userId}`, 404);
    }
    this.users.delete(userId);
    this.userGroups.delete(userId);
  }

  async getUserGroups(userId: number): Promise<UserGroup[]> {
    const user = await this.getUser(userId);
    const groupIds = this.userGroups.get(userId) || new Set();
    return Array.from(groupIds).map(groupId => ({
      userId: user.id,
      groupId
    }));
  }
}