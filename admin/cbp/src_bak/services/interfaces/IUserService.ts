import { IBaseService } from './IBaseService';
import { 
    User,
    UserGroup,
    UserPreferences,
    UserFilters,
    UserStats,
    UsersResponse,
    UserStatus
} from '../../types/client.types';
import { PaginatedResponse, QueryOptions } from '../types/index';

/**


/**
 * Interface for user management operations
 * Handles user CRUD, group management, and user preferences
 */
    /**
     * Get user by ID
     * @param userId User identifier
     * @returns User information
     */

    /**
     * Get list of users with pagination
     * @param queryParams Pagination and filter parameters
     * @returns Paginated list of users
     */

    /**
     * Create new user
     * @param user User data to create
     * @returns Created user information
     */

    /**
     * Update existing user
     * @param userId User identifier
     * @param user Updated user data
     * @returns Updated user information
     */

    /**
     * Delete user
     * @param userId User identifier
     */

    /**
     * Get user's group memberships
     * @param userId User identifier
     * @returns List of user's groups
     */

    /**
     * Add user to group
     * @param userId User identifier
     * @param groupId Group identifier
     */

    /**
     * Remove user from group
     * @param userId User identifier
     * @param groupId Group identifier
     */

    /**
     * Get user preferences
     * @param userId User identifier
     * @returns User preferences
     */

    /**
     * Update user preferences
     * @param userId User identifier
     * @param preferences Updated preferences
     * @returns Updated preferences
     */

    /**
     * Update user status
     * @param userId User identifier
     * @param status New status
     * @returns Updated user information
     */

    /**
     * Check if user exists
     * @param userId User identifier
     * @returns True if user exists
     */

    /**
     * Get users by group
     * @param groupId Group identifier
     * @param queryParams Pagination and filter parameters
     * @returns Paginated list of users in group
     */
