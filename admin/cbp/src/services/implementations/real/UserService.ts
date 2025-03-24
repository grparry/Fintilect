import { IUserService } from '../../interfaces/IUserService';
import { User, UserGroup, UserListResponse } from '../../../types/client.types';
import { BaseService } from './BaseService';

export class UserService extends BaseService implements IUserService {
  constructor(basePath: string = '/api') {
    super(basePath);
  }

  async getUser(userId: number): Promise<User> {
    return this.get<User>(`/User/${userId}`);
  }

  async getUsers(params?: {
    clientId?: number;
    isActive?: boolean;
    isLocked?: boolean;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<UserListResponse> {
    return this.get<UserListResponse>('/User', { params });
  }

  async createUser(user: Omit<User, 'id' | 'creationDate' | 'lastLogin'>): Promise<User> {
    return this.post<User>('/User', user);
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    // Ensure the user ID is included in the request body
    const userData = { ...user, id: userId };
    return this.put<User>('/User', userData);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(`/User/${userId}`);
  }

  async getUserGroups(userId: number): Promise<UserGroup[]> {
    return this.get<UserGroup[]>(`/UserGroup/user/${userId}/groups`);
  }

  async lockUser(userId: number): Promise<User> {
    return this.put<User>(`/User/${userId}/lock`, {});
  }

  async unlockUser(userId: number): Promise<User> {
    return this.put<User>(`/User/${userId}/unlock`, {});
  }

  async changePassword(params: {
    userId: number;
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.put(`/User/${params.userId}/password`, {
      currentPassword: params.currentPassword,
      newPassword: params.newPassword
    });
  }

  async resetPassword(params: {
    userId: number;
    newPassword: string;
  }): Promise<void> {
    // Send password in the request body as per the API specification
    const requestBody = {
      newPassword: params.newPassword
    };
    
    await this.put(`/User/${params.userId}/reset-password`, requestBody);
  }
}