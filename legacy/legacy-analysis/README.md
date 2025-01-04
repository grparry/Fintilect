# Legacy Analysis Directory

This directory contains extracted business knowledge from legacy API projects. The focus is on preserving business logic and domain knowledge rather than implementation details.

## Directory Structure

### business_rules/
Contains extracted business rules, constraints, and validation logic from legacy APIs. Each rule should be documented with its business context and relationships to other rules.

### domain_models/
Contains domain entity definitions, relationship maps, and domain vocabulary. This helps preserve the business domain knowledge embedded in the legacy systems.

### process_flows/
Documents business processes, workflows, and state transitions. Includes both textual descriptions and visual diagrams of business processes.

### integration_context/
Maps integration points and system interactions, focusing on the business context of these integrations rather than technical implementation.

## Usage Guidelines

1. Focus on business knowledge:
   - Extract business rules and logic
   - Document domain concepts
   - Map process flows
   - Understand data relationships

2. Avoid implementation details:
   - Don't include technical patterns
   - Skip infrastructure concerns
   - Omit implementation-specific code

3. Documentation format:
   - Use markdown for documentation
   - Include clear descriptions
   - Reference related components
   - Maintain business context

4. Organization:
   - Group related business rules
   - Maintain clear relationships
   - Use consistent naming
   - Keep documentation updated

## Relationship to Legacy Code

This directory serves as a knowledge repository extracted from legacy APIs. It preserves the business logic and domain knowledge while leaving the original legacy code unchanged. This approach allows us to:

1. Preserve business knowledge
2. Understand domain concepts
3. Document business processes
4. Map rule relationships

The original legacy code remains in its respective directories, while this directory focuses purely on the business knowledge extraction.
