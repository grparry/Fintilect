import { Database } from '../config/db';
import { HttpError } from '../utils/errors';

export class ClientService {
  constructor(private db: Database) {}

  async getClients(page: number, pageSize: number) {
    const result = await this.db.executeProc('CLIENT', { page, pageSize });
    const clients = result.recordset;

    if (!clients.length) {
      return {
        data: [],
        pagination: {
          total: 0,
          page,
          pageSize,
          totalPages: 0
        }
      };
    }

    const total = clients[0].TotalCount;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: Array.from(clients).map(client => ({
        ...client,
        TotalCount: undefined
      })),
      pagination: {
        total,
        page,
        pageSize,
        totalPages
      }
    };
  }

  async getClient(id: number) {
    const result = await this.db.executeProc('CLIENT_GET', { id });
    if (!result.recordset.length) {
      throw new HttpError(404, 'Client not found');
    }
    return result.recordset[0];
  }

  async createClient(data: any) {
    const result = await this.db.executeProc('CLIENT_CREATE', data);
    if (!result.recordset.length) {
      throw new HttpError(500, 'Failed to create client');
    }
    return result.recordset[0];
  }

  async updateClient(id: number, data: any) {
    const result = await this.db.executeProc('CLIENT_UPDATE', { id, ...data });
    if (!result.recordset.length) {
      throw new HttpError(404, 'Client not found');
    }
    return result.recordset[0];
  }

  async deleteClient(id: number) {
    const result = await this.db.executeProc('CLIENT_DELETE', { id });
    if (!result.recordset.length) {
      throw new HttpError(404, 'Client not found');
    }
  }

  async getClientSettings(id: number) {
    const result = await this.db.executeProc('CLIENT_SETTINGS_GET', { id });
    if (!result.recordset.length) {
      throw new HttpError(404, 'Client settings not found');
    }
    return result.recordset[0];
  }

  async updateClientSettings(id: number, settings: any) {
    const result = await this.db.executeProc('CLIENT_SETTINGS_UPDATE', { id, ...settings });
    if (!result.recordset.length) {
      throw new HttpError(404, 'Client not found');
    }
    return result.recordset[0];
  }
}
