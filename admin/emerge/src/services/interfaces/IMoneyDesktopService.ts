import { IBaseService } from './IBaseService';
import { Account, Connection, MoneyDesktopFilters } from '../../types/money-desktop.types';

export interface IMoneyDesktopService extends IBaseService {
  /**
   * Get list of connections based on filters
   * @param filters MoneyDesktop filters
   * @returns List of connections
   */
  getConnections(filters: MoneyDesktopFilters): Promise<Connection[]>;
  /**
   * Get list of accounts based on filters
   * @param filters MoneyDesktop filters
   * @returns List of accounts
   */
  getAccounts(filters: MoneyDesktopFilters): Promise<Account[]>;
  /**
   * Sync a connection
   * @param connectionId Connection identifier
   */
  syncConnection(connectionId: number): Promise<void>;
  /**
   * Export connections data
   * @param filters MoneyDesktop filters
   * @returns Blob containing CSV data
   */
  exportConnections(filters: MoneyDesktopFilters): Promise<Blob>;
  /**
   * Export accounts data
   * @param filters MoneyDesktop filters
   * @returns Blob containing CSV data
   */
  exportAccounts(filters: MoneyDesktopFilters): Promise<Blob>;
}