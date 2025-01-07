import * as sql from 'mssql';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';
import { Database } from '../database';
import { clearCache } from '../middleware/cache.middleware';

interface HostConnection {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  hostUrl: string;
  port: number;
  protocol: 'FTP' | 'SFTP' | 'HTTP' | 'HTTPS';
  username: string;
  certificate?: string;
  lastConnectionTime?: Date;
  lastConnectionStatus?: string;
  maintenanceWindow?: {
    start: string;
    end: string;
    timezone: string;
  };
  retryPolicy?: {
    maxAttempts: number;
    backoffInterval: number;
  };
}

interface HostInfo {
  name: string;
  version: string;
  status: string;
  uptime: number;
}

interface HostConfig {
  settings: {
    maxConnections: number;
    timeout: number;
    retryAttempts: number;
  };
  security: {
    encryption: boolean;
    certificateExpiry: string;
  };
}

export class HostService extends BaseRepository {
  constructor(db: Database) {
    super('host', db);
  }

  async getConnection(): Promise<HostConnection> {
    try {
      const result = await this.executeProc('HOSTCONNECTION', {
        Action: 'GET'
      });

      if (!result.recordset[0]) {
        throw new HttpError(404, 'Host connection configuration not found');
      }

      return this.transformHostConnection(result.recordset[0]);
    } catch (error) {
      logger.error('Error getting host connection:', error);
      throw new HttpError(500, 'Failed to get host connection information');
    }
  }

  async updateConnection(connectionData: Partial<HostConnection>): Promise<HostConnection> {
    try {
      // Validate the connection before updating
      await this.validateConnection(connectionData);

      const result = await this.executeProc('HOSTCONNECTION', {
        Action: 'UPDATE',
        ...connectionData,
        ModifiedBy: 'system', // TODO: Get from auth context
        ModifiedDate: new Date()
      });

      if (!result.recordset[0]) {
        throw new HttpError(500, 'Failed to update host connection');
      }

      // Clear any cached host connection data
      clearCache('host/connection');

      // Test the connection after update
      await this.testConnection(result.recordset[0]);

      return this.transformHostConnection(result.recordset[0]);
    } catch (error) {
      logger.error('Error updating host connection:', error);
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to update host connection');
    }
  }

  async getHostInfo(): Promise<HostInfo> {
    try {
      const result = await this.executeProc<HostInfo>('GET_HOST_INFO');
      const info = result.recordset[0] as HostInfo;
      if (!info) {
        throw new HttpError(404, 'Host info not found');
      }
      return info;
    } catch (error) {
      logger.error('Error getting host info:', error);
      throw new HttpError(500, 'Failed to get host info');
    }
  }

  async getHostConfig(): Promise<HostConfig> {
    try {
      const result = await this.executeProc<HostConfig>('GET_HOST_CONFIG');
      const config = result.recordset[0] as HostConfig;
      if (!config) {
        throw new HttpError(404, 'Host config not found');
      }
      return config;
    } catch (error) {
      logger.error('Error getting host config:', error);
      throw new HttpError(500, 'Failed to get host config');
    }
  }

  private async validateConnection(connection: Partial<HostConnection>): Promise<void> {
    // Validate URL format
    if (connection.hostUrl && !this.isValidUrl(connection.hostUrl)) {
      throw new HttpError(400, 'Invalid host URL format');
    }

    // Validate port range
    if (connection.port && (connection.port < 1 || connection.port > 65535)) {
      throw new HttpError(400, 'Port must be between 1 and 65535');
    }

    // Validate protocol
    if (connection.protocol && !['FTP', 'SFTP', 'HTTP', 'HTTPS'].includes(connection.protocol)) {
      throw new HttpError(400, 'Invalid protocol');
    }

    // Validate maintenance window
    if (connection.maintenanceWindow) {
      const { start, end, timezone } = connection.maintenanceWindow;
      if (!this.isValidTimeFormat(start) || !this.isValidTimeFormat(end)) {
        throw new HttpError(400, 'Invalid maintenance window time format');
      }
      if (!this.isValidTimezone(timezone)) {
        throw new HttpError(400, 'Invalid timezone');
      }
    }

    // Validate retry policy
    if (connection.retryPolicy) {
      const { maxAttempts, backoffInterval } = connection.retryPolicy;
      if (maxAttempts < 1 || maxAttempts > 10) {
        throw new HttpError(400, 'Max attempts must be between 1 and 10');
      }
      if (backoffInterval < 1000 || backoffInterval > 300000) {
        throw new HttpError(400, 'Backoff interval must be between 1 and 300 seconds');
      }
    }
  }

  private async testConnection(connection: any): Promise<void> {
    try {
      await this.executeProc('HOSTCONNECTION_TEST', {
        ConnectionId: connection.id
      });
    } catch (error) {
      logger.error('Host connection test failed:', error);
      throw new HttpError(500, 'Host connection test failed after update');
    }
  }

  private transformHostConnection(data: any): HostConnection {
    return {
      id: data.ConnectionId,
      name: data.Name,
      status: data.Status,
      hostUrl: data.HostUrl,
      port: data.Port,
      protocol: data.Protocol,
      username: data.Username,
      certificate: data.Certificate,
      lastConnectionTime: data.LastConnectionTime,
      lastConnectionStatus: data.LastConnectionStatus,
      maintenanceWindow: data.MaintenanceWindow ? {
        start: data.MaintenanceWindow.Start,
        end: data.MaintenanceWindow.End,
        timezone: data.MaintenanceWindow.Timezone
      } : undefined,
      retryPolicy: data.RetryPolicy ? {
        maxAttempts: data.RetryPolicy.MaxAttempts,
        backoffInterval: data.RetryPolicy.BackoffInterval
      } : undefined
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private isValidTimeFormat(time: string): boolean {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  }

  private isValidTimezone(timezone: string): boolean {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
      return true;
    } catch {
      return false;
    }
  }
}
