# Monorepo Migration Plan

## Overview
This document outlines the plan to restructure the Fintilect codebase into a proper monorepo with TypeScript workspace support.

## Current Structure
```
/Fintilect
  /cbp-admin
  /cbp-config-api
  /infrastructure
  /docs
  /logs
  /workspace
```

## Target Structure
```
/Fintilect
  package.json           # Workspace root
  tsconfig.json         # Base TS config
  
  /infrastructure       # @fintilect/infrastructure
  /docs                # @fintilect/docs
  /logs                # @fintilect/logs
  
  /workbench           # Development tools
    /legacy-analyzer   # @fintilect/workbench-legacy
    /config-gen        # @fintilect/workbench-config-gen
    /model-analyzer    # @fintilect/workbench-model
    /shared           # @fintilect/workbench-shared
  
  /admin
    /cbp             # @fintilect/admin-cbp
    /shared          # @fintilect/admin-shared
  
  /api
    /cbp
      /config       # @fintilect/api-cbp-config
    /shared         # @fintilect/api-shared
```

## Migration Steps

### 1. Setup Root Package
```bash
# Create root package.json
{
  "name": "fintilect",
  "private": true,
  "workspaces": [
    "infrastructure",
    "docs",
    "logs",
    "workbench/*",
    "admin/*",
    "api/*"
  ]
}

# Create root tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "declaration": true,
    "composite": true,
    "incremental": true
  }
}
```

### 2. Migrate Shared Packages

#### 2.1 Infrastructure
1. Create package.json:
```json
{
  "name": "@fintilect/infrastructure",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

2. Move models and services:
```
/infrastructure
  /src
    /models      # Move from workspace/legacy-analyzer/output/infrastructure/models
    /services    # Move from workspace/legacy-analyzer/output/infrastructure/services
    /base        # Move from workspace/legacy-analyzer/output/infrastructure/base
```

#### 2.2 Docs & Logs
Similar package setup for @fintilect/docs and @fintilect/logs

### 3. Migrate Development Tools

#### 3.1 Create Workbench Structure
```bash
mkdir -p workbench/{legacy-analyzer,config-gen,model-analyzer,shared}
```

#### 3.2 Move Workspace Content
1. Move workspace/legacy-analyzer → workbench/legacy-analyzer
2. Move workspace/emerge-config-gen → workbench/config-gen
3. Move workspace/model-analyzer → workbench/model-analyzer

### 4. Migrate Applications

#### 4.1 Admin
1. Move cbp-admin content:
```bash
mkdir -p admin/cbp
mv cbp-admin/* admin/cbp/
```

2. Update package.json:
```json
{
  "name": "@fintilect/admin-cbp",
  "dependencies": {
    "@fintilect/infrastructure": "workspace:*",
    "@fintilect/admin-shared": "workspace:*"
  }
}
```

#### 4.2 API
1. Move cbp-config-api content:
```bash
mkdir -p api/cbp/config
mv cbp-config-api/* api/cbp/config/
```

2. Update package.json:
```json
{
  "name": "@fintilect/api-cbp-config",
  "dependencies": {
    "@fintilect/infrastructure": "workspace:*",
    "@fintilect/api-shared": "workspace:*"
  }
}
```

### 5. Update TypeScript Configurations

#### 5.1 Create Base Configs
Create shared TypeScript configurations in infrastructure:
```
/infrastructure
  /typescript
    tsconfig.base.json    # Base for all projects
    tsconfig.react.json   # For React projects
    tsconfig.node.json    # For Node.js projects
```

#### 5.2 Update Project Configs
Update each project's tsconfig.json to extend from base configs and use project references.

### 6. Import Path Migration

#### 6.1 Current Import Types
1. **Relative Imports** (Safe):
   ```typescript
   import { Something } from '../components/Something';
   import { Other } from './utils/other';
   ```
   These will continue to work as long as the relative structure is maintained within each package.

2. **Path Alias Imports** (Need Update):
   ```typescript
   // legacy-analyzer
   import { Model } from '@models/something';  // → @fintilect/infrastructure/models
   import { Service } from '@services/other';  // → @fintilect/infrastructure/services
   
   // cbp-admin
   import { Component } from '@components/Button';  // Keep but update tsconfig
   import { Model } from '@models/something';      // → @fintilect/infrastructure/models
   ```

3. **Absolute Imports** (Need Update):
   ```typescript
   // These will break and need updating
   import { Something } from '/workspace/legacy-analyzer/output/infrastructure/models';
   import { Other } from '/infrastructure/services';
   ```

#### 6.2 Migration Strategy
1. **Update Root tsconfig.json**:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@fintilect/*": ["./packages/*"],
         "@infrastructure/*": ["./infrastructure/src/*"],
         "@shared/*": ["./shared/*"]
       }
     }
   }
   ```

2. **Update Project-specific Paths**:
   ```json
   // admin/cbp/tsconfig.json
   {
     "extends": "../../tsconfig.json",
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"],
         "@components/*": ["./src/components/*"],
         "@utils/*": ["./src/utils/*"],
         // Inherited from root:
         // "@fintilect/*": ["../../packages/*"]
       }
     }
   }
   ```

3. **Search and Replace Strategy**:
   ```bash
   # Find all absolute imports
   grep -r "from '/workspace\|from '/infrastructure" .
   
   # Find all path alias imports
   grep -r "from '@models\|from '@services" .
   ```

4. **Update Pattern**:
   - Local project imports: Keep relative or use project-specific aliases
   - Shared infrastructure: Use @fintilect package imports
   - Internal packages: Use workspace package imports

#### 6.3 Validation
1. Use TypeScript compiler to find broken imports
2. Add build step to CI to ensure all imports resolve
3. Test module resolution in different IDEs (VSCode, WebStorm)

### 7. Testing Strategy
1. Start with infrastructure package
2. Move to workbench tools
3. Finally migrate applications
4. Test at each step:
   - Build verification
   - Type checking
   - Unit tests
   - Integration tests

### 8. CI/CD Updates
1. Update build scripts
2. Update deployment configurations
3. Update Docker configurations

### 9. Git Migration Strategy

#### 9.1 Preserving History
1. **Use git-mv for Directory Moves**:
   ```bash
   # Moving while preserving history
   git mv cbp-admin admin/cbp
   git mv cbp-config-api api/cbp/config
   git mv workspace workbench
   ```

2. **Handle Complex Moves**:
   ```bash
   # For files that need splitting or merging
   git filter-repo --path-rename "workspace/legacy-analyzer/output/infrastructure:infrastructure"
   ```

#### 9.2 Branch Strategy
1. **Create Migration Branch**:
   ```bash
   git checkout -b feat/monorepo-migration
   ```

2. **Atomic Commits**:
   ```bash
   # 1. Move directories
   git commit -m "chore: reorganize directory structure for monorepo"
   
   # 2. Update package.json files
   git commit -m "chore: add workspace package configurations"
   
   # 3. Update import paths
   git commit -m "refactor: update import paths for monorepo structure"
   ```

#### 9.3 Git Attributes
Add `.gitattributes` to maintain consistent line endings and handling:
```
# Auto detect text files and perform LF normalization
* text=auto eol=lf

# TypeScript
*.ts text
*.tsx text

# JSON
*.json text

# Markdown
*.md text

# Yarn
.yarn/** binary
.pnp.* binary
```

#### 9.4 Git Hooks
Add pre-commit hooks for consistent structure:
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Ensure package.json files are valid
for pkg in $(find . -name "package.json" -not -path "*/node_modules/*"); do
  if ! node -e "require('$pkg')"; then
    echo "Invalid package.json found: $pkg"
    exit 1
  fi
done

# Verify TypeScript configs
for tsconfig in $(find . -name "tsconfig.json" -not -path "*/node_modules/*"); do
  if ! tsc --noEmit --project "$tsconfig"; then
    echo "TypeScript error in: $tsconfig"
    exit 1
  fi
done
```

#### 9.5 Submodules (If Needed)
If certain packages need to maintain their own repositories:
```bash
# Add as submodule
git submodule add git@github.com:fintilect/admin-cbp.git admin/cbp

# Configure sparse checkout
git config submodule.admin/cbp.sparsecheckout true
```

#### 9.6 Migration Verification
1. **Check History Preservation**:
   ```bash
   # Verify history for moved files
   git log --follow admin/cbp/src/index.ts
   ```

2. **Verify File Attributes**:
   ```bash
   # Check file attributes
   git check-attr -a admin/cbp/package.json
   ```

3. **Test Hooks**:
   ```bash
   # Test pre-commit hook
   git add .
   git commit --dry-run
   ```

#### 9.7 Handling In-Progress Work
1. **Save Current Work**:
   ```bash
   # Create detailed stash of current work
   git stash push -m "pre-migration-component-work"
   
   # Optional: Create a patch for safety
   git diff > pre-migration-changes.patch
   ```

2. **Branch Strategy**:
   ```bash
   # Start migration from clean main
   git checkout main
   git checkout -b feat/monorepo-migration
   
   # Do migration work...
   
   # After migration, create new feature branch
   git checkout -b feat/components-new
   
   # Apply stashed changes
   git stash pop
   ```

3. **Conflict Resolution**:
   - Most conflicts will be path-related due to structure changes
   - Use the following pattern to resolve:
     ```bash
     # If conflicts occur during stash pop
     git checkout --theirs path/to/file  # Keep stashed changes
     git checkout --ours path/to/file    # Keep current changes
     ```
   - Update imports in conflicted files to match new structure
   - Test each component after conflict resolution

4. **Validation Steps**:
   ```bash
   # After applying stashed changes
   npm run typecheck  # Verify TypeScript
   npm run test      # Run tests
   npm run build     # Verify build
   ```

## Emergency Escape Plan

### Quick Revert
If things go wrong, you can always return to a known good state:

```bash
# 1. Stash any uncommitted changes you want to keep
git stash push -m "save-my-changes"

# 2. Return to main branch
git checkout main

# 3. Clean up any untracked files (BE CAREFUL with this!)
git clean -fd  # Remove untracked files and directories
# or more safely:
git clean -fd --dry-run  # See what would be removed first

# 4. If you had stashed changes from your feature branch:
git checkout -b feature/components-fresh
git stash pop  # Recover your changes in a fresh branch
```

### Partial Revert
If only some changes need reverting:

```bash
# 1. Keep the branch but reset some files
git checkout main -- path/to/file

# 2. Or reset the entire branch to main but keep changes as uncommitted
git reset --soft main

# 3. Or reset completely but keep changes as uncommitted
git reset main
```

### Recovery Steps
1. All your original code is safe in the `main` branch
2. Your component work can be recovered from stash
3. The migration work will be isolated in `feat/monorepo-migration`
4. You can always create a fresh feature branch from `main`

The beauty of Git is that it's very hard to truly lose work:
- Committed changes are always recoverable
- Stashed changes are safe
- Even "lost" changes can often be found in `git reflog`

## Rollback Plan
1. Keep old structure until fully tested
2. Maintain ability to switch back to old imports
3. Document reversion steps

## Timeline
1. Infrastructure Setup: 1 day
2. Shared Packages Migration: 2 days
3. Workbench Migration: 2 days
4. Application Migration: 2-3 days
5. Testing and Validation: 2-3 days

Total Estimated Time: 9-11 days

## Success Criteria
1. All packages build successfully
2. All tests pass
3. TypeScript type checking passes
4. Development workflow verified
5. CI/CD pipeline successful
