import { TestDatabase } from '@/../../config/test.db';
import { UserTestHelper } from '@/user.helper';
import { mockUsers } from '@/fixtures/mockData';

describe('UserTestHelper', () => {
  let testDb: TestDatabase;

  beforeEach(() => {
    testDb = new TestDatabase();
  });

  describe('setupUserMocks', () => {
    beforeEach(() => {
      UserTestHelper.setupUserMocks(testDb);
    });

    describe('ListUsers', () => {
      it('should return all users when no filters are applied', async () => {
        const result = await testDb.executeProcedure('ListUsers', {});
        expect(result.recordset).toHaveLength(3);
        expect(result.recordset[0].TotalCount).toBe(3);
      });

      it('should filter users by role', async () => {
        const result = await testDb.executeProcedure('ListUsers', { role: 'admin' });
        expect(result.recordset).toHaveLength(1);
        expect(result.recordset[0].Role).toBe('admin');
      });

      it('should filter users by status', async () => {
        const result = await testDb.executeProcedure('ListUsers', { status: 'inactive' });
        expect(result.recordset).toHaveLength(1);
        expect(result.recordset[0].Status).toBe('inactive');
      });

      it('should handle pagination', async () => {
        const result = await testDb.executeProcedure('ListUsers', { offset: 1, limit: 1 });
        expect(result.recordset).toHaveLength(1);
        expect(result.recordset[0].TotalCount).toBe(3);
      });
    });

    describe('GetUserById', () => {
      it('should return user when found', async () => {
        const result = await testDb.executeProcedure('GetUserById', { id: mockUsers.standard.id });
        expect(result.recordset).toHaveLength(1);
        expect(result.recordset[0].UserId).toBe(mockUsers.standard.id);
      });

      it('should return empty recordset when user not found', async () => {
        const result = await testDb.executeProcedure('GetUserById', { id: 'nonexistent' });
        expect(result.recordset).toHaveLength(0);
      });
    });

    describe('CreateUser', () => {
      it('should create user with provided details', async () => {
        const userData = {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          preferences: { theme: 'dark' }
        };

        const result = await testDb.executeProcedure('CreateUser', userData);
        expect(result.recordset).toHaveLength(1);
        expect(result.recordset[0].Email).toBe(userData.email);
        expect(result.recordset[0].FirstName).toBe(userData.firstName);
        expect(result.recordset[0].LastName).toBe(userData.lastName);
        expect(result.recordset[0].Role).toBe(userData.role);
        expect(result.recordset[0].Preferences).toEqual(userData.preferences);
      });
    });
  });
});
