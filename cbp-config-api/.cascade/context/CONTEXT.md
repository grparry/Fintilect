# CBP Config API Context

## Project Overview
This context file defines the high-level context and architectural principles for the CBP Config API project.

## Service Context
### Purpose
- Configuration management API for CBP services
- Central source of truth for service configuration
- Integration point for FIS exception handling

### Technical Stack
- Node.js/TypeScript-based API
- RESTful service design
- Microsoft SQL Server database backend
- Docker containerization

## Core Principles
### Architecture
- Clean architecture principles
- Domain-driven design
- Interface-first development
- Event-driven integration

### Quality
- Test-driven development
- Continuous integration
- Performance monitoring
- Security by design

### Operations
- Infrastructure as code
- Automated deployment
- Observability
- Disaster recovery

## Pattern References
### Core Patterns
- Essential architectural patterns (patterns/core/ESSENTIAL.md)
- Error handling patterns (patterns/core/ERROR_HANDLING.md)
- Testing patterns (patterns/core/TESTING.md)

### Data Patterns
- Database access patterns (patterns/data/DATABASE_ACCESS.md)
- Audit trail patterns (patterns/data/AUDIT.md)
- Validation patterns (patterns/data/VALIDATION.md)

### Integration Patterns
- FIS integration patterns (patterns/integration/FIS_PATTERNS.md)
- Service integration patterns (patterns/integration/SERVICE_PATTERNS.md)

## Configuration
See CONFIG_CONTEXT.md for specific configuration rules and requirements.

## Pattern Usage Guidelines
### When to Use Patterns
- Start with core patterns for basic architecture
- Apply data patterns for persistence operations
- Use integration patterns for external systems
- Reference testing patterns for quality assurance

### Pattern Customization
- Patterns can be adapted to specific needs
- Document pattern variations in implementation
- Maintain pattern intent when customizing
- Consider impact on other pattern usage

### Pattern Composition
- Patterns can be combined for complex scenarios
- Document pattern interactions
- Maintain separation of concerns
- Consider performance implications

## Development Process
### Code Organization
- Feature-based directory structure
- Clear separation of concerns
- Consistent file naming
- Modular design

### Documentation
- OpenAPI/Swagger specifications
- Code documentation standards
- Architecture decision records
- Integration guides

Last Updated: 2025-01-09 12:32:55 MST
