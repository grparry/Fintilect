# Settings Service Layer Refactoring Plan

## Overview
This document outlines the changes needed in the legacy-analyzer generator to convert C# settings classes into TypeScript. The generator will analyze C# classes with the `SettingsBaseHelper` base class and generate corresponding TypeScript code.

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
- [ ] Detect settings classes (inherits from `SettingsBaseHelper`)
- [ ] Extract from properties:
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
- [ ] Update service layer to use generated types
- [ ] Generate appropriate mock data based on JSON examples
- [ ] Add type assertions for validation

### 6. Path Management
- [ ] Update path resolution for generated files
- [ ] Configure TypeScript path aliases
- [ ] Handle cross-project references

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

## Future Enhancements
1. Generate validation based on C# attributes if present
2. Support additional C# XML documentation tags
3. Add runtime type checking if needed
