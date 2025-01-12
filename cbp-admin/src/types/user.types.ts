import { BaseEntity } from './common.types';
import { PaginationOptions, PaginatedResponse } from './index';

export interface User extends BaseEntity {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    lastLogin: string | null;
    locked: boolean;
    groups?: string[];
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type UserRole = 'admin' | 'user' | 'manager' | 'readonly';

export interface UserGroup {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    members: number;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    language: string;
    timezone: string;
    dateFormat: string;
    displayDensity: 'comfortable' | 'compact';
}

export interface UserSession {
    id: string;
    userId: string;
    token: string;
    refreshToken: string;
    expiresAt: string;
    lastActivity: string;
    ipAddress: string;
    userAgent: string;
}

export interface UserFilters extends PaginationOptions {
    status?: UserStatus;
    role?: UserRole;
    groupId?: string;
    search?: string;
    lastLoginAfter?: string;
    lastLoginBefore?: string;
}

export interface UserStats {
    totalLogins: number;
    lastActiveDate: string;
    failedLoginAttempts: number;
    accountCreatedAt: string;
    lastPasswordChange: string;
    groupCount: number;
    activeSessionCount: number;
}

export type UsersResponse = PaginatedResponse<User>;
