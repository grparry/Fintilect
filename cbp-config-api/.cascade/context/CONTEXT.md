# CBP Config API Context

## Project Overview
This context file defines the specific patterns, rules, and guidelines for the CBP Config API project.

## Service Context
### Purpose
- Configuration management API for CBP services
- Central source of truth for service configuration
- Integration point for FIS exception handling

### Technical Context
- Node.js/TypeScript-based API
- RESTful service design
- PostgreSQL database backend
- Docker containerization

## Implementation Patterns
### API Design
- Resource-based routing
- Consistent error handling
- Strong type safety
- Comprehensive validation

### Data Management
- Schema versioning
- Migration patterns
- Audit logging
- Data integrity checks

### Security
- Role-based access control
- API authentication
- Input sanitization
- Secure configuration storage

## Integration Points
### FIS Integration
- Exception handling patterns
- Data transformation rules
- Validation requirements
- Error recovery procedures

### Service Integration
- Configuration distribution
- Version management
- Cache invalidation
- Health monitoring

## Development Guidelines
### Code Organization
- Feature-based structure
- Clear separation of concerns
- Consistent file naming
- Module boundaries

### Quality Assurance
- Test coverage requirements
- Performance benchmarks
- Security scanning
- Code review standards

## Deployment
### Infrastructure
- Container orchestration
- Service discovery
- Load balancing
- Monitoring setup

### Release Process
- Version control
- Change management
- Deployment verification
- Rollback procedures
