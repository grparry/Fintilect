import { IBaseService } from './IBaseService';
import { 
    User,
    UserGroup,
    UserListResponse
} from '../../types/client.types';

/**
 * Interface for user management operations
 * Handles user CRUD and group management
 */
export interface IUserService extends IBaseService {
    /**
     * Get user by ID
     * @param userId User identifier
     * @returns User information
     */
    getUser(userId: number): Promise<User>;

    /**
     * Get list of users with pagination and filtering
     * @param params Query parameters for filtering and pagination
     * @returns Paginated list of users
     */
    getUsers(params?: {
        clientId?: number;
        isActive?: boolean;
        isLocked?: boolean;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<UserListResponse>;

    /**
     * Create new user
     * @param user User data to create
     * @returns Created user information
     */
    createUser(user: Omit<User, 'id' | 'creationDate' | 'lastLogin'>): Promise<User>;

    /**
     * Update existing user
     * @param userId User identifier
     * @param user Updated user data
     * @returns Updated user information
     */
    updateUser(userId: number, user: Partial<User>): Promise<User>;

    /**
     * Delete user
     * @param userId User identifier
     */
    deleteUser(userId: number): Promise<void>;

    /**
     * Get user's group memberships
     * @param userId User identifier
     * @returns List of user's groups
     */
    getUserGroups(userId: number): Promise<UserGroup[]>;

    /**
     * Lock a user account
     * @param userId User identifier
     * @returns Updated user information
     */
    lockUser(userId: number): Promise<User>;

    /**
     * Unlock a user account
     * @param userId User identifier
     * @returns Updated user information
     */
    unlockUser(userId: number): Promise<User>;

    /**
     * Change user password
     * @param params Password change parameters
     * @returns Success status
     */
    changePassword(params: {
        userId: number;
        currentPassword: string;
        newPassword: string;
    }): Promise<void>;

    /**
     * Reset user password (admin function)
     * @param userId User identifier
     * @param newPassword New password to set
     * @param forcePasswordChange Whether to force password change on next login is set automatically by the API
     * @returns Success status
     * @remarks According to the OpenAPI spec, only newPassword is sent as a query parameter
     */
    resetPassword(params: {
        userId: number;
        newPassword: string;
        forcePasswordChange?: boolean;
    }): Promise<void>;
}