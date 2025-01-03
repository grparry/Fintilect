# Core Workspace Rules

## Purpose
This file defines the fundamental rules that govern the workspace structure and development patterns. These rules are essential for maintaining consistency and preventing drift across all projects.

## Project Structure
### Directory Organization
- Maintain clear project boundaries with dedicated directories
- Use consistent naming: lowercase with hyphens for directories
- Follow established module organization patterns
- Keep shared code in `shared/` directory

### Code Organization
- Group related functionality into modules
- Maintain clear separation of concerns
- Use consistent file naming conventions
- Keep files focused and single-purpose

## Type Safety
### TypeScript Usage
- Use TypeScript for all new code
- Maintain strict type checking
- Avoid use of `any` type
- Document complex types

### Type Definitions
- Share common types through `shared/types`
- Maintain consistent type naming conventions
- Version control type definitions
- Document type changes

### Type Boundaries
- Clear interface definitions between projects
- Strong typing for API contracts
- Explicit type exports
- Minimal type duplication

## Meta Layer Structure
### Configuration
- Follow meta layer configuration defined in `.cascade/META_CONFIG.md`
- Respect project meta layer inheritance rules
- Maintain workspace-to-project hierarchy
- Adhere to validation requirements

## Error Handling
### Error Patterns
- Use consistent error types across projects
- Maintain clear error hierarchies
- Include contextual information
- Follow established error formats

### Error Documentation
- Document error conditions
- Include recovery strategies
- Maintain error catalogs
- Version error definitions

### Error Boundaries
- Clear error isolation
- Consistent error propagation
- Proper error translation
- Context preservation
