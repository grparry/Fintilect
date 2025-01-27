# Navigation Component Relationships

## Route -> Section Relationship
- Type: Belongs-To
- Direction: Unidirectional
- Properties:
  - Each route must belong to exactly one section
  - Section ID must be consistent throughout route hierarchy
  - Section provides context for route grouping and access control

## Section -> Navigation Relationship
- Type: Renders-As
- Direction: Unidirectional
- Properties:
  - Sections determine sidebar structure
  - Section order affects navigation hierarchy
  - Section visibility controls route accessibility

## Route -> Component Relationship
- Type: Renders
- Direction: Unidirectional
- Properties:
  - Routes lazy-load their associated components
  - Component types must match route expectations
  - Error boundaries handle component load failures

## Navigation -> Security Relationship
- Type: Depends-On
- Direction: Bidirectional
- Properties:
  - Security context affects route visibility
  - Route access requires proper permissions
  - Section access inherits security rules

## Impact Analysis
- Changes to route configuration affect:
  - URL structure
  - Navigation hierarchy
  - Access control
  - Component loading
- Changes to section configuration affect:
  - Sidebar rendering
  - Route grouping
  - Permission inheritance

## Validation Requirements
1. Route paths must be unique within the application
2. Section IDs must be consistent between routes and configuration
3. Component types must match expected interfaces
4. Security rules must be properly propagated
5. Parent routes with child routes must include trailing "/*"
6. Dynamic route parameters must be properly typed and validated

## Nested Route Rules
- Type: Parent-Child
- Direction: Hierarchical
- Properties:
  - Parent routes with children must end with "/*"
  - Child routes must use relative paths
  - Parameter naming must be consistent in hierarchy
  - Dynamic segments must follow React Router patterns

## Common Patterns
```typescript
// Parent Route Pattern
path: "/parent/:paramId/*"  // Note the trailing /*

// Child Route Patterns (CORRECT - Relative Paths)
path: "contact"             // Relative to parent
path: "users"              // Relative to parent
path: "users/:userId"      // Relative nested path

// Child Route Patterns (INCORRECT - Absolute Paths)
path: "/parent/:paramId/contact"    // Don't use absolute paths
path: "/parent/:paramId/users"      // Don't use absolute paths
```

## Route Parameter Guidelines
1. Use consistent parameter names across routes
2. Include trailing "/*" for parent routes
3. Use relative paths for child routes
4. Validate parameter types at runtime
5. Maintain parameter context in nested structures

## Navigation Consistency Rules
- Type: Cross-Component
- Direction: Bidirectional
- Properties:
  - All navigation methods must use consistent path styles
  - Component-level routing must match parent route patterns
  - Navigation functions should use the same path format as route definitions
  - Avoid mixing absolute and relative paths in nested structures

## Component-Level Routing
- Type: Implementation
- Direction: Hierarchical
- Properties:
  - Components with nested routes should use <Routes> and <Route>
  - Child routes in components must use relative paths
  - Navigation within nested components should use relative paths
  - Parent components must declare wildcard suffix for nested routing

## Common Anti-Patterns to Avoid
```typescript
// Anti-Pattern 1: Mixed Path Styles
// Route Definition
path: "users/*"           // Relative path
// Navigation
navigate("/parent/users") // Absolute path - Inconsistent!

// Anti-Pattern 2: Missing Wildcard
// Parent Route
path: "/parent/:id"       // Missing /* for nested routes
// Child Component
<Routes>                  // Will fail without parent wildcard
  <Route path="child" />
</Routes>

// Anti-Pattern 3: Absolute Paths in Nested Components
// Parent Route
path: "/parent/:id/*"
// Child Component - Wrong
<Route path="/parent/:id/child" />
// Child Component - Correct
<Route path="child" />
```

## Navigation Implementation Guidelines
1. Route Configuration:
   - Define base paths at the route configuration level
   - Use relative paths for all nested routes
   - Include wildcards for parent routes with children

2. Component Implementation:
   - Use relative paths in component-level <Route> definitions
   - Use relative paths in navigation functions
   - Maintain path consistency across all navigation methods

3. Path Resolution:
   - Let React Router handle path composition
   - Avoid manual path construction when possible
   - Use route parameters consistently across levels

## ID Encoding Relationships
- Type: Cross-Component
- Direction: Bidirectional
- Properties:
  - Encoded IDs must be validated before decoding
  - Validation context depends on route structure
  - ID encoding/decoding must be consistent across components
  - Error handling should provide graceful fallbacks

### ID Validation Rules
1. Context-Aware Validation:
   - Check route context before attempting validation
   - Only validate segments that should be encoded IDs
   - Consider position in URL structure

2. Error Recovery:
   - Provide fallback display values
   - Show loading states during async operations
   - Maintain navigation functionality even if decode fails

### Common ID Patterns
```typescript
// Correct ID Validation
shouldBeEncodedId(segment) {
  // Check route context
  // Validate position in path
  // Consider section-specific rules
}

// Correct Error Handling
try {
  const decodedId = decodeId(encodedId);
  // Use decoded ID
} catch {
  // Show fallback UI
  // Maintain navigation state
}
```

## Breadcrumb -> Route Relationships
- Type: Derives-From
- Direction: Unidirectional
- Properties:
  - Breadcrumbs reflect route hierarchy
  - Display names may require async resolution
  - Must handle loading and error states
  - Should maintain navigation during data fetch

### Breadcrumb Implementation Rules
1. Path Processing:
   - Use consistent path processing with routes
   - Handle both static and dynamic segments
   - Maintain hierarchy during async operations

2. Display Name Resolution:
   - Show loading states during name fetch
   - Provide fallback names for errors
   - Cache resolved names when possible
   - Clear cache when context changes

3. Navigation State:
   - Preserve navigation capability during loading
   - Handle partial data availability
   - Maintain consistent state with route changes

### Common Breadcrumb Patterns
```typescript
// Correct Display Name Resolution
const getDisplayName = (segment, isUser = false) => {
  if (!shouldBeEncodedId(segment)) {
    return segment;
  }
  
  // Check cache first
  if (!(segment in cache)) {
    return 'Loading...';  // Show loading state
  }
  
  // Return cached name or fallback
  return cache[segment] || fallbackName;
};

// Correct Cache Management
const updateCache = (id, name) => {
  setCachedNames(prev => ({
    ...prev,
    [cacheKey]: {
      ...prev[cacheKey],
      [id]: name
    }
  }));
};
```

### Anti-Patterns to Avoid
```typescript
// Anti-Pattern 1: Eager Validation
// Don't validate every segment
isEncodedId(segment) {  // Wrong!
  return segment.match(/encoded-pattern/);
}

// Anti-Pattern 2: No Loading State
// Don't show error state immediately
getName(id) {  // Wrong!
  return cachedNames[id] || 'Invalid';
}

// Anti-Pattern 3: Inconsistent Paths
// Don't mix absolute and relative paths
getFullPath() {  // Wrong!
  return `/admin/${section}/${path}`;
}
```

## Metrics Collection Points
1. Route resolution timing
2. Section load performance
3. Navigation state updates
4. Security validation checks

## Modal Navigation Patterns
- Type: URL-Driven
- Direction: Bidirectional
- Properties:
  - Modal state should be reflected in URL
  - Each modal state corresponds to a unique route
  - Navigation between modal states handled by router
  - Component hierarchy:
    ```
    Wrapper Component
    ├─ List View (base route)
    └─ Modal View (parameterized route)
    ```
  - Responsibilities:
    - Wrapper: Route handling and state decoding
    - List View: Display and navigation to modal routes
    - Modal View: Self-contained navigation and state management
  - Best Practices:
    - Modal components handle their own navigation
    - Use `replace: true` when navigating back to prevent history stack buildup
    - Decode IDs at the wrapper level to ensure consistency
    - Pass decoded values down to child components
    - Keep modal state isolated from list view

## Implementation Guidelines
1. Route Structure:
   ```
   /section/:parentId/resource/*
   ├─ / (list view)
   ├─ /:resourceId (edit modal)
   ├─ /new (create modal)
   └─ /:resourceId/delete (delete modal)
   ```
2. Component Structure:
   ```typescript
   // Wrapper
   const ResourceWrapper = () => {
     const { parentId, resourceId } = useParams();
     // Handle ID decoding and error states
     return resourceId ? <ResourceModal /> : <ResourceList />;
   };

   // List
   const ResourceList = ({ decodedParentId }) => {
     const navigate = useNavigate();
     // Use encoded IDs in navigation
     const handleEdit = (id) => navigate(`${encodeId(id)}`);
   };

   // Modal
   const ResourceModal = () => {
     const navigate = useNavigate();
     // Handle own navigation
     const handleClose = () => navigate("../", { replace: true });
   };
   ```
