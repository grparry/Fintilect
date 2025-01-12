/**
 * Type validation utilities for mock data
 */

export type SchemaRule = {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  validate?: (value: any) => boolean;
};

export type Schema<T> = {
  [K in keyof T]: SchemaRule;
};

/**
 * Validates mock data against a schema
 * @param data The data to validate
 * @param schema The schema to validate against
 * @returns boolean indicating if the data is valid
 */
export const validateMockData = <T>(data: T, schema: Schema<T>): boolean => {
  const entries = Object.entries(schema) as [keyof T, SchemaRule][];
  
  for (const [key, rules] of entries) {
    const value = data[key];

    // Check required fields
    if (rules.required && value === undefined) {
      console.error(`Required field ${String(key)} is missing`);
      return false;
    }

    // Skip validation for optional undefined fields
    if (value === undefined) continue;

    // Type checking
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== rules.type) {
      console.error(`Field ${String(key)} has wrong type. Expected ${rules.type}, got ${actualType}`);
      return false;
    }

    // Custom validation
    if (rules.validate && !rules.validate(value)) {
      console.error(`Field ${String(key)} failed custom validation`);
      return false;
    }
  }

  return true;
};

/**
 * Creates a type-safe mock data generator
 * @param schema The schema to generate data from
 * @returns A function that generates mock data
 */
export const createMockGenerator = <T>(schema: Schema<T>): (() => T) => {
  return () => {
    const result = {} as T;
    const entries = Object.entries(schema) as [keyof T, SchemaRule][];

    for (const [key, rules] of entries) {
      if (!rules.required && Math.random() > 0.8) {
        continue; // Randomly skip some optional fields
      }

      let value: any;
      switch (rules.type) {
        case 'string':
          value = `mock_${String(key)}_${Math.random().toString(36).substring(7)}`;
          break;
        case 'number':
          value = Math.floor(Math.random() * 1000);
          break;
        case 'boolean':
          value = Math.random() > 0.5;
          break;
        case 'array':
          value = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, 
            () => `item_${Math.random().toString(36).substring(7)}`);
          break;
        case 'object':
          value = { id: Math.random().toString(36).substring(7) };
          break;
      }

      result[key] = value;
    }

    return result;
  };
};
