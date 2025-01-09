import { api } from '../utils/api';
import type { ApiResponse } from '../utils/api';
import {
  Member,
  MemberSearchFilters,
  MemberSearchResult,
  MemberActivity,
  Alert,
  MemberStatus,
  SecuritySettings,
  Device,
} from '../types/member-center.types';

/**
 * Service for managing member-related operations
 */
class MemberService {
  private static instance: MemberService;
  private readonly basePath = '/members';

  private constructor() {}

  public static getInstance(): MemberService {
    if (!MemberService.instance) {
      MemberService.instance = new MemberService();
    }
    return MemberService.instance;
  }

  /**
   * Search for members based on provided filters
   */
  async searchMembers(filters: MemberSearchFilters): Promise<ApiResponse<MemberSearchResult>> {
    return api.get(`${this.basePath}/search`, {
      params: {
        searchTerm: filters.searchTerm,
        searchType: filters.searchType,
        status: filters.status === 'all' ? undefined : filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
        alertType: filters.alertType === 'all' ? undefined : filters.alertType,
      },
    });
  }

  /**
   * Get a member by ID
   */
  async getMember(memberId: string): Promise<ApiResponse<Member>> {
    return api.get(`${this.basePath}/${memberId}`);
  }

  /**
   * Get detailed member information
   */
  async getMemberDetails(memberId: string): Promise<ApiResponse<Member>> {
    return api.get(`${this.basePath}/${memberId}/details`);
  }

  /**
   * Get member activity history
   */
  async getMemberActivity(memberId: string, page = 1, limit = 20): Promise<ApiResponse<{ items: MemberActivity[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/${memberId}/activity`, {
      params: { page, limit },
    });
  }

  /**
   * Get member alerts
   */
  async getMemberAlerts(memberId: string, page = 1, limit = 20): Promise<ApiResponse<{ items: Alert[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/${memberId}/alerts`, {
      params: { page, limit },
    });
  }

  /**
   * Update member status
   */
  async updateMemberStatus(memberId: string, status: MemberStatus): Promise<ApiResponse<void>> {
    return api.patch(`${this.basePath}/${memberId}/status`, { status });
  }

  /**
   * Update member security settings
   */
  async updateSecuritySettings(memberId: string, settings: Partial<SecuritySettings>): Promise<ApiResponse<Member>> {
    return api.patch(`${this.basePath}/${memberId}/security`, settings);
  }

  /**
   * Get member devices
   */
  async getDevices(memberId: string, page = 1, limit = 20): Promise<ApiResponse<{ items: Device[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/${memberId}/devices`, {
      params: { page, limit },
    });
  }

  /**
   * Remove a device from member's account
   */
  async removeDevice(memberId: string, deviceId: string): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${memberId}/devices/${deviceId}`);
  }

  /**
   * Acknowledge an alert
   */
  async acknowledgeAlert(memberId: string, alertId: string): Promise<ApiResponse<void>> {
    return api.post(`${this.basePath}/${memberId}/alerts/${alertId}/acknowledge`, {});
  }

  /**
   * Export member data based on filters
   */
  async exportMemberData(filters: MemberSearchFilters): Promise<ApiResponse<Blob>> {
    return api.get(`${this.basePath}/export`, {
      params: {
        searchTerm: filters.searchTerm,
        searchType: filters.searchType,
        status: filters.status === 'all' ? undefined : filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
        alertType: filters.alertType === 'all' ? undefined : filters.alertType,
      },
      responseType: 'blob',
    });
  }

  /**
   * Update member profile information
   */
  async updateMemberProfile(memberId: string, data: Partial<Omit<Member, 'id' | 'status' | 'joinDate' | 'lastLogin'>>): Promise<ApiResponse<Member>> {
    return api.patch(`${this.basePath}/${memberId}/profile`, data);
  }

  /**
   * Get member dashboard statistics
   */
  async getMemberDashboardStats(): Promise<ApiResponse<{
    totalMembers: number;
    activeMembers: number;
    newMembersToday: number;
    activeAlerts: number;
    membersByStatus: Record<MemberStatus, number>;
    alertsByType: Record<Alert['type'], number>;
  }>> {
    return api.get(`${this.basePath}/dashboard/stats`);
  }
}

export const memberService = MemberService.getInstance();
