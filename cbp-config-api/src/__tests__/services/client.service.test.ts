import { ClientService } from '../../services/client.service';
import { MockDatabase } from '../mocks/mockDb';
import { HttpError } from '../../middleware/error.middleware';

describe('ClientService', () => {
  let service: ClientService;
  let mockDb: MockDatabase;
  
  beforeEach(() => {
    mockDb = new MockDatabase();
    service = new ClientService();
    (service as any).repository = mockDb;
  });

  afterEach(() => {
    mockDb.reset();
  });

  describe('listClients', () => {
    it('should return paginated clients', async () => {
      const result = await service.listClients({
        page: 1,
        limit: 10
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(expect.objectContaining({
        id: 'client_1',
        name: 'Acme Corp',
        type: 'ENTERPRISE',
        status: 'ACTIVE'
      }));
      expect(result.pagination).toBeDefined();
    });

    it('should filter by status', async () => {
      const result = await service.listClients({
        status: 'ACTIVE'
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].status).toBe('ACTIVE');
    });

    it('should filter by type', async () => {
      const result = await service.listClients({
        type: 'ENTERPRISE'
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].type).toBe('ENTERPRISE');
    });

    it('should handle empty result set', async () => {
      mockDb.reset({ clients: [] });
      const result = await service.listClients({});
      expect(result.data).toHaveLength(0);
      expect(result.pagination).toEqual(expect.objectContaining({
        page: 1,
        limit: 10,
        total: 0
      }));
    });

    it('should handle pagination correctly', async () => {
      // Add more test clients
      mockDb.reset({
        clients: [
          { ClientId: 'client_1', Name: 'Acme Corp', Type: 'ENTERPRISE', Status: 'ACTIVE' },
          { ClientId: 'client_2', Name: 'Beta Inc', Type: 'SMB', Status: 'ACTIVE' },
          { ClientId: 'client_3', Name: 'Gamma LLC', Type: 'ENTERPRISE', Status: 'INACTIVE' },
          { ClientId: 'client_4', Name: 'Delta Co', Type: 'SMB', Status: 'ACTIVE' },
          { ClientId: 'client_5', Name: 'Epsilon Ltd', Type: 'ENTERPRISE', Status: 'ACTIVE' }
        ]
      });

      const page1 = await service.listClients({ page: 1, limit: 2 });
      const page2 = await service.listClients({ page: 2, limit: 2 });
      const page3 = await service.listClients({ page: 3, limit: 2 });

      expect(page1.data).toHaveLength(2);
      expect(page2.data).toHaveLength(2);
      expect(page3.data).toHaveLength(1);

      expect(page1.data[0].id).toBe('client_1');
      expect(page2.data[0].id).toBe('client_3');
      expect(page3.data[0].id).toBe('client_5');
    });

    it('should combine multiple filters', async () => {
      mockDb.reset({
        clients: [
          { ClientId: 'client_1', Name: 'Acme Corp', Type: 'ENTERPRISE', Status: 'ACTIVE' },
          { ClientId: 'client_2', Name: 'Beta Inc', Type: 'SMB', Status: 'ACTIVE' },
          { ClientId: 'client_3', Name: 'Gamma LLC', Type: 'ENTERPRISE', Status: 'INACTIVE' }
        ]
      });

      const result = await service.listClients({
        type: 'ENTERPRISE',
        status: 'ACTIVE'
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(expect.objectContaining({
        id: 'client_1',
        type: 'ENTERPRISE',
        status: 'ACTIVE'
      }));
    });
  });

  describe('getClientDetails', () => {
    it('should return client details', async () => {
      const result = await service.getClientDetails('client_1');

      expect(result).toEqual(expect.objectContaining({
        id: 'client_1',
        name: 'Acme Corp',
        type: 'ENTERPRISE',
        status: 'ACTIVE',
        environment: 'PRODUCTION'
      }));
    });

    it('should throw 404 when client not found', async () => {
      await expect(service.getClientDetails('invalid_id'))
        .rejects.toThrow(new HttpError(404, 'Client not found'));
    });

    it('should handle database errors gracefully', async () => {
      jest.spyOn(mockDb, 'executeProc').mockRejectedValueOnce(new Error('Database error'));
      await expect(service.getClientDetails('client_1'))
        .rejects.toThrow(new HttpError(500, 'Error retrieving client details'));
    });

    it('should return full client details including environment', async () => {
      const result = await service.getClientDetails('client_1');
      expect(result).toEqual(expect.objectContaining({
        id: 'client_1',
        name: 'Acme Corp',
        type: 'ENTERPRISE',
        status: 'ACTIVE',
        environment: 'PRODUCTION',
        settings: expect.objectContaining({
          general: expect.any(Object),
          security: expect.any(Object),
          notifications: expect.any(Object)
        })
      }));
    });
  });

  describe('getClientSettings', () => {
    it('should return client settings', async () => {
      const result = await service.getClientSettings('client_1');

      expect(result).toEqual(expect.objectContaining({
        general: expect.objectContaining({
          timezone: 'America/Denver',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: '12h'
        }),
        security: expect.objectContaining({
          passwordPolicy: expect.objectContaining({
            minLength: 8,
            requireUppercase: true
          }),
          loginPolicy: expect.objectContaining({
            maxAttempts: 3,
            lockoutDuration: 15
          })
        }),
        notifications: expect.objectContaining({
          emailEnabled: true,
          smsEnabled: true,
          pushEnabled: true
        })
      }));
    });

    it('should throw 404 when settings not found', async () => {
      await expect(service.getClientSettings('invalid_id'))
        .rejects.toThrow(new HttpError(404, 'Client settings not found'));
    });
  });

  describe('updateClientSettings', () => {
    const validSettings = {
      general: {
        timezone: 'America/Denver',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
        language: 'en'
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expirationDays: 90
        },
        loginPolicy: {
          maxAttempts: 3,
          lockoutDuration: 15
        },
        sessionTimeout: 30,
        mfaEnabled: true
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: true,
        pushEnabled: true,
        frequency: 'daily',
        alertTypes: ['payment', 'security', 'system']
      }
    };

    it('should update settings successfully', async () => {
      const result = await service.updateClientSettings('client_1', validSettings);

      expect(result).toEqual(expect.objectContaining({
        general: expect.objectContaining({
          timezone: 'America/Denver',
          dateFormat: 'MM/DD/YYYY'
        }),
        security: expect.objectContaining({
          passwordPolicy: expect.any(Object),
          loginPolicy: expect.any(Object)
        }),
        notifications: expect.objectContaining({
          emailEnabled: true,
          alertTypes: expect.any(Array)
        })
      }));
    });

    describe('validation', () => {
      it('should validate timezone', async () => {
        const invalidSettings = {
          ...validSettings,
          general: {
            ...validSettings.general,
            timezone: 'Invalid/Timezone'
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid timezone'));
      });

      it('should validate date format', async () => {
        const invalidSettings = {
          ...validSettings,
          general: {
            ...validSettings.general,
            dateFormat: 'invalid'
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid date format'));
      });

      it('should validate password policy', async () => {
        const invalidSettings = {
          ...validSettings,
          security: {
            ...validSettings.security,
            passwordPolicy: {
              ...validSettings.security.passwordPolicy,
              minLength: 4 // Too short
            }
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Password minimum length must be between 8 and 32'));
      });

      it('should validate login policy', async () => {
        const invalidSettings = {
          ...validSettings,
          security: {
            ...validSettings.security,
            loginPolicy: {
              ...validSettings.security.loginPolicy,
              maxAttempts: 20 // Too high
            }
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Max login attempts must be between 1 and 10'));
      });

      it('should validate notification frequency', async () => {
        const invalidSettings = {
          ...validSettings,
          notifications: {
            ...validSettings.notifications,
            frequency: 'invalid'
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid notification frequency'));
      });

      it('should validate alert types', async () => {
        const invalidSettings = {
          ...validSettings,
          notifications: {
            ...validSettings.notifications,
            alertTypes: ['invalid', 'payment']
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid alert types: invalid'));
      });

      it('should handle partial settings updates', async () => {
        const partialSettings = {
          general: {
            timezone: 'America/New_York'
          }
        };

        const result = await service.updateClientSettings('client_1', partialSettings);
        expect(result.general.timezone).toBe('America/New_York');
        // Other settings should remain unchanged
        expect(result.security).toBeDefined();
        expect(result.notifications).toBeDefined();
      });

      it('should validate IP whitelist format', async () => {
        const invalidSettings = {
          ...validSettings,
          security: {
            ...validSettings.security,
            ipWhitelist: ['invalid-ip', '256.256.256.256']
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid IP address format'));
      });

      it('should validate session timeout boundaries', async () => {
        const invalidSettings = {
          ...validSettings,
          security: {
            ...validSettings.security,
            sessionTimeout: 1441 // Exceeds maximum
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Session timeout must be between 1 and 1440 minutes'));
      });

      it('should handle empty arrays in settings', async () => {
        const settingsWithEmptyArrays = {
          ...validSettings,
          security: {
            ...validSettings.security,
            ipWhitelist: []
          },
          notifications: {
            ...validSettings.notifications,
            alertTypes: []
          }
        };

        const result = await service.updateClientSettings('client_1', settingsWithEmptyArrays);
        expect(result.security.ipWhitelist).toEqual([]);
        expect(result.notifications.alertTypes).toEqual([]);
      });

      it('should validate currency codes', async () => {
        const invalidSettings = {
          ...validSettings,
          general: {
            ...validSettings.general,
            currency: 'INVALID'
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid currency'));
      });

      it('should validate language codes', async () => {
        const invalidSettings = {
          ...validSettings,
          general: {
            ...validSettings.general,
            language: 'invalid'
          }
        };

        await expect(service.updateClientSettings('client_1', invalidSettings))
          .rejects.toThrow(new HttpError(400, 'Invalid language'));
      });
    });
  });
});
