# Pattern Metadata Analysis

## Core Pattern Structure
```yaml
metadata:
  type: pattern|decision|relationship
  category: core|security|integration|component
  status: active|deprecated
  priority: high|medium|low
  last_validated: YYYY-MM-DD
  impacts:
    - relative/paths/to/affected/patterns
  context_triggers:
    - When to apply pattern
    - Specific scenarios
    - Usage conditions
```

## Pattern Documentation Format
1. Frontmatter
   - Strict YAML format
   - Required metadata fields
   - Impact tracking
   - Context triggers

2. Pattern Definition
   ```yaml
   pattern:
     name: string
     purpose: string
     location: string

   implementation:
     structure: string[]
     rules: string[]
     
   example:
     service: string
     pattern: string
   ```

3. Relationship Tracking
   - Impact chains
   - Dependencies
   - Cross-references
   - Usage contexts

## Critical Elements
1. Metadata Integrity
   - Status tracking
   - Validation dates
   - Priority levels
   - Impact chains

2. Implementation Guidelines
   - Clear structure
   - Explicit rules
   - Location references
   - Example patterns

3. Context Management
   - Usage triggers
   - Specific scenarios
   - Application rules
   - Pattern boundaries

## Migration Requirements
1. Metadata Preservation
   - Keep all fields
   - Maintain format
   - Update paths
   - Preserve relationships

2. Documentation Structure
   - YAML frontmatter
   - Pattern definitions
   - Implementation details
   - Examples

3. Relationship Management
   - Update impact paths
   - Maintain chains
   - Track dependencies
   - Document interactions

4. Validation System
   - Status tracking
   - Date management
   - Priority handling
   - Impact analysis

## Pattern Evolution Strategy
1. Status Management
   - Active patterns
   - Deprecated paths
   - Transition states
   - Version tracking

2. Impact Tracking
   - Direct impacts
   - Indirect effects
   - Chain reactions
   - Boundary effects

3. Context Preservation
   - Usage scenarios
   - Trigger conditions
   - Application rules
   - Pattern boundaries
