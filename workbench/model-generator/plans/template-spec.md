# Template System Specification

## Overview
The model generator will use a template-based system for static files, similar to legacy-analyzer. This document defines the template structure and usage.

## Template Directory Structure
```
src/templates/
├── base/                     # Static base files
│   ├── types.ts             # Core type definitions
│   └── JsonSetting.ts       # JSON handling base class
├── project/                  # Project-level templates
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Package dependencies
└── generation/              # Generation templates
    ├── class.ts.hbs         # Class template
    ├── property.ts.hbs      # Property templates
    └── metadata.ts.hbs      # Metadata templates
```

## Template Categories

### 1. Static Base Files
These files are copied directly with no modification:
- `types.ts`: Core interfaces (ISettingsGroup, ISettingsMetadata)
- `JsonSetting.ts`: Generic JSON handling class

### 2. Project Templates
These files are copied with basic variable substitution:
```json
// tsconfig.json
{
  "extends": "{{rootTsConfig}}",
  "compilerOptions": {
    "outDir": "{{outDir}}",
    "rootDir": "{{rootDir}}"
  }
}
```

### 3. Generation Templates
These use Handlebars for complex generation:
```typescript
// class.ts.hbs
export namespace {{fullNamespace}} {
    export class {{className}} implements ISettingsGroup {
        {{#each properties}}
        {{> property}}
        {{/each}}

        {{> metadata}}
    }
}
```

## Generation Templates

### 1. Property Template
```typescript
// property.ts.hbs
{{#if isJson}}
private _{{name}} = new JsonSetting<{{type}}>('{{key}}', {{defaultValue}});
{{/if}}

get {{name}}(): {{type}} {
    {{#if isJson}}
    return this._{{name}}.value;
    {{else}}
    return this.getValue('{{key}}');
    {{/if}}
}

set {{name}}(value: {{type}}) {
    {{#if isJson}}
    this._{{name}}.value = value;
    {{else}}
    this.setValue('{{key}}', value);
    {{/if}}
}
```

### 2. Class Template
```typescript
// class.ts.hbs
export class {{className}} implements ISettingsGroup {
    {{#each properties}}
    {{> property}}
    {{/each}}

    {{> metadata}}
}
```

### 3. Metadata Template
```typescript
// metadata.ts.hbs
static readonly metadata: ISettingsMetadata = {
    groupName: '{{groupName}}',
    settings: {
        {{#each properties}}
        {{name}}: {
            key: '{{key}}',
            type: '{{type}}',
            required: {{required}},
            {{#if schema}}
            schema: {{{schema}}}
            {{/if}}
        },
        {{/each}}
    }
};
```

## Template Management

### 1. Template Loading
```typescript
interface TemplateManager {
    // Load and cache templates
    loadTemplates(): Promise<void>;
    
    // Get static template content
    getStaticTemplate(name: string): string;
    
    // Get and compile generation template
    getGenerationTemplate(name: string): HandlebarsTemplate;
}
```

### 2. Template Variables
```typescript
interface TemplateContext {
    // Project-level variables
    projectName: string;
    outputDir: string;
    rootDir: string;
    
    // Namespace variables
    baseNamespace: string;
    featureNamespace: string;
    fullNamespace: string;
    
    // Generation variables
    className: string;
    properties: PropertyDefinition[];
    metadata: MetadataDefinition;
}
```

### 3. Template Helpers
```typescript
const templateHelpers = {
    // Type conversion
    toCamelCase: (str: string) => string;
    toTitleCase: (str: string) => string;
    
    // Type mapping
    mapType: (type: string) => string;
    
    // Namespace helpers
    getImportPath: (from: string, to: string) => string;
    getRelativeNamespace: (from: string, to: string) => string;
    
    // Validation
    generateValidation: (rules: any) => string;
};
```

## Implementation Plan

### Phase 1: Basic Templates
1. Copy base templates from pilot project
   - `types.ts`
   - `JsonSetting.ts`
2. Create project templates
   - `tsconfig.json`
   - Basic directory structure

### Phase 2: Generation Templates
1. Create Handlebars templates for:
   - Class generation
   - Property generation
   - Metadata generation
2. Implement template helpers
3. Add validation generation

### Phase 3: Enhanced Templates
1. Add documentation templates
2. Create partial templates for reuse
3. Add advanced validation templates

## Template Testing

### 1. Static Templates
- Verify template content
- Check file copying
- Validate syntax

### 2. Generation Templates
- Test variable substitution
- Verify helper functions
- Check generated code

### 3. Integration Tests
- Full generation pipeline
- Project structure
- Compilation tests

## Migration Notes

### From Legacy Analyzer
1. Copy base templates directly
2. Update paths and imports
3. Add new type definitions

### To New System
1. Create template directory
2. Copy static files
3. Set up generation system
