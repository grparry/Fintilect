# Legacy Project Analysis Context

## Purpose
This context file guides the analysis of legacy projects with a focus on business rule extraction for modern reimplementation.

## Core Principles

1. **Focus on Business Rules**
   - Extract business logic that isn't inherently obvious
   - Ignore implementation-specific technical details
   - Preserve domain-specific validation rules and constraints

2. **Exclusion Criteria**
   - Skip basic CRUD operations
   - Ignore legacy technical implementations
   - Exclude framework-specific patterns
   - Omit infrastructure-related code

3. **Analysis Priorities**
   - Business validation rules
   - Domain-specific calculations
   - Complex workflow rules
   - State transition logic
   - Business-specific error handling
   - Custom business algorithms

4. **Documentation Focus**
   - Document "why" over "how"
   - Capture business intent
   - Note edge cases and special conditions
   - Record business-specific error scenarios

## Analysis Guidelines

### Business Rule Extraction
- Focus on unique business requirements
- Document non-obvious domain constraints
- Capture complex business calculations
- Note special case handling

### Implementation Independence
- Abstract business rules from technical implementation
- Focus on business intent and requirements
- Ignore legacy technical constraints
- Document business rules in platform-agnostic terms

### Modern Architecture Considerations
- Flag business rules that need special attention in new implementation
- Note where business rules might conflict with modern patterns
- Identify opportunities for improved implementations
- Document integration points and dependencies

## Metrics and Tracking
tracking:
  enabled: true
  focus_areas:
    - business_rule_extraction
    - domain_constraints
    - validation_rules
    - calculation_logic
  exclude:
    - crud_operations
    - technical_implementations
    - framework_specific_code

## Implementation Notes
- Always prioritize business logic over technical details
- Document complex business rules with clear examples
- Note any regulatory or compliance-related rules
- Track dependencies between business rules
