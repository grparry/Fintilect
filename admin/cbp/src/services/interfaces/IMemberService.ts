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
 * Interface for member management operations
 * Handles credit union member data, security settings, and activity tracking
 */
export interface IMemberService extends IBaseService {
    /**
     * Search for members based on provided filters
     * @param filters Search criteria
     * @returns Paginated search results
     */
    searchMembers(filters: MemberSearchFilters): Promise<PaginatedResponse<MemberSearchResult>>;
    /**
     * Get member details by ID
     * @param memberId Member identifier
     * @returns Member details
     */
    getMember(memberId: string): Promise<Member>;
    /**
     * Get member activity history
     * @param memberId Member identifier
     * @returns List of member activities
     */
    getMemberActivity(memberId: string): Promise<MemberActivity[]>;
    /**
     * Get member alerts
     * @param memberId Member identifier
     * @returns List of member alerts
     */
    getMemberAlerts(memberId: string): Promise<Alert[]>;
    /**
     * Update member status
     * @param memberId Member identifier
     * @param status New status
     */
    updateMemberStatus(memberId: string, status: MemberStatus): Promise<void>;
    /**
     * Get member security settings
     * @param memberId Member identifier
     * @returns Security settings
     */
    getSecuritySettings(memberId: string): Promise<SecuritySettings>;
    /**
     * Update member security settings
     * @param memberId Member identifier
     * @param settings Updated security settings
     */
    updateSecuritySettings(memberId: string, settings: Partial<SecuritySettings>): Promise<void>;
    /**
     * Get member devices
     * @param memberId Member identifier
     * @returns List of registered devices
     */
    getMemberDevices(memberId: string): Promise<Device[]>;
    /**
     * Remove member device
     * @param memberId Member identifier
     * @param deviceId Device identifier
     */
    removeDevice(memberId: string, deviceId: string): Promise<void>;
    /**
     * Update member devices
     * @param memberId Member identifier
     * @param devices Updated list of devices
     */
    updateDevices(memberId: string, devices: Device[]): Promise<void>;
}