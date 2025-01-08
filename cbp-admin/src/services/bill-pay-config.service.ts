import { BillPayConfig, BillPayConfigUpdate, BillPayConfigValidation } from '../types/bill-pay.types';
import { SystemConfiguration, ConfigurationUpdate, ConfigurationCategory } from '../types/configuration.types';
import { ApiSuccessResponse } from '../types/api.types';
import { BillPayConfigAdapter } from '../adapters/bill-pay-config.adapter';
import { BILL_PAY_CONFIG_KEYS } from '../constants/configuration.constants';
import api from './api';

class BillPayConfigService {
  private readonly baseUrl = '/configuration/bill-pay';

  /**
   * Fetches the current bill pay configuration
   * @returns Promise<BillPayConfig>
   * @throws Error if the API request fails
   */
  async getConfig(): Promise<BillPayConfig> {
    try {
      const response = await api.get<ApiSuccessResponse<SystemConfiguration>>(`${this.baseUrl}`);
      return BillPayConfigAdapter.toConfig(response.data.data);
    } catch (error: any) {
      if (error?.response?.data?.code === 'CONFIG_NOT_FOUND') {
        throw new Error('Bill pay configuration not found');
      }
      throw new Error(`Failed to fetch bill pay configuration: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Updates the bill pay configuration
   * @param data Configuration update data
   * @returns Promise<BillPayConfig>
   * @throws Error if the API request fails
   */
  async updateConfig(data: BillPayConfigUpdate): Promise<BillPayConfig> {
    // Validate configuration values
    const validation = await this.validateConfig(data);
    if (!validation.valid) {
      const errors = validation.errors.map(e => `${e.field}: ${e.message}`).join(', ');
      throw new Error(`Invalid configuration: ${errors}`);
    }

    try {
      // Convert to system configuration format
      const updates: ConfigurationUpdate[] = [
        {
          key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
          value: data.cutoffTime,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT,
          value: data.maxDailyLimit,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT,
          value: data.maxTransactionLimit,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING,
          value: data.allowWeekendProcessing,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL,
          value: data.requireDualApproval,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS,
          value: data.retryAttempts,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL,
          value: data.notificationEmail,
          category: ConfigurationCategory.BILL_PAY
        },
        {
          key: BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS,
          value: data.enableEmailNotifications,
          category: ConfigurationCategory.BILL_PAY
        }
      ];

      const response = await api.put<ApiSuccessResponse<SystemConfiguration>>(
        this.baseUrl,
        { configurations: updates }
      );

      return BillPayConfigAdapter.toConfig(response.data.data);
    } catch (error: any) {
      if (error?.response?.status === 412) {
        throw new Error('Configuration has been modified by another user. Please refresh and try again.');
      }
      if (error?.response?.data?.code === 'VALIDATION_ERROR') {
        throw new Error(`Invalid configuration: ${error.response.data.message}`);
      }
      throw new Error(`Failed to update bill pay configuration: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Validates the bill pay configuration update
   * @param data Configuration data to validate
   * @returns Promise<BillPayConfigValidation>
   * @throws Error if the API request fails
   */
  async validateConfig(data: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
    // Convert to system configuration format for validation
    const updates: ConfigurationUpdate[] = [
      {
        key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
        value: data.cutoffTime,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT,
        value: data.maxDailyLimit,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT,
        value: data.maxTransactionLimit,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING,
        value: data.allowWeekendProcessing,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL,
        value: data.requireDualApproval,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS,
        value: data.retryAttempts,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL,
        value: data.notificationEmail,
        category: ConfigurationCategory.BILL_PAY
      },
      {
        key: BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS,
        value: data.enableEmailNotifications,
        category: ConfigurationCategory.BILL_PAY
      }
    ];

    try {
      const response = await api.post<ApiSuccessResponse<BillPayConfigValidation>>(
        `${this.baseUrl}/validate`,
        { configurations: updates }
      );
      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data?.code === 'VALIDATION_ERROR') {
        return {
          valid: false,
          errors: Object.entries(error.response.data.errors).map(([field, message]) => ({
            field: field as keyof BillPayConfigUpdate,
            message: message as string
          }))
        };
      }
      throw new Error(`Failed to validate bill pay configuration: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Tests email notification by sending a test email
   * @param email Email address to send test notification to
   * @returns Promise<{ success: boolean; message: string }>
   * @throws Error if the API request fails
   */
  async testEmailNotification(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const response = await api.post<
        ApiSuccessResponse<{ success: boolean; message: string }>
      >(`${this.baseUrl}/test-email`, { email });
      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data?.code === 'INVALID_EMAIL') {
        throw new Error('Invalid email address');
      }
      if (error?.response?.data?.code === 'EMAIL_SEND_FAILED') {
        throw new Error('Failed to send test email. Please check the email configuration.');
      }
      throw new Error(`Failed to test email notification: ${error?.message || 'Unknown error'}`);
    }
  }
}

export const billPayConfigService = new BillPayConfigService();
