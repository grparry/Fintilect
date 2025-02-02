# Import Path Fix for Base Path Settings

## Overview
The settings generator needs to handle import paths correctly when generating code in the base path (`infrastructure/models/ClientConfigurationModels/Settings.ts`). Currently, imports are not properly resolving subdirectory paths.

## Current Behavior
In `Settings.ts`:
```typescript
import { PaydayLoan } from './PaydayLoan';  // Incorrect
```

## Required Behavior
In `Settings.ts`:
```typescript
import { PaydayLoan } from './PaydayLoans/PaydayLoan';  // Correct
```

## Implementation Plan

### 1. Directory Structure Analysis
- Add a function to analyze the directory structure under `ClientConfigurationModels`
- Build a map of class names to their actual file paths
- Handle potential naming conflicts

Example:
```typescript
interface FilePathMap {
    [className: string]: {
        relativePath: string;  // e.g., './PaydayLoans/PaydayLoan'
        absolutePath: string;  // Full path for validation
    }
}
```

### 2. Import Path Resolution
Add to `SettingsGenerator`:
```typescript
private resolveImportPath(className: string, currentFile: string): string {
    // If we're in Settings.ts (base path)
    if (isBasePath(currentFile)) {
        // Look up full path from map
        const fullPath = this.filePathMap[className];
        if (fullPath) {
            return fullPath.relativePath;
        }
    }
    // Default to current behavior
    return `./${className}`;
}
```

### 3. Base Path Detection
```typescript
private isBasePath(filePath: string): boolean {
    return filePath.endsWith('ClientConfigurationModels/Settings.ts');
}
```

### 4. Integration Points
Update these methods in `SettingsGenerator`:
1. `generateSettingsGroup`: Add file path context
2. `generateImports`: Use new path resolution
3. `generateSettingsMetadata`: Update import handling

### Test Plan

1. **Unit Tests**
```typescript
describe('Import Path Resolution', () => {
    it('should use subdirectory path in Settings.ts', () => {
        const generator = new SettingsGenerator();
        const path = generator.resolveImportPath(
            'PaydayLoan',
            '/infrastructure/models/ClientConfigurationModels/Settings.ts'
        );
        expect(path).toBe('./PaydayLoans/PaydayLoan');
    });

    it('should use direct path in other files', () => {
        const generator = new SettingsGenerator();
        const path = generator.resolveImportPath(
            'PaydayLoan',
            '/infrastructure/models/ClientConfigurationModels/Other/Settings.ts'
        );
        expect(path).toBe('./PaydayLoan');
    });
});
```

2. **Integration Tests**
- Test full generation of `Settings.ts`
- Verify all imports resolve correctly
- Check file compilation
- Validate runtime behavior

### Implementation Steps

1. **Phase 1: Directory Analysis**
   - Create `DirectoryAnalyzer` class
   - Build file path map
   - Add caching for performance

2. **Phase 2: Generator Updates**
   - Add path resolution logic
   - Update import generation
   - Add base path detection

3. **Phase 3: Testing**
   - Add unit tests
   - Add integration tests
   - Verify existing tests pass

4. **Phase 4: Validation**
   - Test with actual codebase
   - Verify all imports work
   - Check TypeScript compilation

## Success Criteria
1. All imports in `Settings.ts` correctly reference subdirectory paths
2. No changes to imports in other files
3. All tests pass
4. TypeScript compilation succeeds
5. No runtime errors when loading settings
