# Settings Service Layer Enhancement Plan

## Overview
This document outlines the plan to enhance the settings service layer to support complex JSON settings with type safety, schema validation, and transparent serialization/deserialization.

## Current State
- Settings limited to simple types (string, number, boolean)
- No built-in JSON schema support
- Limited type safety for complex objects
- Basic validation rules only

## Required Changes

### 1. Type System Updates

#### Update `settings.types.ts`:
```typescript
export interface JsonSchema {
  type: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
  additionalProperties?: boolean;
}

export interface Setting {
  key: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'json';
  label: string;
  description?: string;
  schema?: JsonSchema;
  category?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  validationRules?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: Array<{ value: any; label: string }>;
    jsonSchema?: JsonSchema;
  };
}

export interface ISettingsMetadata {
  groups: ISettingsGroup[];
  version: string;
  lastUpdated: string;
  schemas: Record<string, JsonSchema>;
}
```

### 2. Service Interface Updates

#### Update `ISettingsService`:
```typescript
export interface ISettingsService extends IBaseService {
  getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>>;
  
  getSetting<T = string | number | boolean | object>(
    key: string
  ): Promise<ApiSuccessResponse<Setting & { value: T }>>;
  
  updateSetting<T = string | number | boolean | object>(
    key: string,
    value: T,
    options?: { validate?: boolean }
  ): Promise<ApiSuccessResponse<Setting>>;
  
  validateSetting<T = any>(
    key: string,
    value: T
  ): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>>;
}
```

### 3. Schema Registry Implementation

```typescript
// src/services/SchemaRegistry.ts
export class SchemaRegistry {
  private static instance: SchemaRegistry;
  private schemas = new Map<string, JsonSchema>();
  private validators = new Map<string, JsonValidator>();

  static getInstance(): SchemaRegistry {
    if (!SchemaRegistry.instance) {
      SchemaRegistry.instance = new SchemaRegistry();
    }
    return SchemaRegistry.instance;
  }

  register(key: string, schema: JsonSchema): void {
    this.schemas.set(key, schema);
    this.validators.set(key, new JsonValidator(schema));
  }

  validate<T>(key: string, value: T): ValidationResult {
    const validator = this.validators.get(key);
    if (!validator) {
      return { isValid: true }; // No schema = no validation
    }
    return validator.validate(value);
  }
}
```

### 4. Settings Manager Enhancement

```typescript
export class SettingsManager {
  constructor(
    private readonly settingsService: ISettingsService,
    private readonly schemaRegistry = SchemaRegistry.getInstance()
  ) {}

  async getJsonSetting<T>(key: string): Promise<T | undefined> {
    const response = await this.settingsService.getSetting<string>(key);
    if (!response.success || !response.data) return undefined;

    const setting = response.data;
    if (setting.type !== 'json') return undefined;

    try {
      const value = JSON.parse(setting.value) as T;
      const validation = this.schemaRegistry.validate(key, value);
      if (!validation.isValid) {
        throw new Error(`Invalid JSON: ${validation.errors?.join(', ')}`);
      }
      return value;
    } catch (e) {
      console.error(`Failed to parse JSON setting ${key}:`, e);
      return undefined;
    }
  }

  async setJsonSetting<T>(key: string, value: T): Promise<void> {
    const validation = this.schemaRegistry.validate(key, value);
    if (!validation.isValid) {
      throw new Error(`Invalid value: ${validation.errors?.join(', ')}`);
    }

    await this.settingsService.updateSetting(
      key,
      JSON.stringify(value),
      { validate: true }
    );
  }
}
```

### 5. Component Integration

```typescript
// Example usage in a React component
function SettingsEditor() {
  const manager = useSettingsManager();
  const [config, setConfig] = useState<PscuConfig>();

  useEffect(() => {
    async function loadConfig() {
      const value = await manager.getJsonSetting<PscuConfig>(
        'PsiServices.PscuLogFileTransformService.Filters'
      );
      setConfig(value);
    }
    loadConfig();
  }, []);

  async function handleSave(newConfig: PscuConfig) {
    try {
      await manager.setJsonSetting(
        'PsiServices.PscuLogFileTransformService.Filters',
        newConfig
      );
    } catch (e) {
      // Handle validation errors
    }
  }
}
```

## Implementation Steps

1. **Type System Updates**
   - Update settings types
   - Add JSON schema types
   - Update service interfaces
   - Add validation types

2. **Schema Registry**
   - Implement singleton registry
   - Add schema validation
   - Add error handling
   - Add schema registration

3. **Settings Manager**
   - Add JSON methods
   - Add type safety
   - Add validation
   - Update error handling

4. **Service Implementation**
   - Update real service
   - Add JSON support
   - Add validation
   - Update error handling

5. **Testing**
   - Add unit tests
   - Add integration tests
   - Test error cases
   - Test validation

## Migration Strategy

1. **Phase 1: Type Updates**
   - Update type definitions
   - Keep backward compatibility
   - Add new interfaces
   - Update documentation

2. **Phase 2: Service Updates**
   - Add new methods
   - Keep old methods working
   - Add schema support
   - Update validation

3. **Phase 3: Component Updates**
   - Update existing components
   - Add type safety
   - Add validation
   - Update error handling

## Success Criteria
1. Full type safety for JSON settings
2. Schema validation working
3. Backward compatibility maintained
4. Error handling improved
5. Performance maintained
6. Tests passing
7. Documentation updated

## Future Enhancements
1. Schema versioning
2. Migration helpers
3. Performance optimizations
4. Advanced validation
5. Custom validators
