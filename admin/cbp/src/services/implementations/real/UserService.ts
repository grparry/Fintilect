import { IUserService } from '../../interfaces/IUserService';
import { User, UserGroup, PaginatedResponse } from '../../../types/client.types';
import { BaseService } from './BaseService';

export class UserService extends BaseService implements IUserService {
  constructor(basePath: string = '/api/v1/users') {
    super(basePath);
  }

  async getUser(userId: number): Promise<User> {
    return this.get<User>(`/${userId}`);
  }

  async getUsers(params?: {
    clientId?: number;
    isActive?: boolean;
    isLocked?: boolean;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    return this.get<PaginatedResponse<User>>('', { params });
  }

  async createUser(user: Omit<User, 'id' | 'creationDate' | 'lastLogin'>): Promise<User> {
    return this.post<User>('', user);
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    return this.put<User>(`/${userId}`, user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(`/${userId}`);
  }

  async getUserGroups(userId: number): Promise<UserGroup[]> {
    return this.get<UserGroup[]>(`/${userId}/groups`);
  }
}