import { BaseService } from './BaseService';
import { IMoneyDesktopService } from '../../interfaces/IMoneyDesktopService';
import { Account, Connection, MoneyDesktopFilters } from '../../../types/money-desktop.types';
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';

export class MoneyDesktopService extends BaseService implements IMoneyDesktopService {
  constructor(basePath: string = '/api/money-desktop') {
    super(basePath);
  }

  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    const response = await this.get<ApiResponse<Connection[]>>(`/connections`, {
      params: {
        search: filters.searchTerm,
        status: filters.status || '',
        startDate: filters.dateRange?.start || '',
        endDate: filters.dateRange?.end || ''
      }
    });
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to get connections');
    }
    
    return response.data;
  }

  async getConnection(id: number): Promise<Connection> {
    const response = await this.get<ApiResponse<Connection>>(`/connections/${id}`);
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to get connection');
    }
    
    return response.data;
  }

  async getAccounts(filters: MoneyDesktopFilters): Promise<Account[]> {
    const response = await this.get<ApiResponse<Account[]>>(`/accounts`, {
      params: {
        search: filters.searchTerm,
        status: filters.status || '',
        type: filters.type || '',
        startDate: filters.dateRange?.start || '',
        endDate: filters.dateRange?.end || ''
      }
    });
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to get accounts');
    }
    
    return response.data;
  }

  async getAccount(id: number): Promise<Account> {
    const response = await this.get<ApiResponse<Account>>(`/accounts/${id}`);
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to get account');
    }
    
    return response.data;
  }

  async syncConnection(connectionId: number): Promise<void> {
    const response = await this.post<ApiResponse<Connection>>(`/connections/${connectionId}/sync`);
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to sync connection');
    }
  }

  async getConnectionAccounts(id: number, filters: MoneyDesktopFilters): Promise<Account[]> {
    const response = await this.get<ApiResponse<Account[]>>(`/connections/${id}/accounts`, {
      params: {
        search: filters.searchTerm,
        status: filters.status || '',
        type: filters.type || '',
        startDate: filters.dateRange?.start || '',
        endDate: filters.dateRange?.end || ''
      }
    });
    
    if ('error' in response) {
      throw new Error(response.error.message || 'Failed to get connection accounts');
    }
    
    return response.data;
  }

  protected handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(defaultMessage);
  }

  async exportConnections(filters: MoneyDesktopFilters): Promise<Blob> {
    try {
      const response = await this.get<Blob>('/export/connections', {
        params: {
          search: filters.searchTerm,
          status: filters.status || '',
          startDate: filters.dateRange?.start || '',
          endDate: filters.dateRange?.end || ''
        },
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      throw this.handleError(error, 'Failed to export connections');
    }
  }

  async exportAccounts(filters: MoneyDesktopFilters): Promise<Blob> {
    try {
      const response = await this.get<Blob>('/export/accounts', {
        params: {
          search: filters.searchTerm,
          status: filters.status || '',
          type: filters.type || '',
          startDate: filters.dateRange?.start || '',
          endDate: filters.dateRange?.end || ''
        },
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      throw this.handleError(error, 'Failed to export accounts');
    }
  }
}