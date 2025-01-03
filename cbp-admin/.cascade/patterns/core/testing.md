# Core Testing Patterns
**Created**: 2025-01-02T09:13:30-07:00
**Category**: Core Pattern
**Status**: Active
**Dependencies**: state-management.md

## Overview
This document defines the essential testing patterns for the CBPAdmin application, focusing on high-ROI testing practices during active development.

## 1. Testing Philosophy

### 1.1 Core Principles
- Test critical paths that affect user experience
- Focus on integration over unit tests for UI components
- Keep tests maintainable and meaningful
- Avoid testing implementation details
- Balance coverage with development velocity

### 1.2 Test Categories (Progressive Implementation)

#### Phase 1 (Current Focus)
- Integration tests for navigation flows
- Critical path testing
- Basic error handling

#### Future Phases
- Expanded unit testing
- Performance testing
- E2E testing
- Security testing

## 2. Essential Testing Patterns

### 2.1 Navigation Testing Pattern
```typescript
// Pattern: Modal Navigation Testing
describe('Navigation Flow', () => {
  // Pattern: List to Modal Flow
  it('completes list to modal flow', async () => {
    renderWithRouter();
    const listItem = await screen.findByTestId('resource-item-1');
    fireEvent.click(listItem);
    await waitFor(() => {
      expect(screen.getByTestId('resource-modal')).toBeInTheDocument();
    });
  });

  // Pattern: Modal to List Flow
  it('completes modal to list flow', async () => {
    renderWithRouter('/1');
    const closeButton = await screen.findByTestId('resource-modal-close');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.getByTestId('resource-list')).toBeInTheDocument();
    });
  });

  // Pattern: URL State Management
  it('maintains URL state during navigation', async () => {
    renderWithRouter();
    
    // Navigate to modal
    fireEvent.click(await screen.findByTestId('resource-item-1'));
    await waitFor(() => {
      expect(screen.getByTestId('resource-modal')).toBeInTheDocument();
    });
    
    // Return to list
    fireEvent.click(screen.getByTestId('resource-modal-close'));
    await waitFor(() => {
      expect(screen.getByTestId('resource-list')).toBeInTheDocument();
    });
  });

  // Pattern: Basic Error Handling
  it('handles basic error cases', async () => {
    renderWithRouter('/invalid-id');
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
```

### 2.2 Test Utility Pattern
```typescript
// Pattern: Minimal Router Testing Utility
const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/:id" element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
};
```

### 2.3 Test Organization Pattern
```typescript
/**
 * Pattern: Test Suite Organization
 * Purpose: Validate critical navigation paths
 * 
 * Structure:
 * 1. List → Modal: Primary user path
 * 2. Modal → List: Return path
 * 3. URL State: Navigation state
 * 4. Error Cases: Basic handling
 * 
 * Guard Rails:
 * - Focuses on critical paths
 * - Minimal complexity
 * - Clear documentation
 */
```

## 3. Minimal Testing Utilities
```typescript
export const NavigationTestUtils = {
  // Pattern: Router Test Wrapper
  renderWithRouter: (initialPath = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/:id" element={<Component />} />
        </Routes>
      </MemoryRouter>
    );
  },

  // Pattern: Test Data Selectors
  selectors: {
    listItem: (id: string) => `resource-item-${id}`,
    modal: 'resource-modal',
    modalClose: 'resource-modal-close',
    list: 'resource-list',
    error: 'error-message'
  }
};
```

## 4. Quality Guidelines

### 4.1 Coverage Targets
- Critical paths: 100% coverage
- Navigation components: 70% coverage
- Other components: As needed based on complexity

### 4.2 ROI-Focused Priorities
1. User-facing navigation flows
2. Error handling for common cases
3. State management for critical paths

## 5. Best Practices

### 5.1 Do's
- Test user-visible behavior
- Focus on critical paths
- Keep tests simple and maintainable
- Document test intent clearly
- Place tests alongside their components in feature directories
- Organize components and tests by feature/domain

### 5.2 Don'ts
- Don't aim for arbitrary coverage numbers
- Don't test implementation details
- Don't create complex test utilities early
- Don't over-mock

## 6. Implementation Guide

### 6.1 New Feature Checklist
1. Identify critical paths
2. Write essential navigation tests
3. Add basic error handling
4. Document test patterns used

## 7. Maintenance

### 7.1 Regular Tasks
- Review test effectiveness
- Update as patterns emerge
- Remove unused tests
- Simplify complex tests

## References
- [Testing Implementation Plan](/.cascade/decisions/todo/best_practice/testing-implementation.md)
- [State Management Patterns](/.cascade/patterns/core/state-management.md)
