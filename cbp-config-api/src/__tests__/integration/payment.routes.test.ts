import { authRequest, testUsers, clearTestData } from './helpers';

describe('Payment Routes', () => {
  beforeEach(async () => {
    await clearTestData();
  });

  describe('GET /api/payments', () => {
    it('should list payments with pagination', async () => {
      const response = await authRequest()
        .get('/api/payments')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        data: expect.any(Array),
        pagination: expect.objectContaining({
          page: 1,
          limit: 10,
          total: expect.any(Number)
        })
      }));
    });

    it('should filter payments by date range', async () => {
      const response = await authRequest()
        .get('/api/payments')
        .query({
          startDate: '2025-01-01',
          endDate: '2025-01-31'
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            paymentDate: expect.stringMatching(/^2025-01-/)
          })
        ])
      );
    });

    it('should require authentication', async () => {
      const response = await authRequest()
        .get('/api/payments')
        .set('Authorization', '');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/payments/:id', () => {
    it('should return payment details', async () => {
      const response = await authRequest()
        .get('/api/payments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(String),
        amount: expect.any(Number),
        status: expect.any(String)
      }));
    });

    it('should return 404 for non-existent payment', async () => {
      const response = await authRequest()
        .get('/api/payments/999999');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/payments', () => {
    const newPayment = {
      amount: 100.00,
      payeeId: '1',
      paymentDate: '2025-01-15',
      paymentMethod: 'ACH',
      description: 'Test payment'
    };

    it('should create new payment', async () => {
      const response = await authRequest()
        .post('/api/payments')
        .send(newPayment);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(String),
        amount: 100.00,
        status: 'PENDING'
      }));
    });

    it('should validate required fields', async () => {
      const response = await authRequest()
        .post('/api/payments')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should require proper permissions', async () => {
      const response = await authRequest({ ...testUsers.regular, permissions: [] })
        .post('/api/payments')
        .send(newPayment);

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/payments/:id', () => {
    const updateData = {
      amount: 150.00,
      paymentDate: '2025-01-20'
    };

    it('should update payment', async () => {
      const response = await authRequest(testUsers.admin)
        .put('/api/payments/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: '1',
        amount: 150.00
      }));
    });

    it('should validate update data', async () => {
      const response = await authRequest(testUsers.admin)
        .put('/api/payments/1')
        .send({ amount: -100 });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/payments/:id', () => {
    it('should cancel payment', async () => {
      const response = await authRequest(testUsers.admin)
        .delete('/api/payments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: '1',
        status: 'CANCELLED'
      }));
    });

    it('should prevent cancellation of processed payments', async () => {
      // Assuming payment ID 2 is already processed
      const response = await authRequest(testUsers.admin)
        .delete('/api/payments/2');

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/payments/status/:id', () => {
    it('should return payment status', async () => {
      const response = await authRequest()
        .get('/api/payments/status/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: '1',
        status: expect.any(String),
        lastUpdated: expect.any(String)
      }));
    });
  });

  describe('GET /api/payments/clear', () => {
    it('should list cleared payments', async () => {
      const response = await authRequest()
        .get('/api/payments/clear')
        .query({
          startDate: '2025-01-01',
          endDate: '2025-01-31'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            status: 'CLEARED'
          })
        ])
      }));
    });

    it('should require date range', async () => {
      const response = await authRequest()
        .get('/api/payments/clear');

      expect(response.status).toBe(400);
    });
  });
});
