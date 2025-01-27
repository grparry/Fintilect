import { SettingsService } from '../index';
import ApiClient from '../../api';
import { ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';
import { Setting } from '../../../types/settings.types';
import { ValidationResult } from '../../../types/validation.types';

jest.mock('../../../services/api', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        put: jest.fn(),
        post: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn()
    }
}));
describe('SettingsService', () => {
    let service: SettingsService;
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        service = new SettingsService();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getSetting', () => {
        it('should return a setting when found', async () => {
            const mockApiResponse: ApiSuccessResponse<Setting> = {
                success: true,
                data: {
                    key: 'test.setting',
                    value: 'test-value',
                    label: 'Test Setting',
                    type: 'string',
                    validationRules: {
                        pattern: '^test-.*$',
                        min: undefined,
                        max: undefined,
                        options: undefined
                    }
                },
                meta: {
                    timestamp: expect.any(String),
                    requestId: expect.any(String)
                }
            };
            (ApiClient.get as jest.Mock).mockResolvedValue(mockApiResponse);
            const result = await service.getSetting('test.setting');
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockApiResponse.data);
            expect(result.meta).toEqual(expect.objectContaining({
                timestamp: expect.any(String),
                requestId: expect.any(String)
            }));
            expect(ApiClient.get).toHaveBeenCalledWith('/api/settings/test.setting');
        });
        it('should handle setting not found', async () => {
            const mockResponse = {
                success: false,
                status: 404,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Setting not found',
                    timestamp: new Date().toISOString()
                }
            } as const;
            (ApiClient.get as jest.Mock).mockRejectedValueOnce(mockResponse);
            try {
                await service.getSetting('nonexistent.setting');
                fail('Expected error to be thrown');
            } catch (error) {
                expect(error).toEqual(mockResponse);
            }
        });
    });
    describe('updateSetting', () => {
        it('should update a setting successfully', async () => {
            const mockApiResponse: ApiSuccessResponse<Setting> = {
                success: true,
                data: {
                    key: 'test.setting',
                    value: 'new-value',
                    label: 'Test Setting',
                    type: 'string',
                    validationRules: {
                        pattern: '^test-.*$',
                        min: undefined,
                        max: undefined,
                        options: undefined
                    }
                },
                meta: {
                    timestamp: expect.any(String),
                    requestId: expect.any(String)
                }
            };
            (ApiClient.put as jest.Mock).mockResolvedValue(mockApiResponse);
            const result = await service.updateSetting('test.setting', 'new-value');
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockApiResponse.data);
            expect(result.meta).toEqual(expect.objectContaining({
                timestamp: expect.any(String),
                requestId: expect.any(String)
            }));
            expect(ApiClient.put).toHaveBeenCalledWith('/api/settings/test.setting', { value: 'new-value' });
        });
        it('should handle validation errors', async () => {
            const mockResponse = {
                success: false,
                status: 400,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid setting value',
                    timestamp: new Date().toISOString()
                }
            } as const;
            (ApiClient.put as jest.Mock).mockRejectedValueOnce(mockResponse);
            try {
                await service.updateSetting('test.setting', 'invalid-value');
                fail('Expected error to be thrown');
            } catch (error) {
                expect(error).toEqual(mockResponse);
            }
        });
    });
    describe('validateSetting', () => {
        it('should validate a setting successfully', async () => {
            const mockSetting: Setting = {
                key: 'test.setting',
                value: 'test-value',
                label: 'Test Setting',
                type: 'string',
                validationRules: {
                    pattern: '^test-.*$',
                    min: undefined,
                    max: undefined,
                    options: undefined
                }
            };
            const mockSettingResponse: ApiSuccessResponse<Setting> = {
                success: true,
                data: mockSetting,
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: '123'
                }
            };
            (ApiClient.get as jest.Mock).mockResolvedValue(mockSettingResponse);
            const result = await service.validateSetting('test.setting', 'test-value');
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.valid).toBe(true);
            }
        });
        it('should handle setting not found during validation', async () => {
            const mockResponse = {
                success: false,
                status: 404,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Setting not found',
                    timestamp: new Date().toISOString()
                }
            } as const;
            (ApiClient.get as jest.Mock).mockRejectedValueOnce(mockResponse);
            try {
                await service.validateSetting('nonexistent.setting', 'test-value');
                fail('Expected error to be thrown');
            } catch (error) {
                expect(error).toEqual(mockResponse);
            }
        });
        it('should handle validation failures', async () => {
            const mockSetting: Setting = {
                key: 'test.setting',
                value: 'test-value',
                label: 'Test Setting',
                type: 'string',
                validationRules: {
                    pattern: '^test-.*$',
                    min: undefined,
                    max: undefined,
                    options: undefined
                }
            };
            const mockSettingResponse: ApiSuccessResponse<Setting> = {
                success: true,
                data: mockSetting,
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: '123'
                }
            };
            (ApiClient.get as jest.Mock).mockResolvedValue(mockSettingResponse);
            const result = await service.validateSetting('test.setting', 'invalid-value');
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.valid).toBe(false);
                expect(result.data.errors).toBeDefined();
                expect(result.data.errors![0].message).toBe('Invalid value');
            }
        });
    });
});