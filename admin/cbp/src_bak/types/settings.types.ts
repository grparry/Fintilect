export interface Setting {
  key: string;
  value: string | number | boolean;
  label: string;
  description?: string;
  type: 'string' | 'number' | 'boolean';
  category?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  validationRules?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: Array<{ value: string | number | boolean; label: string }>;
  };
}

export interface SettingGroup {
  key: string;
  label: string;
  description?: string;
  settings: Setting[];
  isCollapsed?: boolean;
  order?: number;
}

export interface ISettingsGroup {
  key: string;
  label: string;
  description?: string;
  settings: Setting[];
  isCollapsed?: boolean;
  order?: number;
}

export interface ISettingsMetadata {
  groups: ISettingsGroup[];
  version: string;
  lastUpdated: string;
}
