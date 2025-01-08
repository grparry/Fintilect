import { billPayConfigService } from '../bill-pay-config.service';
import api from '../api';
import { BillPayConfig, BillPayConfigUpdate, BillPayConfigValidation } from '../../types/bill-pay.types';
import { SystemConfiguration, ConfigurationCategory } from '../../types/configuration.types';
import { BILL_PAY_CONFIG_KEYS, DEFAULT_BILL_PAY_CONFIG } from '../../constants/configuration.constants';

jest.mock('../api');

describe('BillPayConfigService', () => {
  const mockSystemConfig: SystemConfiguration = {
    configurations: [
      {
        key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
        value: '16:00',
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT,
        value: 50000,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT,
        value: 5000,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING,
        value: true,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL,
        value: true,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS,
        value: 3,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL,
        value: 'test@example.com',
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      },
      {
        key: BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS,
        value: true,
        category: ConfigurationCategory.BILL_PAY,
        lastUpdated: '2025-01-08T11:20:00Z',
        updatedBy: 'test-user'
      }
    ]
  };

  const mockConfigUpdate: BillPayConfigUpdate = {
    cutoffTime: '16:00',
    maxDailyLimit: 50000,
    maxTransactionLimit: 5000,
    allowWeekendProcessing: true,
    requireDualApproval: true,
    retryAttempts: 3,
    notificationEmail: 'test@example.com',
    enableEmailNotifications: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getConfig', () => {
    it('should fetch configuration successfully', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: mockSystemConfig }
      });

      const result = await billPayConfigService.getConfig();

      expect(api.get).toHaveBeenCalledWith('/configuration/bill-pay');
      expect(result).toMatchObject({
        cutoffTime: '16:00',
        maxDailyLimit: 50000,
        maxTransactionLimit: 5000,
        allowWeekendProcessing: true,
        requireDualApproval: true,
        retryAttempts: 3,
        notificationEmail: 'test@example.com',
        enableEmailNotifications: true
      });
    });

    it('should handle configuration not found error', async () => {
      const error = {
        response: {
          data: {
            code: 'CONFIG_NOT_FOUND',
            message: 'Configuration not found'
          }
        }
      };
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.getConfig())
        .rejects
        .toThrow('Bill pay configuration not found');
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.getConfig())
        .rejects
        .toThrow('Failed to fetch bill pay configuration: Network error');
    });
  });

  describe('updateConfig', () => {
    it('should update configuration successfully', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { valid: true, errors: [] } }
      });
      (api.put as jest.Mock).mockResolvedValueOnce({
        data: { data: mockSystemConfig }
      });

      const result = await billPayConfigService.updateConfig(mockConfigUpdate);

      expect(api.put).toHaveBeenCalledWith('/configuration/bill-pay', {
        configurations: expect.arrayContaining([
          expect.objectContaining({
            key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
            value: '16:00',
            category: ConfigurationCategory.BILL_PAY
          })
        ])
      });
      expect(result).toMatchObject(mockConfigUpdate);
    });

    it('should handle concurrent update conflict', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { valid: true, errors: [] } }
      });
      const error = { response: { status: 412 } };
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.updateConfig(mockConfigUpdate))
        .rejects
        .toThrow('Configuration has been modified by another user. Please refresh and try again.');
    });

    it('should handle validation errors from API', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { valid: true, errors: [] } }
      });
      const error = {
        response: {
          data: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid daily limit'
          }
        }
      };
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.updateConfig(mockConfigUpdate))
        .rejects
        .toThrow('Invalid configuration: Invalid daily limit');
    });

    it('should handle API errors gracefully', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { valid: true, errors: [] } }
      });
      const error = new Error('Network error');
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.updateConfig(mockConfigUpdate))
        .rejects
        .toThrow('Failed to update bill pay configuration: Network error');
    });
  });

  describe('validateConfig', () => {
    it('should validate configuration successfully', async () => {
      const validationResult: BillPayConfigValidation = {
        valid: true,
        errors: []
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: validationResult }
      });

      const result = await billPayConfigService.validateConfig(mockConfigUpdate);

      expect(api.post).toHaveBeenCalledWith('/configuration/bill-pay/validate', {
        configurations: expect.arrayContaining([
          expect.objectContaining({
            key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
            value: '16:00',
            category: ConfigurationCategory.BILL_PAY
          })
        ])
      });
      expect(result).toEqual(validationResult);
    });

    it('should handle validation errors', async () => {
      const error = {
        response: {
          data: {
            code: 'VALIDATION_ERROR',
            errors: {
              maxDailyLimit: 'Daily limit must be greater than transaction limit',
              notificationEmail: 'Invalid email format'
            }
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      const result = await billPayConfigService.validateConfig(mockConfigUpdate);

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual([
        {
          field: 'maxDailyLimit',
          message: 'Daily limit must be greater than transaction limit'
        },
        {
          field: 'notificationEmail',
          message: 'Invalid email format'
        }
      ]);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.validateConfig(mockConfigUpdate))
        .rejects
        .toThrow('Failed to validate bill pay configuration: Network error');
    });
  });

  describe('testEmailNotification', () => {
    it('should send test email successfully', async () => {
      const successResponse = {
        success: true,
        message: 'Test email sent successfully'
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });

      const result = await billPayConfigService.testEmailNotification('test@example.com');

      expect(api.post).toHaveBeenCalledWith('/configuration/bill-pay/test-email', {
        email: 'test@example.com'
      });
      expect(result).toEqual(successResponse);
    });

    it('should handle invalid email error', async () => {
      const error = {
        response: {
          data: {
            code: 'INVALID_EMAIL',
            message: 'Invalid email format'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.testEmailNotification('invalid-email'))
        .rejects
        .toThrow('Invalid email address');
    });

    it('should handle email send failure', async () => {
      const error = {
        response: {
          data: {
            code: 'EMAIL_SEND_FAILED',
            message: 'Failed to send email'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.testEmailNotification('test@example.com'))
        .rejects
        .toThrow('Failed to send test email. Please check the email configuration.');
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPayConfigService.testEmailNotification('test@example.com'))
        .rejects
        .toThrow('Failed to test email notification: Network error');
    });
  });
});
