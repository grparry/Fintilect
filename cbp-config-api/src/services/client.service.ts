import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';

export class ClientService {
  private repository: BaseRepository;

  constructor() {
    this.repository = new BaseRepository();
  }

  async listClients(params: { status?: string; type?: string; page?: number; limit?: number }) {
    try {
      const { recordset } = await this.repository.executeProc('CLIENT_LIST', {
        Status: params.status,
        Type: params.type,
        Page: params.page || 1,
        PageSize: params.limit || 10
      });

      return {
        data: recordset.map(this.transformClient),
        pagination: {
          page: params.page || 1,
          limit: params.limit || 10,
          total: recordset.length
        }
      };
    } catch (error) {
      logger.error('Error listing clients:', error);
      throw new HttpError(500, 'Error retrieving client list');
    }
  }

  async getClientDetails(clientId: string) {
    try {
      const { recordset } = await this.repository.executeProc('CLIENT_DETAILS', {
        ClientId: clientId
      });

      if (!recordset.length) {
        throw new HttpError(404, 'Client not found');
      }

      return this.transformClient(recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting client details:', error);
      throw new HttpError(500, 'Error retrieving client details');
    }
  }

  async getClientSettings(clientId: string) {
    try {
      const { recordset } = await this.repository.executeProc('CLIENT_SETTINGS', {
        ClientId: clientId
      });

      if (!recordset.length) {
        throw new HttpError(404, 'Client settings not found');
      }

      return this.transformSettings(recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error getting client settings:', error);
      throw new HttpError(500, 'Error retrieving client settings');
    }
  }

  async updateClientSettings(clientId: string, settings: any) {
    try {
      this.validateSettings(settings);

      const { recordset } = await this.repository.executeProc('CLIENT_UPDATE_SETTINGS', {
        ClientId: clientId,
        Settings: settings
      });

      if (!recordset.length) {
        throw new HttpError(404, 'Client not found');
      }

      return this.transformSettings(recordset[0]);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error updating client settings:', error);
      throw new HttpError(500, 'Error updating client settings');
    }
  }

  private transformClient(data: any) {
    return {
      id: data.ClientId,
      name: data.Name,
      type: data.Type,
      status: data.Status,
      environment: data.Environment,
      settings: data.Settings ? this.transformSettings(data.Settings) : undefined
    };
  }

  private transformSettings(settings: any) {
    return {
      general: {
        timezone: settings.General?.Timezone,
        dateFormat: settings.General?.DateFormat,
        timeFormat: settings.General?.TimeFormat,
        currency: settings.General?.Currency,
        language: settings.General?.Language
      },
      security: {
        passwordPolicy: {
          minLength: settings.Security?.PasswordPolicy?.MinLength,
          requireUppercase: settings.Security?.PasswordPolicy?.RequireUppercase,
          requireLowercase: settings.Security?.PasswordPolicy?.RequireLowercase,
          requireNumbers: settings.Security?.PasswordPolicy?.RequireNumbers,
          requireSpecialChars: settings.Security?.PasswordPolicy?.RequireSpecialChars,
          expirationDays: settings.Security?.PasswordPolicy?.ExpirationDays
        },
        loginPolicy: {
          maxAttempts: settings.Security?.LoginPolicy?.MaxAttempts,
          lockoutDuration: settings.Security?.LoginPolicy?.LockoutDuration
        },
        sessionTimeout: settings.Security?.SessionTimeout,
        mfaEnabled: settings.Security?.MfaEnabled,
        ipWhitelist: settings.Security?.IpWhitelist || []
      },
      notifications: {
        emailEnabled: settings.Notifications?.EmailEnabled,
        smsEnabled: settings.Notifications?.SmsEnabled,
        pushEnabled: settings.Notifications?.PushEnabled,
        frequency: settings.Notifications?.Frequency,
        alertTypes: settings.Notifications?.AlertTypes || []
      }
    };
  }

  private validateSettings(settings: any) {
    // Validate general settings
    if (settings.general) {
      if (settings.general.timezone && !this.isValidTimezone(settings.general.timezone)) {
        throw new HttpError(400, 'Invalid timezone');
      }
      if (settings.general.dateFormat && !['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].includes(settings.general.dateFormat)) {
        throw new HttpError(400, 'Invalid date format');
      }
      if (settings.general.timeFormat && !['12h', '24h'].includes(settings.general.timeFormat)) {
        throw new HttpError(400, 'Invalid time format');
      }
      if (settings.general.currency && !['USD'].includes(settings.general.currency)) {
        throw new HttpError(400, 'Invalid currency');
      }
      if (settings.general.language && !['en'].includes(settings.general.language)) {
        throw new HttpError(400, 'Invalid language');
      }
    }

    // Validate security settings
    if (settings.security) {
      if (settings.security.passwordPolicy) {
        const { minLength, expirationDays } = settings.security.passwordPolicy;
        if (minLength && (minLength < 8 || minLength > 32)) {
          throw new HttpError(400, 'Password minimum length must be between 8 and 32');
        }
        if (expirationDays && (expirationDays < 0 || expirationDays > 365)) {
          throw new HttpError(400, 'Password expiration days must be between 0 and 365');
        }
      }

      if (settings.security.loginPolicy) {
        const { maxAttempts, lockoutDuration } = settings.security.loginPolicy;
        if (maxAttempts && (maxAttempts < 1 || maxAttempts > 10)) {
          throw new HttpError(400, 'Max login attempts must be between 1 and 10');
        }
        if (lockoutDuration && (lockoutDuration < 1 || lockoutDuration > 1440)) {
          throw new HttpError(400, 'Lockout duration must be between 1 and 1440 minutes');
        }
      }

      if (settings.security.sessionTimeout && (settings.security.sessionTimeout < 1 || settings.security.sessionTimeout > 1440)) {
        throw new HttpError(400, 'Session timeout must be between 1 and 1440 minutes');
      }

      if (settings.security.ipWhitelist) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const invalidIps = settings.security.ipWhitelist.filter((ip: string) => !ipRegex.test(ip));
        if (invalidIps.length > 0) {
          throw new HttpError(400, 'Invalid IP address format');
        }
      }
    }

    // Validate notification settings
    if (settings.notifications) {
      if (settings.notifications.frequency && !['daily', 'weekly', 'monthly'].includes(settings.notifications.frequency)) {
        throw new HttpError(400, 'Invalid notification frequency');
      }
      if (settings.notifications.alertTypes) {
        const validTypes = ['payment', 'security', 'system'];
        const invalidTypes = settings.notifications.alertTypes.filter((type: string) => !validTypes.includes(type));
        if (invalidTypes.length) {
          throw new HttpError(400, `Invalid alert types: ${invalidTypes.join(', ')}`);
        }
      }
    }
  }

  private isValidTimezone(timezone: string): boolean {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
      return true;
    } catch (error) {
      return false;
    }
  }
}
