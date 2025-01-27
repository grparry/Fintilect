import { ClientService } from '@/../services/client.service';
import { TestDb } from '@/../config/test.db';
import { TestContext } from '@/integration/context/TestContext';
import { ClientTestHelper, mockClients } from '@/integration/helpers/client.helper';
import { ResponseValidator } from '@/integration/helpers/ResponseValidator';
import { mockErrors } from '@/integration/fixtures/mockData';
import { HttpError } from '@/../utils/errors';

describe('ClientService', () => {
  let clientService: ClientService;
  let testDb: TestDb;

  beforeEach(async () => {
    await TestContext.setup();
    testDb = TestContext.getTestDatabase();
    clientService = new ClientService(testDb);
    ClientTestHelper.setupClientMocks(testDb);
  });

  afterEach(async () => {
    await TestContext.cleanup();
  });

  describe('getClients', () => {
    it('should return paginated clients', async () => {
      const page = 1;
      const pageSize = 10;

      const result = await clientService.getClients(page, pageSize);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.page).toBe(page);
      expect(result.pagination.pageSize).toBe(pageSize);
      expect(result.pagination.total).toBe(2);

      result.data.forEach(client => ClientTestHelper.verifyClientResponse(client));
      TestContext.verifyMockCalls('CLIENT', 1);
    });

    it('should handle empty result', async () => {
      testDb.setMockResponse('CLIENT', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      const result = await clientService.getClients(1, 10);
      expect(result.data).toEqual([]);
      expect(result.pagination.total).toBe(0);
    });

    it('should handle invalid pagination parameters', async () => {
      await expect(clientService.getClients(0, 10))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page number'));

      await expect(clientService.getClients(1, 0))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));

      await expect(clientService.getClients(1, 101))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));
    });
  });

  describe('getClient', () => {
    it('should return client by id', async () => {
      const result = await clientService.getClient(mockClients.standard.ClientId);
      
      ClientTestHelper.verifyClientResponse(result);
      ResponseValidator.validateRequiredFields(result, [
        'ClientId', 'Name', 'Email', 'Status', 'CreatedBy', 'CreatedDate'
      ]);
      
      TestContext.verifyMockCalls('CLIENT_GET', 1);
    });

    it('should handle non-existent client', async () => {
      await expect(clientService.getClient('non-existent-id'))
        .rejects
        .toThrow(new HttpError(404, 'Client not found'));
    });
  });

  describe('createClient', () => {
    it('should create a new client', async () => {
      const clientData = {
        name: 'New Client',
        email: 'newclient@example.com',
        clientType: 'standard' as const,
        settings: {
          paymentLimits: {
            daily: 10000,
            transaction: 5000
          }
        }
      };

      const result = await clientService.createClient(clientData);
      
      ClientTestHelper.verifyClientResponse(result);
      ResponseValidator.validateTimestamps(result, ['createdDate']);
      expect(result.Status).toBe('active');
      
      TestContext.verifyMockCalls('CLIENT_CREATE', 1);
    });

    it('should handle validation errors', async () => {
      // Test invalid email format
      await expect(clientService.createClient({
        name: 'Test Client',
        email: 'invalid-email',
        clientType: 'standard'
      })).rejects.toThrow(new HttpError(400, 'Invalid email format'));

      // Test invalid client type
      await expect(clientService.createClient({
        name: 'Test Client',
        email: 'test@example.com',
        clientType: 'invalid' as any
      })).rejects.toThrow(new HttpError(400, 'Invalid client type'));

      // Test name too long
      await expect(clientService.createClient({
        name: 'T'.repeat(101),
        email: 'test@example.com',
        clientType: 'standard'
      })).rejects.toThrow(new HttpError(400, 'Client name is too long'));
    });
  });

  describe('updateClient', () => {
    it('should update an existing client', async () => {
      const updateData = {
        name: 'Updated Client',
        email: 'updated@example.com',
        status: 'inactive' as const,
        clientType: 'premium' as const
      };

      const result = await clientService.updateClient(
        mockClients.standard.ClientId,
        updateData
      );
      
      ClientTestHelper.verifyClientResponse(result);
      ResponseValidator.validateTimestamps(result, ['createdDate', 'modifiedDate']);
      expect(result.Name).toBe(updateData.name);
      expect(result.Email).toBe(updateData.email);
      expect(result.Status).toBe(updateData.status);
      
      TestContext.verifyMockCalls('CLIENT_UPDATE', 1);
    });

    it('should handle non-existent client', async () => {
      testDb.setMockResponse('CLIENT_GET', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      await expect(clientService.updateClient('non-existent-id', { name: 'Test' }))
        .rejects
        .toThrow(new HttpError(404, 'Client not found'));
    });
  });

  describe('deleteClient', () => {
    it('should delete an existing client', async () => {
      await clientService.deleteClient(mockClients.standard.ClientId);
      TestContext.verifyMockCalls('CLIENT_DELETE', 1);
    });

    it('should handle non-existent client', async () => {
      testDb.setMockResponse('CLIENT_DELETE', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      await expect(clientService.deleteClient('non-existent-id'))
        .rejects
        .toThrow(new HttpError(404, 'Client not found'));
    });
  });

  describe('getClientSettings', () => {
    it('should return client settings', async () => {
      const result = await clientService.getClientSettings(mockClients.standard.ClientId);
      
      ClientTestHelper.verifyClientSettings(result);
      TestContext.verifyMockCalls('CLIENT_SETTINGS_GET', 1);
    });

    it('should handle non-existent client settings', async () => {
      await expect(clientService.getClientSettings('non-existent-id'))
        .rejects
        .toThrow(new HttpError(404, 'Client settings not found'));
    });
  });

  describe('updateClientSettings', () => {
    it('should update client settings', async () => {
      const settings = {
        paymentLimits: {
          daily: 20000,
          transaction: 10000
        }
      };

      const result = await clientService.updateClientSettings(
        mockClients.standard.ClientId,
        settings
      );
      
      ClientTestHelper.verifyClientSettings(result);
      expect(result.paymentLimits.daily).toBe(settings.paymentLimits.daily);
      expect(result.paymentLimits.transaction).toBe(settings.paymentLimits.transaction);
      
      TestContext.verifyMockCalls('CLIENT_SETTINGS_UPDATE', 1);
    });

    it('should handle non-existent client', async () => {
      await expect(clientService.updateClientSettings('non-existent-id', {
        paymentLimits: { daily: 1000, transaction: 500 }
      }))
        .rejects
        .toThrow(new HttpError(404, 'Client not found'));
    });
  });
});
