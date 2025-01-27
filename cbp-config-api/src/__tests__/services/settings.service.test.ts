import { SettingsService } from '@/../services/settings.service';
import { TestDatabase } from '@/../config/test.db';
import { HttpError } from '@/../utils/errors';
import { SettingsTestHelper, mockSettings } from '@/integration/helpers/settings.helper';

describe('SettingsService', () => {
  let settingsService: SettingsService;
  let testDb: TestDatabase;

  beforeEach(() => {
    testDb = new TestDatabase();
    settingsService = new SettingsService(testDb);
    SettingsTestHelper.setupSettingsMocks(testDb);
  });

  describe('listSettings', () => {
    it('should list all active settings with pagination', async () => {
      const result = await settingsService.listSettings(1, 10);

      SettingsTestHelper.verifyListSettingsResponse(result);
      expect(result.data).toHaveLength(2); // standard and inactive settings
      expect(result.pagination.total).toBe(2);
      expect(result.data.some(s => s.Status === 'DELETED')).toBe(false);
    });

    it('should filter settings by category', async () => {
      const result = await settingsService.listSettings(1, 10, 'PAYMENT');

      SettingsTestHelper.verifyListSettingsResponse(result);
      expect(result.data.every(s => s.Category === 'PAYMENT')).toBe(true);
    });

    it('should handle empty results', async () => {
      testDb.setMockResponse('SETTING', () => ({
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      const result = await settingsService.listSettings(1, 10);

      SettingsTestHelper.verifyListSettingsResponse(result);
      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });

    it('should throw error for invalid page number', async () => {
      await expect(settingsService.listSettings(0, 10))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page number'));
    });

    it('should throw error for invalid page size', async () => {
      await expect(settingsService.listSettings(1, 0))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));

      await expect(settingsService.listSettings(1, 101))
        .rejects
        .toThrow(new HttpError(400, 'Invalid page size'));
    });

    it('should throw error if database returns invalid response', async () => {
      testDb.setMockResponse('SETTING', () => ({
        recordset: undefined,
        recordsets: [],
        output: {},
        rowsAffected: [0]
      }));

      await expect(settingsService.listSettings(1, 10))
        .rejects
        .toThrow(new HttpError(500, 'Invalid response from database'));
    });
  });

  describe('getSetting', () => {
    it('should get an active setting by id', async () => {
      const result = await settingsService.getSetting(mockSettings.standard.SettingId);

      SettingsTestHelper.verifySettingResponse(result);
      expect(result.SettingId).toBe(mockSettings.standard.SettingId);
      expect(result.Status).toBe('ACTIVE');
    });

    it('should get an inactive setting by id', async () => {
      const result = await settingsService.getSetting(mockSettings.inactive.SettingId);

      SettingsTestHelper.verifySettingResponse(result);
      expect(result.SettingId).toBe(mockSettings.inactive.SettingId);
      expect(result.Status).toBe('INACTIVE');
    });

    it('should throw error for invalid setting id', async () => {
      await expect(settingsService.getSetting(''))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));

      await expect(settingsService.getSetting('   '))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));
    });

    it('should throw error when setting not found', async () => {
      await expect(settingsService.getSetting('nonexistent'))
        .rejects
        .toThrow(new HttpError(404, 'Setting not found'));
    });

    it('should validate setting fields', async () => {
      const result = await settingsService.getSetting(mockSettings.standard.SettingId);

      expect(result).toBeDefined();
      expect(result.Key).toBeDefined();
      expect(result.Value).toBeDefined();
      expect(result.Category).toBeDefined();
      expect(result.Status).toBeDefined();
      expect(result.CreatedBy).toBeDefined();
      expect(result.CreatedDate).toBeInstanceOf(Date);
      expect(result.ModifiedBy).toBeDefined();
      expect(result.ModifiedDate).toBeInstanceOf(Date);
    });
  });

  describe('getSettingByKey', () => {
    it('should get an active setting by key', async () => {
      const result = await settingsService.getSettingByKey(mockSettings.standard.Key);

      SettingsTestHelper.verifySettingResponse(result);
      expect(result.Key).toBe(mockSettings.standard.Key);
      expect(result.Status).toBe('ACTIVE');
    });

    it('should throw error for invalid setting key', async () => {
      await expect(settingsService.getSettingByKey(''))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting key'));

      await expect(settingsService.getSettingByKey('   '))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting key'));
    });

    it('should throw error when setting not found', async () => {
      await expect(settingsService.getSettingByKey('nonexistent.key'))
        .rejects
        .toThrow(new HttpError(404, 'Setting not found'));
    });
  });

  describe('createSetting', () => {
    const validSettingData = {
      key: 'test.setting',
      value: 'test-value',
      category: 'TEST',
      description: 'Test setting',
      status: 'ACTIVE'
    };

    it('should create setting with valid data', async () => {
      const result = await settingsService.createSetting(validSettingData);

      SettingsTestHelper.verifySettingResponse(result);
      expect(result.Key).toBe(validSettingData.key);
      expect(result.Value).toBe(validSettingData.value);
      expect(result.Category).toBe(validSettingData.category);
      expect(result.Status).toBe(validSettingData.status);
      expect(result.CreatedBy).toBe('system');
      expect(result.CreatedDate).toBeDefined();
    });

    it('should create setting with default active status', async () => {
      const { status, ...dataWithoutStatus } = validSettingData;
      const result = await settingsService.createSetting(dataWithoutStatus);

      SettingsTestHelper.verifySettingResponse(result);
      expect(result.Status).toBe('ACTIVE');
    });

    it('should validate required fields', async () => {
      const invalidData = {
        key: '',
        value: '',
        category: '',
        description: '',
        status: ''
      };

      await expect(settingsService.createSetting(invalidData))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));
    });

    it('should throw error for missing required fields', async () => {
      await expect(settingsService.createSetting({ ...validSettingData, key: '' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));

      await expect(settingsService.createSetting({ ...validSettingData, value: '' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));

      await expect(settingsService.createSetting({ ...validSettingData, category: '' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));
    });

    it('should throw error for invalid status', async () => {
      await expect(settingsService.createSetting({ ...validSettingData, status: 'INVALID' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));
    });
  });

  describe('updateSetting', () => {
    const validUpdateData = {
      value: 'updated-value',
      category: 'UPDATED',
      status: 'ACTIVE'
    };

    it('should update setting successfully', async () => {
      const result = await settingsService.updateSetting(mockSettings.standard.SettingId, validUpdateData);

      expect(result).toBeDefined();
      expect(result.Value).toBe(validUpdateData.value);
      expect(result.Category).toBe(validUpdateData.category);
      expect(result.Status).toBe(validUpdateData.status);
    });

    it('should throw error for invalid setting id', async () => {
      await expect(settingsService.updateSetting('', validUpdateData))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));

      await expect(settingsService.updateSetting('   ', validUpdateData))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));
    });

    it('should throw error when setting not found', async () => {
      await expect(settingsService.updateSetting('nonexistent', validUpdateData))
        .rejects
        .toThrow(new HttpError(404, 'Setting not found'));
    });

    it('should throw error for empty update data', async () => {
      await expect(settingsService.updateSetting(mockSettings.standard.SettingId, {}))
        .rejects
        .toThrow(new HttpError(400, 'No update data provided'));
    });

    it('should throw error for invalid field values', async () => {
      await expect(settingsService.updateSetting(mockSettings.standard.SettingId, { value: '' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));

      await expect(settingsService.updateSetting(mockSettings.standard.SettingId, { category: '' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));

      await expect(settingsService.updateSetting(mockSettings.standard.SettingId, { status: 'INVALID' }))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting data'));
    });
  });

  describe('deleteSetting', () => {
    it('should delete setting successfully', async () => {
      await expect(settingsService.deleteSetting(mockSettings.standard.SettingId))
        .resolves
        .not.toThrow();
    });

    it('should throw error for invalid setting id', async () => {
      await expect(settingsService.deleteSetting(''))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));

      await expect(settingsService.deleteSetting('   '))
        .rejects
        .toThrow(new HttpError(400, 'Invalid setting ID'));
    });

    it('should throw error when setting not found', async () => {
      await expect(settingsService.deleteSetting('nonexistent'))
        .rejects
        .toThrow(new HttpError(404, 'Setting not found'));
    });
  });
});
