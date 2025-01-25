import { IMemberService } from '../../interfaces/IMemberService';
import {
    Member,
    MemberSearchFilters,
    MemberSearchResult,
    MemberActivity,
    Alert,
    MemberStatus,
    SecuritySettings,
    Device
} from '../../../types/member-center.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';

export class MemberService extends BaseService implements IMemberService {
    constructor(basePath: string = '/api/v1/members') {
        super(basePath);
    }

    async searchMembers(filters: MemberSearchFilters): Promise<PaginatedResponse<MemberSearchResult>> {
        try {
            const response = await this.get<PaginatedResponse<Member>>('/search', { params: filters });
            const members = response.items;
            
            return {
                items: [{
                    totalCount: response.total,
                    members: members.map(member => ({
                        id: member.id,
                        firstName: member.firstName,
                        lastName: member.lastName,
                        email: member.email,
                        phone: member.phone,
                        accountNumber: member.accountNumber,
                        status: member.status,
                        joinDate: member.joinDate,
                        lastLogin: member.lastLogin,
                        address: member.address,
                        accounts: member.accounts,
                        alerts: member.alerts,
                        devices: member.devices,
                        securitySettings: member.securitySettings
                    }))
                }],
                total: response.total,
                page: response.page,
                limit: response.limit,
                totalPages: Math.ceil(response.total / response.limit)
            };
        } catch (error) {
            throw this.handleError(error, 'Failed to search members');
        }
    }

    async getMember(memberId: string): Promise<Member> {
        try {
            return await this.get<Member>(`/${memberId}`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get member');
        }
    }

    async getMemberActivity(memberId: string): Promise<MemberActivity[]> {
        try {
            return await this.get<MemberActivity[]>(`/${memberId}/activity`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get member activity');
        }
    }

    async getMemberAlerts(memberId: string): Promise<Alert[]> {
        try {
            return await this.get<Alert[]>(`/${memberId}/alerts`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get member alerts');
        }
    }

    async updateMemberStatus(memberId: string, status: MemberStatus): Promise<void> {
        try {
            await this.patch(`/${memberId}/status`, { status });
        } catch (error) {
            throw this.handleError(error, 'Failed to update member status');
        }
    }

    async getSecuritySettings(memberId: string): Promise<any> {
        try {
            return await this.get<SecuritySettings>(`/${memberId}/security`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get security settings');
        }
    }

    async updateSecuritySettings(memberId: string, settings: Partial<SecuritySettings>): Promise<void> {
        try {
            await this.patch(`/${memberId}/security`, settings);
        } catch (error) {
            throw this.handleError(error, 'Failed to update security settings');
        }
    }

    async getMemberDevices(memberId: string): Promise<Device[]> {
        try {
            return await this.get<Device[]>(`/${memberId}/devices`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get member devices');
        }
    }

    async removeDevice(memberId: string, deviceId: string): Promise<void> {
        try {
            await this.delete<void>(`/${memberId}/devices/${deviceId}`);
        } catch (error) {
            throw this.handleError(error, 'Failed to remove device');
        }
    }

    async updateMemberDevice(memberId: string, deviceId: string, updates: Partial<Device>): Promise<Device> {
        try {
            return await this.patch<Device>(
                `/${memberId}/devices/${deviceId}`,
                updates
            );
        } catch (error) {
            throw this.handleError(error, 'Failed to update member device');
        }
    }

    /**
     * Update member devices
     * @param memberId Member identifier
     * @param devices Updated list of devices
     */
    async updateDevices(memberId: string, devices: Device[]): Promise<void> {
        await this.put(`${memberId}/devices`, devices);
    }

    private handleError(error: any, defaultMessage: string): Error {
        if (error instanceof Error) {
            return error;
        }
        return new Error(defaultMessage);
    }

}
