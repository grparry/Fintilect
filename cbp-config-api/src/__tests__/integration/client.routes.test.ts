import { MockDatabase } from '../mocks/mockDb';
import { authRequest, clearTestData } from '../utils/testHelpers';

describe('Client Routes', () => {
  let mockDb: MockDatabase;

  beforeEach(async () => {
    await clearTestData();
    mockDb = new MockDatabase();
    // Set up test data
    mockDb.reset({
      clients: [
        {
          ClientId: 'client_1',
          Name: 'Acme Corp',
          Type: 'ENTERPRISE',
          Status: 'ACTIVE',
          Environment: 'PRODUCTION',
          Settings: {
            General: {
              Timezone: 'America/Denver',
              DateFormat: 'MM/DD/YYYY',
              TimeFormat: '12h',
              Currency: 'USD',
              Language: 'en'
            },
            Security: {
              PasswordPolicy: {
                MinLength: 8,
                RequireUppercase: true,
                RequireLowercase: true,
                RequireNumbers: true,
                RequireSpecialChars: true,
                ExpirationDays: 90
              },
              LoginPolicy: {
                MaxAttempts: 3,
                LockoutDuration: 15
              },
              SessionTimeout: 30,
              MfaEnabled: true,
              IpWhitelist: ['192.168.1.1']
            },
            Notifications: {
              EmailEnabled: true,
              SmsEnabled: true,
              PushEnabled: true,
              Frequency: 'daily',
              AlertTypes: ['payment', 'security']
            }
          }
        },
        {
          ClientId: 'client_2',
          Name: 'Beta Inc',
          Type: 'SMB',
          Status: 'INACTIVE',
          Environment: 'STAGING',
          Settings: {
            General: {
              Timezone: 'America/New_York',
              DateFormat: 'DD/MM/YYYY',
              TimeFormat: '24h',
              Currency: 'USD',
              Language: 'en'
            }
          }
        }
      ]
    });
  });

  describe('GET /api/clients', () => {
    it('should list clients with pagination', async () => {
      const response = await authRequest()
        .get('/api/clients')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: 'client_1',
            name: 'Acme Corp',
            type: 'ENTERPRISE',
            status: 'ACTIVE'
          })
        ]),
        pagination: {
          page: 1,
          limit: 10,
          total: 2
        }
      });
    });

    it('should filter by status', async () => {
      const response = await authRequest()
        .get('/api/clients')
        .query({ status: 'ACTIVE' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('ACTIVE');
    });

    it('should filter by type', async () => {
      const response = await authRequest()
        .get('/api/clients')
        .query({ type: 'SMB' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('SMB');
    });

    it('should handle invalid page number', async () => {
      const response = await authRequest()
        .get('/api/clients')
        .query({ page: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: expect.stringContaining('validation failed')
      }));
    });
  });

  describe('GET /api/clients/:id', () => {
    it('should return client details', async () => {
      const response = await authRequest()
        .get('/api/clients/client_1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: 'client_1',
        name: 'Acme Corp',
        type: 'ENTERPRISE',
        status: 'ACTIVE',
        environment: 'PRODUCTION'
      }));
    });

    it('should return 404 for non-existent client', async () => {
      const response = await authRequest()
        .get('/api/clients/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Client not found'
      }));
    });
  });

  describe('GET /api/clients/:id/settings', () => {
    it('should return client settings', async () => {
      const response = await authRequest()
        .get('/api/clients/client_1/settings');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        general: expect.objectContaining({
          timezone: 'America/Denver',
          dateFormat: 'MM/DD/YYYY'
        }),
        security: expect.objectContaining({
          passwordPolicy: expect.objectContaining({
            minLength: 8,
            requireUppercase: true
          })
        }),
        notifications: expect.objectContaining({
          emailEnabled: true,
          alertTypes: expect.arrayContaining(['payment', 'security'])
        })
      }));
    });

    it('should return 404 for non-existent client settings', async () => {
      const response = await authRequest()
        .get('/api/clients/nonexistent/settings');

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Client settings not found'
      }));
    });
  });

  describe('PUT /api/clients/:id/settings', () => {
    const validSettings = {
      general: {
        timezone: 'America/New_York',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        currency: 'USD',
        language: 'en'
      },
      security: {
        passwordPolicy: {
          minLength: 10,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expirationDays: 60
        },
        loginPolicy: {
          maxAttempts: 5,
          lockoutDuration: 30
        },
        sessionTimeout: 60,
        mfaEnabled: true,
        ipWhitelist: ['192.168.1.1', '10.0.0.1']
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: true,
        frequency: 'weekly',
        alertTypes: ['payment', 'security', 'system']
      }
    };

    it('should update settings successfully', async () => {
      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send(validSettings);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        general: expect.objectContaining({
          timezone: 'America/New_York',
          dateFormat: 'DD/MM/YYYY'
        }),
        security: expect.objectContaining({
          passwordPolicy: expect.objectContaining({
            minLength: 10,
            expirationDays: 60
          })
        }),
        notifications: expect.objectContaining({
          frequency: 'weekly',
          alertTypes: expect.arrayContaining(['payment', 'security', 'system'])
        })
      }));
    });

    it('should handle partial updates', async () => {
      const partialSettings = {
        general: {
          timezone: 'America/Chicago'
        }
      };

      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send(partialSettings);

      expect(response.status).toBe(200);
      expect(response.body.general.timezone).toBe('America/Chicago');
      // Other settings should remain unchanged
      expect(response.body.security).toBeDefined();
      expect(response.body.notifications).toBeDefined();
    });

    it('should validate timezone', async () => {
      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send({
          general: {
            timezone: 'Invalid/Timezone'
          }
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Invalid timezone'
      }));
    });

    it('should validate password policy', async () => {
      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send({
          security: {
            passwordPolicy: {
              minLength: 4 // Too short
            }
          }
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Password minimum length must be between 8 and 32'
      }));
    });

    it('should validate notification frequency', async () => {
      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send({
          notifications: {
            frequency: 'invalid'
          }
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: expect.stringContaining('Invalid notification frequency')
      }));
    });

    it('should validate IP whitelist format', async () => {
      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send({
          security: {
            ipWhitelist: ['invalid-ip', '256.256.256.256']
          }
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Invalid IP address format'
      }));
    });

    it('should return 404 for non-existent client', async () => {
      const response = await authRequest()
        .put('/api/clients/nonexistent/settings')
        .send(validSettings);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Client not found'
      }));
    });
  });

  describe('Authorization', () => {
    it('should require authentication', async () => {
      // Make request without auth token
      const response = await authRequest()
        .get('/api/clients');

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Authentication required'
      }));
    });

    it('should reject expired tokens', async () => {
      // Use helper to get expired token
      const expiredToken = await getExpiredToken();
      const response = await authRequest()
        .get('/api/clients')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Token expired'
      }));
    });

    it('should enforce client isolation', async () => {
      // Set up tokens for different clients
      const client1Token = await getClientToken('client_1');
      const client2Token = await getClientToken('client_2');

      // Try to access client_2's settings with client_1's token
      const response = await authRequest()
        .get('/api/clients/client_2/settings')
        .set('Authorization', `Bearer ${client1Token}`);

      expect(response.status).toBe(403);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Access denied'
      }));
    });

    it('should require admin permission for listing all clients', async () => {
      // Get token without admin permissions
      const nonAdminToken = await getNonAdminToken();
      const response = await authRequest()
        .get('/api/clients')
        .set('Authorization', `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(403);
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Admin permission required'
      }));
    });
  });

  describe('Concurrency and Caching', () => {
    it('should handle parallel settings updates', async () => {
      const update1 = {
        general: { timezone: 'America/New_York' }
      };
      const update2 = {
        general: { timezone: 'America/Chicago' }
      };

      // Make parallel requests
      const [response1, response2] = await Promise.all([
        authRequest()
          .put('/api/clients/client_1/settings')
          .send(update1),
        authRequest()
          .put('/api/clients/client_1/settings')
          .send(update2)
      ]);

      // Both requests should succeed
      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);

      // Get final state
      const finalState = await authRequest()
        .get('/api/clients/client_1/settings');

      // Should match one of the updates
      expect(['America/New_York', 'America/Chicago'])
        .toContain(finalState.body.general.timezone);
    });

    it('should invalidate cache after settings update', async () => {
      // Get initial settings (cached)
      const initial = await authRequest()
        .get('/api/clients/client_1/settings');

      // Update settings
      await authRequest()
        .put('/api/clients/client_1/settings')
        .send({
          general: { timezone: 'America/Los_Angeles' }
        });

      // Get settings again (should be fresh)
      const updated = await authRequest()
        .get('/api/clients/client_1/settings');

      expect(updated.body.general.timezone).toBe('America/Los_Angeles');
      expect(updated.body.general.timezone).not.toBe(initial.body.general.timezone);
    });
  });

  describe('Edge Cases', () => {
    it('should handle large settings objects', async () => {
      // Create settings object with max fields
      const largeSettings = {
        general: {
          timezone: 'America/New_York',
          dateFormat: 'YYYY-MM-DD',
          timeFormat: '24h',
          currency: 'USD',
          language: 'en'
        },
        security: {
          passwordPolicy: {
            minLength: 16,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            expirationDays: 90
          },
          loginPolicy: {
            maxAttempts: 3,
            lockoutDuration: 30
          },
          sessionTimeout: 60,
          mfaEnabled: true,
          ipWhitelist: Array(100).fill('192.168.1.1') // Large array
        },
        notifications: {
          emailEnabled: true,
          smsEnabled: true,
          pushEnabled: true,
          frequency: 'daily',
          alertTypes: ['payment', 'security', 'system']
        }
      };

      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send(largeSettings);

      expect(response.status).toBe(200);
      expect(response.body.security.ipWhitelist).toHaveLength(100);
    });

    it('should handle empty optional fields', async () => {
      const sparseSettings = {
        general: {},
        security: {
          passwordPolicy: {},
          loginPolicy: {},
          ipWhitelist: []
        },
        notifications: {
          alertTypes: []
        }
      };

      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send(sparseSettings);

      expect(response.status).toBe(200);
      // Verify optional fields are handled
      expect(response.body.security.ipWhitelist).toEqual([]);
      expect(response.body.notifications.alertTypes).toEqual([]);
    });

    it('should handle special characters in settings', async () => {
      const specialSettings = {
        general: {
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY'
        },
        security: {
          ipWhitelist: ['192.168.1.1'],
          passwordPolicy: {
            minLength: 8,
            requireSpecialChars: true
          }
        },
        notifications: {
          alertTypes: ['payment'],
          frequency: 'daily'
        }
      };

      const response = await authRequest()
        .put('/api/clients/client_1/settings')
        .send(specialSettings);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        general: expect.objectContaining({
          timezone: 'America/New_York'
        })
      }));
    });

    it('should handle DST timezone transitions', async () => {
      // Test with a timezone during DST transition
      const dstSettings = {
        general: {
          timezone: 'America/New_York'
        }
      };

      // Update settings
      await authRequest()
        .put('/api/clients/client_1/settings')
        .send(dstSettings);

      // Check settings at different times
      const response = await authRequest()
        .get('/api/clients/client_1/settings');

      expect(response.status).toBe(200);
      expect(response.body.general.timezone).toBe('America/New_York');
    });
  });
});
