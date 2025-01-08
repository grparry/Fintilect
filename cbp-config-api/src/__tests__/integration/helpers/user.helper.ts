import { TestDb } from '../../../config/test.db';
import { mockUsers } from '../fixtures/mockData';
import { ResponseValidator } from './ResponseValidator';
import { UserDetails, UserPreferences, PayeeOptions, HostInfo } from '../../../services/user.service';
import { PaginatedResponse } from '../../../types/common';

export class UserTestHelper {
  static setupUserMocks(testDb: TestDb) {
    // List users mock with pagination
    testDb.setMockResponse('ListUsers', (params: any) => {
      const { offset = 0, limit = 10, role, status } = params;
      
      let users = Object.values(mockUsers);
      
      if (role) {
        users = users.filter(u => u.roles.includes(role));
      }
      if (status === 'active') {
        users = users.filter(u => u.status === 'active');
      } else if (status === 'inactive') {
        users = users.filter(u => u.status === 'inactive');
      }

      const total = users.length;
      const paginatedUsers = users
        .slice(offset, offset + limit)
        .map(user => ({
          UserId: user.id,
          Email: user.email,
          FirstName: user.firstName || '',
          LastName: user.lastName || '',
          Role: user.roles[0],
          Status: user.status,
          LastLogin: null,
          CreatedAt: user.createdAt,
          UpdatedAt: user.updatedAt,
          DeactivatedAt: user.deactivatedAt,
          Preferences: user.preferences || {},
          TotalCount: total
        }));

      return {
        recordset: paginatedUsers,
        recordsets: [],
        output: {},
        rowsAffected: [paginatedUsers.length]
      };
    });

    // Get user by ID mock
    testDb.setMockResponse('GetUserById', (params: any) => {
      const { id } = params;
      const user = Object.values(mockUsers).find(u => u.id === id);
      
      if (!user) {
        return {
          recordset: [],
          recordsets: [],
          output: {},
          rowsAffected: [0]
        };
      }

      const userRecord = {
        UserId: user.id,
        Email: user.email,
        FirstName: user.firstName || '',
        LastName: user.lastName || '',
        Role: user.roles[0],
        Status: user.status,
        LastLogin: null,
        CreatedAt: user.createdAt,
        UpdatedAt: user.updatedAt,
        DeactivatedAt: user.deactivatedAt,
        Preferences: user.preferences || {}
      };

      return {
        recordset: [userRecord],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Create user mock
    testDb.setMockResponse('CreateUser', (params: any) => {
      const newUser = {
        UserId: `user-${Date.now()}`,
        Email: params.email,
        FirstName: params.firstName,
        LastName: params.lastName,
        Role: params.role,
        Status: 'active',
        LastLogin: null,
        CreatedAt: new Date(),
        UpdatedAt: new Date('2024-01-01'),
        DeactivatedAt: undefined,
        Preferences: params.preferences || {}
      };

      const userRecord = {
        UserId: newUser.UserId,
        Email: newUser.Email,
        FirstName: newUser.FirstName || '',
        LastName: newUser.LastName || '',
        Role: newUser.Role,
        Status: newUser.Status,
        CreatedAt: newUser.CreatedAt,
        UpdatedAt: newUser.UpdatedAt,
        Preferences: newUser.Preferences || {}
      };

      return {
        recordset: [userRecord],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Update user mock
    testDb.setMockResponse('UpdateUser', (params: any) => {
      const { id, ...updates } = params;
      const user = Object.values(mockUsers).find(u => u.id === id);
      
      if (!user) {
        return {
          recordset: [],
          recordsets: [],
          output: {},
          rowsAffected: [0]
        };
      }

      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date()
      };

      const userRecord = {
        UserId: updatedUser.id,
        Email: updatedUser.email,
        FirstName: updates.firstName || '',
        LastName: updates.lastName || '',
        Role: updates.role || user.roles[0],
        Status: updates.status || user.status,
        LastLogin: null,
        CreatedAt: user.createdAt,
        UpdatedAt: new Date(),
        DeactivatedAt: updates.status === 'inactive' ? new Date() : user.deactivatedAt,
        Preferences: updates.preferences || {}
      };

      return {
        recordset: [userRecord],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Delete user mock
    testDb.setMockResponse('DeleteUser', (params: any) => {
      const { id } = params;
      const user = Object.values(mockUsers).find(u => u.id === id);
      
      return {
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: user ? [1] : [0]
      };
    });
  }

  static verifyListUsersResponse(response: PaginatedResponse<UserDetails>) {
    ResponseValidator.validatePaginatedResponse(response, 1, 10);
    response.data.forEach(user => this.validateUserResponse(user));
  }

  static validateUser(user: any) {
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.status).toMatch(/^(active|inactive)$/);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    if (user.status === 'inactive') {
      expect(user.deactivatedAt).toBeInstanceOf(Date);
    }
  }

  static validateUserResponse(user: any, expectInactive = false) {
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.status).toMatch(/^(active|inactive)$/);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    if (expectInactive) {
      expect(user.status).toBe('inactive');
      expect(user.deactivatedAt).toBeInstanceOf(Date);
    }

    if (user.preferences) {
      this.verifyUserPreferences(user.preferences);
    }
  }

  static verifyGetUserResponse(user: UserDetails, checkDeactivation = false) {
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.role).toBeDefined();
    expect(user.status).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    
    if (checkDeactivation) {
      expect(user.deactivatedAt).toBeDefined();
    }
  }

  static verifyUserPreferences(preferences: UserPreferences) {
    if (preferences.notifications) {
      expect(preferences.notifications).toHaveProperty('email');
      expect(preferences.notifications).toHaveProperty('push');
      expect(preferences.notifications).toHaveProperty('sms');
    }

    if (preferences.theme) {
      expect(['light', 'dark', 'system']).toContain(preferences.theme);
    }

    if (preferences.timezone) {
      expect(typeof preferences.timezone).toBe('string');
    }

    if (preferences.language) {
      expect(typeof preferences.language).toBe('string');
    }
  }

  static verifyPayeeOptions(options: PayeeOptions) {
    ResponseValidator.validateRequiredFields(options, [
      'defaultPaymentMethod',
      'allowedPaymentMethods',
      'paymentLimits',
      'notificationPreferences'
    ]);

    expect(options.paymentLimits).toHaveProperty('daily');
    expect(options.paymentLimits).toHaveProperty('weekly');
    expect(options.paymentLimits).toHaveProperty('monthly');

    expect(options.notificationPreferences).toHaveProperty('email');
    expect(options.notificationPreferences).toHaveProperty('sms');
  }

  static verifyHostInfo(info: HostInfo) {
    ResponseValidator.validateRequiredFields(info, [
      'name',
      'connectionStatus',
      'lastConnectionTime',
      'features'
    ]);

    expect(info.features).toHaveProperty('payments');
    expect(info.features).toHaveProperty('reporting');
    expect(info.features).toHaveProperty('automation');
  }
}
