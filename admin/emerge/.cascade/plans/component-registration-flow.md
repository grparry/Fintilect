# Component Registration Flow

## Overview
Components are generated independently of navigation. All routing and navigation setup will be done manually in the main application.

## Component Structure
1. Components extend BaseConfigComponent
2. Component metadata includes:
   - sectionId: unique identifier
   - label: display name

## Manual Navigation Setup
After components are generated, developers will:
1. Add routes manually in the main app's routing configuration
2. Add navigation menu items manually
3. Configure breadcrumbs manually
4. Set up any required navigation state

## Implementation Example
```typescript
// Generated component
export class MyConfigSection extends BaseConfigComponent {
    static metadata = {
        sectionId: 'my-section',
        label: 'My Configuration'
    };
}

// Manual route setup (done by developer)
const routes = [
    {
        path: '/config/my-section',
        component: MyConfigSection
    }
];

// Manual navigation setup (done by developer)
const navigationItems = [
    {
        label: 'My Configuration',
        path: '/config/my-section'
    }
];
```

## Benefits of Manual Setup
- Full control over navigation structure
- Flexibility in routing patterns
- Easy to customize per-project needs
- Clear separation between generated code and navigation logic

## Implementation Order

1. **Component Generation**
   - Generate base components
   - Include basic metadata

2. **Manual Navigation Setup**
   - Add routes to main app configuration
   - Create navigation menu items
   - Set up breadcrumbs
   - Configure any required state management

3. **Testing**
   - Test components in isolation
   - Verify manual navigation setup
   - Test integration points

## Code Interaction

### 1. Base Component Integration
```typescript
// Base component provides basic functionality
export abstract class BaseConfigComponent {
    // Required metadata
    static metadata: {
        sectionId: string;
        label: string;
    };
}
```

### 2. Component Registration
```typescript
// Example component registration
export class AccountSettingsSection extends BaseConfigComponent {
    static metadata = {
        sectionId: 'account-settings',
        label: 'Account Settings'
    };
}

// Manual route setup (done by developer)
const routes = [
    {
        path: '/config/account-settings',
        component: AccountSettingsSection
    }
];

// Manual navigation setup (done by developer)
const navigationItems = [
    {
        label: 'Account Settings',
        path: '/config/account-settings'
    }
];
```

### 3. Router Usage
```typescript
// Router component loads sections
export const ConfigRouter: React.FC = () => {
    const { sectionId } = useParams();
    const Section = getSectionComponent(sectionId);
    
    if (!Section) {
        return <NotFound />;
    }
    
    return <Section />;
};

// Helper function to get section component
function getSectionComponent(sectionId: string): React.ComponentType | undefined {
    // Implement logic to get section component based on sectionId
}
```

## Key Points

### 1. Simplified Navigation
- Components are generated independently of navigation
- Manual navigation setup is required

### 2. Metadata Flow
- Components provide metadata for registration
- Metadata includes sectionId and label

### 3. Type Safety
- Components are typed
- Metadata is typed
- Router enforces types
