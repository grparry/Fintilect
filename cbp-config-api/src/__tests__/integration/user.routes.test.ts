import { authRequest, testUsers, clearTestData } from './helpers';

describe('User Routes', () => {
  beforeEach(async () => {
    await clearTestData();
  });

  describe('GET /api/users/payee-options/:payeeId', () => {
    it('should return user payee options', async () => {
      const response = await authRequest()
        .get('/api/users/payee-options/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        defaultPaymentMethod: expect.any(String),
        allowedPaymentMethods: expect.any(Array),
        paymentLimits: expect.objectContaining({
          daily: expect.any(Number),
          weekly: expect.any(Number),
          monthly: expect.any(Number)
        })
      }));
    });

    it('should return 404 for non-existent payee', async () => {
      const response = await authRequest()
        .get('/api/users/payee-options/999999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/users/payee-options/:payeeId', () => {
    const updateOptions = {
      defaultPaymentMethod: 'ACH',
      allowedPaymentMethods: ['ACH', 'CHECK'],
      paymentLimits: {
        daily: 1000,
        weekly: 5000,
        monthly: 20000
      },
      autoPayEnabled: true,
      notificationPreferences: {
        email: true,
        sms: false
      }
    };

    it('should update payee options', async () => {
      const response = await authRequest()
        .put('/api/users/payee-options/1')
        .send(updateOptions);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        defaultPaymentMethod: 'ACH',
        paymentLimits: expect.objectContaining({
          daily: 1000
        })
      }));
    });

    it('should validate payment limits hierarchy', async () => {
      const response = await authRequest()
        .put('/api/users/payee-options/1')
        .send({
          ...updateOptions,
          paymentLimits: {
            daily: 5000,
            weekly: 1000,
            monthly: 20000
          }
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/users/host-info', () => {
    it('should return host information', async () => {
      const response = await authRequest()
        .get('/api/users/host-info');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        name: expect.any(String),
        connectionStatus: expect.any(String),
        lastConnectionTime: expect.any(String)
      }));
    });

    it('should include feature flags', async () => {
      const response = await authRequest()
        .get('/api/users/host-info');

      expect(response.status).toBe(200);
      expect(response.body.features).toEqual(
        expect.arrayContaining([
          expect.any(String)
        ])
      );
    });
  });
});
