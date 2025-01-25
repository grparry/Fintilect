# Emerge Config Generator Design

## Overview
A focused tool for generating configuration components and metadata from legacy-analyzer output and additional configuration.

## Core Principles
1. Single responsibility - metadata generation
2. Clean interfaces with legacy-analyzer
3. Declarative configuration
4. Type-safe output

## Architecture

### 1. Input Sources

#### Legacy Analyzer Output
```typescript
// From legacy-analyzer output/infrastructure/models/...
interface GeneratedType {
    name: string;
    namespace: string;
    properties: PropertyDefinition[];
    sourceFile: string;
    documentation: DocumentationInfo;
}
```

#### Metadata Configuration
```yaml
# metadata/account-settings.yaml
group: accounts
section: categories
metadata:
  key: Account.Categories
  label: Account Categories
  description: Configure account category settings
  icon: AccountBalanceIcon
  category: Account Management
  permissions:
    - config.account.read
    - config.account.write
layout:
  type: form
  sections:
    - title: General
      fields:
        - name: defaultCategories
          label: Default Categories
          component: ListInput
    - title: Advanced
      fields:
        - name: categoryRules
          label: Category Rules
          component: JsonEditor
```

### 2. Generator Pipeline

```
Input → Validation → Enrichment → Generation → Output
```

#### Stage 1: Input
- Read legacy-analyzer output
- Parse metadata YAML
- Load templates

#### Stage 2: Validation
- Validate types exist
- Check metadata completeness
- Verify template syntax
- Ensure unique keys

#### Stage 3: Enrichment
- Merge type info with metadata
- Resolve component dependencies
- Generate navigation data
- Add validation rules

#### Stage 4: Generation
- Generate component files
- Create metadata files
- Output navigation configs
- Write documentation

### 3. Output Structure

```
output/
├── components/
│   ├── accounts/
│   │   └── AccountCategoriesSection.tsx
│   └── core/
│       └── CoreSettingsSection.tsx
├── metadata/
│   ├── accounts.json
│   └── core.json
├── navigation/
│   └── config-sections.ts
└── docs/
    └── generated-sections.md
```

### 4. Templates

#### Component Template
```typescript
// templates/component.hbs
import { EmergeConfigSection } from '../base/EmergeConfigSection';
import { {{type.name}} } from '{{type.importPath}}';

export class {{className}} extends EmergeConfigSection<{{type.name}}> {
    static metadata = {{{json metadata}}};
    
    // Auto-registration
    static {
        EmergeConfigSection.register(
            {{className}}.metadata.key,
            {{className}}
        );
    }

    protected getDefaultValue(): {{type.name}} {
        return {{{json defaultValue}}};
    }
    
    protected getValidationRules(): ValidationRules {
        return {{{json validationRules}}};
    }
    
    protected getLayout(): LayoutDefinition {
        return {{{json layout}}};
    }
}
```

For details on the registration flow and navigation integration, see `component-registration-flow.md`.

#### Metadata Template
```typescript
// templates/metadata.hbs
export const {{groupId}}Metadata = {
    sections: {{{json sections}}},
    navigation: {{{json navigation}}}
};
```

## Implementation Steps

### 1. Core Infrastructure
- Project setup
- CLI framework
- Template engine
- File system utilities

### 2. Input Processing
- Legacy-analyzer parser
- YAML parser
- Template loader
- Type definitions

### 3. Generation Pipeline
- Pipeline framework
- Stage implementations
- Error handling
- Progress tracking

### 4. Output Generation
- Component generator
- Metadata generator
- Navigation config
- Documentation

### 5. Testing & Validation
- Unit tests
- Integration tests
- Template validation
- Output verification

## Test Generation

### 1. Component Test Generation
```typescript
// templates/component.test.hbs
import { render, screen, fireEvent } from '@testing-library/react';
import { {{className}} } from './{{className}}';
import { mockSettingsService } from '../../../test/mocks';

describe('{{className}}', () => {
    beforeEach(() => {
        mockSettingsService.reset();
    });

    // Generated from metadata
    it('should render with correct title', () => {
        render(<{{className}} />);
        expect(screen.getByText('{{metadata.label}}')).toBeInTheDocument();
    });

    // Generated from type information
    it('should validate required fields', async () => {
        const component = render(<{{className}} />);
        {{#each type.requiredFields}}
        expect(await component.validateField('{{name}}')).toEqual({
            valid: false,
            error: '{{name}} is required'
        });
        {{/each}}
    });

    // Generated from schema
    {{#each type.properties}}
    it('should handle {{name}} updates', async () => {
        const component = render(<{{../className}} />);
        const input = screen.getByLabelText('{{label}}');
        
        // Generated test value based on type
        const testValue = {{generateTestValue type}};
        await fireEvent.change(input, { target: { value: testValue } });
        
        expect(mockSettingsService.updateSetting).toHaveBeenCalledWith(
            '{{../metadata.key}}.{{name}}',
            testValue
        );
    });
    {{/each}}

    // Generated from validation rules
    {{#each metadata.validation}}
    it('should validate {{field}} according to rules', async () => {
        const component = render(<{{../className}} />);
        {{#each rules}}
        expect(await component.validateField('{{../field}}', {{generateTestValue type invalid=true}}))
            .toEqual({
                valid: false,
                error: '{{message}}'
            });
        expect(await component.validateField('{{../field}}', {{generateTestValue type valid=true}}))
            .toEqual({
                valid: true
            });
        {{/each}}
    });
    {{/each}}
});
```

### 2. Integration Test Generation
```typescript
// templates/integration.test.hbs
describe('{{className}} Integration', () => {
    // Generated from dependencies
    {{#each metadata.dependencies}}
    it('should interact with {{this}}', async () => {
        const component = render(<{{../className}} />);
        const dependentSection = render(<{{this}} />);
        
        // Test interaction based on dependency type
        {{#if (isDataDependency this)}}
        await component.updateValue({ key: 'test' });
        expect(dependentSection.getValue('key')).toBe('test');
        {{/if}}
        
        {{#if (isVisibilityDependency this)}}
        await component.updateValue({ visible: true });
        expect(dependentSection.isVisible()).toBe(true);
        {{/if}}
    });
    {{/each}}
    
    // Generated from service interactions
    it('should handle service errors', async () => {
        mockSettingsService.simulateError('updateSetting');
        const component = render(<{{className}} />);
        
        await component.updateValue({ test: true });
        expect(screen.getByText('Error updating settings')).toBeInTheDocument();
    });
});
```

### 3. E2E Test Generation
```typescript
// templates/e2e.test.hbs
describe('{{className}} E2E', () => {
    // Generated from navigation metadata
    it('should be accessible through navigation', async () => {
        render(<App />);
        await navigateTo('{{metadata.menuPath}}');
        expect(screen.getByText('{{metadata.label}}')).toBeInTheDocument();
    });
    
    // Generated from workflow metadata
    {{#each metadata.workflows}}
    it('should complete {{name}} workflow', async () => {
        render(<App />);
        {{#each steps}}
        await {{action}}('{{target}}', {{generateTestValue type}});
        expect(screen.getByText('{{expectation}}')).toBeInTheDocument();
        {{/each}}
    });
    {{/each}}
});
```

### 4. Test Utils Generation
```typescript
// templates/test-utils.hbs
export const {{camelCase className}}TestUtils = {
    // Generated from type
    generateValidValue(): {{type.name}} {
        return {
            {{#each type.properties}}
            {{name}}: {{generateTestValue type}},
            {{/each}}
        };
    },
    
    // Generated from validation rules
    generateInvalidValue(): {{type.name}} {
        return {
            {{#each metadata.validation}}
            {{field}}: {{generateTestValue type invalid=true}},
            {{/each}}
        };
    },
    
    // Generated from workflows
    async completeWorkflow(name: string): Promise<void> {
        const workflow = {{className}}.workflows[name];
        for (const step of workflow.steps) {
            await step.action(step.target, this.generateTestValue(step.type));
        }
    }
};
```

### 5. Test Data Generation
```yaml
# templates/test-data.hbs
{{className}}TestData:
  valid:
    {{#each type.properties}}
    {{name}}: {{generateTestValue type}}
    {{/each}}
  
  invalid:
    {{#each metadata.validation}}
    {{field}}:
      {{#each rules}}
      - value: {{generateTestValue type invalid=true}}
        error: "{{message}}"
      {{/each}}
    {{/each}}
  
  workflows:
    {{#each metadata.workflows}}
    {{name}}:
      {{#each steps}}
      - action: {{action}}
        value: {{generateTestValue type}}
        expect: {{expectation}}
      {{/each}}
    {{/each}}
```

### Test Generation Pipeline

1. **Metadata Analysis**
   - Extract testable properties
   - Identify validation rules
   - Map dependencies
   - Define workflows

2. **Template Selection**
   - Choose appropriate templates
   - Resolve dependencies
   - Include test utilities

3. **Test Value Generation**
   ```typescript
   function generateTestValue(type: TypeInfo, options: TestValueOptions = {}): any {
       switch (type.kind) {
           case 'string':
               return options.invalid 
                   ? generateInvalidString(type.constraints)
                   : generateValidString(type.constraints);
           case 'number':
               return options.invalid
                   ? generateInvalidNumber(type.constraints)
                   : generateValidNumber(type.constraints);
           // ... other types
       }
   }
   ```

4. **Test Organization**
   ```typescript
   export interface TestSuite {
       unit: {
           component: string[];
           hooks: string[];
           utils: string[];
       };
       integration: {
           dependencies: string[];
           services: string[];
       };
       e2e: {
           workflows: string[];
           navigation: string[];
       };
   }
   ```

### Test Running Infrastructure

1. **Test Runner Configuration**
   ```typescript
   // jest.config.generated.js
   module.exports = {
       roots: ['<rootDir>/src'],
       testMatch: [
           '**/__tests__/**/*.generated.ts?(x)',
           '**/?(*.)+(spec|test).generated.ts?(x)'
       ],
       transform: {
           '^.+\\.tsx?$': 'ts-jest'
       },
       setupFilesAfterEnv: [
           '<rootDir>/src/test/generated-setup.ts'
       ]
   };
   ```

2. **Test Environment Setup**
   ```typescript
   // test/generated-setup.ts
   import { ConfigSectionRegistry } from '../components/config';
   import { mockSettingsService } from './mocks';
   
   beforeEach(() => {
       ConfigSectionRegistry.clear();
       mockSettingsService.reset();
   });
   ```

3. **CI Integration**
   ```yaml
   # .github/workflows/test-generated.yml
   name: Generated Tests
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Generate Tests
           run: npm run generate:tests
         - name: Run Generated Tests
           run: npm run test:generated
   ```

### Test Generation CLI

```bash
# Generate all tests
emerge-config-gen generate:tests \
  --metadata ./metadata \
  --output ./src/__tests__/generated

# Generate specific test types
emerge-config-gen generate:tests \
  --type unit,integration \
  --section AccountSettings

# Watch mode for test generation
emerge-config-gen watch:tests \
  --metadata ./metadata
```

## Usage Example

```bash
# Generate from legacy output
emerge-config-gen generate \
  --legacy-output ../legacy-analyzer/output \
  --metadata ./metadata \
  --templates ./templates \
  --output ../cbp-admin/src/components/emerge-config

# Watch mode for development
emerge-config-gen watch \
  --legacy-output ../legacy-analyzer/output \
  --metadata ./metadata

# Validate only
emerge-config-gen validate \
  --metadata ./metadata
```

## Next Steps
1. Create project structure
2. Implement core pipeline
3. Design template system
4. Add validation logic
5. Create initial templates
