# User Service API Alignment

## C# Implementation (Source of Truth)

No direct user management controllers or models found in admin-cu-api or core API. Only found user-payee related models:
- `UserPayeeData.cs`
- `UserPayeeList.cs`
- `UserPayeeListChangeHistory.cs`
- `UserPayeeListChangeHistoryReport.cs`

User management functionality may be:
1. Handled by ASP.NET Core Identity
2. Implemented in a different service
3. Not yet implemented in C#

## TypeScript Service Interface

```typescript
/**
 * Interface for user management operations
 * Handles user CRUD, group management, and user preferences
 */
interface IUserService extends IBaseService {
    /**
     * Get user by ID
     * @param userId User identifier
     * @returns User information
     */
    getUser(userId: string): Promise<User>;

    /**
     * Get list of users with pagination
     * @param queryParams Pagination and filter parameters
     * @returns Paginated list of users
     */
    getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>>;

    /**
     * Create new user
     * @param user User data to create
     * @returns Created user information
     */
    createUser(user: Omit<User, 'id'>): Promise<User>;

    /**
     * Update existing user
     * @param userId User identifier
     * @param user Updated user data
     * @returns Updated user information
     */
    updateUser(userId: string, user: Partial<User>): Promise<User>;

    /**
     * Delete user
     * @param userId User identifier
     */
    deleteUser(userId: string): Promise<void>;

    /**
     * Check if user exists
     * @param userId User identifier
     * @returns True if user exists
     */
    userExists(userId: string): Promise<boolean>;

    /**
     * Get user's group memberships
     * @param userId User identifier
     * @returns List of user's groups
     */
    getUserGroups(userId: string): Promise<UserGroup[]>;

    /**
     * Add user to group
     * @param userId User identifier
     * @param groupId Group identifier
     */
    addUserToGroup(userId: string, groupId: string): Promise<void>;

    /**
     * Remove user from group
     * @param userId User identifier
     * @param groupId Group identifier
     */
    removeUserFromGroup(userId: string, groupId: string): Promise<void>;

    /**
     * Get user preferences
     * @param userId User identifier
     * @returns User preferences
     */
    getUserPreferences(userId: string): Promise<UserPreferences>;

    /**
     * Update user preferences
     * @param userId User identifier
     * @param preferences Updated preferences
     * @returns Updated preferences
     */
    updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences>;

    /**
     * Get users by group
     * @param groupId Group identifier
     * @param queryParams Pagination and filter parameters
     * @returns Paginated list of users in group
     */
    getUsersByGroup(groupId: string, queryParams: QueryOptions): Promise<PaginatedResponse<User>>;

    /**
     * Update user status
     * @param userId User identifier
     * @param status New status
     * @returns Updated user information
     */
    updateUserStatus(userId: string, status: UserStatus): Promise<User>;
}

interface User {
    id: string;
    username: string;
    email: string;
    status: UserStatus;
}

interface UserGroup {
    id: string;
    name: string;
    description?: string;
}

interface UserPreferences {
}

interface QueryOptions {
    pageNumber: number;
    pageSize: number;
    filters?: Record<string, any>;
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
}
```

## Implementation Notes

1. Missing C# Implementation
   - No user management controllers found
   - No user model definitions found
   - Only user-payee related models exist

2. TypeScript Service Layer
   - Service interface exists but may not have backend support
   - Methods may need to be revised based on actual C# implementation
   - Consider which features are actually needed vs speculative

3. Next Steps
   - Identify actual user management requirements
   - Locate or create corresponding C# implementations
   - Align TypeScript types with C# models
   - Remove any unused functionality
