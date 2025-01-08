import { TestDb } from '../../../config/test.db';
import { ResponseValidator } from './ResponseValidator';
import { PaginatedResponse } from '../../../types/common';
import { SettingRecord as ServiceSettingRecord, SettingCreateData as ServiceSettingCreateData, SettingUpdateData as ServiceSettingUpdateData } from '../../../services/settings.service';

export type SettingRecord = ServiceSettingRecord;
export type SettingCreateData = ServiceSettingCreateData;
export type SettingUpdateData = ServiceSettingUpdateData;

export interface NestedSettingValue {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  value: any;
  metadata?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
    items?: NestedSettingValue;
    properties?: { [key: string]: NestedSettingValue };
  };
}

export interface SettingStructure {
  type: 'flat' | 'nested';
  schema?: {
    properties: { [key: string]: NestedSettingValue };
  };
}

export const mockSettings = {
  standard: {
    SettingId: 'setting-1',
    Key: 'payment.default.currency',
    Value: 'USD',
    Category: 'PAYMENT',
    Status: 'ACTIVE',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    ModifiedBy: 'system',
    ModifiedDate: new Date(),
    DeletedBy: undefined,
    DeletedDate: undefined
  } as SettingRecord,
  inactive: {
    SettingId: 'setting-2',
    Key: 'notification.email.enabled',
    Value: 'false',
    Category: 'NOTIFICATION',
    Status: 'INACTIVE',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    ModifiedBy: 'system',
    ModifiedDate: new Date(),
    DeletedBy: undefined,
    DeletedDate: undefined
  } as SettingRecord,
  deleted: {
    SettingId: 'setting-3',
    Key: 'legacy.feature.enabled',
    Value: 'true',
    Category: 'FEATURE',
    Status: 'DELETED',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    ModifiedBy: 'system',
    ModifiedDate: new Date(),
    DeletedBy: 'system',
    DeletedDate: new Date()
  } as SettingRecord
};

export class SettingsTestHelper {
  static setupSettingsMocks(testDb: TestDb) {
    const settingsList = Object.values(mockSettings);

    // List settings mock
    testDb.setMockResponse('SETTING', (params: any) => {
      const { page = 1, pageSize = 10, category } = params;
      const offset = (page - 1) * pageSize;

      let filteredSettings = settingsList;
      if (category) {
        filteredSettings = filteredSettings.filter(s => s.Category === category);
      }

      const total = filteredSettings.length;
      const paginatedSettings = filteredSettings
        .slice(offset, offset + pageSize)
        .map(setting => ({
          ...setting,
          TotalCount: total
        }));

      return {
        recordset: paginatedSettings,
        recordsets: [],
        output: {},
        rowsAffected: [paginatedSettings.length]
      };
    });

    // Get setting mock
    testDb.setMockResponse('SETTING_GET', (params: any) => {
      const setting = settingsList.find(s => s.SettingId === params.id);
      return {
        recordset: setting ? [setting] : [],
        recordsets: [],
        output: {},
        rowsAffected: setting ? [1] : [0]
      };
    });

    // Get setting by key mock
    testDb.setMockResponse('SETTING_GET_BY_KEY', (params: any) => {
      const setting = settingsList.find(s => s.Key === params.key);
      return {
        recordset: setting ? [setting] : [],
        recordsets: [],
        output: {},
        rowsAffected: setting ? [1] : [0]
      };
    });

    // Create setting mock
    testDb.setMockResponse('SETTING_CREATE', (params: any) => {
      const newSetting: SettingRecord = {
        SettingId: `setting-${Date.now()}`,
        Key: params.Key,
        Value: params.Value,
        Category: params.Category,
        Status: params.Status || 'ACTIVE',
        CreatedBy: params.CreatedBy || 'system',
        CreatedDate: params.CreatedDate || new Date(),
        ModifiedBy: undefined,
        ModifiedDate: undefined,
        DeletedBy: undefined,
        DeletedDate: undefined
      };

      return {
        recordset: [newSetting],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Update setting mock
    testDb.setMockResponse('SETTING_UPDATE', (params: any) => {
      const { id, ...updates } = params;
      const setting = settingsList.find(s => s.SettingId === id);

      if (!setting) {
        return {
          recordset: [],
          recordsets: [],
          output: {},
          rowsAffected: [0]
        };
      }

      const updatedSetting = {
        ...setting,
        Value: updates.value || setting.Value,
        Category: updates.category || setting.Category,
        Status: updates.status || setting.Status,
        ModifiedBy: 'system',
        ModifiedDate: new Date()
      };

      return {
        recordset: [updatedSetting],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Delete setting mock
    testDb.setMockResponse('SETTING_DELETE', (params: any) => {
      const setting = settingsList.find(s => s.SettingId === params.id);

      if (!setting) {
        return {
          recordset: [],
          recordsets: [],
          output: {},
          rowsAffected: [0]
        };
      }

      return {
        recordset: [setting],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });
  }

  static validateSettingFields(setting: SettingRecord) {
    ResponseValidator.validateRequiredFields(setting, [
      'SettingId',
      'Key',
      'Value',
      'Category',
      'Status'
    ]);

    expect(setting.CreatedBy).toBeDefined();
    expect(setting.CreatedDate).toBeInstanceOf(Date);
    
    if (setting.ModifiedBy) {
      expect(setting.ModifiedDate).toBeInstanceOf(Date);
    }
    
    if (setting.DeletedBy) {
      expect(setting.DeletedDate).toBeInstanceOf(Date);
    }
  }

  static verifyListSettingsResponse(response: PaginatedResponse<SettingRecord>) {
    ResponseValidator.validatePaginatedResponse(response, 1, 10);
    
    const settings = response.data;
    settings.forEach((setting: SettingRecord) => {
      this.validateSettingFields(setting);
    });
  }

  static verifySettingResponse(setting: SettingRecord) {
    this.validateSettingFields(setting);
  }

  static validateNestedSettingValue(value: any, schema?: NestedSettingValue): void {
    if (!schema) {
      // If no schema provided, just validate the structure
      if (Array.isArray(value)) {
        value.forEach((item: unknown) => this.validateNestedSettingValue(item));
      } else if (typeof value === 'object' && value !== null) {
        Object.values(value).forEach((v: unknown) => this.validateNestedSettingValue(v));
      }
      return;
    }

    // Validate against schema
    switch (schema.type) {
      case 'string':
        expect(typeof value).toBe('string');
        if (schema.metadata?.pattern) {
          expect(value).toMatch(new RegExp(schema.metadata.pattern));
        }
        if (schema.metadata?.enum) {
          expect(schema.metadata.enum).toContain(value);
        }
        break;

      case 'number':
        expect(typeof value).toBe('number');
        if (schema.metadata?.min !== undefined) {
          expect(value).toBeGreaterThanOrEqual(schema.metadata.min);
        }
        if (schema.metadata?.max !== undefined) {
          expect(value).toBeLessThanOrEqual(schema.metadata.max);
        }
        break;

      case 'boolean':
        expect(typeof value).toBe('boolean');
        break;

      case 'array':
        expect(Array.isArray(value)).toBe(true);
        if (schema.metadata?.items) {
          value.forEach((item: unknown) => this.validateNestedSettingValue(item, schema.metadata?.items));
        }
        break;

      case 'object':
        expect(typeof value).toBe('object');
        expect(value).not.toBeNull();
        if (schema.metadata?.properties) {
          Object.entries(schema.metadata.properties).forEach(([key, propSchema]) => {
            expect(value).toHaveProperty(key);
            this.validateNestedSettingValue(value[key], propSchema);
          });
        }
        break;

      default:
        throw new Error(`Invalid schema type: ${schema.type}`);
    }
  }

  static validateSettingStructure(structure: SettingStructure): void {
    expect(structure).toHaveProperty('type');
    expect(['flat', 'nested']).toContain(structure.type);

    if (structure.type === 'nested') {
      expect(structure).toHaveProperty('schema');
      expect(structure.schema).toHaveProperty('properties');
      Object.entries(structure.schema!.properties).forEach(([key, value]) => {
        this.validateNestedSettingValue(value);
      });
    }
  }

  static verifySettingCreateData(data: SettingCreateData) {
    const errors = [];

    if (!data.key?.trim()) {
      errors.push({ field: 'key', message: 'Key is required' });
    }

    if (!data.value?.trim()) {
      errors.push({ field: 'value', message: 'Value is required' });
    }

    if (!data.category?.trim()) {
      errors.push({ field: 'category', message: 'Category is required' });
    }

    if (data.status && !['ACTIVE', 'INACTIVE'].includes(data.status)) {
      errors.push({ field: 'status', message: 'Invalid status' });
    }

    if (errors.length > 0) {
      throw new Error(`Invalid setting data: ${JSON.stringify(errors)}`);
    }
  }

  static verifySettingUpdateData(data: SettingUpdateData) {
    const errors = [];

    if (Object.keys(data).length === 0) {
      errors.push({ message: 'No update data provided' });
    }

    if (data.value !== undefined && !data.value.trim()) {
      errors.push({ field: 'value', message: 'Value cannot be empty' });
    }

    if (data.category !== undefined && !data.category.trim()) {
      errors.push({ field: 'category', message: 'Category cannot be empty' });
    }

    if (data.status && !['ACTIVE', 'INACTIVE', 'DELETED'].includes(data.status)) {
      errors.push({ field: 'status', message: 'Invalid status' });
    }

    if (errors.length > 0) {
      throw new Error(`Invalid setting data: ${JSON.stringify(errors)}`);
    }
  }
}

describe('SettingsHelper', () => {
  it.todo('should set up settings mocks');
  it.todo('should handle settings responses');
  it.todo('should validate settings data');
});
