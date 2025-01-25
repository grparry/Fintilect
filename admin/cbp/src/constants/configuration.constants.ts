import { ConfigurationCategory } from '../types/configuration.types';

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
export const DEFAULT_BILL_PAY_CONFIG = {
  cutoffTime: '17:00',
  maxDailyLimit: 100000,
  maxTransactionLimit: 10000,
  allowWeekendProcessing: false,
  requireDualApproval: true,
  retryAttempts: 3,
  notificationEmail: 'admin@example.com',
  enableEmailNotifications: true,
  validationRules: {
    minTransactionAmount: 1,
    maxTransactionAmount: 10000,
    minDailyLimit: 1000,
    maxDailyLimit: 100000,
    minRetryAttempts: 1,
    maxRetryAttempts: 5
  }
} as const;

// Map configuration keys to their categories
export const CONFIG_CATEGORIES = {
  [BILL_PAY_CONFIG_KEYS.CUTOFF_TIME]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL]: ConfigurationCategory.BILL_PAY,
  [BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS]: ConfigurationCategory.BILL_PAY
} as const;
