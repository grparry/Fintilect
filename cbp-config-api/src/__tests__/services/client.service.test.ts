import { ClientService } from '../../services/client.service';
import { TestDb } from '../../config/test.db';
import { HttpError } from '../../utils/errors';
import { ClientRecord } from '../../models/client';

interface ClientRecordWithCount extends ClientRecord {
  TotalCount: number;
}

describe('ClientService', () => {
  let clientService: ClientService;
  let testDb: TestDb;

  beforeEach(() => {
    testDb = new TestDb();
    clientService = new ClientService(testDb);
  });

  describe('getClients', () => {
    it('should return paginated clients', async () => {
      const mockClients: ClientRecordWithCount[] = [
        {
          id: 1,
          name: 'Test Client 1',
          email: 'client1@example.com',
          status: 'active',
          clientType: 'standard',
          createdAt: new Date('2025-01-06T18:00:00-07:00'),
          updatedAt: new Date('2025-01-06T18:00:00-07:00'),
          TotalCount: 2
        },
        {
          id: 2,
          name: 'Test Client 2',
          email: 'client2@example.com',
          status: 'active',
          clientType: 'premium',
          createdAt: new Date('2025-01-06T18:00:00-07:00'),
          updatedAt: new Date('2025-01-06T18:00:00-07:00'),
          TotalCount: 2
        }
      ];

      testDb.setMockResponse('CLIENT', () => mockClients);

      const result = await clientService.getClients(1, 10);
      const expectedClients = mockClients.map(({ TotalCount, ...client }) => client);
      expect(result.data).toEqual(expectedClients);
      expect(result.pagination).toEqual({
        total: 2,
        page: 1,
        pageSize: 10,
        totalPages: 1
      });
    });

    it('should handle empty result', async () => {
      testDb.setMockResponse('CLIENT', () => []);

      const result = await clientService.getClients(1, 10);
      expect(result.data).toEqual([]);
      expect(result.pagination).toEqual({
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      });
    });

    it('should throw error on database failure', async () => {
      testDb.setMockResponse('CLIENT', () => {
        throw new Error('Failed to list clients');
      });

      await expect(clientService.getClients(1, 10)).rejects.toThrow('Failed to list clients');
    });
  });

  describe('getClient', () => {
    it('should return client by id', async () => {
      const mockClient: ClientRecord = {
        id: 1,
        name: 'Test Client',
        email: 'client@example.com',
        status: 'active',
        clientType: 'standard',
        createdAt: new Date('2025-01-06T18:00:00-07:00'),
        updatedAt: new Date('2025-01-06T18:00:00-07:00')
      };

      testDb.setMockResponse('CLIENT_GET', () => [mockClient]);

      const result = await clientService.getClient(1);
      expect(result).toEqual(mockClient);
    });

    it('should throw error if client not found', async () => {
      testDb.setMockResponse('CLIENT_GET', () => []);

      await expect(clientService.getClient(999)).rejects.toThrow(
        new HttpError(404, 'Client not found')
      );
    });
  });

  describe('createClient', () => {
    it('should create new client', async () => {
      const clientData = {
        name: 'New Client',
        email: 'new@example.com',
        status: 'active',
        clientType: 'standard'
      };

      const mockClient: ClientRecord = {
        id: 3,
        ...clientData,
        createdAt: new Date('2025-01-06T18:00:00-07:00'),
        updatedAt: new Date('2025-01-06T18:00:00-07:00')
      };

      testDb.setMockResponse('CLIENT_CREATE', () => [mockClient]);

      const result = await clientService.createClient(clientData);
      expect(result).toEqual(mockClient);
    });

    it('should throw error if creation fails', async () => {
      testDb.setMockResponse('CLIENT_CREATE', () => []);

      await expect(clientService.createClient({
        name: 'New Client',
        email: 'new@example.com'
      })).rejects.toThrow(
        new HttpError(500, 'Failed to create client')
      );
    });
  });

  describe('updateClient', () => {
    it('should update client', async () => {
      const updates = {
        name: 'Updated Client',
        email: 'updated@example.com'
      };

      const mockClient: ClientRecord = {
        id: 1,
        name: updates.name,
        email: updates.email,
        status: 'active',
        clientType: 'standard',
        createdAt: new Date('2025-01-06T18:00:00-07:00'),
        updatedAt: new Date('2025-01-06T18:00:00-07:00')
      };

      testDb.setMockResponse('CLIENT_UPDATE', () => [mockClient]);

      const result = await clientService.updateClient(1, updates);
      expect(result).toEqual(mockClient);
    });

    it('should throw error if client not found', async () => {
      testDb.setMockResponse('CLIENT_UPDATE', () => []);

      await expect(clientService.updateClient(999, {
        name: 'Updated Client',
        email: 'updated@example.com'
      })).rejects.toThrow(
        new HttpError(404, 'Client not found')
      );
    });
  });

  describe('deleteClient', () => {
    it('should delete client', async () => {
      testDb.setMockResponse('CLIENT_DELETE', () => [{ success: true }]);

      await expect(clientService.deleteClient(1)).resolves.not.toThrow();
    });

    it('should throw error if client not found', async () => {
      testDb.setMockResponse('CLIENT_DELETE', () => []);

      await expect(clientService.deleteClient(999)).rejects.toThrow(
        new HttpError(404, 'Client not found')
      );
    });
  });
});
