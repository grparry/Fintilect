# Settings Architecture Documentation

## Overview
This document describes the settings management architecture in the CBP application, detailing how generated settings types are integrated and used throughout the system.

## Core Components

### 1. Service Interface
The `ISettingsService` interface (`services/interfaces/ISettingsService.ts`) defines the contract for all settings operations:
- Getting settings by group or individual key
- Updating single or batch settings
- Validating settings
- Prefix-based setting retrieval

### 2. Service Implementations

#### Real Implementation (SettingsService)
- Located in: `services/implementations/real/SettingsService.ts`
- Provides REST API-based implementation
- Handles HTTP communication with backend
- Includes error handling and value serialization
- Configurable base URL for API endpoints

#### Mock Implementation (MockSettingsService)
- Located in: `services/implementations/mock/MockSettingsService.ts`
- In-memory implementation for testing/development
- Uses mock data from `mockSettingsData`
- Simulates API behavior with success/error responses

### 3. Settings Manager
The `SettingsManager` (`services/implementations/settings.manager.ts`) provides high-level settings management:
- Caches settings in memory
- Handles group-based operations
- Manages metadata and versioning
- Provides format conversion utilities

### 4. Service Factory
The `ServiceFactory` (`services/factory/ServiceFactory.ts`) manages service instantiation:
- Implements singleton pattern for service instances
- Centralizes service creation and configuration
- Supports both real and mock implementations
- Exports pre-configured service instances

### 5. Base Classes and Type System

The settings architecture is built on a foundation of base classes and interfaces that enforce type safety and consistent behavior:

#### Settings Base Class
```typescript
export abstract class BaseSettings implements ISettingsGroup {
    protected abstract groupName: string;
    protected abstract servicePrefix?: string;
    
    // Group-level validation
    abstract validate(): void;
    
    // Conversion between model and API formats
    abstract toSettings(): Setting[];
    abstract fromSettings(settings: Setting[]): void;
}
```

#### Settings Group Interface
```typescript
interface ISettingsGroup {
    groupName: string;
    metadata: ISettingsMetadata;
    validation?: ValidationRules;
    errorHandling?: ErrorHandlingConfig;
}
```

#### Settings Metadata
```typescript
interface ISettingsMetadata {
    displayName: string;
    description?: string;
    category?: string;
    order?: number;
    dependencies?: SettingsDependency[];
}
```

This type system ensures:
- Type safety across the stack
- Consistent validation behavior
- Proper error handling
- Clear dependency management

### 6. Pattern and Context Management

The settings architecture follows established patterns and context hierarchies:

#### Pattern Hierarchy
```typescript
interface SettingsPattern {
    type: 'json' | 'primitive';
    validation: 'strict' | 'lenient';
    errorHandling: 'throw' | 'log';
    prefixing: {
        required: boolean;
        format: string;
    };
}

// Core settings pattern
const coreSettingsPattern: SettingsPattern = {
    type: 'json',
    validation: 'strict',
    errorHandling: 'throw',
    prefixing: {
        required: true,
        format: '{servicePrefix}.{groupName}.{settingName}'
    }
};
```

#### Context Inheritance
```typescript
interface SettingsContext {
    baseSettings?: string;     // Parent settings class
    overrides: {
        validation?: boolean;
        prefixing?: boolean;
        errorHandling?: boolean;
    };
}

// Example context usage
@SettingsContext({
    baseSettings: 'BaseJsonSettings',
    overrides: {
        validation: true,      // Enable strict validation
        prefixing: true,      // Use service prefixing
        errorHandling: true    // Use custom error handling
    }
})
export class ServiceSettings extends BaseSettings {
    // Implementation
}
```

#### Dependency Tracking
```typescript
interface SettingsDependency {
    source: string;           // Source setting
    target: string;          // Target setting
    type: 'requires' | 'configures' | 'validates';
    validation?: string[];   // Validation rules
}

// Example dependency tracking
static readonly dependencies: SettingsDependency[] = [
    {
        source: 'PathConfiguration',
        target: 'Filters',
        type: 'configures',
        validation: ['PathMustExist', 'ValidatePermissions']
    }
];
```

This pattern system ensures:
- Consistent pattern hierarchy
- Security validation
- Relationship documentation
- Context inheritance chain
- Pattern compatibility

## Integration Flow

1. Generated settings types implement `ISettingsGroup`
2. Types are managed by `SettingsManager` for state management
3. `SettingsService` handles API communication
4. `ServiceFactory` provides appropriate service implementation
5. Components access settings through manager or service layer

## Key Features

- Type safety throughout the stack
- Separation of concerns (API, management, services)
- Support for both real and mock implementations
- Centralized settings management
- Group-based organization
- Batch operations support
- Validation capabilities

## Usage Example

```typescript
// Get service instance
const settingsService = ServiceFactory.getInstance().getSettingsService();
const manager = new SettingsManager(settingsService);

// Load settings group
await manager.loadGroup('PscuLogFileTransformServiceSettings');

// Get and use settings
const settings = manager.getSettings();

// Update and save
await manager.saveGroup('PscuLogFileTransformServiceSettings');
```

## Type Generation Integration

Generated settings types (like `PscuLogFileTransformServiceSettings`) are designed to:
- Implement `ISettingsGroup` interface
- Provide static metadata
- Include type-safe property accessors
- Support serialization to/from API format

## Type Generation Process

The TypeScript settings classes are automatically generated from C# source classes using the `legacy-analyzer` tool located in the `workbench/legacy-analyzer` directory. This tool:

1. **Source Location**:
   - Reads C# classes from: `legacy/legacy-apis/Psi.Models.ClientConfigurationModels`
   - Outputs TypeScript files to parallel directories in: `infrastructure/models`

2. **Generation Process**:
   - Parses C# classes using the `SettingsGenerator`
   - Maps C# types to TypeScript equivalents
   - Preserves documentation and attributes
   - Generates corresponding TypeScript interfaces and classes
   - Maintains parallel directory structure

3. **Key Features**:
   - Automatic type conversion and mapping
   - Preservation of validation rules
   - Generation of TypeScript interfaces (`*Config`)
   - Implementation of `ISettingsGroup` interface
   - Support for JSON-structured settings
   - Maintenance of metadata and documentation

4. **Generated Output**:
   For each C# settings class, generates:
   - TypeScript interface defining the configuration shape
   - TypeScript class implementing `ISettingsGroup`
   - Property accessors with appropriate types
   - Serialization/deserialization support
   - Validation rules when present

5. **Directory Structure**:
   ```
   Project Root
   ├── legacy/
   │   └── legacy-apis/
   │       └── Psi.Models.ClientConfigurationModels/
   │           └── [C# source files]
   ├── infrastructure/
   │   └── models/
   │       └── [Generated TypeScript files]
   └── workbench/
       └── legacy-analyzer/
           └── src/
               └── output/
                   └── generators/
                       └── settingsGenerator.ts
   ```

This automated generation process ensures:
- Type safety between C# and TypeScript
- Consistent structure across the codebase
- Maintainable and scalable settings management
- Single source of truth in C# models

## Component Integration

### Transparent JSON Field Access
Components in the CBP admin application can work with JSON-structured settings as if they were regular typed objects, without concerning themselves with serialization details:

```typescript
// Component example
export class FilterConfigComponent {
    private settingsManager: SettingsManager;
    private settings: PscuLogFileTransformServiceSettings;

    async loadSettings() {
        // Access JSON-backed fields transparently
        const filters = this.settings.filters;  // Automatically deserializes
        
        // Work with strongly-typed objects
        filters.forEach(filter => {
            console.log(filter.name);           // Type-safe property access
            console.log(filter.requiresValue);  // Proper boolean type
        });

        // Modify and save (serialization handled automatically)
        filters.push({
            name: "New Filter",
            requiresValue: true,
            errorMessage: "Required field"
        });
        this.settings.filters = filters;        // Automatically serializes
    }
}
```

### Key Benefits for Components
1. **Type Safety**:
   - Full IntelliSense support
   - Compile-time type checking
   - Runtime type validation

2. **Abstraction**:
   - No need to handle JSON parsing
   - No direct interaction with string representations
   - Clean, object-oriented interface

3. **Validation**:
   - Automatic schema validation
   - Type coercion where appropriate
   - Error handling at the service layer

4. **State Management**:
   - Consistent object references
   - Predictable update behavior
   - Automatic change tracking

### Usage Patterns

1. **Reading Settings**:
```typescript
// Settings service handles all JSON parsing
const settings = await settingsService.getSettingsGroup('PscuLogFileTransformServiceSettings');

// Access nested properties with type safety
const pathConfig = settings.pathConfiguration;
console.log(pathConfig.inputPath);        // Type-safe string
console.log(pathConfig.inputFilenamePattern);  // Type-safe string
```

2. **Updating Settings**:
```typescript
// Modify nested objects naturally
settings.filters = settings.filters.map(filter => ({
    ...filter,
    requiresValue: true
}));

// Service handles serialization and persistence
await settingsService.updateSettings(settings);
```

3. **Form Integration**:
```typescript
// Direct form binding
<form [formGroup]="filterForm">
    <input [formControl]="filterForm.get('name')" />
    <input [formControl]="filterForm.get('requiresValue')" type="checkbox" />
</form>

// Type-safe form initialization
this.filterForm = this.fb.group({
    name: [filter.name, Validators.required],
    requiresValue: [filter.requiresValue]
});
```

4. **Validation Integration**:
```typescript
// Automatic validation
const isValid = await settingsService.validateSetting(
    'PscuLogFileTransformServiceSettings.filters',
    updatedFilters
);

if (isValid) {
    settings.filters = updatedFilters;  // Type-safe assignment
    await settingsService.updateSettings(settings);
}
```

This transparent access pattern ensures:
- Clean, maintainable component code
- Reduced potential for errors
- Improved developer experience
- Consistent behavior across the application

## Backend Storage and API Integration

### Database Structure
The settings system is backed by a single database table that stores all configuration settings. This centralized storage approach:
- Provides a single source of truth for all application settings
- Simplifies backup and restoration processes
- Enables efficient querying and updates
- Facilitates audit logging and version tracking

#### JSON-Structured Settings
Many settings in the database are stored as JSON strings that represent complex hierarchical objects. For example, the `PscuLogFileTransformServiceSettings` contains several JSON-structured fields:

```typescript
// Database Storage (simplified)
{
    "Key": "PsiServices.PscuLogFileTransformService.Filters",
    "Value": "[{
        \"Name\": \"Transaction Post Date\",
        \"ValuesCausingInclusion\": \"\",
        \"ValuesCausingExclusion\": \"\",
        \"RequiresValue\": true,
        \"ErrorMessage\": \"Transaction Post Date is required\"
    }]"
}

// TypeScript Representation
export interface PscuLogFileTransformServiceSettingsConfig {
    Filters: string;          // JSON string containing filter configuration
    InputFileFields: string;  // JSON string containing input field mappings
    OutputFileFields: string; // JSON string containing output field formats
    PathConfiguration: string; // JSON string containing path settings
}
```

This approach provides several benefits:
1. **Flexibility**: Complex objects can be stored without requiring additional database tables
2. **Version Control**: Changes to object structure can be managed without schema updates
3. **Query Support**: JSON querying capabilities can be used when needed
4. **Type Safety**: The TypeScript generator creates proper interfaces for these JSON structures

#### JSON Structure Handling
The system manages these JSON-structured settings through:

1. **Storage Layer**:
   - Stores JSON as validated, formatted strings
   - Maintains JSON schema validation rules
   - Handles serialization/deserialization

2. **API Layer**:
   - Validates JSON structure before persistence
   - Provides typed responses using generated interfaces
   - Maintains JSON schema compatibility

3. **Client Layer**:
   - Uses generated TypeScript interfaces for type safety
   - Provides helper methods for JSON manipulation
   - Implements validation before sending updates

4. **Type Generation**:
   The `legacy-analyzer` tool:
   - Recognizes JSON-structured fields through C# attributes and documentation
   - Generates appropriate TypeScript interfaces
   - Creates helper methods for JSON parsing and validation
   - Maintains documentation of JSON schemas

Example JSON Schema Documentation:
```typescript
/**
 * Filter configuration JSON schema:
 * [{
 *     "Name": string,           // Field name
 *     "ValuesCausingInclusion": string,  // Values that cause inclusion
 *     "ValuesCausingExclusion": string,  // Values that cause exclusion
 *     "RequiresValue": boolean, // Whether the field is required
 *     "ErrorMessage": string    // Error message for validation
 * }]
 */

### Legacy System Integration
The C# implementation in the legacy system:
- Directly interfaces with the database table
- Handles serialization/deserialization of settings
- Manages type conversion and validation
- Provides caching and performance optimizations

### API Layer Integration
The CBP admin application will integrate with a new API layer that:
1. **CRUD Operations**:
   - Create new settings
   - Read settings by key or group
   - Update existing settings
   - Delete deprecated settings

2. **API Endpoints**:
   ```
   GET    /api/v1/settings/{key}           # Get single setting
   GET    /api/v1/settings/groups/{name}   # Get settings group
   PUT    /api/v1/settings/{key}           # Update single setting
   PUT    /api/v1/settings/batch           # Batch update settings
   GET    /api/v1/settings/prefix/{prefix} # Get settings by prefix
   POST   /api/v1/settings/validate        # Validate setting value
   ```

3. **Data Flow**:
   ```
   CBP Admin UI <-> SettingsService <-> API Layer <-> Database
   ```

4. **Features**:
   - Transaction support for batch operations
   - Validation before persistence
   - Audit logging of changes
   - Cache management
   - Type safety throughout the stack

This architecture ensures:
- Consistent data access patterns
- Type safety from database to UI
- Efficient bulk operations
- Proper validation and error handling
- Audit trail of setting changes

## Best Practices

1. Always use the `ServiceFactory` to obtain service instances
2. Use `SettingsManager` for cached access to settings
3. Implement proper error handling
4. Maintain type safety by using generated types
5. Use batch operations when updating multiple settings
6. Validate settings before saving
7. Keep track of settings groups for organization

## File Structure

```
admin/cbp/src/services/
├── interfaces/
│   └── ISettingsService.ts
├── implementations/
│   ├── real/
│   │   └── SettingsService.ts
│   ├── mock/
│   │   └── MockSettingsService.ts
│   └── settings.manager.ts
└── factory/
    └── ServiceFactory.ts
```

## Related Documentation
- API Documentation: `services/api/`
- Type Definitions: `types/settings.types.ts`
- Mock Data: `implementations/mock/data/settings/`
