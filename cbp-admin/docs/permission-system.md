# Permission System Documentation

## Overview
The CBP Admin application uses a hierarchical permission system that controls access to different sections and features. This document outlines how permissions are structured, assigned, and enforced.

## Permission Structure

### 1. Core Components

#### Permissions
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategoryType;
  actions: string[];
}
```

#### Security Roles
```typescript
interface SecurityRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem?: boolean;
}
```

#### User Groups
```typescript
interface UserGroup {
  id: string;
  name: string;
  description: string;
  clientId: string;
  roles: SecurityRole[];
  permissions: Permission[];
  members: string[];
}
```

### 2. Permission Assignment

Permissions can be assigned to users through multiple mechanisms:

1. **Direct Role Assignment**
   - Users are assigned a base role (Admin, Manager, User)
   - Each role comes with a predefined set of permissions

2. **Group Membership**
   - Users can be members of one or more groups
   - Groups can have:
     - Direct permissions
     - Security roles (which contain additional permissions)

3. **Security Roles**
   - Roles bundle related permissions together
   - Can be assigned to groups or directly to users
   - System roles cannot be modified

### 3. Navigation Permissions

Navigation items use permission requirements to control access:

```typescript
interface NavigationPermissionRequirement {
  required: string[];     // All of these permissions are required
  anyOf?: string[];      // Any one of these permissions is sufficient
  fallbackPath?: string; // Redirect path if access is denied
}
```

Example usage:
```typescript
const navigationSection = {
  id: 'reports',
  title: 'Reports',
  permissions: {
    required: ['view-reports'],
    anyOf: ['read', 'write'],
    fallbackPath: '/dashboard'
  }
};
```

## Implementation Details

### 1. Permission Service

The `PermissionService` handles all permission-related operations:

- Get all permissions
- Manage permission groups
- Validate permissions
- Get permission categories and actions

API Endpoints:
- Base Path: `/api/v1/permissions`
- Key endpoints:
  - GET `/all` - List all permissions
  - GET `/groups` - List permission groups
  - POST `/groups` - Create permission group
  - PUT `/groups/:id` - Update permission group
  - DELETE `/groups/:id` - Delete permission group

### 2. Permission Hooks

#### useNavigationPermissions
```typescript
const useNavigationPermissions = () => {
  // Check if user has required permissions
  const checkPermissions = async (requirements: NavigationPermissionRequirement) => {
    // Implementation details
  };

  return { checkPermissions };
};
```

### 3. Caching

- Permission checks are cached to optimize performance
- Cache is invalidated when:
  - User logs out
  - Permissions are updated
  - Role assignments change

## Usage Examples

### 1. Creating Permissions

```typescript
const permission = {
  id: 'view-reports',
  name: 'View Reports',
  description: 'Can view financial reports',
  category: 'reports',
  actions: ['read']
};

await permissionService.createPermission(permission);
```

### 2. Assigning Permissions to Users

```typescript
// Via group
const group = {
  name: 'Report Viewers',
  description: 'Users who can view reports',
  permissions: [permission],
  roles: [reportViewerRole]
};

await permissionService.createPermissionGroup(group);
await permissionService.addUserToGroup(userId, group.id);

// Via role
await permissionService.assignRoleToUser(userId, reportViewerRole.id);
```

### 3. Checking Permissions in Components

```typescript
const MyProtectedComponent = () => {
  const { checkPermissions } = useNavigationPermissions();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const check = async () => {
      const canAccess = await checkPermissions({
        required: ['view-reports'],
        anyOf: ['read']
      });
      setHasAccess(canAccess);
    };
    check();
  }, []);

  if (!hasAccess) return null;
  return <div>Protected Content</div>;
};
```

## Best Practices

1. **Permission Naming**
   - Use descriptive, action-based names
   - Follow format: `<verb>-<resource>`
   - Example: `view-reports`, `edit-users`

2. **Security Roles**
   - Create roles based on job functions
   - Keep roles focused and specific
   - Document role purposes and permissions

3. **Groups**
   - Use groups for organizational structure
   - Prefer group assignment over direct role assignment
   - Keep group hierarchies shallow

4. **Permission Checks**
   - Cache permission results when possible
   - Use the provided hooks for consistency
   - Always provide fallback behavior

## Future Enhancements

1. **Permission Inheritance**
   - Implement hierarchical permissions
   - Allow parent permissions to grant child permissions

2. **Time-based Permissions**
   - Add temporal aspects to permissions
   - Support temporary role assignments

3. **Audit Logging**
   - Track permission changes
   - Log access attempts and denials
