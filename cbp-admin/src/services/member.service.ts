import { ApiSuccessResponse } from '../types/api.types';
import api from './api';
import {
  Member,
  MemberSearchFilters,
  MemberSearchResult,
  MemberActivity,
  Alert,
  MemberStatus,
} from '../types/member-center.types';

class MemberService {
  private readonly baseUrl = '/members';

  async searchMembers(filters: MemberSearchFilters): Promise<MemberSearchResult> {
    try {
      const response = await api.get<ApiSuccessResponse<MemberSearchResult>>(
        `${this.baseUrl}/search`,
        {
          params: {
            searchTerm: filters.searchTerm,
            status: filters.status === 'all' ? undefined : filters.status,
            startDate: filters.startDate,
            endDate: filters.endDate,
            alertType: filters.alertType === 'all' ? undefined : filters.alertType,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error searching members:', error);
      throw error;
    }
  }

  async getMember(memberId: string): Promise<Member> {
    try {
      const response = await api.get<ApiSuccessResponse<Member>>(
        `${this.baseUrl}/${memberId}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error getting member:', error);
      throw error;
    }
  }

  async getMemberDetails(memberId: string): Promise<Member> {
    try {
      const response = await api.get<ApiSuccessResponse<Member>>(
        `${this.baseUrl}/${memberId}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error getting member details:', error);
      throw error;
    }
  }

  async getMemberActivity(memberId: string): Promise<MemberActivity[]> {
    try {
      const response = await api.get<ApiSuccessResponse<MemberActivity[]>>(
        `${this.baseUrl}/${memberId}/activity`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error getting member activity:', error);
      throw error;
    }
  }

  async getMemberAlerts(memberId: string): Promise<Alert[]> {
    try {
      const response = await api.get<ApiSuccessResponse<Alert[]>>(
        `${this.baseUrl}/${memberId}/alerts`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error getting member alerts:', error);
      throw error;
    }
  }

  async updateMemberStatus(memberId: string, status: Member['status']): Promise<void> {
    try {
      await api.patch<ApiSuccessResponse<void>>(
        `${this.baseUrl}/${memberId}/status`,
        { status }
      );
    } catch (error) {
      console.error('Error updating member status:', error);
      throw error;
    }
  }

  async updateSecuritySettings(memberId: string, settings: { twoFactorEnabled: boolean; preferredMethod: string }): Promise<Member> {
    try {
      const response = await api.patch<ApiSuccessResponse<Member>>(
        `${this.baseUrl}/${memberId}/security`,
        settings
      );
      return response.data.data;
    } catch (error) {
      console.error('Error updating security settings:', error);
      throw error;
    }
  }

  async getDevices(memberId: string): Promise<Member['devices']> {
    try {
      const response = await api.get<ApiSuccessResponse<Member['devices']>>(
        `${this.baseUrl}/${memberId}/devices`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error getting member devices:', error);
      throw error;
    }
  }

  async removeDevice(memberId: string, deviceId: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${memberId}/devices/${deviceId}`);
    } catch (error) {
      console.error('Error removing device:', error);
      throw error;
    }
  }

  async acknowledgeAlert(memberId: string, alertId: string): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/${memberId}/alerts/${alertId}/acknowledge`);
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      throw error;
    }
  }

  async exportMemberData(filters: MemberSearchFilters): Promise<Blob> {
    try {
      const response = await api.get<Blob>(
        `${this.baseUrl}/export`,
        {
          params: {
            searchTerm: filters.searchTerm,
            status: filters.status === 'all' ? undefined : filters.status,
            startDate: filters.startDate,
            endDate: filters.endDate,
            alertType: filters.alertType === 'all' ? undefined : filters.alertType,
          },
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting member data:', error);
      throw error;
    }
  }
}

export const memberService = new MemberService();
