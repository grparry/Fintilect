# Emerge Config System: Minimal Baseline Implementation Plan

## Overview
This plan outlines the implementation of a minimal but complete version of the emerge-config system using selected types from the legacy analyzer output. This implementation will serve as the template for generator development and validate the system architecture.

## Selected Types for Implementation
We have chosen three representative types from the legacy analyzer output that will help validate different aspects of the system:

1. **PscuLogFileTransformServiceSettings**
   - Location: `models/Psi/Data/Models/ClientConfigurationModels/WindowsService/`
   - Validates: JSON structure handling, complex configuration, file path validation
   - Key fields: filters, inputFileFields, outputFileFields, pathConfiguration

2. **PasswordVerificationSettings**
   - Location: `models/Psi/Data/Models/ClientConfigurationModels/PasswordVerification/`
   - Validates: Security settings, simple boolean configuration, sensitive data handling
   - Key fields: passwordResetCannotContainSSNumber

3. **PasswordSettings**
   - Location: `models/Psi/Data/Models/ClientConfigurationModels/HomeBankingLogin/`
   - Validates: UI configuration, version control, multiple boolean flags
   - Key fields: minVersion, canViewPasswordAsPlainTextAtLoginEnabled, etc.

## Infrastructure Integration
The implementation will leverage these existing cbp-admin infrastructure components:

### Navigation
- Uses `/admin/emerge-config` section in existing navigationConfig
- Inherits view-emerge-config permission model
- Leverages existing route structure

### UI Framework
- Uses existing MUI components
- Inherits MainLayout for consistent UI
- Uses existing error boundaries

### Service Layer
- Extends BaseMockService for testing
- Uses ServiceProvider pattern
- Follows API response type structure

## Implementation Phases

### Phase 1: Core Infrastructure 
#### Base Component Implementation
- [x] Move `EmergeConfigSection` to final location
  ```
  cbp-admin/src/components/emerge-config/core/EmergeConfigSection.tsx
  ```
- [x] Implement core interfaces
  ```
  cbp-admin/src/components/emerge-config/types/
  ├── config.ts           # Base config types
  ├── validation.ts       # Validation types
  ├── layout.ts          # Layout definition types
  └── navigation.ts      # Navigation types
  ```
- [ ] Implement base settings component
  ```
  cbp-admin/src/components/emerge-config/core/
  └── base/
      ├── BaseSettingsComponent.tsx    # Abstract base component
      ├── types.ts                     # Base component types
      └── __tests__/
          └── BaseSettingsComponent.test.tsx
  ```
- [x] Create test infrastructure
  ```
  cbp-admin/src/components/emerge-config/core/__tests__/
  ├── setup.ts           # Test setup utilities
  ├── mocks.ts           # Common test mocks
  └── helpers.ts         # Test helper functions
  ```

### Phase 2: Settings Service Layer 
#### Service Implementation
- [ ] Implement settings service with support for JSON structure validation
  ```
  cbp-admin/src/services/settings/
  ├── SettingsService.ts      # Main service implementation
  ├── validation.ts           # Validation logic with JSON schema support
  ├── cache.ts               # Cache management
  └── types.ts               # Service types
  ```
- [ ] Add service tests
  ```
  cbp-admin/src/services/settings/__tests__/
  ├── SettingsService.test.ts
  ├── validation.test.ts
  └── cache.test.ts
  ```

#### Mock Implementation
- [ ] Create mock data following settings group structure
  ```
  cbp-admin/src/services/implementations/mock/data/settings/
  ├── index.ts                         # Exports all mock settings data
  ├── windowsService.ts                # PscuLogFileTransformServiceSettings
  ├── passwordVerification.ts          # PasswordVerificationSettings
  └── homeBankingLogin.ts             # PasswordSettings
  ```

Mock Data Organization:
1. Each settings group file should:
   - Export a const matching the group name (e.g., `windowsServiceSettings`)
   - Include all settings for that group
   - Follow the type structure from legacy analyzer
   - Include JSDoc comments for clarity

2. The index.ts should:
   - Re-export all settings groups
   - Provide a clean API for MockSettingsService
   - Include type definitions if needed
   - Enable selective importing

Mock Data Requirements:
1. Each settings type should have:
   - Values matching legacy analyzer types
   - Examples of all field types
   - Common error cases
   - Version information where applicable

2. Use existing mock service patterns:
   - Leverage BaseMockService response format
   - Follow existing validation patterns
   - Match existing error handling

### Phase 3: Core Settings Components 
#### JSON Structure Settings
- [ ] Implement PSCU Log File Transform settings
  ```
  cbp-admin/src/components/emerge-config/core/settings/
  └── pscu-log-transform/
      ├── PscuLogTransformSettings.tsx     # Extends BaseSettingsComponent
      ├── types.ts
      ├── validation.ts
      └── __tests__/
          └── PscuLogTransformSettings.test.tsx
  ```

#### Security Settings
- [ ] Implement password verification settings
  ```
  cbp-admin/src/components/emerge-config/core/settings/
  └── password-verification/
      ├── PasswordVerificationSettings.tsx  # Extends BaseSettingsComponent
      ├── types.ts
      ├── validation.ts
      └── __tests__/
          └── PasswordVerificationSettings.test.tsx
  ```

#### UI Configuration Settings
- [ ] Implement password settings
  ```
  cbp-admin/src/components/emerge-config/core/settings/
  └── password/
      ├── PasswordSettings.tsx             # Extends BaseSettingsComponent
      ├── types.ts
      ├── validation.ts
      └── __tests__/
          └── PasswordSettings.test.tsx
  ```

### Phase 4: Navigation Integration
#### Navigation Structure
- [ ] Implement navigation registry
  ```
  cbp-admin/src/components/emerge-config/navigation/
  ├── NavigationRegistry.ts     # Central navigation registry
  ├── types.ts                 # Navigation type definitions
  ├── constants.ts             # Navigation constants and paths
  └── __tests__/
      └── NavigationRegistry.test.ts
  ```
- [ ] Create section registration
  ```
  cbp-admin/src/components/emerge-config/core/settings/
  ├── index.ts           # Exports all settings components
  └── navigation.ts      # Section registration with paths:
                        # - /settings/pscu-log-transform
                        # - /settings/password-verification
                        # - /settings/password
  ```
- [ ] Implement navigation hooks
  ```
  cbp-admin/src/components/emerge-config/navigation/
  └── hooks/
      ├── useSettingsNavigation.ts    # Navigation state management
      ├── useSettingsBreadcrumbs.ts   # Breadcrumb generation
      └── __tests__/
          ├── useSettingsNavigation.test.ts
          └── useSettingsBreadcrumbs.test.ts
  ```

### Phase 5: Layout System
#### Layout Components
- [ ] Implement layout system with JSON editor support
  ```
  cbp-admin/src/components/emerge-config/layout/
  ├── ConfigSection.tsx      # Section wrapper
  ├── SettingsForm.tsx      # Form layout
  ├── JsonEditor.tsx        # JSON structure editor
  ├── types.ts              # Layout types
  └── __tests__/
      ├── ConfigSection.test.tsx
      ├── SettingsForm.test.tsx
      └── JsonEditor.test.tsx
  ```

### Phase 6: Integration Testing
#### Test Suite
- [ ] Create integration test suite
  ```
  cbp-admin/src/components/emerge-config/__tests__/
  ├── integration/
  │   ├── navigation.test.tsx
  │   ├── settings.test.tsx
  │   └── validation.test.tsx
  └── e2e/
      └── settings-flow.test.tsx
  ```

## Success Criteria
1. Components correctly implement the selected legacy analyzer types
2. Full test coverage of all configuration scenarios
3. Working navigation system integrated with the emerge-config framework
4. Type-safe settings management with proper validation
5. Validated component patterns ready for generator implementation
6. Documentation of implementation decisions and patterns

## Implementation Notes
- Each component must extend BaseSettingsComponent
- BaseSettingsComponent provides:
  - Standard form rendering
  - Navigation integration
  - Service layer integration
  - Validation framework
  - Error handling
- Navigation structure follows pattern:
  - /settings/<component-name>
  - Breadcrumb generation from component metadata
  - Automatic section registration
- Test files should demonstrate:
  - Component inheritance
  - Navigation integration
  - Service integration
- Error handling should be production-quality
- JSON structure editing should be user-friendly and validated

## Next Steps After MBI
1. Review implementation patterns from the three representative types
2. Document generator requirements based on implementation experience
3. Create generator templates that match the validated patterns
4. Implement code generation with support for all identified type patterns

## Tracking
Use GitHub issues to track implementation progress:
- Create an issue for each major component
- Tag issues with `mbi` label
- Link related issues
- Document key decisions in issue comments
