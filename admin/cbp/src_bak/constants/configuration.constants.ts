import { ConfigurationCategory } from './types/configuration.types';

export const BILL_PAY_CONFIG_KEYS = {
  CUTOFF_TIME: 'bill_pay.cutoff_time',
  MAX_DAILY_LIMIT: 'bill_pay.max_daily_limit',
  MAX_TRANSACTION_LIMIT: 'bill_pay.max_transaction_limit',
  ALLOW_WEEKEND_PROCESSING: 'bill_pay.allow_weekend_processing',
  REQUIRE_DUAL_APPROVAL: 'bill_pay.require_dual_approval',
  RETRY_ATTEMPTS: 'bill_pay.retry_attempts',
  NOTIFICATION_EMAIL: 'bill_pay.notification_email',
  ENABLE_EMAIL_NOTIFICATIONS: 'bill_pay.enable_email_notifications'
} as const;

// Default values for configuration items



// Default values for configuration items

// Map configuration keys to their categories
  [BILL_PAY_CONFIG_KEYS.CUTOFF_TIME]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS]: ConfigurationCategory.BILL_PAY
