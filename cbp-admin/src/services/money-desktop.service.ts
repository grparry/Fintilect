import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import { Account, Connection, MoneyDesktopFilters } from '../types/money-desktop.types';

class MoneyDesktopService {
  private readonly baseUrl = '/api/money-desktop';

  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    const response = await api.get<ApiSuccessResponse<Connection[]>>(
      `${this.baseUrl}/connections`,
      {
        params: {
          searchTerm: filters.searchTerm,
          status: filters.selectedStatus === 'all' ? undefined : filters.selectedStatus,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      }
    );
    return response.data.data;
  }

  async getAccounts(filters: MoneyDesktopFilters): Promise<Account[]> {
    const response = await api.get<ApiSuccessResponse<Account[]>>(
      `${this.baseUrl}/accounts`,
      {
        params: {
          searchTerm: filters.searchTerm,
          status: filters.selectedStatus === 'all' ? undefined : filters.selectedStatus,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      }
    );
    return response.data.data;
  }

  async syncConnection(connectionId: number): Promise<void> {
    await api.post(`${this.baseUrl}/connections/${connectionId}/sync`);
  }

  async exportConnections(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/connections/export`,
      {
        params: {
          searchTerm: filters.searchTerm,
          status: filters.selectedStatus === 'all' ? undefined : filters.selectedStatus,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
        responseType: 'blob',
      }
    );
    return response.data;
  }

  async exportAccounts(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await api.get<Blob>(
      `${this.baseUrl}/accounts/export`,
      {
        params: {
          searchTerm: filters.searchTerm,
          status: filters.selectedStatus === 'all' ? undefined : filters.selectedStatus,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
        responseType: 'blob',
      }
    );
    return response.data;
  }
}

export const moneyDesktopService = new MoneyDesktopService();
