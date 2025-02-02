# Settings Generator Enhancement Plan

## Overview
The legacy-analyzer's settings generator needs enhancement to fully support the CBP admin application's architectural pattern for JSON-structured settings. This document focuses on the generator enhancements required, building upon the existing parser capabilities documented in [parser-enhancement-addendum.md](parser-enhancement-addendum.md).

## Implementation Phases

### Phase 1: Parser Enhancements (Prerequisite)
As detailed in [parser-enhancement-addendum.md](parser-enhancement-addendum.md), we first need to:
1. Add JSON schema extraction to the DocumentationParser
2. Extend the type system for JSON structures
3. Add example processing capabilities

### Phase 2: Generator Enhancements (This Document)
Once the parser enhancements are complete, we can:
1. Update type generation to use the extracted JSON schemas
2. Implement JSON-aware property generation
3. Add validation generation
4. Update documentation generation
5. Add metadata generation with service prefixes
6. Generate type-safe property accessors

### Phase 3: Testing and Integration
Finally, we will:
1. Test the full pipeline from C# to TypeScript
2. Verify component integration
3. Update existing settings classes
4. Validate JSON parsing and error handling

## Current State
The generator currently:
- Creates basic TypeScript classes implementing `ISettingsGroup`
- Generates string-typed properties for JSON fields
- Creates basic documentation structure
- Maintains parallel directory structure for docs
- Preserves C# attributes as metadata

## Required Generator Enhancements

### 1. Type Generation
The generator must leverage the JSON schema information extracted by the parser (see parser-enhancement-addendum.md) to create proper TypeScript interfaces:

```typescript
// Current
export interface PscuLogFileTransformServiceSettingsConfig {
    Filters: string;  // Raw JSON string
}

// Required
export interface FilterConfig {
    name: string;
    valuesCausingInclusion: string;
    valuesCausingExclusion: string;
    requiresValue: boolean;
    errorMessage: string;
}

export interface PscuLogFileTransformServiceSettingsConfig {
    filters: FilterConfig[];  // Strongly typed
}
```

### 2. Property Implementation
Generate type-safe property implementations that handle JSON serialization:

```typescript
// Current
private _filters: string;
get filters(): string {
    return this._filters;
}

// Required
private _filters: string;
get filters(): FilterConfig[] {
    try {
        return JSON.parse(this._filters || '[]');
    } catch (e) {
        console.error('Invalid filters JSON:', e);
        return [];
    }
}

set filters(value: FilterConfig[]) {
    this.validateFilters(value);
    this._filters = JSON.stringify(value);
}
```

### 3. Validation Generation
Generate validation methods based on JSON schema and documentation:

```typescript
private validateFilters(filters: FilterConfig[]): void {
    if (!Array.isArray(filters)) {
        throw new Error('Filters must be an array');
    }
    
    filters.forEach((filter, index) => {
        if (typeof filter.name !== 'string' || !filter.name) {
            throw new Error(`Filter at index ${index} must have a name`);
        }
        if (typeof filter.requiresValue !== 'boolean') {
            throw new Error(`Filter at index ${index} has invalid requiresValue`);
        }
    });
}
```

### 4. Documentation Generation
Generate enhanced documentation that includes JSON schemas and usage examples:

```markdown
# PscuLogFileTransformServiceSettings

## JSON Structures

### Filters
\`\`\`typescript
interface FilterConfig {
    name: string;               // Field name
    valuesCausingInclusion: string;
    valuesCausingExclusion: string;
    requiresValue: boolean;     // Whether field is required
    errorMessage: string;       // Error message for validation
}
\`\`\`

Example:
\`\`\`json
[{
    "Name": "Transaction Post Date",
    "ValuesCausingInclusion": "",
    "ValuesCausingExclusion": "",
    "RequiresValue": true,
    "ErrorMessage": "Transaction Post Date is required"
}]
\`\`\`

## Component Usage
### Type-Safe Access
```typescript
// Access settings with full type safety
const settings = new PscuLogFileTransformServiceSettings();
const filters: FilterConfig[] = settings.filters;

// TypeScript will catch type errors
filters.forEach(filter => {
    console.log(filter.name);           // OK
    console.log(filter.requiresValue);   // OK
    console.log(filter.invalid);         // Error: Property 'invalid' does not exist
});
```

### Form Integration
```typescript
// Create form with type checking
const filterForm = this.formBuilder.group({
    name: ['', Validators.required],
    valuesCausingInclusion: [''],
    valuesCausingExclusion: [''],
    requiresValue: [false],
    errorMessage: ['']
});

// Two-way binding with settings
@Component({
    template: `
        <form [formGroup]="filterForm">
            <input formControlName="name" />
            <input formControlName="valuesCausingInclusion" />
            <input formControlName="valuesCausingExclusion" />
            <input formControlName="requiresValue" type="checkbox" />
            <input formControlName="errorMessage" />
        </form>
    `
})
export class FilterEditorComponent {
    // Type-safe form initialization
    initForm(filter: FilterConfig) {
        this.filterForm.patchValue(filter);
    }

    // Type-safe form submission
    onSubmit() {
        if (this.filterForm.valid) {
            const filter: FilterConfig = this.filterForm.value;
            this.settings.filters = [...this.settings.filters, filter];
        }
    }
}
```

### Validation Integration
```typescript
// Automatic validation on save
export class SettingsEditorComponent {
    saveSettings() {
        try {
            // Type-safe validation
            this.settings.filters = this.filterForm.value;
            // Save was successful
        } catch (e) {
            // Validation error, show in UI
            this.errorMessage = e.message;
        }
    }
}
```

### 5. Base Class Generation
Generate a base class that provides common JSON handling functionality:

```typescript
export abstract class JsonSettingsBase implements ISettingsGroup {
    protected abstract parseJson<T>(json: string): T;
    protected abstract validateJson<T>(obj: T): boolean;
    
    protected parseJsonSafe<T>(json: string, defaultValue: T): T {
        try {
            return JSON.parse(json) as T;
        } catch (e) {
            console.error('JSON parse error:', e);
            return defaultValue;
        }
    }
    
    protected stringifyJsonSafe<T>(value: T): string {
        try {
            return JSON.stringify(value);
        } catch (e) {
            console.error('JSON stringify error:', e);
            return '{}';
        }
    }
}
```

### 6. Service Prefix Configuration
Add support for configurable service prefixes:

```typescript
interface ServicePrefixConfig {
    prefix: string;            // e.g., 'PsiServices'
    separator: string;         // e.g., '.'
    includeGroupName: boolean; // Whether to include group name in key
}

// Example usage in metadata
static readonly metadata: ISettingsMetadata = {
    groupName: 'PscuLogFileTransformService',
    servicePrefix: {
        prefix: 'PsiServices',
        separator: '.',
        includeGroupName: true
    },
    settings: {
        filters: {
            key: 'PsiServices.PscuLogFileTransformService.Filters',
            type: 'json',
            required: false
        }
    }
};
```

### 7. Error Handling Strategy
Implement consistent error handling:

```typescript
class SettingsError extends Error {
    constructor(
        message: string,
        public readonly settingKey: string,
        public readonly errorType: 'parse' | 'validation' | 'type',
        public readonly originalError?: Error
    ) {
        super(message);
    }
}

// Usage in property accessors
get filters(): FilterConfig[] {
    try {
        return JSON.parse(this._filters || '[]');
    } catch (e) {
        throw new SettingsError(
            'Failed to parse filters setting',
            'PsiServices.PscuLogFileTransformService.Filters',
            'parse',
            e
        );
    }
}
```

### 8. Pattern Compatibility
Ensure generated settings follow project patterns:

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

// Example pattern for JSON settings
const jsonSettingsPattern: SettingsPattern = {
    type: 'json',
    validation: 'strict',
    errorHandling: 'throw',
    prefixing: {
        required: true,
        format: '{servicePrefix}.{groupName}.{settingName}'
    }
};

// Pattern validation in generator
function validateSettingsPattern(settings: GeneratedSettings, pattern: SettingsPattern): void {
    if (pattern.type === 'json' && !settings.hasJsonValidation) {
        throw new Error('JSON settings must include validation');
    }
    if (pattern.prefixing.required && !settings.followsPrefixFormat) {
        throw new Error('Settings must follow prefix format');
    }
}
```

### 9. Context Inheritance
Support settings inheritance and overrides:

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
export class PscuLogFileTransformServiceSettings extends BaseJsonSettings {
    // Implementation
}
```

### 10. Relationship Tracking
Track dependencies between settings:

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
        source: 'PscuLogFileTransformService.PathConfiguration',
        target: 'PscuLogFileTransformService.Filters',
        type: 'configures',
        validation: ['PathMustExist', 'ValidatePermissions']
    }
];
```

## Test-Driven Development Plan

### Unit Tests (`tests/unit/output/settingsGenerator.test.ts`)

```typescript
describe('SettingsGenerator', () => {
    describe('generateJsonProperty', () => {
        it('should generate JSON-aware property with type safety', async () => {
            const field = {
                name: 'Filters',
                type: 'string',
                jsonSchema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' }
                        }
                    }
                }
            };
            
            const result = await generator.generateJsonProperty(field);
            expect(result).toContain('private _filters: string;');
            expect(result).toContain('get filters(): FilterConfig[] {');
            expect(result).toContain('return JSON.parse(this._filters || "[]");');
            expect(result).toContain('set filters(value: FilterConfig[]) {');
            expect(result).toContain('this.validateFilters(value);');
        });

        it('should handle nullable JSON fields', async () => {
            const field = {
                name: 'Config',
                type: 'string',
                isNullable: true,
                jsonSchema: {
                    type: 'object',
                    properties: {
                        enabled: { type: 'boolean' }
                    }
                }
            };
            
            const result = await generator.generateJsonProperty(field);
            expect(result).toContain('return this._config ? JSON.parse(this._config) : null;');
        });
    });

    describe('generateValidation', () => {
        it('should generate validation for JSON array', async () => {
            const schema = {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', required: true }
                    }
                }
            };
            
            const result = await generator.generateValidation('Filters', schema);
            expect(result).toContain('if (!Array.isArray(filters))');
            expect(result).toContain('if (typeof filter.name !== "string" || !filter.name)');
        });
    });
});

## Test Fixtures
Three example settings classes have been created in `tests/fixtures/json-schema/` to test different complexity levels and patterns:

### 1. PscuLogFileTransformServiceSettings
- Source: `PscuLogFileTransformServiceSettings.cs`
- Expected Output: `PscuLogFileTransformServiceSettings.expected.ts`

Tests complex JSON-structured settings with:
- Array of filter configurations
- Nested path configuration object
- Input/output field mappings
- Full validation logic

See `PscuLogFileTransformServiceSettings.expected.ts` for complete implementation including interfaces, validation, and JSON handling.

### 2. PasswordSettings
- Source: `PasswordSettings.cs`
- Expected Output: `PasswordSettings.expected.ts`

Tests simple settings with multiple primitive types:
- Boolean flags for UI behavior
- Numeric version
- String-based configuration
- No JSON structures

The expected TypeScript output demonstrates proper handling of multiple primitive types and metadata generation. See `PasswordSettings.expected.ts` for the complete implementation.

### 3. PasswordVerificationSettings
- Source: `PasswordVerificationSettings.cs`
- Expected Output: `PasswordVerificationSettings.expected.ts`

Tests minimal settings class with:
- Single boolean property
- Direct property access
- Basic validation
- No JSON structures

The expected TypeScript output shows the simplest possible implementation of `ISettingsGroup`. See `PasswordVerificationSettings.expected.ts` for the complete implementation.

These test fixtures demonstrate the full range of complexity the generator must handle:
1. Proper handling of JSON-structured and primitive settings
2. Type-safe property access patterns
3. Validation implementation
4. Documentation generation
5. Integration with Angular forms

The generator must correctly produce output matching these expected TypeScript files while maintaining:
- Type safety
- Validation
- Documentation
- Form integration

See the test fixtures in `tests/fixtures/json-schema/` for complete implementation details.

## Implementation Steps

1. **Generator Updates**
   - Update type generation to use parser's JSON schema information
   - Enhance property generation with JSON handling
   - Implement validation generation
   - Create base class generation

2. **Documentation Templates**
   - Update documentation templates
   - Add JSON schema formatting
   - Include usage examples
   - Add component integration docs

3. **Testing**
   - Add unit tests for generated code
   - Test validation logic
   - Verify documentation generation
   - Test component integration

## Success Criteria

1. **Type Safety**
   - Generated classes provide type-safe access to JSON fields
   - TypeScript compiler catches type errors
   - IntelliSense shows correct types

2. **Usability**
   - Components can use settings without JSON handling
   - Form binding works seamlessly
   - Validation provides clear error messages

3. **Documentation**
   - Clear JSON schema documentation
   - Helpful usage examples
   - Complete type information
   - Component integration guides

4. **Maintenance**
   - Generated code is readable
   - Documentation is maintainable
   - Changes to C# are reflected correctly
