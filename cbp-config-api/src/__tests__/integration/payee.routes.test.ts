import { authRequest, testUsers, clearTestData } from './helpers';

describe('Payee Routes', () => {
  beforeEach(async () => {
    await clearTestData();
  });

  describe('GET /api/payees', () => {
    it('should list payees with pagination', async () => {
      const response = await authRequest()
        .get('/api/payees')
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

    it('should mask sensitive data', async () => {
      const response = await authRequest()
        .get('/api/payees');

      expect(response.status).toBe(200);
      response.body.data.forEach((payee: any) => {
        expect(payee.accountNumber).toMatch(/^\*+\d{4}$/);
      });
    });
  });

  describe('GET /api/payees/:id', () => {
    it('should return payee details', async () => {
      const response = await authRequest()
        .get('/api/payees/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        status: expect.any(String)
      }));
    });

    it('should return 404 for non-existent payee', async () => {
      const response = await authRequest()
        .get('/api/payees/999999');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/payees', () => {
    const newPayee = {
      name: 'Test Payee',
      accountNumber: '1234567890',
      routingNumber: '987654321',
      paymentMethods: ['ACH'],
      address: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345'
    };

    it('should create new payee', async () => {
      const response = await authRequest(testUsers.admin)
        .post('/api/payees')
        .send(newPayee);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: 'Test Payee',
        status: 'ACTIVE'
      }));
    });

    it('should validate routing number', async () => {
      const response = await authRequest(testUsers.admin)
        .post('/api/payees')
        .send({
          ...newPayee,
          routingNumber: '123'
        });

      expect(response.status).toBe(400);
    });

    it('should require admin permissions', async () => {
      const response = await authRequest(testUsers.regular)
        .post('/api/payees')
        .send(newPayee);

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/payees/:id', () => {
    const updateData = {
      name: 'Updated Payee',
      status: 'INACTIVE'
    };

    it('should update payee', async () => {
      const response = await authRequest(testUsers.admin)
        .put('/api/payees/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: '1',
        name: 'Updated Payee',
        status: 'INACTIVE'
      }));
    });

    it('should prevent status update for payees with active payments', async () => {
      const response = await authRequest(testUsers.admin)
        .put('/api/payees/2')
        .send({ status: 'INACTIVE' });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/payees/:id', () => {
    it('should delete payee', async () => {
      const response = await authRequest(testUsers.admin)
        .delete('/api/payees/1');

      expect(response.status).toBe(200);
    });

    it('should prevent deletion of payee with active payments', async () => {
      const response = await authRequest(testUsers.admin)
        .delete('/api/payees/2');

      expect(response.status).toBe(400);
    });

    it('should require admin permissions', async () => {
      const response = await authRequest(testUsers.regular)
        .delete('/api/payees/1');

      expect(response.status).toBe(403);
    });
  });
});
