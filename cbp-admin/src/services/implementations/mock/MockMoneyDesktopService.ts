import { BaseMockService } from '@/BaseMockService';
import { IMoneyDesktopService } from '@/../interfaces/IMoneyDesktopService';
import { Account, Connection, MoneyDesktopFilters } from '@/../../types/money-desktop.types';
import { mockConnections, mockAccounts } from '@/data/money-desktop/mockMoneyDesktopData';

export class MockMoneyDesktopService extends BaseMockService implements IMoneyDesktopService {
  private connections: Connection[] = [...mockConnections];
  private accounts: Account[] = [...mockAccounts];

  constructor(basePath: string) {
    super(basePath);
  }

  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    await this.delay();

    let filteredConnections = [...this.connections];

    // Apply filters
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredConnections = filteredConnections.filter(conn =>
        conn.institutionName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.selectedStatus && filters.selectedStatus !== 'all') {
      filteredConnections = filteredConnections.filter(conn =>
        conn.status === filters.selectedStatus
      );
    }

    if (filters.startDate) {
      filteredConnections = filteredConnections.filter(conn =>
        new Date(conn.lastSync) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filteredConnections = filteredConnections.filter(conn =>
        new Date(conn.lastSync) <= new Date(filters.endDate!)
      );
    }

    return filteredConnections;
  }

  async getAccounts(filters: MoneyDesktopFilters): Promise<Account[]> {
    await this.delay();

    let filteredAccounts = [...this.accounts];

    // Apply filters
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredAccounts = filteredAccounts.filter(acc =>
        acc.accountName.toLowerCase().includes(searchTerm) ||
        acc.institutionName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.selectedStatus && filters.selectedStatus !== 'all') {
      filteredAccounts = filteredAccounts.filter(acc =>
        acc.status === filters.selectedStatus
      );
    }

    if (filters.startDate) {
      filteredAccounts = filteredAccounts.filter(acc =>
        new Date(acc.lastUpdated) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filteredAccounts = filteredAccounts.filter(acc =>
        new Date(acc.lastUpdated) <= new Date(filters.endDate!)
      );
    }

    return filteredAccounts;
  }

  async syncConnection(connectionId: number): Promise<void> {
    await this.delay();
    
    const connection = this.connections.find(c => c.id === connectionId);
    if (!connection) {
      throw new Error('Connection not found');
    }

    // Update connection sync time and clear any errors
    connection.lastSync = new Date().toISOString();
    connection.lastError = null;
    connection.status = 'Connected';

    // Update associated accounts
    this.accounts
      .filter(acc => acc.connectionId === connectionId)
      .forEach(acc => {
        acc.lastUpdated = new Date().toISOString();
        acc.status = 'Active';
      });
  }

  async exportConnections(filters: MoneyDesktopFilters): Promise<Blob> {
    const connections = await this.getConnections(filters);
    const csvContent = this.generateCSV(connections);
    return new Blob([csvContent], { type: 'text/csv' });
  }

  async exportAccounts(filters: MoneyDesktopFilters): Promise<Blob> {
    const accounts = await this.getAccounts(filters);
    const csvContent = this.generateCSV(accounts);
    return new Blob([csvContent], { type: 'text/csv' });
  }

  private generateCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(item => headers.map(header => item[header]));
    
    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
}
