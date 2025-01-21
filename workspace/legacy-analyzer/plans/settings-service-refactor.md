# Settings Service Layer Refactoring Plan

## Overview
This document outlines the changes needed in the legacy-analyzer generator to convert C# settings classes into TypeScript. The generator will analyze C# classes with the `SettingsBaseHelper` base class and generate corresponding TypeScript code.

## Current State Analysis

### 1. Type Generation
The generator currently produces TypeScript interfaces and types instead of classes:
```typescript
// Current output - types only
export interface FilterConfig {
    Name: string;
    ValuesCausingInclusion: string;
    ValuesCausingExclusion: string;
    RequiresValue: boolean;
    ErrorMessage: string;
}

export interface PscuLogFileTransformServiceSettings {
    filters: FilterConfig[];
    enabled: boolean;
}
```

### 2. Path Configuration
TypeScript path aliases are configured for the generated code:
```
@models/* -> output/infrastructure/models/*
@services/* -> output/infrastructure/services/*
@base/* -> output/infrastructure/base/*
```

### 3. Required Directory Structure
Configure the generator to produce the following output directory structure:
```
output/
├── infrastructure/
│   ├── base/
│   │   └── JsonSetting.ts        # Base class for JSON settings
│   ├── models/
│   │   └── WindowsService/       # Generated settings classes
│   │       ├── PscuTypes.ts      # Generated interfaces
│   │       └── PscuSettings.ts   # Generated classes
│   └── services/
│       └── settings/             # Settings service implementations
```

## Source Analysis

### 1. C# Settings Class Structure
- Inherits from `SettingsBaseHelper`
- Properties marked with `[SettingKey]` attribute containing the full key path
- Properties are strings that may contain JSON
- XML comments contain JSON schema examples
- Uses `GetValue()/SetValue()` for storage

### 2. Required TypeScript Output
- Generated TypeScript interfaces for JSON schemas
- Settings group class implementing `ISettingsGroup`
- Helper classes for JSON serialization
- Type-safe property access

## Generator Changes

### 1. Template Updates
- [x] Move existing templates to `src/output/templates/`:
  ```
  templates/
  ├── base/
  │   └── JsonSetting.ts.template  # Base class for JSON settings
  └── services/
      └── settings/
          ├── concrete.ts.template
          └── mock.ts.template
  ```

### 2. C# Analysis
- [x] Detect settings classes (inherits from `SettingsBaseHelper`)
- [x] Extract from properties:
  * Setting key from `[SettingKey]` attribute
  * JSON schema from XML comments
  * Property name and type
  * Validation rules from attributes
  * Default values from initializers
  * Nullability information

### 3. Generated Structure
Each settings group will be generated as a single file following this pattern:

1. **Field Implementations**
   - Simple fields (string, number, boolean) with appropriate TypeScript types
   - Private JSON helper classes for complex types
   - Validation rules from C# attributes
   - Default values from C# property initializers
   - Optional/required status from C# nullability

2. **Main Settings Group Class**
   - Private fields for all setting types
   - Type-safe getters/setters with appropriate validation
   - Conversion to/from API format for all types
   - Proper handling of nullable fields
   - Validation error collection and reporting

3. **Static Metadata**
   - Group name and description
   - Field-level metadata:
     * Key names and paths from `[SettingKey]` attribute
     * Data types from C# type analysis
     * Validation rules from C# attributes
     * Default values from initializers
     * Required/optional status from nullability
     * Display hints from XML comments

4. **Generated JSDoc Comments**
   - Convert C# XML comments to JSDoc
   - Include JSON format examples from remarks
   - Add type information
   - Document setting keys

### 4. Type Safety
- Simple settings (string, number, boolean) use TypeScript primitives
- Complex settings use generated TypeScript interfaces
- JSON helpers handle serialization automatically
- Settings group provides type-safe access to all settings

### 5. Service Layer Integration
- [x] Update service layer to use generated types
- [ ] Generate appropriate mock data based on JSON examples
- [ ] Add type assertions for validation

### 6. Path Management
- [ ] Update path resolution for generated files
- [ ] Configure TypeScript path aliases
- [ ] Handle cross-project references

## Configuration Plan

### 1. TypeScript Configuration
Update `tsconfig.json` to include path aliases and strict type checking:
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@models/*": ["output/infrastructure/models/*"],
      "@services/*": ["output/infrastructure/services/*"],
      "@base/*": ["output/infrastructure/base/*"]
    },
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true
  }
}
```

### 2. Output Directory Structure
Configure the generator to produce the following output directory structure:
```
output/
├── infrastructure/
│   ├── base/
│   │   └── JsonSetting.ts        # Base class for JSON settings
│   ├── models/
│   │   └── WindowsService/       # Generated settings classes
│   │       ├── PscuTypes.ts      # Generated interfaces
│   │       └── PscuSettings.ts   # Generated classes
│   └── services/
│       └── settings/             # Settings service implementations
```

## Implementation Tasks

### 1. Parser Updates (`src/parser/csharpParser.ts`)
- [x] Add detection for `SettingsBaseHelper` base class
- [x] Extract `[SettingKey]` attribute values
- [x] Parse XML comments for JSON examples
- [x] Extract property types and nullability
- [x] Add methods:
  ```typescript
  interface ICSharpParser {
    // New methods
    isSettingsClass(node: ClassDeclaration): boolean;
    getSettingKey(property: PropertyDeclaration): string | undefined;
    getJsonExample(property: PropertyDeclaration): string | undefined;
    // ... existing methods
  }
  ```

### 2. Type Generation (`src/output/typeScriptWriter.ts`)
- [x] Add JSON schema to TypeScript interface conversion:
  ```typescript
  class TypeScriptWriter {
    // New methods
    generateJsonInterface(jsonExample: string): string;
    generateJsonHelperClass(property: PropertyInfo): string;
    // ... existing methods
  }
  ```
- [x] Add setting group class generation:
  ```typescript
  interface ITypeScriptWriter {
    // New methods
    generateSettingsGroup(classInfo: ClassInfo): string;
    generateSettingField(property: PropertyInfo): string;
    // ... existing methods
  }
  ```

### 3. Documentation Generation (`src/output/classDocWriter.ts`)
- [ ] Convert C# XML comments to JSDoc:
  ```typescript
  class ClassDocWriter {
    // New methods
    convertXmlToJsDoc(xmlDoc: XmlDoc): string;
    generateJsonExampleDoc(example: string): string;
    // ... existing methods
  }
  ```

### 4. Templates (`src/output/templates/`)
- [ ] Create base JSON setting template:
  ```typescript
  // base/JsonSetting.ts.template
  export abstract class JsonSetting<T> {
    protected abstract readonly settingKey: string;
    protected abstract readonly defaultValue: T;
    private _value: T;
    
    get value(): T {
      return this._value ?? this.defaultValue;
    }
    
    set value(val: T) {
      this._value = val;
    }
    
    toSetting(): Setting {
      return {
        key: this.settingKey,
        value: JSON.stringify(this.value)
      };
    }
    
    fromSetting(setting: Setting): void {
      if (setting.key === this.settingKey) {
        this._value = JSON.parse(setting.value);
      }
    }
  }
  ```

### 5. File Service (`src/services/fileService.ts`)
- [ ] Add path resolution for generated files:
  ```typescript
  class FileService {
    private readonly OUTPUT_ROOT = 'output/infrastructure';
    private readonly BASE_DIR = 'base';
    private readonly MODELS_DIR = 'models';
    private readonly SERVICES_DIR = 'services';

    /**
     * Get the output path for a generated file
     * @param sourceFile C# source file path
     * @param type Type of output (model or service)
     * @returns Absolute path for the generated file
     */
    getOutputPath(sourceFile: string, type: 'model' | 'service'): string {
      const relativePath = this.getRelativePath(sourceFile);
      const outputDir = type === 'model' ? this.MODELS_DIR : this.SERVICES_DIR;
      return path.join(this.OUTPUT_ROOT, outputDir, relativePath);
    }

    /**
     * Get the path for generated type definitions
     * @param sourceFile C# source file path
     * @returns Path to the types file
     */
    getTypesPath(sourceFile: string): string {
      const dir = path.dirname(this.getOutputPath(sourceFile, 'model'));
      const baseName = path.basename(sourceFile, '.cs');
      return path.join(dir, `${baseName}Types.ts`);
    }

    /**
     * Convert absolute paths to TypeScript path aliases
     * @param from Source file path
     * @param to Target file path
     * @returns Import path using aliases
     */
    getImportPath(from: string, to: string): string {
      // Handle base class imports
      if (to.includes(`${this.OUTPUT_ROOT}/${this.BASE_DIR}`)) {
        return to.replace(
          `${this.OUTPUT_ROOT}/${this.BASE_DIR}`,
          '@base'
        );
      }

      // Handle model imports
      if (to.includes(`${this.OUTPUT_ROOT}/${this.MODELS_DIR}`)) {
        return to.replace(
          `${this.OUTPUT_ROOT}/${this.MODELS_DIR}`,
          '@models'
        );
      }

      // Handle service imports
      if (to.includes(`${this.OUTPUT_ROOT}/${this.SERVICES_DIR}`)) {
        return to.replace(
          `${this.OUTPUT_ROOT}/${this.SERVICES_DIR}`,
          '@services'
        );
      }

      // Default to relative path
      return path.relative(path.dirname(from), to);
    }
  }
  ```

### 6. Main Generator (`src/index.ts`)
- [ ] Add settings generation pipeline:
  ```typescript
  async function generateSettings(sourceFile: string): Promise<void> {
    // 1. Parse C# settings class
    const classInfo = await parser.parseFile(sourceFile);
    if (!parser.isSettingsClass(classInfo.declaration)) {
      return;
    }
    
    // 2. Generate TypeScript code
    const writer = new TypeScriptWriter();
    const settingsGroup = writer.generateSettingsGroup(classInfo);
    
    // 3. Write output files
    const outputPath = fileService.getOutputPath(sourceFile, 'model');
    await fileService.writeFile(outputPath, settingsGroup);
  }
  ```

## Implementation Progress

### 1. Parser Improvements
- [x] Enhanced CSharpParser to handle array types correctly
  - Fixed array type detection in property declarations
  - Added support for complex array types (e.g., `FilterConfig[]`)
- [x] Improved XML documentation parsing
  - Added support for extracting documentation content between XML tags
  - Properly handles `<summary>` tags in C# documentation
- [x] Fixed attribute parsing
  - Correctly extracts `SettingKey` attributes
  - Handles multiple attributes on properties

### 2. TypeScript Generation
- [x] Update TypeScriptWriter to generate classes instead of interfaces
- [x] Add support for generating base class inheritance
- [x] Implement settings group generation
- [ ] Add validation rule generation

### 3. Directory Structure
- [ ] Create output directory structure
- [ ] Add base class templates
- [ ] Configure path aliases

### 4. Testing
- [x] Added test cases for array type parsing
- [x] Added test cases for XML documentation
- [x] Added test cases for attribute parsing
- [ ] Add test cases for generated TypeScript code
- [ ] Add test cases for settings validation

### Next Steps
1. Update TypeScriptWriter to generate class-based settings
2. Implement base class inheritance
3. Add validation rule generation
4. Create remaining test cases

## Path Impact Analysis

### 1. Current Path Handling
- Generator takes input/output directories via command line
- FileService uses root output directory for all operations
- TypeScriptWriter has complex namespace-to-directory mapping:
  - Checks for root namespaces (Psi.Models.ClientConfigurationModels)
  - Creates subdirectories based on namespace parts
  - Handles imports differently for base vs subdirectories
- Template files are copied from src/output/templates

### 2. Required Changes

#### TypeScriptWriter Refactoring
1. Path Generation:
   ```typescript
   class TypeScriptWriter {
     private getSettingsPath(parsedClass: ParsedClass): string {
       // Always output to infrastructure/models
       const subdir = this.getSubdirectoryFromNamespace(parsedClass.namespace);
       return path.join('infrastructure', 'models', subdir, `${parsedClass.name}.ts`);
     }

     private getSubdirectoryFromNamespace(namespace: string): string {
       // Simplified - just use last namespace part for subdirectory
       const parts = namespace.split('.');
       return parts[parts.length - 1];
     }
   }
   ```

2. Import Generation:
   ```typescript
   class TypeScriptWriter {
     private generateImport(className: string, directory: string, targetDir: string): string {
       if (!targetDir) {
         // In base directory, include subdirectory
         return `import { ${className} } from './${directory}/${className}';`;
       } else {
         // In subdirectory, use relative path within directory
         return `import { ${className} } from './${className}';`;
       }
     }
   }
   ```

#### Template System
- Move JsonSetting base class to infrastructure/base
- Update template paths in FileService
- Remove interface templates
- Add class-only templates with proper imports

## Example Source and Output

### Input: C# Settings Class
```csharp
public class PscuLogFileTransformServiceSettings : SettingsBaseHelper
{
    /// <summary>
    /// The Json configuration for the PscuLogFileTransform Service.
    /// <remarks>
    /// [{
    ///     "Name": "Transaction Post Date",
    ///     "ValuesCausingInclusion": "",
    ///     "ValuesCausingExclusion": "",
    ///     "RequiresValue": true,
    ///     "ErrorMessage": "Transaction Post Date is required"
    /// }]
    /// </remarks>
    /// </summary>
    [SettingKey("PsiServices.PscuLogFileTransformService.Filters")]
    public string Filters
    {
        get { return GetValue(); }
        set { SetValue(value); }
    }
}
```

### Output: Generated TypeScript
```typescript
// Generated interface from JSON example
export interface FilterConfig {
    Name: string;
    ValuesCausingInclusion: string;
    ValuesCausingExclusion: string;
    RequiresValue: boolean;
    ErrorMessage: string;
}

// Generated helper class
class FiltersSetting extends JsonSetting<FilterConfig[]> {
    protected readonly settingKey = 'PsiServices.PscuLogFileTransformService.Filters';
    protected readonly defaultValue = [];
}

// Generated settings group
export class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    /**
     * The Json configuration for the PscuLogFileTransform Service.
     * @example
     * ```json
     * [{
     *   "Name": "Transaction Post Date",
     *   "ValuesCausingInclusion": "",
     *   "ValuesCausingExclusion": "",
     *   "RequiresValue": true,
     *   "ErrorMessage": "Transaction Post Date is required"
     * }]
     * ```
     * @type {FilterConfig[]}
     */
    private readonly _filters = new FiltersSetting();
    
    get filters(): FilterConfig[] {
        return this._filters.value;
    }
    
    set filters(value: FilterConfig[]) {
        this._filters.value = value;
    }
    
    toSettings(): Setting[] {
        return [this._filters.toSetting()];
    }
    
    fromSettings(settings: Setting[]): void {
        for (const setting of settings) {
            if (setting.key === this._filters.settingKey) {
                this._filters.fromSetting(setting);
            }
        }
    }
}
```

## Testing Plan
1. Unit Tests
   - [ ] Parser tests for settings detection
   - [ ] JSON schema conversion tests
   - [ ] JSDoc generation tests
   - [ ] Template generation tests

2. Integration Tests
   - [ ] End-to-end test with sample settings class
   - [ ] Test with all field types (string, number, boolean, JSON)
   - [ ] Test with nullable and non-nullable fields
   - [ ] Test with and without XML documentation

3. Manual Testing
   - [ ] Test with actual PSCU settings class
   - [ ] Verify TypeScript compilation
   - [ ] Verify runtime behavior
   - [ ] Check generated documentation

## Future Enhancements
1. Generate validation based on C# attributes if present
2. Support additional C# XML documentation tags
3. Add runtime type checking if needed

## Detailed Analysis

### Phase 1: C# Parser Enhancement
1. Update ParsedClass to include implementation:
   ```typescript
   interface ParsedClass {
       name: string;
       namespace: string;
       fields: ParsedField[];
       // New fields
       baseClass?: string;
       propertyImplementations: ParsedProperty[];
   }
   ```

2. Add property implementation parsing:
   ```typescript
   interface ParsedProperty {
       name: string;
       type: string;
       defaultValue?: string;
       backingField?: string;
       getterImplementation?: string;
       setterImplementation?: string;
   }
   ```

### Phase 2: TypeScript Generation
1. Keep existing import path resolution:
   ```typescript
   // Root directory (Settings.ts)
   import { AccountSettings } from './Account/AccountSettings';
   
   // Subdirectory (Account/AccountSettings.ts)
   import { CertificateCategories } from './CertificateCategories';
   ```

2. Update class generation:
   ```typescript
   // Before: interface only
   export interface AccountSettings {
       property: string;
   }
   
   // After: full implementation
   export class AccountSettings implements ISettingsGroup {
       private readonly _property = new JsonSetting<string>();
       
       get property(): string {
           return this._property.value;
       }
       
       set property(value: string) {
           this._property.value = value;
       }
   }
   ```

### Phase 3: Template System
1. Analyze existing templates:
   - List all template files
   - Document their usage
   - Identify which need updating

2. Create new templates:
   - Base class template
   - Property implementation templates
   - Getter/setter templates

## Implementation Order
1. Update C# parser to extract implementation details
2. Create new TypeScript templates
3. Update TypeScript generation
4. Add tests for new functionality
5. Verify existing import paths still work

## Testing Strategy
1. Parse sample C# settings files
2. Compare generated TypeScript
3. Verify imports work in all cases:
   - Root directory imports
   - Subdirectory imports
   - Cross-directory imports
4. Test property implementations
