export interface ConfigValue {
  key: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'object';
  label?: string;
  description?: string;
  required?: boolean;
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];
    custom?: (value: any) => boolean;
  };
  metadata?: Record<string, any>;
}

export interface ConfigSection {
  id: string;
  title: string;
  description?: string;
  values: ConfigValue[];
  subsections?: ConfigSection[];
  metadata?: Record<string, any>;
}

export interface ConfigGroup {
  id: string;
  name: string;
  description?: string;
  sections: ConfigSection[];
  metadata?: Record<string, any>;
}

export interface ConfigValidationError {
  key: string;
  message: string;
  value?: any;
  type?: string;
}

export interface ConfigValidationResult {
  isValid: boolean;
  errors?: ConfigValidationError[];
  warnings?: ConfigValidationError[];
}
