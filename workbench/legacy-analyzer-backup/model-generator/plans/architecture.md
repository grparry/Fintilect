# Model Generator Architecture

## Overview
The model generator creates TypeScript model classes from C# configuration classes, preserving type safety, validation rules, and JSON schema information. It builds upon successful patterns from the CBP admin pilot project.

## Core Components

### 1. Parser Module (`src/parser/`)
- Extracts C# class information
- Parses XML documentation for JSON schemas
- Handles namespace resolution
- Maps C# types to TypeScript

### 2. Type System (`src/types/`)
- Base interfaces and classes
- JSON schema integration
- Type mapping rules
- Validation framework

### 3. Generator Module (`src/generator/`)
- Template-based generation
- Static file copying
- Code formatting
- Import management

### 4. File System (`src/fs/`)
- File reading/writing
- Path resolution
- Directory management

## Key Features

### 1. Static Base Files
The following files are copied directly from templates:
```
src/templates/base/
├── types.ts           # Core interfaces (ISettingsGroup, ISettingsMetadata)
└── JsonSetting.ts     # Generic JSON handling class
```

### 2. Namespace Management
- Maps C# namespaces to TypeScript
- Handles directory structure
- Manages import paths
- Supports custom namespace prefixes

### 3. JSON Schema Integration
- Extracts schemas from C# XML comments
- Generates TypeScript interfaces
- Creates virtual JSON fields
- Implements validation rules

### 4. Type Mapping
- C# to TypeScript type conversion
- Complex type handling
- Generic type support
- Default value management

## Type System

### 1. Core Types
```typescript
// Base setting type
interface Setting {
    key: string;
    value: string;
    description?: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';
    validation?: Record<string, any>;
}

// Settings group interface
interface ISettingsGroup {
    toSettings(): Setting[];
    fromSettings(settings: Setting[]): void;
}

// Settings metadata
interface ISettingsMetadata {
    readonly groupName: string;
    readonly settings: {
        readonly [key: string]: {
            readonly key: string;
            readonly type: string;
            readonly required: boolean;
            readonly schema?: object;
        };
    };
}
```

### 2. JSON Support
```typescript
// Base JSON setting class
abstract class JsonSetting<T> {
    protected abstract settingKey: string;
    private _value: T;
    
    constructor(protected defaultValue: T);
    get value(): T;
    set value(val: T);
    toSetting(): Setting;
    fromSetting(setting: Setting): void;
}
```

## Generation Process

### 1. Parsing Phase
- Read C# source files
- Extract class information
- Parse XML documentation
- Build type registry

### 2. Type Resolution
- Map C# types to TypeScript
- Generate JSON schemas
- Create type definitions
- Build validation rules

### 3. Code Generation
- Copy static base files
- Generate model classes
- Create type definitions
- Add validation logic

### 4. Output Organization
```
output/
├── base/
│   ├── types.ts
│   └── JsonSetting.ts
├── models/
│   └── [Feature]/
│       ├── types.ts
│       └── settings.ts
└── index.ts
```

## Template System

### 1. Static Templates
- Base type definitions
- JSON handling classes
- Utility functions

### 2. Generation Templates
- Class templates
- Property templates
- Documentation templates
- Schema templates

### 3. Helper Functions
- Type conversion
- Path resolution
- Schema generation
- Validation rules

## Validation System

### 1. Static Validation
- Type checking
- Required fields
- Schema validation
- Cross-field rules

### 2. Runtime Validation
- Type conversion
- JSON parsing
- Schema validation
- Custom rules

### 3. Schema Validation
- JSON schema extraction
- TypeScript type generation
- Validation code generation
- Error handling

## Legacy C# Implementation

### 1. Base Helper Pattern
```csharp
// Base helper providing type conversion and property access
public abstract class SettingsBaseHelper {
    // Uses caller member name to get property
    protected string GetValue([CallerMemberName] string propertyName = null) {
        return GetTheValue(propertyName);
    }
    
    // Type conversion helpers
    protected bool GetBoolValue([CallerMemberName] string propertyName = null);
    protected int GetIntValue([CallerMemberName] string propertyName = null);
    protected DateTime GetDateTimeValue([CallerMemberName] string propertyName = null);
}
```

### 2. Settings Organization
```csharp
// Main settings facade
public class Settings {
    // Each property maps to a feature domain
    public PasswordVerificationSettings PasswordVerification => 
        _passwordVerification ?? (_passwordVerification = new PasswordVerificationSettings(_settingsBase));
        
    public AccountSettings Account =>
        _account ?? (_account = new AccountSettings(_settingsBase));
}

// Feature-specific settings
public class PasswordVerificationSettings : SettingsBaseHelper {
    // Properties automatically use base helper methods
    public bool PasswordResetCannotContainSSNumber => GetBoolValue();
    public int MinimumPasswordLength => GetIntValue();
}
```

### 3. Runtime Loading
- Settings are loaded from database into `Hashtable`
- Property access triggers lazy loading of feature modules
- Type conversion happens on-demand
- JSON is stored as strings and parsed when accessed

## Data Storage

### 1. Database Structure
```sql
CREATE TABLE Settings (
    Name VARCHAR(255) PRIMARY KEY,
    Value TEXT
);
```

### 2. Key Structure
- Simple name-value pairs
- Hierarchical naming convention for organization (e.g., "Service.Feature.Setting")
- All type information encoded in the model layer
- JSON stored as serialized strings in Value column

### 3. Example Data
```
Name                                             | Value
-------------------------------------------------|----------------
PasswordVerification.PasswordResetCannotContainSSNumber | "true"
PsiServices.PscuLogFileTransformService.Filters | "[{\"Name\":\"Transaction Post Date\",\"RequiresValue\":true}]"
```

## API Integration

### 1. API Endpoints
```typescript
interface ISettingsApi {
    // Get a single setting
    getSetting(key: string): Promise<Setting>;
    
    // Get multiple settings
    getSettings(keys: string[]): Promise<Setting[]>;
    
    // Update a setting
    updateSetting(key: string, value: any): Promise<void>;
    
    // Delete a setting
    deleteSetting(key: string): Promise<void>;
}
```

### 2. Service Layer
```typescript
// Settings service interface
interface ISettingsService {
    // Get settings by group
    getSettingsGroup(groupName: string): Promise<SettingGroup>;
    
    // CRUD operations
    getSetting(key: string): Promise<Setting>;
    updateSetting(key: string, value: any): Promise<void>;
    deleteSetting(key: string): Promise<void>;
    
    // Validation
    validate(setting: Setting): ValidationResult;
}

// Settings model integration
class SettingsModel implements ISettingsGroup {
    constructor(private service: ISettingsService) {}
    
    async load(): Promise<void> {
        const settings = await this.service.getSettingsGroup(
            this.constructor.metadata.groupName
        );
        this.fromSettings(settings);
    }
    
    async save(): Promise<void> {
        const settings = this.toSettings();
        await Promise.all(
            settings.map(s => 
                this.service.updateSetting(s.key, s.value)
            )
        );
    }
}
```

### 3. Cache Management
```typescript
interface ISettingsCache {
    // Get cached setting
    get(key: string): Setting | undefined;
    
    // Update cache
    set(key: string, value: Setting): void;
    
    // Clear cache
    clear(): void;
    
    // Invalidate specific keys
    invalidate(keys: string[]): void;
}
```

### 4. Batch Operations
```typescript
interface IBatchOperation {
    // Batch get
    getSettings(keys: string[]): Promise<Setting[]>;
    
    // Batch update
    updateSettings(
        settings: Array<{key: string, value: any}>
    ): Promise<void>;
}
```

## Next Steps

### Phase 1: Core Infrastructure
1. Set up project structure
2. Copy base templates
3. Implement parser
4. Create basic generator

### Phase 2: Type System
1. Implement type mapping
2. Add JSON schema support
3. Create validation framework
4. Generate type definitions

### Phase 3: Advanced Features
1. Add documentation generation
2. Implement schema validation
3. Add custom validation rules
4. Create test framework
