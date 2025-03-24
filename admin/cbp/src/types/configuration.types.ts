

// System Configuration API Types
export interface SystemConfigurationItem {
  key: string;
  value: string | number | boolean;
  category: string;
  lastUpdated: string;
  updatedBy: string;
}
export interface SystemConfiguration {
  configurations: SystemConfigurationItem[];
}

// AdminCu Configuration API Types
export interface ConfigurationSetting {
  id: string;
  configName: string;
  configValue: string;
  lastChangeDate: string;
  description: string;
  dataType: string;
  creditUnionAccess: string;
  connectSupportAccess: string;
  connectManagerAccess: string;
  friendlyName: string;
}

export interface ConfigurationResponse {
  configurations: ConfigurationSetting[];
}
// Configuration Categories
export enum ConfigurationCategory {
  BILL_PAY = 'bill_pay',
  SYSTEM = 'system',
  SECURITY = 'security',
  NOTIFICATIONS = 'notifications'
}
// Configuration Value Types
export type ConfigurationValue = string | number | boolean;
// Configuration Update Types
export interface ConfigurationUpdate {
  key: string;
  value: ConfigurationValue;
  category: ConfigurationCategory;
}