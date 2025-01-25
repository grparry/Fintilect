import { UserService, UserDetails, PayeeOptions, HostInfo, CreateUserRequest, UpdateUserRequest } from '../../services/user.service';
import { TestDatabase } from '../../config/test.db';
import { HttpError } from '../../utils/errors';
import { UserTestHelper } from '../integration/helpers/user.helper';
import { mockUsers } from '../integration/fixtures/mockData';

describe('UserService', () => {
  let userService: UserService;
  let testDb: TestDatabase;

  beforeEach(() => {
    testDb = new TestDatabase();
    userService = new UserService(testDb);
    UserTestHelper.setupUserMocks(testDb);
  });

  describe('listUsers', () => {
    it('should list users with pagination', async () => {
      const result = await userService.listUsers({ page: 1, limit: 10 });

      UserTestHelper.verifyListUsersResponse(result);
      expect(result.data).toHaveLength(3); // standard, admin, and inactive users
      expect(result.pagination.total).toBe(3);
    });

    it('should handle empty results', async () => {
      testDb.setMockResponse('ListUsers', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      const result = await userService.listUsers({});

      UserTestHelper.verifyListUsersResponse(result);
      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });

    it('should throw error for invalid page number', async () => {
      await expect(userService.listUsers({ page: 0 }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page number'));
    });

    it('should throw error for invalid page size', async () => {
      await expect(userService.listUsers({ limit: 0 }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));

      await expect(userService.listUsers({ limit: 101 }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));
    });
  });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      const result = await userService.getUserById(mockUsers.standard.id);

      UserTestHelper.verifyGetUserResponse(result);
      expect(result.id).toBe(mockUsers.standard.id);
      expect(result.email).toBe(mockUsers.standard.email);
    });

    it('should throw error when user not found', async () => {
      await expect(userService.getUserById('nonexistent'))
        .rejects
        .toThrow(new HttpError(404, 'User not found'));
    });
  });

  describe('createUser', () => {
    const validUserData: CreateUserRequest = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        timezone: 'UTC',
        language: 'en'
      }
    };

    it('should create user with valid data', async () => {
      const result = await userService.createUser(validUserData);

      UserTestHelper.verifyGetUserResponse(result);
      expect(result.email).toBe(validUserData.email);
      expect(result.firstName).toBe(validUserData.firstName);
      expect(result.lastName).toBe(validUserData.lastName);
      expect(result.role).toBe(validUserData.role);
      expect(result.preferences).toEqual(validUserData.preferences);
    });

    it('should throw error for invalid email', async () => {
      const invalidData = { ...validUserData, email: 'invalid-email' };
      
      await expect(userService.createUser(invalidData))
        .rejects
        .toThrow(new HttpError(400, 'Invalid user data'));
    });

    it('should throw error for invalid role', async () => {
      const invalidData = { ...validUserData, role: 'invalid-role' };
      
      await expect(userService.createUser(invalidData))
        .rejects
        .toThrow(new HttpError(400, 'Invalid user data'));
    });
  });

  describe('updateUser', () => {
    const validUpdateData: UpdateUserRequest = {
      email: 'updated@example.com',
      firstName: 'Updated',
      lastName: 'User',
      role: 'admin',
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          push: false,
          sms: true
        },
        timezone: 'UTC',
        language: 'es'
      }
    };

    it('should update user with valid data', async () => {
      const result = await userService.updateUser(mockUsers.standard.id, validUpdateData);

      UserTestHelper.verifyGetUserResponse(result);
      expect(result.email).toBe(validUpdateData.email);
      expect(result.firstName).toBe(validUpdateData.firstName);
      expect(result.lastName).toBe(validUpdateData.lastName);
      expect(result.role).toBe(validUpdateData.role);
      expect(result.preferences).toEqual(validUpdateData.preferences);
    });

    it('should throw error when user not found', async () => {
      await expect(userService.updateUser('nonexistent', validUpdateData))
        .rejects
        .toThrow(new HttpError(404, 'User not found'));
    });

    it('should update user status to inactive', async () => {
      const result = await userService.updateUser(mockUsers.standard.id, { status: 'inactive' });

      UserTestHelper.verifyGetUserResponse(result, true);
      expect(result.status).toBe('inactive');
      expect(result.deactivatedAt).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', async () => {
      await expect(userService.deleteUser(mockUsers.standard.id)).resolves.not.toThrow();
    });

    it('should throw error when user not found', async () => {
      await expect(userService.deleteUser('nonexistent'))
        .rejects
        .toThrow(new HttpError(404, 'User not found'));
    });
  });
});
