import { TestDb, TestRecordSet } from '@/../../config/test.db';
import { ClientRecord, ClientRecordWithTotal, ClientSettings } from '@/../../services/client.service';
import { ResponseValidator } from '@/ResponseValidator';

export const mockClients = {
  standard: {
    ClientId: 'client-1',
    Name: 'Standard Client',
    Email: 'standard@example.com',
    Phone: '123-456-7890',
    Status: 'active',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    Settings: {
      paymentLimits: {
        daily: 10000,
        transaction: 5000
      },
      paymentMethods: ['ach', 'wire'],
      features: {
        bulkPayments: true,
        scheduledPayments: true
      }
    }
  } as ClientRecord,
  inactive: {
    ClientId: 'client-2',
    Name: 'Inactive Client',
    Email: 'inactive@example.com',
    Phone: '098-765-4321',
    Status: 'inactive',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    Settings: {
      paymentLimits: {
        daily: 50000,
        transaction: 25000
      },
      paymentMethods: ['ach', 'wire', 'check'],
      features: {
        bulkPayments: true,
        scheduledPayments: true,
        priorityProcessing: true
      }
    }
  } as ClientRecord
};

export class ClientTestHelper {
  static setupClientMocks(testDb: TestDb) {
    // List clients mock with pagination
    testDb.setMockResponse('CLIENT', (params: any) => {
      const { page = 1, pageSize = 10 } = params;
      const clients = [mockClients.standard, mockClients.inactive];
      const total = clients.length;
      
      const paginatedClients = clients
        .slice((page - 1) * pageSize, page * pageSize)
        .map(client => ({ ...client })) as ClientRecordWithTotal[];

      // Add TotalCount to first record only
      if (paginatedClients.length > 0) {
        paginatedClients[0].TotalCount = total;
      }

      return {
        recordset: paginatedClients,
        recordsets: [],
        output: {},
        rowsAffected: [total]
      };
    });

    // Get client mock
    testDb.setMockResponse('CLIENT_GET', (params: any) => {
      const { id } = params;
      const client = Object.values(mockClients).find(c => c.ClientId === id);
      
      return {
        recordset: client ? [client] : [],
        recordsets: [],
        output: {},
        rowsAffected: [client ? 1 : 0]
      };
    });

    // Create client mock
    testDb.setMockResponse('CLIENT_CREATE', (params: any) => {
      const newClient: ClientRecord = {
        ClientId: 'client-' + Date.now(),
        Name: params.name,
        Email: params.email,
        Phone: '123-456-7890',
        Status: 'active',
        CreatedBy: 'system',
        CreatedDate: new Date(),
        Settings: params.settings
      };

      return {
        recordset: [newClient],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Update client mock
    testDb.setMockResponse('CLIENT_UPDATE', (params: any) => {
      const client = { ...mockClients.standard };
      if (params.name) client.Name = params.name;
      if (params.email) client.Email = params.email;
      if (params.status) client.Status = params.status;
      client.ModifiedBy = 'system';
      client.ModifiedDate = new Date();

      return {
        recordset: [client],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Delete client mock
    testDb.setMockResponse('CLIENT_DELETE', () => ({
      recordset: [],
      recordsets: [],
      output: {},
      rowsAffected: [1]
    }));

    // Get client settings mock
    testDb.setMockResponse('CLIENT_SETTINGS_GET', (params: any) => {
      const { id } = params;
      const client = Object.values(mockClients).find(c => c.ClientId === id);
      
      return {
        recordset: client ? [client.Settings] : [],
        recordsets: [],
        output: {},
        rowsAffected: [client ? 1 : 0]
      };
    });

    // Update client settings mock
    testDb.setMockResponse('CLIENT_SETTINGS_UPDATE', (params: any) => {
      const { id, ...settings } = params;
      const client = Object.values(mockClients).find(c => c.ClientId === id);
      
      if (!client) {
        return {
          recordset: [],
          recordsets: [],
          output: {},
          rowsAffected: [0]
        };
      }

      const updatedSettings = {
        ...client.Settings,
        ...settings.settings,
        updatedAt: new Date()
      };

      return {
        recordset: [updatedSettings],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });
  }

  static verifyClientResponse(client: ClientRecord) {
    ResponseValidator.validateRequiredFields(client, [
      'ClientId',
      'Name',
      'Email',
      'Status',
      'CreatedBy',
      'CreatedDate'
    ] as Array<keyof ClientRecord>);

    expect(client.Status).toMatch(/^(active|inactive|deleted)$/);
    expect(client.CreatedBy).toBeDefined();
    expect(client.CreatedDate).toBeInstanceOf(Date);

    if (client.ModifiedDate) {
      expect(client.ModifiedBy).toBeDefined();
      expect(client.ModifiedDate).toBeInstanceOf(Date);
    }
  }

  static verifyListClientsResponse(clients: ClientRecordWithTotal[], page: number, pageSize: number) {
    expect(Array.isArray(clients)).toBe(true);
    expect(clients.length).toBeLessThanOrEqual(pageSize);
    clients.forEach(client => this.verifyClientResponse(client));
  }

  static verifyClientSettings(settings: ClientSettings) {
    expect(settings).toBeDefined();
    expect(settings.paymentLimits).toBeDefined();
    expect(settings.paymentLimits.daily).toBeGreaterThan(0);
    expect(settings.paymentLimits.transaction).toBeGreaterThan(0);
  }
}

describe('ClientHelper', () => {
  it.todo('should set up client mocks');
  it.todo('should handle client responses');
  it.todo('should validate client data');
});
