# Emerge Configuration Management System Design

## Overview
This document outlines the design for the Emerge Configuration Management System, focusing on a base component architecture with automated code generation for configuration sections.

## Core Concepts

### 1. Settings Structure
- All settings are stored in a single database table
- Settings follow a key-value pattern with metadata
- Keys are structured as `{SettingGroupName}.{SettingName}`
- Values support multiple data types (boolean, string, number, json)

### 2. Base Component Architecture

#### Core Base Component
Located in `src/components/emerge-config/base/`:
```
base/
├── EmergeConfigSection.tsx    # Base React component
├── types/
│   ├── metadata.ts           # Configuration metadata types
│   ├── validation.ts         # Validation rule types
│   └── layout.ts            # Layout definition types
├── hooks/
│   ├── useSettingValue.ts    # Value management hook
│   └── useValidation.ts      # Validation hook
└── utils/
    ├── schemaUtils.ts        # Schema handling
    └── validationUtils.ts    # Validation helpers
```

#### Base Component Implementation
```typescript
export abstract class EmergeConfigSection<T = any> extends React.Component<ConfigSectionProps<T>> {
    // Registration support
    static metadata: ConfigMetadata;
    
    static register(key: string, component: typeof EmergeConfigSection): void {
        ConfigSectionRegistry.register(key, component);
    }

    static getNavigationItem(): NavigationItem {
        return {
            id: this.metadata.key,
            title: this.metadata.label,
            path: `/admin/emerge-config/${this.metadata.groupId}/${this.metadata.sectionId}`,
            icon: this.metadata.icon
        };
    }

    // Core functionality provided by base
    getValue(): T;
    setValue(value: T): void;
    validate(): ValidationResult;
    getLayout(): LayoutDefinition;
    
    // Must be implemented by generated code
    abstract getDefaultValue(): T;
    abstract getValidationRules(): ValidationRules;
}
```

For details on the registration flow and navigation integration, see `component-registration-flow.md`.

#### Service Layer Integration

#### Settings Service Interface
The base component integrates with the settings service:
```typescript
export interface ISettingsService {
    getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>>;
    getSetting(key: string): Promise<ApiSuccessResponse<Setting>>;
    updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>>;
    validateSetting(key: string, value: any): Promise<ApiSuccessResponse<ValidationResult>>;
}
```

#### Service Integration in Base Component
```typescript
export abstract class EmergeConfigSection<T = any> {
    @inject(ISettingsService)
    protected settingsService: ISettingsService;

    async loadValue(): Promise<void> {
        const response = await this.settingsService.getSetting(this.getSettingKey());
        if (response.success && response.data) {
            this.setValue(response.data.value);
        }
    }

    async saveValue(value: T): Promise<void> {
        await this.settingsService.updateSetting(this.getSettingKey(), value);
    }
}
```

### 3. Input Components
Located in `src/components/emerge-config/base/inputs/`:
```
inputs/
├── BooleanInput/
│   ├── index.tsx
│   └── types.ts
├── StringInput/
│   ├── index.tsx
│   └── validation.ts
├── NumberInput/
│   ├── index.tsx
│   └── constraints.ts
├── ListInput/
│   ├── index.tsx
│   └── itemTypes.ts
└── ObjectInput/
    ├── index.tsx
    └── schema.ts
```

#### Input Component Pattern
```typescript
export interface InputProps<T> {
    value: T;
    onChange: (value: T) => void;
    validation?: ValidationRules;
    disabled?: boolean;
    schema?: JsonSchema;
}

// Example implementation
export const NumberInput: React.FC<InputProps<number>> = ({
    value,
    onChange,
    validation
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && validation?.min <= newValue && newValue <= validation?.max) {
            onChange(newValue);
        }
    };

    return (
        <input
            type="number"
            value={value}
            onChange={handleChange}
            min={validation?.min}
            max={validation?.max}
        />
    );
};
```

### 4. Code Generation

#### Generator Architecture
Enhanced `legacy-analyzer` to generate:
```
emerge-config/
├── generated/
│   ├── Account/
│   │   ├── metadata/
│   │   │   ├── categories.json   # Generated metadata
│   │   │   └── display.json      # Generated metadata
│   │   ├── types/
│   │   │   └── index.ts          # Generated types
│   │   └── sections/
│   │       ├── AccountCategories.tsx  # Generated component
│   │       └── AccountDisplay.tsx     # Generated component
│   └── Transfer/
│       └── ...
└── custom/                        # Manual overrides
    └── Account/
        └── components/
            └── CustomEditor.tsx
```

#### Generated Component Example
```typescript
// Generated code
export class AccountCategoriesSection extends EmergeConfigSection<AccountCategoriesConfig> {
    static metadata: ConfigMetadata = {
        key: 'Account.Categories',
        label: 'Account Categories',
        description: 'Configure account categorization',
        schema: {/*...*/}
    };

    getDefaultValue(): AccountCategoriesConfig {
        return {
            categories: [],
            showInactive: false
        };
    }

    getValidationRules(): ValidationRules {
        return {
            'categories': { required: true, minItems: 1 },
            'showInactive': { type: 'boolean' }
        };
    }
}
```

### 5. Component Customization

#### Override System
```typescript
// Custom implementation
@ConfigSection({
    extends: AccountCategoriesSection,
    customComponents: {
        categoryEditor: CustomCategoryEditor
    }
})
export class CustomAccountCategoriesSection extends AccountCategoriesSection {
    // Override specific methods while keeping base functionality
    getLayout(): LayoutDefinition {
        return {
            type: 'custom',
            component: 'categoryEditor'
        };
    }
}
```

## Implementation Steps

### 1. Base Infrastructure
1. Create EmergeConfigSection base component
2. Implement core hooks and utilities
3. Add validation system
4. Create layout engine

### 2. Code Generation
1. Update legacy-analyzer for metadata extraction
2. Add component generation
3. Generate types and validation
4. Add customization support

### 3. Manual Components
1. Create override system
2. Build custom editors
3. Add layout customization
4. Implement complex validation

## Validation Tests

### 1. Base Component Tests
```typescript
// Test at implementation of base class
describe('EmergeConfigSection', () => {
    // Value Management
    it('should manage value lifecycle', async () => {
        const section = new TestSection();
        await section.setValue({ test: true });
        expect(section.getValue()).toEqual({ test: true });
    });

    // Validation
    it('should validate against schema', async () => {
        const section = new TestSection();
        const result = await section.validate();
        expect(result.valid).toBe(false);
        expect(result.errors[0].field).toBe('requiredField');
    });

    // Service Integration
    it('should interact with settings service', async () => {
        const section = new TestSection();
        await section.load();
        expect(mockSettingsService.getSetting).toHaveBeenCalled();
    });
});
```

### 2. Input Component Tests
```typescript
// Test at implementation of each input type
describe('JsonInput', () => {
    // Schema Validation
    it('should validate against JSON schema', async () => {
        const input = render(<JsonInput schema={testSchema} />);
        await input.setValue({ invalid: true });
        expect(input.getByText('Invalid format')).toBeInTheDocument();
    });

    // Value Updates
    it('should emit valid changes', async () => {
        const onChange = jest.fn();
        const input = render(<JsonInput onChange={onChange} />);
        await input.setValue({ valid: true });
        expect(onChange).toHaveBeenCalledWith({ valid: true });
    });
});
```

### 3. Service Layer Tests
```typescript
// Test at implementation of settings service
describe('SettingsService', () => {
    // JSON Schema
    it('should validate JSON settings', async () => {
        const service = new SettingsService();
        const result = await service.validateSetting('test', {
            value: { invalid: true }
        });
        expect(result.valid).toBe(false);
    });

    // Type Safety
    it('should preserve types', async () => {
        const service = new SettingsService();
        await service.updateSetting('test', { num: 123 });
        const result = await service.getSetting('test');
        expect(typeof result.value.num).toBe('number');
    });
});
```

### 4. Integration Tests
```typescript
// Test after connecting components
describe('Config Section Integration', () => {
    // Component + Service
    it('should save changes to service', async () => {
        const section = render(<TestSection />);
        await section.setValue({ test: true });
        expect(mockSettingsService.updateSetting).toHaveBeenCalled();
    });

    // Input + Validation
    it('should validate input changes', async () => {
        const section = render(<TestSection />);
        const input = section.getByLabelText('Test Input');
        await fireEvent.change(input, { target: { value: 'invalid' }});
        expect(section.getByText('Validation failed')).toBeInTheDocument();
    });
});
```

### 5. Error Handling Tests
```typescript
// Test at each error boundary
describe('Error Handling', () => {
    // Service Errors
    it('should handle service failures', async () => {
        mockSettingsService.simulateError('updateSetting');
        const section = render(<TestSection />);
        await section.setValue({ test: true });
        expect(section.getByText('Failed to save')).toBeInTheDocument();
    });

    // Validation Errors
    it('should handle validation failures', async () => {
        const section = render(<TestSection />);
        await section.setValue({ invalid: true });
        expect(section.getByText('Invalid format')).toBeInTheDocument();
    });
});
```

## Component Workflow

### 1. Generated Flow
```mermaid
graph TD
    A[C# Model] --> B[legacy-analyzer]
    B --> C[Generated Component]
    C --> D[Generated Types]
    C --> E[Generated Metadata]
    C --> F[Generated Validation]
```

### 2. Runtime Flow
```mermaid
graph TD
    A[Base Component] --> B[Generated Code]
    B --> C[Custom Overrides]
    C --> D[Final Component]
```

## Development Process

### 1. New Configuration Section
1. Define C# model with attributes
2. Run code generation
3. Add custom components if needed
4. Register in configuration system

### 2. Customization
1. Create override class
2. Implement custom components
3. Override specific methods
4. Register overrides

## Testing Strategy

### 1. Base Component
- Unit tests for core functionality
- Integration tests with service layer
- Validation testing
- Layout testing

### 2. Generated Code
- Snapshot testing
- Type checking
- Schema validation
- Integration testing

### 3. Custom Components
- Component testing
- Override testing
- Integration testing
- Visual testing

## Future Considerations

### 1. Enhanced Type Generation
- Generate more precise TypeScript types
- Add runtime type checking
- Support complex validation patterns
- Add migration helpers

### 2. Advanced Components
- Rich text editor integration
- File upload handling
- Dynamic dependency loading
- Custom validation rules

### 3. Performance Optimizations
- Form field memoization
- Lazy validation
- Batch updates
- State management improvements

### 4. Developer Experience
- Component generation CLI
- Visual layout editor
- Documentation generation
- Testing utilities

### 5. Integration Features
- Cross-section dependencies
- Conditional visibility
- Dynamic validation
- Undo/redo support

## Next Steps
1. Implement base component
2. Update code generation
3. Create first section
4. Add testing framework
5. Document patterns
