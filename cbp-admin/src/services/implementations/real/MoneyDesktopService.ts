import { BaseService } from '@/BaseService';
import { IMoneyDesktopService } from '@/../interfaces/IMoneyDesktopService';
import { Account, Connection, MoneyDesktopFilters } from '@/../../types/money-desktop.types';
import { ApiSuccessResponse } from '@/../../types/api.types';

export class MoneyDesktopService extends BaseService implements IMoneyDesktopService {
  constructor(basePath: string = '/api/money-desktop') {
    super(basePath);
  }

  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    return this.get<Connection[]>('/connections', {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
    });
  }

  async getAccounts(filters: MoneyDesktopFilters): Promise<Account[]> {
    return this.get<Account[]>('/accounts', {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
    });
  }

  async syncConnection(connectionId: number): Promise<void> {
    await this.post(`/connections/${connectionId}/sync`);
  }

  async exportConnections(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await this.get<Blob>('/connections/export', {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
      responseType: 'blob',
    });
    return response;
  }

  async exportAccounts(filters: MoneyDesktopFilters): Promise<Blob> {
    const response = await this.get<Blob>('/accounts/export', {
      params: {
        searchTerm: filters.searchTerm || '',
        status: filters.selectedStatus === 'all' ? '' : filters.selectedStatus || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
      },
      responseType: 'blob',
    });
    return response;
  }
}
