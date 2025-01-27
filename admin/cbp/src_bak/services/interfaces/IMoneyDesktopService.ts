import { IBaseService } from './IBaseService';
import { Account, Connection, MoneyDesktopFilters } from '../types/money-desktop.types';

export interface IMoneyDesktopService extends IBaseService {
  /**


  /**
   * Get list of connections based on filters
   * @param filters MoneyDesktop filters
   * @returns List of connections
   */

  /**
   * Get list of accounts based on filters
   * @param filters MoneyDesktop filters
   * @returns List of accounts
   */

  /**
   * Sync a connection
   * @param connectionId Connection identifier
   */

  /**
   * Export connections data
   * @param filters MoneyDesktop filters
   * @returns Blob containing CSV data
   */

  /**
   * Export accounts data
   * @param filters MoneyDesktop filters
   * @returns Blob containing CSV data
   */
