import request from 'supertest';
import { testApp, createTestAdmin, getAuthHeader, setupTestDb, cleanupTestDb } from '@/helpers';

describe('Payment Routes', () => {
  let adminToken: string;

  beforeAll(async () => {
    const admin = await createTestAdmin();
    adminToken = admin.token;
  });

  beforeEach(async () => {
    await setupTestDb();
  });

  afterEach(async () => {
    await cleanupTestDb();
  });

  describe('GET /api/payments', () => {
    it('should return a list of payments with pagination', async () => {
      const response = await request(testApp)
        .get('/api/payments')
        .query({ page: 1, pageSize: 10 })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('payeeId');
      expect(response.body[0]).toHaveProperty('amount');
      expect(response.body[0]).toHaveProperty('currency');
      expect(response.body[0]).toHaveProperty('status');
    });

    it('should handle invalid pagination parameters', async () => {
      const response = await request(testApp)
        .get('/api/payments')
        .query({ page: 0, pageSize: 10 })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/payments/:id', () => {
    it('should return a payment by id', async () => {
      const response = await request(testApp)
        .get('/api/payments/1')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('payeeId');
      expect(response.body).toHaveProperty('amount');
      expect(response.body).toHaveProperty('currency');
      expect(response.body).toHaveProperty('status');
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .get('/api/payments/999')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });
  });

  describe('POST /api/payments', () => {
    it('should create a new payment', async () => {
      const newPayment = {
        payeeId: '1',
        amount: 1000,
        currency: 'USD',
        effectiveDate: new Date().toISOString(),
        description: 'Test payment'
      };

      const response = await request(testApp)
        .post('/api/payments')
        .send(newPayment)
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('payeeId', newPayment.payeeId);
      expect(response.body).toHaveProperty('amount', newPayment.amount);
      expect(response.body).toHaveProperty('currency', newPayment.currency);
      expect(response.body).toHaveProperty('status', 'pending');
    });

    it('should validate required fields', async () => {
      const invalidPayment = {
        payeeId: '1',
        // missing amount and currency
      };

      const response = await request(testApp)
        .post('/api/payments')
        .send(invalidPayment)
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/payments/:id', () => {
    it('should update a payment', async () => {
      const updatedPayment = {
        amount: 2000,
        description: 'Updated test payment'
      };

      const response = await request(testApp)
        .put('/api/payments/1')
        .send(updatedPayment)
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('amount', updatedPayment.amount);
      expect(response.body).toHaveProperty('description', updatedPayment.description);
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .put('/api/payments/999')
        .send({ amount: 2000 })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });
  });

  describe('DELETE /api/payments/:id', () => {
    it('should delete a payment', async () => {
      const response = await request(testApp)
        .delete('/api/payments/1')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .delete('/api/payments/999')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });
  });

  describe('GET /api/payments/:id/status', () => {
    it('should return payment status', async () => {
      const response = await request(testApp)
        .get('/api/payments/1/status')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('modifiedDate');
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .get('/api/payments/999/status')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });
  });

  describe('GET /api/payments/cleared', () => {
    it('should return cleared payments within date range', async () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const response = await request(testApp)
        .get('/api/payments/cleared')
        .query({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('status', 'cleared');
      expect(response.body[0]).toHaveProperty('clearedDate');
    });

    it('should validate date range', async () => {
      const response = await request(testApp)
        .get('/api/payments/cleared')
        .query({
          startDate: 'invalid-date',
          endDate: 'invalid-date'
        })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/payments/:id/approve', () => {
    it('should approve a payment', async () => {
      const response = await request(testApp)
        .post('/api/payments/1/approve')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('status', 'approved');
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .post('/api/payments/999/approve')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });
  });

  describe('POST /api/payments/:id/reject', () => {
    it('should reject a payment with reason', async () => {
      const response = await request(testApp)
        .post('/api/payments/1/reject')
        .send({ reason: 'Invalid payment details' })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('status', 'rejected');
      expect(response.body).toHaveProperty('reason', 'Invalid payment details');
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await request(testApp)
        .post('/api/payments/999/reject')
        .send({ reason: 'Invalid payment details' })
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Payment not found');
    });

    it('should require a rejection reason', async () => {
      const response = await request(testApp)
        .post('/api/payments/1/reject')
        .set(getAuthHeader(adminToken));

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
