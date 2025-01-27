import { Database } from '@cbp-config-api/config/db';
import { HttpError } from '@cbp-config-api/utils/errors';
import { PaginatedResponse } from '@cbp-config-api/types/common';
import { logger } from '@cbp-config-api/config/logger';

export interface ClientRecord {
  ClientId: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
  Settings?: ClientSettings;
}

export interface ClientRecordWithTotal extends ClientRecord {
  TotalCount?: number;
}

export interface ClientResponse extends ClientRecord {
  // Additional fields for API response
  paymentMethods?: string[];
  features?: string[];
}

export interface ClientSettings {
  paymentLimits: {
    daily: number;
    transaction: number;
  };
  paymentMethods?: string[];
  features?: {
    [key: string]: boolean;
  };
}

export interface CreateClientRequest {
  name: string;
  email: string;
  clientType: 'standard' | 'premium';
  settings?: ClientSettings;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  status?: 'active' | 'inactive';
  clientType?: 'standard' | 'premium';
  settings?: Partial<ClientSettings>;
}

export class ClientService {
  constructor(private db: Database) {}

  async getClients(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<ClientResponse>> {
    if (page < 1) {
      throw new HttpError(400, 'Invalid page number');
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new HttpError(400, 'Invalid page size');
    }

    try {
      const result = await this.db.executeProc('CLIENT', { page, pageSize });
      const clients = Array.from(result.recordset) as ClientRecordWithTotal[];

      if (!clients.length) {
        return {
          data: [],
          pagination: {
            total: 0,
            page,
            pageSize
          }
        };
      }

      const total = clients[0].TotalCount || 0;

      return {
        data: clients.map(({ TotalCount, ...client }) => client),
        pagination: {
          total,
          page,
          pageSize
        }
      };
    } catch (error) {
      logger.error('Error in getClients:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to list clients');
    }
  }

  async getClient(id: string): Promise<ClientResponse> {
    try {
      const result = await this.db.executeProc('CLIENT_GET', { id });
      
      if (!result.recordset.length) {
        throw new HttpError(404, 'Client not found');
      }
      
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in getClient:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to get client');
    }
  }

  async createClient(data: CreateClientRequest): Promise<ClientResponse> {
    try {
      this.validateClientData(data);

      const result = await this.db.executeProc('CLIENT_CREATE', {
        ...data,
        status: 'active'
      });

      if (!result.recordset.length) {
        throw new HttpError(500, 'Failed to create client');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in createClient:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to create client');
    }
  }

  async updateClient(
    id: string,
    updates: Partial<UpdateClientRequest>
  ): Promise<ClientResponse> {
    try {
      // First check if client exists
      const getResult = await this.db.executeProc('CLIENT_GET', { id });
      if (!getResult.recordset.length) {
        throw new HttpError(404, 'Client not found');
      }

      this.validateClientData(updates);

      const result = await this.db.executeProc('CLIENT_UPDATE', { id, ...updates });
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in updateClient:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to update client');
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      const result = await this.db.executeProc('CLIENT_DELETE', { id });
      
      if (!result.rowsAffected[0]) {
        throw new HttpError(404, 'Client not found');
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in deleteClient:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to delete client');
    }
  }

  async getClientSettings(id: string): Promise<ClientSettings> {
    try {
      const result = await this.db.executeProc('CLIENT_SETTINGS_GET', { id });
      
      if (!result.recordset.length) {
        throw new HttpError(404, 'Client settings not found');
      }
      
      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in getClientSettings:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to get client settings');
    }
  }

  async updateClientSettings(id: string, settings: Partial<ClientSettings>): Promise<ClientSettings> {
    try {
      // First check if client exists
      const getResult = await this.db.executeProc('CLIENT_GET', { id });
      if (!getResult.recordset.length) {
        throw new HttpError(404, 'Client not found');
      }

      // Validate settings
      this.validateClientSettings(settings);

      // Update settings
      const result = await this.db.executeProc('CLIENT_SETTINGS_UPDATE', { 
        id, 
        settings
      });

      if (!result.recordset.length) {
        throw new HttpError(500, 'Failed to update client settings');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error in updateClientSettings:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to update client settings');
    }
  }

  private validateClientData(data: CreateClientRequest | UpdateClientRequest) {
    if ('name' in data && data.name && data.name.length > 100) {
      throw new HttpError(400, 'Client name is too long');
    }

    if ('email' in data && data.email && !this.isValidEmail(data.email)) {
      throw new HttpError(400, 'Invalid email format');
    }

    if ('clientType' in data && data.clientType && !['standard', 'premium'].includes(data.clientType)) {
      throw new HttpError(400, 'Invalid client type');
    }

    if ('settings' in data && data.settings) {
      this.validateClientSettings(data.settings);
    }
  }

  private validateClientSettings(settings: Partial<ClientSettings>) {
    if (settings.paymentLimits) {
      const { daily, transaction } = settings.paymentLimits;
      
      if (typeof daily !== 'undefined') {
        if (typeof daily !== 'number' || daily < 0) {
          throw new HttpError(400, 'Invalid daily payment limit');
        }
      }

      if (typeof transaction !== 'undefined') {
        if (typeof transaction !== 'number' || transaction < 0) {
          throw new HttpError(400, 'Invalid transaction payment limit');
        }
      }
    }

    if (settings.paymentMethods) {
      if (!Array.isArray(settings.paymentMethods)) {
        throw new HttpError(400, 'Payment methods must be an array');
      }
    }

    if (settings.features) {
      if (typeof settings.features !== 'object') {
        throw new HttpError(400, 'Features must be an object');
      }
      
      for (const [key, value] of Object.entries(settings.features)) {
        if (typeof value !== 'boolean') {
          throw new HttpError(400, 'Feature values must be boolean');
        }
      }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
