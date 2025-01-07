import { UserService, PayeeOptions, HostInfo } from '../../services/user.service';
import { TestDb } from '../../config/test.db';
import { HttpError } from '../../utils/errors';

describe('UserService', () => {
  let userService: UserService;
  let testDb: TestDb;

  beforeEach(() => {
    testDb = new TestDb();
    userService = new UserService(testDb);
  });

  describe('listUsers', () => {
    it('should list users with pagination', async () => {
      // Mock successful response
      testDb.setMockResponse('ListUsers', () => [{
        UserId: '1',
        Email: 'user1@example.com',
        FirstName: 'John',
        LastName: 'Doe',
        Role: 'user',
        Status: 'active',
        LastLogin: new Date(),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Preferences: { theme: 'light' },
        TotalCount: 1
      }]);

      const result = await userService.listUsers({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('1');
      expect(result.pagination.total).toBe(1);
    });

    it('should handle empty results', async () => {
      // Mock empty response
      testDb.setMockResponse('ListUsers', () => []);

      const result = await userService.listUsers({});

      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      // Mock successful response
      testDb.setMockResponse('GetUserById', () => [{
        UserId: '1',
        Email: 'user1@example.com',
        FirstName: 'John',
        LastName: 'Doe',
        Role: 'user',
        Status: 'active',
        LastLogin: new Date(),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Preferences: { theme: 'light' }
      }]);

      const result = await userService.getUserById('1');

      expect(result.id).toBe('1');
      expect(result.email).toBe('user1@example.com');
    });

    it('should throw error when user not found', async () => {
      // Mock empty response
      testDb.setMockResponse('GetUserById', () => []);

      await expect(userService.getUserById('1')).rejects.toThrow(HttpError);
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      // Mock successful response
      testDb.setMockResponse('UpdateUser', () => [{
        UserId: '1',
        Email: 'updated@example.com',
        FirstName: 'John',
        LastName: 'Doe',
        Role: 'user',
        Status: 'active',
        LastLogin: new Date(),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Preferences: { theme: 'light' }
      }]);

      const result = await userService.updateUser('1', { email: 'updated@example.com' });

      expect(result.email).toBe('updated@example.com');
    });

    it('should throw error when user not found', async () => {
      // Mock empty response
      testDb.setMockResponse('UpdateUser', () => []);

      await expect(userService.updateUser('1', { email: 'test@example.com' })).rejects.toThrow(HttpError);
    });
  });

  describe('getUserPreferences', () => {
    it('should get user preferences', async () => {
      // Mock successful response
      testDb.setMockResponse('GetUserPreferences', () => [{
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            sms: true,
            push: false
          }
        }
      }]);

      const result = await userService.getUserPreferences('1');

      expect(result).toEqual({
        theme: 'dark',
        notifications: {
          email: true,
          sms: true,
          push: false
        }
      });
    });

    it('should throw error when preferences not found', async () => {
      // Mock empty response
      testDb.setMockResponse('GetUserPreferences', () => []);

      await expect(userService.getUserPreferences('1')).rejects.toThrow(HttpError);
    });
  });

  describe('getPayeeOptions', () => {
    it('should return payee options', async () => {
      // Mock successful response
      testDb.setMockResponse('GetPayeeOptions', () => [{
        defaultPaymentMethod: 'ACH',
        allowedPaymentMethods: ['ACH', 'CHECK', 'WIRE'],
        paymentLimits: {
          daily: 1000,
          weekly: 5000,
          monthly: 20000
        },
        autoPayEnabled: false,
        notificationPreferences: {
          email: true,
          sms: true
        }
      }]);

      const result = await userService.getPayeeOptions('1', 1);

      expect(result).toEqual({
        defaultPaymentMethod: 'ACH',
        allowedPaymentMethods: ['ACH', 'CHECK', 'WIRE'],
        paymentLimits: {
          daily: 1000,
          weekly: 5000,
          monthly: 20000
        },
        autoPayEnabled: false,
        notificationPreferences: {
          email: true,
          sms: true
        }
      });
    });

    it('should throw error if options not found', async () => {
      // Mock empty response
      testDb.setMockResponse('GetPayeeOptions', () => []);

      await expect(userService.getPayeeOptions('1', 1)).rejects.toThrow(HttpError);
    });
  });

  describe('updatePayeeOptions', () => {
    it('should update payee options', async () => {
      // Mock successful response
      testDb.setMockResponse('UpdatePayeeOptions', () => [{ success: true }]);

      await expect(userService.updatePayeeOptions('1', 1, {
        paymentLimits: {
          daily: 2000,
          weekly: 10000,
          monthly: 40000
        }
      })).resolves.not.toThrow();
    });

    it('should throw error if update fails', async () => {
      // Mock successful response
      testDb.setMockResponse('UpdatePayeeOptions', () => [{ success: false }]);

      await expect(userService.updatePayeeOptions('1', 1, {
        paymentLimits: {
          daily: 2000,
          weekly: 10000,
          monthly: 40000
        }
      })).rejects.toThrow(HttpError);
    });
  });

  describe('getHostInfo', () => {
    it('should return host info', async () => {
      // Mock successful response
      testDb.setMockResponse('GetHostInfo', () => [{
        name: 'Test Host',
        connectionStatus: 'connected',
        lastConnectionTime: new Date().toISOString(),
        features: ['payments', 'reporting']
      }]);

      const result = await userService.getHostInfo('1');

      expect(result).toEqual({
        name: 'Test Host',
        connectionStatus: 'connected',
        lastConnectionTime: expect.any(String),
        features: {
          payments: true,
          reporting: true,
          automation: false
        }
      });
    });

    it('should throw error if host info not found', async () => {
      // Mock empty response
      testDb.setMockResponse('GetHostInfo', () => []);

      await expect(userService.getHostInfo('1')).rejects.toThrow(HttpError);
    });
  });
});
