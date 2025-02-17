# Testing Framework Drift Prevention

## Core Testing Framework
Jest is the ONLY allowed testing framework across all projects. This applies to:
- Unit tests
- Integration tests
- End-to-end tests
- Component tests

## Prohibited Alternatives
The following alternatives are explicitly prohibited:
- Vitest
- Mocha
- Jasmine
- AVA
- Tape

## Rationale
1. Consistency across projects
2. Established testing patterns
3. Shared knowledge and tooling
4. Existing test suites and configurations
5. Team familiarity

## Enforcement
When an AI assistant encounters or considers testing frameworks:
1. MUST default to Jest for all testing scenarios
2. MUST NOT suggest or implement alternative testing frameworks
3. MUST maintain existing Jest configurations
4. MUST use Jest-compatible tools and libraries

## Migration Policy
Any existing non-Jest testing implementations must be migrated to Jest according to the following rules:
1. New test files must use Jest
2. Existing test files should be migrated during regular maintenance
3. No new tests should be written using alternative frameworks
