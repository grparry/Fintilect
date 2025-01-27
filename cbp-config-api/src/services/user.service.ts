import * as sql from 'mssql';
import { Database } from '@/config/db';
import { HttpError } from '@/utils/errors';
import { logger } from '@/config/logger';
import { PaginatedResponse, SqlResponse } from '@/types/common';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  timezone: string;
  language: string;
}

export interface UserRecord {
  id: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  preferences?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt?: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive';
}

export interface UserDetails {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt?: Date;
  preferences?: UserPreferences;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  preferences?: UserPreferences;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  status?: 'active' | 'inactive';
  preferences?: UserPreferences;
}

export interface PayeeOptions {
  defaultPaymentMethod: string;
  allowedPaymentMethods: string[];
  paymentLimits: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  autoPayEnabled: boolean;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
  };
}

export interface HostInfo {
  name: string;
  connectionStatus: string;
  lastConnectionTime: string;
  features: {
    payments: boolean;
    reporting: boolean;
    automation: boolean;
  };
}

export class UserService {
  constructor(private db: Database) {}

  async listUsers(params: UserListParams): Promise<PaginatedResponse<UserDetails>> {
    try {
      const { page = 1, limit = 10, role, status } = params;

      if (page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }

      if (limit < 1 || limit > 100) {
        throw new HttpError(400, 'Invalid page size');
      }

      const offset = (page - 1) * limit;

      const result = await this.db.executeProc('ListUsers', {
        offset,
        limit,
        role,
        status
      });

      const users = result.recordset.map(this.mapUserRecord);
      const total = result.recordset.length > 0 ? result.recordset[0].TotalCount : 0;

      return {
        data: users,
        pagination: {
          page,
          pageSize: limit,
          total
        }
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in listUsers:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Error retrieving users');
    }
  }

  async getUserById(id: string): Promise<UserDetails> {
    try {
      const result = await this.db.executeProc('GetUserById', { id });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      return this.mapUserRecord(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in getUserById:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Error retrieving user');
    }
  }

  async createUser(data: CreateUserRequest): Promise<UserDetails> {
    try {
      this.validateUserData(data);

      const result = await this.db.executeProc('CreateUser', {
        ...data,
        role: data.role || 'user'
      });

      if (!result.recordset.length) {
        throw new HttpError(500, 'Failed to create user');
      }

      return this.mapUserRecord(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in createUser:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Error creating user');
    }
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserDetails> {
    try {
      const result = await this.db.executeProc('UpdateUser', {
        id,
        ...data
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      return this.mapUserRecord(result.recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in updateUser:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Error updating user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.db.executeProc('DeleteUser', { id });

      if (!result.rowsAffected[0]) {
        throw new HttpError(404, 'User not found');
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in deleteUser:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Error deleting user');
    }
  }

  async getUserPreferences(id: string): Promise<UserPreferences> {
    try {
      const result = await this.db.executeProc('GetUserPreferences', { userId: id });
      if (!result.recordset.length) {
        throw new HttpError(404, 'User preferences not found');
      }
      return result.recordset[0].preferences;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in getUserPreferences:', error);
      throw new HttpError(500, 'Error retrieving user preferences');
    }
  }

  async updateUserPreferences(id: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      // Validate preferences
      this.validatePreferences(preferences);

      const result = await this.db.executeProc('UpdateUserPreferences', {
        userId: id,
        preferences: JSON.stringify(preferences)
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User preferences not found');
      }

      return result.recordset[0].preferences;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in updateUserPreferences:', error);
      throw new HttpError(500, 'Error updating user preferences');
    }
  }

  async getPayeeOptions(userId: string, payeeId: number): Promise<PayeeOptions> {
    try {
      const result = await this.db.executeProc<PayeeOptions>('GetPayeeOptions', { userId, payeeId });
      if (!result.recordset || result.recordset.length === 0) {
        throw new HttpError(404, 'Payee options not found');
      }
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Error retrieving payee options');
    }
  }

  async updatePayeeOptions(userId: string, payeeId: number, options: Partial<PayeeOptions>): Promise<PayeeOptions> {
    try {
      // Validate payment limits hierarchy
      if (options.paymentLimits) {
        const { daily, weekly, monthly } = options.paymentLimits;
        if (daily > weekly || weekly > monthly) {
          throw new HttpError(400, 'Invalid payment limits hierarchy');
        }
      }

      const result = await this.db.executeProc('UpdatePayeeOptions', {
        userId,
        payeeId,
        ...options
      });

      if (!result.recordset || result.recordset.length === 0) {
        throw new HttpError(404, 'Payee options not found');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to update payee options');
    }
  }

  async getHostInfo(userId: string): Promise<HostInfo> {
    try {
      const result = await this.db.executeProc<any>('GetHostInfo', { userId });
      if (!result.recordset || result.recordset.length === 0) {
        throw new HttpError(404, 'Host information not found');
      }
      const hostInfo = result.recordset[0];
      const featuresList = Array.isArray(hostInfo.features) ? hostInfo.features : [];
      
      return {
        name: hostInfo.name,
        connectionStatus: hostInfo.connectionStatus,
        lastConnectionTime: hostInfo.lastConnectionTime,
        features: {
          payments: featuresList.includes('payments'),
          reporting: featuresList.includes('reporting'),
          automation: featuresList.includes('automation')
        }
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Error retrieving host information');
    }
  }

  private mapUserRecord(record: any): UserDetails {
    return {
      id: record.UserId,
      email: record.Email,
      firstName: record.FirstName,
      lastName: record.LastName,
      role: record.Role,
      status: record.Status,
      lastLogin: record.LastLogin,
      createdAt: record.CreatedAt,
      updatedAt: record.UpdatedAt,
      deactivatedAt: record.DeactivatedAt,
      preferences: record.Preferences
    };
  }

  private validateUserData(data: CreateUserRequest) {
    const errors = [];

    if (!data.email?.trim()) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!this.isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }

    if (data.role && !['user', 'admin'].includes(data.role)) {
      errors.push({ field: 'role', message: 'Invalid role' });
    }

    if (errors.length > 0) {
      throw new HttpError(400, 'Invalid user data', errors);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePreferences(preferences: Partial<UserPreferences>) {
    if (preferences.theme && !['light', 'dark', 'system'].includes(preferences.theme)) {
      throw new HttpError(400, 'Invalid theme value');
    }

    if (preferences.notifications) {
      const { email, push, sms } = preferences.notifications;
      if (email !== undefined && typeof email !== 'boolean') {
        throw new HttpError(400, 'Invalid email notification setting');
      }
      if (push !== undefined && typeof push !== 'boolean') {
        throw new HttpError(400, 'Invalid push notification setting');
      }
      if (sms !== undefined && typeof sms !== 'boolean') {
        throw new HttpError(400, 'Invalid SMS notification setting');
      }
    }

    if (preferences.timezone) {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: preferences.timezone });
      } catch (error) {
        throw new HttpError(400, 'Invalid timezone');
      }
    }

    if (preferences.language) {
      const validLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt'];
      if (!validLanguages.includes(preferences.language)) {
        throw new HttpError(400, 'Invalid language');
      }
    }
  }
}
