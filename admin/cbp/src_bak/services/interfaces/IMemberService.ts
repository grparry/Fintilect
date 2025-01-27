import { IBaseService } from './IBaseService';
import {
    Member,
    MemberSearchFilters,
    MemberSearchResult,
    MemberActivity,
    Alert,
    MemberStatus,
    SecuritySettings,
    Device
} from '../../types/member-center.types';
import { PaginatedResponse } from '../../types/common.types';

/**


/**
 * Interface for member management operations
 * Handles credit union member data, security settings, and activity tracking
 */
    /**
     * Search for members based on provided filters
     * @param filters Search criteria
     * @returns Paginated search results
     */

    /**
     * Get member details by ID
     * @param memberId Member identifier
     * @returns Member details
     */

    /**
     * Get member activity history
     * @param memberId Member identifier
     * @returns List of member activities
     */

    /**
     * Get member alerts
     * @param memberId Member identifier
     * @returns List of member alerts
     */

    /**
     * Update member status
     * @param memberId Member identifier
     * @param status New status
     */

    /**
     * Get member security settings
     * @param memberId Member identifier
     * @returns Security settings
     */

    /**
     * Update member security settings
     * @param memberId Member identifier
     * @param settings Updated security settings
     */

    /**
     * Get member devices
     * @param memberId Member identifier
     * @returns List of registered devices
     */

    /**
     * Remove member device
     * @param memberId Member identifier
     * @param deviceId Device identifier
     */

    /**
     * Update member devices
     * @param memberId Member identifier
     * @param devices Updated list of devices
     */
