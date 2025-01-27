import api from './api';
import { ApiSuccessResponse } from '../../types/api.types';

export interface Setting {
  key: string;
  value: string;
  description?: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
  validation?: Record<string, any>;
}

export interface SettingGroup {
  settings: Setting[];
  metadata: {
    __metadata?: Record<string, string>;



    __metadata?: Record<string, string>;
    __validations?: Record<string, any>;
    __display?: Record<string, any>;


  /**
   * Get all settings for a specific settings group
   * @param groupName The settings group name (e.g., 'AccountSettings', 'TravelNotificationFeature')
   */

  /**
   * Get a single setting by its key
   * @param key The setting key (e.g., 'Features.TravelNotification.TravelNotificationEnabled')
   */

  /**
   * Update a single setting
   * @param key The setting key
   * @param value The new value
   */

  /**
   * Update multiple settings at once
   * @param settings Array of settings to update
   */

  /**
   * Get settings by prefix
   * @param prefix The prefix to filter settings by (e.g., 'Features.TravelNotification')
   */

  /**
   * Validate a setting value against its metadata
   * @param key The setting key
   * @param value The value to validate
   */


