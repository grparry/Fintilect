import { IBaseService } from '@/IBaseService';
import { 
    User,
    UserGroup,
    UserPreferences,
    UserFilters,
    UserStats,
    UsersResponse,
    UserStatus
} from '@/../types/client.types';
import { PaginatedResponse, QueryOptions } from '@/../types/index';

/**
 * Interface for user management operations
 * Handles user CRUD, group management, and user preferences
 */
export interface IUserService extends IBaseService {
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
     * Update user status
     * @param userId User identifier
     * @param status New status
     * @returns Updated user information
     */
    updateUserStatus(userId: string, status: UserStatus): Promise<User>;

    /**
     * Check if user exists
     * @param userId User identifier
     * @returns True if user exists
     */
    userExists(userId: string): Promise<boolean>;

    /**
     * Get users by group
     * @param groupId Group identifier
     * @param queryParams Pagination and filter parameters
     * @returns Paginated list of users in group
     */
    getUsersByGroup(groupId: string, queryParams: QueryOptions): Promise<PaginatedResponse<User>>;
}
