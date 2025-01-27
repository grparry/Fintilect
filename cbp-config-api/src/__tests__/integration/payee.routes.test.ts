import request from 'supertest';
import {
  testApp,
  createTestUser,
  createTestAdmin,
  getAuthHeader,
  setupTestDb,
  cleanupTestDb
} from '@/helpers';

describe('Payee Routes', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  afterAll(async () => {
    await cleanupTestDb();
  });

  describe('GET /api/payees', () => {
    it('should return list of payees for authenticated user', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/payees')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
    });

    it('should return 401 for unauthenticated request', async () => {
      const response = await request(testApp)
        .get('/api/payees');

      expect(response.status).toBe(401);
    });

    it('should list payees with pagination', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/payees')
        .query({ page: 1, limit: 10 })
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: expect.any(Array),
        pagination: {
          page: 1,
          pageSize: 10,
          total: expect.any(Number)
        }
      });
    });

    it('should mask sensitive data', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/payees')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      response.body.data.forEach((payee: any) => {
        expect(payee.accountNumber).toMatch(/^\*+\d{4}$/);
      });
    });
  });

  describe('POST /api/payees', () => {
    it('should create new payee for admin user', async () => {
      const { token } = await createTestAdmin();
      const newPayee = {
        name: 'Test Payee',
        email: 'test@example.com',
        phone: '123-456-7890',
        bankAccounts: [{
          accountNumber: '123456789',
          routingNumber: '987654321',
          accountType: 'checking'
        }]
      };

      const response = await request(testApp)
        .post('/api/payees')
        .set(getAuthHeader(token))
        .send(newPayee);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        name: newPayee.name,
        email: newPayee.email,
        phone: newPayee.phone,
        status: 'ACTIVE'
      });
    });

    it('should return 403 for non-admin user', async () => {
      const { token } = await createTestUser();
      const newPayee = {
        name: 'Test Payee',
        email: 'test@example.com',
        phone: '123-456-7890'
      };

      const response = await request(testApp)
        .post('/api/payees')
        .set(getAuthHeader(token))
        .send(newPayee);

      expect(response.status).toBe(403);
    });

    it('should validate routing number', async () => {
      const { token } = await createTestAdmin();
      const newPayee = {
        name: 'Test Payee',
        email: 'test@payee.com',
        status: 'active',
        routingNumber: '123'
      };

      const response = await request(testApp)
        .post('/api/payees')
        .set(getAuthHeader(token))
        .send(newPayee);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/payees/:id', () => {
    it('should return payee details for authenticated user', async () => {
      const { token } = await createTestUser();
      const payeeId = '1'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .get(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        PayeeId: '1',
        Name: 'Standard Payee',
        Email: 'standard@example.com',
        Phone: '123-456-7890',
        Status: 'ACTIVE'
      });
    });

    it('should return payee details', async () => {
      const { token } = await createTestUser();
      const payeeId = '1'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .get(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        PayeeId: '1',
        Name: 'Standard Payee',
        Email: 'standard@example.com',
        Phone: '123-456-7890',
        Status: 'ACTIVE'
      });
    });

    it('should return 404 for non-existent payee', async () => {
      const { token } = await createTestUser();
      const payeeId = '999999'; // Assuming this payee does not exist in test DB

      const response = await request(testApp)
        .get(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/payees/:id', () => {
    it('should update payee for admin user', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '1'; // Assuming this payee exists in test DB
      const updates = {
        name: 'Updated Payee',
        email: 'updated@example.com',
        phone: '098-765-4321'
      };

      const response = await request(testApp)
        .put(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        PayeeId: '1',
        Name: updates.name,
        Email: updates.email,
        Phone: updates.phone
      });
    });

    it('should update payee', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '1'; // Assuming this payee exists in test DB
      const updates = {
        name: 'Updated Payee',
        email: 'updated@example.com',
        phone: '098-765-4321'
      };

      const response = await request(testApp)
        .put(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        PayeeId: '1',
        Name: updates.name,
        Email: updates.email,
        Phone: updates.phone
      });
    });

    it('should prevent status update for payees with active payments', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '2'; // Assuming this payee exists in test DB
      const updates = {
        status: 'inactive'
      };

      const response = await request(testApp)
        .put(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token))
        .send(updates);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/payees/:id', () => {
    it('should delete payee for admin user', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '1'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .delete(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(204);
    });

    it('should delete payee', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '1'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .delete(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(204);
    });

    it('should prevent deletion of payee with active payments', async () => {
      const { token } = await createTestAdmin();
      const payeeId = '2'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .delete(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(400);
    });

    it('should require admin permissions', async () => {
      const { token } = await createTestUser();
      const payeeId = '1'; // Assuming this payee exists in test DB

      const response = await request(testApp)
        .delete(`/api/payees/${payeeId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(403);
    });
  });
});
