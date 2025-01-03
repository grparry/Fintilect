import { User, CreateUserData, UpdateUserData } from '../types/index';
import { UserFilters, UserStats, UsersResponse } from '../types/user.types';
import { ApiSuccessResponse, ApiPaginatedResponse } from '../types/api.types';
import api from './api';

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    permissionGroup: 'Admin',
    lastLogin: '2024-01-15T10:30:00',
    locked: false,
  },
  {
    id: 2,
    username: 'jane.smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    permissionGroup: 'User',
    lastLogin: '2024-01-14T15:45:00',
    locked: true,
  },
];

export const fetchUsers = async (filters?: UserFilters): Promise<ApiPaginatedResponse<User>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockUsers,
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: mockUsers.length,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
          timestamp: new Date().toISOString(),
          requestId: 'mock-request-id',
        },
      });
    }, 500);
  });
};

export const createUser = async (userData: CreateUserData): Promise<ApiSuccessResponse<User>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        ...userData,
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        lastLogin: null,
        locked: false,
      };
      mockUsers.push(newUser);
      resolve({
        success: true,
        data: newUser,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'mock-request-id',
        },
      });
    }, 500);
  });
};

export const updateUser = async (userData: UpdateUserData): Promise<ApiSuccessResponse<User>> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === userData.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
        resolve({
          success: true,
          data: mockUsers[index],
          meta: {
            timestamp: new Date().toISOString(),
            requestId: 'mock-request-id',
          },
        });
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

export const deleteUser = async (userId: number): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === userId);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      resolve();
    }, 500);
  });
};

export const toggleUserLock = async (userId: number): Promise<ApiSuccessResponse<User>> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        user.locked = !user.locked;
        resolve({
          success: true,
          data: user,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: 'mock-request-id',
          },
        });
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

export const getUserStats = async (userId: number): Promise<ApiSuccessResponse<UserStats>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          totalLogins: 42,
          lastActiveDate: new Date().toISOString(),
          failedLoginAttempts: 0,
          accountCreatedAt: '2024-01-01T00:00:00Z',
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'mock-request-id',
        },
      });
    }, 500);
  });
};
