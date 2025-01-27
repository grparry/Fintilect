import { IUserService } from '@/../interfaces/IUserService';
import { User, UserGroup, UserPreferences, UserStatus } from '@/../../types/client.types';
import { PaginatedResponse, QueryOptions } from '@/../../types/index';
import { BaseService } from '@/BaseService';

export class UserService extends BaseService implements IUserService {
    constructor(basePath: string = '/api/v1/users') {
        super(basePath);
    }

    async getUser(userId: string): Promise<User> {
        return this.get<User>(`/${userId}`);
    }

    async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
        const response = await this.get<PaginatedResponse<User>>('', {
            page: queryParams.pagination?.page || 1,
            limit: queryParams.pagination?.limit || 10,
            ...queryParams.filter,
            ...queryParams.sort?.field && { sortBy: queryParams.sort.field },
            ...queryParams.sort?.direction && { sortOrder: queryParams.sort.direction }
        });
        return response;
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return this.post<User>('', user);
    }

    async updateUser(userId: string, user: Partial<User>): Promise<User> {
        return this.put<User>(`/${userId}`, user);
    }

    async userExists(userId: string): Promise<boolean> {
        try {
            await this.getUser(userId);
            return true;
        } catch (error: any) {
            if (error?.status === 404) {
                return false;
            }
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<void> {
        return this.delete(`/${userId}`);
    }

    async getUserGroups(userId: string): Promise<UserGroup[]> {
        return this.get<UserGroup[]>(`/${userId}/groups`);
    }

    async addUserToGroup(userId: string, groupId: string): Promise<void> {
        return this.post(`/${userId}/groups/${groupId}`);
    }

    async removeUserFromGroup(userId: string, groupId: string): Promise<void> {
        return this.delete(`/${userId}/groups/${groupId}`);
    }

    async getUserPreferences(userId: string): Promise<UserPreferences> {
        return this.get<UserPreferences>(`/${userId}/preferences`);
    }

    async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
        return this.put<UserPreferences>(`/${userId}/preferences`, preferences);
    }

    async getUsersByGroup(groupId: string, queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
        const response = await this.get<PaginatedResponse<User>>(`/groups/${groupId}`, {
            page: queryParams.pagination?.page || 1,
            limit: queryParams.pagination?.limit || 10,
            ...queryParams.filter,
            ...queryParams.sort?.field && { sortBy: queryParams.sort.field },
            ...queryParams.sort?.direction && { sortOrder: queryParams.sort.direction }
        });
        return response;
    }

    async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
        return this.put<User>(`/${userId}/status`, { status });
    }
}
