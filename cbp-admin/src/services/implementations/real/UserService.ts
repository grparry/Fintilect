import { injectable, inject } from 'inversify';
import { IUserService } from '../../interfaces/IUserService';
import { TYPES } from '../../../types/dependency.types';
import { ApiClient } from '../../../api/ApiClient';
import { User, UserGroup, UserPreferences, UserStats, UsersResponse } from '../../../types/user.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from '../BaseService';

@injectable()
export class UserService extends BaseService implements IUserService {
    constructor(
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
        @inject(TYPES.BasePath) private readonly basePath: string = '/api/v1/users'
    ) {
        super();
    }

    async createUser(user: Partial<User>): Promise<User> {
        try {
            const response = await this.apiClient.post<User>(`${this.basePath}`, user);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUsers(params?: { page?: number; limit?: number }): Promise<PaginatedResponse<User[]>> {
        try {
            const response = await this.apiClient.get<PaginatedResponse<User[]>>(`${this.basePath}`, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUser(userId: string): Promise<User> {
        try {
            const response = await this.apiClient.get<User>(`${this.basePath}/${userId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<User> {
        try {
            const response = await this.apiClient.patch<User>(`${this.basePath}/${userId}`, updates);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await this.apiClient.delete(`${this.basePath}/${userId}`);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserGroups(userId: string): Promise<UserGroup[]> {
        try {
            const response = await this.apiClient.get<UserGroup[]>(`${this.basePath}/${userId}/groups`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async addUserToGroup(userId: string, groupId: string): Promise<void> {
        try {
            await this.apiClient.post(`${this.basePath}/${userId}/groups/${groupId}`);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async removeUserFromGroup(userId: string, groupId: string): Promise<void> {
        try {
            await this.apiClient.delete(`${this.basePath}/${userId}/groups/${groupId}`);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserPreferences(userId: string): Promise<UserPreferences> {
        try {
            const response = await this.apiClient.get<UserPreferences>(`${this.basePath}/${userId}/preferences`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
        try {
            const response = await this.apiClient.patch<UserPreferences>(`${this.basePath}/${userId}/preferences`, preferences);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async resetPassword(userId: string, newPassword: string): Promise<User> {
        try {
            const response = await this.apiClient.post<User>(`${this.basePath}/${userId}/reset-password`, { newPassword });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<User> {
        try {
            const response = await this.apiClient.post<User>(`${this.basePath}/${userId}/update-password`, {
                currentPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async searchUsers(query: string): Promise<UsersResponse> {
        try {
            const response = await this.apiClient.get<UsersResponse>(`${this.basePath}/search`, {
                params: { query }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserStats(userId: string): Promise<UserStats> {
        try {
            const response = await this.apiClient.get<UserStats>(`${this.basePath}/${userId}/stats`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async userExists(userId: string): Promise<boolean> {
        try {
            await this.getUser(userId);
            return true;
        } catch (error) {
            if (error.response?.status === 404) {
                return false;
            }
            throw this.handleError(error);
        }
    }

    async getUsersByGroup(groupId: string): Promise<User[]> {
        try {
            const response = await this.apiClient.get<User[]>(`${this.basePath}/groups/${groupId}/users`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
}
