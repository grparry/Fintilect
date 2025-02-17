# CBPAdmin Migration Analysis

## Project Overview
```yaml
type: React Application
framework: Create React App
language: TypeScript
testing: Existing Jest + React Testing Library
styling: Material UI + Emotion
state_management: React Context
routing: React Router
form_handling: React Hook Form

migration_principle: |
  This is a project relocation, not a refactor.
  Preserve all existing code, tests, and infrastructure.
```

## File Structure
```yaml
root_files:
  config:
    - package.json        # Dependencies and scripts
    - tsconfig.json      # TypeScript configuration
    - jest.config.js     # Test configuration
    - .gitignore         # Git ignore rules
    - swagger.json       # API documentation

  build:
    - public/            # Static assets
    - build/            # Build output
    - node_modules/     # Dependencies

source_tree:
  src/:
    core:
      - App.tsx          # Main application
      - index.tsx        # Entry point
      - theme.ts         # MUI theming
    
    features:
      - components/      # React components
      - features/        # Feature modules
      - routes/          # Route definitions
    
    infrastructure:
      - adapters/        # External integrations
      - services/        # API services
      - config/          # Configuration
      - constants/       # Constants
    
    state:
      - context/         # React context
      - hooks/          # Custom hooks
    
    utils:
      - utils/          # Utilities
      - types/          # TypeScript types

test_files:
  locations:
    - src/__tests__/    # Test files
    - src/test-utils/   # Test utilities
    - src/mocks/        # Test mocks
```

## Path Dependencies
```yaml
import_patterns:
  absolute:
    - "src/components/*"
    - "src/features/*"
    - "src/services/*"
    - "src/utils/*"
  
  relative:
    - "../components/*"
    - "../../utils/*"
    - "./styles/*"

config_paths:
  tsconfig:
    - baseUrl: "src/"
    - paths: {"@/*": ["*"]}
  
  jest:
    - moduleNameMapper
    - setupFilesAfterEnv
    - testMatch
```

## Migration Requirements

### File Movement
```yaml
approach: "Preserve Structure"
steps:
  1. Copy files:
     - Maintain directory structure
     - Keep file relationships
     - Preserve permissions
  
  2. Update paths:
     - Fix import statements
     - Update config paths
     - Maintain relationships
  
  3. Verify structure:
     - Check file locations
     - Validate imports
     - Test build process
```

### Configuration Updates
```yaml
files_to_update:
  build:
    - package.json:
        - name
        - version
        - scripts
    
    - tsconfig.json:
        - paths
        - includes
    
    - jest.config.js:
        - moduleNameMapper
        - testMatch
  
  environment:
    - .env files
    - API endpoints
    - Asset paths
```

### Dependency Management
```yaml
requirements:
  - Preserve versions
  - Maintain lockfile
  - Keep peer dependencies
  - Retain dev dependencies

verification:
  - npm install works
  - Build succeeds
  - Tests run
  - Dev server starts
```

## Critical Paths

### Build Process
```yaml
dependencies:
  - Node.js environment
  - npm dependencies
  - TypeScript compiler
  - Build scripts

verification:
  - npm run build
  - npm start
  - npm test
```

### Import Resolution
```yaml
critical_patterns:
  - Absolute imports from src/
  - Relative component imports
  - Test file imports
  - Asset imports

verification:
  - TypeScript compilation
  - Jest test runs
  - Development server
```

## Migration Checklist

### Pre-Migration
```yaml
environment:
  - [ ] Document current paths
  - [ ] Map dependencies
  - [ ] Note configurations
  - [ ] List critical files

validation:
  - [ ] Build works
  - [ ] Tests pass
  - [ ] Dev server runs
```

### During Migration
```yaml
file_movement:
  - [ ] Copy all files
  - [ ] Preserve structure
  - [ ] Update paths
  - [ ] Fix configurations

verification:
  - [ ] No missing files
  - [ ] Paths resolved
  - [ ] Configs updated
```

### Post-Migration
```yaml
validation:
  - [ ] Build verification
  - [ ] Test execution
  - [ ] Server startup
  - [ ] Feature check

documentation:
  - [ ] Update paths
  - [ ] Note changes
  - [ ] Record issues
```
