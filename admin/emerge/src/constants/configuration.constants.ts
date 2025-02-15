import { ConfigurationCategory } from '../types/configuration.types';

export const SYSTEM_CONFIG_KEYS = {
  LOGGING_LEVEL: 'system.logging_level',
  API_TIMEOUT: 'system.api_timeout',
  CACHE_DURATION: 'system.cache_duration'
} as const;

export const SECURITY_CONFIG_KEYS = {
  SESSION_TIMEOUT: 'security.session_timeout',
  PASSWORD_EXPIRY_DAYS: 'security.password_expiry_days',
  MFA_ENABLED: 'security.mfa_enabled'
} as const;

export const NOTIFICATION_CONFIG_KEYS = {
  EMAIL_ENABLED: 'notifications.email_enabled',
  SMS_ENABLED: 'notifications.sms_enabled',
  NOTIFICATION_EMAIL: 'notifications.email'
} as const;

// Default values for configuration items
export const DEFAULT_SYSTEM_CONFIG = {
  loggingLevel: 'info',
  apiTimeout: 30000,
  cacheDuration: 3600,
  validationRules: {
    minApiTimeout: 1000,
    maxApiTimeout: 60000,
    minCacheDuration: 60,
    maxCacheDuration: 86400
  }
} as const;

// Map configuration keys to their categories
export const CONFIG_CATEGORIES = {
  [SYSTEM_CONFIG_KEYS.LOGGING_LEVEL]: ConfigurationCategory.SYSTEM,
  [SYSTEM_CONFIG_KEYS.API_TIMEOUT]: ConfigurationCategory.SYSTEM,
  [SYSTEM_CONFIG_KEYS.CACHE_DURATION]: ConfigurationCategory.SYSTEM,
  [SECURITY_CONFIG_KEYS.SESSION_TIMEOUT]: ConfigurationCategory.SECURITY,
  [SECURITY_CONFIG_KEYS.PASSWORD_EXPIRY_DAYS]: ConfigurationCategory.SECURITY,
  [SECURITY_CONFIG_KEYS.MFA_ENABLED]: ConfigurationCategory.SECURITY,
  [NOTIFICATION_CONFIG_KEYS.EMAIL_ENABLED]: ConfigurationCategory.NOTIFICATIONS,
  [NOTIFICATION_CONFIG_KEYS.SMS_ENABLED]: ConfigurationCategory.NOTIFICATIONS,
  [NOTIFICATION_CONFIG_KEYS.NOTIFICATION_EMAIL]: ConfigurationCategory.NOTIFICATIONS
} as const;
