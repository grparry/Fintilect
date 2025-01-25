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
