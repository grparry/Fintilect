import api from './api';
import { ApiSuccessResponse } from '../types/api.types';
import { Account, Connection, MoneyDesktopFilters } from '../types/money-desktop.types';
import { ServiceFactory } from './factory/ServiceFactory';

class MoneyDesktopService {
  private readonly baseUrl = '/api/money-desktop';
  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    const response = await api.get<Connection[]>(`${this.baseUrl}/connections`, {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
    });
    return response.data;
  }
  async getAccounts(filters: MoneyDesktopFilters): Promise<Account[]> {
    const response = await api.get<Account[]>(`${this.baseUrl}/accounts`, {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
    });
    return response.data;
  }
  async syncConnection(connectionId: number): Promise<void> {
    await api.post<void>(`${this.baseUrl}/connections/${connectionId}/sync`);
  }
  async exportConnections(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/connections/export`, {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
      responseType: 'blob',
    });
    return response.data;
  }
  async exportAccounts(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/accounts/export`, {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
      responseType: 'blob',
    });
    return response.data;
  }
}
const moneyDesktopService = ServiceFactory.getInstance().getMoneyDesktopService();
export { moneyDesktopService };