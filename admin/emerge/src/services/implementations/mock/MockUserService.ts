import { IUserService } from '../../interfaces/IUserService';
import { 
    User,
    UserGroup,
    UserPreferences,
    UserFilters,
    UserStats,
    UserStatus
} from '../../../types/user.types';
import { PaginatedResponse } from '../../../types/api.types';
import { QueryOptions } from '../../../types/index';
import { BaseMockService } from './BaseMockService';
import { mockUsers } from './data/users/mockUserData';

export class MockUserService extends BaseMockService implements IUserService {
    private users: User[] = mockUsers;

    async getUser(userId: string): Promise<User> {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
        const page = queryParams.pagination?.page || 1;
        const limit = queryParams.pagination?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        let filteredUsers = [...this.users];

        // Apply filters
        if (queryParams.filters) {
            const { status, search } = queryParams.filters as UserFilters;
            if (status) {
                filteredUsers = filteredUsers.filter(u => u.status === status);
            }
            if (search) {
                const searchLower = search.toLowerCase();
                filteredUsers = filteredUsers.filter(u => 
                    u.username.toLowerCase().includes(searchLower) ||
                    u.firstName.toLowerCase().includes(searchLower) ||
                    u.lastName.toLowerCase().includes(searchLower)
                );
            }
        }

        // Apply sorting
        if (queryParams.sort) {
            const { field, direction } = queryParams.sort;
            filteredUsers.sort((a, b) => {
                const aValue = a[field as keyof User];
                const bValue = b[field as keyof User];
                return direction === 'asc' 
                    ? String(aValue).localeCompare(String(bValue))
                    : String(bValue).localeCompare(String(aValue));
            });
        }

        return {
            items: filteredUsers.slice(start, end),
            pagination: {
                total: filteredUsers.length,
                page,
                limit,
                pages: Math.ceil(filteredUsers.length / limit)
            }
        };
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const newUser: User = {
            ...user,
            id: Math.random().toString(36).substring(7),
        };
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(userId: string, user: Partial<User>): Promise<User> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users[index] = { ...this.users[index], ...user };
        return this.users[index];
    }

    async deleteUser(userId: string): Promise<void> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users.splice(index, 1);
    }

    async getUserGroups(userId: string): Promise<UserGroup[]> {
        // Mock implementation returning empty groups
        return [];
    }

    async addUserToGroup(userId: string, groupId: string): Promise<void> {
        // Mock implementation - no-op
    }

    async removeUserFromGroup(userId: string, groupId: string): Promise<void> {
        // Mock implementation - no-op
    }

    async getUserPreferences(userId: string): Promise<UserPreferences> {
        return {
            theme: 'light',
            language: 'en',
            notifications: {
                email: true,
                sms: false
            }
        };
    }

    async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
        return {
            theme: preferences.theme || 'light',
            language: preferences.language || 'en',
            notifications: {
                email: preferences.notifications?.email ?? true,
                sms: preferences.notifications?.sms ?? false
            }
        };
    }

    async getUserStats(userId: string): Promise<UserStats> {
        return {
            totalUsers: this.users.length,
            activeUsers: this.users.filter(u => u.status === 'active').length,
            inactiveUsers: this.users.filter(u => u.status === 'inactive').length,
            suspendedUsers: this.users.filter(u => u.status === 'suspended').length
        };
    }

    async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
        const user = await this.getUser(userId);
        return this.updateUser(userId, { ...user, status });
    }

    async userExists(userId: string): Promise<boolean> {
        return this.users.some(u => u.id === userId);
    }

    async getUsersByGroup(groupId: string, queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
        // Mock implementation - return empty paginated response
        return {
            items: [],
            pagination: {
                total: 0,
                page: queryParams.pagination?.page || 1,
                limit: queryParams.pagination?.limit || 10,
                pages: 0
            }
        };
    }
}