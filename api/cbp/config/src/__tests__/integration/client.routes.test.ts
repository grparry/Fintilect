import request from 'supertest';
import {
  testApp,
  createTestUser,
  createTestAdmin,
  getAuthHeader,
  setupTestDb,
  cleanupTestDb
} from '@/helpers';

describe('Client Routes', () => {
  let token: string;
  let adminToken: string;
  const clientId = '1';

  beforeAll(async () => {
    await setupTestDb();
    const { token: userToken } = await createTestUser();
    const { token: testAdminToken } = await createTestAdmin();
    token = userToken;
    adminToken = testAdminToken;
  });

  afterAll(async () => {
    await cleanupTestDb();
  });

  describe('GET /api/clients', () => {
    it('should return list of clients for authenticated user', async () => {
      const response = await request(testApp)
        .get('/api/clients')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0]).toHaveProperty('ClientId');
      expect(response.body.data[0]).toHaveProperty('Name');
      expect(response.body.pagination).toHaveProperty('total');
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('pageSize');
    });

    it('should return 401 for unauthenticated request', async () => {
      const response = await request(testApp).get('/api/clients');
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/clients', () => {
    it('should create new client for admin user', async () => {
      const newClient = {
        name: 'New Test Client',
        email: 'newclient@example.com'
      };

      const response = await request(testApp)
        .post('/api/clients')
        .set(getAuthHeader(adminToken))
        .send(newClient);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('ClientId');
      expect(response.body).toHaveProperty('Name');
      expect(response.body.Name).toBe(newClient.name);
    });

    it('should return 403 for non-admin user', async () => {
      const newClient = {
        name: 'New Test Client',
        email: 'newclient@example.com'
      };

      const response = await request(testApp)
        .post('/api/clients')
        .set(getAuthHeader(token))
        .send(newClient);

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/clients/:id', () => {
    it('should return client details for authenticated user', async () => {
      const response = await request(testApp)
        .get(`/api/clients/${clientId}`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ClientId');
      expect(response.body).toHaveProperty('Name');
      expect(response.body.ClientId).toBe(clientId);
    });
  });

  describe('PUT /api/clients/:id', () => {
    it('should update client for admin user', async () => {
      const updates = {
        name: 'Updated Client Name',
        email: 'updated@example.com'
      };

      const response = await request(testApp)
        .put(`/api/clients/${clientId}`)
        .set(getAuthHeader(adminToken))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ClientId');
      expect(response.body).toHaveProperty('Name');
      expect(response.body.Name).toBe(updates.name);
    });
  });

  describe('DELETE /api/clients/:id', () => {
    it('should delete client for admin user', async () => {
      const response = await request(testApp)
        .delete(`/api/clients/${clientId}`)
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/clients/:id/settings', () => {
    it('should return client settings for authenticated user', async () => {
      const response = await request(testApp)
        .get(`/api/clients/${clientId}/settings`)
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('Settings');
      expect(response.body.Settings).toHaveProperty('paymentLimits');
    });
  });

  describe('PUT /api/clients/:id/settings', () => {
    it('should update client settings for admin user', async () => {
      const updates = {
        paymentLimits: {
          daily: 20000,
          transaction: 10000
        }
      };

      const response = await request(testApp)
        .put(`/api/clients/${clientId}/settings`)
        .set(getAuthHeader(adminToken))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('Settings');
      expect(response.body.Settings.paymentLimits).toEqual(updates.paymentLimits);
    });
  });
});
