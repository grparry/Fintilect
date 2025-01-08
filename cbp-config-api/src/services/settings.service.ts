import * as sql from 'mssql';
import { Database } from '../config/db';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';
import { BaseRepository } from '../repositories/base.repository';
import { PaginatedResponse, SqlResponse } from '../types/common';

export interface SettingRecord {
  SettingId: string;
  Key: string;
  Value: string;
  Category: string;
  Status: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
}

export interface SettingCreateData {
  key: string;
  value: string;
  description: string;
  category: string;
  status?: string;
}

export interface SettingUpdateData {
  key?: string;
  value?: string;
  description?: string;
  category?: string;
  status?: string;
}

export class SettingsService extends BaseRepository {
  constructor(db: Database) {
    super('settings', db);
  }

  async listSettings(page = 1, pageSize = 10, category?: string): Promise<PaginatedResponse<SettingRecord>> {
    try {
      if (page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }

      if (pageSize < 1 || pageSize > 100) {
        throw new HttpError(400, 'Invalid page size');
      }

      const result = await this.db.executeProc<SettingRecord & { TotalCount: number }>('SETTING', {
        page,
        pageSize,
        category
      });

      if (!result.recordset) {
        throw new HttpError(500, 'Invalid response from database');
      }

      const settings = result.recordset.filter(setting => setting.Status !== 'DELETED');
      const total = settings.length;

      return {
        data: settings,
        pagination: {
          total,
          page,
          pageSize
        }
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error listing settings:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to list settings');
    }
  }

  async getSetting(id: string): Promise<SettingRecord> {
    try {
      if (!id?.trim()) {
        throw new HttpError(400, 'Invalid setting ID');
      }

      const result = await this.db.executeProc<SettingRecord>('SETTING_GET', { id });
      
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Setting not found');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting setting ${id}:`, { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to get setting');
    }
  }

  async getSettingByKey(key: string): Promise<SettingRecord> {
    try {
      if (!key?.trim()) {
        throw new HttpError(400, 'Invalid setting key');
      }

      const result = await this.db.executeProc<SettingRecord>('SETTING_GET_BY_KEY', { key });
      
      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Setting not found');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error getting setting by key ${key}:`, { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to get setting');
    }
  }

  async createSetting(data: SettingCreateData): Promise<SettingRecord> {
    try {
      this.validateCreateData(data);

      const result = await this.db.executeProc<SettingRecord>('SETTING_CREATE', {
        Key: data.key,
        Value: data.value,
        Description: data.description,
        Category: data.category,
        Status: data.status || 'ACTIVE',
        CreatedBy: 'system',
        CreatedDate: new Date()
      });

      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(500, 'Failed to create setting');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error('Error creating setting:', { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to create setting');
    }
  }

  async updateSetting(id: string, data: SettingUpdateData): Promise<SettingRecord> {
    try {
      if (!id?.trim()) {
        throw new HttpError(400, 'Invalid setting ID');
      }

      this.validateUpdateData(data);

      const result = await this.db.executeProc<SettingRecord>('SETTING_UPDATE', {
        id,
        ...data,
        ModifiedBy: 'system',
        ModifiedDate: new Date()
      });

      if (!result.recordset || !result.recordset.length) {
        throw new HttpError(404, 'Setting not found');
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error updating setting ${id}:`, { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to update setting');
    }
  }

  async deleteSetting(id: string): Promise<void> {
    try {
      if (!id?.trim()) {
        throw new HttpError(400, 'Invalid setting ID');
      }

      const result = await this.db.executeProc('SETTING_DELETE', {
        id,
        DeletedBy: 'system',
        DeletedDate: new Date()
      });

      if (!result.rowsAffected[0]) {
        throw new HttpError(404, 'Setting not found');
      }
    } catch (error) {
      if (error instanceof HttpError) throw error;
      logger.error(`Error deleting setting ${id}:`, { error, stack: (error as Error).stack });
      throw new HttpError(500, 'Failed to delete setting');
    }
  }

  private validateCreateData(data: SettingCreateData) {
    const errors = [];

    if (!data.key?.trim()) {
      errors.push({ field: 'key', message: 'Key is required' });
    }

    if (!data.value?.trim()) {
      errors.push({ field: 'value', message: 'Value is required' });
    } else {
      try {
        const value = JSON.parse(data.value);
        if (typeof value === 'object' && value !== null) {
          this.validateSettingValue(value);
        }
      } catch (e) {
        // Value is not JSON, which is fine for flat settings
      }
    }

    if (!data.category?.trim()) {
      errors.push({ field: 'category', message: 'Category is required' });
    }

    if (data.status && !['ACTIVE', 'INACTIVE'].includes(data.status)) {
      errors.push({ field: 'status', message: 'Invalid status' });
    }

    if (errors.length > 0) {
      throw new HttpError(400, 'Invalid setting data', errors);
    }
  }

  private validateUpdateData(data: SettingUpdateData) {
    const errors = [];

    if (Object.keys(data).length === 0) {
      throw new HttpError(400, 'No update data provided');
    }

    if (data.value !== undefined) {
      if (!data.value.trim()) {
        errors.push({ field: 'value', message: 'Value cannot be empty' });
      } else {
        try {
          const value = JSON.parse(data.value);
          if (typeof value === 'object' && value !== null) {
            this.validateSettingValue(value);
          }
        } catch (e) {
          // Value is not JSON, which is fine for flat settings
        }
      }
    }

    if (data.category !== undefined && !data.category.trim()) {
      errors.push({ field: 'category', message: 'Category cannot be empty' });
    }

    if (data.status && !['ACTIVE', 'INACTIVE', 'DELETED'].includes(data.status)) {
      errors.push({ field: 'status', message: 'Invalid status' });
    }

    if (errors.length > 0) {
      throw new HttpError(400, 'Invalid setting data', errors);
    }
  }

  private validateSettingValue(value: any): void {
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          this.validateSettingValue(item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([key, val]) => {
        if (!key.trim()) {
          throw new HttpError(400, 'Setting object keys cannot be empty');
        }
        if (typeof val === 'object' && val !== null) {
          this.validateSettingValue(val);
        }
      });
    }
  }
}
