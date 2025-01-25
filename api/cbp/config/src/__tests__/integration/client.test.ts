import request from 'supertest';
import { testApp, setupTestDb, cleanupTestDb, createTestAdmin, createTestUser, getAuthHeader } from './helpers';
import { ClientRecord } from '../../models/client';

describe('Client Integration Tests', () => {
  let adminToken: string;

  beforeAll(async () => {
    await setupTestDb();
    const admin = await createTestAdmin();
    adminToken = admin.token;
  });

  afterAll(async () => {
    await cleanupTestDb();
  });

  describe('GET /api/clients', () => {
    it('should return paginated list of clients', async () => {
      const response = await request(testApp)
        .get('/api/clients')
        .query({ page: 1, pageSize: 10 })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toEqual({
        total: 2,
        page: 1,
        pageSize: 10,
        totalPages: 1
      });
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toMatchObject<Partial<ClientRecord>>({
        id: 1,
        name: 'Test Client 1'
      });
    });

    it('should handle invalid page number', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/clients?page=invalid')
        .set(getAuthHeader(token));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid page number');
    });

    it('should handle invalid page size', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/clients?pageSize=invalid')
        .set(getAuthHeader(token));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid page size');
    });
  });

  describe('GET /api/clients/:id', () => {
    it('should return a single client', async () => {
      const response = await request(testApp)
        .get('/api/clients/1')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject<Partial<ClientRecord>>({
        id: 1,
        name: 'Test Client 1'
      });
    });

    it('should return 404 for non-existent client', async () => {
      const { token } = await createTestUser();

      const response = await request(testApp)
        .get('/api/clients/999999')
        .set(getAuthHeader(token));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Client not found');
    });
  });

  describe('POST /api/clients', () => {
    it('should create a new client', async () => {
      const newClient = {
        name: 'New Client',
        email: 'new@example.com',
        phone: '123-456-7890',
        address: '123 Main St'
      };

      const response = await request(testApp)
        .post('/api/clients')
        .set(getAuthHeader(adminToken))
        .send(newClient);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject<Partial<ClientRecord>>({
        id: expect.any(Number),
        name: newClient.name,
        email: newClient.email,
        status: 'active'
      });
    });
  });

  describe('PUT /api/clients/:id', () => {
    it('should update an existing client', async () => {
      const updates = {
        name: 'Updated Client',
        email: 'updated@example.com'
      };

      const response = await request(testApp)
        .put('/api/clients/1')
        .set(getAuthHeader(adminToken))
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject<Partial<ClientRecord>>({
        id: 1,
        name: updates.name,
        email: updates.email
      });
    });

    it('should return 404 for non-existent client', async () => {
      const { token } = await createTestAdmin();

      const response = await request(testApp)
        .put('/api/clients/999999')
        .set(getAuthHeader(token))
        .send({
          name: 'Updated Client',
          email: 'updated@example.com'
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Client not found');
    });
  });

  describe('DELETE /api/clients/:id', () => {
    it('should delete a client', async () => {
      const response = await request(testApp)
        .delete('/api/clients/2')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(204);
    });

    it('should return 404 for non-existent client', async () => {
      const { token } = await createTestAdmin();

      const response = await request(testApp)
        .delete('/api/clients/999999')
        .set(getAuthHeader(token));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Client not found');
    });
  });
});
