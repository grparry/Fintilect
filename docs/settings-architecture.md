# Settings Architecture

## Overview
The settings system provides a type-safe, maintainable way to manage application settings. The system has three main concepts:

1. **Settings Groups**
   - Derived from C# class organization in legacy code
   - Contains one or more related settings
   - Example: `PscuLogFileTransformServiceSettings` contains all settings for the PSCU transform service

2. **Individual Settings**
   - Each setting is one record in the configuration database
   - Has a key, string value, and metadata
   - Can be one of several types:
     * Simple types (string, number, boolean)
     * JSON-serialized complex types

3. **Setting Value Types**
   - Simple settings use their values directly from the database
   - Complex settings (JSON) use helper classes for type-safe access
   - Example: A path setting might be a simple string, while filters are a JSON array

## Core Components

### 1. Base Types and Interfaces

#### Setting and SettingGroup
The raw API format for settings:
```typescript
interface Setting {
    key: string;
    value: string;  // Always a string in the database
    description?: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';  // Indicates how to interpret value
    validation?: Record<string, any>;
}

interface SettingGroup {
    settings: Setting[];
    metadata: {
        __metadata?: Record<string, string>;
        __validations?: Record<string, any>;
        __display?: Record<string, any>;
    };
}
```

#### Helper Classes
Only needed for settings that store complex data as JSON:
```typescript
// Base class for JSON settings
abstract class JsonSetting<T> {
    protected abstract readonly settingKey: string;
    protected abstract readonly defaultValue: T;
    
    toSetting(): Setting {
        return {
            key: this.settingKey,
            value: JSON.stringify(this.value),
            dataType: 'json'
        };
    }
}

// Example usage for complex setting
class PscuFiltersSetting extends JsonSetting<FilterConfig[]> {
    protected readonly settingKey = 'PscuLogFileTransformService.Filters';
    protected readonly defaultValue = [];
}
```

#### Settings Group Example
Shows both simple and complex settings:
```typescript
class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    // Complex setting using JSON helper
    private readonly _filters = new PscuFiltersSetting();
    
    // Simple string setting
    private _inputPath = '';
    
    get inputPath(): string {
        return this._inputPath;
    }
    
    set inputPath(value: string) {
        this._inputPath = value;
    }
    
    // Convert all settings to API format
    toSettings(): Setting[] {
        return [
            // Complex setting uses helper
            this._filters.toSetting(),
            // Simple setting converts directly
            {
                key: 'PscuLogFileTransformService.InputPath',
                value: this._inputPath,
                dataType: 'string'
            }
        ];
    }
}
```

### 2. Settings Service Layer

#### ISettingsService
The low-level API interface:
```typescript
interface ISettingsService {
    getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>>;
    getSetting(key: string): Promise<ApiSuccessResponse<Setting>>;
    updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>>;
    updateSettings(settings: Array<{ key: string; value: any }>): Promise<ApiSuccessResponse<Setting[]>>;
    validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean }>>;
}
```

#### SettingsManager
High-level manager that provides type-safe operations:
```typescript
class SettingsManager {
    loadGroup<T extends ISettingsGroup>(groupType: { new(): T; metadata: ISettingsMetadata }): Promise<T>;
    saveGroup(settings: ISettingsGroup): Promise<void>;
    validateGroup(settings: ISettingsGroup): Promise<boolean>;
}
```

### 3. Generated Settings Models
Each settings group gets a generated class that:
1. Implements ISettingsGroup for API conversion
2. Provides type-safe property accessors
3. Contains static metadata about the group

Example:
```typescript
class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    // Static metadata
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PscuLogFileTransformService',
        settings: {
            filters: {
                key: 'PscuLogFileTransformService.Filters',
                type: 'json',
                required: true
            },
            // ... other settings
        }
    };

    // Type-safe accessors
    get filters(): FilterConfig[] { return this._filters.value; }
    set filters(value: FilterConfig[]) { this._filters.value = value; }

    // API conversion
    toSettings(): Setting[] { ... }
    fromSettings(settings: Setting[]): void { ... }
}
```

## Usage Patterns

### 1. Loading Settings
Components load settings through the service factory:
```typescript
class MyComponent {
    private settingsManager = ServiceFactory.getSettingsManager();

    async loadSettings() {
        // Type-safe loading
        const settings = await this.settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
        
        // TypeScript knows the type
        const filters: FilterConfig[] = settings.filters;
    }
}
```

### 2. Updating Settings
```typescript
async updateFilters(newFilters: FilterConfig[]) {
    const settings = await this.settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
    
    // Type-safe update
    settings.filters = newFilters;
    
    // Save all settings in the group
    await this.settingsManager.saveGroup(settings);
}
```

### 3. Validation
```typescript
async validateSettings(settings: PscuLogFileTransformServiceSettings) {
    const isValid = await this.settingsManager.validateGroup(settings);
    if (!isValid) {
        // Handle invalid settings
    }
}
```

## Error Handling

### 1. Loading Errors
```typescript
class MyComponent {
    async loadSettings() {
        try {
            const settings = await this.settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
            // Use settings
        } catch (error) {
            if (error instanceof SettingsNotFoundError) {
                // Handle missing settings group
                await this.initializeDefaultSettings();
            } else {
                // Handle other errors (network, etc)
                this.notifyError('Failed to load settings');
            }
        }
    }
}
```

### 2. Validation Errors
```typescript
async saveSettings(settings: PscuLogFileTransformServiceSettings) {
    const isValid = await this.settingsManager.validateGroup(settings);
    if (!isValid) {
        // Get specific validation errors from the service
        const validationResults = await Promise.all(
            settings.toSettings().map(setting => 
                this.settingsService.validateSetting(setting.key, setting.value)
            )
        );
        
        // Handle specific validation failures
        const errors = validationResults
            .filter(result => !result.data.isValid)
            .map(result => result.data.errors)
            .flat();
            
        throw new SettingsValidationError(errors);
    }
    
    await this.settingsManager.saveGroup(settings);
}
```

## Real-World Examples

### 1. PSCU Log File Transform Settings
The PSCU Log File Transform service uses settings to configure how transaction log files are processed:

```typescript
// Component using the settings
@Component({
    selector: 'pscu-log-transform',
    template: `
        <form [formGroup]="form">
            <mat-form-field>
                <mat-label>Input Path</mat-label>
                <input matInput formControlName="inputPath">
            </mat-form-field>
            
            <filter-config-list
                formControlName="filters"
                [availableFields]="inputFields">
            </filter-config-list>
            
            <button (click)="save()">Save</button>
        </form>
    `
})
export class PscuLogTransformComponent implements OnInit {
    private settingsManager = ServiceFactory.getSettingsManager();
    form: FormGroup;
    
    async ngOnInit() {
        // Load settings
        const settings = await this.settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
        
        // Initialize form with current settings
        this.form = this.formBuilder.group({
            inputPath: [settings.paths.input],
            filters: [settings.filters]
        });
        
        // Save when form changes
        this.form.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(async value => {
            settings.paths.input = value.inputPath;
            settings.filters = value.filters;
            
            if (await this.settingsManager.validateGroup(settings)) {
                await this.settingsManager.saveGroup(settings);
                this.notifySuccess('Settings saved');
            }
        });
    }
}
```

### 2. Default Settings Initialization
When a settings group doesn't exist, we can initialize it with defaults:

```typescript
class SettingsInitializer {
    async initializePscuSettings() {
        const settings = new PscuLogFileTransformServiceSettings();
        
        // Set sensible defaults
        settings.paths = {
            input: '/var/log/pscu',
            output: '/var/log/pscu/processed',
            error: '/var/log/pscu/error'
        };
        
        settings.filters = [
            {
                Name: "Transaction Post Date",
                ValuesCausingInclusion: "",
                ValuesCausingExclusion: "",
                RequiresValue: true,
                ErrorMessage: "Transaction Post Date is required"
            }
        ];
        
        settings.inputFields = [
            "Transaction Post Date",
            "Account Number",
            "Transaction Amount"
        ];
        
        settings.outputFields = [
            "PostDate",
            "AccountId",
            "Amount"
        ];
        
        // Validate and save
        if (await this.settingsManager.validateGroup(settings)) {
            await this.settingsManager.saveGroup(settings);
        }
    }
}
```

### 3. Settings Migration
When settings format changes, we can migrate old settings:

```typescript
class SettingsMigrator {
    async migratePscuSettings() {
        const settings = await this.settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
        
        // Example: Split combined path into input/output
        if ('path' in settings.paths) {
            const oldPath = settings.paths['path'];
            delete settings.paths['path'];
            
            settings.paths.input = `${oldPath}/input`;
            settings.paths.output = `${oldPath}/output`;
            settings.paths.error = `${oldPath}/error`;
            
            await this.settingsManager.saveGroup(settings);
        }
    }
}
```

## Benefits

### 1. Type Safety
- TypeScript knows the types of all settings
- Compile-time checking prevents errors
- IDE autocompletion for settings properties

### 2. Encapsulation
- Raw settings API details hidden from components
- Settings manager handles all API interaction
- Components work with clean, type-safe models

### 3. Maintainability
- Settings grouped logically by feature/component
- Metadata provides documentation and validation
- Changes to API format only affect the manager layer

### 4. Extensibility
- New settings groups easily added
- Validation rules in metadata
- Display hints for UI components

## Best Practices

1. **Group Settings Logically**
   - Keep related settings together in the same group
   - Name groups after their feature/component

2. **Use Type-Safe Models**
   - Let TypeScript check setting types
   - Define proper interfaces for complex settings

3. **Validate Early**
   - Validate settings before saving
   - Use metadata for validation rules

4. **Handle Loading States**
   - Settings load asynchronously
   - Show loading indicators when appropriate
   - Handle load failures gracefully

## Testing

### 1. Unit Testing Settings Models
```typescript
describe('PscuLogFileTransformServiceSettings', () => {
    let settings: PscuLogFileTransformServiceSettings;
    
    beforeEach(() => {
        settings = new PscuLogFileTransformServiceSettings();
    });
    
    it('should convert to API format', () => {
        settings.filters = [{
            Name: "Test Filter",
            RequiresValue: true
        }];
        
        const apiSettings = settings.toSettings();
        expect(apiSettings).toContainEqual({
            key: 'PscuLogFileTransformService.Filters',
            value: JSON.stringify([{
                Name: "Test Filter",
                RequiresValue: true
            }]),
            dataType: 'json'
        });
    });
    
    it('should load from API format', () => {
        settings.fromSettings([{
            key: 'PscuLogFileTransformService.Filters',
            value: JSON.stringify([{
                Name: "Test Filter",
                RequiresValue: true
            }]),
            dataType: 'json'
        }]);
        
        expect(settings.filters).toEqual([{
            Name: "Test Filter",
            RequiresValue: true
        }]);
    });
});
```

### 2. Integration Testing
```typescript
describe('Settings Integration', () => {
    let settingsManager: SettingsManager;
    let settingsService: ISettingsService;
    
    beforeEach(() => {
        settingsService = new MockSettingsService();
        settingsManager = new SettingsManager(settingsService);
    });
    
    it('should round-trip settings through the API', async () => {
        // Create settings
        const settings = new PscuLogFileTransformServiceSettings();
        settings.filters = [{
            Name: "Test Filter",
            RequiresValue: true
        }];
        
        // Save
        await settingsManager.saveGroup(settings);
        
        // Load into new instance
        const loaded = await settingsManager.loadGroup(PscuLogFileTransformServiceSettings);
        
        // Verify
        expect(loaded.filters).toEqual(settings.filters);
    });
});

## Generated File Structure
A single settings file contains both the group and its helper classes:

```typescript
import { JsonSetting, ISettingsGroup } from '@models/settings';
import { FilterConfig, PathConfig } from '@models/types';

// Helper classes are private to this file
class FiltersSetting extends JsonSetting<FilterConfig[]> {
    protected readonly settingKey = 'PscuLogFileTransformService.Filters';
    protected readonly defaultValue = [];
}

class PathsSetting extends JsonSetting<PathConfig> {
    protected readonly settingKey = 'PscuLogFileTransformService.Paths';
    protected readonly defaultValue = {
        input: '',
        output: '',
        error: ''
    };
}

// Only the settings group is exported
export class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    private readonly _filters = new FiltersSetting();
    private readonly _paths = new PathsSetting();
    private _enabled = false;  // Simple boolean setting
    
    get filters(): FilterConfig[] {
        return this._filters.value;
    }
    
    get paths(): PathConfig {
        return this._paths.value;
    }
    
    get enabled(): boolean {
        return this._enabled;
    }
    
    toSettings(): Setting[] {
        return [
            this._filters.toSetting(),
            this._paths.toSetting(),
            {
                key: 'PscuLogFileTransformService.Enabled',
                value: String(this._enabled),
                dataType: 'boolean'
            }
        ];
    }
}
```

This structure:
- Keeps all related code in one file
- Hides implementation details (helper classes) from other modules
- Only exposes the main settings group class
- Makes it clear which settings use JSON helpers vs simple values
