import { BillPayConfig } from '@/types/bill-pay.types';
import { SystemConfiguration } from '@/types/configuration.types';
import { BILL_PAY_CONFIG_KEYS, DEFAULT_BILL_PAY_CONFIG } from '@/constants/configuration.constants';

export class BillPayConfigAdapter {
  /**
   * Convert system configuration to BillPayConfig format
   */
  static toConfig(systemConfig: SystemConfiguration): BillPayConfig {
    const findValue = (key: string) => {
      const config = systemConfig.configurations.find(c => c.key === key);
      return config?.value ?? this.getDefaultValue(key);
    };

    const lastUpdated = systemConfig.configurations.find(
      c => c.key.startsWith('bill_pay.')
    );

    return {
      id: 'bill-pay-config',
      cutoffTime: findValue(BILL_PAY_CONFIG_KEYS.CUTOFF_TIME) as string,
      maxDailyLimit: Number(findValue(BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT)),
      maxTransactionLimit: Number(findValue(BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT)),
      allowWeekendProcessing: Boolean(findValue(BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING)),
      requireDualApproval: Boolean(findValue(BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL)),
      retryAttempts: Number(findValue(BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS)),
      notificationEmail: findValue(BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL) as string,
      enableEmailNotifications: Boolean(findValue(BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS)),
      lastUpdatedAt: lastUpdated?.lastUpdated ?? new Date().toISOString(),
      lastUpdatedBy: lastUpdated?.updatedBy ?? 'system',
      validationRules: {
        minTransactionAmount: DEFAULT_BILL_PAY_CONFIG.validationRules.minTransactionAmount,
        maxTransactionAmount: Number(findValue(BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT)),
        minDailyLimit: DEFAULT_BILL_PAY_CONFIG.validationRules.minDailyLimit,
        maxDailyLimit: Number(findValue(BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT)),
        minRetryAttempts: DEFAULT_BILL_PAY_CONFIG.validationRules.minRetryAttempts,
        maxRetryAttempts: DEFAULT_BILL_PAY_CONFIG.validationRules.maxRetryAttempts
      }
    };
  }

  /**
   * Get default value for a configuration key
   */
  private static getDefaultValue(key: string): string | number | boolean {
    switch (key) {
      case BILL_PAY_CONFIG_KEYS.CUTOFF_TIME:
        return DEFAULT_BILL_PAY_CONFIG.cutoffTime;
      case BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT:
        return DEFAULT_BILL_PAY_CONFIG.maxDailyLimit;
      case BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT:
        return DEFAULT_BILL_PAY_CONFIG.maxTransactionLimit;
      case BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING:
        return DEFAULT_BILL_PAY_CONFIG.allowWeekendProcessing;
      case BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL:
        return DEFAULT_BILL_PAY_CONFIG.requireDualApproval;
      case BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS:
        return DEFAULT_BILL_PAY_CONFIG.retryAttempts;
      case BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL:
        return DEFAULT_BILL_PAY_CONFIG.notificationEmail;
      case BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS:
        return DEFAULT_BILL_PAY_CONFIG.enableEmailNotifications;
      default:
        throw new Error(`Unknown configuration key: ${key}`);
    }
  }
}
